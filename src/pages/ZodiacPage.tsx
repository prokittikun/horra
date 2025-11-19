import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Calendar, Info, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { getZodiacSigns, getElementColor, getElementGradient } from '../utils/zodiacData';

export const ZodiacPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedSign, setSelectedSign] = useState<string>('');

  const zodiacSigns = getZodiacSigns(i18n.language);
  const selectedSignData = selectedSign ? zodiacSigns[selectedSign] : null;

  const elementInfo = {
    fire: {
      name: t('zodiac.elements.fire'),
      description: i18n.language === 'th' ? 'หลงใหล กระตือรือร้น และรุนแรง' : 'Passionate, dynamic, and temperamental',
      signs: ['aries', 'leo', 'sagittarius']
    },
    earth: {
      name: t('zodiac.elements.earth'),
      description: i18n.language === 'th' ? 'มั่นคง เป็นประโยชน์ และเสถียร' : 'Grounded, practical, and stable',
      signs: ['taurus', 'virgo', 'capricorn']
    },
    air: {
      name: t('zodiac.elements.air'),
      description: i18n.language === 'th' ? 'มีความคิด ปรับตัวได้ และอยากรู้อยากเห็น' : 'Intellectual, adaptive, and curious',
      signs: ['gemini', 'libra', 'aquarius']
    },
    water: {
      name: t('zodiac.elements.water'),
      description: i18n.language === 'th' ? 'มีสัญชาตญาณ อารมณ์ดี และลึกลับ' : 'Intuitive, emotional, and mysterious',
      signs: ['cancer', 'scorpio', 'pisces']
    }
  };

  const qualityInfo = {
    cardinal: {
      name: t('zodiac.qualities.cardinal'),
      description: i18n.language === 'th' ? 'ผู้ริเริ่มและผู้นำ' : 'Initiators and leaders',
      signs: ['aries', 'cancer', 'libra', 'capricorn']
    },
    fixed: {
      name: t('zodiac.qualities.fixed'),
      description: i18n.language === 'th' ? 'เสถียรและมุ่งมั่น' : 'Stable and determined',
      signs: ['taurus', 'leo', 'scorpio', 'aquarius']
    },
    mutable: {
      name: t('zodiac.qualities.mutable'),
      description: i18n.language === 'th' ? 'ปรับตัวได้และยืดหยุ่น' : 'Adaptable and flexible',
      signs: ['gemini', 'virgo', 'sagittarius', 'pisces']
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-cosmic font-bold text-white mb-4">
            {t('zodiac.title')}
          </h1>
          <p className="text-xl text-cosmic-200 max-w-2xl mx-auto">
            {t('zodiac.subtitle')}
          </p>
        </div>

        {/* Sign Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {Object.entries(zodiacSigns).map(([key, sign]) => (
            <button
              key={key}
              onClick={() => setSelectedSign(key)}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                selectedSign === key
                  ? 'bg-cosmic-700/50 border-cosmic-500 shadow-glow scale-105'
                  : 'bg-cosmic-800/30 border-cosmic-700/30 hover:bg-cosmic-700/30 hover:border-cosmic-600/50 hover:scale-[1.02]'
              }`}
            >
              <div className="text-4xl mb-2">{sign.symbol}</div>
              <div className="font-semibold text-white capitalize">{t(`zodiacNames.${key}`)}</div>
            </button>
          ))}
        </div>

        {/* Selected Sign Details */}
        {selectedSignData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <Card glow={true} className="h-full">
                <CardHeader className={`${getElementGradient(selectedSignData.element)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-cosmic font-bold text-white flex items-center gap-3">
                        <span className="text-4xl">{selectedSignData.symbol}</span>
                        {t(`zodiacNames.${selectedSign}`)}
                      </h2>
                      <p className="text-cosmic-100 mt-2">{selectedSignData.dateRange}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-cosmic-400 mb-1">
                          {t('zodiac.element')}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold text-lg ${getElementColor(selectedSignData.element)}`}>
                            {elementInfo[selectedSignData.element].name}
                          </span>
                          <span className="text-cosmic-400">•</span>
                          <span className="text-cosmic-300 text-sm">
                            {elementInfo[selectedSignData.element].description}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-cosmic-400 mb-1">
                          {t('zodiac.quality')}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg text-cosmic-100">
                            {qualityInfo[selectedSignData.quality].name}
                          </span>
                          <span className="text-cosmic-400">•</span>
                          <span className="text-cosmic-300 text-sm">
                            {qualityInfo[selectedSignData.quality].description}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-cosmic-400 mb-1">
                          {t('zodiac.rulingPlanet')}
                        </h3>
                        <div className="font-semibold text-lg text-cosmic-100">
                          {selectedSignData.rulingPlanet}
                        </div>
                      </div>
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-cosmic-400 mb-2">
                          {t('zodiac.strengths')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedSignData.strengths.slice(0, 4).map((strength, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-cosmic-700/50 text-cosmic-100 rounded-full text-sm"
                            >
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-cosmic-400 mb-2">
                          {t('zodiac.weaknesses')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedSignData.weaknesses.slice(0, 3).map((weakness, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-cosmic-800/50 text-cosmic-300 rounded-full text-sm"
                            >
                              {weakness}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button className="flex-1" asChild>
                      <Link to={`/horoscope?sign=${selectedSign}`}>
                        <Calendar className="w-4 h-4 mr-2" />
                        {t('dailyHoroscope.getHoroscope')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="secondary" className="flex-1" asChild>
                      <Link to={`/compatibility?sign=${selectedSign}`}>
                        <Heart className="w-4 h-4 mr-2" />
                        {t('compatibility.title')}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Lucky Elements */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cosmic-400" />
                    {i18n.language === 'th' ? 'ของนำโชค' : 'Lucky Elements'}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-cosmic-400 mb-2">
                      {t('zodiac.luckyNumbers')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSignData.luckyNumbers.map((number, index) => (
                        <span
                          key={index}
                          className="w-8 h-8 bg-cosmic-700/50 text-cosmic-100 rounded-full flex items-center justify-center text-sm font-medium"
                        >
                          {number}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-cosmic-400 mb-2">
                      {t('zodiac.luckyColors')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSignData.luckyColors.map((color, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-cosmic-600/50 to-cosmic-700/50 text-cosmic-100 rounded-full text-sm"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Signs */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Info className="w-5 h-5 text-cosmic-400" />
                    {i18n.language === 'th' ? 'ราศีประเภทเดียวกัน' : 'Related Signs'}
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-cosmic-400 mb-2">
                        {t('zodiac.element')} {elementInfo[selectedSignData.element].name}
                      </h4>
                      <div className="flex gap-2">
                        {elementInfo[selectedSignData.element].signs.map(sign => (
                          <button
                            key={sign}
                            onClick={() => setSelectedSign(sign)}
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm transition-all ${
                              selectedSign === sign
                                ? 'bg-cosmic-600 border-cosmic-400'
                                : 'bg-cosmic-800/30 border-cosmic-700/30 hover:border-cosmic-600/50'
                            }`}
                          >
                            {zodiacSigns[sign].symbol}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-cosmic-400 mb-2">
                        {t('zodiac.quality')} {qualityInfo[selectedSignData.quality].name}
                      </h4>
                      <div className="flex gap-2">
                        {qualityInfo[selectedSignData.quality].signs.map(sign => (
                          <button
                            key={sign}
                            onClick={() => setSelectedSign(sign)}
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm transition-all ${
                              selectedSign === sign
                                ? 'bg-cosmic-600 border-cosmic-400'
                                : 'bg-cosmic-800/30 border-cosmic-700/30 hover:border-cosmic-600/50'
                            }`}
                          >
                            {zodiacSigns[sign].symbol}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Elements Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-cosmic font-bold text-white mb-6 text-center">
            {i18n.language === 'th' ? 'ธาตุทั้งสี่' : 'The Four Elements'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(elementInfo).map(([element, info]) => (
              <Card key={element} hover={true}>
                <CardContent className="p-6 text-center">
                  <div className={`text-3xl mb-3 ${getElementColor(element)}`}>
                    {element === 'fire' && '🔥'}
                    {element === 'earth' && '🌍'}
                    {element === 'air' && '💨'}
                    {element === 'water' && '💧'}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{info.name}</h3>
                  <p className="text-cosmic-300 text-sm mb-3">{info.description}</p>
                  <div className="flex justify-center gap-2">
                    {info.signs.map(sign => (
                      <button
                        key={sign}
                        onClick={() => setSelectedSign(sign)}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-all ${
                          selectedSign === sign
                            ? 'bg-cosmic-600 border-cosmic-400'
                            : 'bg-cosmic-800/30 border-cosmic-700/30 hover:border-cosmic-600/50'
                        }`}
                      >
                        {zodiacSigns[sign].symbol}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};