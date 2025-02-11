"use client";

import Banner from "@/components/Banner";
import PerformanceSection from "@/components/PerformanceSection";
import BoxOfficeSection from "@/components/BoxOfficeSection";
import EndSection from "@/components/EndSection";

export default function Home() {

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="min-h-screen">
      <Banner />
      <PerformanceSection />
      <BoxOfficeSection />
      <EndSection />
    </main>
  );
}
