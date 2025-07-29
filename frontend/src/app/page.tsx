// TipJar+ Header FINAL - 48px Icon, literalne wytyczne Adaś
"use client";
import React from "react";

const HEADER_HEIGHT = 52; // header 52px wysokości

const Header = () => (
  <header
    style={{
      height: `${HEADER_HEIGHT}px`,
      width: "100%",
      background: "#065a60", // kolor tła headera (identyczny jak dalej po prawej)
      borderBottom: "1px solid #f7f1bf",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
    }}
  >
    <nav
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        height: "100%",
      }}
    >
      {/* LOGO + NAPIS w gradientowym boxie */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          background: "linear-gradient(to right, #f7f1bf, #065a60)", // gradient TYLKO pod logo
        }}
      >
        <img
          src="/assets/icon-tipjarnone.svg"
          alt="TipJar+ icon"
          style={{
            height: "48px",         // <----- OSTATECZNIE TU MASZ 48px WYSOKOŚCI
            width: "auto",
            paddingLeft: "2px",
            paddingTop: "2px",
            paddingBottom: "2px",
            display: "block",
          }}
        />
        <span
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#fff",
            marginLeft: "8px",
          }}
        >
          tipjar.plus
        </span>
      </div>

      {/* LINKI */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          height: "100%",
          gap: "4px",
        }}
      >
        {[
          ["#why", "Why tipjar+?"],
          ["#how-it-works", "How it works?"],
          ["#start-building", "Start Building"],
          ["#explore", "Explore"],
          ["#learn", "Learn"],
          ["#ai-studio", "AI Studio"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              fontSize: "1rem",
              lineHeight: "1",
              color: "white",
              textDecoration: "none",
              padding: "0 8px",
            }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* BUTTONY */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          height: "100%",
          gap: "2px",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2px 8px",
            fontSize: "1rem",
            fontWeight: "bold",
            background: "#f7f1bf",
            color: "#065a60",
            border: "none",
            margin: "2px",
            height: `${HEADER_HEIGHT - 4}px`,
          }}
        >
          Begin as a Creator
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2px 8px",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "1px solid #f7f1bf",
            color: "#f7f1bf",
            background: "transparent",
            margin: "2px",
            height: `${HEADER_HEIGHT - 4}px`,
          }}
        >
          Login
        </button>
      </div>
    </nav>
  </header>
);

export default Header;
"use client";
import React from "react";

const HEADER_HEIGHT = 52;

const Header = () => (
  <header
    style={{
      height: `${HEADER_HEIGHT}px`,
      width: "100%",
      background: "#065a60",
      borderBottom: "1px solid #f7f1bf",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      boxSizing: "border-box",
    }}
  >
    <nav
      style={{
        display: "grid",
        gridTemplateColumns: "auto 12px 1fr auto",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* GRADIENTOWY BOX LOGO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "calc(100% - 2px)", // żeby NIE nachodził na kreskę border-bottom
          background: "linear-gradient(to right, #f7f1bf, #065a60)",
          boxSizing: "border-box",
        }}
      >
        <img
          src="/assets/icon-tipjarnone.svg"
          alt="TipJar+ icon"
          style={{
            height: "48px",
            paddingLeft: "2px",
            paddingTop: "2px",
            paddingBottom: "2px",
            display: "block",
          }}
        />
        <span
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#fff",
            marginLeft: "8px",
          }}
        >
          tipjar.plus
        </span>
      </div>

      {/* ODSTĘP między gradientowym boxem a sekcjami */}
      <div />

      {/* SEKCJE/LINKI */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          height: "100%",
          gap: "4px",
        }}
      >
        {[
          ["#why", "Why tipjar+?"],
          ["#how-it-works", "How it works?"],
          ["#start-building", "Start Building"],
          ["#explore", "Explore"],
          ["#learn", "Learn"],
          ["#ai-studio", "AI Studio"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              fontSize: "1rem",
              lineHeight: "1",
              color: "white",
              textDecoration: "none",
              padding: "0 8px",
            }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* BUTTONY PO PRAWEJ, ODSTĘP OD GÓRY I DOŁU */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          height: "100%",
          gap: "2px",
          marginTop: "6px",    // Odstęp od góry headera
          marginBottom: "6px", // Odstęp od dołu headera
          marginRight: "12px", // Odstęp od prawej krawędzi
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2px 8px",
            fontSize: "1rem",
            fontWeight: "bold",
            background: "#f7f1bf",
            color: "#065a60",
            border: "none",
            margin: "2px",
            height: `${HEADER_HEIGHT - 4 - 12}px`, // 12px suma marginesów góra/dół
          }}
        >
          Begin as a Creator
        </button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2px 8px",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "1px solid #f7f1bf",
            color: "#f7f1bf",
            background: "transparent",
            margin: "2px",
            height: `${HEADER_HEIGHT - 4 - 12}px`,
          }}
        >
          Login
        </button>
      </div>
    </nav>
  </header>
);

export default Header;
