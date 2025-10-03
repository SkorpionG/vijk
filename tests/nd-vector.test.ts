/**
 * Tests for N-Dimensional Vector operations (4D and higher)
 */

import { Vector } from "../src/vector.js";

describe("N-Dimensional Vector Operations", () => {
  describe("4D vectors", () => {
    test("creates 4D vector", () => {
      const v = new Vector([1, 2, 3, 4]);
      expect(v.dimension).toBe(4);
      expect(v.components).toEqual([1, 2, 3, 4]);
    });

    test("calculates magnitude for 4D vectors", () => {
      const v = new Vector([1, 2, 2, 4]);
      expect(v.magnitude()).toBe(5); // sqrt(1 + 4 + 4 + 16) = 5
    });

    test("normalizes 4D vectors", () => {
      const v = new Vector([2, 0, 0, 0]);
      const normalized = v.normalize();

      expect(normalized.magnitude()).toBeCloseTo(1, 5);
      expect(normalized.components).toEqual([1, 0, 0, 0]);
    });

    test("adds 4D vectors", () => {
      const v1 = new Vector([1, 2, 3, 4]);
      const v2 = new Vector([5, 6, 7, 8]);
      const result = v1.add(v2);

      expect(result.components).toEqual([6, 8, 10, 12]);
    });

    test("calculates dot product for 4D vectors", () => {
      const v1 = new Vector([1, 2, 3, 4]);
      const v2 = new Vector([5, 6, 7, 8]);

      expect(v1.dot(v2)).toBe(70); // 1*5 + 2*6 + 3*7 + 4*8 = 5 + 12 + 21 + 32 = 70
    });

    test("checks if 4D vectors are parallel", () => {
      const v1 = new Vector([1, 2, 3, 4]);
      const v2 = new Vector([2, 4, 6, 8]);
      const v3 = new Vector([1, 2, 3, 5]);

      expect(v1.isParallel(v2)).toBe(true);
      expect(v1.isParallel(v3)).toBe(false);
    });

    test("checks if 4D vectors are perpendicular", () => {
      const v1 = new Vector([1, 0, 0, 0]);
      const v2 = new Vector([0, 1, 0, 0]);
      const v3 = new Vector([1, 1, 0, 0]);

      expect(v1.isPerpendicular(v2)).toBe(true);
      expect(v1.isPerpendicular(v3)).toBe(false);
    });

    test("projects 4D vector onto another", () => {
      const v1 = new Vector([1, 2, 3, 4]);
      const v2 = new Vector([1, 0, 0, 0]);
      const projection = v1.projectOnto(v2);

      expect(projection.components).toEqual([1, 0, 0, 0]);
    });
  });

  describe("5D vectors", () => {
    test("creates 5D vector", () => {
      const v = new Vector([1, 2, 3, 4, 5]);
      expect(v.dimension).toBe(5);
      expect(v.components).toEqual([1, 2, 3, 4, 5]);
    });

    test("calculates magnitude for 5D vectors", () => {
      const v = new Vector([2, 3, 6, 0, 0]);
      expect(v.magnitude()).toBe(7); // sqrt(4 + 9 + 36) = 7
    });

    test("operations on 5D vectors", () => {
      const v1 = new Vector([1, 2, 3, 4, 5]);
      const v2 = new Vector([5, 4, 3, 2, 1]);

      expect(v1.add(v2).components).toEqual([6, 6, 6, 6, 6]);
      expect(v1.dot(v2)).toBe(35); // 1*5 + 2*4 + 3*3 + 4*2 + 5*1 = 35
    });
  });

  describe("high-dimensional vectors", () => {
    test("creates 10D vector", () => {
      const components = Array.from({ length: 10 }, (_, i) => i + 1);
      const v = new Vector(components);

      expect(v.dimension).toBe(10);
      expect(v.get(0)).toBe(1);
      expect(v.get(9)).toBe(10);
    });

    test("calculates magnitude for 10D vectors", () => {
      const components = Array.from({ length: 10 }, () => 1);
      const v = new Vector(components);

      expect(v.magnitude()).toBeCloseTo(Math.sqrt(10), 5);
    });

    test("normalizes high-dimensional vectors", () => {
      const components = Array.from({ length: 10 }, () => 1);
      const v = new Vector(components);
      const normalized = v.normalize();

      expect(normalized.magnitude()).toBeCloseTo(1, 5);
      expect(normalized.get(0)).toBeCloseTo(1 / Math.sqrt(10), 5);
    });

    test("operations on high-dimensional vectors", () => {
      const v1 = new Vector(Array.from({ length: 100 }, (_, i) => i));
      const v2 = new Vector(Array.from({ length: 100 }, (_, i) => i));

      expect(v1.equals(v2)).toBe(true);
      expect(v1.add(v2).get(50)).toBe(100);
    });
  });

  describe("parallel detection in N dimensions", () => {
    test("detects parallel vectors in 4D", () => {
      const v1 = new Vector([1, 2, 3, 4]);
      const v2 = new Vector([2, 4, 6, 8]);
      const v3 = new Vector([-0.5, -1, -1.5, -2]);

      expect(v1.isParallel(v2)).toBe(true);
      expect(v1.isParallel(v3)).toBe(true);
    });

    test("detects non-parallel vectors in 4D", () => {
      const v1 = new Vector([1, 2, 3, 4]);
      const v2 = new Vector([1, 2, 3, 5]);
      const v3 = new Vector([4, 3, 2, 1]);

      expect(v1.isParallel(v2)).toBe(false);
      expect(v1.isParallel(v3)).toBe(false);
    });

    test("detects parallel vectors in 10D", () => {
      const components = Array.from({ length: 10 }, (_, i) => i + 1);
      const v1 = new Vector(components);
      const v2 = new Vector(components.map(c => c * 3));
      const v3 = new Vector(components.map(c => c * -2));

      expect(v1.isParallel(v2)).toBe(true);
      expect(v1.isParallel(v3)).toBe(true);
    });
  });

  describe("orthogonality in N dimensions", () => {
    test("checks orthogonality in 4D", () => {
      const v1 = new Vector([1, 0, 0, 0]);
      const v2 = new Vector([0, 1, 0, 0]);
      const v3 = new Vector([0, 0, 1, 0]);
      const v4 = new Vector([0, 0, 0, 1]);

      expect(v1.isOrthogonal(v2)).toBe(true);
      expect(v1.isOrthogonal(v3)).toBe(true);
      expect(v1.isOrthogonal(v4)).toBe(true);
      expect(v2.isOrthogonal(v3)).toBe(true);
    });

    test("creates orthogonal basis in 5D", () => {
      const basis = Array.from({ length: 5 }, (_, i) => Vector.unitVector(5, i));

      // Check all pairs are orthogonal
      for (let i = 0; i < 5; i++) {
        for (let j = i + 1; j < 5; j++) {
          expect(basis[i].isOrthogonal(basis[j])).toBe(true);
        }
      }
    });
  });

  describe("machine learning / data science use cases", () => {
    test("feature vectors (e.g., 784D for MNIST)", () => {
      const featureVector = new Vector(Array.from({ length: 784 }, () => Math.random()));

      expect(featureVector.dimension).toBe(784);
      expect(featureVector.magnitude()).toBeGreaterThan(0);
    });

    test("cosine similarity between feature vectors", () => {
      const v1 = new Vector([1, 2, 3, 4, 5]);
      const v2 = new Vector([2, 4, 6, 8, 10]);

      // Cosine similarity = (v1 · v2) / (|v1| * |v2|)
      const cosineSim = v1.dot(v2) / (v1.magnitude() * v2.magnitude());

      expect(cosineSim).toBeCloseTo(1, 5); // Parallel vectors have cosine similarity of 1
    });

    test("euclidean distance between vectors", () => {
      const v1 = new Vector([1, 2, 3]);
      const v2 = new Vector([4, 6, 8]);

      const difference = v1.subtract(v2);
      const distance = difference.magnitude();

      expect(distance).toBeCloseTo(Math.sqrt(50), 5);
    });
  });

  describe("edge cases for N-dimensional vectors", () => {
    test("handles 1D vectors", () => {
      const v1 = new Vector([5]);
      const v2 = new Vector([3]);

      expect(v1.dimension).toBe(1);
      expect(v1.magnitude()).toBe(5);
      expect(v1.add(v2).components).toEqual([8]);
    });

    test("handles vectors with many zeros", () => {
      const components = Array.from({ length: 100 }, (_, i) => (i === 50 ? 1 : 0));
      const v = new Vector(components);

      expect(v.magnitude()).toBe(1);
      expect(v.get(50)).toBe(1);
    });

    test("handles sparse-like vectors", () => {
      const v1 = new Vector([1, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
      const v2 = new Vector([0, 1, 0, 0, 0, 0, 0, 0, 1, 0]);

      expect(v1.dot(v2)).toBe(0);
      expect(v1.isPerpendicular(v2)).toBe(true);
    });
  });
});
