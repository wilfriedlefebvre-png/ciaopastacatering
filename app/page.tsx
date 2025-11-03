"use client";

import { useState } from "react";
import CategoryTabs from "@/components/CategoryTabs";
import MenuGrid from "@/components/MenuGrid";
import CartDrawer from "@/components/CartDrawer";
import type { Category } from "@/lib/types";

export default function Home() {
  const [category, setCategory] = useState<Category>("Appetizers");

  return (
    <>
      <CategoryTabs onChange={setCategory} />
      <div className="mt-6">
        <MenuGrid category={category} />
      </div>
      <CartDrawer />
    </>
  );
}

