import React, { useState, useEffect, useCallback } from 'react';
import {
  LocationData,
  WeatherData,
  RiskAssessment,
  EmergencyAlert,
  UserSafetyProfile,
  Language,
  ViewTab,
} from './types';
import {
  loadUserProfile,
  saveUserProfile,
  loadActiveLocation,
  saveActiveLocation,
  loadAlerts,
  saveAlerts,
} from './services/storageService';
import {
  fetchLiveWeather,
  evaluateWeatherRisk,
} from './services/weatherService';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { LocationModal } from './components/LocationModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { DashboardView } from './components/DashboardView';
import { LiveWeatherView } from './components/LiveWeatherView';
import { SafetyMapView } from './components/SafetyMapView';
import { AIAssistantView } from './components/AIAssistantView';
import { EmergencyGuideView } from './components/EmergencyGuideView';
import { MySafetyView } from './components/MySafetyView';
import { AlertsAndBriefingView } from './components/AlertsAndBriefingView';
import { AdminDemoView } from './components/AdminDemoView';

export function App() {
  const [activeLocation, setActiveLocation] = useState<LocationData>(loadActiveLocation());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [risk, setRisk] = useState<RiskAssessment | null>(null);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(loadAlerts());
  const [userProfile, setUserProfile] = useState<UserSafetyProfile>(loadUserProfile());
  const [currentTab, setCurrentTab] = useState<ViewTab>('overview');
  const [language, setLanguage] = useState<Language>(userProfile.preferredLanguage || 'en');

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  // Load weather when activeLocation changes
  const loadWeather = useCallback(async (loc: LocationData) => {
    setIsLoadingWeather(true);
    try {
      const data = await fetchLiveWeather(loc.lat, loc.lon);
      setWeather(data);

      // Check if any active alert matches
      const activeAlert = alerts.find((a) => a.status === 'Active');
      const evaluatedRisk = evaluateWeatherRisk(data, activeAlert?.title);
      setRisk(evaluatedRisk);
    } catch (e) {
      console.warn('Weather load error:', e);
    } finally {
      setIsLoadingWeather(false);
    }
  }, [alerts]);

  useEffect(() => {
    loadWeather(activeLocation);
  }, [activeLocation, loadWeather]);

  // Recalculate risk whenever alerts change
  useEffect(() => {
    if (weather) {
      const activeAlert = alerts.find((a) => a.status === 'Active');
      setRisk(evaluateWeatherRisk(weather, activeAlert?.title));
    }
  }, [alerts, weather]);

  const handleSelectLocation = (loc: LocationData) => {
    setActiveLocation(loc);
    saveActiveLocation(loc);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    const updated = { ...userProfile, preferredLanguage: newLang };
    setUserProfile(updated);
    saveUserProfile(updated);
  };

  const handleUpdateProfile = (newProfile: UserSafetyProfile) => {
    setUserProfile(newProfile);
    saveUserProfile(newProfile);
  };

  const handleToggleBookmark = (guideId: string) => {
    const isBookmarked = userProfile.savedGuideIds.includes(guideId);
    const updated = isBookmarked
      ? userProfile.savedGuideIds.filter((id) => id !== guideId)
      : [...userProfile.savedGuideIds, guideId];

    const updatedProfile = { ...userProfile, savedGuideIds: updated };
    setUserProfile(updatedProfile);
    saveUserProfile(updatedProfile);
  };

  // Admin / Demo alert handlers
  const handleAddAlert = (newAlert: EmergencyAlert) => {
    const updated = [newAlert, ...alerts];
    setAlerts(updated);
    saveAlerts(updated);
  };

  const handleDeleteAlert = (id: string) => {
    const updated = alerts.filter((a) => a.id !== id);
    setAlerts(updated);
    saveAlerts(updated);
  };

  const handleUpdateAlertStatus = (id: string, status: 'Active' | 'Updated' | 'Expired') => {
    const updated = alerts.map((a) => (a.id === id ? { ...a, status } : a));
    setAlerts(updated);
    saveAlerts(updated);
  };

  // Weather scenario simulators for hackathon judges
  const handleSimulateWeatherScenario = (scenario: 'cyclone' | 'flood' | 'normal') => {
    if (!weather) return;

    if (scenario === 'cyclone') {
      const simulated: WeatherData = {
        ...weather,
        temperature: 24,
        windSpeed: 95,
        windGusts: 135,
        precipitation: 36,
        precipitationProbability: 95,
        weatherCode: 96,
        conditionText: 'Severe Tropical Cyclone Warning (Simulated)',
        isDemo: true,
        source: 'SafeTrip Judge Demonstration Simulator',
        timestamp: new Date().toISOString(),
      };
      setWeather(simulated);
      setRisk(evaluateWeatherRisk(simulated, 'Category 3 Cyclone Severe Warning'));

      // Inject demo active alert
      const cycloneAlert: EmergencyAlert = {
        id: `sim-cyclone-${Date.now()}`,
        title: 'Severe Cyclonic Storm Emergency Warning',
        description: 'Dangerous storm surge exceeding 3.5m, destructive winds reaching 135 km/h. Complete outdoor curfew active. Move to safe upper reinforced structures immediately.',
        severity: 'Critical',
        eventType: 'Cyclone',
        location: activeLocation.name,
        issuedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
        source: 'SafeTrip Crisis Simulator (Demo Mode)',
        isDemo: true,
        status: 'Active',
      };
      handleAddAlert(cycloneAlert);
    } else if (scenario === 'flood') {
      const simulated: WeatherData = {
        ...weather,
        precipitation: 45,
        precipitationProbability: 90,
        windSpeed: 45,
        windGusts: 60,
        weatherCode: 82,
        conditionText: 'Violent Cloudburst / Inundation (Simulated)',
        isDemo: true,
        source: 'SafeTrip Judge Demonstration Simulator',
        timestamp: new Date().toISOString(),
      };
      setWeather(simulated);
      setRisk(evaluateWeatherRisk(simulated, 'Severe Flash Flood & Inundation Alert'));

      const floodAlert: EmergencyAlert = {
        id: `sim-flood-${Date.now()}`,
        title: 'Flash Flood Red Warning — Urban Inundation',
        description: 'Rapid stormwater ponding in progress across underpasses and hotel low-lying basements. Do NOT attempt to wade or drive across flooded streets.',
        severity: 'Critical',
        eventType: 'Flood',
        location: activeLocation.name,
        issuedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
        source: 'SafeTrip Crisis Simulator (Demo Mode)',
        isDemo: true,
        status: 'Active',
      };
      handleAddAlert(floodAlert);
    } else {
      // Normal weather reset
      loadWeather(activeLocation);
    }
  };

  const activeAlertCount = alerts.filter((a) => a.status === 'Active').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Header */}
      <Header
        activeLocation={activeLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenSOSModal={() => setIsSOSModalOpen(true)}
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      {/* Navigation tabs */}
      <Navigation
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        activeAlertCount={activeAlertCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'overview' && (
          <DashboardView
            activeLocation={activeLocation}
            weather={weather}
            risk={risk}
            alerts={alerts}
            isLoadingWeather={isLoadingWeather}
            onRefreshWeather={() => loadWeather(activeLocation)}
            onNavigate={(tab) => setCurrentTab(tab)}
            onOpenLocationModal={() => setIsLocationModalOpen(true)}
            onOpenSOSModal={() => setIsSOSModalOpen(true)}
          />
        )}

        {currentTab === 'weather' && (
          <LiveWeatherView
            weather={weather}
            activeLocation={activeLocation}
            isLoading={isLoadingWeather}
            onRefresh={() => loadWeather(activeLocation)}
          />
        )}

        {currentTab === 'map' && (
          <SafetyMapView activeLocation={activeLocation} />
        )}

        {currentTab === 'assistant' && (
          <AIAssistantView
            language={language}
            onLanguageChange={handleLanguageChange}
            activeLocation={activeLocation}
          />
        )}

        {currentTab === 'guide' && (
          <EmergencyGuideView
            bookmarkedIds={userProfile.savedGuideIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === 'mysafety' && (
          <MySafetyView
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            activeLocation={activeLocation}
            language={language}
            onLanguageChange={handleLanguageChange}
            onNavigateToGuide={(guideId) => {
              setCurrentTab('guide');
            }}
          />
        )}

        {currentTab === 'briefing' && (
          <AlertsAndBriefingView
            alerts={alerts}
            activeLocation={activeLocation}
            weather={weather}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDemoView
            alerts={alerts}
            onAddAlert={handleAddAlert}
            onDeleteAlert={handleDeleteAlert}
            onUpdateAlertStatus={handleUpdateAlertStatus}
            onSimulateWeatherScenario={handleSimulateWeatherScenario}
          />
        )}
      </main>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        activeLocation={activeLocation}
        onSelectLocation={handleSelectLocation}
      />

      {/* Emergency SOS Modal */}
      <EmergencySOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        activeLocation={activeLocation}
        userProfile={userProfile}
      />

      {/* Emergency Footer */}
      <footer className="bg-navy-950 text-slate-400 text-xs py-8 border-t border-navy-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-navy-800">
            <div className="space-y-2">
              <div className="text-white font-bold text-sm">SafeTrip AI Platform</div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Tourist Extreme Weather Crisis Communication & Emergency Safety Aid built for travelers during tropical storms, flash floods, and severe weather anomalies.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-white font-bold text-xs uppercase tracking-wider">
                Emergency Helplines
              </div>
              <div className="text-[11px] space-y-1">
                <div>Universal Emergency: <strong className="text-red-400">112</strong></div>
                <div>Tourist Police India: <strong className="text-teal-400">1363</strong></div>
                <div>Disaster Control: <strong className="text-amber-400">1070 / 1077</strong></div>
                <div>US / Canada Emergency: <strong>911</strong></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-white font-bold text-xs uppercase tracking-wider">
                Supported Languages
              </div>
              <div className="text-[11px] space-y-1 text-slate-300">
                <div>&bull; English (Global)</div>
                <div>&bull; हिन्दी (Hindi)</div>
                <div>&bull; తెలుగు (Telugu)</div>
                <div>&bull; தமிழ் (Tamil)</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-white font-bold text-xs uppercase tracking-wider">
                Data Transparency
              </div>
              <div className="text-[11px] space-y-1">
                <div>Weather: <strong>Open-Meteo Global API</strong></div>
                <div>Mapping: <strong>OpenStreetMap & Leaflet</strong></div>
                <div>AI Model: <strong>Gemini 1.5 Flash + Offline Rule Engine</strong></div>
                <div>Storage: <strong>Local Browser Sandbox</strong></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              &copy; {new Date().getFullYear()} SafeTrip AI. Developed for Web Development Hackathon.
            </div>
            <div className="text-center sm:text-right">
              <strong>Disclaimer:</strong> Not a replacement for official civil defense alerts or 112 emergency services.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
