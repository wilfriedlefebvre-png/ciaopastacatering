"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/lib/store";
import Link from "next/link";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { lines, inc, dec, remove, clear, total, gratuity, setGratuity } = useCart();

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = total();
  const taxRate = 0.0775; // 7.75%
  const tax = subtotal * taxRate;
  const totalBeforeGratuity = subtotal + tax;
  const finalTotal = totalBeforeGratuity + gratuity;
  
  const suggestedGratuities = [
    { label: "18%", percent: 0.18 },
    { label: "20%", percent: 0.20 },
    { label: "22%", percent: 0.22 }
  ];

  return (
    <>
      <button className="fixed bottom-4 right-4 btn-primary shadow-xl" onClick={() => setOpen(true)}>
        Cart • {count} • ${finalTotal.toFixed(2)}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)}>
          <aside className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button className="btn-ghost" onClick={() => setOpen(false)}>Close</button>
            </div>
            <div className="space-y-3">
              {lines.length === 0 && <div className="text-sm text-gray-600">Your cart is empty.</div>}
              {lines.map(l => (
                <div key={l.item.id} className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{l.item.name}</div>
                    {l.item.unit && <div className="text-xs text-gray-500">{l.item.unit}</div>}
                    <div className="text-sm mt-1">${l.item.price.toFixed(2)} ea</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <button className="btn-ghost" onClick={() => dec(l.item.id)}>-</button>
                      <div className="w-6 text-center">{l.qty}</div>
                      <button className="btn-ghost" onClick={() => inc(l.item.id)}>+</button>
                    </div>
                    <div className="mt-1 text-sm">${(l.item.price * l.qty).toFixed(2)}</div>
                    <button className="text-xs text-red-600 mt-1" onClick={() => remove(l.item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>Subtotal</div>
                  <div>${subtotal.toFixed(2)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Tax (7.75%)</div>
                  <div>${tax.toFixed(2)}</div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div>Gratuity</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={gratuity || ""}
                      onChange={(e) => setGratuity(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-20 text-right input text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="font-semibold">Total</div>
                  <div className="font-semibold">${finalTotal.toFixed(2)}</div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="btn-ghost" onClick={clear}>Clear</button>
                <Link href="/checkout" className={`btn-primary ${lines.length === 0 ? "pointer-events-none opacity-50" : ""}`}>
                  Checkout
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

