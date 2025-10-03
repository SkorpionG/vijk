# vijk

A lightweight and powerful TypeScript/JavaScript vector mathematics library for 2D, 3D, and n-dimensional vector operations.

[![npm version](https://img.shields.io/npm/v/vijk.svg)](https://www.npmjs.com/package/vijk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [ES Modules](#es-modules)
  - [CommonJS](#commonjs)
  - [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Vector Class](#vector-class)
  - [Constructor](#constructor)
  - [Properties](#properties)
  - [Instance Methods](#instance-methods)
  - [Static Methods](#static-methods)
- [Advanced Usage](#advanced-usage)
  - [Chaining Operations](#chaining-operations)
  - [Working with Different Dimensions](#working-with-different-dimensions)
- [Use Cases](#use-cases)
  - [Physics Simulations](#physics-simulations)
  - [Computer Graphics](#computer-graphics)
  - [Machine Learning](#machine-learning)
- [Examples](#examples)
- [License](#license)
- [Repository](#repository)

## Features

- **N-Dimensional Vectors**: Support for vectors of any dimension (2D, 3D, or higher)
- **Comprehensive Operations**: Addition, subtraction, scaling, dot product, cross product (3D)
- **Vector Analysis**: Magnitude, normalization, angle calculations, projections
- **Vector Relationships**: Check for parallel, perpendicular, and equality
- **Static Factory Methods**: Convenient constructors for common vectors (zero, unit vectors)
- **TypeScript Support**: Full TypeScript support with type definitions
- **Immutable Operations**: All operations return new vectors, preserving the original
- **Zero Dependencies**: Lightweight with no external dependencies

## Installation

```bash
npm install vijk
```

## Usage

### ES Modules

```javascript
// Named import
import { Vector } from "vijk";

// Default import
import Vector from "vijk";
```

### CommonJS

```javascript
const { Vector } = require("vijk");
```

### Quick Start

```javascript
import { Vector } from "vijk";

// Create 2D vectors
const v1 = new Vector([3, 4]);
const v2 = new Vector([1, 2]);

// Basic operations
console.log(v1.magnitude()); // 5
console.log(v1.add(v2).toArray()); // [4, 6]
console.log(v1.dot(v2)); // 11

// 3D vectors
const v3d1 = new Vector([1, 0, 0]);
const v3d2 = new Vector([0, 1, 0]);
console.log(v3d1.cross(v3d2).toArray()); // [0, 0, 1]

// Vector analysis
console.log(v1.angleTo(v2)); // angle in radians
console.log(v1.normalize().toArray()); // [0.6, 0.8]

// Static factory methods
const zero = Vector.zero(3); // [0, 0, 0]
const unitX = Vector.unitVector(3, 0); // [1, 0, 0]
```

## API Reference

### Vector Class

A comprehensive class for mathematical vector operations in any dimension.

#### Constructor

```javascript
new Vector(components: (number | string)[])
```

Creates a new vector with the specified components.

**Parameters:**

- `components`: Array of numbers or numeric strings representing vector components

**Example:**

```javascript
const v1 = new Vector([3, 4]);
const v2 = new Vector([1, 2, 3]);
const v3 = new Vector(["1.23", "4.56"]); // can use strings
```

#### Properties

##### `dimension: number`

Returns the dimension of the vector.

```javascript
const v = new Vector([1, 2, 3]);
console.log(v.dimension); // 3
```

##### `components: number[]`

Returns a copy of the vector components as an array.

```javascript
const v = new Vector([3, 4]);
console.log(v.components); // [3, 4]
```

#### Instance Methods

##### `get(index: number): number`

Gets a specific component by index (0-based).

```javascript
const v = new Vector([3, 4, 5]);
console.log(v.get(0)); // 3
console.log(v.get(2)); // 5
```

##### `set(index: number, value: number | string): Vector`

Returns a new vector with the specified component updated.

```javascript
const v1 = new Vector([3, 4]);
const v2 = v1.set(1, 5);
console.log(v2.toArray()); // [3, 5]
```

##### `magnitude(): number`

Calculates the magnitude (length) of the vector.

```javascript
const v = new Vector([3, 4]);
console.log(v.magnitude()); // 5
```

##### `normalize(): Vector`

Returns a unit vector in the same direction.

```javascript
const v = new Vector([3, 4]);
const unit = v.normalize();
console.log(unit.toArray()); // [0.6, 0.8]
console.log(unit.magnitude()); // 1
```

##### `add(other: Vector): Vector`

Adds another vector to this vector.

```javascript
const v1 = new Vector([1, 2]);
const v2 = new Vector([3, 4]);
console.log(v1.add(v2).toArray()); // [4, 6]
```

##### `subtract(other: Vector): Vector`

Subtracts another vector from this vector.

```javascript
const v1 = new Vector([5, 7]);
const v2 = new Vector([2, 3]);
console.log(v1.subtract(v2).toArray()); // [3, 4]
```

##### `scale(scalar: number | string): Vector`

Multiplies the vector by a scalar value.

```javascript
const v = new Vector([1, 2, 3]);
console.log(v.scale(2).toArray()); // [2, 4, 6]
console.log(v.scale(0.5).toArray()); // [0.5, 1, 1.5]
```

##### `dot(other: Vector): number`

Calculates the dot product with another vector.

```javascript
const v1 = new Vector([1, 2, 3]);
const v2 = new Vector([4, 5, 6]);
console.log(v1.dot(v2)); // 32 (1*4 + 2*5 + 3*6)
```

##### `cross(other: Vector): Vector`

Calculates the cross product with another 3D vector (3D only).

```javascript
const v1 = new Vector([1, 0, 0]);
const v2 = new Vector([0, 1, 0]);
console.log(v1.cross(v2).toArray()); // [0, 0, 1]
```

##### `angleTo(other: Vector): number`

Calculates the angle between this vector and another (in radians).

```javascript
const v1 = new Vector([1, 0]);
const v2 = new Vector([0, 1]);
console.log(v1.angleTo(v2)); // 1.5708 (π/2 radians, 90 degrees)
```

##### `projectOnto(other: Vector): Vector`

Projects this vector onto another vector.

```javascript
const v1 = new Vector([3, 4]);
const v2 = new Vector([1, 0]);
console.log(v1.projectOnto(v2).toArray()); // [3, 0]
```

##### `isParallel(other: Vector, tolerance?: number): boolean`

Checks if this vector is parallel to another vector.

```javascript
const v1 = new Vector([2, 4]);
const v2 = new Vector([1, 2]);
console.log(v1.isParallel(v2)); // true
```

##### `isPerpendicular(other: Vector, tolerance?: number): boolean`

Checks if this vector is perpendicular to another vector.

```javascript
const v1 = new Vector([1, 0]);
const v2 = new Vector([0, 1]);
console.log(v1.isPerpendicular(v2)); // true
```

##### `isOrthogonal(other: Vector, tolerance?: number): boolean`

Checks if this vector is orthogonal to another vector (alias for `isPerpendicular`).

```javascript
const v1 = new Vector([1, 0]);
const v2 = new Vector([0, 1]);
console.log(v1.isOrthogonal(v2)); // true
```

##### `equals(other: Vector, tolerance?: number): boolean`

Checks if this vector equals another vector.

```javascript
const v1 = new Vector([1, 2, 3]);
const v2 = new Vector([1, 2, 3]);
console.log(v1.equals(v2)); // true
```

##### `clone(): Vector`

Creates a copy of this vector.

```javascript
const v1 = new Vector([1, 2, 3]);
const v2 = v1.clone();
console.log(v2.toArray()); // [1, 2, 3]
```

##### `toArray(): number[]`

Converts the vector to an array.

```javascript
const v = new Vector([1, 2, 3]);
console.log(v.toArray()); // [1, 2, 3]
```

##### `toString(): string`

Converts the vector to a string representation.

```javascript
const v = new Vector([1, 2, 3]);
console.log(v.toString()); // "[1, 2, 3]"
```

#### Static Methods

##### `Vector.zero(dimension: number): Vector`

Creates a zero vector of specified dimension.

```javascript
const zero2D = Vector.zero(2);
console.log(zero2D.toArray()); // [0, 0]

const zero3D = Vector.zero(3);
console.log(zero3D.toArray()); // [0, 0, 0]
```

##### `Vector.unitVector(dimension: number, axis: number): Vector`

Creates a unit vector along a specific axis.

```javascript
const unitX = Vector.unitVector(3, 0);
console.log(unitX.toArray()); // [1, 0, 0]

const unitY = Vector.unitVector(3, 1);
console.log(unitY.toArray()); // [0, 1, 0]

const unitZ = Vector.unitVector(3, 2);
console.log(unitZ.toArray()); // [0, 0, 1]
```

##### `Vector.fromPoints(from: Vector, to: Vector): Vector`

Creates a vector from one point to another.

```javascript
const p1 = new Vector([1, 2]);
const p2 = new Vector([4, 6]);
const direction = Vector.fromPoints(p1, p2);
console.log(direction.toArray()); // [3, 4]
```

## Advanced Usage

### Chaining Operations

All vector operations return new vectors, allowing for method chaining:

```javascript
const v1 = new Vector([1, 2, 3]);
const v2 = new Vector([4, 5, 6]);

const result = v1.add(v2).scale(2).normalize();

console.log(result.toArray());
```

### Working with Different Dimensions

```javascript
// 2D vectors (common for graphics, physics)
const position2D = new Vector([100, 200]);
const velocity2D = new Vector([5, -3]);

// 3D vectors (common for 3D graphics, physics)
const position3D = new Vector([1, 2, 3]);
const force3D = new Vector([0, -9.8, 0]);

// Higher dimensions (machine learning, data science)
const feature4D = new Vector([0.5, 0.3, 0.8, 0.2]);
const weights = new Vector([1.2, 0.8, 1.5, 0.9]);
```

## Use Cases

### Physics Simulations

```javascript
// Calculate resultant force
const force1 = new Vector([10, 0]); // 10N to the right
const force2 = new Vector([0, 15]); // 15N upward
const resultant = force1.add(force2);
console.log(resultant.magnitude()); // 18.03N
```

### Computer Graphics

```javascript
// Calculate surface normal
const v1 = new Vector([1, 0, 0]);
const v2 = new Vector([0, 1, 0]);
const normal = v1.cross(v2).normalize();
console.log(normal.toArray()); // [0, 0, 1]
```

### Machine Learning

```javascript
// Calculate similarity between feature vectors
const features1 = new Vector([0.8, 0.6, 0.3]);
const features2 = new Vector([0.7, 0.5, 0.4]);
const similarity = features1.dot(features2);
```

## Examples

For comprehensive examples demonstrating real-world usage, check out the [examples](./examples) directory:

- **[Basic Vector Operations](./examples/typescript/basic-vectors.ts)** - Fundamental operations, magnitude, normalization, dot/cross products
- **[Physics Simulation](./examples/typescript/physics-simulation.ts)** - Force calculations, projectile motion, collisions, momentum
- **[3D Graphics](./examples/typescript/graphics-3d.ts)** - Surface normals, lighting, camera systems, ray tracing

Each example is available in both TypeScript and JavaScript. See the [examples README](./examples/README.md) for more details.

## License

MIT © [SkorpionG](https://github.com/SkorpionG)

## Repository

[https://github.com/SkorpionG/vijk](https://github.com/SkorpionG/vijk)
