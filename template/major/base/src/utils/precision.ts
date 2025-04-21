import NP from 'number-precision';

/**
 * Add two numbers with high precision
 * @param {number} value1 - First number to add
 * @param {number} value2 - Second number to add
 * @returns {number} The sum of value1 and value2 with high precision
 */
export function plus(value1, value2) {
  return NP.plus(value1, value2);
}

/**
 * Subtract two numbers with high precision
 * @param {number} value1 - First number to subtract from
 * @param {number} value2 - Second number to subtract
 * @returns {number} The difference between value1 and value2 with high precision
 */
export function minus(value1, value2) {
  return NP.minus(value1, value2);
}

/**
 * Multiply two numbers with high precision
 * @param {number} value1 - First number to multiply
 * @param {number} value2 - Second number to multiply
 * @returns {number} The product of value1 and value2 with high precision
 */
export function times(value1, value2) {
  return NP.times(value1, value2);
}

/**
 * Divide two numbers with high precision
 * @param {number} value1 - First number (dividend)
 * @param {number} value2 - Second number (divisor)
 * @returns {number} The quotient of value1 divided by value2 with high precision
 */
export function div(value1, value2) {
  return NP.divide(value1, value2);
}

/**
 * Convert yuan to fen (1 yuan = 100 fen)
 * @param {number} value - The amount in yuan
 * @returns {number} The amount in fen
 */
export function toFen(value) {
  if (!value) {
    return 0;
  }
  return times(value, 100);
}
