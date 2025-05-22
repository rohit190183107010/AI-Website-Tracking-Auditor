import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AuditResults } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

const constructPrompt = (url: string): string => {
  // This prompt is crucial. It asks Gemini to simulate the backend analysis.
  // It needs to be very specific about the JSON structure and content.
  return `
You are an AI assistant simulating a sophisticated website tracking and marketing technology audit.
For the website URL "${url}", generate a comprehensive audit report in JSON format.
The JSON object MUST strictly follow this structure and provide plausible, realistic example data.
If multiple distinct pixel IDs for the same platform type (e.g., two different Meta Pixel IDs) are found, create separate entries for each in the 'platformDetails' array.
Ensure all essential marketing platform IDs (Meta Pixel ID, GTM Container ID, GA4 Measurement ID, Google Ads Conversion ID, Snapchat Pixel ID, etc.) are explicitly captured in the 'pixelId' field for their respective platform entry. Include detailed configuration notes relevant to marketers.

{
  "executiveSummary": {
    "healthScore": "e.g., 82% - Good",
    "totalPixels": "e.g., 5 unique pixel/tracking IDs (Meta, GA4, GTM, Ads, Snap)",
    "totalTags": "e.g., GTM (1 container, 15 tags), 10 other tags total",
    "totalCookies": "e.g., 15 marketing/analytics cookies",
    "criticalErrors": "e.g., 1 (e.g., Purchase event missing on GA4)",
    "warnings": "e.g., 3 (e.g., Meta CAPI event_id inconsistency)",
    "keyOpportunities": ["e.g., Implement Meta CAPI for Purchase event to improve data accuracy.", "e.g., Consolidate redundant analytics tags.", "e.g., Setup recommended events for detected industry."],
    "lastScanned": "${new Date().toISOString()}"
  },
  "platformDetails": [
    {
      "platformName": "Meta Pixel (Facebook/Instagram)",
      "pixelId": "e.g., 1234567890123456",
      "status": "Active with Warnings",
      "events": [
        {"eventName": "PageView", "status": "Detected", "parametersPresent": ["event_id", "em", "ph"], "notes": "Standard PageView firing correctly."},
        {"eventName": "ViewContent", "status": "Detected", "parametersPresent": ["content_ids", "content_name", "content_type", "value", "currency"], "parametersMissing": ["event_id"], "notes": "Key e-commerce event tracked."},
        {"eventName": "AddToCart", "status": "Detected", "parametersPresent": ["content_ids", "value", "currency"], "parametersMissing": ["event_id", "content_name"], "notes": "Essential for cart abandonment analysis."},
        {"eventName": "InitiateCheckout", "status": "Detected", "parametersPresent": ["num_items", "value", "currency", "event_id"]},
        {"eventName": "Purchase", "status": "Partially Detected", "parametersPresent": ["order_id", "value", "currency"], "parametersMissing": ["event_id", "em", "ph"], "notes": "Crucial conversion event. CAPI implementation recommended."}
      ],
      "parameterCompleteness": [
         {"event": "ViewContent", "parameter": "event_id", "status": "Missing", "recommendation": "Include unique event_id for deduplication with CAPI."},
         {"event": "Purchase", "parameter": "em (Hashed Email)", "status": "Missing", "recommendation": "Include hashed PII for better match rates (EMQ)."}
      ],
      "capiBrowserComparison": {
        "notes": "Meta CAPI events detected for Purchase but event_id missing. Browser pixel covers most events but is vulnerable to blockers.",
        "browserEvents": [{"eventName": "Purchase", "volume": "100 events/day (example)"}, {"eventName": "AddToCart", "volume": "300 events/day (example)"}],
        "capiEvents": [{"eventName": "Purchase", "volume": "85 events/day (example)", "notes": "Slightly lower than browser, check event_id deduplication."}]
      },
      "emqBreakdown": {
        "notes": "EMQ (Enhanced Match Quality) parameters are partially implemented. Focus on Purchase and Lead events.",
        "parameters": [
            {"parameter": "em (Hashed Email)", "event": "Purchase", "fillRate": "60%", "status": "Needs Improvement"},
            {"parameter": "ph (Hashed Phone)", "event": "Purchase", "fillRate": "40%", "status": "Needs Improvement"},
            {"parameter": "fn (Hashed First Name)", "event": "Lead", "fillRate": "N/A", "status": "N/A"}
        ]
      },
      "notes": "e.g., Automatic Advanced Matching: Enabled. Server-Side Event Deduplication Key ('event_id') usage: Inconsistent. Business Manager domain verification: Verified. Catalog connected: Yes, for Dynamic Ads."
    },
    {
      "platformName": "Google Tag Manager",
      "pixelId": "e.g., GTM-XXXXXXX",
      "status": "Active",
      "events": [
         {"eventName": "gtm.js Load", "status": "Detected", "notes": "GTM container script loaded."},
         {"eventName": "Custom Event - 'user_login'", "status": "Detected", "parametersPresent": ["user_id", "method"], "notes": "Example custom dataLayer event observed."}
      ],
      "notes": "e.g., Container Version: 15. Tags: 25 (10 active, 15 paused). Triggers: 30. Variables: 45 (including 10 data layer variables like 'ecommerce', 'user_properties'). Server-Side GTM (sGTM): Not Detected. Consent Mode: Basic configuration detected."
    },
    {
      "platformName": "Google Analytics 4 (GA4)",
      "pixelId": "e.g., G-YYYYYYYYYY",
      "status": "Active",
      "events": [
        {"eventName": "page_view", "status": "Detected", "notes": "Standard page tracking."},
        {"eventName": "view_item", "status": "Detected", "parametersPresent": ["items", "value", "currency"]},
        {"eventName": "add_to_cart", "status": "Detected", "parametersPresent": ["items", "value", "currency"]},
        {"eventName": "begin_checkout", "status": "Detected"},
        {"eventName": "purchase", "status": "Detected", "parametersPresent": ["transaction_id", "value", "currency", "items", "affiliation"], "notes": "E-commerce tracking enabled."}
      ],
      "parameterCompleteness": [
        {"event": "purchase", "parameter": "user_id", "status": "Missing", "recommendation": "Implement user_id tracking for cross-device analysis."}
      ],
      "notes": "e.g., Data Stream Name: 'Web App Stream'. Enhanced Measurement: Enabled (All options active). Google Signals: Active. Debug Mode: Inactive. Audiences: 5 defined (e.g., 'All Users', 'Purchasers')."
    },
    {
      "platformName": "Google Ads",
      "pixelId": "e.g., AW-ZZZZZZZZZ", // This is the Conversion ID
      "status": "Active",
      "events": [
        {"eventName": "Conversion (Purchase)", "status": "Detected", "parametersPresent": ["send_to", "value", "currency", "transaction_id"], "notes":"Primary purchase conversion action."},
        {"eventName": "Remarketing", "status": "Detected", "notes": "Standard remarketing tag (global site tag or GA4 audience) active on all pages."}
      ],
      "emqBreakdown": {
        "notes": "Google Ads Enhanced Conversions for Web status: Partially configured. Some PII parameters missing for key conversion actions.",
        "parameters": [
          {"parameter": "email", "event": "Purchase (Enhanced Conv.)", "fillRate": "70%", "status": "Good"},
          {"parameter": "phone_number", "event": "Purchase (Enhanced Conv.)", "fillRate": "30%", "status": "Needs Improvement"}
        ]
      },
      "notes": "e.g., Conversion Linker: Active. Auto-tagging: Enabled in linked Google Ads account (inferred). Linked Accounts: Google Analytics 4. Customer Match lists: 2 active. Remarketing Lists: 4 (based on GA4 audiences)."
    },
    {
      "platformName": "Snapchat Pixel",
      "pixelId": "e.g., abcdefgh-1234-5678-abcd-ef1234567890",
      "status": "Detected",
      "events": [
        {"eventName": "PAGE_VIEW", "status": "Detected", "notes": "Base pixel firing."},
        {"eventName": "VIEW_CONTENT", "status": "Detected", "parametersPresent": ["item_ids", "price", "currency"], "notes": "Product views tracked."},
        {"eventName": "ADD_CART", "status": "Missing"},
        {"eventName": "PURCHASE", "status": "Detected", "parametersPresent": ["transaction_id", "price", "currency"], "notes": "Purchase conversions tracked."}
      ],
      "notes": "e.g., Snap Pixel Helper status: Active and shows events. Advanced Matching: Email and Phone Number parameters detected. Catalog for Dynamic Ads: Connected."
    },
    {
      "platformName": "TikTok Pixel",
      "pixelId": "e.g., C1A2B3D4E5F6G7H8",
      "status": "Not Detected",
      "events": [],
      "notes": "TikTok Pixel not found. Consider if TikTok is a relevant advertising channel for ${url}."
    }
  ],
  "funnelVisualization": {
    "funnelName": "Standard E-commerce Funnel",
    "steps": [
      {"eventName": "PageView / page_view / PAGE_VIEW", "status": "Detected", "notes": "Site entry across platforms."},
      {"eventName": "ViewContent / view_item / VIEW_CONTENT", "status": "Detected", "notes": "Product interest across platforms."},
      {"eventName": "AddToCart / add_to_cart / ADD_CART", "status": "Detected", "notes": "Considered purchase across platforms."},
      {"eventName": "InitiateCheckout / begin_checkout", "status": "Detected", "notes": "High purchase intent."},
      {"eventName": "Purchase / purchase / PURCHASE", "status": "Partially Detected", "notes": "Conversion. Meta Pixel Purchase needs EMQ/CAPI review. Snap purchase detected."}
    ],
    "health": "Good, with areas for optimization",
    "recommendations": ["Strengthen Meta Pixel Purchase event with CAPI and full EMQ.", "Ensure consistent transaction_id usage across platforms.", "Implement missing Snapchat 'ADD_CART' event."]
  },
  "dataQualityChecks": [
    {"checkName": "Domain Verification (All Platforms)", "status": "Pass", "details": "Events primarily originate from ${new URL(url).hostname}."},
    {"checkName": "Deduplication Strategy (Meta CAPI event_id)", "status": "Warning", "details": "event_id missing or inconsistent on some Meta Pixel events, risking duplication if CAPI is used."},
    {"checkName": "Dynamic Ads Parameters (Meta & Snap ViewContent)", "status": "Pass", "details": "Required parameters (content_ids/item_ids, value/price, currency) present for dynamic retargeting."},
    {"checkName": "GTM Container Load Time", "status": "Pass", "details": "GTM container (if present) loads efficiently."},
    {"checkName": "Cross-Platform Transaction ID Consistency", "status": "Warning", "details": "Transaction IDs for purchase events appear inconsistent between GA4, Google Ads, and Snapchat. Review for accurate attribution."}
  ],
  "cookieAudit": {
    "cmpDetected": "e.g., OneTrust (or 'Not Detected')",
    "cookies": [
      {"name": "_fbp", "domain": ".${new URL(url).hostname}", "lifespan": "90 days", "httpOnly": false, "secure": true, "sameSite": "Lax", "type": "Marketing", "purpose": "Meta Pixel identifier"},
      {"name": "_ga", "domain": ".${new URL(url).hostname}", "lifespan": "2 years", "httpOnly": false, "secure": true, "sameSite": "Lax", "type": "Analytics", "purpose": "Google Analytics client ID"},
      {"name": "_gcl_aw", "domain": ".${new URL(url).hostname}", "lifespan": "90 days", "httpOnly": false, "secure": true, "sameSite": "None", "type": "Advertising", "purpose": "Google Ads conversion linker"},
      {"name": "_scid", "domain": ".${new URL(url).hostname}", "lifespan": "1 year", "httpOnly": false, "secure": true, "sameSite": "Lax", "type": "Marketing", "purpose": "Snapchat Pixel identifier"},
      {"name": "gtm_id", "domain": ".${new URL(url).hostname}", "lifespan": "Session", "httpOnly": false, "secure": true, "sameSite": "Lax", "type": "Functional", "purpose": "Related to GTM operation"}
    ]
  },
  "piiHandling": {
    "alerts": ["e.g., Potential PII 'user_email=test@example.com' found in a GET request parameter for a third-party script. Review for necessity and hashing policies."],
    "recommendations": ["Always hash PII (em, ph, etc.) before sending to ad platforms.", "Audit all third-party scripts for PII transmission.", "Ensure CMP correctly gates PII-collecting tags."]
  },
  "seoPerformanceImpact": {
    "notes": "e.g., Number of tracking scripts (approx 6-8) is moderate. Some scripts appear to load synchronously. Consider deferring non-critical trackers.",
    "impactLevel": "Low to Medium Potential Impact"
  },
  "industryAnalysis": {
    "detectedIndustry": "e.g., E-commerce (Apparel and Accessories)",
    "recommendedEvents": [
      {"eventName": "ViewCategory", "platformSuggestion": "Meta, GA4", "reasoning": "Tracks user interest in specific product categories, useful for audience segmentation and retargeting.", "priority": "High"},
      {"eventName": "Search", "platformSuggestion": "Meta, GA4", "reasoning": "Captures user search terms on site, providing insights into product interest and content gaps.", "priority": "Medium"},
      {"eventName": "AddToWishlist", "platformSuggestion": "Meta, GA4, Snap", "reasoning": "Indicates strong product interest even if not immediately purchasing; good for retargeting.", "priority": "Medium"},
      {"eventName": "Lead (Newsletter Signup)", "platformSuggestion": "Meta, Google Ads", "reasoning": "If applicable, captures potential leads for email marketing.", "priority": "Medium"}
    ],
    "generalNotes": "For an E-commerce (Apparel) site, visual platforms like Meta (Instagram) and Snapchat are key. Ensure high-quality product catalog feeds are connected for dynamic ads. User-generated content campaigns can be effective."
  },
  "aiGeneratedInsights": {
    "overallSummary": "The website ${url} has a generally robust tracking setup, especially with GA4 and Google Ads. Meta Pixel implementation is good but could be improved with CAPI. Snapchat Pixel is present and tracking key events. GTM is well-utilized. The site appears to be an E-commerce business in the Apparel sector, and key event recommendations have been provided.",
    "actionableRecommendations": [
      "Prioritize implementing Meta CAPI for the 'Purchase' event, ensuring unique 'event_id' for deduplication and including all relevant EMQ parameters (hashed email, phone, name, address).",
      "Review 'AddToCart' event parameters for Meta Pixel; ensure 'content_name' and 'event_id' are consistently passed.",
      "Implement the 'ViewCategory' and 'Search' events as recommended for the detected E-commerce industry to gain deeper behavioral insights.",
      "Ensure Snapchat Pixel 'ADD_CART' event is implemented to complete the funnel tracking on that platform.",
      "Verify GTM data layer variables for e-commerce events are comprehensive and accurate, supporting all implemented platforms."
    ],
    "complianceNotes": "A CMP appears to be present. Regularly audit its configuration to ensure it aligns with GDPR, CCPA, and other relevant privacy regulations, especially for consent related to Meta, Google, and Snap trackers. Double-check that PII is only collected and transmitted with appropriate consent and security (hashing)."
  }
}

Provide diverse and realistic example data. Do not use the exact examples provided after "e.g.,".
Ensure the entire output is a single, valid JSON object.
`;
};


class GeminiAuditService {
  private genAI: GoogleGenAI | null = null;

  private initializeAI(apiKey: string) {
    if (!this.genAI || (this.genAI as any).apiKey !== apiKey) { // A bit of a hack to check if apiKey changed
        this.genAI = new GoogleGenAI({ apiKey });
    }
  }

  async fetchAuditData(url: string, apiKey: string): Promise<AuditResults> {
    this.initializeAI(apiKey);
    if (!this.genAI) {
        throw new Error("Gemini AI client not initialized.");
    }

    const prompt = constructPrompt(url);

    try {
      const response: GenerateContentResponse = await this.genAI.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
      
      let jsonStr = response.text.trim();
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[2]) {
        jsonStr = match[2].trim();
      }

      try {
        const parsedData = JSON.parse(jsonStr);
        // Basic validation to ensure it's somewhat like AuditResults
        if (!parsedData.executiveSummary || !parsedData.platformDetails || !parsedData.aiGeneratedInsights) { // Added aiGeneratedInsights as it's core
            console.error("Parsed JSON does not match expected AuditResults structure:", parsedData);
            throw new Error("Received malformed audit data from AI. Expected core structure not found.");
        }
        return parsedData as AuditResults;
      } catch (e) {
        console.error("Failed to parse JSON response from AI:", e);
        console.error("Raw AI response text:", response.text);
        throw new Error(`Failed to parse AI's JSON response. Raw response: ${response.text.substring(0,500)}...`);
      }

    } catch (error: any)
     {
      console.error("Error fetching audit data from Gemini:", error);
      if (error.message && error.message.includes("API key not valid")) {
        throw new Error("Invalid Gemini API Key. Please check your API key and try again.");
      }
       // Check for quota errors specifically
      if (error.message && (error.message.toLowerCase().includes("quota") || error.message.toLowerCase().includes("resource has been exhausted"))) {
        throw new Error("API quota exceeded. Please check your Gemini API quota or try again later.");
      }
      throw new Error(`Gemini API error: ${error.message || 'Unknown error'}`);
    }
  }
}

export const geminiAuditService = new GeminiAuditService();