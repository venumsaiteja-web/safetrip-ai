deployed link
https://safetrip-ai-wine.vercel.app
demo video link
https://drive.google.com/file/d/1Zc-TWvfWZM1-wMZxWfyUJQEl8RvMUt0o/view?usp=sharing




HEAD
# SafeTrip AI — Tourist Emergency Safety & Communication Platform

> **Hackathon Submission:** 24-Hour Web Development Hackathon  
> **Domain:** TravelTech / Public Safety / Crisis Communication  
> **Problem:** Real-Time Crisis Communication for Tourists During Extreme Weather Events

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Open-Meteo](https://img.shields.io/badge/Weather-Open--Meteo%20API-FFA500)](https://open-meteo.com/)

---

## 1. Project Overview

**SafeTrip AI** is a production-ready, responsive, crisis-communication web application engineered specifically for tourists and unfamiliar travelers caught in extreme weather emergencies (such as cyclones, flash floods, violent squalls, and severe monsoon depressions). 

Tourists often cannot understand local vernacular emergency sirens, face severe language barriers, lack familiarity with local geography, and struggle to identify whether their accommodation or road corridor is submerged. **SafeTrip AI** bridges this gap with transparent meteorological risk indicators, multilingual instructions (English, Hindi, Telugu, Tamil), an interactive Leaflet safety map with verified hospital & demo shelter pins, an instant 1-click distress SOS dispatcher, and 7 offline-accessible survival guides.

---

## 2. Problem Statement

* **Domain:** TravelTech & Disaster Resilience
* **Core Challenge:** During extreme weather events (cyclones, tidal surges, torrential rainfall), foreign and domestic travelers face critical information asymmetry:
  1. Local emergency broadcasts are often in local languages without tourist translations.
  2. Tourists do not know local emergency phone numbers (e.g., dial 112 or 1363 instead of their home country 911).
  3. Lack of understanding regarding local terrain hazards (low-lying creek inundation, mudslides on ghat roads).
  4. Intermittent or failing cellular connectivity during storms makes heavy web pages fail.
  5. Panic during crises leads to walking or driving into dangerous floodwaters.

**Important Legal / Safety Notice:** SafeTrip AI is an advisory information aid and strictly disclaims replacing official government civil defence authorities, meteorological departments, or 112 emergency services.

---

## 3. Key Features

### 🌟 Feature 1: Emergency Safety Dashboard
* **Dynamic Location Selector:** Search any city worldwide via Open-Meteo live geocoding or select preset storm hotspots (Goa, Visakhapatnam, Chennai, Mumbai, Miami, Bali, Tokyo, Bangkok).
* **Browser Geolocation:** Supports 1-click GPS coordinate detection with graceful permission denial fallback.
* **Live Weather Metrics:** Real-time temperature, "feels like", rain accumulation rate (mm), sustained wind speed (km/h), wind gusts, atmospheric pressure, and WMO condition decoding.
* **Transparent Reliability Badging:** Explicitly labels data sources (Open-Meteo Global Forecasting Model) and timestamps.

### 🛡️ Feature 2: Rule-Based Weather Risk Assessment
* **Deterministic Hazard Evaluation:** Algorithmic scoring (0–100) mapping weather factors to **Low**, **Moderate**, **High**, or **Extreme** risk levels.
* **Transparent Factor Breakdown:** Displays exact contributing meteorological parameters (e.g., destructive wind gusts > 105 km/h, rain > 30 mm/h).
* **Actionable Precautions:** Step-by-step guidance directly relevant to the active hazard.
* **Safety Disclaimers:** Highlights that the score is an advisory aid and not an official government warning.

### 🌐 Feature 3: Multilingual AI Emergency Assistant
* **Supported Languages:** **English**, **हिंदी (Hindi)**, **తెలుగు (Telugu)**, and **தமிழ் (Tamil)**.
* **Dual-Engine Architecture:**
  * **Google Gemini 1.5 Flash:** Enabled automatically when `VITE_GEMINI_API_KEY` is provided in environment variables.
  * **Resilient Offline Rule Engine:** Comprehensive, instant fallback knowledge base answering cyclone preparation, flood protocols, grab-bag packing, and emergency hotlines in all 4 languages when offline or without an API key!
* **Safety Safeguards:** Strictly enforces never advising travelers to enter floodwaters, never claiming unofficial routes are safe, and always prioritizing dialing 112.

### 🗺️ Feature 4: Interactive Safety Map
* **OpenStreetMap & Leaflet Integration:** Responsive, mobile-friendly interactive map centered at the tourist's destination.
* **Category Filters:** Hospitals (🏥 Red), Verified Police Outposts (🚓 Blue), Demonstration Shelters (🏠 Amber), and Demonstration Hazard Zones (⚠️ Orange).
* **Facility Details Drawer:** Click any marker to view contact numbers, bed capacity, address, and Google Maps directions link.
* **Verified vs. Sample Badging:** Clear visual indicators separating verified public infrastructure from demonstration prototype data.

### 🚨 Feature 5: Emergency Distress SOS
* **Coordinates Dispatch:** Formats active GPS coordinates and Google Maps pin link.
* **1-Click Copy Distress SMS:** Ready to paste into SMS, WhatsApp, or email.
* **Native Device Web Share:** Integrates `navigator.share` with an explicit confirmation dialog.
* **Direct Emergency Hotlines:** One-tap dialing for Universal Emergency (`112`), Tourist Police (`1363`), and Disaster Control (`1070`).
* **Ethical Transparency:** Explicitly informs the user that the button prepares a message for transmission and does not auto-dispatch first responders.

### 📖 Feature 6: Offline Emergency Survival Guides
* **7 Comprehensive Modules:**
  1. Flash Floods & Water Inundation Safety
  2. Cyclone & Hurricane Preparedness
  3. Torrential Rainfall & Landslide Hazards
  4. Gale Winds & Structural Collapse Safety
  5. Emergency Grab-Bag Tourist Packing Checklist (<5 kg)
  6. Offline Communication & Whistle Distress Signaling Protocol
  7. General Tourist Evacuation Protocols
* **Phase-by-Phase Guidance:** Structured under *Before Hazard*, *During Hazard*, and *After Hazard*.
* **Do's & Don'ts:** High-contrast lists highlighting life-threatening mistakes.
* **Local Storage Bookmarking:** Bookmark crucial guides for instant access without internet.
* **Print / PDF Export:** Generates clean, printable emergency reference sheets.

### 🪪 Feature 7: My Safety & Personal Emergency ID
* **Tourist Profile:** Saves traveler name, hotel/resort address, blood group, and emergency contact.
* **Copyable Digital Emergency ID Card:** Instant text card for sharing with consular staff or hotels.
* **Interactive Readiness Score:** 8-point tourist disaster readiness checklist with progress meter.

### 📋 Feature 8: Alert History & Trip-Safety Briefing
* **Alert History Log:** Filterable archive of active and historical weather bulletins.
* **Trip Briefing Generator:** Input destination and travel season (Monsoon, Cyclone Season, Fair Weather) to generate a tailored hazard advisory and packing recommendations.

### ⚡ Feature 9: Hackathon Admin / Judge Demonstration Mode
* **1-Click Disaster Simulators:**
  * **Category 3 Severe Cyclone Alert:** Injects 95 km/h winds, 135 km/h gusts, torrential rain, and red critical hazard alerts across the app.
  * **Urban Flash Flood & Road Ponding:** Injects 45 mm rain rate and urban inundation warnings.
  * **Reset to Live Telemetry:** Restores live Open-Meteo real-time conditions.
* **Sample Alert Manager:** Add, edit status (Active/Updated/Expired), or delete sample bulletins in real time.

---

## 4. Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + Vite |
| **Language** | TypeScript (Strict Typing) |
| **Styling** | Tailwind CSS 3.4 (Emergency Navy/Teal/Red/Amber palettes) |
| **Icons** | Lucide React |
| **Mapping** | Leaflet 1.9 + OpenStreetMap Tiles |
| **Live Weather** | Open-Meteo Global Forecasting API (Free, No Key Required) |
| **Geocoding** | Open-Meteo Geocoding Search API |
| **AI Assistant** | Google Gemini 1.5 Flash + Multilingual Offline Rule Engine |
| **Storage** | Browser `localStorage` sandbox |
| **Deployment** | Vercel (Ready with `vercel.json`) |

---

## 5. Prerequisites

* **Node.js:** v18.0.0 or later (v20+ recommended)
* **npm:** v9.0.0 or later
* Modern Web Browser (Chrome, Edge, Firefox, Safari)

---

## 6. Installation Instructions

1. Clone or copy the project repository:
   ```bash
   git clone https://github.com/your-username/safetrip-ai.git
   cd safetrip-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## 7. Development Command

To start the local development server:
```bash
npm run dev
```

The application will start at:
```
http://localhost:5173/
```

---

## 8. Production Build Command

To verify types and compile the production-optimized bundle:
```bash
npm run build
```

To test the production build locally:
```bash
npm run preview
```

The production output will be generated inside the `dist/` directory.

---

## 9. Environment Variables

Create a `.env` file in the project root (or copy `.env.example`):

```bash
# Optional: Google Gemini API Key for dynamic multi-lingual AI queries.
# If left blank, SafeTrip AI's built-in multilingual safety rule engine remains 100% functional!
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

*Note: Never commit real API keys to version control. The app works completely out of the box even without any API key.*

---

## 10. Data Sources & Limitations

1. **Weather Data:** Provided by **Open-Meteo** (based on ECMWF/DWD atmospheric forecast models). Updated hourly. Subject to regional model resolution.
2. **Geocoding:** Provided by Open-Meteo Nominatim open geocoding endpoint.
3. **Emergency POIs:** Hospital and police locations around primary demonstration hubs (Goa, Visakhapatnam, Chennai, Mumbai) are verified municipal landmarks; cyclone shelters and hazard polygons are sample demonstration instances clearly labeled with `[SAMPLE / DEMO DATA]`.
4. **Offline Mode:** Once cached in browser memory and local storage, guides, SOS templates, and profiles function without internet. Live weather requires an initial network handshake.

---

## 11. Deployment Instructions (Vercel)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SafeTrip AI Tourist Emergency Platform"
   git branch -M main
   git remote add origin https://github.com/your-username/safetrip-ai.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   * Log into [Vercel](https://vercel.com/) and click **"Add New Project"**.
   * Import your `safetrip-ai` GitHub repository.
   * Framework Preset: Select **Vite**.
   * Build Command: `npm run build`
   * Output Directory: `dist`
   * *(Optional)* Add Environment Variable: `VITE_GEMINI_API_KEY`
   * Click **Deploy**.

3. **Verify Deployment:**
   * Test page navigation and check that SPA routes refresh correctly (handled by `vercel.json`).

---

## 12. Demonstration & Judge Mode Guidelines

Judges can test the system using the dedicated **"Demo Mode"** tab in the navigation bar:
1. Navigate to **Demo Mode**.
2. Click **"Category 3 Cyclone Inundation"** to inject a simulated storm surge.
3. Return to **Overview** to observe the hazard index jump to **Extreme 85/100** with high wind telemetry and critical red alerts.
4. Open the **AI Assistant** tab and ask in **Telugu** or **Hindi** for cyclone preparation rules.
5. Open the **SOS** modal to view pre-filled distress coordinates with map links.

---

## 13. Open-Source Libraries & Attributions

* **Leaflet:** [leafletjs.com](https://leafletjs.com/) (BSD 2-Clause License)
* **OpenStreetMap:** [openstreetmap.org](https://www.openstreetmap.org/) (ODbL License)
* **Lucide Icons:** [lucide.dev](https://lucide.dev/) (ISC License)
* **Open-Meteo:** [open-meteo.com](https://open-meteo.com/) (Free Open Weather API)
* **Google Gemini API:** [ai.google.dev](https://ai.google.dev/) (Optional GenAI Integration)

---

## 14. License

Distributed under the MIT License. See `LICENSE` for details.
=======
# safetrip-ai
AI-powered tourist safety and emergency response platform
>>>>>>> 966fc75e57a3203ca9bc20385d8ca19e7c55c252
