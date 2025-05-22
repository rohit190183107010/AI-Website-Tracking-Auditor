
import React from 'react';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode; // Optional icon for the card header
  collapsible?: boolean; // Allow card to be collapsed
  defaultCollapsed?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, icon, collapsible = false, defaultCollapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <div className="bg-slate-800 shadow-xl rounded-lg overflow-hidden ring-1 ring-slate-700/50">
      <div 
        className={`bg-slate-700/50 p-4 flex justify-between items-center ${collapsible ? 'cursor-pointer hover:bg-slate-700' : ''}`}
        onClick={() => collapsible && setIsCollapsed(!isCollapsed)}
      >
        <h3 className="text-xl font-semibold text-sky-300 flex items-center">
          {icon && <span className="mr-3 text-sky-400">{icon}</span>}
          {title}
        </h3>
        {collapsible && (
          <span className="text-slate-400 transform transition-transform duration-200" style={{ transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        )}
      </div>
      {!isCollapsed && (
        <div className="p-4 md:p-6 text-slate-300">
          {children}
        </div>
      )}
    </div>
  );
};

    