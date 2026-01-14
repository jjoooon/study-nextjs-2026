import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for merging Tailwind CSS classes
 *
 * Combines clsx and tailwind-merge to intelligently merge Tailwind classes
 * without conflicts. Later classes override earlier ones when there are conflicts.
 *
 * @param inputs - Class values to merge (strings, objects, arrays)
 * @returns Merged class string
 *
 * @example
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4' (px-4 overrides px-2)
 *
 * @see https://clarity.sh/blog/tailwind-merge for more details
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
