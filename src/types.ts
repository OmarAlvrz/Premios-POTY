export interface Category {
  id: string;
  name: string;
  options: {
    name: string;
    image?: string; // Imagen opcional
  }[];
  videoLinks?: Record<string, string>;
}