import type { MenuItem } from "@/lib/types";

export const MENU: MenuItem[] = [
  // Appetizers
  {
    id: "app-1",
    name: "ANTIPASTO MISTO",
    description: "Assorted appetizers (vegetable grill, prosciutto, caprese, olives, cheese, etc.)",
    category: "Appetizers",
    price: 75.00,
    unit: "Full Tray 15 Svgs"
  },
  {
    id: "app-2",
    name: "BURRATA CAPRESE PROSCIUTTO",
    description: "Italian Imported Burrata, Tomatoes, Prosciutto, Extra Virgin Olive Oil",
    category: "Appetizers",
    price: 85.00,
    unit: "Full Tray"
  },
  {
    id: "app-3",
    name: "GRIGLIATA VEGETALI MISTI",
    description: "Mixed grill vegetables",
    category: "Appetizers",
    price: 65.00,
    unit: "Full Tray"
  },
  {
    id: "app-4",
    name: "GAMBERI E PANCETTA",
    description: "Grilled Jumbo shrimp wrapped with Pancetta (Italian bacon), served with mixed greens and topped with a light herb sauce",
    category: "Appetizers",
    price: 42.50,
    unit: "Each"
  },
  {
    id: "app-5",
    name: "PANE ALL' AGLIO",
    description: "Garlic bread",
    category: "Appetizers",
    price: 35.00,
    unit: "Full Tray"
  },
  {
    id: "app-6",
    name: "SIDE MEATBALLS",
    description: "Approximately 20 large meatballs",
    category: "Appetizers",
    price: 65.00,
    unit: "Full Tray"
  },
  {
    id: "app-7",
    name: "SIDE SAUSAGES",
    description: "Approximately 15 sausages",
    category: "Appetizers",
    price: 65.00,
    unit: "Full Tray"
  },
  {
    id: "app-8",
    name: "Tapenade",
    description: "1 Pint of our homemade Tapenade",
    category: "Appetizers",
    price: 18.00,
    unit: "1 Pint"
  },
  
  // Salads
  {
    id: "salad-1",
    name: "INSALATA DELLA CASA",
    description: "Romaine, mixed greens, tomatoes, crumbed blue cheese, house vinaigrette",
    category: "Salads",
    price: 60.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "salad-2",
    name: "CAESAR SALAD",
    description: "Romaine lettuce tossed with croutons, parmesan cheese and Caesar dressing",
    category: "Salads",
    price: 65.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "salad-3",
    name: "INSALATA SPIRITOSA",
    description: "Mixed greens, Walnuts, Dried Cranberries, Goat Cheese, Strawberries + Strawberry Vinaigrette",
    category: "Salads",
    price: 75.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "salad-4",
    name: "ADD CHICKEN TO SALAD",
    description: "Add chicken to any salad",
    category: "Salads",
    price: 25.00,
    unit: "Add-on"
  },
  
  // Pasta
  {
    id: "pasta-1",
    name: "CIAO PASTA",
    description: "Bowtie pasta sauteed with chicken, onions, garlic and mushrooms in a light tomato cream sauce",
    category: "Pasta",
    price: 159.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-2",
    name: "FARFALLE CARBONARA",
    description: "Farfalle with pancetta (Italian bacon), light cream sauce, egg yolk, Parmesan cheese",
    category: "Pasta",
    price: 159.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-3",
    name: "FARFALLE CARCIOFI",
    description: "Bowties pasta with artichoke hearts sauteed in garlic and creamy white wine sauce",
    category: "Pasta",
    price: 159.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-4",
    name: "RIGATONI CHECCA",
    description: "Tube-shaped pasta sauteed with garlic, olive oil, fresh chopped tomato, basil and a touch of tomato sauce",
    category: "Pasta",
    price: 159.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-5",
    name: "FARFALLE MARINARA",
    description: "Butterfly-shaped pasta sauteed with fresh tomato and basil sauce",
    category: "Pasta",
    price: 149.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-6",
    name: "FARFALLA ALFREDO",
    description: "With cream sauce and Parmesan cheese",
    category: "Pasta",
    price: 149.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-7",
    name: "RIGATONI PINO",
    description: "Tube-shaped pasta sauteed with chicken, mushrooms and Alfredo sauce",
    category: "Pasta",
    price: 159.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-8",
    name: "VEGETARIAN LASAGNA",
    description: "Homemade lasagna, fresh garden vegetables, ricotta, mozzarella and grated pecorino cheese",
    category: "Pasta",
    price: 159.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-9",
    name: "LASAGNA",
    description: "Homemade lasagna, meat sauce, ricotta, mozzarella and Parmesan cheese",
    category: "Pasta",
    price: 159.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-10",
    name: "RIGATONI BOLOGNESE",
    description: "Tube-shaped pasta sauteed with a tomato meat sauce",
    category: "Pasta",
    price: 159.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-11",
    name: "RAVIOLI AL FORMAGGIO",
    description: "Cheese ravioli with marinara sauce and basil",
    category: "Pasta",
    price: 159.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-12",
    name: "RIGATONI VODKA",
    description: "Tube pasta, vodka tomato cream sauce, shallots, and parmesan cheese",
    category: "Pasta",
    price: 149.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-13",
    name: "RAVIOLI PORTOBELLO",
    description: "Portobello Ravioli, Shallots, Artichokes, Sundried Tomatoes, Light Cream",
    category: "Pasta",
    price: 169.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  {
    id: "pasta-14",
    name: "RIGATONI SALSICCIA FUNGHI",
    description: "Tube pasta, crumbled Italian sausage, shallots, mix mushrooms, cream sauce",
    category: "Pasta",
    price: 159.00,
    unit: "Full Tray 15 to 20 Svgs / Half Tray 8 to 10 Svgs"
  },
  
  // Entrees
  {
    id: "entree-1",
    name: "POLLO ALLA PARMIGIANA",
    description: "Breaded breast of chicken with tomato sauce and mozzarella melted on top",
    category: "Entrees",
    price: 165.00,
    unit: "Full Tray 20 / Half Tray 10"
  },
  {
    id: "entree-2",
    name: "POLLO PICCATA",
    description: "Breast of chicken sauteed, with lemon sauce and capers",
    category: "Entrees",
    price: 165.00,
    unit: "Full Tray 20 / Half Tray 10"
  },
  {
    id: "entree-3",
    name: "POLLO AL MARSALA",
    description: "Sauteed chicken breast with mushrooms, Marsala wine and a touch of cream",
    category: "Entrees",
    price: 165.00,
    unit: "Full Tray 20 / Half Tray 10"
  },
  {
    id: "entree-4",
    name: "SHORT RIBS",
    description: "Slow Cooked Short Ribs, San Marzano Tomato Sauce + Red Wine Reduction",
    category: "Entrees",
    price: 200.00,
    unit: "Full tray 20 pieces / Half tray 10 pieces"
  },
  {
    id: "entree-5",
    name: "SALMONE PORCINI",
    description: "Wild caught salmon, porcini mushroom sauce, sundried tomatoes",
    category: "Entrees",
    price: 240.00,
    unit: "Full Tray / Half Tray"
  },
  
  // Desserts
  {
    id: "dessert-1",
    name: "Tirami Su",
    description: "Homemade Tirami Su",
    category: "Desserts",
    price: 65.00,
    unit: "12/15 servings"
  },
  {
    id: "dessert-2",
    name: "Cannoli",
    description: "Homemade Cannoli filled with ricotta cheese and mini chocolate chips",
    category: "Desserts",
    price: 65.00,
    unit: "30 mini cannoli"
  }
];
