import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Star, Sun, Moon, Heart, Sparkles } from 'lucide-react';
import { Button } from './Button';
import LanguageSwitcher from './LanguageSwitcher';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navigation = [
    { name: t('navigation.home'), href: '/', icon: Star },
    { name: t('navigation.dailyHoroscope'), href: '/horoscope', icon: Sun },
    { name: t('navigation.birthChart'), href: '/birth-chart', icon: Moon },
    { name: t('navigation.compatibility'), href: '/compatibility', icon: Heart },
    { name: t('navigation.zodiac'), href: '/zodiac', icon: Sparkles },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic-900/95 backdrop-blur-md border-b border-cosmic-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cosmic-500 to-cosmic-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-cosmic text-white">
              Horra
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-cosmic-700/50 text-cosmic-100 border border-cosmic-600/30'
                      : 'text-cosmic-300 hover:text-cosmic-100 hover:bg-cosmic-800/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-cosmic-700/20 py-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-cosmic-700/50 text-cosmic-100 border border-cosmic-600/30'
                        : 'text-cosmic-300 hover:text-cosmic-100 hover:bg-cosmic-800/30'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              <div className="px-4 py-3">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};