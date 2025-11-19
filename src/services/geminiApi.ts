import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import type { DailyHoroscope, BirthChart, CompatibilityData, Panchang } from '../types/astrology';
import type { BirthData } from '../types/astrology';
import {
  DAILY_HOROSCOPE_PROMPT,
  BIRTH_CHART_PROMPT,
  COMPATIBILITY_PROMPT,
  PANCHANG_PROMPT
} from './geminiPrompts';

class GeminiAPI {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
      this.genAI = null as any;
      this.model = null as any;
      return;
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); //gemini-2.5-flash-lite
  }

  private isAvailable(): boolean {
    return !!(this.genAI && this.model);
  }

  private async generateContent(prompt: string): Promise<any> {
    if (!this.isAvailable()) {
      throw new Error('Gemini API is not available. Please check your API key.');
    }

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Try to parse JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in Gemini response');
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      throw new Error(`Failed to generate content: ${error.message}`);
    }
  }

  async generateDailyHoroscope(sign: string, date: string, language: string = 'en'): Promise<DailyHoroscope> {
    const prompt = DAILY_HOROSCOPE_PROMPT({ sign, date }, language);
    return this.generateContent(prompt);
  }

  async generateBirthChart(birthData: BirthData, language: string = 'en'): Promise<BirthChart> {
    const prompt = BIRTH_CHART_PROMPT(birthData, language);
    return this.generateContent(prompt);
  }

  async generateCompatibility(personA: BirthData, personB: BirthData, language: string = 'en'): Promise<CompatibilityData> {
    const prompt = COMPATIBILITY_PROMPT({ personA, personB }, language);
    return this.generateContent(prompt);
  }

  async generatePanchang(date: string, location: string, language: string = 'en'): Promise<Panchang> {
    const prompt = PANCHANG_PROMPT({ date, location }, language);
    return this.generateContent(prompt);
  }

  // Health check method to verify API availability
  async testConnection(): Promise<boolean> {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      const testPrompt = 'Generate a simple JSON object: {"test": true}';
      await this.generateContent(testPrompt);
      return true;
    } catch (error) {
      console.error('Gemini connection test failed:', error);
      return false;
    }
  }
}

export const geminiApi = new GeminiAPI();
export default geminiApi;