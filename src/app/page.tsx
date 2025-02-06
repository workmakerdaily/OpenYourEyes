"use client";

import Banner from "@/components/Banner";
import PerformanceSection from "@/components/PerformanceSection";
import BoxOfficeSection from "@/components/BoxOfficeSection";

export default function Home() {

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="min-h-screen">
      <Banner />
      <BoxOfficeSection date={today} />
      <PerformanceSection />
    </main>
  );
}
