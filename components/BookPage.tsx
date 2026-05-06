"use client";

import Image from "next/image";
import { PageData } from "@/lib/book-data";

interface BookPageProps {
  data: PageData;
  pageNumber: number;
}

export default function BookPage({ data, pageNumber }: BookPageProps) {
  // Render title as individual character spans for scroll-linked reveal
  function renderChars(text: string) {
    const tokens = text.split(/(\s+)/);
    let charIdx = 0;

    return tokens.map((token, tIdx) => {
      if (token.trim() === "") {
        return (
          <span key={`s-${tIdx}`} style={{ whiteSpace: "pre" }}>
            {" "}
          </span>
        );
      }
      const chars = token.split("");
      return (
        <span
          key={`w-${tIdx}`}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {chars.map((ch) => {
            const idx = charIdx++;
            return (
              <span
                key={idx}
                className="book-char"
                style={{
                  display: "inline-block",
                  opacity: 0,
                  transform: "translateY(15px)",
                  filter: "blur(3px)",
                  willChange: "opacity, transform, filter",
                }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      );
    });
  }

  return (
    <div
      className="book-page"
      style={{
        flexDirection: data.imageOnRight ? "row" : "row-reverse",
      }}
    >
      {/* Background texture */}
      <div className="book-page-bg" />

      {/* Image side */}
      <div className="book-page-image">
        <div className="book-page-image-inner">
          <Image
            src={data.imageSrc}
            alt={data.imageAlt}
            width={800}
            height={600}
            className="book-image"
            priority={pageNumber <= 2}
          />
        </div>
        <div className="book-page-frame" />
      </div>

      {/* Spine divider */}
      <div className="book-spine-divider" />

      {/* Text side */}
      <div className="book-page-content">
        <div className="book-page-text">
          <h2 className="book-page-title">{renderChars(data.title)}</h2>
        </div>
      </div>

      {/* Page number */}
      <span className="book-page-number">
        {String(pageNumber + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
