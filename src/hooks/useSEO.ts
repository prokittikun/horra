import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export const useSEO = (props: SEOProps = {}) => {
  const location = useLocation();

  useEffect(() => {
    const {
      title = 'Horra - Free Astrology & Horoscope Readings',
      description = 'Discover your destiny with Horra - Free daily horoscopes, birth charts, and astrology compatibility readings',
      keywords = 'horoscope, astrology, zodiac, birth chart, compatibility, daily horoscope, natal chart',
      ogImage = '/og-image.jpg',
      canonical,
      noIndex = false
    } = props;

    // Update title
    document.title = title;

    // Update or create meta description
    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;

      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }

      tag.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Horra Astrology');

    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:url', `${window.location.origin}${location.pathname}`, 'property');
    updateMetaTag('og:image', `${window.location.origin}${ogImage}`, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${window.location.origin}${ogImage}`);

    // Canonical URL
    const canonicalUrl = canonical || `${window.location.origin}${location.pathname}`;
    updateMetaTag('canonical', canonicalUrl);

    // Robots meta tag
    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Schema.org structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Horra",
      "description": description,
      "url": `${window.location.origin}`,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/horoscope?sign={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Update structured data
    let structuredDataScript = document.querySelector('#structured-data');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      structuredDataScript.setAttribute('id', 'structured-data');
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, [props, location.pathname]);
};

// Page-specific SEO configurations
export const usePageSEO = (page: string, customProps?: SEOProps) => {
  const pageSEOConfig: { [key: string]: SEOProps } = {
    home: {
      title: 'Horra - Free Astrology & Horoscope Readings',
      description: 'Discover your destiny with Horra - Free daily horoscopes, birth charts, and astrology compatibility readings. Navigate life with wisdom from the stars.',
      keywords: 'horoscope, astrology, zodiac, birth chart, compatibility, daily horoscope, natal chart, free astrology'
    },
    horoscope: {
      title: 'Daily Horoscope - Free Astrology Readings | Horra',
      description: 'Get your personalized daily horoscope reading based on your zodiac sign. Discover what the stars have in store for you today.',
      keywords: 'daily horoscope, free horoscope, astrology reading, zodiac signs, daily astrology'
    },
    'birth-chart': {
      title: 'Free Birth Chart Analysis & Natal Chart Reading | Horra',
      description: 'Generate your free birth chart and natal chart analysis. Discover your cosmic blueprint with detailed planetary positions and astrological insights.',
      keywords: 'birth chart, natal chart, free birth chart, astrology chart, planetary positions'
    },
    compatibility: {
      title: 'Relationship Compatibility & Love Astrology | Horra',
      description: 'Check your relationship compatibility with our free astrology compatibility test. Discover cosmic connections and relationship insights.',
      keywords: 'relationship compatibility, love compatibility, astrology compatibility, zodiac compatibility, soulmates'
    },
    zodiac: {
      title: 'Zodiac Signs Guide - Complete Astrology Information | Horra',
      description: 'Learn about all 12 zodiac signs, their characteristics, elements, and qualities. Discover detailed information about your sign.',
      keywords: 'zodiac signs, astrology signs, zodiac characteristics, zodiac elements, zodiac qualities'
    }
  };

  const config = pageSEOConfig[page] || pageSEOConfig.home;
  useSEO({ ...config, ...customProps });
};