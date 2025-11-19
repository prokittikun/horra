import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, MapPin, User, Download, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { geminiApi } from '../services/geminiApi';
import type { BirthChart, BirthData } from '../types/astrology';
import { getZodiacSigns, getElementColor, getElementGradient } from '../utils/zodiacData';

export const BirthChartPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [birthData, setBirthData] = useState<BirthData>({
    name: '',
    date: '',
    time: '',
    location: ''
  });
  const [chart, setChart] = useState<BirthChart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const zodiacSigns = getZodiacSigns(i18n.language);

  const handleInputChange = (field: keyof BirthData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBirthData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const generateChart = async () => {
    if (!birthData.name || !birthData.date || !birthData.time || !birthData.location) {
      setError(i18n.language === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await geminiApi.generateBirthChart(birthData, i18n.language);
      setChart(response);
    } catch (err) {
      setError(i18n.language === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadChart = () => {
    if (!chart) return;

    const chartText = `
${i18n.language === 'th' ? 'การวิเคราะห์ Birth Chart' : 'Birth Chart Analysis'}
===================

${i18n.language === 'th' ? 'ชื่อ' : 'Name'}: ${chart.birthData.name}
${i18n.language === 'th' ? 'วันเกิด' : 'Date'}: ${chart.birthData.date}
${i18n.language === 'th' ? 'เวลาเกิด' : 'Time'}: ${chart.birthData.time}
${i18n.language === 'th' ? 'สถานที่เกิด' : 'Location'}: ${chart.birthData.location}

${i18n.language === 'th' ? 'ตำแหน่งสำคัญ' : 'Key Positions'}:
- ${i18n.language === 'th' ? 'ราศีอาทิตย์' : 'Sun Sign'}: ${t(`zodiacNames.${chart.sunSign}`)} ${zodiacSigns[chart.sunSign]?.symbol || ''}
- ${i18n.language === 'th' ? 'ราศีจันทร์' : 'Moon Sign'}: ${t(`zodiacNames.${chart.moonSign}`)} ${zodiacSigns[chart.moonSign]?.symbol || ''}
- ${i18n.language === 'th' ? 'ราศีเดิม' : 'Rising Sign'}: ${t(`zodiacNames.${chart.risingSign}`)} ${zodiacSigns[chart.risingSign]?.symbol || ''}

${i18n.language === 'th' ? 'ตำแหน่งดาวเคราะห์' : 'Planetary Positions'}:
${chart.planets.map(planet =>
  `${t(`planets.${planet.name.toLowerCase()}`)}: ${t(`zodiacNames.${planet.sign}`)} at ${planet.degree}°`
).join('\n')}

${i18n.language === 'th' ? 'Birth Chart นี้ถูกสร้างเมื่อ' : 'This birth chart was generated on'} ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([chartText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `birth-chart-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-cosmic-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-cosmic font-bold text-white mb-4">
            {t('birthChart.title')}
          </h1>
          <p className="text-xl text-cosmic-200 max-w-2xl mx-auto">
            {t('birthChart.subtitle')}
          </p>
        </div>

        {/* Birth Data Form */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-cosmic-400" />
              {i18n.language === 'th' ? 'ข้อมูลการเกิด' : 'Birth Information'}
            </h2>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t('birthChart.name')}
                value={birthData.name}
                onChange={handleInputChange('name')}
                placeholder={i18n.language === 'th' ? 'กรอกชื่อของคุณ' : 'Enter your name'}
                required
              />
              <Input
                label={t('birthChart.birthDate')}
                type="date"
                value={birthData.date}
                onChange={handleInputChange('date')}
                required
              />
              <Input
                label={t('birthChart.birthTime')}
                type="time"
                value={birthData.time}
                onChange={handleInputChange('time')}
                placeholder={i18n.language === 'th' ? 'เวลาเกิด (เช่น: 14:30)' : 'Birth time (e.g., 14:30)'}
                required
              />
              <Input
                label={t('birthChart.birthLocation')}
                value={birthData.location}
                onChange={handleInputChange('location')}
                placeholder={i18n.language === 'th' ? 'สถานที่เกิด (เช่น: กรุงเทพมหานคร, ประเทศไทย)' : 'Birth location (e.g., Bangkok, Thailand)'}
                required
              />
            </div>

            <Button
              onClick={generateChart}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? t('common.loading') : t('birthChart.generateChart')}
              <Moon className="w-5 h-5 ml-2" />
            </Button>
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

        {/* Chart Results */}
        {chart && (
          <div className="space-y-8">
            {/* Chart Overview */}
            <Card glow={true}>
              <CardHeader className={`${getElementGradient(zodiacSigns[chart.sunSign]?.element || 'fire')}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-cosmic font-bold text-white flex items-center gap-3">
                      <span className="text-3xl">
                        {zodiacSigns[chart.sunSign]?.symbol}
                      </span>
                      {chart.birthData.name}
                    </h2>
                    <p className="text-cosmic-100 mt-1">
                      {chart.birthData.date} • {chart.birthData.time} • {chart.birthData.location}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Sun Sign */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">{zodiacSigns[chart.sunSign]?.symbol}</div>
                    <div className="font-semibold text-cosmic-100">
                      {t('birthChart.sunSign')}
                    </div>
                    <div className="text-cosmic-200">
                      {t(`zodiacNames.${chart.sunSign}`)}
                    </div>
                  </div>

                  {/* Moon Sign */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">{zodiacSigns[chart.moonSign]?.symbol}</div>
                    <div className="font-semibold text-cosmic-100">
                      {t('birthChart.moonSign')}
                    </div>
                    <div className="text-cosmic-200">
                      {t(`zodiacNames.${chart.moonSign}`)}
                    </div>
                  </div>

                  {/* Rising Sign */}
                  <div className="text-center">
                    <div className="text-4xl mb-2">{zodiacSigns[chart.risingSign]?.symbol}</div>
                    <div className="font-semibold text-cosmic-100">
                      {t('birthChart.risingSign')}
                    </div>
                    <div className="text-cosmic-200">
                      {t(`zodiacNames.${chart.risingSign}`)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-4 pt-4 border-t border-cosmic-700/30">
                  <Button onClick={downloadChart} variant="secondary">
                    <Download className="w-4 h-4 mr-2" />
                    {i18n.language === 'th' ? 'ดาวน์โหลด Birth Chart' : 'Download Chart'}
                  </Button>
                  <Button onClick={() => window.print()}>
                    <Share2 className="w-4 h-4 mr-2" />
                    {i18n.language === 'th' ? 'แชร์ Birth Chart' : 'Share Chart'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Planetary Positions - Solar System Chart */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Moon className="w-5 h-5 text-cosmic-400" />
                  {i18n.language === 'th' ? 'ตำแหน่งดาวเคราะห์' : 'Planetary Positions'}
                </h3>
              </CardHeader>
              <CardContent>
                {/* Solar System Visualization */}
                <div className="mb-8">
                  <div className="relative w-full max-w-md mx-auto aspect-square">
                    {/* Orbital paths */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                      {/* Orbital circles */}
                      {[60, 90, 120, 150, 180].map((radius, index) => (
                        <circle
                          key={index}
                          cx="200"
                          cy="200"
                          r={radius}
                          fill="none"
                          stroke="rgba(139, 92, 246, 0.1)"
                          strokeWidth="1"
                          strokeDasharray="2 4"
                        />
                      ))}

                      {/* Sun in center */}
                      <circle
                        cx="200"
                        cy="200"
                        r="20"
                        fill="url(#sunGradient)"
                        className="drop-shadow-lg"
                      />

                      {/* Zodiac wheel */}
                      {zodiacSigns && Object.entries(zodiacSigns).map(([sign, data], index) => {
                        const angle = (index * 30) - 90; // Start at top (Aries)
                        const x = 200 + 170 * Math.cos(angle * Math.PI / 180);
                        const y = 200 + 170 * Math.sin(angle * Math.PI / 180);

                        return (
                          <g key={sign}>
                            <text
                              x={x}
                              y={y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-xs fill-cosmic-300"
                              fontSize="12"
                            >
                              {data.symbol}
                            </text>
                          </g>
                        );
                      })}

                      {/* Planets */}
                      {(() => {
                        // Debug: Log all planet data
                        console.log('All planets data:', chart.planets);
                        console.log('Available zodiac signs:', Object.keys(zodiacSigns));

                        return chart.planets.map((planet, index) => {
                          const normalizedSign = planet.sign.toLowerCase();
                          const zodiacSign = zodiacSigns[normalizedSign];
                          const signIndex = Object.keys(zodiacSigns).indexOf(normalizedSign);

                          // Debug: log each planet's sign lookup
                          console.log(`Planet ${index}:`, {
                            name: planet.name,
                            originalSign: planet.sign,
                            normalizedSign: normalizedSign,
                            zodiacSign: zodiacSign,
                            element: zodiacSign?.element,
                            color: zodiacSign ? getElementColor(zodiacSign.element) : 'gray (#6B7280)'
                          });

                          const baseAngle = (signIndex * 30) - 90;
                          const planetAngle = baseAngle + (planet.degree / 12); // Distribute within sign
                          const orbitRadius = 60 + (index * 30); // Different orbits for visual separation
                          const x = 200 + orbitRadius * Math.cos(planetAngle * Math.PI / 180);
                          const y = 200 + orbitRadius * Math.sin(planetAngle * Math.PI / 180);

                          const planetSize = planet.name.toLowerCase() === 'sun' ? 16 :
                                          planet.name.toLowerCase() === 'moon' ? 12 : 8;

                          return (
                            <g key={index}>
                              <circle
                                cx={x}
                                cy={y}
                                r={planetSize}
                                fill={zodiacSign ? getElementColor(zodiacSign.element) : '#6B7280'}
                                className="drop-shadow-md"
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth="1"
                              />
                              {planet.retrograde && (
                                <text
                                  x={x}
                                  y={y + 4}
                                  textAnchor="middle"
                                  className="text-orange-400"
                                  fontSize="10"
                                  fontWeight="bold"
                                >
                                  ⚬
                                </text>
                              )}
                            </g>
                          );
                        });
                      })()}

                      {/* Gradient definitions */}
                      <defs>
                        <radialGradient id="sunGradient">
                          <stop offset="0%" stopColor="#FCD34D" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="mt-6 text-center">
                    <div className="text-sm text-cosmic-400 mb-2">
                      {i18n.language === 'th' ?
                        'แผนภูมิแสดงตำแหน่งดาวเคราะห์ในระบบสุริยจักรวาล' :
                        'Planetary positions in the solar system'
                      }
                    </div>
                    <div className="flex items-center justify-center gap-4 text-xs text-cosmic-400">
                      <span>☉ {i18n.language === 'th' ? 'ดวงอาทิตย์' : 'Sun'}</span>
                      <span>☽ {i18n.language === 'th' ? 'ดวงจันทร์' : 'Moon'}</span>
                      <span>⚬ {i18n.language === 'th' ? 'ถอยหลัง' : 'Retrograde'}</span>
                    </div>
                  </div>
                </div>

                {/* Planet Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {chart.planets.map((planet, index) => {
                    const normalizedSign = planet.sign.toLowerCase();
                    const zodiacSign = zodiacSigns[normalizedSign];
                    const planetIcon = planet.name.toLowerCase();

                    return (
                      <div
                        key={index}
                        className="p-4 bg-cosmic-800/30 rounded-lg border border-cosmic-700/30 hover:bg-cosmic-800/50 transition-colors"
                        style={{
                          borderColor: zodiacSign ? `${getElementColor(zodiacSign.element)}40` : undefined
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                              style={{
                                background: zodiacSign ? getElementGradient(zodiacSign.element) : 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
                              }}
                            >
                              {planet.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-cosmic-100">
                                {t(`planets.${planetIcon}`)}
                              </div>
                              <div className="text-xs text-cosmic-400">
                                {planet.retrograde && (
                                  <span className="text-orange-400">⚬ {i18n.language === 'th' ? 'ถอยหลัง' : 'Retrograde'}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-lg">
                            {zodiacSign?.symbol}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-cosmic-200">
                            {zodiacSign ? t(`zodiacNames.${normalizedSign}`) : planet.sign}
                          </div>
                          <div className="text-sm text-cosmic-400">
                            {planet.degree}° {zodiacSign?.element && (
                              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-cosmic-700/50">
                                {i18n.language === 'th' ?
                                  (zodiacSign.element === 'fire' ? 'ไฟ' :
                                   zodiacSign.element === 'earth' ? 'ดิน' :
                                   zodiacSign.element === 'air' ? 'ลม' : 'น้ำ') :
                                  zodiacSign.element
                                }
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Houses */}
            {chart.houses && (
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cosmic-400" />
                    {i18n.language === 'th' ? 'โฮโรสคูป (12 บ้าน)' : 'Houses (12 Houses)'}
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {chart.houses.map((house, index) => (
                      <div
                        key={index}
                        className="p-4 bg-cosmic-800/30 rounded-lg border border-cosmic-700/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-cosmic-100">
                            {i18n.language === 'th' ? `บ้านที่ ${house.number}` : `House ${house.number}`}
                          </div>
                          <div className="text-lg">
                            {zodiacSigns[house.sign]?.symbol}
                          </div>
                        </div>
                        <div className="text-cosmic-200">
                          {t(`zodiacNames.${house.sign}`)} • {house.cusp}°
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};