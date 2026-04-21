/**
 * Returns true if an array of strings is sorted A to Z
 */
export function isSortedAsc(arr: string[]): boolean {
  return arr.every((val, i) => i === 0 || val >= arr[i - 1]);
}

/**
 * Returns true if an array of strings is sorted Z to A
 */
export function isSortedDesc(arr: string[]): boolean {
  return arr.every((val, i) => i === 0 || val <= arr[i - 1]);
}

/**
 * Returns true if an array of numbers is sorted low to high
 */
export function isSortedNumericAsc(arr: number[]): boolean {
  return arr.every((val, i) => i === 0 || val >= arr[i - 1]);
}

/**
 * Returns true if an array of numbers is sorted high to low
 */
export function isSortedNumericDesc(arr: number[]): boolean {
  return arr.every((val, i) => i === 0 || val <= arr[i - 1]);
}
