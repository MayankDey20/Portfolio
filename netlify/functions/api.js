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
    splineUrl: 'https://prod.spline.design/CVAJTOdIz-o93tKW/scene.splinecode',
    splineConfig: { scale: 0.45, x: -32, y: -18 },
    description: 'SecureScan Pro is an advanced, distributed web vulnerability scanner and threat intelligence platform. It provides organizations and security professionals with a unified dashboard to proactively discover, analyze, and remediate security flaws across their web infrastructure.\n\nBy combining active vulnerability scanning with machine learning-powered threat intelligence and real-time reporting, SecureScan Pro offers a holistic view of an asset\'s security posture.',
    githubUrl: 'https://github.com/MayankDey20/SecureScanPro',
    imagePlaceholder: 'orb-blue',
    imagePlaceholder: 'orb-blue',
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
    splineUrl: 'https://prod.spline.design/QPKs0kpS2CvawGmE/scene.splinecode',
    splineConfig: { scale: 0.45, x: -5, y: -10 },
    description: 'Narrative Flow is an AI-powered story co-writing platform that harmonizes human creativity with large language models. It offers a dynamic environment for novelists and screenwriters to brainstorm, structure, and refine complex narratives in real-time.',
    githubUrl: 'https://github.com/MayankDey20/NarrativeFlow',
    imagePlaceholder: 'orb-purple',
    imagePlaceholder: 'orb-purple',
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
    description: 'TribalBridge is a cross-platform infrastructure layer designed to connect decentralized communities through high-fidelity immersive environments. It serves as a bridge between legacy social systems and the evolving spatial web.',
    githubUrl: 'https://github.com/MayankDey20/TribalBridge',
    imagePlaceholder: 'orb-cyan',
    imagePlaceholder: 'orb-cyan',
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
