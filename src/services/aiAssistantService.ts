import { Language, ChatMessage, LocationData } from '../types';

export interface AssistantResponse {
  text: string;
  isAiGenerated: boolean;
  source: 'gemini' | 'offline_rules' | 'error_fallback';
}

const EMERGENCY_SAFETY_SYSTEM_PROMPT = `You are SafeTrip AI, an emergency tourist crisis advisor.
Your mission:
1. Provide concise, clear, life-saving advice for tourists in extreme weather events (cyclones, floods, severe storms, landslides).
2. NEVER guarantee that any route, building, or unofficial shelter is safe.
3. NEVER advise tourists to walk, drive, or swim through floodwater.
4. Always emphasize dialing official emergency numbers (Universal 112, Police 100, Ambulance 108, Tourist Helpline 1363).
5. Always urge following local police and civil defence orders.
6. Provide responses in the user's requested language (English, Hindi, Telugu, or Tamil).
Keep replies compact, formatted with bullet points for easy reading during stressful conditions.`;

// High-quality multilingual rule engine knowledge base
interface FallbackRule {
  keywords: string[];
  responses: Record<Language, string>;
}

const FALLBACK_RULES: FallbackRule[] = [
  {
    keywords: ['cyclone', 'hurricane', 'typhoon', 'storm', 'wind', 'హరికేన్', 'తుఫాను', 'चक्रवात', 'तूफान', 'புயல்', 'சூறாவளி'],
    responses: {
      en: `🌪️ **Cyclone / Severe Storm Safety Instructions:**
• **Stay Indoors:** Remain in an interior room or reinforced bathroom away from all glass windows and sliding doors.
• **Beware the Eye of the Storm:** If winds suddenly stop and the sky clears, the center of the cyclone is passing. Extremely severe reverse winds will hit shortly—DO NOT step outside!
• **Disconnect Appliances:** Turn off electrical mains before power lines suffer damage.
• **Emergency Bag:** Keep your passport, bottled water, medications, and power bank in a waterproof pouch near your bed.
• **Local Emergency Helpline:** Dial **112** for life-threatening distress.`,
      hi: `🌪️ **चक्रवात और तूफ़ान से बचाव के मुख्य नियम:**
• **अंदर रहें:** कांच की खिड़कियों और बालकनियों से दूर, किसी पक्के कमरे या अंदरूनी हिस्से में रहें।
• **'तूफ़ान की आंख' से सावधान:** यदि हवा अचानक रुक जाए, तो बाहर न निकलें—तूफ़ान का दूसरा और अधिक भयंकर भाग जल्द ही आएगा।
• **बिजली के उपकरण बंद करें:** शॉर्ट सर्किट से बचने के लिए मेन स्विच बंद कर दें।
• **आपातकालीन बैग तैयार रखें:** पासपोर्ट, दवाइयां, टॉर्च और पानी वाटरप्रूफ बैग में रखें।
• **आपातकालीन नंबर:** किसी भी तत्काल संकट में **112** पर कॉल करें।`,
      te: `🌪️ **తుఫాను / తీవ్ర గాలుల రక్షణ సూచనలు:**
• **ఇంటి లోపలే ఉండండి:** కిటికీలు, గాజు తలుపులకు దూరంగా ఉన్న గది లేదా సురక్షితమైన ప్రదేశంలో ఉండండి.
• **తుఫాను మధ్యభాగం (Eye) గురించి జాగ్రత్త:** గాలి ఒక్కసారిగా ఆగిపోయినా బయటకు వెళ్ళకండి; వెంటనే వ్యతిరేక దిశ నుండి మరింత బలమైన గాలులు వీస్తాయి.
• **ఎలక్ట్రికల్ మెయిన్స్ స్విచ్ ఆఫ్ చేయండి:** విద్యుత్ స్తంభాలు కూలి ప్రమాదాలు జరగకుండా జాగ్రత్తపడండి.
• **ఎమర్జెన్సీ బ్యాగ్:** పాస్‌పోర్ట్, మందులు, వాటర్ బాటిల్ మరియు పవర్ బ్యాంక్‌ను వాటర్‌ప్రూఫ్ పౌచ్‌లో సిద్ధంగా ఉంచుకోండి.
• **అత్యవసర హెల్ప్‌లైన్:** తక్షణ సహాయం కోసం **112** కు కాల్ చేయండి.`,
      ta: `🌪️ **புயல் மற்றும் தீவிர காற்று பாதுகாப்பு வழிகாட்டுதல்கள்:**
• **உள்ளேயே இருங்கள்:** ஜன்னல்கள் மற்றும் கண்ணாடிக் கதவுகளிலிருந்து விலகி, உட்புற பாதுகாப்பான அறையில் இருங்கள்.
• **புயலின் மையம் (Eye of Storm):** காற்று திடீரென நின்றாலும் வெளியே வர வேண்டாம். சிறிது நேரத்தில் எதிர் திசையிலிருந்து தீவிர காற்று வீசும்.
• **மின் இணைப்பைத் துண்டிக்கவும்:** ஷார்ட் சர்க்யூட்டைத் தவிர்க்க மெயின் சுவிட்சை ஆஃப் செய்யவும்.
• **அவசரப் பை:** பாஸ்போர்ட், மருந்துகள் மற்றும் பவர் பேங்க் போன்றவற்றை நீர்ப்புகா பையில் தயார் நிலையில் வைக்கவும்.
• **அவசர உதவி:** உடனடி உதவிக்கு **112** ஐ அழைக்கவும்.`
    }
  },
  {
    keywords: ['flood', 'water', 'drown', 'waterlogging', 'వరద', 'నీరు', 'बाढ़', 'पानी', 'வெள்ளம்', 'நீர்'],
    responses: {
      en: `🌊 **Flood & Rising Water Safety Protocols:**
• **Turn Around, Don't Drown:** Never walk, wade, or drive through moving floodwater. Just 15 cm (6 inches) can knock you off balance.
• **Move to Higher Ground:** If water enters your hotel or residence, move immediately to the 2nd floor or roof. Avoid enclosed attics without exit hatches.
• **Watch for Submerged Hazards:** Floodwater hides open manholes, sharp debris, and displaced venomous reptiles.
• **Turn Off Power:** Do not touch light switches if your feet are wet.
• **Water Safety:** Drink only sealed bottled water or boiled water.
• **Emergency Contact:** Dial **112** or State Disaster Management (1070 / 1077).`,
      hi: `🌊 **बाढ़ और जलभराव सुरक्षा निर्देश:**
• **पानी में न उतरें:** बहते पानी में कभी भी पैदल या वाहन से न जाएं। केवल 6 इंच पानी आपको बहा सकता है।
• **ऊंची मंजिल पर जाएं:** यदि होटल या आवास में पानी घुसता है, तो तुरंत दूसरी या तीसरी मंजिल पर जाएं।
• **बिजली के तारों से बचें:** गीले पैरों से बिजली के किसी भी स्विच या तार को न छुएं।
• **साफ पानी पिएं:** केवल सीलबंद बोतल या उबला हुआ पानी ही इस्तेमाल करें।
• **सहायता नंबर:** आपातकाल में **112** या आपदा नियंत्रण कक्ष (1070) पर संपर्क करें।`,
      te: `🌊 **వరదలు & నీటి ప్రవాహాల రక్షణ చర్యలు:**
• **వరద నీటిలోకి వెళ్లవద్దు:** ప్రవహిస్తున్న నీటిలో నడవడానికి లేదా డ్రైవ్ చేయడానికి ప్రయత్నించవద్దు. కేవలం 15 సెం.మీ నీరు కూడా మనుషులను పడదోయగలదు.
• **పై అంతస్తులకు వెళ్ళండి:** హోటల్ లేదా భవనంలోకి నీరు వస్తే వెంటనే పై అంతస్తుకు చేరుకోండి.
• **విద్యుత్ ప్రమాదాలు:** కాళ్ళు తడిగా ఉన్నప్పుడు విద్యుత్ బోర్డులను ముట్టుకోవద్దు.
• **మంచి నీరు:** సీల్డ్ బాటిల్ వాటర్ మాత్రమే తాగండి.
• **అత్యవసర కాల్:** వరద సహాయం కోసం **112** లేదా డిజాస్టర్ హెల్ప్‌లైన్ **1070** సంప్రదించండి.`,
      ta: `🌊 **வெள்ள அபாய பாதுகாப்பு வழிகாட்டல்:**
• **வெள்ள நீரில் இறங்க வேண்டாம்:** பாயும் நீரில் ஒருபோதும் நடக்கவோ வாகனத்தில் செல்லவோ கூடாது. 6 அங்குல நீர் கூட ஆபத்தானது.
• **மேல் தளத்திற்குச் செல்லுங்கள்:** தங்கும் இடத்தில் தண்ணீர் புகுந்தால் உடனடியாக 2வது தளம் அல்லது மொட்டை மாடிக்குச் செல்லுங்கள்.
• **மின் சாதனங்களைத் தொடாதீர்கள்:** ஈரமான கைகள் அல்லது கால்களுடன் சுவிட்சுகளை இயக்க வேண்டாம்.
• **பாதுகாப்பான குடிநீர்:** கொதிக்க வைத்த அல்லது சீல் செய்யப்பட்ட பாட்டில் தண்ணீரை மட்டுமே குடிக்கவும்.
• **அவசர எண்:** **112** அல்லது மாநில பேரிடர் கட்டுப்பாட்டு அறைக்கு (1070) அழைக்கவும்.`
    }
  },
  {
    keywords: ['pack', 'bag', 'checklist', 'items', 'సామాన్లు', 'బ్యాగ్', 'बैग', 'सामान', 'பொருட்கள்', 'பை'],
    responses: {
      en: `🎒 **Tourist Emergency Grab-Bag Checklist (Keep Under 5 KG):**
1. **Passports & Documents:** Sealed in a waterproof ziplock pouch along with visa & hotel printouts.
2. **Power Bank & Cables:** Keep charged at 100% with ultra-power saving mode active on your phone.
3. **Prescription Medicines:** Minimum 7-day personal supply + basic pain/fever tablets.
4. **Physical Cash:** Local currency notes (ATMs shut down during power/network failures).
5. **Flashlight / Torch:** With spare batteries or USB-rechargeable.
6. **Whistle:** For audio distress location signaling.
7. **Drinking Water & Food:** 1 liter bottled water + energy bars.
8. **Footwear:** Sturdy closed-toe walking shoes.`,
      hi: `🎒 **आपातकालीन टूरिस्ट ग्रैब-बैग चेकलिस्ट:**
1. **पासपोर्ट और दस्तावेज़:** वाटरप्रूफ ज़िपलॉक पाउच में सुरक्षित।
2. **पावर बैंक और केबल:** 100% चार्ज किया हुआ।
3. **ज़रूरी दवाएं:** कम से कम 7 दिन की अपनी दवाएं और प्राथमिक चिकित्सा।
4. **नकद पैसे:** नकद नोट (बिजली जाने पर एटीएम और कार्ड काम नहीं करते)।
5. **टॉर्च और सीटी:** अंधेरे में देखने और आवाज देने के लिए सीटी।
6. **पीने का पानी:** सीलबंद बोतल और ड्राई फ्रूट्स / बिस्कुट।
7. **जूते:** मजबूत बंद जूते।`,
      te: `🎒 **పర్యాటకుల అత్యవసర ఎమర్జెన్సీ బ్యాగ్ చెక్‌లిస్ట్:**
1. **పాస్‌పోర్ట్ & గుర్తింపు కార్డులు:** వాటర్‌ప్రూఫ్ జిప్‌లాక్ కవర్‌లో భద్రపరచండి.
2. **పవర్ బ్యాంక్ & చార్జర్:** 100% ఫుల్ చార్జ్‌తో సిద్ధంగా ఉండాలి.
3. **ముఖ్యమైన మందులు:** కనీసం 7 రోజులకు సరిపడా ప్రిస్క్రిప్షన్ మందులు.
4. **చేతిలో నగదు (Cash):** విద్యుత్ లేనప్పుడు ATMలు పనిచేయవు కాబట్టి కరెన్సీ నోట్లు దగ్గర ఉంచుకోండి.
5. **టార్చ్ లైట్ & విజిల్:** రక్షణ కోసం శబ్దం చేయడానికి విజిల్ చాలా ముఖ్యం.
6. **తాగే నీరు & ఆహారం:** సీల్డ్ వాటర్ బాటిల్స్, బిస్కెట్లు లేదా ఎనర్జీ బార్లు.
7. **రక్షణ పాదరక్షలు:** గట్టి బూట్లు ధరించండి.`,
      ta: `🎒 **சுற்றுலாப் பயணிகளுக்கான அவசர பேக் சரிபார்ப்புப் பட்டியல்:**
1. **பாஸ்போர்ட் மற்றும் ஆவணங்கள்:** நீர்ப்புகா ஜிப்லாக் பையில் பத்திரமாக வைக்கவும்.
2. **பவர் பேங்க்:** முழுமையாக சார்ஜ் செய்யப்பட்ட நிலையில் வைத்திருக்கவும்.
3. **முக்கிய மருந்துகள்:** குறைந்தது 7 நாட்களுக்கு தேவையான மருந்துகள்.
4. **ரொக்கப் பணம் (Cash):** மின் தடை ஏற்பட்டால் ஏடிஎம் இயங்காது என்பதால் கையில் பணம் வைத்திருக்கவும்.
5. **டார்ச் மற்றும் விசில்:** இருட்டில் சிக்னல் கொடுக்க விசில் மிகவும் பயனுள்ளது.
6. **குடிநீர் & உலர் உணவு:** பாட்டில் தண்ணீர் மற்றும் பிஸ்கட்.
7. **வலுவான காலணிகள்:** தடித்த காலணிகளை அணியுங்கள்.`
    }
  },
  {
    keywords: ['number', 'helpline', 'contact', 'call', 'police', 'ambulance', 'హెల్ప్‌లైన్', 'నెంబర్లు', 'नंबर', 'हेल्पलाइन', 'எண்கள்', 'தொடர்பு'],
    responses: {
      en: `📞 **Official Emergency Helplines (India & International):**
• **Universal Emergency Assistance:** **112** (Police, Fire, Ambulance in India & EU)
• **National Disaster Response Force (NDRF):** **011-24363260**
• **State Disaster Management Cell:** **1070 / 1077**
• **Tourist Police & Helpline (Incredible India):** **1363** (Toll-Free, 24/7 Multilingual)
• **Indian Coast Guard (Sea Rescue):** **1554**
• **US Emergency:** 911 | **UK Emergency:** 999
*Always state your name, exact landmark/hotel name, and coordinates when calling.*`,
      hi: `📞 **आधिकारिक आपातकालीन हेल्पलाइन नंबर:**
• **अखिल भारतीय आपातकालीन नंबर:** **112** (पुलिस, एम्बुलेंस, फायर)
• **पर्यटक हेल्पलाइन (टूरिस्ट पुलिस):** **1363** (टोल-फ्री, 24/7 बहुभाषी)
• **राष्ट्रीय आपदा मोचन बल (NDRF):** **011-24363260**
• **राज्य आपदा नियंत्रण कक्ष:** **1070 / 1077**
• **तटरक्षक बल (समुद्री बचाव):** **1554**
*कॉल करते समय अपना होटल का नाम और सही पता स्पष्ट रूप से बताएं।*`,
      te: `📞 **అధికారిక అత్యవసర హెల్ప్‌లైన్ నెంబర్లు:**
• **అత్యవసర రక్షణ (Universal Emergency):** **112** (పోలీస్, అంబులెన్స్, ఫైర్)
• **టూరిస్ట్ హెల్ప్‌లైన్ (భారత ప్రభుత్వం):** **1363** (టోల్‌ఫ్రీ, 24/7 బహుభాషా సేవ)
• **డిజాస్టర్ మేనేజ్‌మెంట్ సెల్:** **1070 / 1077**
• **తీర రక్షక దళం (కోస్ట్‌గార్డ్):** **1554**
*కాల్ చేసినప్పుడు మీ హోటల్ పేరు మరియు సరైన ప్రదేశాన్ని స్పష్టంగా తెలియజేయండి.*`,
      ta: `📞 **அதிகாரப்பூர்வ அவசர உதவி எண்கள்:**
• **ஒருங்கிணைந்த அவசர எண்:** **112** (காவல்துறை, ஆம்புலன்ஸ், தீயணைப்பு)
• **சுற்றுலாப் பயணிகள் உதவி மையம்:** **1363** (இலவச அழைப்பு, 24/7)
• **மாநில பேரிடர் மேலாண்மை:** **1070 / 1077**
• **கடலோர காவல்படை:** **1554**
*அழைக்கும் போது உங்கள் இருப்பிடத்தை தெளிவாகக் கூறவும்.*`
    }
  },
  {
    keywords: ['warning', 'alert', 'explain', 'meaning', 'ఎచ్చరిక', 'అర్థం', 'चेतावनी', 'अलर्ट', 'எச்சரிக்கை'],
    responses: {
      en: `⚠️ **Understanding Weather Warning Color Codes:**
• **Green (No Warning):** Normal weather conditions. No immediate protective action required.
• **Yellow (Watch / Be Updated):** Weather could deteriorate. Check forecasts periodically. Keep your itinerary flexible.
• **Orange (Alert / Be Prepared):** High risk of severe weather (heavy rainfall, gale winds, localized flooding). Avoid sea, ghat roads, and open beaches. Prepare emergency kit.
• **Red (Warning / Take Action):** Severe threat to life and infrastructure. Widespread waterlogging, dangerous winds, power outages. Cancel all movement and remain in designated safe buildings.`,
      hi: `⚠️ **मौसम चेतावनी रंगों का अर्थ समझें:**
• **हरा (सामान्य):** कोई गंभीर खतरा नहीं। सामान्य यात्रा जारी रख सकते हैं।
• **पीला (निगरानी रखें):** मौसम बिगड़ सकता है। अलर्ट पर नजर रखें।
• **नारंगी (सतर्क रहें):** भारी बारिश, तेज हवाओं का जोखिम। समुद्र तट और यात्रा से बचें।
• **लाल (कार्रवाई करें / रेड अलर्ट):** जीवन और संपत्ति के लिए गंभीर खतरा। घर या होटल के अंदर रहें और सभी यात्राएं तुरंत रद्द करें।`,
      te: `⚠️ **వాతావరణ హెచ్చరిక రంగుల ప్రాముఖ్యత:**
• **గ్రీన్ (సాధారణం):** వాతావరణం అనుకూలంగా ఉంది.
• **ఎల్లో (అప్రమత్తత):** వాతావరణం మారే అవకాశం ఉంది. సమాచారం తెలుసుకుంటూ ఉండండి.
• **ఆరెంజ్ (సిద్ధంగా ఉండండి):** భారీ వర్షాలు, బలమైన గాలుల హెచ్చరిక. ప్రయాణాలు వాయిదా వేయండి.
• **రెడ్ (తక్షణ రక్షణ చర్యలు):** అత్యంత ప్రమాదకరమైన పరిస్థితి. బయటకు రావద్దు, సురక్షిత భవనాల్లోనే ఉండండి.`,
      ta: `⚠️ **வானிலை எச்சரிக்கை வண்ணங்களின் விளக்கம்:**
• **பச்சை (சாதாரண):** எவ்வித அச்சுறுத்தலும் இல்லை.
• **மஞ்சள் (கண்காணிப்பு):** வானிலை மாறக்கூடும். எச்சரிக்கைகளை கவனியுங்கள்.
• **ஆரஞ்சு (தயாராக இருங்கள்):** பலத்த மழை அல்லது காற்று வீசக்கூடும். தேவையற்ற பயணங்களைத் தவிர்க்கவும்.
• **சிவப்பு (ரெட் அலர்ட்):** தீவிர பேராபத்து. கட்டிடங்களுக்குள்ளேயே பாதுகாப்பாக இருங்கள்.`
    }
  }
];

export async function askEmergencyAssistant(
  prompt: string,
  language: Language,
  activeLocation?: LocationData
): Promise<AssistantResponse> {
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // 1. If Gemini API Key is configured and accessible, try live AI generation
  if (geminiApiKey && typeof geminiApiKey === 'string' && geminiApiKey.trim().length > 5) {
    try {
      const locationContext = activeLocation
        ? `User's current tourist location: ${activeLocation.name}, ${activeLocation.region}, ${activeLocation.country}. Coordinates: ${activeLocation.lat}, ${activeLocation.lon}.`
        : 'User has not selected a specific location yet.';

      const langDirective =
        language === 'hi'
          ? 'Respond entirely in Hindi (हिन्दी).'
          : language === 'te'
          ? 'Respond entirely in Telugu (తెలుగు).'
          : language === 'ta'
          ? 'Respond entirely in Tamil (தமிழ்).'
          : 'Respond in English.';

      const fullPrompt = `${EMERGENCY_SAFETY_SYSTEM_PROMPT}

Location Context: ${locationContext}
Language Requirement: ${langDirective}

User's Emergency Question: "${prompt}"`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
            generationConfig: {
              temperature: 0.2, // low temperature for consistent, conservative safety advice
              maxOutputTokens: 600,
            },
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const generatedText = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText && generatedText.trim().length > 0) {
          return {
            text: generatedText.trim(),
            isAiGenerated: true,
            source: 'gemini',
          };
        }
      }
    } catch (apiError) {
      console.warn('Gemini API call failed or offline; safely transitioning to resilient rule engine:', apiError);
    }
  }

  // 2. Fallback: Intelligent, reliable multilingual emergency safety rule-engine
  const lowerPrompt = prompt.toLowerCase();
  for (const rule of FALLBACK_RULES) {
    if (rule.keywords.some((kw) => lowerPrompt.includes(kw.toLowerCase()))) {
      return {
        text: rule.responses[language] || rule.responses.en,
        isAiGenerated: false,
        source: 'offline_rules',
      };
    }
  }

  // General default safety response per language
  const defaultResponses: Record<Language, string> = {
    en: `🛡️ **Tourist Emergency Safety Notice:**
Regarding your inquiry about "${prompt.substring(0, 50)}...":

• **Immediate Threat:** If you face imminent danger or rising floodwaters, call **112** (Universal Emergency) or notify hotel front desk immediately.
• **Shelter:** Stay inside a solid masonry building. Avoid temporary beach sheds, glass corridors, or underground basements.
• **Official Verification:** Do not rely on unverified social media rumors. Monitor state disaster broadcasts.
• **Safety Bag:** Keep identification documents, water, and power bank ready in a waterproof pouch.

*(Operating in Resilient Offline Safety Mode with verified emergency guidelines)*`,
    hi: `🛡️ **टूरिस्ट आपातकालीन सुरक्षा सूचना:**
आपके प्रश्न के संदर्भ में:

• **आसन्न खतरा:** यदि पानी बढ़ रहा है या खतरा है, तो तुरंत **112** पर कॉल करें या होटल रिसेप्शन को सूचित करें।
• **सुरक्षित आश्रय:** पक्के भवन के अंदर रहें। कांच के द्वारों और बेसमेंट से दूर रहें।
• **आधिकारिक जानकारी:** सोशल मीडिया की अफवाहों पर ध्यान न दें। केवल राज्य आपदा प्रबंधन के आदेशों का पालन करें।
• **सुरक्षा किट:** पासपोर्ट, पैसे और दवाइयां वाटरप्रूफ बैग में रखें।

*(सत्यापित आपातकालीन सुरक्षा नियमों पर आधारित ऑफ़लाइन मोड)*`,
    te: `🛡️ **పర్యాటకుల అత్యవసర రక్షణ సమాచారం:**
మీరు అడిగిన ప్రశ్నపై ముఖ్యమైన సూచనలు:

• **తక్షణ ప్రమాదం:** నీటి మట్టం పెరుగుతున్నా లేదా ఏదైనా ప్రమాదం ఉంటే వెంటనే **112** కు కాల్ చేయండి.
• **సురక్షిత స్థావరం:** కాంక్రీట్ భవనంలోనే ఉండండి. కిటికీలు మరియు బేస్‌మెంట్‌ల నుండి దూరంగా ఉండండి.
• **అధికారిక ఆదేశాలు:** వదంతులు నమ్మవద్దు. అధికారిక విపత్తు నిర్వహణ బులెటిన్‌లను మాత్రమే అనుసరించండి.
• **ఎమర్జెన్సీ కిట్:** గుర్తింపు కార్డులు, మందులు మరియు మొబైల్ వాటర్‌ప్రూఫ్ పౌచ్‌లో భద్రపరచండి.

*(సరిచూసిన ఆఫ్-లైన్ అత్యవసర మార్గదర్శకాల మోడ్)*`,
    ta: `🛡️ **சுற்றுலாப் பயணிகள் அவசர பாதுகாப்பு வழிகாட்டல்:**
உங்கள் கேள்விக்கான முக்கிய அறிவுரைகள்:

• **உடனடி ஆபத்து:** நீர் மட்டம் உயர்ந்தாலோ அல்லது ஆபத்து ஏற்பட்டாலோ உடனடியாக **112** ஐ அழைக்கவும்.
• **பாதுகாப்பான தங்குமிடம்:** உறுதியான கட்டிடங்களின் மேல் தளங்களில் இருங்கள். கண்ணாடிக் கதவுகளைத் தவிர்க்கவும்.
• **அரசு உத்தரவுகள்:** வதந்திகளை நம்பாமல் அதிகாரப்பூர்व வானிலை அறிக்கைகளைக் கவனியுங்கள்.
• **முக்கிய ஆவணங்கள்:** பாஸ்போர்ட் மற்றும் மருந்துகளை நீர்ப்புகா பையில் தயார் நிலையில் வைக்கவும்.

*(ஆஃப்லைன் பாதுகாப்பு நெறிமுறைகள் செயல்பாட்டில் உள்ளன)*`
  };

  return {
    text: defaultResponses[language] || defaultResponses.en,
    isAiGenerated: false,
    source: 'offline_rules',
  };
}
