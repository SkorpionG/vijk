# vijk Examples

This folder contains comprehensive examples demonstrating the vector mathematics capabilities of the vijk package.

## Running the Examples

First, make sure you've built the package:

```bash
npm run build
```

Then run any example file:

```bash
# JavaScript examples
node examples/javascript/basic-vectors.js           # Basic vector operations
node examples/javascript/physics-simulation.js      # Physics applications
node examples/javascript/graphics-3d.js             # 3D graphics examples

# TypeScript examples (requires ts-node)
npx ts-node examples/typescript/basic-vectors.ts
npx ts-node examples/typescript/physics-simulation.ts
npx ts-node examples/typescript/graphics-3d.ts
```

## Example Categories

### 📐 Basic Vector Operations

**[typescript/basic-vectors.ts](./typescript/basic-vectors.ts)** / **[javascript/basic-vectors.js](./javascript/basic-vectors.js)**

- Creating vectors in 2D, 3D, and higher dimensions
- Basic operations: addition, subtraction, scaling
- Magnitude and normalization
- Dot and cross products
- Vector relationships (parallel, perpendicular)

### ⚛️ Physics Simulation

**[typescript/physics-simulation.ts](./typescript/physics-simulation.ts)** / **[javascript/physics-simulation.js](./javascript/physics-simulation.js)**

- Force calculations and resultant forces
- Projectile motion
- Velocity and acceleration vectors
- Work and energy calculations
- Collision detection

### 🎮 3D Graphics

**[typescript/graphics-3d.ts](./typescript/graphics-3d.ts)** / **[javascript/graphics-3d.js](./javascript/graphics-3d.js)**

- 3D coordinate transformations
- Surface normals calculation
- Camera direction vectors
- Lighting calculations
- Distance and angle computations

## Key Features Demonstrated

- **Type Safety**: Full TypeScript support with proper type definitions
- **Immutability**: All operations return new vectors without modifying originals
- **N-Dimensional Support**: Works with vectors of any dimension
- **Zero Dependencies**: Lightweight with no external dependencies
- **Real-World Applications**: Practical examples from physics, graphics, and engineering

## Learning Path

1. Start with **basic-vectors** to understand fundamental operations
2. Move to **physics-simulation** for practical physics applications
3. Explore **graphics-3d** for computer graphics use cases

Each example file is self-contained with detailed comments explaining the concepts and calculations.
