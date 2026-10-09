import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Plus,
  Trash2,
  AlertTriangle,
  Zap,
  RotateCcw,
  Info,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { EmergencyAlert, AlertSeverity, AlertEventType } from '../types';

interface AdminDemoViewProps {
  alerts: EmergencyAlert[];
  onAddAlert: (alert: EmergencyAlert) => void;
  onDeleteAlert: (id: string) => void;
  onUpdateAlertStatus: (id: string, status: 'Active' | 'Updated' | 'Expired') => void;
  onSimulateWeatherScenario: (scenario: 'cyclone' | 'flood' | 'normal') => void;
}

export const AdminDemoView: React.FC<AdminDemoViewProps> = ({
  alerts,
  onAddAlert,
  onDeleteAlert,
  onUpdateAlertStatus,
  onSimulateWeatherScenario,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<AlertSeverity>('Warning');
  const [eventType, setEventType] = useState<AlertEventType>('Cyclone');
  const [locationName, setLocationName] = useState('Coastal Tourist Belt');
  const [activeScenarioMsg, setActiveScenarioMsg] = useState<string | null>(null);

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newAlert: EmergencyAlert = {
      id: `alert-demo-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      severity,
      eventType,
      location: locationName.trim(),
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      source: 'SafeTrip Demo Simulator (Local Session)',
      isDemo: true,
      status: 'Active',
    };

    onAddAlert(newAlert);
    setTitle('');
    setDescription('');
    setShowAddForm(false);
  };

  const triggerScenario = (scenario: 'cyclone' | 'flood' | 'normal', label: string) => {
    onSimulateWeatherScenario(scenario);
    setActiveScenarioMsg(`Injected simulation scenario: "${label}". Switch to Overview or Live Weather to see real-time risk updates.`);
    setTimeout(() => setActiveScenarioMsg(null), 5000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Title */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-purple-600 text-xs font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Hackathon Evaluation Sandbox</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Admin & Judge Demonstration Mode
          </h1>
          <p className="text-xs text-slate-500">
            Simulate extreme disasters instantly to test how SafeTrip AI dynamically calculates risks, triggers alerts, and updates guidance.
          </p>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl text-xs text-purple-900 flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
        <div>
          <strong>PROTOTYPE SIMULATOR:</strong> This panel is designed specifically for hackathon judging and presentations. It lets you simulate critical weather states without waiting for an actual cyclone or flood in the real world.
        </div>
      </div>

      {activeScenarioMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center space-x-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{activeScenarioMsg}</span>
        </div>
      )}

      {/* 1-Click Disaster Scenarios */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>One-Click Disaster Scenario Injections</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => triggerScenario('cyclone', 'Category 3 Severe Cyclone Alert')}
            id="btn-sim-cyclone"
            className="p-4 rounded-xl border-2 border-red-200 bg-red-50 hover:bg-red-100 text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-red-700 bg-red-200/80 px-2 py-0.5 rounded">
                Extreme Crisis
              </span>
              <span className="text-xs text-red-600 font-bold group-hover:underline">Simulate &rarr;</span>
            </div>
            <div className="font-bold text-slate-900 text-sm mt-2">
              Category 3 Cyclone Inundation
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Sets winds to 95 km/h, gusts to 125 km/h, 35mm rain rate, and activates an urgent coastal warning.
            </p>
          </button>

          <button
            onClick={() => triggerScenario('flood', 'Urban Flash Flood & Road Inundation')}
            id="btn-sim-flood"
            className="p-4 rounded-xl border-2 border-orange-200 bg-orange-50 hover:bg-orange-100 text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-orange-700 bg-orange-200/80 px-2 py-0.5 rounded">
                High Risk
              </span>
              <span className="text-xs text-orange-600 font-bold group-hover:underline">Simulate &rarr;</span>
            </div>
            <div className="font-bold text-slate-900 text-sm mt-2">
              Flash Flood & Road Ponding
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Sets rainfall rate to 42 mm/h, weather code 82 violent downpour, and triggers urban inundation alert.
            </p>
          </button>

          <button
            onClick={() => triggerScenario('normal', 'Fair Weather Baseline')}
            id="btn-sim-normal"
            className="p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-200/80 px-2 py-0.5 rounded">
                Low Risk
              </span>
              <span className="text-xs text-emerald-600 font-bold group-hover:underline">Reset &rarr;</span>
            </div>
            <div className="font-bold text-slate-900 text-sm mt-2">
              Reset to Normal / Clear Weather
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              Resets telemetry to 26&deg;C, light breeze 14 km/h, zero rain, clearing active test warnings.
            </p>
          </button>
        </div>
      </div>

      {/* Custom Sample Alert Management */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Custom Sample Alerts Manager</h2>
            <p className="text-xs text-slate-500">
              Create and toggle custom sample warnings to test UI responses
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-1.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? 'Cancel' : 'Add Sample Alert'}</span>
          </button>
        </div>

        {/* Add Alert Form */}
        {showAddForm && (
          <form onSubmit={handleCreateAlert} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Alert Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., High Tidal Swell Warning"
                  required
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Target Location Name
                </label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g., Goa Coastal Shacks"
                  required
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as AlertSeverity)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs sm:text-sm text-slate-800"
                >
                  <option value="Advisory">Advisory (Mild)</option>
                  <option value="Watch">Watch (Moderate)</option>
                  <option value="Warning">Warning (High)</option>
                  <option value="Critical">Critical (Extreme)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hazard Type</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as AlertEventType)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs sm:text-sm text-slate-800"
                >
                  <option value="Cyclone">Cyclone / Hurricane</option>
                  <option value="Flood">Flood / Water Inundation</option>
                  <option value="Severe Rain">Severe Rain</option>
                  <option value="Windstorm">Windstorm</option>
                  <option value="Heatwave">Heatwave</option>
                  <option value="General">General Disaster</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Details of warning, expected impact and precautions..."
                required
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg"
              >
                Publish Sample Alert
              </button>
            </div>
          </form>
        )}

        {/* Existing Alerts Table */}
        <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-800">
                    {alert.severity}
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-slate-800">{alert.title}</span>
                  {alert.isDemo && (
                    <span className="text-[9px] bg-purple-100 text-purple-700 font-mono px-1 py-0.2 rounded">
                      Demo
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{alert.location} &bull; Status: {alert.status}</div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center">
                <select
                  value={alert.status}
                  onChange={(e) =>
                    onUpdateAlertStatus(alert.id, e.target.value as 'Active' | 'Updated' | 'Expired')
                  }
                  className="bg-white border border-slate-200 text-xs py-1 px-2 rounded-lg text-slate-700"
                >
                  <option value="Active">Active</option>
                  <option value="Updated">Updated</option>
                  <option value="Expired">Expired</option>
                </select>

                <button
                  onClick={() => onDeleteAlert(alert.id)}
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                  title="Delete sample alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
