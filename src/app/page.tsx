"use client";

import Banner from "@/components/Banner";
import PerformanceSection from "@/components/PerformanceSection";
import BoxOfficeSection from "@/components/BoxOfficeSection";
import EndSection from "@/components/EndSection";

export default function Home() {

  return (
    <main className="min-h-screen">
      <Banner />
      <PerformanceSection />
      <BoxOfficeSection />
      <EndSection />
    </main>
  );
}
