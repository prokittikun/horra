export interface ZodiacSign {
  name: string;
  symbol: string;
  element: 'fire' | 'earth' | 'air' | 'water';
  quality: 'cardinal' | 'fixed' | 'mutable';
  rulingPlanet: string;
  dateRange: string;
  strengths: string[];
  weaknesses: string[];
  luckyNumbers: number[];
  luckyColors: string[];
}

export interface BirthData {
  name: string;
  date: string;
  time: string;
  location: string;
  latitude?: number;
  longitude?: number;
}

export interface Planet {
  name: string;
  sign: string;
  degree: number;
  element: 'fire' | 'earth' | 'air' | 'water';
  retrograde?: boolean;
}

export interface House {
  number: number;
  sign: string;
  cusp: number;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'quincunx';
  angle: number;
  orb: number;
}

export interface BirthChart {
  id: string;
  birthData: BirthData;
  sunSign: string;
  moonSign: string;
  risingSign: string;
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
}

export interface DailyHoroscope {
  sign: string;
  date: string;
  overall: number;
  love: number;
  career: number;
  health: number;
  finances: number;
  mood: string;
  advice: string;
  luckyNumber: number;
  luckyColor: string;
}

export interface CompatibilityData {
  personA: BirthData;
  personB: BirthData;
  overall: number;
  love: number;
  communication: number;
  trust: number;
  values: number;
  description: string;
  advice: string[];
  challenges: string[];
}

export interface Panchang {
  date: string;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  nakshatra: string;
  tithi: string;
  yoga: string;
  karana: string;
  auspiciousPeriods: { start: string; end: string; type: string }[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface ZodiacSigns {
  [key: string]: ZodiacSign;
}