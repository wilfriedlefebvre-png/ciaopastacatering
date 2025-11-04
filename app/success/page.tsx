"use client";

import FadeInSection from "@/components/FadeInSection";

export default function SuccessPage() {
  return (
    <FadeInSection>
      <div className="card">
        <h1 className="text-xl font-semibold">Thank you!</h1>
        <p className="mt-2 text-gray-700">
          Your catering order was received. We'll confirm by email with pickup/delivery details.
        </p>
      </div>
    </FadeInSection>
  );
}

