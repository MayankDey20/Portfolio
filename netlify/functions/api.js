import express from 'express'
import cors from 'cors'
import serverless from 'serverless-http'

const app = express()
app.use(cors())
app.use(express.json())

const mockProjects = [
  {
    id: 1,
    title: 'SecureScan Pro',
    category: 'Automated Web Application Vulnerability Scanner',
    glowColor: 'blue',
    imagePlaceholder: 'orb-blue',
    splineUrl: 'https://prod.spline.design/CVAJTOdIz-o93tKW/scene.splinecode',
    description: 'A tactical operations interface visualizing complex data streams in 3D.',
    techStack: [
      { name: 'PYTHON', color: '#3776AB', pos: [-2, 0, 0] },
      { name: 'REACT', color: '#61DAFB', pos: [0, 0, 0] },
      { name: 'THREE.JS', color: '#ffffff', pos: [2, 0, 0] }
    ]
  },
  {
    id: 2,
    title: 'Narrative Flow',
    category: 'AI- Co-writing Platform',
    glowColor: 'purple',
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
    title: 'TribalBridge',
    category: 'IMMERSIVE',
    glowColor: 'green',
    imagePlaceholder: 'orb-cyan',
    description: 'Immersive space exploration experience',
    techStack: [
      { name: 'UNITY', color: '#ffffff', pos: [-2, 0, 0] },
      { name: 'THREE.JS', color: '#ffffff', pos: [0, 0, 0] },
      { name: 'C#', color: '#178600', pos: [2, 0, 0] }
    ]
  }
]

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

export const handler = serverless(app)
