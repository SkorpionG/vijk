/**
 * Physics Simulation Examples (JavaScript)
 *
 * This file demonstrates vector applications in physics simulations.
 */

import { Vector } from "../../dist/index.js";

console.log("=== Physics Simulation Examples ===\n");

// ============================================================================
// 1. Force Calculations
// ============================================================================
console.log("1. Force Calculations");
console.log("---------------------");

// Multiple forces acting on an object
const force1 = new Vector([10, 0]); // 10N to the right
const force2 = new Vector([0, 15]); // 15N upward
const force3 = new Vector([-5, -5]); // 5√2 N at 225°

const resultantForce = force1.add(force2).add(force3);
console.log(`Force 1: ${force1.toString()} N`);
console.log(`Force 2: ${force2.toString()} N`);
console.log(`Force 3: ${force3.toString()} N`);
console.log(`Resultant Force: ${resultantForce.toString()} N`);
console.log(`Magnitude: ${resultantForce.magnitude().toFixed(2)} N\n`);

// ============================================================================
// 2. Projectile Motion
// ============================================================================
console.log("2. Projectile Motion");
console.log("--------------------");

// Initial velocity: 20 m/s at 45 degrees
const speed = 20; // m/s
const angle = (45 * Math.PI) / 180; // Convert to radians
const initialVelocity = new Vector([speed * Math.cos(angle), speed * Math.sin(angle)]);

console.log(`Initial velocity: ${initialVelocity.toString()} m/s`);
console.log(`Speed: ${initialVelocity.magnitude().toFixed(2)} m/s`);

// Simulate motion at t = 1 second
const gravity = new Vector([0, -9.8]); // m/s²
const time = 1; // seconds

const velocityAtT = initialVelocity.add(gravity.scale(time));
console.log(`Velocity at t=${time}s: ${velocityAtT.toString()} m/s`);

// Position calculation
const position = initialVelocity.scale(time).add(gravity.scale(0.5 * time * time));
console.log(`Position at t=${time}s: ${position.toString()} m\n`);

// ============================================================================
// 3. Work and Energy
// ============================================================================
console.log("3. Work and Energy");
console.log("------------------");

// Work = Force · Displacement
const appliedForce = new Vector([50, 30]); // Newtons
const displacement = new Vector([10, 5]); // meters

const work = appliedForce.dot(displacement);
console.log(`Force: ${appliedForce.toString()} N`);
console.log(`Displacement: ${displacement.toString()} m`);
console.log(`Work done: ${work} J (Joules)\n`);

// ============================================================================
// 4. Collision Detection
// ============================================================================
console.log("4. Collision Detection");
console.log("----------------------");

// Two objects approaching each other
const object1Position = new Vector([0, 0]);
const object1Velocity = new Vector([5, 3]);

const object2Position = new Vector([20, 10]);
const object2Velocity = new Vector([-3, -2]);

// Relative velocity
const relativeVelocity = object1Velocity.subtract(object2Velocity);
console.log(
  `Object 1: Position ${object1Position.toString()}, Velocity ${object1Velocity.toString()}`
);
console.log(
  `Object 2: Position ${object2Position.toString()}, Velocity ${object2Velocity.toString()}`
);
console.log(`Relative velocity: ${relativeVelocity.toString()} m/s`);

// Distance between objects
const distance = object2Position.subtract(object1Position);
console.log(`Distance: ${distance.magnitude().toFixed(2)} m\n`);

// ============================================================================
// 5. Momentum Conservation
// ============================================================================
console.log("5. Momentum Conservation");
console.log("------------------------");

// Before collision
const mass1 = 2; // kg
const velocity1Before = new Vector([10, 0]); // m/s

const mass2 = 3; // kg
const velocity2Before = new Vector([-5, 0]); // m/s

const momentum1 = velocity1Before.scale(mass1);
const momentum2 = velocity2Before.scale(mass2);
const totalMomentumBefore = momentum1.add(momentum2);

console.log(`Object 1: mass=${mass1}kg, velocity=${velocity1Before.toString()} m/s`);
console.log(`Object 2: mass=${mass2}kg, velocity=${velocity2Before.toString()} m/s`);
console.log(`Total momentum before: ${totalMomentumBefore.toString()} kg·m/s`);

// After perfectly inelastic collision (objects stick together)
const totalMass = mass1 + mass2;
const velocityAfter = totalMomentumBefore.scale(1 / totalMass);
console.log(`Combined velocity after: ${velocityAfter.toString()} m/s\n`);

// ============================================================================
// 6. Circular Motion
// ============================================================================
console.log("6. Circular Motion");
console.log("------------------");

// Object moving in a circle
const radius = 5; // meters
const angularVelocity = 2; // rad/s
const theta = Math.PI / 4; // 45 degrees

// Position on circle
const circularPosition = new Vector([radius * Math.cos(theta), radius * Math.sin(theta)]);

// Tangential velocity (perpendicular to radius)
const tangentialVelocity = new Vector([
  -radius * angularVelocity * Math.sin(theta),
  radius * angularVelocity * Math.cos(theta),
]);

// Centripetal acceleration (toward center)
const centripetalAccel = circularPosition.scale(-(angularVelocity * angularVelocity));

console.log(`Position: ${circularPosition.toString()} m`);
console.log(`Tangential velocity: ${tangentialVelocity.toString()} m/s`);
console.log(`Speed: ${tangentialVelocity.magnitude().toFixed(2)} m/s`);
console.log(`Centripetal acceleration: ${centripetalAccel.toString()} m/s²`);
console.log(`Magnitude: ${centripetalAccel.magnitude().toFixed(2)} m/s²\n`);

// ============================================================================
// 7. Inclined Plane
// ============================================================================
console.log("7. Inclined Plane");
console.log("-----------------");

// Object on a 30-degree incline
const inclineAngle = (30 * Math.PI) / 180;
const objectMass = 10; // kg
const g = 9.8; // m/s²

// Weight vector (downward)
const weight = new Vector([0, -objectMass * g]);

// Normal force (perpendicular to incline)
const normalMagnitude = objectMass * g * Math.cos(inclineAngle);
const normal = new Vector([
  -normalMagnitude * Math.sin(inclineAngle),
  normalMagnitude * Math.cos(inclineAngle),
]);

// Parallel component (down the incline)
const parallelMagnitude = objectMass * g * Math.sin(inclineAngle);
const parallel = new Vector([
  parallelMagnitude * Math.cos(inclineAngle),
  -parallelMagnitude * Math.sin(inclineAngle),
]);

console.log(`Weight: ${weight.toString()} N`);
console.log(`Normal force: ${normal.toString()} N (magnitude: ${normal.magnitude().toFixed(2)} N)`);
console.log(
  `Parallel force: ${parallel.toString()} N (magnitude: ${parallel.magnitude().toFixed(2)} N)`
);

// Verify forces balance
const netForce = weight.add(normal).add(parallel.scale(-1));
console.log(`Net force (should be ~0): ${netForce.toString()} N\n`);

// ============================================================================
// 8. Elastic Collision (1D)
// ============================================================================
console.log("8. Elastic Collision (1D)");
console.log("-------------------------");

const m1 = 4; // kg
const u1 = 5; // m/s
const m2 = 2; // kg
const u2 = -3; // m/s

// Final velocities for elastic collision
const v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
const v2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);

const velocity1After = new Vector([v1, 0]);
const velocity2After = new Vector([v2, 0]);

console.log(`Before: m1=${m1}kg at ${u1} m/s, m2=${m2}kg at ${u2} m/s`);
console.log(`After: m1 at ${velocity1After.toString()} m/s`);
console.log(`       m2 at ${velocity2After.toString()} m/s`);

// Verify momentum conservation
const momentumBefore = m1 * u1 + m2 * u2;
const momentumAfter = m1 * v1 + m2 * v2;
console.log(`Momentum before: ${momentumBefore.toFixed(2)} kg·m/s`);
console.log(`Momentum after: ${momentumAfter.toFixed(2)} kg·m/s\n`);

console.log("=== End of Physics Simulation Examples ===");
