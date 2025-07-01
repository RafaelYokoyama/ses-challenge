import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getUserInitials(name: string): string {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')
}


export const extractUserIdFromPath = (pathname: string): string | null => {
  const match = pathname.match(/\/user\/id\/([^/]+)/)
  return match?.[1] ?? null
}