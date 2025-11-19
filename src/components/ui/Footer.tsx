import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Star, Moon, Heart, Sparkles, Mail, Twitter, Instagram, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: t('navigation.home'), href: '/', icon: Star },
    { name: t('navigation.dailyHoroscope'), href: '/horoscope', icon: Moon },
    { name: t('navigation.birthChart'), href: '/birth-chart', icon: Heart },
    { name: t('navigation.compatibility'), href: '/compatibility', icon: Sparkles },
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Email', href: 'mailto:hello@horra.app', icon: Mail },
  ];

  const zodiacSigns = [
    { name: 'aries', symbol: '♈' },
    { name: 'taurus', symbol: '♉' },
    { name: 'gemini', symbol: '♊' },
    { name: 'cancer', symbol: '♋' },
    { name: 'leo', symbol: '♌' },
    { name: 'virgo', symbol: '♍' },
    { name: 'libra', symbol: '♎' },
    { name: 'scorpio', symbol: '♏' },
    { name: 'sagittarius', symbol: '♐' },
    { name: 'capricorn', symbol: '♑' },
    { name: 'aquarius', symbol: '♒' },
    { name: 'pisces', symbol: '♓' },
  ];

  return (
    <footer className="bg-cosmic-950 border-t border-cosmic-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cosmic-500 to-cosmic-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-cosmic text-white">
                Horra
              </span>
            </div>
            <p className="text-cosmic-300 mb-6 max-w-md">
              {i18n.language === 'th'
                ? 'ค้นพบชะตาของคุณกับดวงชะตารายวัน Birth Chart และข้อมูลเชิงลึกทางโหราศาสตร์ จัดการการเดินทางแห่งจักรวาลด้วยปัญญาจากดวงดาว'
                : 'Discover your destiny with free daily horoscopes, birth charts, and astrological insights. Navigate life\'s cosmic journey with wisdom from the stars.'
              }
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-cosmic-800/50 border border-cosmic-700/30 rounded-lg flex items-center justify-center text-cosmic-300 hover:text-cosmic-100 hover:bg-cosmic-700/50 hover:border-cosmic-600/50 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {i18n.language === 'th' ? 'ลิงก์ด่วน' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-cosmic-300 hover:text-cosmic-100 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zodiac Signs */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('zodiac.title')}</h3>
            <div className="grid grid-cols-4 gap-2">
              {zodiacSigns.map((sign) => (
                <div
                  key={sign.name}
                  className="flex flex-col items-center p-2 bg-cosmic-800/30 rounded-lg hover:bg-cosmic-700/30 transition-colors duration-200 cursor-pointer group"
                  title={t(`zodiacNames.${sign.name}`)}
                >
                  <span className="text-cosmic-400 group-hover:text-cosmic-200 text-lg">
                    {sign.symbol}
                  </span>
                  <span className="text-xs text-cosmic-500 group-hover:text-cosmic-400 mt-1">
                    {i18n.language === 'th'
                      ? t(`zodiacNames.${sign.name}`).slice(0, 3)
                      : sign.name.slice(0, 3).toUpperCase()
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-cosmic-700/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-cosmic-400 text-sm mb-4 md:mb-0">
              © {currentYear} Horra. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-cosmic-400 hover:text-cosmic-200 transition-colors">
                {i18n.language === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-cosmic-400 hover:text-cosmic-200 transition-colors">
                {i18n.language === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service'}
              </a>
              <a href="#" className="text-cosmic-400 hover:text-cosmic-200 transition-colors">
                {i18n.language === 'th' ? 'ติดต่อ' : 'Contact'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};