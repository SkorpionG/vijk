/**
 * Vector mathematics for n-dimensional vectors
 */

/**
 * Vector class for mathematical vector operations
 */
export class Vector {
  private _components: number[];

  /**
   * Creates a new Vector
   * @param components - Array of vector components
   */
  constructor(components: (number | string)[]) {
    if (!Array.isArray(components) || components.length === 0) {
      throw new Error("Vector must have at least one component");
    }

    // Convert all components to numbers
    this._components = components.map(c => {
      const num = typeof c === "string" ? parseFloat(c) : c;
      if (isNaN(num)) {
        throw new Error("All vector components must be valid numbers");
      }
      return num;
    });
  }

  /**
   * Get the vector components
   */
  get components(): number[] {
    return [...this._components];
  }

  /**
   * Get the dimension of the vector
   */
  get dimension(): number {
    return this._components.length;
  }

  /**
   * Get a specific component by index
   */
  get(index: number): number {
    if (index < 0 || index >= this._components.length) {
      throw new Error(`Index ${index} out of bounds for ${this._components.length}D vector`);
    }

    return this._components[index];
  }

  /**
   * Set a specific component by index
   */
  set(index: number, value: number | string): Vector {
    if (index < 0 || index >= this._components.length) {
      throw new Error(`Index ${index} out of bounds for ${this._components.length}D vector`);
    }

    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) {
      throw new Error("Component value must be a valid number");
    }

    const newComponents = [...this._components];
    newComponents[index] = num;
    return new Vector(newComponents);
  }

  /**
   * Calculate the magnitude (length) of the vector
   */
  magnitude(): number {
    const sumOfSquares = this._components.reduce((sum, c) => sum + c * c, 0);
    return Math.sqrt(sumOfSquares);
  }

  /**
   * Calculate the unit vector (normalized vector)
   */
  normalize(): Vector {
    const mag = this.magnitude();
    if (mag === 0) {
      throw new Error("Cannot normalize zero vector");
    }

    const normalizedComponents = this._components.map(c => c / mag);
    return new Vector(normalizedComponents);
  }

  /**
   * Add another vector to this vector
   */
  add(other: Vector): Vector {
    if (this.dimension !== other.dimension) {
      throw new Error(
        `Cannot add vectors of different dimensions: ${this.dimension}D and ${other.dimension}D`
      );
    }

    const resultComponents = this._components.map((c, i) => c + other._components[i]);
    return new Vector(resultComponents);
  }

  /**
   * Subtract another vector from this vector
   */
  subtract(other: Vector): Vector {
    if (this.dimension !== other.dimension) {
      throw new Error(
        `Cannot subtract vectors of different dimensions: ${this.dimension}D and ${other.dimension}D`
      );
    }

    const resultComponents = this._components.map((c, i) => c - other._components[i]);
    return new Vector(resultComponents);
  }

  /**
   * Multiply vector by a scalar
   */
  scale(scalar: number | string): Vector {
    const s = typeof scalar === "string" ? parseFloat(scalar) : scalar;
    if (isNaN(s)) {
      throw new Error("Scalar must be a valid number");
    }

    const scaledComponents = this._components.map(c => c * s);
    return new Vector(scaledComponents);
  }

  /**
   * Calculate dot product with another vector
   */
  dot(other: Vector): number {
    if (this.dimension !== other.dimension) {
      throw new Error(
        `Cannot compute dot product of vectors with different dimensions: ${this.dimension}D and ${other.dimension}D`
      );
    }

    return this._components.reduce((sum, c, i) => sum + c * other._components[i], 0);
  }

  /**
   * Calculate cross product with another 3D vector
   */
  cross(other: Vector): Vector {
    if (this.dimension !== 3 || other.dimension !== 3) {
      throw new Error("Cross product is only defined for 3D vectors");
    }

    const [a1, a2, a3] = this._components;
    const [b1, b2, b3] = other._components;

    const crossComponents = [a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1];

    return new Vector(crossComponents);
  }

  /**
   * Calculate the angle between this vector and another vector (in radians)
   */
  angleTo(other: Vector): number {
    if (this.dimension !== other.dimension) {
      throw new Error(
        `Cannot compute angle between vectors of different dimensions: ${this.dimension}D and ${other.dimension}D`
      );
    }

    const dotProd = this.dot(other);
    const mag1 = this.magnitude();
    const mag2 = other.magnitude();

    if (mag1 === 0 || mag2 === 0) {
      throw new Error("Cannot compute angle with zero vector");
    }

    const cosAngle = dotProd / (mag1 * mag2);
    // Clamp to [-1, 1] to handle floating point errors
    const clampedCos = Math.max(-1, Math.min(1, cosAngle));
    return Math.acos(clampedCos);
  }

  /**
   * Check if this vector is parallel to another vector
   * Two vectors are parallel if their cross product is zero (for 3D)
   * or if one is a scalar multiple of the other (for any dimension)
   */
  isParallel(other: Vector, tolerance: number = 1e-10): boolean {
    if (this.dimension !== other.dimension) {
      return false;
    }

    // Handle zero vectors
    if (this.magnitude() < tolerance || other.magnitude() < tolerance) {
      return false;
    }

    // For 3D vectors, use cross product (most reliable method)
    if (this.dimension === 3) {
      const crossProduct = this.cross(other);
      return crossProduct.magnitude() < tolerance;
    }

    // For other dimensions, check if one is a scalar multiple of the other
    // Find the ratio from the first non-zero component
    let ratio: number | null = null;
    for (let i = 0; i < this.dimension; i++) {
      const thisComp = this._components[i];
      const otherComp = other._components[i];

      if (Math.abs(thisComp) > tolerance || Math.abs(otherComp) > tolerance) {
        if (Math.abs(thisComp) < tolerance || Math.abs(otherComp) < tolerance) {
          return false; // One is zero, the other isn't
        }

        const currentRatio = thisComp / otherComp;
        if (ratio === null) {
          ratio = currentRatio;
        } else if (Math.abs(ratio - currentRatio) > tolerance) {
          return false; // Ratios don't match
        }
      }
    }

    return true;
  }

  /**
   * Check if this vector is perpendicular to another vector
   */
  isPerpendicular(other: Vector, tolerance: number = 1e-10): boolean {
    if (this.dimension !== other.dimension) {
      return false;
    }

    const dotProd = this.dot(other);
    return Math.abs(dotProd) < tolerance;
  }

  /**
   * Check if this vector is orthogonal to another vector
   * This is an alias for isPerpendicular
   */
  isOrthogonal(other: Vector, tolerance: number = 1e-10): boolean {
    return this.isPerpendicular(other, tolerance);
  }

  /**
   * Project this vector onto another vector
   */
  projectOnto(other: Vector): Vector {
    if (this.dimension !== other.dimension) {
      throw new Error(
        `Cannot project vectors of different dimensions: ${this.dimension}D and ${other.dimension}D`
      );
    }

    const otherMagSquared = other._components.reduce((sum, c) => sum + c * c, 0);
    if (otherMagSquared === 0) {
      throw new Error("Cannot project onto zero vector");
    }

    const dotProd = this.dot(other);
    const scalar = dotProd / otherMagSquared;

    return other.scale(scalar);
  }

  /**
   * Check if this vector equals another vector
   */
  equals(other: Vector, tolerance: number = 1e-10): boolean {
    if (this.dimension !== other.dimension) {
      return false;
    }

    return this._components.every((c, i) => Math.abs(c - other._components[i]) < tolerance);
  }

  /**
   * Create a copy of this vector
   */
  clone(): Vector {
    return new Vector([...this._components]);
  }

  /**
   * Convert vector to array
   */
  toArray(): number[] {
    return this.components;
  }

  /**
   * Convert vector to string representation
   */
  toString(): string {
    const components = this.components.map(c => c.toString()).join(", ");
    return `[${components}]`;
  }

  /**
   * Create a zero vector of specified dimension
   */
  static zero(dimension: number): Vector {
    if (dimension < 1) {
      throw new Error("Vector dimension must be at least 1");
    }
    return new Vector(new Array(dimension).fill(0));
  }

  /**
   * Create a unit vector along a specific axis
   */
  static unitVector(dimension: number, axis: number): Vector {
    if (dimension < 1) {
      throw new Error("Vector dimension must be at least 1");
    }
    if (axis < 0 || axis >= dimension) {
      throw new Error(`Axis ${axis} out of bounds for ${dimension}D vector`);
    }

    const components = new Array(dimension).fill(0);
    components[axis] = 1;
    return new Vector(components);
  }

  /**
   * Create a vector from two points
   */
  static fromPoints(from: Vector, to: Vector): Vector {
    return to.subtract(from);
  }
}
