/**
 * 3D Graphics Examples (JavaScript)
 *
 * This file demonstrates vector applications in 3D graphics and computer graphics.
 */

import { Vector } from "../../dist/index.js";

console.log("=== 3D Graphics Examples ===\n");

// ============================================================================
// 1. Surface Normals
// ============================================================================
console.log("1. Surface Normals");
console.log("------------------");

// Triangle vertices
const vertex1 = new Vector([0, 0, 0]);
const vertex2 = new Vector([1, 0, 0]);
const vertex3 = new Vector([0, 1, 0]);

// Edge vectors
const edge1 = Vector.fromPoints(vertex1, vertex2);
const edge2 = Vector.fromPoints(vertex1, vertex3);

// Surface normal (cross product)
const surfaceNormal = edge1.cross(edge2).normalize();

console.log(`Vertex 1: ${vertex1.toString()}`);
console.log(`Vertex 2: ${vertex2.toString()}`);
console.log(`Vertex 3: ${vertex3.toString()}`);
console.log(`Surface Normal: ${surfaceNormal.toString()}\n`);

// ============================================================================
// 2. Camera and View Direction
// ============================================================================
console.log("2. Camera and View Direction");
console.log("----------------------------");

const cameraPosition = new Vector([0, 0, 10]);
const targetPosition = new Vector([0, 0, 0]);

// View direction (from camera to target)
const viewDirection = Vector.fromPoints(cameraPosition, targetPosition).normalize();

// Up vector
const worldUp = new Vector([0, 1, 0]);

// Right vector (cross product of view and up)
const rightVector = viewDirection.cross(worldUp).normalize();

// Camera up (cross product of right and view)
const cameraUp = rightVector.cross(viewDirection).normalize();

console.log(`Camera Position: ${cameraPosition.toString()}`);
console.log(`Target Position: ${targetPosition.toString()}`);
console.log(`View Direction: ${viewDirection.toString()}`);
console.log(`Right Vector: ${rightVector.toString()}`);
console.log(`Camera Up: ${cameraUp.toString()}\n`);

// ============================================================================
// 3. Lighting Calculations (Lambertian Reflection)
// ============================================================================
console.log("3. Lighting Calculations");
console.log("------------------------");

const lightDirection = new Vector([1, 1, 1]).normalize();
const normal = new Vector([0, 0, 1]); // Surface facing camera

// Diffuse lighting intensity (dot product)
const diffuseIntensity = Math.max(0, normal.dot(lightDirection));

console.log(`Light Direction: ${lightDirection.toString()}`);
console.log(`Surface Normal: ${normal.toString()}`);
console.log(`Diffuse Intensity: ${(diffuseIntensity * 100).toFixed(1)}%\n`);

// ============================================================================
// 4. Specular Reflection
// ============================================================================
console.log("4. Specular Reflection");
console.log("----------------------");

const incident = new Vector([1, -1, 0]).normalize();
const surfaceNorm = new Vector([0, 1, 0]);

// Reflected ray: R = I - 2(I·N)N
const dotProduct = incident.dot(surfaceNorm);
const reflected = incident.subtract(surfaceNorm.scale(2 * dotProduct));

console.log(`Incident Ray: ${incident.toString()}`);
console.log(`Surface Normal: ${surfaceNorm.toString()}`);
console.log(`Reflected Ray: ${reflected.toString()}\n`);

// ============================================================================
// 5. Distance from Point to Plane
// ============================================================================
console.log("5. Distance from Point to Plane");
console.log("--------------------------------");

// Plane defined by point and normal
const planePoint = new Vector([0, 0, 0]);
const planeNormal = new Vector([0, 1, 0]); // XZ plane

// Point in space
const point = new Vector([5, 3, 2]);

// Distance = |(P - P0) · N|
const vectorToPoint = Vector.fromPoints(planePoint, point);
const distance = Math.abs(vectorToPoint.dot(planeNormal));

console.log(`Plane Point: ${planePoint.toString()}`);
console.log(`Plane Normal: ${planeNormal.toString()}`);
console.log(`Point: ${point.toString()}`);
console.log(`Distance to Plane: ${distance.toFixed(2)}\n`);

// ============================================================================
// 6. Backface Culling
// ============================================================================
console.log("6. Backface Culling");
console.log("-------------------");

// Triangle normal
const triangleNormal = new Vector([0, 0, 1]);

// View direction from camera
const cameraToTriangle = new Vector([0, 0, -1]);

// If dot product is negative, triangle faces away from camera
const facingCamera = triangleNormal.dot(cameraToTriangle);
const isVisible = facingCamera < 0;

console.log(`Triangle Normal: ${triangleNormal.toString()}`);
console.log(`Camera Direction: ${cameraToTriangle.toString()}`);
console.log(`Dot Product: ${facingCamera.toFixed(2)}`);
console.log(`Visible: ${isVisible}\n`);

// ============================================================================
// 7. Bounding Box Collision
// ============================================================================
console.log("7. Bounding Box Collision");
console.log("-------------------------");

// Two objects with centers and half-extents
const object1Center = new Vector([0, 0, 0]);
const object1HalfExtents = new Vector([1, 1, 1]);

const object2Center = new Vector([1.5, 0, 0]);
const object2HalfExtents = new Vector([1, 1, 1]);

// Distance between centers
const centerDistance = Vector.fromPoints(object1Center, object2Center);
const distanceMagnitude = centerDistance.magnitude();

// Sum of half-extents
const sumHalfExtents = object1HalfExtents.get(0) + object2HalfExtents.get(0);

const isColliding = distanceMagnitude < sumHalfExtents;

console.log(`Object 1 Center: ${object1Center.toString()}`);
console.log(`Object 2 Center: ${object2Center.toString()}`);
console.log(`Distance: ${distanceMagnitude.toFixed(2)}`);
console.log(`Collision Threshold: ${sumHalfExtents.toFixed(2)}`);
console.log(`Colliding: ${isColliding}\n`);

// ============================================================================
// 8. Rotation Around Axis
// ============================================================================
console.log("8. Rotation Around Axis");
console.log("-----------------------");

// Rotate a point around Y-axis by 90 degrees
const originalPoint = new Vector([1, 0, 0]);
const rotationAngle = Math.PI / 2; // 90 degrees

// Rotation matrix for Y-axis
const rotatedX =
  originalPoint.get(0) * Math.cos(rotationAngle) + originalPoint.get(2) * Math.sin(rotationAngle);
const rotatedY = originalPoint.get(1);
const rotatedZ =
  -originalPoint.get(0) * Math.sin(rotationAngle) + originalPoint.get(2) * Math.cos(rotationAngle);

const rotatedPoint = new Vector([rotatedX, rotatedY, rotatedZ]);

console.log(`Original Point: ${originalPoint.toString()}`);
console.log(`Rotation: 90° around Y-axis`);
console.log(`Rotated Point: ${rotatedPoint.toString()}\n`);

// ============================================================================
// 9. Interpolation (Lerp)
// ============================================================================
console.log("9. Linear Interpolation");
console.log("-----------------------");

const startPos = new Vector([0, 0, 0]);
const endPos = new Vector([10, 5, 3]);
const t = 0.5; // 50% between start and end

// Lerp: P = (1-t)A + tB = A + t(B-A)
const interpolated = startPos.add(Vector.fromPoints(startPos, endPos).scale(t));

console.log(`Start: ${startPos.toString()}`);
console.log(`End: ${endPos.toString()}`);
console.log(`t = ${t}`);
console.log(`Interpolated: ${interpolated.toString()}\n`);

// ============================================================================
// 10. Ray-Sphere Intersection
// ============================================================================
console.log("10. Ray-Sphere Intersection");
console.log("---------------------------");

// Ray
const rayOrigin = new Vector([0, 0, -5]);
const rayDir = new Vector([0, 0, 1]);

// Sphere
const sphereCenter = new Vector([0, 0, 0]);
const sphereRadius = 1;

// Vector from ray origin to sphere center
const oc = Vector.fromPoints(sphereCenter, rayOrigin);

// Quadratic equation coefficients
const a = rayDir.dot(rayDir);
const b = 2.0 * oc.dot(rayDir);
const c = oc.dot(oc) - sphereRadius * sphereRadius;

const discriminant = b * b - 4 * a * c;
const hits = discriminant >= 0;

console.log(`Ray Origin: ${rayOrigin.toString()}`);
console.log(`Ray Direction: ${rayDir.toString()}`);
console.log(`Sphere Center: ${sphereCenter.toString()}`);
console.log(`Sphere Radius: ${sphereRadius}`);
console.log(`Discriminant: ${discriminant.toFixed(2)}`);
console.log(`Ray Hits Sphere: ${hits}`);

if (hits) {
  const t1 = (-b - Math.sqrt(discriminant)) / (2.0 * a);
  const hitPoint = rayOrigin.add(rayDir.scale(t1));
  console.log(`Hit Point: ${hitPoint.toString()}`);
}

console.log("\n=== End of 3D Graphics Examples ===");
