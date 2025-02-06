"use client";

import Banner from "@/components/Banner";
import PerformanceSection from "@/components/PerformanceSection";
import BoxOffice from "@/components/BoxOffice";

export default function Home() {

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="min-h-screen">
      <Banner />
      <BoxOffice date={today} />
      <PerformanceSection />
    </main>
  );
}
