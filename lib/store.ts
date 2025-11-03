import { create } from "zustand";

import { MenuItem } from "./types";

type CartLine = { item: MenuItem; qty: number; };

interface CartState {
  lines: CartLine[];
  lockedCategory: MenuItem["category"] | null;
  gratuity: number;
  add(item: MenuItem, quantity?: number): void;
  inc(id: string): void;
  dec(id: string): void;
  remove(id: string): void;
  setGratuity(amount: number): void;
  clear(): void;
  total(): number;
}

export const useCart = create<CartState>((set, get) => ({
  lines: [],
  lockedCategory: null,
  gratuity: 0,
  add: (item, quantity = 1) => set(s => {
    const found = s.lines.find(l => l.item.id === item.id);
    const locked = s.lockedCategory ?? item.category;
    const qty = Math.max(1, quantity);
    return {
      lockedCategory: locked,
      lines: found ? s.lines.map(l => l.item.id === item.id ? { ...l, qty: l.qty + qty } : l)
                   : [...s.lines, { item, qty }]
    };
  }),
  inc: (id) => set(s => ({ lines: s.lines.map(l => l.item.id === id ? { ...l, qty: l.qty + 1 } : l) })),
  dec: (id) => set(s => {
    const lines = s.lines.map(l => l.item.id === id ? { ...l, qty: l.qty - 1 } : l).filter(l => l.qty > 0);
    return { lines, lockedCategory: lines.length ? s.lockedCategory : null };
  }),
  remove: (id) => set(s => {
    const lines = s.lines.filter(l => l.item.id !== id);
    return { lines, lockedCategory: lines.length ? s.lockedCategory : null };
  }),
  setGratuity: (amount) => set({ gratuity: Math.max(0, amount) }),
  clear: () => set({ lines: [], lockedCategory: null, gratuity: 0 }),
  total: () => get().lines.reduce((sum, l) => sum + l.item.price * l.qty, 0)
}));

