/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Creates a debounced function that delays execution until after a specified delay.
 * @param callback - The function to debounce.
 * @param delay - The delay time in milliseconds.
 * @returns A debounced version of the callback function.
 */
export function debounce<T>(
  callback: (...args:T[])=> Promise<any>,
  delay: number
) {
  let timer: ReturnType<typeof setTimeout>;

  return (...args:T[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
}
