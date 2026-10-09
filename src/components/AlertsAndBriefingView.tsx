import React, { useState } from 'react';
import {
  FileText,
  AlertTriangle,
  Compass,
  Calendar,
  CheckCircle2,
  Shield,
  Sparkles,
  MapPin,
  Clock,
  Printer,
  ChevronRight,
  Info,
} from 'lucide-react';
import { EmergencyAlert, LocationData, WeatherData } from '../types';
import { PRESET_LOCATIONS } from '../data/sampleData';

interface AlertsAndBriefingViewProps {
  alerts: EmergencyAlert[];
  activeLocation: LocationData;
  weather: WeatherData | null;
}

export const AlertsAndBriefingView: React.FC<AlertsAndBriefingViewProps> = ({
  alerts,
  activeLocation,
  weather,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<LocationData>(activeLocation);
  const [travelMonth, setTravelMonth] = useState('June - September (Monsoon)');
  const [travelType, setTravelType] = useState('Coastal / Beach Resort');
  const [generatedBriefing, setGeneratedBriefing] = useState<boolean>(true);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-600 text-white';
      case 'Warning':
        return 'bg-orange-500 text-white';
      case 'Watch':
        return 'bg-amber-400 text-amber-950 font-bold';
      default:
        return 'bg-blue-100 text-blue-800 font-semibold';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-teal-600 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Crisis Intelligence</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Alert History & Trip-Safety Briefing
          </h1>
          <p className="text-xs text-slate-500">
            Official simulated bulletins archive and automated itinerary safety generator.
          </p>
        </div>
      </div>

      {/* Trip Safety Briefing Generator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Custom Tourist Trip-Safety Briefing</h2>
            <p className="text-xs text-slate-500">
              Generate a tailored hazard assessment before embarking on regional excursions.
            </p>
          </div>
        </div>

        {/* Input selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Destination Corridor
            </label>
            <select
              value={selectedDestination.id}
              onChange={(e) => {
                const found = PRESET_LOCATIONS.find((l) => l.id === e.target.value);
                if (found) setSelectedDestination(found);
              }}
              className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {PRESET_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.country})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Season / Travel Window
            </label>
            <select
              value={travelMonth}
              onChange={(e) => setTravelMonth(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="June - September (Monsoon)">June - September (Monsoon / High Rain)</option>
              <option value="October - December (Post-Monsoon / Cyclones)">October - December (Cyclone Season)</option>
              <option value="January - March (Dry / Normal)">January - March (Fair Weather)</option>
              <option value="April - May (Pre-Monsoon Heat / Storms)">April - May (Pre-Monsoon Storms)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Itinerary Focus
            </label>
            <select
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="Coastal / Beach Resort">Coastal / Beach Resort (High Surge Risk)</option>
              <option value="Hilly Ghats / Mountain Trails">Hilly Ghats / Trails (Landslide Risk)</option>
              <option value="Urban Cultural Tourism">Urban Cultural Tourism (Waterlogging Risk)</option>
            </select>
          </div>
        </div>

        {/* Generated Briefing Report Box */}
        {generatedBriefing && (
          <div className="bg-navy-950 text-white rounded-2xl p-5 sm:p-6 border border-navy-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-navy-800 pb-3 gap-2">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-base sm:text-lg">
                  Safety Briefing for {selectedDestination.name}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Season: {travelMonth.split('(')[0].trim()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-navy-900/90 p-3.5 rounded-xl border border-navy-800">
                <div className="font-bold text-teal-400 uppercase text-[10px] tracking-wider mb-1">
                  Primary Hazard Profile
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {travelType.includes('Coastal')
                    ? 'Elevated sea swell and rip currents. Risk of squally coastal thunderstorms and low-elevation creek inundation during high tide.'
                    : travelType.includes('Hilly')
                    ? 'Steep road rockfall risk. Saturated soil can induce spontaneous mud slips along mountain ghats.'
                    : 'Low-lying urban underpass ponding and localized traffic diversions during sudden intense convective showers.'}
                </p>
              </div>

              <div className="bg-navy-900/90 p-3.5 rounded-xl border border-navy-800">
                <div className="font-bold text-teal-400 uppercase text-[10px] tracking-wider mb-1">
                  Essential Precautions
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  <li className="flex items-start space-x-1.5">
                    <span className="text-teal-400">&bull;</span>
                    <span>Download offline Google maps and SafeTrip emergency guide before departure.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-teal-400">&bull;</span>
                    <span>Verify boat operator license and avoid overloaded water taxis in choppy weather.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-teal-400">&bull;</span>
                    <span>Carry paper copy of hotel reservation and embassy contact.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-navy-900/90 p-3.5 rounded-xl border border-navy-800">
                <div className="font-bold text-teal-400 uppercase text-[10px] tracking-wider mb-1">
                  Actionable Packing Items
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  <li className="flex items-start space-x-1.5">
                    <span className="text-teal-400">&bull;</span>
                    <span>Heavy-duty waterproof phone case with neck lanyard.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-teal-400">&bull;</span>
                    <span>Electrolyte hydration sachets & water purification tablets.</span>
                  </li>
                  <li className="flex items-start space-x-1.5">
                    <span className="text-teal-400">&bull;</span>
                    <span>Sturdy shoes with anti-slip rubber traction.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Automated briefing synthesized from meteorological patterns and regional disaster guidelines.</span>
              <button
                onClick={() => window.print()}
                className="text-teal-400 hover:text-teal-300 flex items-center space-x-1"
              >
                <Printer className="w-3 h-3" />
                <span>Print Briefing</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alert History Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Weather Alert History Log</span>
            </h2>
            <p className="text-xs text-slate-500">
              Active bulletins and simulated historical test alerts
            </p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-mono">
            {alerts.length} Total Alerts
          </span>
        </div>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${getSeverityBadge(
                      alert.severity
                    )}`}
                  >
                    {alert.severity}
                  </span>
                  <span className="font-bold text-sm text-slate-900">{alert.title}</span>
                  {alert.isDemo && (
                    <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-1.5 py-0.2 rounded font-mono">
                      SAMPLE DEMO
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded self-start sm:self-center ${
                    alert.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {alert.status}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{alert.description}</p>

              <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2 pt-1 font-mono">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{alert.location}</span>
                  </span>
                  <span>&bull; Event: {alert.eventType}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3" />
                  <span>Issued: {new Date(alert.issuedAt).toLocaleDateString()}</span>
                  <span>&bull; Source: {alert.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
