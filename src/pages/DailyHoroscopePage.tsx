import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Heart, Briefcase, Activity, Palette, Hash } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { geminiApi } from '../services/geminiApi';
import type { DailyHoroscope } from '../types/astrology';
import { getZodiacSigns } from '../utils/zodiacData';

interface RatingProps {
  value: number;
  max: number;
  icon: React.ReactNode;
  label: string;
  colorScheme: 'cosmic' | 'pink' | 'blue' | 'green';
}

const Rating: React.FC<RatingProps> = ({ value, max, icon, label, colorScheme }) => {
  const percentage = (value / max) * 100;

  const colorClasses = {
    cosmic: {
      icon: 'text-cosmic-400',
      iconBg: 'bg-cosmic-400/20',
      bar: 'bg-cosmic-400'
    },
    pink: {
      icon: 'text-pink-400',
      iconBg: 'bg-pink-400/20',
      bar: 'bg-pink-400'
    },
    blue: {
      icon: 'text-blue-400',
      iconBg: 'bg-blue-400/20',
      bar: 'bg-blue-400'
    },
    green: {
      icon: 'text-green-400',
      iconBg: 'bg-green-400/20',
      bar: 'bg-green-400'
    }
  };

  const colors = colorClasses[colorScheme];

  return (
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${colors.iconBg}`}>
        <div className={colors.icon}>
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-cosmic-200">{label}</span>
          <span className="text-sm text-cosmic-400">{value}/5</span>
        </div>
        <div className="w-full bg-cosmic-700/30 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${colors.bar}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export const DailyHoroscopePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSign, setSelectedSign] = useState<string>(
    searchParams.get('sign') || ''
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [horoscope, setHoroscope] = useState<DailyHoroscope | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const zodiacSigns = getZodiacSigns(i18n.language);
  const signOptions = Object.entries(zodiacSigns).map(([key, sign]) => ({
    value: key,
    label: `${sign.symbol} ${t(`zodiacNames.${key}`)}`
  }));

  useEffect(() => {
    if (selectedSign) {
      fetchHoroscope();
    }
  }, [selectedSign, selectedDate]);

  const fetchHoroscope = async () => {
    if (!selectedSign) return;

    setLoading(true);
    setError(null);

    try {
      const response = await geminiApi.generateDailyHoroscope(selectedSign, selectedDate, i18n.language);
      setHoroscope(response);
    } catch (err) {
      setError(i18n.language === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSign) {
      const newParams = new URLSearchParams();
      newParams.set('sign', selectedSign);
      setSearchParams(newParams);
      fetchHoroscope();
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-cosmic-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-cosmic font-bold text-white mb-4">
            {t('dailyHoroscope.title')}
          </h1>
          <p className="text-xl text-cosmic-200 max-w-2xl mx-auto">
            {t('dailyHoroscope.subtitle')}
          </p>
        </div>

        {/* Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cosmic-200 mb-2">
                    {t('dailyHoroscope.selectSign')}
                  </label>
                  <select
                    value={selectedSign}
                    onChange={(e) => setSelectedSign(e.target.value)}
                    className="w-full px-4 py-2 bg-cosmic-800/50 border border-cosmic-700/30 rounded-lg text-white focus:border-cosmic-500 focus:outline-none focus:ring-2 focus:ring-cosmic-500/20"
                  >
                    <option value="">{t('dailyHoroscope.selectSign')}</option>
                    {signOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cosmic-200 mb-2">
                    {t('dailyHoroscope.selectDate')}
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    max={getTodayDate()}
                    className="w-full px-4 py-2 bg-cosmic-800/50 border border-cosmic-700/30 rounded-lg text-white focus:border-cosmic-500 focus:outline-none focus:ring-2 focus:ring-cosmic-500/20"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!selectedSign || loading}
                className="w-full"
              >
                {loading ? t('common.loading') : t('dailyHoroscope.getHoroscope')}
                <Star className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <Card className="mb-8 border-red-500/20 bg-red-500/5">
            <CardContent className="p-4">
              <div className="text-red-400 text-center">
                {error}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Horoscope Results */}
        {horoscope && (
          <div className="space-y-8">
            {/* Overview Card */}
            <Card glow={true}>
              <CardHeader className="bg-gradient-to-r from-cosmic-600 to-cosmic-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-cosmic font-bold text-white flex items-center gap-3">
                      <span className="text-3xl">
                        {zodiacSigns[horoscope.sign]?.symbol}
                      </span>
                      {t(`zodiacNames.${horoscope.sign}`)}
                    </h2>
                    <p className="text-cosmic-200 mt-1">{horoscope.date}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-cosmic-300 mb-1">{t('dailyHoroscope.mood')}</div>
                    <div className="text-xl font-bold text-cosmic-100">{horoscope.mood}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-cosmic-800/30 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-cosmic-400" />
                    {t('dailyHoroscope.advice')}
                  </h3>
                  <p className="text-cosmic-200 leading-relaxed">{horoscope.advice}</p>
                </div>

                {/* Ratings */}
                <div className="space-y-4">
                  <Rating
                    value={horoscope.overall}
                    max={5}
                    icon={<Star className="w-4 h-4" />}
                    label={t('dailyHoroscope.overall')}
                    colorScheme="cosmic"
                  />
                  <Rating
                    value={horoscope.love}
                    max={5}
                    icon={<Heart className="w-4 h-4" />}
                    label={t('dailyHoroscope.love')}
                    colorScheme="pink"
                  />
                  <Rating
                    value={horoscope.career}
                    max={5}
                    icon={<Briefcase className="w-4 h-4" />}
                    label={t('dailyHoroscope.career')}
                    colorScheme="blue"
                  />
                  <Rating
                    value={horoscope.health}
                    max={5}
                    icon={<Activity className="w-4 h-4" />}
                    label={t('dailyHoroscope.health')}
                    colorScheme="green"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lucky Elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Hash className="w-5 h-5 text-cosmic-400" />
                    {t('dailyHoroscope.luckyNumber')}
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cosmic-100 mb-2">
                      {horoscope.luckyNumber}
                    </div>
                    <div className="text-sm text-cosmic-400">
                      {i18n.language === 'th' ? 'เลขมงคลของคุณวันนี้' : 'Your lucky number for today'}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Palette className="w-5 h-5 text-cosmic-400" />
                    {t('dailyHoroscope.luckyColor')}
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cosmic-100 mb-2 capitalize">
                      {horoscope.luckyColor}
                    </div>
                    <div className="text-sm text-cosmic-400">
                      {i18n.language === 'th' ? 'สีมงคลของคุณวันนี้' : 'Your lucky color for today'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};