"use client";

import { useEffect, useRef, useCallback } from "react";
import { bookPages } from "@/lib/book-data";
import Image from "next/image";
import { Smartphone } from "lucide-react";
import { FlowerBlossom, CherryBlossom, CornerDecoration, FloralBranch } from "@/components/FloralElements";

const N = bookPages.length;
const TOTAL_LEAVES = N + 1; // Leaf 0 (Cover) + Leaf 1..N (Content pages)

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
  const leafRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
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

    // Progress bar
    const totalScroll = TOTAL_LEAVES * vh;
    if (barRef.current) barRef.current.style.width = `${Math.min((sy / totalScroll) * 100, 100)}%`;
    

    if (hintRef.current) hintRef.current.style.opacity = sy < vh * 0.08 ? "1" : "0";

    // Process each leaf (from 0 to N)
    for (let i = 0; i <= N; i++) {
      const start = i * vh; 
      const p = Math.max(0, Math.min(1, (sy - start) / vh));
      const leaf = leafRefs.current[i];
      
      if (leaf) {
        leaf.style.transform = `rotateY(${p * -180}deg)`;
        
        // Z-index logic for physically stacking 3D pages
        if (p > 0 && p < 1) {
          leaf.style.zIndex = String(TOTAL_LEAVES + 50); // Flipping -> highest priority
        } else if (p >= 1) {
          leaf.style.zIndex = String(i + 10); // Flipped (on left) -> later pages are on top
        } else {
          leaf.style.zIndex = String(TOTAL_LEAVES - i + 10); // Unflipped (on right) -> earlier pages are on top
        }
      }

      // Text reveal logic: Text is on the FRONT of leaf i.
      // Reveal it as the PREVIOUS leaf (i-1) is flipped.
      // For leaf 0 (Cover), it's always fully visible.
      if (i > 0) {
        const prevP = Math.max(0, Math.min(1, (sy - (i - 1) * vh) / vh));
        const reveal = Math.max(0, Math.min(1, (prevP - 0.3) / 0.7)); 
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
    <>
      <div className="portrait-blocker">
        <div className="portrait-blocker-content">
          <div className="portrait-blocker-icon"><Smartphone/></div>
          <h2>Vui lòng xoay ngang màn hình</h2>
          <p>Để có trải nghiệm xem album tốt nhất, hãy xoay ngang điện thoại của bạn nhé!</p>
        </div>
      </div>

      <div className="book-scroll-wrapper">
        <div className="book-scroll-spacer" style={{ height: `${(TOTAL_LEAVES + 1) * 100}vh` }} />

        <div className="book-viewport">
          <div className="book-progress-bar"><div ref={barRef} className="book-progress-fill" /></div>

          {/* ── 3D BOOK CONTAINER ── */}
          <div className="book-scene">
            
            {/* Base hardcover (lies flat to simulate an open album) */}
            <div className="book-base" />
            <div className="book-spine" />

            {/* All leaves are placed on the right side and flip to the left */}
            {Array.from({ length: TOTAL_LEAVES }).map((_, i) => {
              const isCover = i === 0;
              const isLast = i === N;
              
              return (
                <div key={i} ref={(el) => { leafRefs.current[i] = el; }} className="book-right-leaf">
                  
                  {/* ── FRONT FACE (Text or Cover) ── */}
                  <div className={`book-right-front ${isCover ? 'book-cover-front' : ''}`}>
                    {isCover ? (
                      <div className="book-cover-bg-wrap">
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
                        </div>
                      </div>
                    ) : (
                    <div className="book-page-bg">
                      <div className="book-right-content">
                        <span className="book-page-num">{String(i).padStart(2, "0")}</span>
                        <h2 className="book-page-title">{renderChars(bookPages[i - 1].title)}</h2>
                      </div>
                      <div className="book-sticker sticker-tr" style={{ opacity: 0.6 }}><FlowerBlossom size={100} color="#ffb6c1" /></div>
                      <div className="book-sticker sticker-bl" style={{ opacity: 0.5 }}><CherryBlossom size={120} color="#ff69b4" /></div>
                    </div>
                  )}
                </div>
                
                {/* ── BACK FACE (Next Image or End) ── */}
                <div className={`book-right-back ${isLast ? 'book-cover-front' : ''}`}>
                  {!isLast ? (
                    <div className="book-page-bg">
                      <div className="book-photo-frame style-2">
                        <div className="book-photo-inner">
                          <Image 
                            src={bookPages[i].imageSrc} 
                            alt={bookPages[i].imageAlt} 
                            fill 
                            className="book-photo" 
                            priority={i <= 1}
                            sizes="(max-width: 1200px) 50vw, 600px" 
                          />
                        </div>
                      </div>
                      <div className="book-sticker sticker-tl" style={{ opacity: 0.7 }}><CornerDecoration size={140} /></div>
                      <div className="book-sticker sticker-br" style={{ opacity: 0.4 }}><FloralBranch width={180} height={180} /></div>
                    </div>
                  ) : (
                    <div className="book-cover-bg-wrap" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="book-cover-bg" />
                      <div className="book-cover-content">
                        <div className="book-cover-line" />
                        <div className="book-cover-title-wrap">
                          <div className="book-cover-title-row">
                            {"HẾT".split("").map((c, j) => <span key={j} className="book-cover-char">{c}</span>)}
                          </div>
                        </div>
                        <div className="book-cover-line" />
                        <p className="book-cover-subtitle" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                          Cảm ơn bạn đã xem
                        </p>
                        <div className="book-sticker sticker-tr" style={{ right: '15%', top: '15%', opacity: 0.6 }}><FlowerBlossom size={80} color="#ff69b4" /></div>
                        <div className="book-sticker sticker-bl" style={{ left: '15%', bottom: '15%', opacity: 0.6 }}><CherryBlossom size={100} color="#ffb6c1" /></div>
                      </div>
                    </div>
                  )}
                </div>
                
              </div>
            );
          })}
        </div>

        <div ref={hintRef} className="book-scroll-hint">
          <span className="book-scroll-hint-text">Cuộn để lật trang</span>
          <div className="book-scroll-hint-arrow">↓</div>
        </div>
      </div>
    </div>
    </>
  );
}
