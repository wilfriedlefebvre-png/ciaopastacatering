"use client";

import { useState, useEffect } from "react";

import type { Category } from "@/lib/types";

const allCategories: Category[] = ["Appetizers", "Salads", "Pasta", "Entrees", "Desserts"];
const familyToGoCategories: Category[] = ["Salads", "Pasta", "Entrees"];

type MenuType = "catering" | "family-to-go";

export default function CategoryTabs({ onChange, menuType = "catering", defaultCategory }: { onChange: (c: Category)=>void; menuType?: MenuType; defaultCategory?: Category }) {
  const categories = menuType === "family-to-go" ? familyToGoCategories : allCategories;
  const [active, setActive] = useState<Category>(defaultCategory || categories[0]);

  useEffect(() => {
    if (defaultCategory && categories.includes(defaultCategory)) {
      setActive(defaultCategory);
    } else {
      setActive(categories[0]);
      onChange(categories[0]);
    }
  }, [menuType, defaultCategory, categories, onChange]);

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

