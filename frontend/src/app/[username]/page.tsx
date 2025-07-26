"use client";
import React, { useState, useEffect } from "react";

const HEADER_HEIGHT = 52; // px

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        height: `${HEADER_HEIGHT}px`,
        minHeight: `${HEADER_HEIGHT}px`,
        width: "100%",
      }}
      className="fixed top-0 left-0 right-0 border-b border-[#f7f1bf] border-opacity-10 z-50"
    >
      <nav className="grid grid-cols-[auto_1fr_auto] w-full h-full">
        {/* GRADIENTOWY BOX OD GÓRY DO DOŁU, PRZYKLEJONY DO LEWEJ */}
        <div
          className="flex items-center h-full"
          style={{ padding: 0, margin: 0 }}
        >
          <div
            className="flex items-center bg-gradient-to-r from-[#f7f1bf] to-[#065a60] rounded-2xl shadow-lg"
            style={{
              height: "100%",
              minHeight: "100%",
              padding: 0,
              margin: 0,
              borderTopLeftRadius: "16px", // jeśli chcesz zaokrąglenia
              borderBottomLeftRadius: "16px",
            }}
          >
            {/* IKONA: 48px, padding 2px GÓRA/LEWA/DÓŁ, 0 z prawej */}
            <img
              src="/assets/icon-tipjarnone.svg"
              alt="TipJar+ icon"
              style={{
                height: "48px",
                width: "auto",
                paddingLeft: "2px",
                paddingTop: "2px",
                paddingBottom: "2px",
                paddingRight: "0px",
              }}
            />
            {/* NAPIS tipjar.plus 1.25rem bold */}
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#fff",
                marginLeft: "8px",
                marginRight: "12px",
              }}
            >
              tipjar.plus
            </span>
          </div>
        </div>

        {/* ŚRODEK */}
        <div className="flex items-center justify-center h-full">
          {[
            ["#why", "Why tipjar+?"],
            ["#how-it-works", "How it works?"],
            ["#start-building", "Start Building"],
            ["#explore", "Explore"],
            ["#learn", "Learn"],
            ["#ai-studio", "AI Studio"],
          ].map(([href, label], idx, arr) => (
            <span
              key={href}
              style={{
                fontSize: "1rem",
                lineHeight: "1",
                marginRight: idx !== arr.length - 1 ? "4px" : "0",
                color: "white",
              }}
            >
              <a href={href}>{label}</a>
            </span>
          ))}
        </div>

        {/* BUTTONY */}
        <div className="flex items-center justify-end h-full pr-[2px] gap-[2px]">
          <button
            style={{
              padding: "2px 32px", // Begin: góra/dół 2px, lewo/prawo 2rem/32px
              fontSize: "1rem",
              fontWeight: "bold",
              background: "#f7f1bf",
              color: "#065a60",
              borderRadius: "8px",
              border: "none",
            }}
          >
            Begin as a Creator
          </button>
          <button
            style={{
              padding: "2px 64px", // Login: góra/dół 2px, lewo/prawo 4rem/64px
              fontSize: "1rem",
              fontWeight: "bold",
              border: "1px solid #f7f1bf",
              color: "#f7f1bf",
              background: "transparent",
              borderRadius: "8px",
            }}
          >
            Login
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
