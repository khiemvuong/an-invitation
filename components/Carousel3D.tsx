import { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import Image from 'next/image';

interface CarouselCard {
  image: string;
  title: string;
  description: string;
}

interface Carousel3DProps {
  cards: CarouselCard[];
}

export default function Carousel3D({ cards }: Carousel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll-based rotation (no auto-rotation)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to rotation (0 to 360 degrees)
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="carousel-3d-container">
      <div className="carousel-3d-stage">
        {cards.map((card, index) => (
          <CarouselCard 
            key={index}
            card={card}
            index={index}
            rotation={rotation}
            total={cards.length}
          />
        ))}
      </div>
    </div>
  );
}

interface CarouselCardProps {
  card: CarouselCard;
  index: number;
  rotation: MotionValue<number>;
  total: number;
}

function CarouselCard({ card, index, rotation, total }: CarouselCardProps) {
  // Calculate rotation angle for each card
  const anglePerCard = 360 / total;
  const baseAngle = index * anglePerCard;
  
  // Combine base angle with scroll rotation
  const rotateY = useTransform(
    rotation,
    (r) => baseAngle - r
  );
  
  // Scale cards that are facing forward
  const scale = useTransform(
    rotateY,
    [-90, 0, 90],
    [0.75, 1, 0.75]
  );
  
  // Opacity for cards facing away
  const opacity = useTransform(
    rotateY,
    [-90, 0, 90, 180],
    [0.4, 1, 0.4, 0]
  );

  // Z-index based on rotation
  const zIndex = useTransform(
    rotateY,
    [-180, 0, 180],
    [1, 10, 1]
  );



  return (
    <motion.div
      className="carousel-card-3d"
      style={{
        rotateY,
        scale,
        opacity,
        zIndex,
      }}
    >
      <div className="card-inner">
        <div className="card-image-wrap">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="card-image"
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 90vw, 80vw"
            priority={index === 0}
          />
          <div className="card-overlay"></div>
        </div>
        
        {/* Text Overlay - Bottom Left with Frosted Glass */}
        <motion.div 
          className="card-text-overlay"
          style={{
            opacity: useTransform(
              rotateY,
              [-45, 0, 45],
              [0, 1, 0]
            )
          }}
        >
          <h3 className="card-title font-serif">{card.title}</h3>
          <p className="card-description font-quicksand">{card.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
