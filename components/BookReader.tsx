"use client";

import { useEffect, useRef, useCallback } from "react";
import { bookPages } from "@/lib/book-data";
import Image from "next/image";

const N = bookPages.length;
const TOTAL_LEAVES = N + 1; // cover + pages

function renderChars(text: string) {
  const tokens = text.split(/(\s+)/);
  let idx = 0;
  return tokens.map((token, ti) => {
    if (!token.trim()) return <span key={`s${ti}`} style={{ whiteSpace: "pre" }}>{" "}</span>;
    return (
      <span key={`w${ti}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {token.split("").map((ch) => (
          <span key={idx} className="book-char" data-i={idx++}
            style={{ display: "inline-block", opacity: 0, transform: "translateY(12px)", filter: "blur(2px)" }}>
            {ch}
          </span>
        ))}
      </span>
    );
  });
}

export default function BookReader() {
  const coverRef = useRef<HTMLDivElement>(null);
  const leafRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closedRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const charCache = useRef<HTMLElement[][]>([]);
  const rafId = useRef(0);

  useEffect(() => {
    charCache.current = leafRefs.current.map((leaf) =>
      leaf ? Array.from(leaf.querySelectorAll<HTMLElement>(".book-char")) : []
    );
  }, []);

  const onScroll = useCallback(() => {
    const sy = window.scrollY;
    const vh = window.innerHeight;

    // Cover flip (full-width)
    const cp = Math.max(0, Math.min(1, sy / vh));
    if (coverRef.current) {
      coverRef.current.style.transform = `rotateY(${cp * -180}deg)`;
      coverRef.current.style.zIndex = cp < 0.5 ? "200" : "0";
    }
    if (closedRef.current) {
      closedRef.current.style.opacity = String(1 - Math.min(cp * 2, 1));
    }
    if (hintRef.current) hintRef.current.style.opacity = sy < vh * 0.08 ? "1" : "0";

    // Progress
    const total = TOTAL_LEAVES * vh;
    if (barRef.current) barRef.current.style.width = `${Math.min((sy / total) * 100, 100)}%`;
    const ci = Math.min(Math.floor(sy / vh), N);
    if (indRef.current) {
      indRef.current.textContent = ci === 0 ? "Bìa" : `${String(ci).padStart(2, "0")}/${String(N).padStart(2, "0")}`;
    }

    // Right-half page flips
    for (let i = 0; i < N; i++) {
      const start = (i + 1) * vh;
      const p = Math.max(0, Math.min(1, (sy - start) / vh));
      const leaf = leafRefs.current[i];
      if (leaf) {
        leaf.style.transform = `rotateY(${p * -180}deg)`;
        // z-index: flipping > flipped (later on top) > unflipped (earlier on top)
        if (p > 0 && p < 1) {
          leaf.style.zIndex = String(N + 50);
        } else if (p >= 1) {
          leaf.style.zIndex = String(i + 10); // later flipped = on top
        } else {
          leaf.style.zIndex = String(N - i + 10); // first unflipped = on top
        }
      }

      // Text reveal based on PREVIOUS leaf's flip
      const prevP = i === 0 ? cp : Math.max(0, Math.min(1, (sy - i * vh) / vh));
      const reveal = Math.max(0, Math.min(1, (prevP - 0.45) / 0.55));
      const chars = charCache.current[i];
      if (chars && chars.length > 0) {
        const count = reveal * (chars.length + 3);
        for (let c = 0; c < chars.length; c++) {
          const o = Math.max(0, Math.min(1, count - c));
          chars[c].style.opacity = String(o);
          chars[c].style.transform = o >= 1 ? "translateY(0)" : `translateY(${(1 - o) * 12}px)`;
          chars[c].style.filter = o >= 1 ? "blur(0px)" : `blur(${(1 - o) * 2}px)`;
        }
      }
    }
  }, []);

  useEffect(() => {
    const h = () => { cancelAnimationFrame(rafId.current); rafId.current = requestAnimationFrame(onScroll); };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => { window.removeEventListener("scroll", h); cancelAnimationFrame(rafId.current); };
  }, [onScroll]);

  useEffect(() => { bookPages.forEach((p) => { const i = new window.Image(); i.src = p.imageSrc; }); }, []);

  return (
    <div className="book-scroll-wrapper">
      <div className="book-scroll-spacer" style={{ height: `${(TOTAL_LEAVES + 1) * 100}vh` }} />

      <div className="book-viewport">
        <div className="book-progress-bar"><div ref={barRef} className="book-progress-fill" /></div>
        <div ref={indRef} className="book-page-indicator">Bìa</div>

        {/* 3D scene — all elements share the same 3D space */}
        <div className="book-scene">
          {/* LEFT PANEL: base image (page 0) — always behind everything */}
          <div className="book-left-panel">
            <Image src={bookPages[0].imageSrc} alt={bookPages[0].imageAlt}
              fill className="book-left-img" priority sizes="50vw" />
            <div ref={closedRef} className="book-left-closed" />
          </div>

          {/* RIGHT-HALF LEAVES: positioned at left:50%, width:50% */}
          {/* Each leaf: front = text, back = NEXT page image */}
          {bookPages.map((page, i) => (
            <div key={i} ref={(el) => { leafRefs.current[i] = el; }}
              className="book-right-leaf" style={{ zIndex: N - i + 10 }}>
              {/* Front: text with colored background */}
              <div className="book-right-front">
                <div className="book-right-content">
                  <span className="book-page-num">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="book-page-title">{renderChars(page.title)}</h2>
                </div>
              </div>
              {/* Back: NEXT page's image (or end page) */}
              <div className="book-right-back">
                {i < N - 1 ? (
                  <Image src={bookPages[i + 1].imageSrc} alt={bookPages[i + 1].imageAlt}
                    fill className="book-back-img" sizes="50vw" />
                ) : (
                  <div className="book-end-page">
                    <p className="book-end-text">Hết</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* SPINE: always visible on top */}
          <div className="book-spine" />

          {/* COVER: full-width, opens the book */}
          <div ref={coverRef} className="book-cover-leaf">
            <div className="book-cover-front">
              <div className="book-cover-bg" />
              <div className="book-cover-content">
                <div className="book-cover-line" />
                <div className="book-cover-title-wrap">
                  <div className="book-cover-title-row">
                    {"PHƯƠNG".split("").map((c, j) => <span key={j} className="book-cover-char">{c}</span>)}
                  </div>
                  <div className="book-cover-title-row">
                    {"AN".split("").map((c, j) => <span key={j} className="book-cover-char accent">{c}</span>)}
                  </div>
                </div>
                <div className="book-cover-line" />
                <p className="book-cover-subtitle">Graduation Photo Album</p>
                <p className="book-cover-year">Class of 2026</p>
              </div>
            </div>
            <div className="book-cover-back" />
          </div>
        </div>

        <div ref={hintRef} className="book-scroll-hint">
          <span className="book-scroll-hint-text">Cuộn để mở sách</span>
          <div className="book-scroll-hint-arrow">↓</div>
        </div>
      </div>
    </div>
  );
}
