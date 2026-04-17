import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  actions,
  breadcrumbs 
}) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
    <div>
      {breadcrumbs && (
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              <span className={crumb.href ? 'hover:text-[#191974] cursor-pointer' : 'text-[#ee2229]'}>
                {crumb.label}
              </span>
              {i < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3" />}
            </React.Fragment>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-[#ee2229]">
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-black text-[#191974] tracking-tight">{title}</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">{description}</p>
        </div>
      </div>
    </div>
    {actions && <div className="flex gap-3 w-full md:w-auto">{actions}</div>}
  </div>
);

interface AdminCardProps {
  children: React.ReactNode;
  title?: string;
  headerAction?: React.ReactNode;
  noPadding?: boolean;
  className?: string;
}

export const AdminCard: React.FC<AdminCardProps> = ({ 
  children, 
  title, 
  headerAction, 
  noPadding = false,
  className = ""
}) => (
  <div className={`bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden ${className}`}>
    {(title || headerAction) && (
      <div className="p-6 lg:px-8 border-b border-gray-50 flex items-center justify-between">
        {title && <h3 className="font-black text-[#191974] uppercase tracking-[0.2em] text-[11px]">{title}</h3>}
        {headerAction}
      </div>
    )}
    <div className={noPadding ? '' : 'p-6 lg:p-8'}>
      {children}
    </div>
  </div>
);

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral' }) => {
  const styles = {
    success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    warning: 'bg-amber-50 text-amber-600 border-amber-100',
    error: 'bg-red-50 text-red-600 border-red-100',
    info: 'bg-blue-50 text-blue-600 border-blue-100',
    neutral: 'bg-gray-50 text-gray-500 border-gray-100',
  };

  return (
    <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest italic flex items-center gap-1.5 w-fit ${styles[variant]}`}>
      {children}
    </span>
  );
};
