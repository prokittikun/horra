import type { BirthData } from '../types/astrology';

export interface GeminiPromptData {
  dailyHoroscope: {
    sign: string;
    date: string;
  };
  birthChart: BirthData;
  compatibility: {
    personA: BirthData;
    personB: BirthData;
  };
  panchang: {
    date: string;
    location: string;
  };
}

// Language-specific prompt templates
const LANGUAGE_INSTRUCTIONS = {
  en: 'Respond in English. All field values, text content, and descriptions should be in English.',
  th: 'ตอบเป็นภาษาไทย ค่าทุกฟิลด์ เนื้อหาและคำอธิบายต้องเป็นภาษาไทยทั้งหมด'
};

// Daily Horoscope Prompt
export const DAILY_HOROSCOPE_PROMPT = (data: GeminiPromptData['dailyHoroscope'], language: string = 'en') => `
You are an expert astrologer providing daily horoscope insights. Generate a daily horoscope reading in JSON format for the given zodiac sign and date.

${LANGUAGE_INSTRUCTIONS[language as keyof typeof LANGUAGE_INSTRUCTIONS] || LANGUAGE_INSTRUCTIONS.en}

Input:
- Zodiac sign: ${data.sign}
- Date: ${data.date}

Generate a JSON response with this exact structure:
{
  "sign": "${data.sign}",
  "date": "${data.date}",
  "overall": (1-5 rating),
  "love": (1-5 rating),
  "career": (1-5 rating),
  "health": (1-5 rating),
  "finances": (1-5 rating),
  "mood": "${language === 'th' ? 'คำอธิบายอารมณ์สั้นๆ เป็นภาษาไทย' : 'one-word mood description'}",
  "advice": "${language === 'th' ? 'คำแนะนำส่วนตัว 2-3 ประโยคเป็นภาษาไทย' : '2-3 sentence personalized advice for today'}",
  "luckyNumber": (1-31),
  "luckyColor": "${language === 'th' ? 'ชื่อสีเป็นภาษาไทย' : 'a color name'}"
}

Guidelines:
- Provide authentic, personalized astrological insights
- Consider current planetary transits and aspects
- Keep advice practical and positive
- Ratings should be realistic (not all 5s)
- Make the mood reflective of the day's energy
- Align lucky elements with the zodiac sign's traditional associations
- ${language === 'th' ? 'ให้คำแนะนำเป็นภาษาไทยที่เข้าใจง่าย เหมาะกับคนไทย' : 'Make advice culturally appropriate for English speakers'}

IMPORTANT: Return ONLY valid JSON without any additional text or explanations.
`;

// Birth Chart Analysis Prompt
export const BIRTH_CHART_PROMPT = (data: GeminiPromptData['birthChart'], language: string = 'en') => `
You are an expert Vedic and Western astrologer. Generate a comprehensive birth chart analysis in JSON format for the given birth data.

${LANGUAGE_INSTRUCTIONS[language as keyof typeof LANGUAGE_INSTRUCTIONS] || LANGUAGE_INSTRUCTIONS.en}

Input:
- Name: ${data.name}
- Birth Date: ${data.date}
- Birth Time: ${data.time}
- Birth Location: ${data.location}

Generate a JSON response with this exact structure:
{
  "id": "chart_${Date.now()}",
  "birthData": {
    "name": "${data.name}",
    "date": "${data.date}",
    "time": "${data.time}",
    "location": "${data.location}"
  },
  "sunSign": "{sun_sign_lowercase}",
  "moonSign": "{moon_sign_lowercase}",
  "risingSign": "{rising_sign_lowercase}",
  "planets": [
    {
      "name": "Sun|Moon|Mercury|Venus|Mars|Jupiter|Saturn|Uranus|Neptune|Pluto",
      "sign": "{zodiac_sign_lowercase}",
      "degree": (0-29),
      "element": "fire|earth|air|water",
      "retrograde": (true/false)
    }
  ],
  "houses": [
    {
      "number": (1-12),
      "sign": "{zodiac_sign_lowercase}",
      "cusp": (0-29)
    }
  ],
  "aspects": [
    {
      "planet1": "{planet_name}",
      "planet2": "{planet_name}",
      "type": "conjunction|opposition|trine|square|sextile",
      "angle": (0|60|90|120|180),
      "orb": (0-10)
    }
  ]
}

Guidelines:
- Calculate accurate planetary positions for the given date/time/location
- Include all major planets plus Ascendant
- Consider both tropical and sidereal calculations
- Provide accurate house placements
- Include major aspects only (conjunction, opposition, trine, square, sextile)
- Degrees should be precise (0-29)
- At least 5 planets and 3 aspects should be included
- ${language === 'th' ? 'คำนวณตำแหน่งดาวตามพิกัดที่ระบุ คำนึงถึงเขตเวลาของประเทศไทย' : 'Consider the specific geographic coordinates and time zone'}

IMPORTANT: Return ONLY valid JSON without any additional text or explanations.
`;

// Relationship Compatibility Prompt
export const COMPATIBILITY_PROMPT = (data: GeminiPromptData['compatibility'], language: string = 'en') => `
You are an expert relationship astrologer specializing in synastry and compatibility analysis. Generate a comprehensive compatibility reading in JSON format for two individuals.

${LANGUAGE_INSTRUCTIONS[language as keyof typeof LANGUAGE_INSTRUCTIONS] || LANGUAGE_INSTRUCTIONS.en}

Input:
- Person A: ${data.personA.name}, born ${data.personA.date} at ${data.personA.time} in ${data.personA.location}
- Person B: ${data.personB.name}, born ${data.personB.date} at ${data.personB.time} in ${data.personB.location}

Generate a JSON response with this exact structure:
{
  "personA": {
    "name": "${data.personA.name}",
    "date": "${data.personA.date}",
    "time": "${data.personA.time}",
    "location": "${data.personA.location}"
  },
  "personB": {
    "name": "${data.personB.name}",
    "date": "${data.personB.date}",
    "time": "${data.personB.time}",
    "location": "${data.personB.location}"
  },
  "overall": (0-100),
  "love": (0-100),
  "communication": (0-100),
  "trust": (0-100),
  "values": (0-100),
  "description": "${language === 'th' ? 'ภาพรวมความสัมพันธ์ 3-4 ประโยคเป็นภาษาไทย' : '3-4 sentence overview of the relationship dynamics and potential'}",
  "advice": [
    "${language === 'th' ? 'คำแนะนำความสัมพันธ์ 4-6 ข้อเป็นภาษาไทย' : '4-6 specific pieces of relationship advice'}"
  ],
  "challenges": [
    "${language === 'th' ? 'ความท้าทายที่อาจเกิดขึ้น 3-4 ข้อเป็นภาษาไทย' : '3-4 potential challenges to be aware of'}"
  ]
}

Guidelines:
- Analyze both Western and Vedic compatibility factors
- Consider Sun sign compatibility, Moon synastry, Venus-Mars aspects
- Provide realistic percentages (not all 90-100)
- Focus on constructive, actionable advice
- Be honest about challenges while maintaining positivity
- Include practical communication and growth suggestions
- ${language === 'th' ? 'ให้คำแนะนำที่เหมาะกับวัฒนธรรมไทย' : 'Make advice culturally appropriate'}

IMPORTANT: Return ONLY valid JSON without any additional text or explanations.
`;

// Panchang/Vedic Calendar Prompt
export const PANCHANG_PROMPT = (data: GeminiPromptData['panchang'], language: string = 'en') => `
You are an expert Vedic astrologer providing daily Panchang information. Generate accurate Panchang data in JSON format for the given date and location.

${LANGUAGE_INSTRUCTIONS[language as keyof typeof LANGUAGE_INSTRUCTIONS] || LANGUAGE_INSTRUCTIONS.en}

Input:
- Date: ${data.date}
- Location: ${data.location}

Generate a JSON response with this exact structure:
{
  "date": "${data.date}",
  "sunrise": "HH:MM",
  "sunset": "HH:MM",
  "moonPhase": "${language === 'th' ? 'ดิจันทร์|ขึ้นมาใหม่|แรกถึงครึ่ง|ขึ้นแรง|เต็มดวง|แรงดับ|สุดท้ายถึงสามส่วน|ดับสุดท้าย' : 'New Moon|Waxing Crescent|First Quarter|Waxing Gibbous|Full Moon|Waning Gibbous|Last Quarter|Waning Crescent'}",
  "nakshatra": "{nakshatra_name}",
  "tithi": "{tithi_name}",
  "yoga": "{yoga_name}",
  "karana": "{karana_name}",
  "auspiciousPeriods": [
    {
      "start": "HH:MM",
      "end": "HH:MM",
      "type": "${language === 'th' ? 'อภิจิตมุหูรัต|ราหูคาลัม|กุลิกายคาลัม|ยามคันดะ|อมฤตคาล' : 'Abhijit Muhurat|Rahu Kalam|Gulikai Kalam|Yamaganda|Amrit Kaal'}"
    }
  ]
}

Guidelines:
- Calculate accurate sunrise/sunset times for the given location
- Determine correct lunar phase and nakshatra
- Identify the tithi (lunar day) and yoga
- Include important time periods (muhurats and inauspicious times)
- Provide local time zone accurate calculations
- Consider the specific geographic coordinates if provided
- Include at least 2-3 auspicious periods
- ${language === 'th' ? 'ใช้ชื่อดาวและวันที่ตามปฏิทินจันทรคติไทย' : 'Use traditional Vedic calendar names'}

IMPORTANT: Return ONLY valid JSON without any additional text or explanations.
`;