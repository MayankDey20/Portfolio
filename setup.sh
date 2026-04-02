#!/bin/bash

# Quick Start Guide for Digital Frontier Portfolio

echo "🚀 Digital Frontier Portfolio - Quick Start"
echo "============================================"
echo ""

# Install dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
echo "✓ Frontend dependencies installed"
echo ""

echo "📦 Installing backend dependencies..."
cd ../backend
npm install
echo "✓ Backend dependencies installed"
echo ""

echo "============================================"
echo "✨ Setup Complete!"
echo ""
echo "To start development:"
echo ""
echo "Terminal 1 - Frontend (port 3000):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Backend (port 5000):"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo "============================================"
