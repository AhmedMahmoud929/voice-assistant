import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deepCompareArrays<T extends object>(arr1: T[], arr2: T[]): boolean {
  // Check if both are arrays and have the same length
  if (
    !Array.isArray(arr1) ||
    !Array.isArray(arr2) ||
    arr1.length !== arr2.length
  ) {
    return false;
  }

  // Sort arrays to ensure order doesn't matter (optional, if order matters, remove sorting)
  const sortedArr1 = [...arr1].sort((a, b) =>
    JSON.stringify(a).localeCompare(JSON.stringify(b))
  );
  const sortedArr2 = [...arr2].sort((a, b) =>
    JSON.stringify(a).localeCompare(JSON.stringify(b))
  );

  // Compare each object in the arrays
  return sortedArr1.every((obj, index) =>
    deepCompareObjects(obj, sortedArr2[index])
  );
}

// Helper function: Deeply compare two objects
function deepCompareObjects<T extends object>(obj1: T, obj2: T): boolean {
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return obj1 === obj2; // Compare primitive values
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepCompareObjects((obj1 as any)[key], (obj2 as any)[key]))
      return false;
  }

  return true;
}
