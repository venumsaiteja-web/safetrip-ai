import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Wind,
  Droplets,
  Thermometer,
  Compass,
  ArrowRight,
  RefreshCw,
  MapPin,
  Clock,
  Database,
  PhoneCall,
  Bot,
  Map,
  BookOpen,
  Info,
  CheckCircle2,
} from 'lucide-react';
import {
  LocationData,
  WeatherData,
  RiskAssessment,
  EmergencyAlert,
  ViewTab,
} from '../types';

interface DashboardViewProps {
  activeLocation: LocationData;
  weather: WeatherData | null;
  risk: RiskAssessment | null;
  alerts: EmergencyAlert[];
  isLoadingWeather: boolean;
  onRefreshWeather: () => void;
  onNavigate: (tab: ViewTab) => void;
  onOpenLocationModal: () => void;
  onOpenSOSModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  activeLocation,
  weather,
  risk,
  alerts,
  isLoadingWeather,
  onRefreshWeather,
  onNavigate,
  onOpenLocationModal,
  onOpenSOSModal,
}) => {
  const activeAlertsForLocation = alerts.filter(
    (a) => a.status === 'Active'
  );

  const getRiskBadgeStyles = (level?: string) => {
    switch (level) {
      case 'Extreme':
        return {
          bg: 'bg-red-600',
          border: 'border-red-500',
          badgeText: 'text-white bg-red-700',
          cardBg: 'bg-red-50/70 border-red-200',
          textColor: 'text-red-900',
          subText: 'Severe Danger — Avoid Movement',
        };
      case 'High':
        return {
          bg: 'bg-orange-500',
          border: 'border-orange-500',
          badgeText: 'text-white bg-orange-600',
          cardBg: 'bg-orange-50/70 border-orange-200',
          textColor: 'text-orange-900',
          subText: 'High Alert — Severe Weather Imminent',
        };
      case 'Moderate':
        return {
          bg: 'bg-amber-500',
          border: 'border-amber-400',
          badgeText: 'text-amber-950 bg-amber-400',
          cardBg: 'bg-amber-50/70 border-amber-200',
          textColor: 'text-amber-900',
          subText: 'Moderate Risk — Exercise Caution',
        };
      default:
        return {
          bg: 'bg-emerald-600',
          border: 'border-emerald-500',
          badgeText: 'text-white bg-emerald-700',
          cardBg: 'bg-emerald-50/70 border-emerald-200',
          textColor: 'text-emerald-900',
          subText: 'Low Risk — Safe for Standard Travel',
        };
    }
  };

  const riskStyles = getRiskBadgeStyles(risk?.level);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Welcome & Destination Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-navy-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Current Tourist Safety Monitoring Zone</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight mt-1">
              {activeLocation.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {activeLocation.region}, {activeLocation.country} &bull; Coordinates: {activeLocation.lat}, {activeLocation.lon}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenLocationModal}
              id="dash-change-loc-btn"
              className="px-3.5 py-2 bg-navy-800 hover:bg-navy-700 border border-navy-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 transition-colors"
            >
              Change Destination
            </button>
            <button
              onClick={onRefreshWeather}
              disabled={isLoadingWeather}
              id="dash-refresh-btn"
              className="p-2 bg-navy-800 hover:bg-navy-700 border border-navy-700 rounded-xl text-slate-200 transition-colors disabled:opacity-50"
              title="Refresh weather data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingWeather ? 'animate-spin text-teal-400' : ''}`} />
            </button>
            <button
              onClick={onOpenSOSModal}
              id="dash-quick-sos-btn"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center space-x-1.5 transition-transform active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Emergency SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Risk Assessment Box */}
      <div className={`rounded-2xl p-5 sm:p-6 border-2 transition-all shadow-sm ${riskStyles.cardBg}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md ${riskStyles.bg}`}>
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Calculated Weather Hazard Status
                </span>
                <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${riskStyles.badgeText}`}>
                  {risk?.level || 'Analyzing'} Risk
                </span>
              </div>
              <h2 className={`text-lg sm:text-xl font-black mt-0.5 ${riskStyles.textColor}`}>
                {riskStyles.subText}
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                {risk?.disclaimer}
              </p>
            </div>
          </div>

          {/* Risk score gauge */}
          {risk && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3.5 border border-slate-200/80 flex items-center space-x-4 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">{risk.score}/100</div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Hazard Index</div>
              </div>
              <div className="w-24 bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full ${
                    risk.score > 75
                      ? 'bg-red-600'
                      : risk.score > 50
                      ? 'bg-orange-500'
                      : risk.score > 25
                      ? 'bg-amber-500'
                      : 'bg-emerald-600'
                  }`}
                  style={{ width: `${risk.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Contributing Factors & Precautions */}
        {risk && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200/60 text-xs sm:text-sm">
            <div className="bg-white/70 rounded-xl p-3.5 border border-slate-200">
              <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-2 flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Contributing Weather Factors</span>
              </h3>
              <ul className="space-y-1.5 text-slate-700">
                {risk.factors.map((f, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/70 rounded-xl p-3.5 border border-slate-200">
              <h3 className="font-bold text-slate-800 uppercase tracking-wide text-xs mb-2 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Suggested Safety Precautions</span>
              </h3>
              <ul className="space-y-1.5 text-slate-700">
                {risk.precautions.map((p, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Live Weather Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Thermometer className="w-5 h-5 text-teal-600" />
            <span>Live Weather Metrics</span>
          </h2>
          <button
            onClick={() => onNavigate('weather')}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1"
          >
            <span>Hourly & 7-Day Forecast</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {weather ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Temperature */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-medium">Temperature</span>
                <Thermometer className="w-4 h-4 text-orange-500" />
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-800">
                {weather.temperature}&deg;C
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Feels like {weather.feelsLike}&deg;C &bull; {weather.conditionText}
              </div>
            </div>

            {/* Precipitation */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-medium">Precipitation Rate</span>
                <Droplets className="w-4 h-4 text-blue-500" />
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-800">
                {weather.precipitation} <span className="text-sm font-semibold text-slate-500">mm</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {weather.precipitation > 5 ? (
                  <span className="text-blue-600 font-semibold">Active rainfall</span>
                ) : (
                  'Low rain accumulation'
                )}
              </div>
            </div>

            {/* Wind Speed & Gusts */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-medium">Wind & Gusts</span>
                <Wind className="w-4 h-4 text-teal-500" />
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-800">
                {weather.windSpeed} <span className="text-sm font-semibold text-slate-500">km/h</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Gusts up to <strong className="text-slate-700">{weather.windGusts} km/h</strong>
              </div>
            </div>

            {/* Pressure & Humidity */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-medium">Humidity & Air</span>
                <Compass className="w-4 h-4 text-purple-500" />
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-800">
                {weather.humidity}%
              </div>
              <div className="text-[11px] text-slate-500 mt-1 font-mono">
                Pressure: {weather.surfacePressure} hPa
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <RefreshCw className="w-6 h-6 animate-spin text-teal-600 mx-auto mb-2" />
            <p className="text-sm text-slate-600">Retrieving meteorological telemetry from Open-Meteo...</p>
          </div>
        )}
      </div>

      {/* Quick Action Hub */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
          Tourist Safety Navigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('assistant')}
            id="dash-quick-assistant"
            className="flex items-start space-x-3.5 p-4 bg-white hover:bg-teal-50/50 border border-slate-200 hover:border-teal-300 rounded-2xl text-left transition-all shadow-sm group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 group-hover:text-teal-900">
                AI Safety Assistant
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Chat in Hindi, Telugu, Tamil or English
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('map')}
            id="dash-quick-map"
            className="flex items-start space-x-3.5 p-4 bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-2xl text-left transition-all shadow-sm group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900">
                Interactive Safety Map
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Locate hospitals, police & shelters
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('guide')}
            id="dash-quick-guide"
            className="flex items-start space-x-3.5 p-4 bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 rounded-2xl text-left transition-all shadow-sm group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 group-hover:text-amber-900">
                Offline Survival Guides
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Flood, cyclone & packing checklists
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('mysafety')}
            id="dash-quick-mysafety"
            className="flex items-start space-x-3.5 p-4 bg-white hover:bg-purple-50/50 border border-slate-200 hover:border-purple-300 rounded-2xl text-left transition-all shadow-sm group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 group-hover:text-purple-900">
                My Safety Profile
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Emergency contact & travel ID card
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Active Alerts for Location */}
      {activeAlertsForLocation.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Current Weather Bulletins ({activeAlertsForLocation.length})</span>
            </h2>
            <button
              onClick={() => onNavigate('briefing')}
              className="text-xs font-semibold text-teal-700 hover:underline"
            >
              View All Alerts
            </button>
          </div>

          <div className="space-y-3">
            {activeAlertsForLocation.slice(0, 2).map((alert) => (
              <div
                key={alert.id}
                className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      {alert.severity}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-800">
                      {alert.title}
                    </span>
                    {alert.isDemo && (
                      <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                        Demo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {alert.description}
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 whitespace-nowrap self-end sm:self-center font-mono">
                  {alert.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Source & Reliability Metadata Footer */}
      <div className="bg-slate-100 rounded-xl p-3.5 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Database className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span>
            <strong>Data Source:</strong> {weather?.source || 'Open-Meteo Global Forecasting API'}
          </span>
          {weather?.isDemo && (
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
              Demo Cache
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 text-slate-500 font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5" />
          <span>Updated: {weather ? new Date(weather.timestamp).toLocaleTimeString() : 'Pending'}</span>
        </div>
      </div>
    </div>
  );
};
