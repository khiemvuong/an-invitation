"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import * as htmlToImage from 'html-to-image';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgSrc, setModalImgSrc] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);

  const handleGeneratePreview = async () => {
    if (!cardRef.current || isGenerating) return;
    
    console.log('[DEBUG] Starting image generation...');
    setIsGenerating(true);
    
    try {
      // Wait for all images to fully load before capturing
      const images = cardRef.current.querySelectorAll('img');
      console.log('[DEBUG] Found images:', images.length);
      
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Continue even if image fails
          });
        })
      );
      
      console.log('[DEBUG] All images loaded');
      
      // Extra 200ms buffer for CSS transitions/transforms
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const filter = (node: HTMLElement) => {
        return !node.classList?.contains('download-btn');
      };
      
      console.log('[DEBUG] Starting PNG generation...');
      
      // Generate PNG for better quality (lossless)
      const dataUrl = await htmlToImage.toPng(cardRef.current, { 
        quality: 1,
        pixelRatio: 2, // 2x for retina displays
        filter 
      });
      
      console.log('[DEBUG] PNG generated, length:', dataUrl.length);
      
      // Convert data URL to Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      console.log('[DEBUG] Blob created, size:', blob.size);
      
      // Store in state and open preview modal
      setPreviewImageUrl(dataUrl);
      setPreviewBlob(blob);
      setPreviewModalOpen(true);
      
      console.log('[DEBUG] Modal state set to true');
      
    } catch (err) {
      console.error('[DEBUG] Failed to generate image', err);
      showToast('✗ Lỗi khi tạo ảnh');
    } finally {
      setIsGenerating(false);
      console.log('[DEBUG] Generation complete');
    }
  };

  const handleConfirmDownload = () => {
    if (!previewBlob || !previewImageUrl) return;
    
    try {
      // Desktop: Traditional download
      const link = document.createElement('a');
      link.download = 'ThienAn_Invitation_2026.png';
      link.href = previewImageUrl;
      link.click();
      
      showToast('✓ Đã tải xuống');
      setPreviewModalOpen(false);
    } catch (err) {
      console.error('Failed to download', err);
      showToast('✗ Lỗi khi tải xuống');
    }
  };

  const handleConfirmShare = async () => {
    if (!previewBlob) return;
    
    try {
      // Mobile: Web Share API
      if (navigator.share && navigator.canShare) {
        const file = new File([previewBlob], 'ThienAn_Invitation_2026.png', { type: 'image/png' });
        
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Thiệp mời tốt nghiệp Thiên Ân',
            text: 'Lễ tốt nghiệp 09/05/2026'
          });
          showToast('✓ Đã chia sẻ thành công');
          setPreviewModalOpen(false);
          return;
        }
      }
      
      // Fallback: show message
      showToast('Trình duyệt không hỗ trợ chia sẻ');
    } catch (err) {
      console.error('Failed to share', err);
      showToast('✗ Lỗi khi chia sẻ');
    }
  };

  const handleCancelPreview = () => {
    setPreviewModalOpen(false);
    setPreviewImageUrl("");
    setPreviewBlob(null);
  };

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.9);
      color: var(--gold);
      padding: 12px 24px;
      border-radius: 8px;
      font-family: var(--font-cinzel);
      font-size: 14px;
      z-index: 10000;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(212, 175, 55, 0.3);
      animation: toastIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };

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
          <li><a href="#celebration">Celebration</a></li>
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

      {/* THE STRUGGLE / SLOGAN */}
      <section id="struggle">
        <motion.div className="struggle-bg" style={{ y: yBg }}></motion.div>
        <motion.div 
          className="struggle-content"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-20%" }}
          variants={staggerContainer}
        >
          <motion.h2 className="struggle-slogan font-serif" variants={fadeInUp}>
            Ráng cực<br />
            <em>sau này khổ</em>
          </motion.h2>
          <motion.p className="struggle-sub font-serif" variants={fadeInUp}>
            Bốn năm đại học không chỉ có hoa hồng. Đó là những đêm thức trắng, những áp lực vô hình và vô số lần tự hỏi bản thân. Nhưng chính những &quot;cực khổ&quot; ấy đã mài giũa nên phiên bản kiên cường nhất của ngày hôm nay.
          </motion.p>
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

        <motion.div 
          className="gallery-track" 
          id="galleryTrack" 
          ref={trackRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
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
              variants={{
                hidden: { opacity: 0, x: 40 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <Image
                src={item.src}
                alt={item.label}
                width={360}
                height={480}
                className="gallery-card-img"
                loading="lazy"
                sizes="(max-width: 768px) 80vw, 400px"
              />
              <div className="gallery-card-label font-cinzel">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

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

      {/* DETAILS MERGED INTO CELEBRATION */}

      {/* VOGUE MAGAZINE COVER */}
      <section id="vogue">
        <div className="vogue-bg">
          <Image
            src="/assets/vogue.jpeg"
            alt="Vogue"
            fill
            className="vogue-bg-img"
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="100vw"
            priority
          />
          <div className="vogue-overlay-gradient"></div>
        </div>
        
        <motion.div 
          className="vogue-text"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={staggerContainer}
        >
          <motion.p className="vogue-kicker font-cinzel" variants={fadeInUp}>
            The Journey · 2022 — 2026
          </motion.p>
          <motion.h2 className="vogue-big font-serif" variants={fadeInUp}>
            Bốn<br /><em>năm.</em>
          </motion.h2>
          <motion.div className="vogue-body font-serif" variants={fadeInUp}>
            Bốn năm của những trang giáo trình, những đêm thức khuya,
            những buổi sáng vội vàng — và cuối cùng, một ngày để nhớ mãi.
            <div style={{ marginTop: "24px", color: "var(--gold)", letterSpacing: "4px", fontSize: "11px", textTransform: "uppercase" }} className="font-cinzel">09 · 05 · 2026</div>
          </motion.div>
        </motion.div>
      </section>

      {/* CELEBRATION (Physical Card) */}
      <section id="celebration">
        <div className="celebration-inner">
          <motion.div 
            className="invitation-card"
            ref={cardRef}
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* The image is hidden on mobile to fit the card layout, but shown on desktop */}
            <div className="celebration-image-wrap">
              <Image
                src="/assets/art_work2.jpeg"
                alt="Artwork"
                fill
                className="celebration-bg-img"
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 45vw"
                loading="lazy"
              />
            </div>
            
            <div className="celebration-content">
              <div className="celebration-content-inner">
                <p className="celebration-pre font-cinzel">You Are Cordially Invited</p>
                <h2 className="celebration-title font-serif">
                  Lễ tốt nghiệp của<br />
                  <em>Thiên Ân</em>
                </h2>

                <div className="celebration-grid">
                  <div className="celebration-item">
                    <span className="celebration-label font-cinzel">Thời gian</span>
                    <span className="celebration-value">
                      <strong>09 May 2026</strong>
                      11:00 — 12:30
                    </span>
                  </div>
                  <div className="celebration-item">
                    <span className="celebration-label font-cinzel">Địa điểm</span>
                    <span className="celebration-value">
                      <strong>Trường ĐH Kinh tế - Luật</strong>
                      669 Đỗ Mười, Linh Xuân<br />Hồ Chí Minh
                    </span>
                  </div>
                </div>

                <div className="celebration-contact font-cinzel">
                  <span>Liên hệ: <a href="tel:0357111058">0357 111 058</a></span>
                  <span>Facebook:<a href="https://www.facebook.com/an.nguyen.525676">Ân Nguyễn</a></span>
                </div>
                
                <button 
                  className="download-btn font-cinzel"
                  onClick={handleGeneratePreview}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Đang tạo ảnh...
                    </>
                  ) : (
                    <>
                      Lưu Thiệp Mời
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
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

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {previewModalOpen && (
          <>
            {console.log('[DEBUG] Preview modal is rendering!')}
            <motion.div 
            className="preview-modal"
            onClick={handleCancelPreview}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="preview-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="preview-modal-title font-cinzel">
                Xem trước thiệp mời
              </h3>
              
              <div className="preview-modal-image-wrap">
                <img 
                  src={previewImageUrl} 
                  alt="Preview" 
                  className="preview-modal-image"
                />
              </div>
              
              <div className="preview-modal-actions">
                <button 
                  className="preview-btn preview-btn-cancel font-cinzel"
                  onClick={handleCancelPreview}
                >
                  Hủy
                </button>
                <button 
                  className="preview-btn preview-btn-share font-cinzel"
                  onClick={handleConfirmShare}
                >
                  Chia sẻ
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                </button>
                <button 
                  className="preview-btn preview-btn-save font-cinzel"
                  onClick={handleConfirmDownload}
                >
                  Lưu về máy
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
