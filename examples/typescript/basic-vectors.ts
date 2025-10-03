/**
 * Basic Vector Operations Examples
 *
 * This file demonstrates fundamental vector operations using the vijk library.
 */

import { Vector } from "../../src/index.js";

console.log("=== Basic Vector Operations ===\n");

// ============================================================================
// 1. Creating Vectors
// ============================================================================
console.log("1. Creating Vectors");
console.log("-------------------");

// 2D vector
const vec2D: Vector = new Vector([3, 4]);
console.log(`2D Vector: ${vec2D.toString()}`);
console.log(`Dimension: ${vec2D.dimension}`);

// 3D vector
const vec3D: Vector = new Vector([1, 2, 3]);
console.log(`3D Vector: ${vec3D.toString()}`);

// Higher dimensional vector (e.g., for machine learning)
const vec5D: Vector = new Vector([1, 2, 3, 4, 5]);
console.log(`5D Vector: ${vec5D.toString()}`);

// Creating from strings
const vecFromStrings: Vector = new Vector(["1.5", "2.5", "3.5"]);
console.log(`From strings: ${vecFromStrings.toString()}\n`);

// ============================================================================
// 2. Basic Operations
// ============================================================================
console.log("2. Basic Operations");
console.log("-------------------");

const v1: Vector = new Vector([1, 2, 3]);
const v2: Vector = new Vector([4, 5, 6]);

// Addition
const sum: Vector = v1.add(v2);
console.log(`${v1.toString()} + ${v2.toString()} = ${sum.toString()}`);

// Subtraction
const diff: Vector = v2.subtract(v1);
console.log(`${v2.toString()} - ${v1.toString()} = ${diff.toString()}`);

// Scaling
const scaled: Vector = v1.scale(2);
console.log(`${v1.toString()} × 2 = ${scaled.toString()}`);

// Verify immutability
console.log(`Original v1 unchanged: ${v1.toString()}\n`);

// ============================================================================
// 3. Magnitude and Normalization
// ============================================================================
console.log("3. Magnitude and Normalization");
console.log("------------------------------");

const vec: Vector = new Vector([3, 4]);
const magnitude: number = vec.magnitude();
console.log(`Vector: ${vec.toString()}`);
console.log(`Magnitude: ${magnitude}`); // Should be 5 (3-4-5 triangle)

const normalized: Vector = vec.normalize();
console.log(`Normalized: ${normalized.toString()}`);
console.log(`Normalized magnitude: ${normalized.magnitude()}\n`); // Should be 1

// ============================================================================
// 4. Dot Product
// ============================================================================
console.log("4. Dot Product");
console.log("--------------");

const a: Vector = new Vector([1, 2, 3]);
const b: Vector = new Vector([4, 5, 6]);
const dotProduct: number = a.dot(b);
console.log(`${a.toString()} · ${b.toString()} = ${dotProduct}`);

// Perpendicular vectors have dot product of 0
const perpA: Vector = new Vector([1, 0]);
const perpB: Vector = new Vector([0, 1]);
console.log(`${perpA.toString()} · ${perpB.toString()} = ${perpA.dot(perpB)} (perpendicular)\n`);

// ============================================================================
// 5. Cross Product (3D only)
// ============================================================================
console.log("5. Cross Product (3D)");
console.log("---------------------");

const x: Vector = new Vector([1, 0, 0]);
const y: Vector = new Vector([0, 1, 0]);
const z: Vector = x.cross(y);
console.log(`${x.toString()} × ${y.toString()} = ${z.toString()}`);

// Cross product of parallel vectors is zero
const parallel1: Vector = new Vector([1, 2, 3]);
const parallel2: Vector = new Vector([2, 4, 6]);
const zeroCross: Vector = parallel1.cross(parallel2);
console.log(
  `Parallel vectors: ${parallel1.toString()} × ${parallel2.toString()} = ${zeroCross.toString()}\n`
);

// ============================================================================
// 6. Angles Between Vectors
// ============================================================================
console.log("6. Angles Between Vectors");
console.log("-------------------------");

const vec1: Vector = new Vector([1, 0]);
const vec2: Vector = new Vector([0, 1]);
const angleRadians: number = vec1.angleTo(vec2);
const angleDegrees: number = (angleRadians * 180) / Math.PI;
console.log(`Angle between ${vec1.toString()} and ${vec2.toString()}:`);
console.log(`  ${angleRadians.toFixed(4)} radians`);
console.log(`  ${angleDegrees.toFixed(2)} degrees\n`);

// ============================================================================
// 7. Vector Relationships
// ============================================================================
console.log("7. Vector Relationships");
console.log("-----------------------");

const v3: Vector = new Vector([2, 4]);
const v4: Vector = new Vector([1, 2]);
const v5: Vector = new Vector([1, -0.5]);

console.log(`${v3.toString()} parallel to ${v4.toString()}? ${v3.isParallel(v4)}`);
console.log(`${v3.toString()} perpendicular to ${v5.toString()}? ${v3.isPerpendicular(v5)}`);

const v6: Vector = new Vector([1, 2, 3]);
const v7: Vector = new Vector([1, 2, 3]);
console.log(`${v6.toString()} equals ${v7.toString()}? ${v6.equals(v7)}\n`);

// ============================================================================
// 8. Vector Projection
// ============================================================================
console.log("8. Vector Projection");
console.log("--------------------");

const projectFrom: Vector = new Vector([3, 4]);
const projectOnto: Vector = new Vector([1, 0]);
const projection: Vector = projectFrom.projectOnto(projectOnto);
console.log(`Project ${projectFrom.toString()} onto ${projectOnto.toString()}:`);
console.log(`Result: ${projection.toString()}\n`);

// ============================================================================
// 9. Static Factory Methods
// ============================================================================
console.log("9. Static Factory Methods");
console.log("-------------------------");

const zero3D: Vector = Vector.zero(3);
console.log(`Zero vector (3D): ${zero3D.toString()}`);

const unitX: Vector = Vector.unitVector(3, 0);
const unitY: Vector = Vector.unitVector(3, 1);
const unitZ: Vector = Vector.unitVector(3, 2);
console.log(`Unit X: ${unitX.toString()}`);
console.log(`Unit Y: ${unitY.toString()}`);
console.log(`Unit Z: ${unitZ.toString()}`);

const point1: Vector = new Vector([1, 2]);
const point2: Vector = new Vector([4, 6]);
const direction: Vector = Vector.fromPoints(point1, point2);
console.log(
  `Direction from ${point1.toString()} to ${point2.toString()}: ${direction.toString()}\n`
);

// ============================================================================
// 10. Method Chaining
// ============================================================================
console.log("10. Method Chaining");
console.log("-------------------");

const result: Vector = new Vector([1, 2, 3])
  .add(new Vector([4, 5, 6]))
  .scale(2)
  .normalize();

console.log(`Chained operations result: ${result.toString()}`);
console.log(`Magnitude: ${result.magnitude()}\n`);

console.log("=== End of Basic Vector Operations ===");
