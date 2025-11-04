"use client";

import { useState } from "react";
import CategoryTabs from "@/components/CategoryTabs";
import MenuGrid from "@/components/MenuGrid";
import CartDrawer from "@/components/CartDrawer";
import FadeInSection from "@/components/FadeInSection";
import type { Category } from "@/lib/types";

type MenuType = "catering" | "family-to-go";

export default function Home() {
  const [menuType, setMenuType] = useState<MenuType>("catering");
  const [category, setCategory] = useState<Category>("Appetizers");

  const handleMenuTypeChange = (newMenuType: MenuType) => {
    setMenuType(newMenuType);
    if (newMenuType === "family-to-go") {
      setCategory("Salads");
    } else {
      setCategory("Appetizers");
    }
  };

  return (
    <>
      <FadeInSection delay={0}>
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => handleMenuTypeChange("catering")}
              className={`btn ${menuType === "catering" ? "btn-primary" : "btn-ghost"}`}
            >
              Catering
            </button>
            <button
              onClick={() => handleMenuTypeChange("family-to-go")}
              className={`btn ${menuType === "family-to-go" ? "btn-primary" : "btn-ghost"}`}
            >
              Family To Go Menu
            </button>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection delay={100}>
        <CategoryTabs onChange={setCategory} menuType={menuType} defaultCategory={category} />
      </FadeInSection>
      <FadeInSection delay={200}>
        <div className="mt-6">
          <MenuGrid category={category} menuType={menuType} />
        </div>
      </FadeInSection>
      <CartDrawer />
    </>
  );
}

