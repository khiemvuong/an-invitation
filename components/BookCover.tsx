"use client";

export default function BookCover() {
  const titleChars1 = "PHƯƠNG".split("");
  const titleChars2 = "AN".split("");

  return (
    <div className="book-cover">
      <div className="book-cover-bg">
        <div className="book-cover-ornament-top" />
        <div className="book-cover-ornament-bottom" />
      </div>

      <div className="book-cover-spine" />

      <div className="book-cover-content">
        <div className="book-cover-line" />

        <div className="book-cover-title-wrap">
          <div className="book-cover-title-row">
            {titleChars1.map((char, i) => (
              <span key={i} className="book-cover-char">
                {char}
              </span>
            ))}
          </div>
          <div className="book-cover-title-row">
            {titleChars2.map((char, i) => (
              <span key={i} className="book-cover-char accent">
                {char}
              </span>
            ))}
          </div>
        </div>

        <div className="book-cover-line" />

        <p className="book-cover-subtitle">Graduation Photo Album</p>
      </div>

      <div className="book-cover-shadow" />
    </div>
  );
}
