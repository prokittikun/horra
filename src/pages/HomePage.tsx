import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Heart, Sparkles, ArrowRight, Users, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ZodiacWheel } from '../components/features/ZodiacWheel';
import { usePageSEO } from '../hooks/useSEO';

export const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedSign, setSelectedSign] = useState<string>('');

  usePageSEO('home');

  const features = [
    {
      icon: Calendar,
      title: t('home.dailyHoroscope'),
      description: t('home.dailyHoroscope'),
      href: '/horoscope',
      color: 'text-yellow-500'
    },
    {
      icon: Moon,
      title: t('home.birthChartAnalysis'),
      description: t('home.birthChartAnalysis'),
      href: '/birth-chart',
      color: 'text-blue-500'
    },
    {
      icon: Heart,
      title: t('home.compatibilityCheck'),
      description: t('home.compatibilityCheck'),
      href: '/compatibility',
      color: 'text-pink-500'
    },
    {
      icon: Users,
      title: t('home.zodiacGuide'),
      description: t('home.zodiacGuide'),
      href: '/zodiac',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="relative">
      {/* Background */}
      <div className="fixed inset-0 bg-starfield -z-10" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-cosmic-900/50 to-cosmic-900 -z-10" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cosmic-gradient animate-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-cosmic font-bold text-white mb-6 animate-fade-in">
              {t('home.title')}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cosmic-400 to-cosmic-600">
                {t('home.subtitle')}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-cosmic-200 mb-8 max-w-3xl mx-auto font-serif">
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group"
                onClick={() => document.getElementById('zodiac-wheel')?.scrollIntoView()}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {t('home.exploreFeatures')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                asChild
              >
                <Link to="/horoscope">
                  {t('home.dailyHoroscope')}
                  <Calendar className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating stars decoration */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-twinkle" />
        <div className="absolute top-32 right-20 w-3 h-3 bg-cosmic-400 rounded-full animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-cosmic-300 rounded-full animate-pulse" />
      </section>

      {/* Interactive Zodiac Wheel */}
      <section id="zodiac-wheel" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-cosmic font-bold text-white mb-4">
              {t('zodiac.title')}
            </h2>
            <p className="text-cosmic-200 text-lg max-w-2xl mx-auto">
              {t('zodiac.selectSign')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <div className="flex justify-center">
              <ZodiacWheel
                size={350}
                interactive={true}
                onSignSelect={setSelectedSign}
              />
            </div>

            {selectedSign && (
              <Card className="max-w-md animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-cosmic text-white capitalize">
                      {t(`zodiacNames.${selectedSign}`)}
                    </h3>
                    <span className="text-3xl">
                      {selectedSign === 'aries' && '♈'}
                      {selectedSign === 'taurus' && '♉'}
                      {selectedSign === 'gemini' && '♊'}
                      {selectedSign === 'cancer' && '♋'}
                      {selectedSign === 'leo' && '♌'}
                      {selectedSign === 'virgo' && '♍'}
                      {selectedSign === 'libra' && '♎'}
                      {selectedSign === 'scorpio' && '♏'}
                      {selectedSign === 'sagittarius' && '♐'}
                      {selectedSign === 'capricorn' && '♑'}
                      {selectedSign === 'aquarius' && '♒'}
                      {selectedSign === 'pisces' && '♓'}
                    </span>
                  </div>
                  <Button className="w-full" asChild>
                    <Link to={`/horoscope?sign=${selectedSign}`}>
                      {t('dailyHoroscope.getHoroscope')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cosmic-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-cosmic font-bold text-white mb-4">
              {t('home.exploreFeatures')}
            </h2>
            <p className="text-cosmic-200 text-lg max-w-2xl mx-auto">
              {t('home.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  hover={true}
                  floating={true}
                  className="group cursor-pointer"
                  asChild
                >
                  <Link to={feature.href}>
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-cosmic-700/50 mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-cosmic-300 text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-cosmic font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-400 to-cosmic-600 mb-2">
                12
              </div>
              <div className="text-cosmic-300">
                {t('zodiac.title')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-cosmic font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-400 to-cosmic-600 mb-2">
                {i18n.language === 'th' ? 'ฟรี' : 'Free'}
              </div>
              <div className="text-cosmic-300">
                {i18n.language === 'th' ? 'บริการ' : 'Services'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-cosmic font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-400 to-cosmic-600 mb-2">
                24/7
              </div>
              <div className="text-cosmic-300">
                {i18n.language === 'th' ? 'ใช้งานได้' : 'Available'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-cosmic font-bold text-transparent bg-clip-text bg-gradient-to-r from-cosmic-400 to-cosmic-600 mb-2">
                ∞
              </div>
              <div className="text-cosmic-300">
                {i18n.language === 'th' ? 'ข้อมูลเชิงลึก' : 'Insights'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card glow={true} className="bg-card-glow border-cosmic-600/30">
            <CardContent className="p-12">
              <h2 className="text-4xl font-cosmic font-bold text-white mb-4">
                {t('home.title')}
              </h2>
              <p className="text-xl text-cosmic-200 mb-8">
                {t('home.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/horoscope">
                    {t('home.exploreFeatures')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/birth-chart">
                    {t('home.birthChartAnalysis')}
                    <Moon className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};