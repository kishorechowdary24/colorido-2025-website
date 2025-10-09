# Colorido 2025 Event Website - Design Guidelines

## Design Approach
**Reference-Based Approach** inspired by modern event websites like Apple Events, Google I/O, and Awwwards-winning festival sites. The design balances technical precision with cultural vibrancy while maintaining a sophisticated, muted aesthetic.

## Core Design Principles
1. **Visual Hierarchy**: Poster image as focal point, guiding users to registration
2. **Festive Professionalism**: Celebratory yet refined for academic-cultural context
3. **Information Clarity**: Easy event discovery and seamless registration flow
4. **Interactive Engagement**: Subtle animations that enhance, not distract

## Color Palette

### Primary Colors (Muted Tones)
- **Deep Slate**: 220 25% 15% - Primary backgrounds, navbar
- **Soft Charcoal**: 215 15% 25% - Secondary backgrounds
- **Misty Blue**: 210 40% 92% - Light backgrounds, cards

### Accent Colors (Subdued)
- **Dusty Coral**: 340 45% 65% - Primary CTAs, active states
- **Sage Green**: 150 30% 60% - Success states, category tags
- **Warm Taupe**: 25 20% 70% - Borders, subtle highlights

### Supporting Palette
- **Neutral Gray**: 220 10% 50% - Text secondary
- **Pure White**: 0 0% 100% - Text primary on dark
- **Soft Shadow**: 220 15% 10% - Overlay backgrounds

## Typography

### Font Families
- **Headings**: Inter (600-800 weight) - Modern, geometric clarity
- **Body**: Inter (400-500 weight) - Excellent readability
- **Accents**: Space Grotesk (500-700) - Event titles, countdown timer

### Type Scale
- **Hero Title**: text-6xl (60px) / text-5xl mobile
- **Section Headers**: text-4xl (36px) / text-3xl mobile  
- **Event Cards**: text-xl (20px) / text-lg mobile
- **Body Text**: text-base (16px)
- **Captions**: text-sm (14px)

## Layout System

### Spacing Units
Use Tailwind spacing: **4, 6, 8, 12, 16, 20, 24** (1rem = 4 units)
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24 desktop, py-12 mobile
- Card gaps: gap-6 to gap-8

### Container Strategy
- **Full-width sections**: w-full with max-w-7xl centered
- **Content sections**: max-w-6xl for events, registration
- **Text content**: max-w-3xl for contact, descriptions

## Hero Section Design

### Layout
- **Centered Poster Image**: Display the Colorido 2025 poster as the hero focal point
- **Image Treatment**: max-w-2xl on desktop, max-w-full on mobile, subtle drop shadow
- **Overlay Information**: Event dates (December 17-18, 2025) below poster
- **Primary CTA**: "Register Now" button prominently placed below dates
- **Background**: Soft gradient from Deep Slate to Soft Charcoal (vertical)
- **Height**: min-h-screen with proper vertical centering

### Hero Elements
- Poster image with rounded corners (rounded-xl)
- Floating decorative elements (subtle geometric shapes in muted accent colors)
- Animated countdown timer below CTA
- Scroll indicator at bottom

## Component Library

### Navigation
- **Fixed Navbar**: Backdrop blur effect, shadow on scroll
- **Desktop**: Horizontal links with underline hover animation
- **Mobile**: Hamburger menu with slide-in drawer
- **Logo**: RVR & JC College branding left-aligned
- **CTA**: "Register" button right-aligned in accent color

### Event Cards
- **Layout**: Grid (3 columns desktop, 2 tablet, 1 mobile)
- **Card Style**: Rounded (rounded-2xl), subtle shadow, hover lift effect
- **Hover State**: Scale(1.03), increased shadow, accent border glow
- **Content**: Icon/category badge, title, participant count, description preview
- **Category Tags**: Pill-shaped badges (Technical: Sage Green, Cultural: Dusty Coral, Sports: Warm Taupe)

### Countdown Timer
- **Style**: Large bold numbers with labels
- **Layout**: 4-column grid (Days | Hours | Minutes | Seconds)
- **Design**: Glassmorphic cards with backdrop-blur-md
- **Typography**: Space Grotesk font, accent color numbers

### Forms & Inputs
- **Input Fields**: Outlined style, rounded-lg, focus:ring accent color
- **Labels**: text-sm above inputs with required asterisk
- **Buttons**: Solid fill for primary, outline for secondary
- **Validation**: Inline error messages in muted red

### Footer
- **Layout**: 4-column grid desktop, stacked mobile
- **Sections**: About, Quick Links, Contact, Social Media
- **Background**: Deep Slate with divider line
- **Social Icons**: Circular buttons with hover scale effect
- **Map Link**: Embedded mini-map or location icon with link

## Interactive Elements

### Animations (Subtle)
- **Page Load**: Fade-in with slide-up (duration-500)
- **Card Entrance**: Stagger animation (100ms delay between cards)
- **Button Hover**: Scale(1.05) + brightness increase
- **Scroll Reveals**: Intersection Observer for fade-in on scroll
- **Countdown**: Flip animation on number change

### Transitions
- All: transition-all duration-300 ease-in-out
- Hover states: duration-200
- Page transitions: duration-500

## Images

### Primary Image
- **Colorido 2025 Poster**: Centered in hero section, acts as main visual anchor
- **Placement**: Above fold, immediately visible
- **Size**: Responsive (max-w-2xl desktop, max-w-full mobile)
- **Treatment**: Drop shadow, optional subtle border

### Supporting Images
- **Placeholder Icons**: Use Heroicons for event categories and features
- **Geometric Patterns**: Subtle background patterns in muted colors for section breaks
- **No Stock Photos**: Use illustrated icons or simple graphics for event cards

## Accessibility

- ARIA labels for all interactive elements
- Keyboard navigation with visible focus states (ring-2 ring-accent)
- Color contrast ratio 4.5:1 minimum
- Alt text for poster image describing event details
- Form field labels properly associated

## Responsive Breakpoints

- **Mobile**: < 640px (sm) - Single column, stacked layouts
- **Tablet**: 640px-1024px (md-lg) - 2-column grids, condensed nav
- **Desktop**: > 1024px (xl) - Full multi-column, expanded spacing

## Page-Specific Guidelines

### Events Page
- Search bar at top (sticky on scroll)
- Filter chips below search (category + participant count)
- Event grid with dynamic loading

### Registration Page
- Two-column layout (form | event summary)
- Progress indicator for multi-step form
- Google Forms iframe integration or custom form

### Hospitality & Transportation
- Tab navigation between sections
- Info cards with icons for options
- Map integration for transportation routes

### Contact Page
- Contact form left, information cards right
- Google Maps embed for college location
- Social media links prominently displayed

This design system creates a sophisticated, festive atmosphere perfect for Colorido 2025 while maintaining professional standards and excellent usability.