"use client";

import { MENU } from "@/data/menu";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/store";
import type { Category, MenuItem } from "@/lib/types";
import { SINGLE_CATEGORY_ONLY } from "@/lib/config";

export default function MenuGrid({ category }: { category: Category }) {
  const add = useCart(s => s.add);
  const lockedCategory = useCart(s => s.lockedCategory);

  const filtered = useMemo(
    () => MENU.filter(m => m.category === category),
    [category]
  );

  const locked = SINGLE_CATEGORY_ONLY && lockedCategory && lockedCategory !== category;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {filtered.map(item => (
        <MenuItemCard key={item.id} item={item} locked={locked} onAdd={add} />
      ))}
      {locked && (
        <div className="sm:col-span-2 text-center text-sm text-amber-700">
          Cart locked to <b>{lockedCategory}</b>. Clear cart to switch categories.
        </div>
      )}
    </div>
  );
}

function MenuItemCard({ item, locked, onAdd }: { item: MenuItem; locked: boolean; onAdd: (item: MenuItem, qty?: number) => void }) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (quantity > 0) {
      onAdd(item, quantity);
      setQuantity(1); // Reset to 1 after adding
    }
  };

  return (
    <div className={`card ${locked ? "opacity-40 pointer-events-none" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{item.name}</div>
          {item.description && <div className="text-sm text-gray-600 mt-1">{item.description}</div>}
          {item.unit && <div className="badge mt-2">{item.unit}</div>}
        </div>
        <div className="text-right">
          <div className="font-semibold">${item.price.toFixed(2)}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            className="btn-ghost"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={locked}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center input"
            disabled={locked}
          />
          <button
            className="btn-ghost"
            onClick={() => setQuantity(quantity + 1)}
            disabled={locked}
          >
            +
          </button>
        </div>
        <button
          className="btn-primary flex-1"
          onClick={handleAdd}
          disabled={locked}
        >
          Add
        </button>
      </div>
    </div>
  );
}

