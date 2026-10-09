export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Extreme' | 'Unavailable';

export type Language = 'en' | 'hi' | 'te' | 'ta';

export interface LocationData {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  isPreset?: boolean;
  isGPS?: boolean;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  windSpeedMax: number;
}

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  precipitation: number;
  precipitationProbability: number;
  windSpeed: number;
  windGusts: number;
  windDirection: number;
  weatherCode: number;
  conditionText: string;
  uvIndex: number;
  surfacePressure: number;
  timestamp: string;
  isDemo: boolean;
  source: string;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

export interface RiskAssessment {
  level: RiskLevel;
  score: number; // 0 to 100
  factors: string[];
  precautions: string[];
  officialAlertWarning?: string;
  lastUpdated: string;
  source: string;
  disclaimer: string;
}

export type AlertSeverity = 'Advisory' | 'Watch' | 'Warning' | 'Critical';
export type AlertEventType = 'Cyclone' | 'Flood' | 'Severe Rain' | 'Windstorm' | 'Heatwave' | 'General';

export interface EmergencyAlert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  eventType: AlertEventType;
  location: string;
  coordinates?: { lat: number; lon: number };
  issuedAt: string;
  expiresAt: string;
  source: string;
  isDemo: boolean;
  status: 'Active' | 'Updated' | 'Expired';
}

export type POICategory = 'hospital' | 'shelter' | 'police' | 'emergency_center' | 'hazard_zone';

export interface SafetyPOI {
  id: string;
  name: string;
  category: POICategory;
  lat: number;
  lon: number;
  address: string;
  contact?: string;
  capacity?: string;
  isVerified: boolean;
  status: 'Operational' | 'Limited' | 'Flooded/Closed';
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: Language;
  isAiGenerated: boolean;
  source: 'gemini' | 'offline_rules' | 'error_fallback';
}

export interface EmergencyGuideSection {
  id: string;
  title: string;
  category: string;
  iconName: string;
  summary: string;
  severityGrade: 'Crucial' | 'High' | 'Standard';
  precautions: string[];
  actionSteps: {
    phase: 'Before Hazard' | 'During Hazard' | 'After Hazard';
    steps: string[];
  }[];
  emergencyNumbers: { label: string; number: string }[];
  doAndDont: {
    do: string[];
    dont: string[];
  };
}

export interface UserSafetyProfile {
  travelerName: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodGroup: string;
  hotelOrStay: string;
  preferredLanguage: Language;
  completedChecklist: string[];
  savedGuideIds: string[];
}

export type ViewTab =
  | 'overview'
  | 'weather'
  | 'map'
  | 'assistant'
  | 'guide'
  | 'mysafety'
  | 'briefing'
  | 'admin';
