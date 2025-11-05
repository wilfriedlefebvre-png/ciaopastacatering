"use client";

import { useCart } from "@/lib/store";
import { enforceLeadTime } from "@/lib/leadTime";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { addHours, formatISO } from "date-fns";
import FadeInSection from "@/components/FadeInSection";

export default function CheckoutPage() {
  const { lines, total, clear, gratuity, setGratuity } = useCart();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [when, setWhen] = useState<string>(() => formatISO(addHours(new Date(), 3)).slice(0,16)); // default now+3h (local)
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const ok = useMemo(() => {
    const dt = new Date(when);
    const hasLead = enforceLeadTime(dt);
    return lines.length > 0 && name && email && phone && hasLead;
  }, [lines, name, email, phone, when]);

  async function submit() {
    const dt = new Date(when);
    if (!enforceLeadTime(dt)) {
      setError("Please choose a time at least 2 hours from now.");
      return;
    }
    setError(null);
    setProcessing(true);
    try {
      // If Stripe vars exist, hit API to create Checkout.
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, notes, when: dt.toISOString(), lines })
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        // Demo mode (no Stripe). Show success then clear & go home.
        alert("Order received! We'll confirm by email.\n\nDemo mode (no payment).");
        clear();
        router.push("/success");
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
      console.error(e);
    } finally {
      setProcessing(false);
    }
  }

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

  function handleDownload() {
    const filename = prompt("Please enter a filename for your order (without extension):", `order-${new Date().toISOString().split('T')[0]}`);
    
    if (!filename) return; // User cancelled
    
    // Format the order data as text
    const orderData = [
      "CIAO PASTA CATERING - ORDER SUMMARY",
      "====================================",
      "",
      "Customer Information:",
      `  Name: ${name || "N/A"}`,
      `  Email: ${email || "N/A"}`,
      `  Phone: ${phone || "N/A"}`,
      `  Order Date/Time: ${when ? new Date(when).toLocaleString() : "N/A"}`,
      `  Notes: ${notes || "None"}`,
      "",
      "Order Items:",
      "------------",
      ...lines.map((l, idx) => [
        `${idx + 1}. ${l.item.name}`,
        `   Quantity: ${l.qty}`,
        `   Unit Price: $${l.item.price.toFixed(2)}`,
        `   Unit: ${l.item.unit || "N/A"}`,
        `   Subtotal: $${(l.item.price * l.qty).toFixed(2)}`,
        l.item.description ? `   Description: ${l.item.description}` : "",
        ""
      ].filter(Boolean).join("\n")),
      "",
      "Pricing Breakdown:",
      "------------------",
      `  Subtotal: $${subtotal.toFixed(2)}`,
      `  Tax (7.75%): $${tax.toFixed(2)}`,
      `  Gratuity: $${gratuity.toFixed(2)}`,
      `  Total: $${finalTotal.toFixed(2)}`,
      "",
      `Generated: ${new Date().toLocaleString()}`
    ].join("\n");

    // Create blob and download
    const blob = new Blob([orderData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <FadeInSection delay={0}>
        <div className="card">
          <h2 className="text-lg font-semibold">Your Details</h2>
        <div className="mt-3 space-y-3">
          <div>
            <div className="label">Full Name</div>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div>
            <div className="label">Email</div>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <div className="label">Phone</div>
            <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} />
          </div>
          <div>
            <div className="label">When do you want your order?</div>
            <input
              className="input"
              type="datetime-local"
              value={when}
              onChange={e=>setWhen(e.target.value)}
              min={formatISO(addHours(new Date(), 2)).slice(0,16)}
            />
            <div className="text-xs text-gray-500 mt-1">Must be at least 2 hours from now.</div>
          </div>
          <div>
            <div className="label">Notes (optional)</div>
            <textarea className="input" rows={3} value={notes} onChange={e=>setNotes(e.target.value)} />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
        </div>
      </FadeInSection>

      <FadeInSection delay={100}>
        <div className="card">
          <h2 className="text-lg font-semibold">Review & Pay</h2>
        <div className="mt-3 space-y-2">
          {lines.map(l => (
            <div key={l.item.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{l.item.name}</div>
                {l.item.unit && <div className="text-xs text-gray-500">{l.item.unit}</div>}
              </div>
              <div className="text-right">
                <div className="text-sm">{l.qty} × ${l.item.price.toFixed(2)}</div>
                <div className="font-medium">${(l.item.price*l.qty).toFixed(2)}</div>
              </div>
            </div>
          ))}
          {lines.length === 0 && <div className="text-sm text-gray-600">Cart is empty.</div>}

          <div className="border-t pt-3 mt-3 space-y-2">
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
            <div className="pt-2 space-y-1">
              <div className="text-xs text-gray-600 mb-1">Suggested gratuity:</div>
              {suggestedGratuities.map((suggestion) => {
                const suggestedAmount = totalBeforeGratuity * suggestion.percent;
                return (
                  <button
                    key={suggestion.label}
                    onClick={() => setGratuity(suggestedAmount)}
                    className="w-full text-left text-xs text-gray-700 hover:text-gray-900 py-1 px-2 rounded hover:bg-gray-50"
                  >
                    {suggestion.label}: ${suggestedAmount.toFixed(2)}
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-gray-500 mt-1">Payment collected now (Stripe) or at pickup/delivery (demo).</div>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleDownload}
              disabled={lines.length === 0}
              className={`btn-ghost flex-1 ${lines.length === 0 ? "opacity-50 pointer-events-none" : ""}`}
            >
              Download Order
            </button>
            <button
              disabled={!ok || processing}
              onClick={submit}
              className={`btn-primary flex-1 ${(!ok||processing)?"opacity-50 pointer-events-none":""}`}
            >
              {processing ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
        </div>
      </FadeInSection>
    </div>
  );
}

