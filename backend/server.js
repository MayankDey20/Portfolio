import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

const mockProjects = [
  {
    id: 1,
    title: 'Quantum Vision',
    category: 'INTERFACE',
    imagePlaceholder: 'orb-blue',
    description: 'A visionary project exploring quantum computing interfaces',
    techStack: [
      { name: 'PYTHON', color: '#3776AB', pos: [-2, 0, 0] },
      { name: 'REACT', color: '#61DAFB', pos: [0, 0, 0] },
      { name: 'THREE.JS', color: '#ffffff', pos: [2, 0, 0] }
    ]
  },
  {
    id: 2,
    title: 'Neural Interface',
    category: 'VISUALIZATION',
    imagePlaceholder: 'orb-purple',
    description: 'Next-generation neural network visualization platform',
    techStack: [
      { name: 'NODE', color: '#339933', pos: [-2, 0, 0] },
      { name: 'REDIS', color: '#DC382D', pos: [0, 0, 0] },
      { name: 'AWS', color: '#FF9900', pos: [2, 0, 0] }
    ]
  },
  {
    id: 3,
    title: 'Void Explorer',
    category: 'IMMERSIVE',
    imagePlaceholder: 'orb-cyan',
    description: 'Immersive space exploration experience',
    techStack: [
      { name: 'UNITY', color: '#ffffff', pos: [-2, 0, 0] },
      { name: 'THREE.JS', color: '#ffffff', pos: [0, 0, 0] },
      { name: 'C#', color: '#178600', pos: [2, 0, 0] }
    ]
  }
]

// API Routes
app.get('/api/projects', (req, res) => {
  res.json(mockProjects)
})

app.get('/api/projects/:id', (req, res) => {
  const project = mockProjects.find(p => p.id === parseInt(req.params.id))
  if (project) {
    res.json(project)
  } else {
    res.status(404).json({ error: 'Project not found' })
  }
})

// Serve static files from frontend build
const frontendPath = path.join(__dirname, '../frontend/dist')
app.use(express.static(frontendPath))

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
  console.log(`📦 API available at http://localhost:${PORT}/api/projects`)
})
