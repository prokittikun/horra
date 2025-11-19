import type { ZodiacSigns } from '../types/astrology';

// Type-safe zodiac data structure
type ZodiacData = {
  [K in keyof ZodiacSigns]: {
    element: 'fire' | 'earth' | 'air' | 'water';
    quality: 'cardinal' | 'fixed' | 'mutable';
    rulingPlanet: string;
    dateRange: string;
    strengths: string[];
    weaknesses: string[];
    luckyColors: string[];
  };
};

// Multi-language zodiac data structure
const zodiacDataEN: ZodiacData = {
  aries: {
    element: 'fire',
    quality: 'cardinal',
    rulingPlanet: 'Mars',
    dateRange: 'March 21 - April 19',
    strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic', 'Optimistic', 'Honest', 'Passionate'],
    weaknesses: ['Impatient', 'Moody', 'Short-tempered', 'Impulsive', 'Aggressive'],
    luckyColors: ['Red', 'Orange']
  },
  taurus: {
    element: 'earth',
    quality: 'fixed',
    rulingPlanet: 'Venus',
    dateRange: 'April 20 - May 20',
    strengths: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible', 'Stable'],
    weaknesses: ['Stubborn', 'Possessive', 'Uncompromising'],
    luckyColors: ['Green', 'Pink']
  },
  gemini: {
    element: 'air',
    quality: 'mutable',
    rulingPlanet: 'Mercury',
    dateRange: 'May 21 - June 20',
    strengths: ['Gentle', 'Affectionate', 'Curious', 'Adaptable', 'Ability to learn quickly', 'Outgoing'],
    weaknesses: ['Nervous', 'Inconsistent', 'Indecisive'],
    luckyColors: ['Yellow', 'Green']
  },
  cancer: {
    element: 'water',
    quality: 'cardinal',
    rulingPlanet: 'Moon',
    dateRange: 'June 21 - July 22',
    strengths: ['Tenacious', 'Loyal', 'Emotional', 'Sympathetic', 'Persuasive'],
    weaknesses: ['Moody', 'Pessimistic', 'Suspicious', 'Manipulative', 'Insecure'],
    luckyColors: ['White', 'Silver']
  },
  leo: {
    element: 'fire',
    quality: 'fixed',
    rulingPlanet: 'Sun',
    dateRange: 'July 23 - August 22',
    strengths: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful', 'Humorous'],
    weaknesses: ['Arrogant', 'Stubborn', 'Self-centered', 'Lazy', 'Inflexible'],
    luckyColors: ['Gold', 'Orange']
  },
  virgo: {
    element: 'earth',
    quality: 'mutable',
    rulingPlanet: 'Mercury',
    dateRange: 'August 23 - September 22',
    strengths: ['Loyal', 'Analytical', 'Kind', 'Hardworking', 'Practical'],
    weaknesses: ['Shyness', 'Worry', 'Overly critical of self and others', 'All work and no play'],
    luckyColors: ['Green', 'White', 'Yellow']
  },
  libra: {
    element: 'air',
    quality: 'cardinal',
    rulingPlanet: 'Venus',
    dateRange: 'September 23 - October 22',
    strengths: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded', 'Social'],
    weaknesses: ['Indecisive', 'Avoids confrontations', 'Will carry a grudge', 'Self-pity'],
    luckyColors: ['Pink', 'Green']
  },
  scorpio: {
    element: 'water',
    quality: 'fixed',
    rulingPlanet: 'Pluto',
    dateRange: 'October 23 - November 21',
    strengths: ['Resourceful', 'Brave', 'Passionate', 'Stubborn', 'A true friend'],
    weaknesses: ['Distrusting', 'Jealous', 'Secretive', 'Violent'],
    luckyColors: ['Dark Red', 'Maroon']
  },
  sagittarius: {
    element: 'fire',
    quality: 'mutable',
    rulingPlanet: 'Jupiter',
    dateRange: 'November 22 - December 21',
    strengths: ['Generous', 'Idealistic', 'Great sense of humor', 'Open-minded'],
    weaknesses: ['Promises more than can deliver', 'Very impatient', 'Will say anything no matter how undiplomatic'],
    luckyColors: ['Purple', 'Turquoise']
  },
  capricorn: {
    element: 'earth',
    quality: 'cardinal',
    rulingPlanet: 'Saturn',
    dateRange: 'December 22 - January 19',
    strengths: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'],
    weaknesses: ['Know-it-all', 'Unforgiving', 'Condescending', 'Expect the worst'],
    luckyColors: ['Brown', 'Black', 'Dark Green']
  },
  aquarius: {
    element: 'air',
    quality: 'fixed',
    rulingPlanet: 'Uranus',
    dateRange: 'January 20 - February 18',
    strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Intellectual'],
    weaknesses: ['Runs from emotional expression', 'Temperamental', 'Uncompromising', 'Aloof'],
    luckyColors: ['Blue', 'Green']
  },
  pisces: {
    element: 'water',
    quality: 'mutable',
    rulingPlanet: 'Neptune',
    dateRange: 'February 19 - March 20',
    strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise', 'Musical'],
    weaknesses: ['Fearful', 'Overly trusting', 'Sad', 'Desire to escape reality', 'Can be a victim or a martyr'],
    luckyColors: ['Sea Green', 'Purple']
  }
};

const zodiacDataTH: ZodiacData = {
  aries: {
    element: 'fire',
    quality: 'cardinal',
    rulingPlanet: 'Mars',
    dateRange: '21 มีนาคม - 19 เมษายน',
    strengths: ['กล้าหาญ', 'มุมานะ', 'มั่นใจ', 'กระตือรือร้น', 'มองโลกในแง่ดี', 'ซื่อสัตย์', 'หลงใหล'],
    weaknesses: ['ขาดความอดทน', 'อารมณ์แปรปรวน', 'ฉุนเฉียว', 'วู่วาม', 'ดุร้าย'],
    luckyColors: ['สีแดง', 'สีส้ม']
  },
  taurus: {
    element: 'earth',
    quality: 'fixed',
    rulingPlanet: 'Venus',
    dateRange: '20 เมษายน - 20 พฤษภาคม',
    strengths: ['น่าเชื่อถือ', 'อดทน', 'สมเหตุสมผล', 'ซื่อตรง', 'รับผิดชอบ', 'มั่นคง'],
    weaknesses: ['ดื้อรั้น', 'ยึดติด', 'ไม่ยอมประนีประนอม'],
    luckyColors: ['สีเขียว', 'สีชมพู']
  },
  gemini: {
    element: 'air',
    quality: 'mutable',
    rulingPlanet: 'Mercury',
    dateRange: '21 พฤษภาคม - 20 มิถุนายน',
    strengths: ['สุภาพ', 'รักใคร่', 'อยากรู้อยากเห็น', 'ปรับตัวได้ง่าย', 'เรียนรู้เร็ว', 'สุงสิงกับสังคม'],
    weaknesses: ['กังวล', 'ไม่สม่ำเสมอ', 'ตัดสินใจยาก'],
    luckyColors: ['สีเหลือง', 'สีเขียว']
  },
  cancer: {
    element: 'water',
    quality: 'cardinal',
    rulingPlanet: 'Moon',
    dateRange: '21 มิถุนายน - 22 กรกฎาคม',
    strengths: ['เพียรพยายาม', 'ซื่อสัตย์', 'อ่อนโยน', 'เข้าอกเข้าใจ', 'มีเสน่ห์'],
    weaknesses: ['อารมณ์แปรปรวน', 'มองโลกในแง่ร้าย', 'หวาดระแวง', 'ชอบบงการ', 'ขาดความมั่นใจ'],
    luckyColors: ['สีขาว', 'สีเงิน']
  },
  leo: {
    element: 'fire',
    quality: 'fixed',
    rulingPlanet: 'Sun',
    dateRange: '23 กรกฎาคม - 22 สิงหาคม',
    strengths: ['สร้างสรรค์', 'หลงใหล', 'ใจกว้าง', 'อบอุ่น', 'ร่าเริง', 'ขบขัน'],
    weaknesses: ['ทรนง', 'ดื้อรั้น', 'เห็นแก่ตัว', 'ขี้เกียจ', 'ไม่ยืดหยุ่น'],
    luckyColors: ['สีทอง', 'สีส้ม']
  },
  virgo: {
    element: 'earth',
    quality: 'mutable',
    rulingPlanet: 'Mercury',
    dateRange: '23 สิงหาคม - 22 กันยายน',
    strengths: ['ซื่อสัตย์', 'วิเคราะห์ดี', 'เมตตา', 'ขยัน', 'สมเหตุสมผล'],
    weaknesses: ['ขี้อาย', 'กังวล', 'วิจารณ์ตัวเองและคนอื่นมากเกินไป', 'ทำงานหนักเกินไป'],
    luckyColors: ['สีเขียว', 'สีขาว', 'สีเหลือง']
  },
  libra: {
    element: 'air',
    quality: 'cardinal',
    rulingPlanet: 'Venus',
    dateRange: '23 กันยายน - 22 ตุลาคม',
    strengths: ['ร่วมมือ', 'สุภาพ', 'สุขุม', 'เป็นธรรม', 'สุงสิงกับสังคม'],
    weaknesses: ['ตัดสินใจยาก', 'หลีกเลี่ยงการทะเลาะ', 'จดจำความผิด', 'เหงา'],
    luckyColors: ['สีชมพู', 'สีเขียว']
  },
  scorpio: {
    element: 'water',
    quality: 'fixed',
    rulingPlanet: 'Pluto',
    dateRange: '23 ตุลาคม - 21 พฤศจิกายน',
    strengths: ['มีวิธีคิดดี', 'กล้าหาญ', 'หลงใหล', 'ดื้อรั้น', 'เป็นเพื่อนที่ดี'],
    weaknesses: ['ไม่ไว้วางใจ', 'อิจฉา', 'เก็บความลับ', 'รุนแรง'],
    luckyColors: ['สีแดงเข้ม', 'สีแดงอมน้ำตาล']
  },
  sagittarius: {
    element: 'fire',
    quality: 'mutable',
    rulingPlanet: 'Jupiter',
    dateRange: '22 พฤศจิกายน - 21 ธันวาคม',
    strengths: ['ใจกว้าง', 'มุ่งมั่น', 'ขบขัน', 'มีความคิดกว้าง'],
    weaknesses: ['ให้คำมั่นไว้มากกว่าที่จะทำได้', 'ขาดความอดทนมาก', 'พูดตรงๆ ไม่กลัวใคร'],
    luckyColors: ['สีม่วง', 'สีฟ้าอมเขียว']
  },
  capricorn: {
    element: 'earth',
    quality: 'cardinal',
    rulingPlanet: 'Saturn',
    dateRange: '22 ธันวาคม - 19 มกราคม',
    strengths: ['รับผิดชอบ', 'มีวินัย', 'มีวินัยในตนเอง', 'เป็นผู้นำที่ดี'],
    weaknesses: ['คิดว่าตัวเองรู้เรื่อง', 'ไม่ยอมให้อภัย', 'ดูถูกผู้อื่น', 'คาดหวังสิ่งที่แย่ที่สุด'],
    luckyColors: ['สีน้ำตาล', 'สีดำ', 'สีเขียวเข้ม']
  },
  aquarius: {
    element: 'air',
    quality: 'fixed',
    rulingPlanet: 'Uranus',
    dateRange: '20 มกราคม - 18 กุมภาพันธ์',
    strengths: ['ก้าวหน้า', 'มีความคิดสร้างสรรค์', 'เป็นอิสระ', 'มีมนุษยธรรม', 'มีความคิด'],
    weaknesses: ['หลบเลี่ยงการแสดงความรู้สึก', 'อารมณ์แปรปรวน', 'ไม่ยอมประนีประนอม', 'เย็นชา'],
    luckyColors: ['สีฟ้า', 'สีเขียว']
  },
  pisces: {
    element: 'water',
    quality: 'mutable',
    rulingPlanet: 'Neptune',
    dateRange: '19 กุมภาพันธ์ - 20 มีนาคม',
    strengths: ['เมตตา', 'มีศิลปะ', 'มีสัญชาตญาณ', 'สุภาพ', 'ฉลาด', 'รักดนตรี'],
    weaknesses: ['กลัว', 'ไว้วางใจง่ายเกินไป', 'เศร้า', 'อยากหนีจากความเป็นจริง', 'อาจเป็นเหยื่อหรือผู้ยอมสละ'],
    luckyColors: ['สีเขียวอมฟ้า', 'สีม่วง']
  }
};

// Zodiac symbols remain the same across languages
const zodiacSymbols = {
  aries: '♈',
  taurus: '♉',
  gemini: '♊',
  cancer: '♋',
  leo: '♌',
  virgo: '♍',
  libra: '♎',
  scorpio: '♏',
  sagittarius: '♐',
  capricorn: '♑',
  aquarius: '♒',
  pisces: '♓'
};

// Lucky numbers remain the same across languages
const zodiacLuckyNumbers = {
  aries: [1, 8, 17],
  taurus: [2, 6, 9, 12],
  gemini: [5, 7, 14, 23],
  cancer: [2, 3, 15, 24],
  leo: [1, 3, 10, 19],
  virgo: [5, 14, 15, 23, 32],
  libra: [4, 6, 13, 15, 24],
  scorpio: [8, 11, 18, 22],
  sagittarius: [3, 7, 9, 12, 21],
  capricorn: [4, 8, 13, 22],
  aquarius: [4, 8, 13, 22, 31],
  pisces: [3, 9, 12, 15, 18, 24]
};

// Function to get zodiac data with language support
export function getZodiacSigns(language: string = 'en'): ZodiacSigns {
  const zodiacData = language === 'th' ? zodiacDataTH : zodiacDataEN;
  const signs: ZodiacSigns = {};

  Object.keys(zodiacData).forEach(sign => {
    signs[sign as keyof ZodiacSigns] = {
      name: sign, // Use the sign key as name
      ...zodiacData[sign as keyof ZodiacData],
      symbol: zodiacSymbols[sign as keyof typeof zodiacSymbols],
      luckyNumbers: zodiacLuckyNumbers[sign as keyof typeof zodiacLuckyNumbers]
    };
  });

  return signs;
}

// Keep the original function for backward compatibility
export const zodiacSigns = getZodiacSigns('en');

export function getZodiacSign(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'pisces';

  return 'unknown';
}

export function getElementColor(element: string): string {
  switch (element) {
    case 'fire': return 'text-red-500';
    case 'earth': return 'text-green-500';
    case 'air': return 'text-sky-500';
    case 'water': return 'text-blue-500';
    default: return 'text-gray-500';
  }
}

export function getElementGradient(element: string): string {
  switch (element) {
    case 'fire': return 'bg-gradient-to-br from-red-600 to-orange-600';
    case 'earth': return 'bg-gradient-to-br from-green-600 to-emerald-600';
    case 'air': return 'bg-gradient-to-br from-sky-600 to-blue-600';
    case 'water': return 'bg-gradient-to-br from-blue-600 to-indigo-600';
    default: return 'bg-gradient-to-br from-gray-600 to-gray-700';
  }
}