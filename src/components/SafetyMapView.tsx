import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  MapPin,
  Cross,
  Home,
  Shield,
  AlertTriangle,
  Layers,
  Phone,
  Navigation as NavIcon,
  ExternalLink,
  Info,
} from 'lucide-react';
import { SafetyPOI, LocationData, POICategory } from '../types';
import { SAMPLE_POIS } from '../data/sampleData';

interface SafetyMapViewProps {
  activeLocation: LocationData;
}

export const SafetyMapView: React.FC<SafetyMapViewProps> = ({ activeLocation }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedPOI, setSelectedPOI] = useState<SafetyPOI | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<POICategory | 'all'>('all');

  // Filter POIs relevant to selected category and roughly near the location (or all sample POIs if none specifically nearby)
  const allPOIs = SAMPLE_POIS;
  const filteredPOIs = allPOIs.filter((poi) => {
    if (selectedCategory === 'all') return true;
    return poi.category === selectedCategory;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [activeLocation.lat, activeLocation.lon],
        zoom: 12,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([activeLocation.lat, activeLocation.lon], 12);
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update center when activeLocation changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([activeLocation.lat, activeLocation.lon], 12);
    }
  }, [activeLocation]);

  // Update Markers on map
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // 1. User/Active Location Pin
    const userPinHtml = `
      <div style="background-color: #0d9488; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 3px solid white; transform: translate(-50%, -50%);">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
    `;
    const userIcon = L.divIcon({
      html: userPinHtml,
      className: 'custom-user-marker',
      iconSize: [34, 34],
    });

    const userMarker = L.marker([activeLocation.lat, activeLocation.lon], { icon: userIcon })
      .bindPopup(
        `<div style="font-family: inherit;">
          <strong style="color: #0b192c; font-size: 13px;">Selected Tourist Location</strong>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">${activeLocation.name}</div>
          <div style="font-size: 10px; color: #0d9488; font-weight: bold; margin-top: 4px;">Lat: ${activeLocation.lat}, Lon: ${activeLocation.lon}</div>
        </div>`
      );
    markersLayerRef.current.addLayer(userMarker);

    // 2. Render Safety POIs
    filteredPOIs.forEach((poi) => {
      let color = '#2563eb';
      let iconSvg = '';

      if (poi.category === 'hospital') {
        color = '#dc2626'; // Red
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"/></svg>`;
      } else if (poi.category === 'shelter') {
        color = '#d97706'; // Amber
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
      } else if (poi.category === 'police') {
        color = '#1d4ed8'; // Blue
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
      } else if (poi.category === 'hazard_zone') {
        color = '#ea580c'; // Orange
        iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
      }

      const markerHtml = `
        <div style="background-color: ${color}; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 8px rgba(0,0,0,0.25); border: 2px solid white; transform: translate(-50%, -50%); cursor: pointer;">
          ${iconSvg}
        </div>
      `;

      const markerIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-poi-marker',
        iconSize: [30, 30],
      });

      const poiMarker = L.marker([poi.lat, poi.lon], { icon: markerIcon });
      poiMarker.on('click', () => {
        setSelectedPOI(poi);
      });

      markersLayerRef.current?.addLayer(poiMarker);
    });
  }, [filteredPOIs, activeLocation]);

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([activeLocation.lat, activeLocation.lon], 13);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Top Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-teal-600" />
            <span>Interactive Emergency Safety Map</span>
          </h1>
          <p className="text-xs text-slate-500">
            Hospitals, police stations, shelters, and demonstration hazard zones
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              selectedCategory === 'all'
                ? 'bg-navy-900 text-white border-navy-900'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            All Points
          </button>
          <button
            onClick={() => setSelectedCategory('hospital')}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1 transition-all ${
              selectedCategory === 'hospital'
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
            }`}
          >
            <Cross className="w-3.5 h-3.5" />
            <span>Hospitals</span>
          </button>
          <button
            onClick={() => setSelectedCategory('shelter')}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1 transition-all ${
              selectedCategory === 'shelter'
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Shelters (Sample)</span>
          </button>
          <button
            onClick={() => setSelectedCategory('police')}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1 transition-all ${
              selectedCategory === 'police'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Police</span>
          </button>
          <button
            onClick={() => setSelectedCategory('hazard_zone')}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center space-x-1 transition-all ${
              selectedCategory === 'hazard_zone'
                ? 'bg-orange-600 text-white border-orange-600'
                : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Hazard Zones (Demo)</span>
          </button>
        </div>
      </div>

      {/* Main Map Container & Details Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map Canvas */}
        <div className="lg:col-span-2 relative bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 h-[480px] sm:h-[540px] shadow-sm">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Quick Recenter Floating Button */}
          <button
            onClick={handleRecenter}
            className="absolute bottom-4 right-4 z-20 bg-white hover:bg-slate-50 text-slate-800 p-2.5 rounded-xl shadow-lg border border-slate-200 flex items-center space-x-1.5 text-xs font-bold transition-all transform active:scale-95"
            title="Recenter map to active location"
          >
            <NavIcon className="w-4 h-4 text-teal-600" />
            <span>Recenter</span>
          </button>

          {/* Mobile indicator notice */}
          <div className="absolute top-3 left-14 z-20 bg-navy-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-medium shadow-md">
            Click any pin for facility details
          </div>
        </div>

        {/* Selected Facility Details Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm h-full flex flex-col justify-between">
            {selectedPOI ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          selectedPOI.category === 'hospital'
                            ? 'bg-red-100 text-red-800'
                            : selectedPOI.category === 'shelter'
                            ? 'bg-amber-100 text-amber-800'
                            : selectedPOI.category === 'hazard_zone'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {selectedPOI.category.replace('_', ' ')}
                      </span>
                      {selectedPOI.isVerified ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          Verified Facility
                        </span>
                      ) : (
                        <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">
                          Sample / Demo Data
                        </span>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1.5">
                      {selectedPOI.name}
                    </h2>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <span>{selectedPOI.address}</span>
                  </div>

                  {selectedPOI.contact && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                      <span className="font-semibold text-slate-800">{selectedPOI.contact}</span>
                    </div>
                  )}

                  {selectedPOI.capacity && (
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-700 font-medium">
                      {selectedPOI.capacity}
                    </div>
                  )}

                  {selectedPOI.notes && (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px] leading-relaxed">
                      {selectedPOI.notes}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <a
                    href={`https://maps.google.com/?q=${selectedPOI.lat},${selectedPOI.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {selectedPOI.contact && (
                    <a
                      href={`tel:${selectedPOI.contact.replace(/[^\d+]/g, '')}`}
                      className="py-2 px-3 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-semibold flex items-center justify-center transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 my-auto">
                <MapPin className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h3 className="font-bold text-slate-700 text-sm">Select a Marker</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Click on any hospital, police outpost, or shelter pin on the map to view phone numbers and emergency directions.
                </p>
              </div>
            )}

            {/* Verification Disclaimer */}
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start space-x-2">
              <Info className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Map Legend:</strong> Red = Hospitals &bull; Blue = Police &bull; Amber = Shelters (Demo) &bull; Orange = Hazard zones. Sample markers are illustrative only; always follow official police directions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
