import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, when, lines } = body || {};

  // If Stripe env not configured, run in demo mode
  const secret = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secret || !priceId) {
    // In a real app you'd persist order to DB here.
    return NextResponse.json({ ok: true, url: null });
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  // Build line items as one "custom amount" with metadata OR map to real Stripe prices.
  // Here: single priceId * quantity = 1 with amount = subtotal via adjustable quantity is not ideal.
  // Simpler demo: we sum the subtotal and pass as a one-off price using "payment link" style via Checkout's metadata.
  const subtotal = lines.reduce((sum: number, l: any) => sum + l.item.price * l.qty, 0);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: Math.max(1, Math.round(subtotal)) }],
    customer_email: email,
    success_url: process.env.STRIPE_SUCCESS_URL!,
    cancel_url: process.env.STRIPE_CANCEL_URL!,
    metadata: {
      name, phone, when,
      items: JSON.stringify(lines.map((l: any) => ({ id: l.item.id, name: l.item.name, qty: l.qty, price: l.item.price })))
    }
  });

  return NextResponse.json({ url: session.url });
}

