/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const scrollToCard = (i: number) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll<HTMLDivElement>(".gallery-card");
    const card = cards[i];
    if (card) {
      trackRef.current.scrollTo({ left: card.offsetLeft - 60, behavior: "smooth" });
    }
  };

  const openModal = (src: string) => {
    setModalImgSrc(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpen]);

  useEffect(() => {
    // Cursor
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx - 4 + "px";
        cursorRef.current.style.top = my - 4 + "px";
      }
    };
    
    let animationFrameId: number;
    const animRing = () => {
      rx += (mx - rx - 18) * 0.12;
      ry += (my - ry - 18) * 0.12;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = rx + "px";
        cursorRingRef.current.style.top = ry + "px";
      }
      animationFrameId = requestAnimationFrame(animRing);
    };
    
    document.addEventListener("mousemove", onMouseMove);
    animRing();

    // Hover effect
    const hoverElements = document.querySelectorAll("a,button,.gallery-card");
    const onMouseEnter = () => { if (cursorRingRef.current) cursorRingRef.current.style.transform = "scale(1.6)"; };
    const onMouseLeave = () => { if (cursorRingRef.current) cursorRingRef.current.style.transform = "scale(1)"; };
    hoverElements.forEach(el => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    // Progress bar and Nav scroll
    const onScroll = () => {
      if (progressBarRef.current) {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBarRef.current.style.width = pct + "%";
      }
      if (navRef.current) {
        navRef.current.classList.toggle("scrolled", window.scrollY > 80);
      }
      if (parallaxBgRef.current) {
        const featuredEl = document.getElementById("featured");
        if (featuredEl) {
          const rect = featuredEl.getBoundingClientRect();
          const offset = rect.top / window.innerHeight;
          parallaxBgRef.current.style.transform = `translateY(${offset * 30}%)`;
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    // Intersection Observer reveals
    const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));

    // Gallery active dot
    const trackNode = trackRef.current;
    const onTrackScroll = () => {
      if (!trackNode) return;
      const cards = trackNode.querySelectorAll(".gallery-card");
      let closest = 0, minDist = Infinity;
      cards.forEach((c, i) => {
        const dist = Math.abs(c.getBoundingClientRect().left - window.innerWidth / 2);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveDot(closest);
    };
    if (trackNode) {
      trackNode.addEventListener("scroll", onTrackScroll);
    }

    // Modal keydown
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      hoverElements.forEach(el => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
      window.removeEventListener("scroll", onScroll);
      revealEls.forEach(el => observer.unobserve(el));
      if (trackNode) trackNode.removeEventListener("scroll", onTrackScroll);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={cursorRingRef}></div>
      <div className="progress-bar" ref={progressBarRef}></div>

      <nav id="nav" ref={navRef}>
        <div className="nav-logo">THIÊN ÂN</div>
        <ul className="nav-links">
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#details">Details</a></li>
          <li><a href="#invitation">Invitation</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <p className="hero-eyebrow">University of Economics and Law · VNUHCM</p>
          <h1 className="hero-name">
            Thiên<span>Ân</span>
          </h1>
          <div className="hero-line"></div>
          <p className="hero-sub">The Class of 2022</p>
          <p className="hero-date">09 · 05 · 2026</p>
        </div>
        <div className="hero-img-wrap">
          <img src="/assets/hero.jpeg" alt="Thiên Ân" />
        </div>
        <div className="scroll-hint" style={{ bottom: "20px" }}>
          <span>Scroll</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* QUOTE */}
      <section id="quote">
        <div className="reveal">
          <p className="quote-text">
            &quot;Mỗi trang sách đã lật qua là một bước trưởng thành — và hôm nay,{" "}
            <em>chương mới bắt đầu.</em>&quot;
          </p>
          <p className="quote-author">— Trường ĐH Kinh tế - Luật · ĐHQG TPHCM</p>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <p className="section-label reveal">Portfolio · 2026</p>

        <div className="gallery-track" id="galleryTrack" ref={trackRef}>
          <div className="gallery-card reveal" style={{ transitionDelay: "0.2s" }} onClick={() => openModal("/assets/vogue.jpeg")}>
            <img src="/assets/vogue.jpeg" alt="Vogue Cover" loading="lazy" />
            <div className="gallery-card-label">Vogue · Identity</div>
          </div>
          <div className="gallery-card reveal" style={{ transitionDelay: "0.3s" }} onClick={() => openModal("/assets/bazaar.jpeg")}>
            <img src="/assets/bazaar.jpeg" alt="Harper&apos;s Bazaar" loading="lazy" />
            <div className="gallery-card-label">Harper&apos;s Bazaar</div>
          </div>
          <div className="gallery-card reveal" style={{ transitionDelay: "0.4s" }} onClick={() => openModal("/assets/japan.jpeg")}>
            <img src="/assets/japan.jpeg" alt="Japan" loading="lazy" />
            <div className="gallery-card-label">Japan</div>
          </div>
          <div className="gallery-card reveal" style={{ transitionDelay: "0.5s" }} onClick={() => openModal("/assets/decor.jpeg")}>
            <img src="/assets/decor.jpeg" alt="Decor" loading="lazy" />
            <div className="gallery-card-label">Decor</div>
          </div>
        </div>

        <div className="gallery-nav" id="galleryNav">
          {[0, 1, 2, 3, 4].map(i => (
            <button 
              key={i} 
              className={`gallery-dot ${activeDot === i ? "active" : ""}`} 
              onClick={() => scrollToCard(i)}
            ></button>
          ))}
        </div>
      </section>

      {/* FEATURED IMAGE */}
      <section id="featured">
        <div className="parallax-bg" ref={parallaxBgRef} style={{ backgroundImage: "url('/assets/bazaar.jpeg')" }}></div>
        <div className="featured-fg reveal-left">
          <img src="/assets/bazaar.jpeg" alt="Harper&apos;s Bazaar Edition" />
        </div>
        <div className="featured-overlay reveal-right">
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "6px", color: "var(--gold)", marginBottom: "20px" }}>Harper&apos;s Bazaar Edition</p>
          <div className="featured-big">
            What&apos;s
            <strong>NEXT?</strong>
          </div>
        </div>
      </section>

      {/* DETAILS SPLIT */}
      <section id="details-section">
        <div id="details">
          <div className="details-image-wrap reveal-left">
            <img src="/assets/art_work.jpeg" alt="Artwork" />
          </div>
          <div className="details-content reveal-right">
            <h2>Graduation · 2026</h2>
            <div className="details-name">Thiên<br />Ân</div>

            <div className="details-info-item">
              <span className="details-info-label">Trường</span>
              <span className="details-info-value">
                <strong>Đại học Kinh tế - Luật</strong>
                ĐHQG TPHCM
              </span>
            </div>
            <div className="details-info-item">
              <span className="details-info-label">Lễ tốt nghiệp</span>
              <span className="details-info-value">
                <strong>09 May 2026</strong>
                11:00 — 12:30
              </span>
            </div>
            <div className="details-info-item">
              <span className="details-info-label">Địa điểm</span>
              <span className="details-info-value">669 Đỗ Mười, Khu phố 13<br />Linh Xuân, Hồ Chí Minh</span>
            </div>
            <div className="details-info-item">
              <span className="details-info-label">Liên hệ</span>
              <span className="details-info-value">
                <strong>0357 111 058</strong>
                FB: Ân Nguyễn
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* VOGUE FULL BLEED */}
      <section id="vogue">
        <div className="vogue-bg">
          <img src="/assets/vogue.jpeg" alt="Vogue" />
        </div>
        <div className="vogue-text reveal-right">
          <div className="vogue-big">VOGUE</div>
          <div style={{ marginTop: "16px", fontFamily: "'Cinzel', serif", fontSize: "11px", letterSpacing: "6px", color: "rgba(255,255,255,0.4)" }}>Identity · 2022</div>
          <div style={{ marginTop: "8px", fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontStyle: "italic", color: "rgba(255,255,255,0.6)" }}>Which face do you want?</div>
          <div className="vogue-tag" style={{ marginTop: "32px", display: "inline-block" }}>15 · 04 · 25</div>
        </div>
      </section>

      {/* INVITATION */}
      <section id="invitation">
        <p className="inv-pre reveal">You Are Cordially Invited</p>
        <h2 className="inv-title reveal">
          Lễ tốt nghiệp của<br />
          <span>Thiên Ân</span>
        </h2>

        <div className="inv-grid reveal">
          <div className="inv-cell">
            <p className="inv-cell-label">Ngày</p>
            <p className="inv-cell-value">09 May 2026</p>
          </div>
          <div className="inv-cell">
            <p className="inv-cell-label">Giờ</p>
            <p className="inv-cell-value">11H — 12H30</p>
          </div>
          <div className="inv-cell">
            <p className="inv-cell-label">Trường</p>
            <p className="inv-cell-value">UEL · ĐHQG</p>
          </div>
        </div>

        <p className="inv-address reveal">
          669 Đỗ Mười, Khu phố 13, Linh Xuân<br />
          Thành phố Hồ Chí Minh, Việt Nam
        </p>

        <div className="inv-contact reveal">
          <span>FB: <a href="#">Ân Nguyễn</a></span>
          <span>SĐT: <a href="tel:0357111058">0357 111 058</a></span>
        </div>
      </section>

      {/* OUTRO WATERCOLOR */}
      <section id="outro">
        <div className="outro-bg"></div>
        <div className="outro-img reveal">
          <img src="/assets/art_work.jpeg" alt="Artwork" />
        </div>
        <p className="outro-quote reveal">
          &quot;Every end is a new beginning.&quot;
        </p>
        <p className="outro-sig reveal">Chúc mừng tốt nghiệp 🎓</p>
      </section>

      <footer>
        <div className="footer-left">Thiên Ân · The Class of 2022</div>
        <div className="footer-right">Trường ĐH Kinh tế - Luật · ĐHQG TPHCM</div>
      </footer>

      {/* MODAL */}
      <div className={`modal ${modalOpen ? "open" : ""}`} id="modal" onClick={closeModal}>
        <button className="modal-close" onClick={closeModal}>ESC · CLOSE</button>
        {modalImgSrc && <img id="modalImg" src={modalImgSrc} alt="" />}
      </div>
    </>
  );
}
