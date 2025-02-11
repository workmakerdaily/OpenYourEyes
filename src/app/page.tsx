"use client";

import Banner from "@/components/Banner";
import PerformanceSection from "@/components/PerformanceSection";
import BoxOfficeSection from "@/components/BoxOfficeSection";
import EndSection from "@/components/EndSection";

// component: 홈 페이지 //
export default function Home() {

  // render: 홈 페이지 렌더링 //
  return (
    <main className="min-h-screen">
      <Banner />
      <PerformanceSection />
      <BoxOfficeSection />
      <EndSection />
    </main>
  );
}
