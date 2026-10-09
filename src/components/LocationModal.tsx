import React, { useState } from 'react';
import { X, Search, MapPin, Navigation as NavIcon, Loader2, Check } from 'lucide-react';
import { LocationData } from '../types';
import { PRESET_LOCATIONS } from '../data/sampleData';
import { searchGlobalLocations } from '../services/weatherService';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLocation: LocationData;
  onSelectLocation: (location: LocationData) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  activeLocation,
  onSelectLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setGeoError(null);

    if (val.trim().length >= 2) {
      setIsSearching(true);
      const results = await searchGlobalLocations(val);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const lat = parseFloat(pos.coords.latitude.toFixed(4));
        const lon = parseFloat(pos.coords.longitude.toFixed(4));
        const gpsLocation: LocationData = {
          id: `gps-${lat}-${lon}`,
          name: `My GPS Location (${lat}, ${lon})`,
          region: 'Current Coordinates',
          country: 'Local Device',
          lat,
          lon,
          isGPS: true,
        };
        onSelectLocation(gpsLocation);
        onClose();
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGeoError('Location permission denied. Please select a city manually below.');
        } else {
          setGeoError('Unable to detect location. Please choose from the destinations list.');
        }
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  const handleSelect = (loc: LocationData) => {
    onSelectLocation(loc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-navy-900 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-teal-600" />
              <span>Select Tourist Destination</span>
            </h2>
            <p className="text-xs text-slate-500">
              Weather risk and local emergency points will calibrate to this location
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* GPS Detector button */}
          <div>
            <button
              onClick={handleDetectGPS}
              disabled={isLocating}
              id="btn-detect-gps"
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl font-semibold text-xs sm:text-sm transition-colors shadow-sm disabled:opacity-60"
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                  <span>Requesting device coordinates...</span>
                </>
              ) : (
                <>
                  <NavIcon className="w-4 h-4 text-teal-600" />
                  <span>Detect My Current Location (Browser GPS)</span>
                </>
              )}
            </button>
            {geoError && (
              <p className="mt-2 text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200 font-medium">
                {geoError}
              </p>
            )}
          </div>

          {/* Search Box */}
          <div>
            <label htmlFor="city-search-input" className="block text-xs font-semibold uppercase text-slate-500 mb-1.5 tracking-wider">
              Search Any City Worldwide (Live Open-Meteo)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="city-search-input"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="e.g., Tokyo, Denpasar, Phuket, London, Puri..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-9 pr-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
              />
              {isSearching && (
                <Loader2 className="w-4 h-4 text-slate-400 absolute right-3 top-3 animate-spin" />
              )}
            </div>

            {/* Search results list */}
            {searchResults.length > 0 && (
              <div className="mt-2 border border-slate-200 rounded-xl divide-y divide-slate-100 bg-white shadow-sm overflow-hidden">
                {searchResults.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelect(loc)}
                    className="w-full text-left px-3.5 py-2.5 hover:bg-teal-50 flex items-center justify-between text-xs sm:text-sm transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{loc.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {loc.region ? `${loc.region}, ` : ''}{loc.country}
                      </div>
                    </div>
                    <span className="text-[10px] text-teal-700 bg-teal-100 px-2 py-0.5 rounded font-medium">
                      Select
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Preset Tourist Locations */}
          <div>
            <h3 className="text-xs font-semibold uppercase text-slate-500 mb-2 tracking-wider">
              Popular Tourist Coastal & Storm Hubs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_LOCATIONS.map((loc) => {
                const isSelected = activeLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => handleSelect(loc)}
                    className={`flex items-start justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/60 ring-1 ring-teal-500'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-800">
                        {loc.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {loc.region}, {loc.country}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
