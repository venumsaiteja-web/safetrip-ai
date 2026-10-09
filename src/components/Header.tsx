import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, MapPin, Globe, PhoneCall, Wifi, WifiOff } from 'lucide-react';
import { LocationData, Language } from '../types';

interface HeaderProps {
  activeLocation: LocationData;
  onOpenLocationModal: () => void;
  onOpenSOSModal: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeLocation,
  onOpenLocationModal,
  onOpenSOSModal,
  language,
  onLanguageChange,
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="bg-navy-950 text-white border-b border-navy-800 sticky top-0 z-40 shadow-md">
      {/* Official emergency disclaimer banner */}
      <div className="bg-amber-600/90 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between tracking-wide">
        <div className="flex items-center space-x-2 truncate">
          <AlertTriangle className="w-4 h-4 text-amber-200 flex-shrink-0" />
          <span className="truncate">
            <strong>OFFICIAL ADVISORY:</strong> Informational aid only. In immediate life-threatening danger, dial{' '}
            <strong className="underline font-bold">112</strong> (Emergency) or your local police immediately.
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-amber-100 flex-shrink-0 pl-3">
          <span>Tourist Help:</span>
          <span className="font-bold bg-amber-800/80 px-1.5 py-0.5 rounded">1363</span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shadow-inner">
              <Shield className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white">SafeTrip AI</span>
                <span className="bg-teal-500/20 text-teal-300 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border border-teal-500/30">
                  Crisis Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Tourist Extreme Weather & Emergency Safety</p>
            </div>
          </div>

          {/* Location Selector & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Active Location Button */}
            <button
              onClick={onOpenLocationModal}
              id="header-location-btn"
              className="flex items-center space-x-1.5 bg-navy-850 hover:bg-navy-800 text-slate-200 border border-navy-700 hover:border-teal-500/50 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors"
              title="Change active tourist destination"
            >
              <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
              <span className="max-w-[110px] sm:max-w-[160px] truncate font-medium">
                {activeLocation.name}
              </span>
              <span className="text-[10px] bg-navy-750 text-slate-400 px-1 py-0.5 rounded border border-navy-700 hidden md:inline">
                Change
              </span>
            </button>

            {/* Language Selector */}
            <div className="relative flex items-center">
              <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none hidden sm:block" />
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                id="header-language-select"
                aria-label="Select preferred language"
                className="bg-navy-850 text-slate-200 border border-navy-700 hover:border-navy-600 rounded-lg text-xs sm:text-sm py-1.5 pl-2 sm:pl-7 pr-3 focus:outline-none focus:ring-1 focus:ring-teal-400 font-medium cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
            </div>

            {/* Connectivity status badge */}
            <div
              className={`hidden md:flex items-center space-x-1 text-[11px] px-2 py-1 rounded-md border ${
                isOnline
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
                  : 'bg-rose-950/40 text-rose-300 border-rose-800/40'
              }`}
              title={isOnline ? 'Online - Live Weather Connected' : 'Offline - Local Emergency Cache Active'}
            >
              {isOnline ? <Wifi className="w-3 h-3 text-emerald-400" /> : <WifiOff className="w-3 h-3 text-rose-400" />}
              <span>{isOnline ? 'Live' : 'Cached'}</span>
            </div>

            {/* Emergency SOS Quick Button */}
            <button
              onClick={onOpenSOSModal}
              id="header-sos-btn"
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-lg shadow-md flex items-center space-x-1.5 transition-all transform active:scale-95 animate-radar"
              title="Open Emergency SOS Distress Interface"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              <span>SOS</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
