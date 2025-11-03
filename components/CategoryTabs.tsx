"use client";

import { useState } from "react";

import type { Category } from "@/lib/types";

const categories: Category[] = ["Appetizers", "Salads", "Pasta", "Entrees", "Desserts"];

export default function CategoryTabs({ onChange }: { onChange: (c: Category)=>void }) {
  const [active, setActive] = useState<Category>("Appetizers");
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map(c => (
        <button
          key={c}
          onClick={() => { setActive(c); onChange(c); }}
          className={`btn ${active===c ? "btn-primary" : "btn-ghost"}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

