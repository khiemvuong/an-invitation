"use client";

import { useState } from "react";
import { FallingPetal } from "@/components/FloralElements";
import LoadingScreen from "@/components/LoadingScreen";
import BookReader from "@/components/BookReader";
import SmoothScroll from "@/components/SmoothScroll";
import { AmbientElements } from "@/components/AmbientEffects";

const PETAL_SIZES = [18, 22, 16, 24, 19, 21, 17, 23];

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {!showContent && <LoadingScreen onComplete={() => setShowContent(true)} />}

      {showContent && (
        <>
          <AmbientElements />
          <div className="petals-container">
            {Array.from({ length: 8 }).map((_, i) => (
              <FallingPetal key={i} size={PETAL_SIZES[i]} />
            ))}
          </div>
          <SmoothScroll />
          <BookReader />
        </>
      )}
    </>
  );
}
