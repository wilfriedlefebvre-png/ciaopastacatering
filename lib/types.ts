export type Category = "Appetizers" | "Salads" | "Pasta" | "Entrees" | "Desserts";

export type Size = "Full" | "Half" | "Each" | "Tray" | "Mini" | "Pint" | "NA";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  category: Category;
  price: number;
  unit?: string;      // e.g., "Full Tray 15 svgs", "Half", "Each"
  options?: { label: string; price: number }[]; // not used here, but handy
}

