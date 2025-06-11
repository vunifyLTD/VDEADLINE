# VDeadline 📅

> The world's most comprehensive and elegant conference deadline tracker for computer science researchers

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)

## ✨ Features

### 🎯 **Core Functionality**
- **Real-time Countdown Timers** - Live countdown to submission deadlines with timezone support
- **Comprehensive Database** - 400+ conferences, workshops, and journals across all CS domains
- **Smart Filtering** - Filter by research area, ranking, location, deadline status, and more
- **Advanced Search** - Search across conference names, locations, and research areas
- **Multiple Views** - List view and calendar view for different browsing preferences

### 🔍 **Smart Features**
- **URL Sharing** - Share specific conferences with direct links
- **Visual Indicators** - Color-coded deadline status (imminent, near, future, past)
- **Conference Rankings** - A*, A, B, C rankings with visual badges
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Themes** - Elegant design with proper contrast ratios

### 📊 **Data Organization**
- **11 Research Areas**: AI/ML, Systems, Software, Theory, HCI, Data, Security, Graphics, Bio, Robotics, Quantum
- **Multiple Submission Types**: Conferences, Workshops, Journals
- **Rich Metadata**: Deadlines, locations, proceedings, rankings, and more

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vunifyLTD/VDEADLINE.git
   cd VDEADLINE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── home/            # Homepage components
│   ├── CalendarView.tsx # Calendar interface
│   ├── ConferenceCard.tsx # Individual conference cards
│   ├── ConferenceList.tsx # Conference listing
│   ├── FilterSection.tsx # Filtering interface
│   ├── Header.tsx       # Site header
│   └── Footer.tsx       # Site footer
├── data/                # Conference data
│   ├── 2025/           # 2025 conference data
│   └── categories.ts   # Category definitions
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── dateUtils.ts    # Date formatting and calculations
│   └── filterUtils.ts  # Filtering logic
└── App.tsx             # Main application component
```

## 📊 Data Structure

### Conference Data Format
```typescript
interface Conference {
  id: string;
  name: string;
  acronym: string;
  deadline: string;
  date: string;
  location: string;
  website: string;
  areas: string[];
  ranking?: 'A*' | 'A' | 'B' | 'C';
  categories: string[];
  subcategories: string[];
  type: 'conference' | 'workshop' | 'journal';
  // ... additional metadata
}
```

### Adding New Conferences
1. Navigate to `src/data/2025/[area].json`
2. Add your conference following the existing format
3. Ensure all required fields are included
4. Test locally before submitting

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#0c87eb) - Used for primary actions and highlights
- **Research Areas**: Each area has its own color scheme
- **Status Colors**: 
  - 🔴 Imminent (≤10 days)
  - 🟡 Near (≤30 days)
  - 🟢 Future (>30 days)
  - ⚫ Past deadlines

### Typography
- **Font Family**: Inter (system fallback: system-ui, sans-serif)
- **Weights**: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Mono Font**: ui-monospace, SFMono-Regular for deadlines and IDs

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns + date-fns-tz
- **Build Tool**: Vite
- **Deployment**: Netlify (automated via GitHub Actions)

### Key Dependencies
```json
{
  "react": "^18.3.1",
  "typescript": "^5.5.3",
  "tailwindcss": "^3.4.1",
  "framer-motion": "^11.0.8",
  "date-fns": "^2.30.0",
  "lucide-react": "^0.344.0"
}
```

## 🌍 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Contribution Guide
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Add your conference data or improvements
4. Commit changes (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📈 Statistics

- **400+** Conferences, workshops, and journals
- **11** Research areas covered
- **25+** Countries represented
- **Real-time** deadline tracking
- **Mobile-first** responsive design

## 🔗 Links

- **Live Site**: [https://vdeadline.org](https://vdeadline.org)
- **GitHub**: [https://github.com/vunifyLTD/VDEADLINE](https://github.com/vunifyLTD/VDEADLINE)
- **Issues**: [Report bugs or request features](https://github.com/vunifyLTD/VDEADLINE/issues)
- **Discussions**: [Community discussions](https://github.com/vunifyLTD/VDEADLINE/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Research Community** - For providing conference information
- **Contributors** - Everyone who has helped improve VDeadline
- **Open Source Libraries** - All the amazing tools that make this possible

## 📞 Support

- **Email**: support@vdeadline.org
- **GitHub Issues**: [Create an issue](https://github.com/vunifyLTD/VDEADLINE/issues)
- **Twitter**: [@vdeadline](https://twitter.com/vdeadline)

---

<div align="center">
  <p>Made with ❤️ for the research community</p>
  <p>
    <a href="https://vdeadline.org">Website</a> •
    <a href="https://github.com/vunifyLTD/VDEADLINE">GitHub</a> •
    <a href="https://twitter.com/vdeadline">Twitter</a>
  </p>
</div>