import React from 'react';
import {
  CloudSunRain,
  Thermometer,
  Wind,
  Droplets,
  Calendar,
  Clock,
  RefreshCw,
  Info,
  HelpCircle,
} from 'lucide-react';
import { WeatherData, LocationData } from '../types';
import { decodeWmoWeatherCode } from '../services/weatherService';

interface LiveWeatherViewProps {
  weather: WeatherData | null;
  activeLocation: LocationData;
  isLoading: boolean;
  onRefresh: () => void;
}

export const LiveWeatherView: React.FC<LiveWeatherViewProps> = ({
  weather,
  activeLocation,
  isLoading,
  onRefresh,
}) => {
  if (!weather) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <RefreshCw className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-3" />
        <h3 className="font-bold text-slate-800">Loading Live Telemetry</h3>
        <p className="text-xs text-slate-500 mt-1">Connecting to Open-Meteo weather servers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title & Location Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-teal-600 text-xs font-bold uppercase tracking-wider">
            <CloudSunRain className="w-4 h-4" />
            <span>Meteorological Telemetry</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            {activeLocation.name}
          </h1>
          <p className="text-xs text-slate-500">
            Latitude: {activeLocation.lat} &bull; Longitude: {activeLocation.lon}
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="self-start sm:self-center px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-teal-400' : ''}`} />
          <span>Refresh Weather</span>
        </button>
      </div>

      {/* Primary Current Conditions Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Large Condition Tile */}
        <div className="md:col-span-2 bg-gradient-to-br from-navy-900 to-navy-800 text-white rounded-2xl p-6 border border-navy-700 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-teal-300 font-semibold uppercase tracking-wider">
                Current Condition
              </span>
              <span className="text-xs bg-navy-700/80 px-2.5 py-1 rounded-full text-slate-300 font-mono">
                WMO Code: {weather.weatherCode}
              </span>
            </div>
            <div className="mt-4 flex items-baseline space-x-4">
              <span className="text-5xl sm:text-6xl font-black tracking-tight">
                {weather.temperature}&deg;C
              </span>
              <span className="text-slate-300 text-sm sm:text-base">
                Feels like <strong className="text-white">{weather.feelsLike}&deg;C</strong>
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-teal-300 mt-2">
              {weather.conditionText}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-navy-700/80 text-xs">
            <div>
              <div className="text-slate-400">Wind Direction</div>
              <div className="font-bold text-white text-sm mt-0.5">{weather.windDirection}&deg;</div>
            </div>
            <div>
              <div className="text-slate-400">Rain Prob.</div>
              <div className="font-bold text-white text-sm mt-0.5">{weather.precipitationProbability}%</div>
            </div>
            <div>
              <div className="text-slate-400">Surface Pressure</div>
              <div className="font-bold text-white text-sm mt-0.5">{weather.surfacePressure} hPa</div>
            </div>
          </div>
        </div>

        {/* Severe Hazard Threshold Check */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4 text-teal-600" />
              <span>Tourist Threshold Check</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Automated safety triggers analyzed for this destination:
            </p>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Gale Wind Warning</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${weather.windSpeed > 55 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {weather.windSpeed > 55 ? 'TRIGGERED' : 'CLEAR'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Heavy Rain Alert (&gt;15mm)</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${weather.precipitation > 15 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {weather.precipitation > 15 ? 'TRIGGERED' : 'CLEAR'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Severe Storm Code</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${[95, 96, 99].includes(weather.weatherCode) ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {[95, 96, 99].includes(weather.weatherCode) ? 'TRIGGERED' : 'CLEAR'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 bg-teal-50 border border-teal-200 rounded-xl text-[11px] text-teal-900 leading-tight">
            <strong>Tourist Tip:</strong> If any trigger turns red, cancel water sports, beach treks, and open boat cruises.
          </div>
        </div>
      </div>

      {/* 24-Hour Hourly Forecast Scroll */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center space-x-2">
          <Clock className="w-4 h-4 text-teal-600" />
          <span>24-Hour Hourly Weather Trend</span>
        </h3>

        <div className="flex space-x-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
          {weather.hourly.map((h, i) => {
            const timeLabel = h.time.includes('T') ? h.time.split('T')[1].substring(0, 5) : h.time;
            return (
              <div
                key={i}
                className="flex-shrink-0 w-24 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-center transition-colors"
              >
                <div className="text-[11px] font-mono text-slate-500 font-semibold">{timeLabel}</div>
                <div className="text-base font-extrabold text-slate-800 my-1">{h.temp}&deg;C</div>
                <div className="text-[10px] text-slate-600 font-medium truncate" title={decodeWmoWeatherCode(h.weatherCode)}>
                  {decodeWmoWeatherCode(h.weatherCode)}
                </div>
                <div className="mt-2 text-[10px] text-blue-600 font-semibold flex items-center justify-center space-x-1">
                  <Droplets className="w-2.5 h-2.5" />
                  <span>{h.precipitation} mm</span>
                </div>
                <div className="text-[10px] text-teal-700 font-semibold flex items-center justify-center space-x-1">
                  <Wind className="w-2.5 h-2.5" />
                  <span>{h.windSpeed} km/h</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-Day Extended Trend */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-teal-600" />
          <span>7-Day Forward Outlook</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {weather.daily.map((d, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-slate-700">
                  {i === 0 ? 'Today' : d.date}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {decodeWmoWeatherCode(d.weatherCode)}
                </div>
                <div className="text-[11px] text-blue-600 font-medium mt-1">
                  Precip: {d.precipitationSum} mm
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-slate-800">{d.tempMax}&deg;C</div>
                <div className="text-xs text-slate-400 font-semibold">{d.tempMin}&deg;C</div>
                <div className="text-[10px] text-teal-700 font-mono mt-0.5">
                  {d.windSpeedMax} km/h
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transparency Note */}
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start space-x-2">
        <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Transparency Notice:</strong> All weather metrics are queried dynamically from the open European ECMWF/DWD atmospheric datasets via Open-Meteo. No private API tokens or rate limits are required.
        </div>
      </div>
    </div>
  );
};
