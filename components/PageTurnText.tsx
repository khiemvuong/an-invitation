"use client";

import { motion } from "framer-motion";

interface PageTurnTextProps {
  text?: string;
  title: string;
  isActive: boolean;
}

export default function PageTurnText({ text, title, isActive }: PageTurnTextProps) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const charVariant = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 200,
      },
    },
  };

  // Render text grouped by words so line breaks only happen between words
  function renderAnimatedText(content: string) {
    const tokens = content.split(/(\s+)/);
    let globalIndex = 0;

    return tokens.map((token, tokenIdx) => {
      if (token.trim() === "") {
        return (
          <span key={`space-${tokenIdx}`} style={{ whiteSpace: "pre" }}>
            {" "}
          </span>
        );
      }

      const chars = token.split("");
      return (
        <span
          key={`word-${tokenIdx}`}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {chars.map((char) => {
            const idx = globalIndex++;
            return (
              <motion.span
                key={idx}
                variants={charVariant}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      );
    });
  }

  return (
    <div className="book-page-text">
      <motion.h2
        className="book-page-title"
        variants={container}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        exit="exit"
      >
        {renderAnimatedText(title)}
      </motion.h2>

      {text && (
        <motion.p
          className="book-page-paragraph"
          variants={container}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          exit="exit"
        >
          {renderAnimatedText(text)}
        </motion.p>
      )}
    </div>
  );
}
