import { geminiApi } from './geminiApi';
import type { BirthData } from '../types/astrology';

export async function testGeminiIntegration() {
  console.log('Testing Gemini API integration...');

  try {
    // Test 1: Daily Horoscope
    console.log('\n🔮 Testing Daily Horoscope generation...');
    const dailyHoroscope = await geminiApi.generateDailyHoroscope('aries', '2024-01-15');
    console.log('✅ Daily Horoscope:', dailyHoroscope);

    // Test 2: Birth Chart
    console.log('\n🎯 Testing Birth Chart generation...');
    const birthData: BirthData = {
      name: 'John Doe',
      date: '1990-01-01',
      time: '12:00',
      location: 'New York, NY, USA'
    };
    const birthChart = await geminiApi.generateBirthChart(birthData);
    console.log('✅ Birth Chart generated for:', birthChart.birthData.name);

    // Test 3: Compatibility
    console.log('\n💕 Testing Compatibility analysis...');
    const personA: BirthData = {
      name: 'Alice',
      date: '1990-03-21',
      time: '10:30',
      location: 'Los Angeles, CA, USA'
    };
    const personB: BirthData = {
      name: 'Bob',
      date: '1992-07-15',
      time: '14:45',
      location: 'Chicago, IL, USA'
    };
    const compatibility = await geminiApi.generateCompatibility(personA, personB);
    console.log('✅ Compatibility analysis completed, overall score:', compatibility.overall);

    // Test 4: Panchang
    console.log('\n🕉️ Testing Panchang generation...');
    const panchang = await geminiApi.generatePanchang('2024-01-15', 'New Delhi, India');
    console.log('✅ Panchang generated for:', panchang.date);

    console.log('\n🎉 All Gemini tests passed successfully!');
    return true;

  } catch (error: any) {
    console.error('\n❌ Gemini test failed:', error.message);
    return false;
  }
}

// Test connection health
export async function testGeminiConnection() {
  console.log('Testing Gemini API connection...');
  const isConnected = await geminiApi.testConnection();

  if (isConnected) {
    console.log('✅ Gemini API connection successful!');
  } else {
    console.log('❌ Gemini API connection failed. Check your API key.');
  }

  return isConnected;
}