import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Resize and image to a target width while maintaining the aspect ratio
export const resizeImage = async (width: number, height: number, targetWidth: number) => {
  const aspectRatio: number = await getAspectRatio(width, height);
  return {
    aspectRatio,
    width: targetWidth,
    height: targetWidth * aspectRatio,
    isLandscape: isLandscape(width, height),
    isPortrait: isPortrait(width, height),
    isSquare: isSquare(width, height),
  }
}

export const getAspectRatio = (width: number, height: number) => {
  const aspectRatio = width / height;
  return aspectRatio;
}

export const isLandscape = (width: number, height: number) => {
  const aspectRatio = width / height;
  return aspectRatio > 1;
}

export const isPortrait = (width: number, height: number) => {
  const aspectRatio = width / height;
  return aspectRatio < 1;
}

export const isSquare = async (width: number, height: number) => {
  const aspectRatio = width / height;
  return aspectRatio === 1;
}