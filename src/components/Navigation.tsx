import React from 'react';
import {
  LayoutDashboard,
  CloudSunRain,
  Map,
  Bot,
  BookOpen,
  UserCheck,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { ViewTab } from '../types';

interface NavigationProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  activeAlertCount?: number;
}

interface NavItem {
  id: ViewTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  activeAlertCount = 0,
}) => {
  const navItems: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'weather', label: 'Live Weather', icon: CloudSunRain },
    { id: 'map', label: 'Safety Map', icon: Map },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
    { id: 'guide', label: 'Emergency Guide', icon: BookOpen },
    { id: 'mysafety', label: 'My Safety', icon: UserCheck },
    {
      id: 'briefing',
      label: 'Alerts & Briefing',
      icon: FileText,
      badge: activeAlertCount > 0 ? activeAlertCount : undefined,
    },
    { id: 'admin', label: 'Demo Mode', icon: SlidersHorizontal, badge: 'Judge' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-[73px] sm:top-[69px] z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none items-center text-xs sm:text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 sm:py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                      isActive
                        ? 'bg-teal-500 text-white'
                        : item.badge === 'Judge'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
