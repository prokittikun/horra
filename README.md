# 🔮 Horra - Modern Astrology Web Application

A complete modern astrology web application built with Vite + React + TypeScript. Discover your destiny with free daily horoscopes, birth charts, and compatibility readings.

## ✨ Features

- 🌟 **Daily Horoscope** - Get personalized daily readings based on your zodiac sign
- 🎯 **Birth Chart Analysis** - Generate detailed natal charts with planetary positions
- 💕 **Compatibility Check** - Discover cosmic connections between partners
- 🌙 **Zodiac Guide** - Learn about all 12 zodiac signs and their characteristics
- 🎨 **Dark Cosmic Theme** - Beautiful navy blue theme with subtle glow effects
- 📱 **Mobile Responsive** - Fully optimized for all devices
- 🔄 **No Login Required** - Everything is free and public

## 🛠️ Tech Stack

- **Frontend**: Vite + React 19 + TypeScript
- **Styling**: TailwindCSS with custom cosmic theme
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **HTTP Client**: Axios with error handling
- **SEO**: Meta tags, Open Graph, structured data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd horra

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the application
pnpm build

# Preview the build
pnpm preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Loading.tsx
│   │   └── ErrorBoundary.tsx
│   └── features/             # Feature-specific components
│       └── ZodiacWheel.tsx
├── pages/                     # Page components
│   ├── HomePage.tsx
│   ├── DailyHoroscopePage.tsx
│   ├── BirthChartPage.tsx
│   ├── CompatibilityPage.tsx
│   └── ZodiacPage.tsx
├── services/
│   └── astrologyApi.ts        # API service layer
├── types/
│   └── astrology.ts          # TypeScript type definitions
├── hooks/
│   └── useSEO.ts             # Custom hooks
├── utils/
│   └── zodiacData.ts         # Zodiac data and utilities
└── assets/                   # Static assets
```

## 🎨 Design System

### Color Palette
- **Cosmic Blue**: Dark blue gradient theme
- **Element Colors**: Fire (red), Earth (green), Air (blue), Water (purple)
- **Glow Effects**: Subtle star-like UI effects

### Typography
- **Headings**: Cinzel (serif) for cosmic feel
- **Body**: Inter (sans-serif) for readability
- **Decorative**: Playfair Display for elegance

### Animations
- Floating zodiac wheel
- Twinkling stars
- Smooth hover effects
- Loading states

## 🔗 API Integration

The app uses a free astrology API service with the following endpoints:

- `getDailyHoroscope(sign, date)` - Daily horoscope readings
- `getBirthChart(birthData)` - Natal chart generation
- `getCompatibility(personA, personB)` - Relationship compatibility
- `getPanchang(date, location)` - Auspicious timing

**Note**: The API service includes fallback mock data for demo purposes.

## 🌐 SEO Features

- Dynamic meta tags for each page
- Open Graph and Twitter Card support
- Structured data with Schema.org
- XML sitemap
- Mobile-friendly meta tags
- Canonical URLs

## 📱 Responsive Design

- **Mobile First** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interactions
- **Adaptive layouts** for all screen sizes

## 🎯 Key Components

### ZodiacWheel
Interactive SVG zodiac wheel with:
- Animated rotation
- Hover effects with tooltips
- Click handlers for sign selection
- Element-based color coding

### SEO Hook
Custom hook for managing SEO:
- Dynamic title and meta tags
- Open Graph support
- Structured data generation
- Page-specific configurations

### Error Boundary
Graceful error handling with:
- User-friendly error messages
- Development error details
- Recovery options

## 🔧 Configuration

### Environment Variables
```env
VITE_ASTROLOGY_API_KEY=your_api_key_here
```

### Tailwind Config
Custom theme with cosmic colors, gradients, and animations:
- Extended color palette
- Custom gradients and shadows
- Animation keyframes
- Custom fonts

## 🚀 Deployment

### Build Commands
```bash
# Type check
pnpm type-check

# Build production
pnpm build

# Preview build
pnpm preview
```

### Static Hosting
The build output can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Acknowledgments

- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [React Router](https://reactrouter.com/) for navigation

---

Built with ❤️ and cosmic energy ✨
