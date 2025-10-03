/**
 * Tests for Vector class and operations
 */

import { Vector } from "../src/vector.js";

describe("Vector", () => {
  describe("constructor", () => {
    test("creates vector from number array", () => {
      const v = new Vector([1, 2, 3]);
      expect(v.components).toEqual([1, 2, 3]);
      expect(v.dimension).toBe(3);
    });

    test("creates vector from string array", () => {
      const v = new Vector(["1", "2", "3"]);
      expect(v.components).toEqual([1, 2, 3]);
    });

    test("creates vector with mixed types", () => {
      const v = new Vector([1, "2", 3.5]);
      expect(v.components).toEqual([1, 2, 3.5]);
    });

    test("throws error for empty array", () => {
      expect(() => new Vector([])).toThrow("Vector must have at least one component");
    });

    test("throws error for invalid components", () => {
      expect(() => new Vector(["invalid", "2"])).toThrow(
        "All vector components must be valid numbers"
      );
    });
  });

  describe("basic operations", () => {
    test("get and set components", () => {
      const v = new Vector([1, 2, 3]);
      expect(v.get(0)).toBe(1);
      expect(v.get(1)).toBe(2);
      expect(v.get(2)).toBe(3);

      const v2 = v.set(1, 5);
      expect(v2.get(1)).toBe(5);
      expect(v.get(1)).toBe(2); // Original unchanged
    });

    test("throws error for out of bounds access", () => {
      const v = new Vector([1, 2, 3]);
      expect(() => v.get(-1)).toThrow("Index -1 out of bounds for 3D vector");
      expect(() => v.get(3)).toThrow("Index 3 out of bounds for 3D vector");
      expect(() => v.set(-1, 5)).toThrow("Index -1 out of bounds for 3D vector");
    });

    test("calculates magnitude", () => {
      const v1 = new Vector([3, 4]);
      expect(v1.magnitude()).toBe(5); // 3-4-5 triangle

      const v2 = new Vector([1, 1, 1]);
      expect(v2.magnitude()).toBeCloseTo(Math.sqrt(3), 5);

      const v3 = new Vector([0, 0, 0]);
      expect(v3.magnitude()).toBe(0);
    });

    test("normalizes vector", () => {
      const v = new Vector([3, 4]);
      const normalized = v.normalize();
      expect(normalized.magnitude()).toBeCloseTo(1, 5);
      expect(normalized.get(0)).toBeCloseTo(0.6, 5);
      expect(normalized.get(1)).toBeCloseTo(0.8, 5);
    });

    test("throws error when normalizing zero vector", () => {
      const v = new Vector([0, 0, 0]);
      expect(() => v.normalize()).toThrow("Cannot normalize zero vector");
    });
  });

  describe("vector arithmetic", () => {
    test("adds vectors", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([4, 5, 6]);
      const result = v1.add(v2);
      expect(result.components).toEqual([5, 7, 9]);
    });

    test("subtracts vectors", () => {
      const v1 = new Vector([5, 7, 9]);
      const v2 = new Vector([1, 2, 3]);
      const result = v1.subtract(v2);
      expect(result.components).toEqual([4, 5, 6]);
    });

    test("scales vector by scalar", () => {
      const v = new Vector([1, 2, 3]);
      const scaled = v.scale(2);
      expect(scaled.components).toEqual([2, 4, 6]);

      const scaledNegative = v.scale(-1);
      expect(scaledNegative.components).toEqual([-1, -2, -3]);
    });

    test("throws error for mismatched dimensions", () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([1, 2, 3]);
      expect(() => v1.add(v2)).toThrow("Cannot add vectors of different dimensions: 2D and 3D");
      expect(() => v1.subtract(v2)).toThrow(
        "Cannot subtract vectors of different dimensions: 2D and 3D"
      );
    });
  });

  describe("dot product", () => {
    test("calculates dot product", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([4, 5, 6]);
      const dot = v1.dot(v2);
      expect(dot).toBe(32); // 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32
    });

    test("dot product with perpendicular vectors", () => {
      const v1 = new Vector([1, 0]);
      const v2 = new Vector([0, 1]);
      expect(v1.dot(v2)).toBe(0);
    });

    test("dot product with parallel vectors", () => {
      const v1 = new Vector([2, 4]);
      const v2 = new Vector([1, 2]);
      expect(v1.dot(v2)).toBe(10); // 2*1 + 4*2 = 10
    });
  });

  describe("cross product", () => {
    test("calculates cross product for 3D vectors", () => {
      const v1 = new Vector([1, 0, 0]);
      const v2 = new Vector([0, 1, 0]);
      const cross = v1.cross(v2);
      expect(cross.components).toEqual([0, 0, 1]);
    });

    test("cross product of parallel vectors is zero", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([2, 4, 6]);
      const cross = v1.cross(v2);
      expect(cross.components).toEqual([0, 0, 0]);
    });

    test("throws error for non-3D vectors", () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([3, 4]);
      expect(() => v1.cross(v2)).toThrow("Cross product is only defined for 3D vectors");
    });
  });

  describe("angle calculations", () => {
    test("calculates angle between vectors", () => {
      const v1 = new Vector([1, 0]);
      const v2 = new Vector([0, 1]);
      const angle = v1.angleTo(v2);
      expect(angle).toBeCloseTo(Math.PI / 2, 5); // 90 degrees
    });

    test("angle between parallel vectors", () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([2, 4]);
      const angle = v1.angleTo(v2);
      expect(angle).toBeCloseTo(0, 5);
    });

    test("angle between opposite vectors", () => {
      const v1 = new Vector([1, 0]);
      const v2 = new Vector([-1, 0]);
      const angle = v1.angleTo(v2);
      expect(angle).toBeCloseTo(Math.PI, 5); // 180 degrees
    });

    test("throws error for zero vector angle", () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([0, 0]);
      expect(() => v1.angleTo(v2)).toThrow("Cannot compute angle with zero vector");
    });
  });

  describe("vector relationships", () => {
    test("checks if vectors are parallel", () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([2, 4]);
      const v3 = new Vector([-1, -2]);
      const v4 = new Vector([2, 1]);

      expect(v1.isParallel(v2)).toBe(true);
      expect(v1.isParallel(v3)).toBe(true); // Opposite direction
      expect(v1.isParallel(v4)).toBe(false);
    });

    test("checks if vectors are perpendicular", () => {
      const v1 = new Vector([1, 0]);
      const v2 = new Vector([0, 1]);
      const v3 = new Vector([1, 1]);

      expect(v1.isPerpendicular(v2)).toBe(true);
      expect(v1.isPerpendicular(v3)).toBe(false);
    });

    test("checks if vectors are orthogonal (alias for perpendicular)", () => {
      const v1 = new Vector([1, 0]);
      const v2 = new Vector([0, 1]);
      const v3 = new Vector([1, 1]);

      expect(v1.isOrthogonal(v2)).toBe(true);
      expect(v1.isOrthogonal(v3)).toBe(false);
    });

    test("checks vector equality", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([1, 2, 3]);
      const v3 = new Vector([1, 2, 4]);

      expect(v1.equals(v2)).toBe(true);
      expect(v1.equals(v3)).toBe(false);
    });
  });

  describe("vector projection", () => {
    test("projects vector onto another", () => {
      const v1 = new Vector([3, 4]);
      const v2 = new Vector([1, 0]);
      const projection = v1.projectOnto(v2);
      expect(projection.components).toEqual([3, 0]);
    });

    test("throws error when projecting onto zero vector", () => {
      const v1 = new Vector([1, 2]);
      const v2 = new Vector([0, 0]);
      expect(() => v1.projectOnto(v2)).toThrow("Cannot project onto zero vector");
    });
  });

  describe("static methods", () => {
    test("creates zero vector", () => {
      const zero2D = Vector.zero(2);
      expect(zero2D.components).toEqual([0, 0]);

      const zero3D = Vector.zero(3);
      expect(zero3D.components).toEqual([0, 0, 0]);
    });

    test("creates unit vector", () => {
      const unitX = Vector.unitVector(3, 0);
      expect(unitX.components).toEqual([1, 0, 0]);

      const unitY = Vector.unitVector(3, 1);
      expect(unitY.components).toEqual([0, 1, 0]);

      const unitZ = Vector.unitVector(3, 2);
      expect(unitZ.components).toEqual([0, 0, 1]);
    });

    test("creates vector from points", () => {
      const from = new Vector([1, 2]);
      const to = new Vector([4, 6]);
      const vector = Vector.fromPoints(from, to);
      expect(vector.components).toEqual([3, 4]);
    });

    test("throws error for invalid dimensions", () => {
      expect(() => Vector.zero(0)).toThrow("Vector dimension must be at least 1");
      expect(() => Vector.unitVector(0, 0)).toThrow("Vector dimension must be at least 1");
      expect(() => Vector.unitVector(3, 3)).toThrow("Axis 3 out of bounds for 3D vector");
    });
  });

  describe("utility methods", () => {
    test("clones vector", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = v1.clone();
      expect(v2.components).toEqual([1, 2, 3]);
      expect(v2).not.toBe(v1); // Different objects
    });

    test("converts to array", () => {
      const v = new Vector([1, 2, 3]);
      expect(v.toArray()).toEqual([1, 2, 3]);
    });

    test("converts to string", () => {
      const v = new Vector([1, 2, 3]);
      expect(v.toString()).toBe("[1, 2, 3]");
    });
  });

  describe("immutability", () => {
    test("operations do not modify original vectors", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([4, 5, 6]);

      v1.add(v2);
      expect(v1.components).toEqual([1, 2, 3]);

      v1.scale(2);
      expect(v1.components).toEqual([1, 2, 3]);

      v1.normalize();
      expect(v1.components).toEqual([1, 2, 3]);
    });

    test("set returns new vector without modifying original", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = v1.set(1, 10);

      expect(v1.get(1)).toBe(2);
      expect(v2.get(1)).toBe(10);
    });
  });
});
