# Colorido 2025 Event Website

## Overview

Colorido 2025 is a national-level technical, cultural, and sports festival website for RVR & JC College of Engineering. The application is a full-stack event management platform that allows users to browse events, register for participation, and access hospitality/transportation information. Built with React and Express, it features a modern, responsive design with real-time event registration and participant tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Styling**
- **React with TypeScript**: Component-based SPA using functional components and hooks
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library (New York variant) with Radix UI primitives
- **Styling**: TailwindCSS with custom design tokens following a muted, professional color palette
- **State Management**: TanStack Query (React Query) for server state with infinite stale time
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

**Design System**
- Muted color palette with Deep Slate, Dusty Coral, and Sage Green accents
- Typography using Inter for headings/body and Space Grotesk for event titles
- Custom CSS variables for theming (light/dark mode support)
- Responsive spacing system based on Tailwind's 4-unit scale
- Hover and active elevation effects via custom CSS classes

**Key Pages**
- Home: Hero section with poster, countdown timer, and event overview
- Events: Filterable/searchable event catalog with category badges
- Registration: Multi-event registration form with accommodation/transport options
- Hospitality & Transportation: Information tabs for logistics
- Contact: Contact information and inquiry form

### Backend Architecture

**Server Framework**
- **Express.js**: RESTful API with middleware for JSON parsing and request logging
- **TypeScript**: Full type safety across server implementation
- **Development**: Vite dev server integration for HMR in development

**Storage Layer**
- **In-Memory Storage**: MemStorage class implementing IStorage interface
- **Seeded Data**: Sample events pre-populated for technical, cultural, and sports categories
- **Future Database**: Drizzle ORM configuration ready for PostgreSQL migration

**API Endpoints**
- `GET /api/events` - Fetch all events
- `GET /api/events/:id` - Fetch single event by ID
- `POST /api/registrations` - Create new registration with Zod validation
- `GET /api/registrations` - Fetch all registrations

**Data Validation**
- Zod schemas derived from Drizzle table definitions
- Server-side validation on registration submission
- Type-safe data flow between client and server

### Build & Deployment

**Development**
- Vite dev server with React plugin and runtime error overlay
- TypeScript checking without emit (build handled by Vite)
- Path aliases: `@/` for client, `@shared/` for shared types, `@assets/` for static files

**Production Build**
- Client: Vite builds to `dist/public`
- Server: esbuild bundles Express app to `dist/index.js` (ESM format)
- Static serving: Production server serves built client files

## External Dependencies

### Database & ORM
- **Drizzle ORM** (v0.39.1): PostgreSQL ORM with schema in `shared/schema.ts`
- **@neondatabase/serverless** (v0.10.4): Serverless Postgres driver
- **Configuration**: Ready for Postgres via `DATABASE_URL` environment variable
- **Schema**: Events table (title, description, category, participant count) and Registrations table (name, email, phone, college, event IDs, accommodation, transportation)

### UI Component Libraries
- **Radix UI**: Comprehensive suite of unstyled, accessible components (accordion, dialog, dropdown, popover, tabs, toast, etc.)
- **Lucide React**: Icon library for UI elements
- **React Icons**: Additional icons (LinkedIn icon via `react-icons/si`)
- **Embla Carousel**: Carousel/slider functionality
- **cmdk**: Command palette component

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **drizzle-zod**: Generate Zod schemas from Drizzle tables

### Utility Libraries
- **class-variance-authority**: CSS variant management for component APIs
- **clsx** & **tailwind-merge**: Conditional class name composition
- **date-fns**: Date formatting and manipulation

### Development Tools
- **Replit Plugins**: Vite plugins for error modal, cartographer, and dev banner in development
- **TypeScript**: Strict mode enabled with ESNext modules
- **PostCSS**: TailwindCSS processing with Autoprefixer

### Assets & Fonts
- **Google Fonts**: Inter and Space Grotesk via CDN
- **Local Assets**: Event poster stored in `attached_assets/`