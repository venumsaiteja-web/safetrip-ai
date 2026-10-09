import { UserSafetyProfile, Language, LocationData, EmergencyAlert } from '../types';
import { PRESET_LOCATIONS, INITIAL_ALERTS } from '../data/sampleData';

const PROFILE_KEY = 'safetrip_user_profile';
const LOCATION_KEY = 'safetrip_active_location';
const ALERTS_KEY = 'safetrip_active_alerts';
const BOOKMARKS_KEY = 'safetrip_saved_guides';

export const DEFAULT_USER_PROFILE: UserSafetyProfile = {
  travelerName: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  bloodGroup: '',
  hotelOrStay: '',
  preferredLanguage: 'en',
  completedChecklist: ['chk-1', 'chk-3'],
  savedGuideIds: ['guide-flood', 'guide-cyclone'],
};

export function loadUserProfile(): UserSafetyProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_USER_PROFILE;
    return { ...DEFAULT_USER_PROFILE, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('Failed to load profile from localStorage:', e);
    return DEFAULT_USER_PROFILE;
  }
}

export function saveUserProfile(profile: UserSafetyProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Failed to save profile to localStorage:', e);
  }
}

export function loadActiveLocation(): LocationData {
  try {
    const raw = localStorage.getItem(LOCATION_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to load active location:', e);
  }
  return PRESET_LOCATIONS[0]; // Default to Goa
}

export function saveActiveLocation(location: LocationData): void {
  try {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
  } catch (e) {
    console.warn('Failed to save active location:', e);
  }
}

export function loadAlerts(): EmergencyAlert[] {
  try {
    const raw = localStorage.getItem(ALERTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load alerts from localStorage:', e);
  }
  return INITIAL_ALERTS;
}

export function saveAlerts(alerts: EmergencyAlert[]): void {
  try {
    localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
  } catch (e) {
    console.warn('Failed to save alerts to localStorage:', e);
  }
}

export function loadBookmarkedGuideIds(): string[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load bookmarks:', e);
  }
  return ['guide-flood', 'guide-cyclone'];
}

export function saveBookmarkedGuideIds(ids: string[]): void {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  } catch (e) {
    console.warn('Failed to save bookmarks:', e);
  }
}
