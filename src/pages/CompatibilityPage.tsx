import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Users, Shield, Scale, Sparkles, Share2, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { geminiApi } from '../services/geminiApi';
import type { BirthData, CompatibilityData } from '../types/astrology';

export const CompatibilityPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [personA, setPersonA] = useState<BirthData>({
    name: '',
    date: '',
    time: '',
    location: ''
  });
  const [personB, setPersonB] = useState<BirthData>({
    name: '',
    date: '',
    time: '',
    location: ''
  });
  const [compatibility, setCompatibility] = useState<CompatibilityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePersonAChange = (field: keyof BirthData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPersonA(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handlePersonBChange = (field: keyof BirthData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPersonB(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const checkCompatibility = async () => {
    if (!personA.name || !personA.date || !personB.name || !personB.date) {
      setError(i18n.language === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await geminiApi.generateCompatibility(personA, personB, i18n.language);
      setCompatibility(response);
    } catch (err) {
      setError(i18n.language === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!compatibility) return;

    const reportText = `
${i18n.language === 'th' ? 'รายงานความเข้ากันได้ของความสัมพันธ์' : 'Relationship Compatibility Report'}
================================

${i18n.language === 'th' ? 'บุคคล A' : 'Person A'}: ${compatibility.personA.name}
${i18n.language === 'th' ? 'บุคคล B' : 'Person B'}: ${compatibility.personB.name}

${i18n.language === 'th' ? 'ความเข้ากันได้โดยรวม' : 'Overall Compatibility'}: ${compatibility.overall}%
${i18n.language === 'th' ? 'ความรักและความโรแมนติก' : 'Love & Romance'}: ${compatibility.love}%
${i18n.language === 'th' ? 'การสื่อสาร' : 'Communication'}: ${compatibility.communication}%
${i18n.language === 'th' ? 'ความไว้วางใจและความปลอดภัย' : 'Trust & Security'}: ${compatibility.trust}%
${i18n.language === 'th' ? 'ค่านิยมร่วมกัน' : 'Shared Values'}: ${compatibility.values}%

${i18n.language === 'th' ? 'คำอธิบาย' : 'Description'}:
${compatibility.description}

${i18n.language === 'th' ? 'คำแนะนำ' : 'Recommendations'}:
${compatibility.advice?.join('\n')}

${i18n.language === 'th' ? 'ความท้าทาย' : 'Challenges'}:
${compatibility.challenges?.join('\n')}
`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compatibility-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-cosmic-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-cosmic font-bold text-white mb-4">
            {t('compatibility.title')}
          </h1>
          <p className="text-xl text-cosmic-200 max-w-2xl mx-auto">
            {t('compatibility.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Person A Form */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-pink-600/20 to-purple-600/20">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-pink-400" />
                {t('compatibility.personA')}
              </h2>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Input
                label={t('birthChart.name')}
                value={personA.name}
                onChange={handlePersonAChange('name')}
                placeholder={i18n.language === 'th' ? 'กรอกชื่อ' : 'Enter name'}
                required
              />
              <Input
                label={t('birthChart.birthDate')}
                type="date"
                value={personA.date}
                onChange={handlePersonAChange('date')}
                required
              />
              <Input
                label={t('birthChart.birthTime')}
                type="time"
                value={personA.time}
                onChange={handlePersonAChange('time')}
                placeholder={i18n.language === 'th' ? 'เวลาเกิด (ถ้าทราบ)' : 'Birth time (if known)'}
              />
              <Input
                label={t('birthChart.birthLocation')}
                value={personA.location}
                onChange={handlePersonAChange('location')}
                placeholder={i18n.language === 'th' ? 'สถานที่เกิด (เมือง, ประเทศ)' : 'Birth location (city, country)'}
              />
            </CardContent>
          </Card>

          {/* Person B Form */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-600/20 to-cosmic-600/20">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                {t('compatibility.personB')}
              </h2>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Input
                label={t('birthChart.name')}
                value={personB.name}
                onChange={handlePersonBChange('name')}
                placeholder={i18n.language === 'th' ? 'กรอกชื่อ' : 'Enter name'}
                required
              />
              <Input
                label={t('birthChart.birthDate')}
                type="date"
                value={personB.date}
                onChange={handlePersonBChange('date')}
                required
              />
              <Input
                label={t('birthChart.birthTime')}
                type="time"
                value={personB.time}
                onChange={handlePersonBChange('time')}
                placeholder={i18n.language === 'th' ? 'เวลาเกิด (ถ้าทราบ)' : 'Birth time (if known)'}
              />
              <Input
                label={t('birthChart.birthLocation')}
                value={personB.location}
                onChange={handlePersonBChange('location')}
                placeholder={i18n.language === 'th' ? 'สถานที่เกิด (เมือง, ประเทศ)' : 'Birth location (city, country)'}
              />
            </CardContent>
          </Card>
        </div>

        {/* Check Compatibility Button */}
        <div className="text-center mb-8">
          <Button
            onClick={checkCompatibility}
            disabled={loading}
            size="lg"
            className="px-8"
          >
            {loading ? t('common.loading') : t('compatibility.checkCompatibility')}
            <Heart className="w-5 h-5 ml-2" />
          </Button>
        </div>

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

        {/* Results */}
        {compatibility && (
          <div className="space-y-8">
            {/* Overall Score */}
            <Card glow={true}>
              <CardHeader className="bg-gradient-to-r from-pink-600/30 to-purple-600/30">
                <div className="text-center">
                  <h2 className="text-3xl font-cosmic font-bold text-white mb-4">
                    {t('compatibility.overallCompatibility')}
                  </h2>
                  <div className="text-5xl font-cosmic font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
                    {compatibility.overall}%
                  </div>
                  <div className="text-cosmic-200 max-w-2xl mx-auto">
                    {compatibility.description}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Compatibility Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-pink-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {t('compatibility.loveCompatibility')}
                  </h3>
                  <div className="text-2xl font-bold text-pink-400">
                    {compatibility.love}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Scale className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {t('compatibility.communication')}
                  </h3>
                  <div className="text-2xl font-bold text-blue-400">
                    {compatibility.communication}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {t('compatibility.trust')}
                  </h3>
                  <div className="text-2xl font-bold text-green-400">
                    {compatibility.trust}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {t('compatibility.values')}
                  </h3>
                  <div className="text-2xl font-bold text-purple-400">
                    {compatibility.values}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advice and Challenges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cosmic-400" />
                    {t('compatibility.recommendations')}
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {compatibility.advice?.map((advice, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-cosmic-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-cosmic-200">{advice}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-yellow-400" />
                    {t('compatibility.conflictResolution')}
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {compatibility.challenges?.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-cosmic-200">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <Button onClick={downloadReport} variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                {i18n.language === 'th' ? 'ดาวน์โหลดรายงาน' : 'Download Report'}
              </Button>
              <Button onClick={() => window.print()}>
                <Share2 className="w-4 h-4 mr-2" />
                {i18n.language === 'th' ? 'แชร์ผลลัพธ์' : 'Share Results'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};