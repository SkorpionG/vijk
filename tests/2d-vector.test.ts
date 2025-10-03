/**
 * Tests for 2D Vector operations
 */

import { Vector } from "../src/vector.js";

describe("2D Vector Operations", () => {
  describe("2D specific operations", () => {
    test("creates 2D vector", () => {
      const v = new Vector([3, 4]);
      expect(v.dimension).toBe(2);
      expect(v.components).toEqual([3, 4]);
    });

    test("calculates magnitude for 2D vectors", () => {
      const v1 = new Vector([3, 4]);
      expect(v1.magnitude()).toBe(5); // 3-4-5 triangle

      const v2 = new Vector([1, 1]);
      expect(v2.magnitude()).toBeCloseTo(Math.sqrt(2), 5);

      const v3 = new Vector([5, 12]);
      expect(v3.magnitude()).toBe(13); // 5-12-13 triangle
    });

    test("normalizes 2D vectors", () => {
      const v = new Vector([3, 4]);
      const normalized = v.normalize();

      expect(normalized.magnitude()).toBeCloseTo(1, 5);
      expect(normalized.get(0)).toBeCloseTo(0.6, 5);
      expect(normalized.get(1)).toBeCloseTo(0.8, 5);
    });

    test("adds 2D vectors", () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([3, 4]);
      const result = v1.add(v2);

      expect(result.components).toEqual([4, 6]);
    });

    test("subtracts 2D vectors", () => {
      const v1 = new Vector([5, 7]);
      const v2 = new Vector([2, 3]);
      const result = v1.subtract(v2);

      expect(result.components).toEqual([3, 4]);
    });

    test("scales 2D vectors", () => {
      const v = new Vector([2, 3]);
      const scaled = v.scale(3);

      expect(scaled.components).toEqual([6, 9]);
    });

    test("calculates dot product for 2D vectors", () => {
      const v1 = new Vector([2, 3]);
      const v2 = new Vector([4, 5]);

      expect(v1.dot(v2)).toBe(23); // 2*4 + 3*5 = 8 + 15 = 23
    });

    test("calculates angle between 2D vectors", () => {
      const v1 = new Vector([1, 0]);
      const v2 = new Vector([0, 1]);
      const angle = v1.angleTo(v2);

      expect(angle).toBeCloseTo(Math.PI / 2, 5); // 90 degrees

      const v3 = new Vector([1, 1]);
      const v4 = new Vector([1, 0]);
      const angle2 = v3.angleTo(v4);

      expect(angle2).toBeCloseTo(Math.PI / 4, 5); // 45 degrees
    });

    test("checks if 2D vectors are parallel", () => {
      const v1 = new Vector([2, 4]);
      const v2 = new Vector([1, 2]);
      const v3 = new Vector([-3, -6]);
      const v4 = new Vector([1, 3]);

      expect(v1.isParallel(v2)).toBe(true);
      expect(v1.isParallel(v3)).toBe(true); // Opposite direction
      expect(v1.isParallel(v4)).toBe(false);
    });

    test("checks if 2D vectors are perpendicular", () => {
      const v1 = new Vector([1, 0]);
      const v2 = new Vector([0, 1]);
      const v3 = new Vector([3, 4]);
      const v4 = new Vector([-4, 3]); // Perpendicular to v3

      expect(v1.isPerpendicular(v2)).toBe(true);
      expect(v3.isPerpendicular(v4)).toBe(true);
      expect(v1.isPerpendicular(v3)).toBe(false);
    });

    test("projects 2D vector onto another", () => {
      const v1 = new Vector([3, 4]);
      const v2 = new Vector([1, 0]);
      const projection = v1.projectOnto(v2);

      expect(projection.components).toEqual([3, 0]);

      const v3 = new Vector([5, 5]);
      const v4 = new Vector([1, 1]);
      const projection2 = v3.projectOnto(v4);

      expect(projection2.get(0)).toBeCloseTo(5, 5);
      expect(projection2.get(1)).toBeCloseTo(5, 5);
    });

    test("creates 2D zero vector", () => {
      const zero = Vector.zero(2);

      expect(zero.components).toEqual([0, 0]);
      expect(zero.magnitude()).toBe(0);
    });

    test("creates 2D unit vectors", () => {
      const unitX = Vector.unitVector(2, 0);
      const unitY = Vector.unitVector(2, 1);

      expect(unitX.components).toEqual([1, 0]);
      expect(unitY.components).toEqual([0, 1]);
    });

    test("creates vector from 2D points", () => {
      const p1 = new Vector([1, 2]);
      const p2 = new Vector([4, 6]);
      const direction = Vector.fromPoints(p1, p2);

      expect(direction.components).toEqual([3, 4]);
      expect(direction.magnitude()).toBe(5);
    });

    test("rotation-like operations with 2D vectors", () => {
      // Perpendicular vector (90 degree rotation)
      const v = new Vector([3, 4]);
      const perp = new Vector([-4, 3]); // Rotated 90 degrees CCW

      expect(v.dot(perp)).toBeCloseTo(0, 5); // Should be perpendicular
      expect(perp.magnitude()).toBeCloseTo(v.magnitude(), 5); // Same length
    });
  });

  describe("2D edge cases", () => {
    test("handles very small 2D vectors", () => {
      const v = new Vector([1e-10, 1e-10]);
      expect(v.magnitude()).toBeCloseTo(Math.sqrt(2) * 1e-10, 15);
    });

    test("handles very large 2D vectors", () => {
      const v = new Vector([1e10, 1e10]);
      expect(v.magnitude()).toBeCloseTo(Math.sqrt(2) * 1e10, 5);
    });

    test("handles 2D vectors with negative components", () => {
      const v1 = new Vector([-3, -4]);
      const v2 = new Vector([3, 4]);

      expect(v1.magnitude()).toBe(5);
      expect(v1.add(v2).components).toEqual([0, 0]);
    });
  });
});
