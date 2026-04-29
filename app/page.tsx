"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 2000], [0, 400]);

  const scrollToCard = (i: number) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.querySelectorAll<HTMLDivElement>(".gallery-card");
    const card = cards[i];
    if (card) {
      trackRef.current.scrollTo({ left: card.offsetLeft - (window.innerWidth > 900 ? 140 : 24), behavior: "smooth" });
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
    // Custom Cursor
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx - 3 + "px";
        cursorRef.current.style.top = my - 3 + "px";
      }
    };
    
    let animationFrameId: number;
    const animRing = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = rx - 16 + "px";
        cursorRingRef.current.style.top = ry - 16 + "px";
      }
      animationFrameId = requestAnimationFrame(animRing);
    };
    
    document.addEventListener("mousemove", onMouseMove);
    animRing();

    // Hover effect
    const hoverElements = document.querySelectorAll("a, button, .gallery-card, .inv-cell");
    const onMouseEnter = () => { if (cursorRingRef.current) cursorRingRef.current.classList.add("hovered"); };
    const onMouseLeave = () => { if (cursorRingRef.current) cursorRingRef.current.classList.remove("hovered"); };
    hoverElements.forEach(el => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    // Nav scroll
    const onScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle("scrolled", window.scrollY > 80);
      }
    };
    window.addEventListener("scroll", onScroll);

    // Gallery active dot
    const trackNode = trackRef.current;
    const onTrackScroll = () => {
      if (!trackNode) return;
      const cards = trackNode.querySelectorAll(".gallery-card");
      let closest = 0, minDist = Infinity;
      cards.forEach((c, i) => {
        const dist = Math.abs(c.getBoundingClientRect().left + c.clientWidth / 2 - window.innerWidth / 2);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveDot(closest);
    };
    if (trackNode) {
      trackNode.addEventListener("scroll", onTrackScroll, { passive: true });
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
      if (trackNode) trackNode.removeEventListener("scroll", onTrackScroll);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <>
      <div className="cursor hidden md:block" ref={cursorRef}></div>
      <div className="cursor-ring hidden md:block" ref={cursorRingRef}></div>
      <motion.div className="progress-bar" style={{ scaleX, transformOrigin: "0%" }} />

      <nav id="nav" ref={navRef}>
        <div className="nav-logo font-cinzel">THIÊN ÂN</div>
        <ul className="nav-links font-cinzel">
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#details">Details</a></li>
          <li><a href="#invitation">Invitation</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-bg-text">CLASS OF 2026</div>
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="flex items-center gap-4 mb-6" variants={fadeInUp}>
            <div className="w-12 h-px bg-gold-dark hidden md:block"></div>
            <p className="hero-eyebrow font-cinzel mb-0!">University of Economics and Law</p>
          </motion.div>
          
          <motion.h1 className="hero-name font-serif" variants={fadeInUp}>
            Thiên<br />
            <span className="italic md:pl-24 text-gold-light">Ân</span>
          </motion.h1>
          
          <motion.div className="mt-12 flex flex-col gap-2" variants={fadeInUp}>
            <p className="hero-sub font-cinzel mt-0!">The Class of 2022</p>
            <p className="hero-date">09 · 05 · 2026</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-img-wrap"
          initial={{ opacity: 0, x: 80, rotateY: 15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-img-inner">
            <Image
              src="/assets/hero2.jpeg"
              alt="Thiên Ân tốt nghiệp"
              width={520}
              height={693}
              style={{ width: "100%", height: "auto", objectFit: "cover", objectPosition: "top", display: "block", borderRadius: "2px", boxShadow: "0 40px 80px rgba(0,0,0,0.8)" }}
              loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="hero-img-backdrop"></div>
          </div>
        </motion.div>

        <motion.div 
          className="scroll-hint" 
          style={{ bottom: "30px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="font-cinzel text-gold">Scroll</span>
          <div style={{ width: "1px", height: "50px", background: "rgba(212, 175, 55, 0.2)", position: "relative", overflow: "hidden" }}>
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              style={{ width: "1px", height: "100%", background: "var(--gold)" }}
            />
          </div>
        </motion.div>
      </section>

      {/* QUOTE */}
      <section id="quote">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-10%" }}
          variants={fadeInUp}
        >
          <p className="quote-text font-serif">
            &quot;Mỗi trang sách đã lật qua là một bước trưởng thành — và hôm nay,{" "}
            <em>chương mới bắt đầu.</em>&quot;
          </p>
          <p className="quote-author font-cinzel">— Trường ĐH Kinh tế - Luật · ĐHQG TPHCM</p>
        </motion.div>
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <motion.p 
          className="section-label font-cinzel"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          Portfolio · 2026
        </motion.p>

        <div className="gallery-track" id="galleryTrack" ref={trackRef}>
          {[
            { src: "/assets/vogue.jpeg", label: "Vogue · Identity" },
            { src: "/assets/bazaar.jpeg", label: "Harper's Bazaar" },
            { src: "/assets/japan.jpeg", label: "Japan" },
            { src: "/assets/decor.jpeg", label: "Decor" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="gallery-card" 
              onClick={() => openModal(item.src)}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            >
              <Image
                src={item.src}
                alt={item.label}
                width={360}
                height={480}
                className="gallery-card-img"
                style={{ width: "auto", objectFit: "cover", display: "block" }}
                loading="lazy"
                sizes="(max-width: 768px) 80vw, 400px"
              />
              <div className="gallery-card-label font-cinzel">{item.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="gallery-nav"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
        >
          {[0, 1, 2, 3].map(i => (
            <button 
              key={i} 
              aria-label={`Go to slide ${i+1}`}
              className={`gallery-dot ${activeDot === i ? "active" : ""}`} 
              onClick={() => scrollToCard(i)}
            ></button>
          ))}
        </motion.div>
      </section>

      {/* FEATURED - Lời Cảm Ơn */}
      <section id="featured">
        <motion.div className="parallax-bg" style={{ backgroundImage: "url('/assets/bazaar.jpeg')", y: yBg }}></motion.div>
        <motion.div 
          className="featured-fg"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
        >
          <Image
            src="/assets/bazaar.jpeg"
            alt="Thiên Ân"
            width={400}
            height={533}
            className="featured-fg-img"
            style={{ width: "auto", objectFit: "cover", display: "block" }}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <motion.div 
          className="featured-overlay"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} variants={fadeInRight}
        >
          <p className="featured-kicker font-cinzel">Lời cảm ơn · 2026</p>
          <div className="featured-stroke font-serif">GRATITUDE</div>
          <h2 className="featured-headline font-serif">
            Cảm ơn,<br />
            <em>tất cả.</em>
          </h2>
          <div className="featured-rule" />
          <p className="featured-thanks font-serif">
            Ba Mẹ — những người đã hy sinh tất cả.<br />
            Bạn bè — đã đi cùng những năm không quên.<br />
            Và <em>bạn</em> — người đã có mặt ở đây.
          </p>
        </motion.div>
      </section>

      {/* DETAILS SPLIT */}
      <section id="details-section">
        <div id="details">
          <motion.div 
            className="details-image-wrap"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={fadeInLeft}
          >
            <Image
              src="/assets/art_work1.jpeg"
              alt="Artwork"
              width={500}
              height={667}
              style={{ width: "100%", height: "auto", objectFit: "cover", display: "block", borderRadius: "2px" }}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </motion.div>
          <motion.div 
            className="details-content"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={fadeInRight}
          >
            <h2 className="font-cinzel">Graduation · 2026</h2>
            <div className="details-name font-serif">Thiên<br />Ân</div>

            <div className="details-info-item">
              <span className="details-info-label font-cinzel">Trường</span>
              <span className="details-info-value">
                <strong>Đại học Kinh tế - Luật</strong>
                ĐHQG TPHCM
              </span>
            </div>
            <div className="details-info-item">
              <span className="details-info-label font-cinzel">Lễ tốt nghiệp</span>
              <span className="details-info-value">
                <strong>09 May 2026</strong>
                11:00 — 12:30
              </span>
            </div>
            <div className="details-info-item">
              <span className="details-info-label font-cinzel">Địa điểm</span>
              <span className="details-info-value">669 Đỗ Mười, Khu phố 13<br />Linh Xuân, Hồ Chí Minh</span>
            </div>
            <div className="details-info-item">
              <span className="details-info-label font-cinzel">Liên hệ</span>
              <span className="details-info-value">
                <strong>0357 111 058</strong>
                FB: Ân Nguyễn
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VOGUE FULL BLEED */}
      <section id="vogue">
        <div className="vogue-bg">
          <Image
            src="/assets/vogue.jpeg"
            alt="Vogue"
            width={500}
            height={667}
            className="vogue-bg-img"
            style={{ width: "100%", height: "auto", objectFit: "cover", objectPosition: "top", display: "block" }}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <motion.div 
          className="vogue-text"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} variants={fadeInRight}
        >
          <p className="font-cinzel" style={{ fontSize: "11px", letterSpacing: "6px", color: "var(--gold)", textTransform: "uppercase", marginBottom: "24px" }}>The Journey · 2022 — 2026</p>
          <div className="vogue-big font-serif">Bốn<br /><em>năm.</em></div>
          <p className="font-serif" style={{ marginTop: "28px", fontSize: "clamp(16px, 2vw, 22px)", fontStyle: "italic", color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.7, maxWidth: "420px" }}>
            Bốn năm của những trang giáo trình, những đêm thức khuya,
            những buổi sáng vội vàng — và cuối cùng, một ngày để nhớ mãi.
          </p>
          <div className="vogue-tag font-cinzel" style={{ marginTop: "40px" }}>09 · 05 · 2026</div>
        </motion.div>
      </section>

      {/* INVITATION */}
      <section id="invitation">
        <motion.p 
          className="inv-pre font-cinzel"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          You Are Cordially Invited
        </motion.p>
        <motion.h2 
          className="inv-title font-serif"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          Lễ tốt nghiệp của<br />
          <span className="font-serif">Thiên Ân</span>
        </motion.h2>

        <motion.div 
          className="inv-grid"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
        >
          {[
            { label: "Ngày", value: "09 May 2026" },
            { label: "Giờ", value: "11H — 12H30" },
            { label: "Trường", value: "UEL · ĐHQG" }
          ].map((item, i) => (
            <motion.div className="inv-cell" variants={fadeInUp} key={i}>
              <p className="inv-cell-label font-cinzel">{item.label}</p>
              <p className="inv-cell-value font-serif">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          className="inv-address"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          669 Đỗ Mười, Khu phố 13, Linh Xuân<br />
          Thành phố Hồ Chí Minh, Việt Nam
        </motion.p>

        <motion.div 
          className="inv-contact font-cinzel"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          <span>FB: <a href="#">Ân Nguyễn</a></span>
          <span>SĐT: <a href="tel:0357111058">0357 111 058</a></span>
        </motion.div>
      </section>

      {/* OUTRO WATERCOLOR */}
      <section id="outro">
        <div className="outro-bg"></div>
        <motion.div 
          className="outro-img"
          style={{ aspectRatio: "1" }}
          initial={{ opacity: 0, scale: 0.9, y: 40 }} 
          whileInView={{ opacity: 1, scale: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/assets/insprired.jpeg"
            alt="Artwork"
            fill
            style={{ display: "block", borderRadius: "2px", objectFit: "contain" }}
            loading="lazy"
            sizes="(max-width: 768px) 80vw, 400px"
          />
        </motion.div>
        <motion.p 
          className="outro-quote font-serif"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          &ldquo;Mỗi kết thúc là khởi đầu của một chương mới&nbsp;—<br />
          <em>và chương này, là đẹp nhất.</em>&rdquo;
        </motion.p>
        <motion.div
          className="outro-divider"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
        <motion.p 
          className="outro-sig font-serif"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          Thiên Ân · The Class of 2022
        </motion.p>
        <motion.p
          className="outro-sub font-cinzel"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          Trường Đại học Kinh tế - Luật · ĐHQG TPHCM
        </motion.p>
      </section>

      <footer>
        <div className="footer-left font-cinzel">Thiên Ân · The Class of 2022</div>
        <div className="footer-right">Trường ĐH Kinh tế - Luật · ĐHQG TPHCM</div>
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div 
            className="modal open" 
            id="modal" 
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="modal-close font-cinzel" onClick={closeModal}>ESC · CLOSE</button>
            <motion.img 
              src={modalImgSrc} 
              alt="Gallery Fullscreen" 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
