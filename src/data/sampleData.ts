import { LocationData, SafetyPOI, EmergencyAlert, EmergencyGuideSection } from '../types';

export const PRESET_LOCATIONS: LocationData[] = [
  {
    id: 'loc-goa',
    name: 'Goa (Panaji & Coastal)',
    region: 'Goa',
    country: 'India',
    lat: 15.4989,
    lon: 73.8278,
    isPreset: true,
  },
  {
    id: 'loc-vizag',
    name: 'Visakhapatnam (Bay Coast)',
    region: 'Andhra Pradesh',
    country: 'India',
    lat: 17.6868,
    lon: 83.2185,
    isPreset: true,
  },
  {
    id: 'loc-chennai',
    name: 'Chennai (Coastal Corridor)',
    region: 'Tamil Nadu',
    country: 'India',
    lat: 13.0827,
    lon: 80.2707,
    isPreset: true,
  },
  {
    id: 'loc-mumbai',
    name: 'Mumbai (Coastal Zone)',
    region: 'Maharashtra',
    country: 'India',
    lat: 19.0760,
    lon: 72.8777,
    isPreset: true,
  },
  {
    id: 'loc-bali',
    name: 'Bali (Denpasar / Kuta)',
    region: 'Bali',
    country: 'Indonesia',
    lat: -8.6705,
    lon: 115.2126,
    isPreset: true,
  },
  {
    id: 'loc-miami',
    name: 'Miami Beach',
    region: 'Florida',
    country: 'USA',
    lat: 25.7907,
    lon: -80.1300,
    isPreset: true,
  },
  {
    id: 'loc-tokyo',
    name: 'Tokyo (Bay Area)',
    region: 'Kanto',
    country: 'Japan',
    lat: 35.6762,
    lon: 139.6503,
    isPreset: true,
  },
  {
    id: 'loc-bangkok',
    name: 'Bangkok (Chao Phraya)',
    region: 'Central',
    country: 'Thailand',
    lat: 13.7563,
    lon: 100.5018,
    isPreset: true,
  },
];

export const SAMPLE_POIS: SafetyPOI[] = [
  // Goa
  {
    id: 'poi-goa-hosp-1',
    name: 'Goa Medical College & Hospital',
    category: 'hospital',
    lat: 15.4678,
    lon: 73.8587,
    address: 'Bambolim, Goa 403202',
    contact: '+91 832 245 8700',
    isVerified: true,
    status: 'Operational',
    notes: '24/7 Level 1 Trauma Care & Emergency Dept',
  },
  {
    id: 'poi-goa-police-1',
    name: 'Panaji Police Station & Tourist Assistance',
    category: 'police',
    lat: 15.4995,
    lon: 73.8249,
    address: 'Near Old Secretariat, Panaji, Goa',
    contact: '112 / +91 832 242 0875',
    isVerified: true,
    status: 'Operational',
    notes: 'Official police post with Tourist Assistance Cell',
  },
  {
    id: 'poi-goa-shelter-demo',
    name: 'Community Center Cyclone Relief Shelter (Sample)',
    category: 'shelter',
    lat: 15.5120,
    lon: 73.8190,
    address: 'Miramar Beach Road, Panaji (DEMO FACILITY)',
    contact: 'Emergency Control Room: 1077',
    capacity: 'Capacity: 350 persons',
    isVerified: false,
    status: 'Operational',
    notes: 'DEMONSTRATION SAMPLE: In actual crisis check official District Collectorate bulletin.',
  },
  {
    id: 'poi-goa-hazard-demo',
    name: 'Low-Lying Creek Inundation Risk Area (Demo Overlay)',
    category: 'hazard_zone',
    lat: 15.4920,
    lon: 73.8320,
    address: 'Mandovi Estuary Banks',
    isVerified: false,
    status: 'Flooded/Closed',
    notes: 'DEMO HAZARD: High tidal surge risk. Avoid walking or driving through water.',
  },

  // Vizag
  {
    id: 'poi-vizag-hosp-1',
    name: 'King George Hospital (KGH)',
    category: 'hospital',
    lat: 17.7075,
    lon: 83.3050,
    address: 'Maharanipeta, Visakhapatnam, AP',
    contact: '+91 891 256 4891',
    isVerified: true,
    status: 'Operational',
    notes: 'Major tertiary care government hospital with emergency trauma wing',
  },
  {
    id: 'poi-vizag-shelter-demo',
    name: 'Coastal Multipurpose Cyclone Shelter (Sample)',
    category: 'shelter',
    lat: 17.7250,
    lon: 83.3300,
    address: 'RK Beach Uplands, Visakhapatnam (DEMO)',
    contact: 'Disaster Cell: 1070',
    capacity: 'Capacity: 600 persons',
    isVerified: false,
    status: 'Operational',
    notes: 'DEMONSTRATION SAMPLE: Structural refuge prototype for coastal surge events.',
  },

  // Chennai
  {
    id: 'poi-chn-hosp-1',
    name: 'Rajiv Gandhi Government General Hospital',
    category: 'hospital',
    lat: 13.0818,
    lon: 80.2778,
    address: 'EVR Periyar Salai, Park Town, Chennai',
    contact: '044 2530 5000',
    isVerified: true,
    status: 'Operational',
    notes: 'Comprehensive 24/7 emergency response hub',
  },
  {
    id: 'poi-chn-police-1',
    name: 'Marina Police Station & Beach Safety Unit',
    category: 'police',
    lat: 13.0520,
    lon: 80.2820,
    address: 'Kamarajar Salai, Triplicane, Chennai',
    contact: '112 / 044 2345 2603',
    isVerified: true,
    status: 'Operational',
    notes: 'Direct beach patrols & high-tide alert coordination',
  },
  {
    id: 'poi-chn-shelter-demo',
    name: 'Greater Chennai Relief Hall (Sample)',
    category: 'shelter',
    lat: 13.0750,
    lon: 80.2600,
    address: 'Egmore Area Relief Point (DEMO)',
    contact: 'Corporation Helpline: 1913',
    capacity: 'Capacity: 450 persons',
    isVerified: false,
    status: 'Operational',
    notes: 'DEMONSTRATION SAMPLE: Elevated municipal center used in flood simulation.',
  },

  // Mumbai
  {
    id: 'poi-mum-hosp-1',
    name: 'King Edward Memorial (KEM) Hospital',
    category: 'hospital',
    lat: 19.0019,
    lon: 72.8427,
    address: 'Acharya Donde Marg, Parel, Mumbai',
    contact: '022 2410 7000',
    isVerified: true,
    status: 'Operational',
    notes: 'Premier municipal medical center & disaster response node',
  },
  {
    id: 'poi-mum-hazard-demo',
    name: 'Hindmata Low-Lying Waterlogging Prone Zone (Demo)',
    category: 'hazard_zone',
    lat: 19.0110,
    lon: 72.8430,
    address: 'Dadar-Hindmata Junction (DEMO WARNING)',
    isVerified: false,
    status: 'Limited',
    notes: 'DEMO HAZARD: Known heavy rainfall water accumulation hotspot. Use elevated bypass.',
  },

  // Miami
  {
    id: 'poi-mia-hosp-1',
    name: 'Mount Sinai Medical Center',
    category: 'hospital',
    lat: 25.8140,
    lon: -80.1380,
    address: '4300 Alton Rd, Miami Beach, FL',
    contact: '+1 305-674-2121',
    isVerified: true,
    status: 'Operational',
    notes: 'Accredited Emergency Dept on barrier island',
  },
  {
    id: 'poi-mia-shelter-demo',
    name: 'Miami-Dade Evacuation Assembly Zone (Sample)',
    category: 'shelter',
    lat: 25.7780,
    lon: -80.1800,
    address: 'Downtown Inland Evac Staging (DEMO)',
    contact: 'Dial 311 / 911',
    capacity: 'Capacity: 1200 persons',
    isVerified: false,
    status: 'Operational',
    notes: 'DEMONSTRATION SAMPLE: Hurricane refuge staging illustration.',
  },
];

export const INITIAL_ALERTS: EmergencyAlert[] = [
  {
    id: 'alert-sample-1',
    title: 'Monsoon Depression & Heavy Rainfall Advisory',
    description: 'Squally weather with wind gusts up to 55 km/h and localized waterlogging expected across low-lying coastal roads. Tourists are advised to avoid swimming or venturing into the sea.',
    severity: 'Warning',
    eventType: 'Severe Rain',
    location: 'Goa Coastal Belt',
    coordinates: { lat: 15.4989, lon: 73.8278 },
    issuedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    source: 'State Disaster Management Authority (SDMA) / IMD (Simulated Bulletin)',
    isDemo: true,
    status: 'Active',
  },
  {
    id: 'alert-sample-2',
    title: 'High Swell Wave Alert & Beach Restriction',
    description: 'Waves reaching 3.0 to 3.8 meters forecast along the shoreline. Beach shacks advised to secure loose temporary structures; watersports suspended until wave activity subsides.',
    severity: 'Watch',
    eventType: 'General',
    location: 'Visakhapatnam & Coastal Andhra',
    coordinates: { lat: 17.6868, lon: 83.2185 },
    issuedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    source: 'Indian National Centre for Ocean Information Services (INCOIS - Sample)',
    isDemo: true,
    status: 'Active',
  },
  {
    id: 'alert-sample-3',
    title: 'Flash Flood Watch in Urban Underpasses',
    description: 'Localized precipitation accumulation exceeding 65 mm in 3 hours. Transit delays reported on arterial routes. Exercise caution on ground floor dwellings and underground metro entrances.',
    severity: 'Advisory',
    eventType: 'Flood',
    location: 'Chennai South Zone',
    coordinates: { lat: 13.0827, lon: 80.2707 },
    issuedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    source: 'Municipal Disaster Monitoring Desk (Sample)',
    isDemo: true,
    status: 'Active',
  },
];

export const EMERGENCY_GUIDES: EmergencyGuideSection[] = [
  {
    id: 'guide-flood',
    title: 'Flash Floods & Water Inundation Safety',
    category: 'Water Hazards',
    iconName: 'Droplets',
    summary: 'Essential rules for staying safe when streets, basements, or hotel ground levels begin taking in water.',
    severityGrade: 'Crucial',
    precautions: [
      'Turn around, don’t drown: Just 15 cm (6 inches) of moving water can knock down an adult; 30 cm can float a small car.',
      'Stay away from storm drains, drainage channels, and submerged manholes.',
      'Move immediately to the 2nd floor or higher if water enters your hotel or guesthouse.',
      'Do not touch electrical switches or appliances if standing in water or wet shoes.'
    ],
    actionSteps: [
      {
        phase: 'Before Hazard',
        steps: [
          'Know the elevation of your accommodation relative to nearby rivers or coastlines.',
          'Keep your passport, wallet, phone, and power bank sealed in a waterproof ziplock pouch.',
          'Identify interior stairwells and secondary escape paths avoiding low ground.'
        ]
      },
      {
        phase: 'During Hazard',
        steps: [
          'If trapped indoors, move to higher floors. Do not climb into closed attics where you could be trapped by rising water.',
          'Disconnect electricity and gas mains if safe to do so before water reaches outlets.',
          'Never attempt to walk, wade, or drive through flooded roads.',
          'Signal your location using a bright flashlight or whistle from an open upper window.'
        ]
      },
      {
        phase: 'After Hazard',
        steps: [
          'Do not return to low areas until authorities declare them safe.',
          'Avoid floodwater contact: floodwater frequently contains sewage, broken glass, and displaced wildlife.',
          'Boil tap water or drink only sealed bottled water until supply is verified.'
        ]
      }
    ],
    emergencyNumbers: [
      { label: 'Universal Emergency Helpline', number: '112' },
      { label: 'Disaster Management Helpline (India)', number: '1070 / 1077' },
      { label: 'National Disaster Response Force (NDRF)', number: '011-24363260' }
    ],
    doAndDont: {
      do: [
        'Move to higher ground immediately when flash flood alerts are announced.',
        'Drink only bottled or boiled water.',
        'Keep mobile devices charged on power banks.'
      ],
      dont: [
        'Do NOT drive or walk across flooded roadways or bridges.',
        'Do NOT swim or bathe in floodwater or overflowing rivers.',
        'Do NOT touch fallen electrical cables or submerged wires.'
      ]
    }
  },
  {
    id: 'guide-cyclone',
    title: 'Cyclone & Hurricane Preparedness',
    category: 'Severe Storms',
    iconName: 'Wind',
    summary: 'Guidelines for weathering tropical storms, violent coastal gales, and flying debris.',
    severityGrade: 'Crucial',
    precautions: [
      'Violent winds turn loose outdoor items into lethal missiles. Secure all balcony furniture.',
      'Do not be misled by the "Eye of the Storm" — a calm period when the center passes is immediately followed by severe winds from the opposite direction.',
      'Remain indoors away from glass windows and sliding doors.',
      'Charge all communication equipment before power grids are proactively shut down.'
    ],
    actionSteps: [
      {
        phase: 'Before Hazard',
        steps: [
          'Stock 3 days of non-perishable food, bottled water, and necessary prescription medications.',
          'Tightly secure or tape large glass windows if instructed by hotel management.',
          'Fill buckets or bathtubs with water for sanitary use in case municipal pumps stop.'
        ]
      },
      {
        phase: 'During Hazard',
        steps: [
          'Stay in an interior room, hallway, or bathroom with no windows.',
          'Keep your emergency grab-bag within arms reach.',
          'Listen to battery-operated radio or phone alerts for official status reports.',
          'Do NOT go outdoors during the calm eye of the storm.'
        ]
      },
      {
        phase: 'After Hazard',
        steps: [
          'Beware of fallen power lines and weakened tree branches overhead.',
          'Report broken utility lines to hotel front desk or local emergency authorities.',
          'Check in with your family using short text messages to conserve battery and bandwidth.'
        ]
      }
    ],
    emergencyNumbers: [
      { label: 'Emergency Response System', number: '112' },
      { label: 'Tourist Police Help Desk', number: '1363' },
      { label: 'Coast Guard Distress (India)', number: '1554' }
    ],
    doAndDont: {
      do: [
        'Remain inside a reinforced masonry building until the all-clear is officially sounded.',
        'Keep emergency shoes and a jacket next to your bed.',
        'Keep phones on ultra-low power saving mode.'
      ],
      dont: [
        'Do NOT stand near glass balconies or windows to film storms.',
        'Do NOT venture out when winds drop temporarily.',
        'Do NOT use candles if gas leaks are suspected — use LED flashlights.'
      ]
    }
  },
  {
    id: 'guide-heavy-rain',
    title: 'Torrential Rainfall & Landslide Hazards',
    category: 'Precipitation',
    iconName: 'CloudRain',
    summary: 'Precautions for hilly terrain, mountain roads, and sudden intense cloudbursts.',
    severityGrade: 'High',
    precautions: [
      'Hill stations and ghat roads face severe landslide and rockfall risks during prolonged precipitation.',
      'Watch for warning signs: cracking soil, tilting utility poles, or rumbling noises in valleys.',
      'Cancel non-essential road travel during Orange/Red rainfall warnings.',
      'Avoid walking near base of steep slopes or natural stormwater ravines.'
    ],
    actionSteps: [
      {
        phase: 'Before Hazard',
        steps: [
          'Verify mountain pass accessibility before departing on intercity cabs or tour buses.',
          'Ask hotel staff about local hill stability and drainage flow paths.'
        ]
      },
      {
        phase: 'During Hazard',
        steps: [
          'If in a vehicle when mud begins sliding, pull over away from the cliff edge and hazard slope.',
          'Stay awake and alert during intense nighttime downpours in hillside resorts.',
          'If you hear trees snapping or earth moving, evacuate downhill perpendicularly away from the path.'
        ]
      },
      {
        phase: 'After Hazard',
        steps: [
          'Stay away from the slide area; additional slides can occur hours later.',
          'Cooperate with highway rescue teams and avoid bypassing police barricades.'
        ]
      }
    ],
    emergencyNumbers: [
      { label: 'Emergency Highway Assistance', number: '1033' },
      { label: 'National Disaster Response', number: '112' }
    ],
    doAndDont: {
      do: [
        'Stay on high-level paved transit routes.',
        'Observe mountain road warning flags.'
      ],
      dont: [
        'Do NOT trek or hike on wet cliff paths during rain warnings.',
        'Do NOT attempt to drive over fresh mud or rockfall deposits.'
      ]
    }
  },
  {
    id: 'guide-high-wind',
    title: 'Gale Winds & Structural Collapse Safety',
    category: 'Wind Hazards',
    iconName: 'Wind',
    summary: 'Guidelines for sudden squalls, thunderstorms, and roof/canopy hazards.',
    severityGrade: 'Standard',
    precautions: [
      'Take shelter inside a sturdy building. Avoid metal sheds, tents, and temporary beach huts.',
      'Stay clear of large billboards, scaffolding, and aged trees.',
      'Park vehicles away from trees and telephone lines.'
    ],
    actionSteps: [
      {
        phase: 'Before Hazard',
        steps: ['Bring indoor lightweight patio chairs and towels from terraces.']
      },
      {
        phase: 'During Hazard',
        steps: ['Close all shutters and curtains to block flying glass shards.']
      },
      {
        phase: 'After Hazard',
        steps: ['Check for loose rooftop tiles before walking along narrow alleys.']
      }
    ],
    emergencyNumbers: [{ label: 'Fire & Rescue Services', number: '101 / 112' }],
    doAndDont: {
      do: ['Seek shelter inside solid brick/concrete structures.'],
      dont: ['Do NOT shelter under standalone trees or canvas canopies.']
    }
  },
  {
    id: 'guide-packing',
    title: 'Emergency Grab-Bag Tourist Packing Checklist',
    category: 'Preparedness',
    iconName: 'Briefcase',
    summary: 'What to keep in a lightweight, waterproof backpack ready for instant evacuation.',
    severityGrade: 'Crucial',
    precautions: [
      'A grab-bag should weigh under 5 kg so you can walk briskly with it.',
      'Keep it placed directly beside your hotel room door or bed.'
    ],
    actionSteps: [
      {
        phase: 'Before Hazard',
        steps: [
          'Passports, visa prints, hotel booking slips in a sealed waterproof pouch.',
          'Fully charged power bank (10,000mAh+) and charging cables.',
          'Essential prescription medicines for at least 7 days.',
          'Physical cash (ATMs and card swipe terminals fail during blackouts).',
          'Compact LED flashlight with spare batteries.',
          'Whistle for audio distress signaling.',
          '1 liter of sealed bottled drinking water and high-energy snack bars.',
          'Light rain poncho and small microfiber towel.'
        ]
      },
      {
        phase: 'During Hazard',
        steps: ['Grab this bag and immediately wear sturdy closed-toe walking shoes.']
      },
      {
        phase: 'After Hazard',
        steps: ['Use contents sparingly until supply chains stabilize.']
      }
    ],
    emergencyNumbers: [{ label: 'Tourist Information Helpline', number: '1363' }],
    doAndDont: {
      do: ['Carry physical cash and paper copies of emergency contacts.'],
      dont: ['Do NOT pack heavy bulky luggage that slows down evacuation.']
    }
  },
  {
    id: 'guide-comms',
    title: 'Offline Communication & Signaling Protocol',
    category: 'Communication',
    iconName: 'Radio',
    summary: 'How to communicate when cellular networks are congested or power towers fail.',
    severityGrade: 'High',
    precautions: [
      'Cell towers often experience overload during disasters. SMS texts have a much higher success rate than voice calls.',
      'Save battery by reducing screen brightness and toggling off background app refresh.'
    ],
    actionSteps: [
      {
        phase: 'Before Hazard',
        steps: [
          'Pre-write a template SMS message to your family stating your hotel name and city.',
          'Agree on a designated check-in contact person outside the hazard zone.'
        ]
      },
      {
        phase: 'During Hazard',
        steps: [
          'Send short text SMS instead of making phone calls.',
          'Use audio signals: three loud whistle blasts is the international signal for distress.',
          'At night, flash a torch 3 times, pause, and repeat.'
        ]
      },
      {
        phase: 'After Hazard',
        steps: [
          'Update your social media status to "Safe" as soon as intermittent Wi-Fi or data connects.'
        ]
      }
    ],
    emergencyNumbers: [{ label: 'Universal Emergency', number: '112' }],
    doAndDont: {
      do: ['Send SMS rather than voice calls to relieve network congestion.'],
      dont: ['Do NOT make non-essential calls that drain your phone battery.']
    }
  },
  {
    id: 'guide-evac',
    title: 'General Evacuation Protocols for Tourists',
    category: 'Evacuation',
    iconName: 'AlertTriangle',
    summary: 'Steps to take when hotel management or government authorities declare an evacuation order.',
    severityGrade: 'Crucial',
    precautions: [
      'Obey evacuation orders promptly. Delaying increases the risk of being cut off by floodwaters or blocked roads.',
      'Follow instructions from local police, civil defence, and accredited hotel marshals.'
    ],
    actionSteps: [
      {
        phase: 'Before Hazard',
        steps: [
          'Listen carefully to the designated assembly point specified by hotel staff.',
          'Wear long pants, long-sleeved shirt, and sturdy shoes for protection.'
        ]
      },
      {
        phase: 'During Hazard',
        steps: [
          'Carry only your emergency grab-bag. Leave large suitcases behind.',
          'Lock your room door and notify the reception desk that your party has evacuated.',
          'Stick with your travel group and hold hands with children or companions.'
        ]
      },
      {
        phase: 'After Hazard',
        steps: [
          'Register your name at the official relief camp register so embassies can trace you.',
          'Do not leave the safe shelter until permitted by authorities.'
        ]
      }
    ],
    emergencyNumbers: [
      { label: 'Disaster Control Room', number: '1070' },
      { label: 'Police Assistance', number: '100 / 112' }
    ],
    doAndDont: {
      do: ['Evacuate immediately when ordered by local authorities.'],
      dont: ['Do NOT turn back for forgotten non-essential belongings.']
    }
  }
];

export const SAFETY_CHECKLIST_ITEMS = [
  { id: 'chk-1', text: 'Saved hotel address & local emergency number (112) offline', category: 'Contacts' },
  { id: 'chk-2', text: 'Packed emergency grab-bag with passport, meds & cash in waterproof pouch', category: 'Packing' },
  { id: 'chk-3', text: 'Phone fully charged + power bank at 100%', category: 'Devices' },
  { id: 'chk-4', text: 'Configured trusted emergency contact in SafeTrip AI', category: 'Communication' },
  { id: 'chk-5', text: 'Stored 2 liters of sealed bottled drinking water in hotel room', category: 'Supplies' },
  { id: 'chk-6', text: 'Identified hotel secondary exit stairs avoiding elevators', category: 'Evacuation' },
  { id: 'chk-7', text: 'Checked current Open-Meteo weather risk level for destination', category: 'Awareness' },
  { id: 'chk-8', text: 'Downloaded/bookmarked flood & cyclone offline safety guides', category: 'Preparedness' },
];
