import { WeatherData, RiskAssessment, RiskLevel, LocationData } from '../types';

export function decodeWmoWeatherCode(code: number): string {
  switch (code) {
    case 0:
      return 'Clear Sky';
    case 1:
      return 'Mainly Clear';
    case 2:
      return 'Partly Cloudy';
    case 3:
      return 'Overcast';
    case 45:
    case 48:
      return 'Fog / Low Visibility';
    case 51:
    case 53:
    case 55:
      return 'Drizzle (Light to Dense)';
    case 61:
      return 'Light Rain';
    case 63:
      return 'Moderate Rain';
    case 65:
      return 'Heavy Rain / Downpour';
    case 66:
    case 67:
      return 'Freezing Rain';
    case 71:
    case 73:
    case 75:
      return 'Snowfall';
    case 77:
      return 'Snow Grains';
    case 80:
      return 'Light Rain Showers';
    case 81:
      return 'Moderate Rain Showers';
    case 82:
      return 'Violent Rain Showers';
    case 85:
    case 86:
      return 'Snow Showers';
    case 95:
      return 'Thunderstorm';
    case 96:
    case 99:
      return 'Severe Thunderstorm with Hail';
    default:
      return 'Cloudy / Variable Conditions';
  }
}

export function evaluateWeatherRisk(
  weather: WeatherData,
  activeAlertWarning?: string
): RiskAssessment {
  const factors: string[] = [];
  const precautions: string[] = [];
  let score = 10; // baseline

  // Wind speed & gusts analysis
  if (weather.windSpeed >= 85 || weather.windGusts >= 105) {
    score += 45;
    factors.push(`Destructive winds: sustained ${weather.windSpeed} km/h with gusts reaching ${weather.windGusts} km/h`);
    precautions.push('Stay indoors immediately in a reinforced structure away from glass windows.');
    precautions.push('Expect power grid disruptions, fallen trees, and roof debris hazards.');
  } else if (weather.windSpeed >= 55 || weather.windGusts >= 75) {
    score += 30;
    factors.push(`Gale-force winds: sustained ${weather.windSpeed} km/h (gusts ${weather.windGusts} km/h)`);
    precautions.push('Secure loose items on balconies and avoid walking near billboards or large trees.');
    precautions.push('Avoid coastal sea walks and open boat excursions.');
  } else if (weather.windSpeed >= 35 || weather.windGusts >= 50) {
    score += 15;
    factors.push(`Squally breeze: sustained ${weather.windSpeed} km/h with gusts up to ${weather.windGusts} km/h`);
    precautions.push('Exercise caution on exposed roads, bridges, and open beach areas.');
  }

  // Precipitation analysis
  if (weather.precipitation >= 30) {
    score += 40;
    factors.push(`Torrential precipitation: ${weather.precipitation} mm current accumulation rate`);
    precautions.push('Severe flash flood risk in low-lying roads and basement hotel levels.');
    precautions.push('Do NOT attempt to cross flowing water on foot or in vehicles.');
  } else if (weather.precipitation >= 12) {
    score += 25;
    factors.push(`Heavy continuous rainfall: ${weather.precipitation} mm/h`);
    precautions.push('Waterlogging probable on coastal and city transit routes.');
    precautions.push('Check transport advisories before leaving hotel.');
  } else if (weather.precipitation >= 3) {
    score += 10;
    factors.push(`Moderate rainfall detected (${weather.precipitation} mm)`);
    precautions.push('Keep umbrellas, rainwear, and waterproof phone pouches ready.');
  }

  // Severe weather code triggers
  if ([96, 99].includes(weather.weatherCode)) {
    score += 30;
    factors.push('Severe thunderstorm with hail and dangerous lightning');
    precautions.push('Disconnect sensitive electronics and avoid metal structures.');
  } else if (weather.weatherCode === 95) {
    score += 20;
    factors.push('Active thunderstorm in regional vicinity');
    precautions.push('Seek indoor shelter; avoid beaches, golf courses, and open water.');
  } else if (weather.weatherCode === 82) {
    score += 20;
    factors.push('Violent rain showers reported');
    precautions.push('Reduced road visibility; postpone outdoor sightseeing.');
  }

  // If official alert warning is attached
  if (activeAlertWarning) {
    score = Math.max(score, 70);
    factors.push(`Official advisory active: "${activeAlertWarning}"`);
    precautions.push('Prioritize all instructions broadcast by local civil defence and police.');
  }

  // Determine Level
  let level: RiskLevel = 'Low';
  if (score >= 75) {
    level = 'Extreme';
  } else if (score >= 50) {
    level = 'High';
  } else if (score >= 25) {
    level = 'Moderate';
  } else {
    level = 'Low';
  }

  if (precautions.length === 0) {
    precautions.push('General weather conditions are favorable for normal tourist movement.');
    precautions.push('Maintain standard travel awareness and monitor regional forecasts.');
  }
  return {
    level,
    score: Math.min(score, 100),
    factors: factors.length > 0 ? factors : ['No adverse weather indicators detected in current forecast window.'],
    precautions,
    officialAlertWarning: activeAlertWarning,
    lastUpdated: weather.timestamp,
    source: weather.source,
    disclaimer:
      'Informational assessment generated using Open-Meteo physical meteorological indicators. This rule-based risk evaluation is an advisory aid and does not substitute official alerts issued by national meteorological offices or emergency authorities.',
  };
}

export async function fetchLiveWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,precipitation,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Open-Meteo API returned HTTP status ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;

    // Process hourly
    const hourlyTimes = data.hourly?.time?.slice(0, 24) || [];
    const hourly = hourlyTimes.map((t: string, i: number) => ({
      time: t,
      temp: Math.round(data.hourly.temperature_2m[i]),
      precipitation: data.hourly.precipitation[i] || 0,
      windSpeed: Math.round(data.hourly.wind_speed_10m[i] || 0),
      weatherCode: data.hourly.weather_code[i] || 0,
    }));

    // Process daily
    const dailyTimes = data.daily?.time?.slice(0, 7) || [];
    const daily = dailyTimes.map((t: string, i: number) => ({
      date: t,
      weatherCode: data.daily.weather_code[i] || 0,
      tempMax: Math.round(data.daily.temperature_2m_max[i]),
      tempMin: Math.round(data.daily.temperature_2m_min[i]),
      precipitationSum: data.daily.precipitation_sum[i] || 0,
      windSpeedMax: Math.round(data.daily.wind_speed_10m_max[i] || 0),
    }));

    const weatherCode = current.weather_code ?? 0;

    return {
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature ?? current.temperature_2m),
      humidity: Math.round(current.relative_humidity_2m ?? 65),
      precipitation: current.precipitation ?? 0,
      precipitationProbability: current.rain > 0 ? 80 : 15,
      windSpeed: Math.round(current.wind_speed_10m ?? 12),
      windGusts: Math.round(current.wind_gusts_10m ?? current.wind_speed_10m * 1.3),
      windDirection: Math.round(current.wind_direction_10m ?? 180),
      weatherCode,
      conditionText: decodeWmoWeatherCode(weatherCode),
      uvIndex: 4,
      surfacePressure: Math.round(current.surface_pressure ?? 1012),
      timestamp: new Date().toISOString(),
      isDemo: false,
      source: 'Open-Meteo Global Forecasting Model (Live)',
      hourly,
      daily,
    };
  } catch (err) {
    console.warn('Live weather fetch failed, serving resilient offline/fallback dataset:', err);
    return getFallbackWeatherData(lat, lon);
  }
}

export function getFallbackWeatherData(lat: number, lon: number): WeatherData {
  // Deterministic realistic weather mock based on latitude
  const isTropical = Math.abs(lat) < 23.5;
  const temp = isTropical ? 29 : 21;
  const weatherCode = isTropical ? 63 : 2;

  const now = new Date();
  const hourly = Array.from({ length: 24 }).map((_, i) => {
    const d = new Date(now.getTime() + i * 3600 * 1000);
    return {
      time: d.toISOString().substring(11, 16),
      temp: temp + Math.round(Math.sin(i / 3) * 4),
      precipitation: i % 4 === 0 ? 3.5 : 0.2,
      windSpeed: 22 + (i % 5),
      weatherCode: i % 4 === 0 ? 63 : 2,
    };
  });

  const daily = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now.getTime() + i * 86400 * 1000);
    return {
      date: d.toISOString().substring(0, 10),
      weatherCode: i === 2 ? 65 : 2,
      tempMax: temp + 3,
      tempMin: temp - 4,
      precipitationSum: i === 2 ? 24 : 1.2,
      windSpeedMax: 35,
    };
  });

  return {
    temperature: temp,
    feelsLike: temp + 2,
    humidity: 78,
    precipitation: 4.8,
    precipitationProbability: 60,
    windSpeed: 28,
    windGusts: 42,
    windDirection: 215,
    weatherCode,
    conditionText: decodeWmoWeatherCode(weatherCode) + ' (Fallback Cache)',
    uvIndex: 5,
    surfacePressure: 1008,
    timestamp: new Date().toISOString(),
    isDemo: true,
    source: 'SafeTrip Offline Cache / Demonstration Telemetry',
    hourly,
    daily,
  };
}

export async function searchGlobalLocations(query: string): Promise<LocationData[]> {
  if (!query || query.trim().length < 2) return [];

  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query.trim()
      )}&count=6&language=en&format=json`
    );
    if (!res.ok) return [];

    const json = await res.json();
    if (!json.results || !Array.isArray(json.results)) return [];

    return json.results.map((item: any) => ({
      id: `geo-${item.id}`,
      name: item.name,
      region: item.admin1 || item.country || '',
      country: item.country || '',
      lat: item.latitude,
      lon: item.longitude,
      isPreset: false,
    }));
  } catch (e) {
    console.warn('Geocoding search error:', e);
    return [];
  }
}
