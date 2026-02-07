# Nilfolio-Town

An interactive portfolio website disguised as a 2D retro-style village. Instead of scrolling through a traditional portfolio, visitors control a character and explore a top-down tile-based town to discover projects, skills, and more.

## Technologies

| Category    | Technology                  |
| ----------- | --------------------------- |
| Framework   | React 19                    |
| Game Engine | Phaser 3                    |
| Language    | TypeScript 5.8              |
| Styling     | Tailwind CSS 4              |
| Build Tool  | Vite 7                      |
| Utilities   | clsx, tailwind-merge        |
| Linting     | ESLint 9, typescript-eslint |

## Architecture

The app uses a **hybrid React + Phaser** architecture:

- **React** manages the UI shell, overlays, and application state
- **Phaser 3** runs the game engine (rendering, physics, camera, input) inside a React container
- Communication between the two happens through a **window API bridge** pattern — Phaser triggers React state changes via global functions without tight coupling

```
src/
├── components/        # React UI components & overlays
├── phaser/
│   ├── main.ts        # Phaser game initialization
│   └── scenes/        # PreloadScene, GameScene
├── types/             # TypeScript type definitions
├── utils/             # Utility functions (cn helper)
└── tilemaps/          # Tiled map editor data
```

## Features

- **Explorable 2D village** — 38x35 tile grid with multiple layers (ground, water, objects, roofs)
- **Character movement** — Arrow keys or WASD with physics-based momentum and normalized diagonal speed
- **Smooth camera** — Follows the player with lerp interpolation, bounded to the tilemap
- **Collision system** — Water, objects, doors, and roofs act as boundaries via Phaser Arcade physics
- **Animated player sprite** — 4-frame walk cycle at 8 FPS with a subtle glow effect
- **Overlay system** — React-rendered panels for About and Projects sections triggered from within the game
- **Roguelike tileset** — Retro pixel-art aesthetic

## Goals

- Present a developer portfolio in a memorable, interactive format
- Combine web technologies (React, Tailwind) with game development (Phaser) into a cohesive experience
- Demonstrate proficiency in TypeScript, React, 2D game development, and frontend tooling
- Create a modular architecture that cleanly separates UI concerns from game logic

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Controls

| Key               | Action   |
| ----------------- | -------- |
| Arrow Keys / WASD | Move     |
| Space             | Interact |
