import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getZodiacSigns } from '../../utils/zodiacData';

interface ZodiacWheelProps {
  size?: number;
  interactive?: boolean;
  onSignSelect?: (sign: string) => void;
}

export const ZodiacWheel: React.FC<ZodiacWheelProps> = ({
  size = 400,
  interactive = true,
  onSignSelect
}) => {
  const { t, i18n } = useTranslation();
  const [hoveredSign, setHoveredSign] = useState<string | null>(null);
  const zodiacSigns = getZodiacSigns(i18n.language);

  const signOrder = [
    'aries', 'taurus', 'gemini', 'cancer',
    'leo', 'virgo', 'libra', 'scorpio',
    'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  const createZodiacPath = (index: number, total: number) => {
    const angle = (index * 360) / total;
    const nextAngle = ((index + 1) * 360) / total;
    const startAngle = (angle * Math.PI) / 180;
    const endAngle = (nextAngle * Math.PI) / 180;

    const x1 = size / 2 + (size / 2 - 10) * Math.cos(startAngle);
    const y1 = size / 2 + (size / 2 - 10) * Math.sin(startAngle);
    const x2 = size / 2 + (size / 2 - 10) * Math.cos(endAngle);
    const y2 = size / 2 + (size / 2 - 10) * Math.sin(endAngle);
    const x3 = size / 2 + (size / 3) * Math.cos(startAngle);
    const y3 = size / 2 + (size / 3) * Math.sin(startAngle);
    const x4 = size / 2 + (size / 3) * Math.cos(endAngle);
    const y4 = size / 2 + (size / 3) * Math.sin(endAngle);

    return `M ${x3} ${y3} A ${size/3} ${size/3} 0 0 1 ${x4} ${y4} L ${x2} ${y2} A ${size/2 - 10} ${size/2 - 10} 0 0 0 ${x1} ${y1} Z`;
  };

  const getSignPosition = (index: number) => {
    const angle = (index * 360) / 12 + 15; // Center of segment
    const radian = (angle * Math.PI) / 180;
    const radius = size / 2.5;

    return {
      x: size / 2 + radius * Math.cos(radian),
      y: size / 2 + radius * Math.sin(radian)
    };
  };

  const getElementHexColor = (element: string) => {
    switch (element) {
      case 'fire': return '#ef4444';
      case 'earth': return '#10b981';
      case 'air': return '#3b82f6';
      case 'water': return '#6366f1';
      default: return '#6b7280';
    }
  };

  const handleSignClick = (sign: string) => {
    if (interactive && onSignSelect) {
      onSignSelect(sign);
    }
  };

  const getTranslatedElement = (element: string) => {
    switch (element) {
      case 'fire': return t('zodiac.elements.fire');
      case 'earth': return t('zodiac.elements.earth');
      case 'air': return t('zodiac.elements.air');
      case 'water': return t('zodiac.elements.water');
      default: return element;
    }
  };

  const getTranslatedQuality = (quality: string) => {
    switch (quality) {
      case 'cardinal': return t('zodiac.qualities.cardinal');
      case 'fixed': return t('zodiac.qualities.fixed');
      case 'mutable': return t('zodiac.qualities.mutable');
      default: return quality;
    }
  };

  return (
    <div className="relative inline-block">
      <svg
        width={size}
        height={size}
        className="animate-spin-slow"
        style={{
          animationDuration: '60s'
        }}
      >
        <defs>
          <radialGradient id="starfield" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#1e1b4b" stopOpacity="1" />
            <stop offset="100%" stopColor="#0f0a23" stopOpacity="1" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 10}
          fill="url(#starfield)"
          stroke="#3730a3"
          strokeWidth="2"
          opacity="0.9"
        />

        {/* Inner circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 3}
          fill="#0f0a23"
          stroke="#3730a3"
          strokeWidth="2"
          opacity="0.9"
        />

        {/* Zodiac segments */}
        {signOrder.map((signKey, index) => {
          const sign = zodiacSigns[signKey];
          const isHovered = hoveredSign === signKey;

          return (
            <g key={signKey}>
              <path
                d={createZodiacPath(index, 12)}
                fill={getElementHexColor(sign.element)}
                stroke="#1e1b4b"
                strokeWidth="2"
                opacity={isHovered ? 1 : 0.7}
                className={interactive ? 'cursor-pointer transition-opacity duration-200' : ''}
                onMouseEnter={() => setHoveredSign(signKey)}
                onMouseLeave={() => setHoveredSign(null)}
                onClick={() => handleSignClick(signKey)}
                filter={isHovered ? 'url(#glow)' : ''}
              />

              {/* Symbol */}
              <text
                x={getSignPosition(index).x}
                y={getSignPosition(index).y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="20"
                fill="white"
                className="pointer-events-none select-none"
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.8))'
                }}
              >
                {sign.symbol}
              </text>
            </g>
          );
        })}

        {/* Center star */}
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <path
            d="M 0,-20 L 5,-5 L 20,-3 L 8,5 L 5,20 L 0,8 L -5,20 L -8,5 L -20,-3 L -5,-5 Z"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="2"
            filter="url(#glow)"
            className="animate-pulse-slow"
          />
        </g>

        {/* Decorative stars */}
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i * 360) / 30;
          const radius = size / 2 - 30;
          const x = size / 2 + radius * Math.cos((angle * Math.PI) / 180);
          const y = size / 2 + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1"
              fill="white"
              opacity="0.6"
              className="animate-twinkle"
              style={{
                animationDelay: `${i * 0.1}s`
              }}
            />
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {hoveredSign && interactive && (
        <div className="absolute top-0 left-full ml-4 bg-cosmic-900 border border-cosmic-700/30 rounded-lg p-3 shadow-cosmic min-w-40 z-10">
          <div className="text-white font-semibold">
            {t(`zodiacNames.${hoveredSign}`)} {zodiacSigns[hoveredSign].symbol}
          </div>
          <div className="text-cosmic-300 text-sm mt-1">
            {zodiacSigns[hoveredSign].dateRange}
          </div>
          <div className="text-cosmic-400 text-xs mt-1">
            {getTranslatedElement(zodiacSigns[hoveredSign].element)} • {getTranslatedQuality(zodiacSigns[hoveredSign].quality)}
          </div>
        </div>
      )}
    </div>
  );
};

interface MiniZodiacWheelProps {
  selectedSign?: string;
  onSignSelect?: (sign: string) => void;
}

export const MiniZodiacWheel: React.FC<MiniZodiacWheelProps> = ({
  selectedSign,
  onSignSelect
}) => {
  const { t, i18n } = useTranslation();
  const zodiacSigns = getZodiacSigns(i18n.language);

  return (
    <div className="grid grid-cols-6 gap-2">
      {Object.entries(zodiacSigns).map(([key, sign]) => (
        <button
          key={key}
          onClick={() => onSignSelect?.(key)}
          className={`p-3 rounded-lg border transition-all duration-200 ${
            selectedSign === key
              ? 'bg-cosmic-700/50 border-cosmic-500 text-white shadow-glow'
              : 'bg-cosmic-800/30 border-cosmic-700/30 text-cosmic-300 hover:bg-cosmic-700/30 hover:border-cosmic-600/50 hover:text-cosmic-200'
          }`}
          title={`${t(`zodiacNames.${key}`)} - ${sign.dateRange}`}
        >
          <div className="text-2xl mb-1">{sign.symbol}</div>
          <div className="text-xs">
            {i18n.language === 'th'
              ? t(`zodiacNames.${key}`).slice(0, 3)
              : t(`zodiacNames.${key}`).slice(0, 3).toUpperCase()
            }
          </div>
        </button>
      ))}
    </div>
  );
};