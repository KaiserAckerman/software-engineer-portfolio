import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Función utilitaria para combinar clases de Tailwind CSS
 * Combina clsx y tailwind-merge para manejar clases condicionales y conflictos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



