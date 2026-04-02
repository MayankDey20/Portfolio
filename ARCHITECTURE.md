# 🏗️ Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER BROWSER (Port 3000)                 │
│                   React + Vite Application                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              React Components Layer                 │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │                                                     │    │
│  │  ┌───────────────────────────────────────────┐     │    │
│  │  │         HeroSection Component             │     │    │
│  │  │  • Main headline (EXPLORE...)             │     │    │
│  │  │  • Top navigation                         │     │    │
│  │  │  • Text animations                        │     │    │
│  │  └───────────────────────────────────────────┘     │    │
│  │                                                     │    │
│  │  ┌───────────────────────────────────────────┐     │    │
│  │  │   Wireframe3DSphere Component             │     │    │
│  │  │  • Canvas element                         │     │    │
│  │  │  • Three.js scene                         │     │    │
│  │  │  • Icosahedron geometry                   │     │    │
│  │  │  • OrbitControls + Bloom                  │     │    │
│  │  └───────────────────────────────────────────┘     │    │
│  │                                                     │    │
│  │  ┌───────────────────────────────────────────┐     │    │
│  │  │     ProjectCards Component                │     │    │
│  │  │  • Grid layout (1/3 columns)              │     │    │
│  │  │  • API data fetching                      │     │    │
│  │  │  • Card animations                        │     │    │
│  │  │  • Hover effects                          │     │    │
│  │  └───────────────────────────────────────────┘     │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                         ⬇️                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │          Styling & Animation Layer                 │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  • Tailwind CSS (utilities)                         │    │
│  │  • Framer Motion (animations)                       │    │
│  │  • CSS custom properties (design tokens)            │    │
│  └─────────────────────────────────────────────────────┘    │
│                         ⬇️                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           Graphics & 3D Rendering                  │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  • Three.js scene management                        │    │
│  │  • WebGL rendering                                  │    │
│  │  • Bloom post-processing                            │    │
│  └─────────────────────────────────────────────────────┘    │
│                         ⬇️                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Axios HTTP Client Layer                    │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  • Makes requests to backend                        │    │
│  │  • Handles CORS                                     │    │
│  │  • Error handling                                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                         ⬇️                                   │
└──────────────────────────────────────────────────────────────┘
                           │
                 HTTP Requests (AJAX)
                           │
                           ⬇️
┌──────────────────────────────────────────────────────────────┐
│              EXPRESS SERVER (Port 5000)                      │
│               Node.js Backend Application                     │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │         Express Middleware Stack                  │     │
│  ├────────────────────────────────────────────────────┤     │
│  │  1. CORS middleware                               │     │
│  │  2. JSON parser                                   │     │
│  │  3. Static file server                            │     │
│  │  4. Route handlers                                │     │
│  │  5. Error handler                                 │     │
│  └────────────────────────────────────────────────────┘     │
│                         ⬇️                                   │
│  ┌────────────────────────────────────────────────────┐     │
│  │         Route Handlers (API Endpoints)            │     │
│  ├────────────────────────────────────────────────────┤     │
│  │                                                    │     │
│  │  GET /api/projects                                │     │
│  │  └─ Returns: Array of project objects             │     │
│  │                                                    │     │
│  │  GET /api/projects/:id                            │     │
│  │  └─ Returns: Single project object                │     │
│  │                                                    │     │
│  └────────────────────────────────────────────────────┘     │
│                         ⬇️                                   │
│  ┌────────────────────────────────────────────────────┐     │
│  │          Data Layer (Mock Database)               │     │
│  ├────────────────────────────────────────────────────┤     │
│  │                                                    │     │
│  │  mockProjects = [                                 │     │
│  │    {                                               │     │
│  │      id: 1,                                        │     │
│  │      title: "Project Name",                        │     │
│  │      imagePlaceholder: "...",                      │     │
│  │      description: "..."                            │     │
│  │    },                                              │     │
│  │    ...                                             │     │
│  │  ]                                                 │     │
│  │                                                    │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
User Interaction:
  • Hover on 3D sphere → Orbit controls active
  • Scroll/click cards → Animations trigger
  • API call → Projects fetched

Frontend:
  App.jsx (main container)
    ├─ HeroSection
    │   └─ Animations with Framer Motion
    ├─ Wireframe3DSphere
    │   └─ Three.js scene with WebGL
    └─ ProjectCards
        ├─ useEffect: axios.get('/api/projects')
        └─ Maps response to card components

HTTP Request:
  axios.get('/api/projects')
    ↓
  Vite dev server (http://localhost:3000)
    ↓
  Proxy to backend (http://localhost:5000)

Backend Processing:
  Express receives request
    ↓
  CORS middleware allows it
    ↓
  Route handler: GET /api/projects
    ↓
  Returns mockProjects array as JSON
    ↓
  Response sent to frontend

Frontend Rendering:
  Response received in ProjectCards.jsx
    ↓
  setProjects(response.data)
    ↓
  Component re-renders
    ↓
  .map() creates card for each project
    ↓
  Animations applied
    ↓
  Cards displayed to user
```

## Component Relationship Map

```
                          App.jsx
                         /   |   \
                        /    |    \
              HeroSection  Sphere  ProjectCards
                 /                    |
                /                     |
         HeroAnimation          axios.get()
                                      |
                                   Backend
                                      |
                                  mockProjects
```

## State Management Flow

```
ProjectCards Component:
  
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  
  ↓
  
  useEffect(() => {
    axios.get('/api/projects')  ← HTTP Request
      .then(response => setProjects(response.data))
      .catch(error => setProjects(fallbackData))
      .finally(() => setLoading(false))
  }, [])  ← Runs once on mount
  
  ↓
  
  If loading → show "Loading projects..."
  If error  → use fallback mock data
  If success → render cards with API data
```

## Styling Cascade

```
Global Styles (index.css)
  ↓
Tailwind Base, Components, Utilities
  ↓
PostCSS / Autoprefixer
  ↓
TailwindCSS Config (tailwind.config.js)
  ├─ Space dark colors
  ├─ Glow effects
  └─ Text shadow utilities
  ↓
Component Classes
  ├─ HeroSection: futuristic-text, text-glow-lg
  ├─ Cards: glassmorphism, hover effects
  └─ 3D: canvas styling
```

## Animation Sequence

```
Page Load:
  1. 0s      → Page rendered (opacity: 0)
  2. 0.3s    → Container animation starts
  3. 0.3s    → Items fade in (staggered)
  4. 0.5s    → HeroSection headline appears
  5. 0.7s    → Wireframe sphere rendered
  6. 1.0s    → Project cards slide up
  7. ∞       → 3D sphere auto-rotates
  8. Hover   → Card scales up, border glows
```

## Production Deployment Flow

```
Development:
  frontend/   (npm run dev)  → Vite dev server :3000
  backend/    (npm run dev)  → Express server :5000

Production:
  1. Build frontend: npm run build → frontend/dist/
  2. Start backend: npm start
  3. Backend serves:
     - Static files from frontend/dist/
     - API endpoints on same server
  4. Single deployment URL (http://yourdomain.com)
```

## Environment Variables

### Frontend (.env or vite.config.js)
```
VITE_API_URL=http://localhost:5000  (dev)
VITE_API_URL=https://api.domain.com (prod)
```

### Backend (.env)
```
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

---

**This architecture provides:**
- ✅ Clean separation of concerns
- ✅ Easy to scale and modify
- ✅ Frontend can work independently
- ✅ Backend API is reusable
- ✅ Production-ready structure
