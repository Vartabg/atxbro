# ATXBRO - Austin Experience Platform
# ATXBRO Project Handover Documentation

## Project Overview
**ATXBRO** is a mobile-first, card-based web application designed for rideshare passengers to explore Austin, Texas. The app features location-aware content, Austin-themed interactions, and a unique swipe-based navigation system.

## Current Architecture

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+) with CSS Grid/Flexbox
- **Styling**: CSS Custom Properties with Austin-themed color palette
- **Architecture**: Component-based with service-oriented design
- **Mobile**: Touch-optimized with gesture-based navigation
- **Deployment**: Python HTTP server for development

### Project Structure
```
atxbro/
├── src/                          # Main application files (SERVER ROOT)
│   ├── index.html               # Main application entry point
│   ├── app.js                   # Core application logic
│   ├── styles/
│   │   └── main.css            # Complete styling system
│   ├── components/             # Future component modules
│   ├── services/               # Future service layer
│   ├── utils/                  # Future utility functions
│   ├── assets/                 # Images, icons, sounds
│   └── data/                   # JSON data files
├── package.json                # Project configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## Current Implementation Status

### ✅ Completed Features

#### 1. Core Card-Based Navigation System
- **6 swipeable cards**: Welcome, VetNav, PetFinder, News, Facts, Hire Me
- **Touch gestures**: Horizontal swipe for navigation, vertical swipe for Easter eggs
- **Progress dots**: Direct navigation to specific cards
- **Smooth animations**: 60fps transitions with CSS transforms

#### 2. Austin-Themed Design System
- **Color palette**: Austin-inspired colors (blues, greens, sunset oranges)
- **Typography**: Mobile-optimized with clamp() for responsive sizing
- **Visual identity**: "Keep Austin Weird" branding throughout

#### 3. Location-Aware Content System
- **Neighborhood simulator**: 6 Austin neighborhoods with unique characteristics
- **Dynamic content**: Cards change colors and show location-specific recommendations
- **Interactive discovery**: Location notifications and floating emojis
- **Neighborhoods implemented**:
  - Downtown (urban core)
  - 6th Street (party district)
  - South Congress (keep it weird)
  - East Austin (artsy & hip)
  - Rainey Street (bungalow bars)
  - Zilker (outdoorsy)

#### 4. Interactive Features
- **Easter eggs**: Swipe up triggers floating Austin emojis
- **Weird Level meter**: Increases with interactions
- **Location-specific emojis**: Each neighborhood has unique emoji
- **Achievement system**: Foundation for "Keep Austin Weird" achievements

### 🔄 Partially Implemented

#### 1. Card Content
- **Welcome card**: Fully functional with location-aware recommendations
- **Other cards**: Basic structure in place, need full content implementation

#### 2. Data Layer
- **Neighborhood data**: Complete Austin neighborhood information
- **Service layer**: Architecture planned but not implemented

### 📋 Planned Features (Not Yet Implemented)

#### 1. Real Data Integration
- **VetNav**: Austin VA services and benefits
- **PetFinder**: Austin animal shelter integration
- **Austin News**: Local news feeds
- **Austin Facts**: Curated city information

#### 2. Advanced Features
- **PWA capabilities**: Offline mode, home screen install
- **Real geolocation**: GPS-based neighborhood detection
- **Push notifications**: Location-based alerts
- **User preferences**: Personalization system

## Technical Implementation Guidelines

### 🚨 Critical Development Rules

#### File Management
```bash
# ALWAYS work from the src directory
cd /Users/vartny/atxbro/src

# Server runs from src directory
python3 -m http.server 8000 --bind 0.0.0.0

# Mobile testing
# Access via: http://192.168.11.0:8000 (or your local IP)
```

#### Code Architecture Principles
1. **Mobile-first**: All interactions must work on touch devices
2. **Component-based**: Each module should be self-contained
3. **Austin-centric**: All content and interactions should reflect Austin culture
4. **Performance-focused**: 60fps animations, minimal dependencies
5. **Accessibility**: Touch-friendly targets (min 44px), proper contrast

### CSS Architecture

#### Austin Color System
```css
:root {
  --austin-blue: #4A90A4;        /* Lake Austin blue */
  --austin-green: #7BA05B;       /* Hill Country green */
  --austin-sunset: #E8A87C;      /* Texas sunset */
  --austin-weird-purple: #8B5A96; /* Keep Austin Weird */
  --austin-hot-pink: #FF6B9D;    /* Vibrant accent */
  --austin-neon-green: #39FF14;  /* Electric accent */
  --austin-bbq-red: #C44536;     /* BBQ red */
  --austin-limestone: #F5F3F0;   /* Austin limestone */
  --austin-deep-blue: #1B365D;   /* Deep water */
}
```

#### Card System
- **Full viewport cards**: Each card is exactly 100vw wide
- **Gradient backgrounds**: Neighborhood-specific color schemes
- **Responsive typography**: clamp() for all text sizing
- **Glass morphism effects**: rgba backgrounds with backdrop-filter

### JavaScript Architecture

#### Core App Structure
```javascript
class ATXBROApp {
  constructor() {
    this.currentCard = 0;
    this.totalCards = 6;
    this.weirdLevel = 3;
    this.currentNeighborhood = null;
    this.austinNeighborhoods = { /* neighborhood data */ };
  }
  
  // Core methods: setupSwipeHandlers, visitNeighborhood, 
  // onNeighborhoodChange, createFloatingEmoji
}
```

#### Touch Event Handling
- **touchstart**: Capture initial position
- **touchmove**: Real-time drag preview
- **touchend**: Execute navigation or Easter egg
- **Gesture detection**: Distinguish horizontal vs vertical swipes

### Austin-Specific Features

#### Neighborhood System
Each neighborhood includes:
- **name**: Display name
- **vibe**: Short description
- **colors**: [primary, secondary] gradient colors
- **emoji**: Unique identifier emoji
- **recommendations**: Array of location-specific suggestions

#### Easter Egg System
- **Trigger**: Swipe up on any card
- **Effect**: Floating Austin-themed emojis
- **Progression**: Increases "Weird Level" meter
- **Emojis**: 🤠🌮🎸🦇🛸🎪👽🌵🔥⚡

## Development Workflow

### Adding New Features
1. **Plan**: Define mobile-first interaction patterns
2. **Implement**: Start with HTML structure, then CSS, then JavaScript
3. **Test**: Always test on actual mobile device
4. **Iterate**: Refine based on touch interaction feedback

### Testing Protocol
```bash
# Start development server
cd /Users/vartny/atxbro/src
python3 -m http.server 8000 --bind 0.0.0.0

# Test on mobile device
# Open browser to: http://[LOCAL_IP]:8000
# Test all gestures: swipe left/right, swipe up, tap progress dots
```

### Git Workflow
```bash
# Always commit from project root
cd /Users/vartny/atxbro
git add .
git commit -m "feat: descriptive commit message"
```

## Next Development Priorities

### Immediate (High Priority)
1. **Complete VetNav module**: Austin VA services, benefits calculator
2. **Implement PetFinder**: Austin animal shelter API integration
3. **Add Austin News feed**: Local news aggregation
4. **Build Austin Facts database**: Curated city information

### Medium Priority
1. **PWA implementation**: Service worker, offline capability
2. **Real geolocation**: Replace simulator with GPS
3. **Form integration**: "Hire Me" contact system
4. **Performance optimization**: Lazy loading, code splitting

### Long-term
1. **AI-powered recommendations**: Personalized Austin suggestions
2. **Social features**: Share discoveries, rate locations
3. **Analytics integration**: User behavior insights
4. **Multi-language support**: Spanish localization

## Handover Notes for AI Agents

### Working Directory Protocol
**CRITICAL**: Always ensure you're working in `/Users/vartny/atxbro/src` directory. Files updated in the parent directory will not be reflected in the running application.

### Mobile-First Development
All interactions must be tested on actual mobile devices. The experience is specifically designed for rideshare passengers using phones.

### Austin Cultural Integration
Every feature should reflect Austin's unique culture. Use local terminology, references, and maintain the "Keep Austin Weird" ethos throughout development.

### Code Quality Standards
- Maintain vanilla JavaScript approach for performance
- Use CSS custom properties for theming
- Ensure all touch targets are minimum 44px
- Test gesture interactions thoroughly
- Commit frequently with descriptive messages

### User Experience Goals
The app should feel like a native mobile experience, not a traditional website. Focus on smooth animations, intuitive gestures, and location-aware content that enhances the rideshare passenger experience in Austin.

---

**Current Status**: Location-aware card system fully functional
**Next Agent Task**: Choose and implement one of the six main modules (VetNav, PetFinder, News, Facts, or Hire Me)
**Testing URL**: http://192.168.11.0:8000 (or current local IP)