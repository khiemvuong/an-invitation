import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Hero zoom animation - text zooms from far away
export const initHeroZoom = () => {
  gsap.from('.hero-title', {
    scale: 5,
    opacity: 0,
    z: -2000,
    duration: 1,
    scrollTrigger: {
      trigger: '.hero-zoom',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    }
  });

  gsap.from('.hero-subtitle', {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: '.hero-zoom',
      start: 'top top',
      end: 'center top',
      scrub: 1,
    }
  });

  gsap.from('.hero-school', {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: '.hero-zoom',
      start: 'top top',
      end: 'center top',
      scrub: 1,
    }
  });
};

// Text reveal with 3D rotation
export const initTextReveal = () => {
  gsap.utils.toArray('.section-title').forEach((title: any) => {
    gsap.from(title, {
      y: 200,
      opacity: 0,
      rotationX: 45,
      transformPerspective: 1000,
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
      }
    });
  });

  gsap.utils.toArray('.story-text').forEach((text: any) => {
    gsap.from(text, {
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: text,
        start: 'top 85%',
        end: 'top 40%',
        scrub: true,
      }
    });
  });
};

// Image parallax with depth
export const initImageParallax = () => {
  gsap.utils.toArray('.image-layer').forEach((img: any) => {
    gsap.to(img, {
      y: -100,
      scale: 1.1,
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  });
};

// Finale zoom out effect
export const initFinaleZoom = () => {
  gsap.from('.finale-title', {
    scale: 0.5,
    opacity: 0,
    scrollTrigger: {
      trigger: '.finale-zoom',
      start: 'top center',
      end: 'center center',
      scrub: true,
    }
  });

  gsap.from('.finale-text', {
    y: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: '.finale-text',
      start: 'top 80%',
      end: 'top 40%',
      scrub: true,
    }
  });

  gsap.from('.finale-signature', {
    opacity: 0,
    scale: 0.8,
    scrollTrigger: {
      trigger: '.finale-signature',
      start: 'top 90%',
      end: 'top 60%',
      scrub: true,
    }
  });
};

// Initialize all animations
export const initAllAnimations = () => {
  initHeroZoom();
  initTextReveal();
  initImageParallax();
  initFinaleZoom();
};
