/**
 * Tests for 3D Vector operations
 */

import { Vector } from "../src/vector.js";

describe("3D Vector Operations", () => {
  describe("3D specific operations", () => {
    test("creates 3D vector", () => {
      const v = new Vector([1, 2, 3]);
      expect(v.dimension).toBe(3);
      expect(v.components).toEqual([1, 2, 3]);
    });

    test("calculates magnitude for 3D vectors", () => {
      const v1 = new Vector([1, 2, 2]);
      expect(v1.magnitude()).toBe(3); // sqrt(1 + 4 + 4) = 3

      const v2 = new Vector([1, 1, 1]);
      expect(v2.magnitude()).toBeCloseTo(Math.sqrt(3), 5);

      const v3 = new Vector([2, 3, 6]);
      expect(v3.magnitude()).toBe(7); // sqrt(4 + 9 + 36) = 7
    });

    test("normalizes 3D vectors", () => {
      const v = new Vector([3, 4, 0]);
      const normalized = v.normalize();

      expect(normalized.magnitude()).toBeCloseTo(1, 5);
      expect(normalized.get(0)).toBeCloseTo(0.6, 5);
      expect(normalized.get(1)).toBeCloseTo(0.8, 5);
      expect(normalized.get(2)).toBe(0);
    });

    test("adds 3D vectors", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([4, 5, 6]);
      const result = v1.add(v2);

      expect(result.components).toEqual([5, 7, 9]);
    });

    test("subtracts 3D vectors", () => {
      const v1 = new Vector([5, 7, 9]);
      const v2 = new Vector([1, 2, 3]);
      const result = v1.subtract(v2);

      expect(result.components).toEqual([4, 5, 6]);
    });

    test("scales 3D vectors", () => {
      const v = new Vector([1, 2, 3]);
      const scaled = v.scale(2);

      expect(scaled.components).toEqual([2, 4, 6]);
    });

    test("calculates dot product for 3D vectors", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([4, 5, 6]);

      expect(v1.dot(v2)).toBe(32); // 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32
    });

    test("calculates cross product for 3D vectors", () => {
      // Standard basis vectors
      const i = new Vector([1, 0, 0]);
      const j = new Vector([0, 1, 0]);
      const k = new Vector([0, 0, 1]);

      expect(i.cross(j).components).toEqual([0, 0, 1]); // i × j = k
      expect(j.cross(k).components).toEqual([1, 0, 0]); // j × k = i
      expect(k.cross(i).components).toEqual([0, 1, 0]); // k × i = j

      // Anti-commutative property: a × b = -(b × a)
      expect(j.cross(i).components).toEqual([0, 0, -1]); // j × i = -k
    });

    test("cross product of parallel 3D vectors is zero", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([2, 4, 6]);
      const cross = v1.cross(v2);

      expect(cross.components).toEqual([0, 0, 0]);
    });

    test("cross product magnitude equals area of parallelogram", () => {
      const v1 = new Vector([3, 0, 0]);
      const v2 = new Vector([0, 4, 0]);
      const cross = v1.cross(v2);

      expect(cross.magnitude()).toBe(12); // Area = 3 * 4 = 12
    });

    test("cross product is perpendicular to both vectors", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([4, 5, 6]);
      const cross = v1.cross(v2);

      expect(v1.dot(cross)).toBeCloseTo(0, 5);
      expect(v2.dot(cross)).toBeCloseTo(0, 5);
    });

    test("calculates angle between 3D vectors", () => {
      const v1 = new Vector([1, 0, 0]);
      const v2 = new Vector([0, 1, 0]);
      const angle = v1.angleTo(v2);

      expect(angle).toBeCloseTo(Math.PI / 2, 5); // 90 degrees

      const v3 = new Vector([1, 1, 0]);
      const v4 = new Vector([1, 0, 0]);
      const angle2 = v3.angleTo(v4);

      expect(angle2).toBeCloseTo(Math.PI / 4, 5); // 45 degrees
    });

    test("checks if 3D vectors are parallel using cross product", () => {
      const v1 = new Vector([2, 4, 6]);
      const v2 = new Vector([1, 2, 3]);
      const v3 = new Vector([-3, -6, -9]);
      const v4 = new Vector([1, 2, 4]);

      expect(v1.isParallel(v2)).toBe(true);
      expect(v1.isParallel(v3)).toBe(true); // Opposite direction
      expect(v1.isParallel(v4)).toBe(false);
    });

    test("checks if 3D vectors are perpendicular", () => {
      const v1 = new Vector([1, 0, 0]);
      const v2 = new Vector([0, 1, 0]);
      const v3 = new Vector([1, 1, 0]);
      const v4 = new Vector([-1, 1, 0]); // Perpendicular to v3

      expect(v1.isPerpendicular(v2)).toBe(true);
      expect(v3.isPerpendicular(v4)).toBe(true);
      expect(v1.isPerpendicular(v3)).toBe(false);
    });

    test("projects 3D vector onto another", () => {
      const v1 = new Vector([3, 4, 0]);
      const v2 = new Vector([1, 0, 0]);
      const projection = v1.projectOnto(v2);

      expect(projection.components).toEqual([3, 0, 0]);

      const v3 = new Vector([1, 2, 3]);
      const v4 = new Vector([1, 1, 1]);
      const projection2 = v3.projectOnto(v4);

      // Projection should be parallel to v4
      expect(projection2.isParallel(v4)).toBe(true);
    });

    test("creates 3D zero vector", () => {
      const zero = Vector.zero(3);

      expect(zero.components).toEqual([0, 0, 0]);
      expect(zero.magnitude()).toBe(0);
    });

    test("creates 3D unit vectors", () => {
      const unitX = Vector.unitVector(3, 0);
      const unitY = Vector.unitVector(3, 1);
      const unitZ = Vector.unitVector(3, 2);

      expect(unitX.components).toEqual([1, 0, 0]);
      expect(unitY.components).toEqual([0, 1, 0]);
      expect(unitZ.components).toEqual([0, 0, 1]);
    });

    test("creates vector from 3D points", () => {
      const p1 = new Vector([1, 2, 3]);
      const p2 = new Vector([4, 6, 8]);
      const direction = Vector.fromPoints(p1, p2);

      expect(direction.components).toEqual([3, 4, 5]);
    });
  });

  describe("3D geometric applications", () => {
    test("calculates surface normal from triangle", () => {
      // Triangle vertices
      const v1 = new Vector([0, 0, 0]);
      const v2 = new Vector([1, 0, 0]);
      const v3 = new Vector([0, 1, 0]);

      // Edge vectors
      const edge1 = Vector.fromPoints(v1, v2);
      const edge2 = Vector.fromPoints(v1, v3);

      // Normal (cross product)
      const normal = edge1.cross(edge2).normalize();

      expect(normal.get(0)).toBeCloseTo(0, 5);
      expect(normal.get(1)).toBeCloseTo(0, 5);
      expect(normal.get(2)).toBeCloseTo(1, 5);
    });

    test("verifies right-hand rule for cross product", () => {
      // Using right-hand rule: if forward is Z+ and right is X+, then up is Y+
      const forward = new Vector([0, 0, 1]); // Z+
      const right = new Vector([1, 0, 0]); // X+
      const up = forward.cross(right); // Should be Y+

      expect(up.get(0)).toBeCloseTo(0, 5);
      expect(up.get(1)).toBeCloseTo(1, 5); // Y+ (not -1)
      expect(up.get(2)).toBeCloseTo(0, 5);

      // Verify: Z × X = Y (following i × j = k pattern rotated)
      // Alternative: X × Y = Z, Y × Z = X, Z × X = Y
    });

    test("calculates triple scalar product (volume)", () => {
      const a = new Vector([1, 0, 0]);
      const b = new Vector([0, 2, 0]);
      const c = new Vector([0, 0, 3]);

      // Volume = a · (b × c)
      const volume = a.dot(b.cross(c));

      expect(volume).toBe(6); // 1 * 2 * 3 = 6
    });
  });

  describe("3D edge cases", () => {
    test("handles very small 3D vectors", () => {
      const v = new Vector([1e-10, 1e-10, 1e-10]);
      expect(v.magnitude()).toBeCloseTo(Math.sqrt(3) * 1e-10, 15);
    });

    test("handles very large 3D vectors", () => {
      const v = new Vector([1e10, 1e10, 1e10]);
      expect(v.magnitude()).toBeCloseTo(Math.sqrt(3) * 1e10, 5);
    });

    test("handles 3D vectors with negative components", () => {
      const v1 = new Vector([-1, -2, -3]);
      const v2 = new Vector([1, 2, 3]);

      expect(v1.magnitude()).toBeCloseTo(Math.sqrt(14), 5);
      expect(v1.add(v2).components).toEqual([0, 0, 0]);
    });

    test("cross product with nearly parallel vectors", () => {
      const v1 = new Vector([1, 0, 0]);
      const v2 = new Vector([1, 1e-10, 0]);
      const cross = v1.cross(v2);

      expect(cross.magnitude()).toBeLessThan(1e-9);
    });
  });
});
