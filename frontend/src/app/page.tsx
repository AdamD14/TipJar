const GoldButtonShowcase = () => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <style>{`
        /* 1. begin as a creator */
        .solid-gold-btn {
          color: #000000;
          padding: 0.4em 0.8em;
          font-size: 18px;
          border-radius: 0.5em;
          background: #FFD700;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid #F6C300;
          transition: all 0.2s;
          box-shadow: 2px 2px 2px #B38600, -2px -2px 4px #FFF5CC;
        }
        .solid-gold-btn:hover {
          transform: scale(1.05); /* Effect added */
        }
        .solid-gold-btn:active {
          color: #333333;
          box-shadow: 0px 0px 0px #B38600, 0px 0px 0px #FFF5CC, inset 4px 4px 12px #5A4A00, inset -4px -4px 12px #F6C300;
          transform: translateY(2px);
        }

        /* 2. sign up */
        .outline-gold-btn {
          color: #FFD700;
          background: transparent;
          border: 2px solid #FFD700;
          padding: 0.4em 0.8em;
          font-size: 18px;
          font-weight: 600;
          border-radius: 0.5em;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .outline-gold-btn:hover {
          background: #FFD700; /* Background changed */
          color: #000000;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }
        .outline-gold-btn:active {
          transform: translateY(2px);
        }

        /* 3. get started */
        .ghost-gold-btn {
          color: #FFD700;
          background: transparent;
          border: 2px solid transparent; /* Added for smooth transition */
          padding: 0.4em 0.8em;
          font-weight: 600;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ghost-gold-btn:hover {
          border: 2px solid #FFD700;
          border-radius: 0.5em; /* Effect changed to border */
        }
        .ghost-gold-btn:active {
          transform: translateY(2px);
        }

        /* 4. register */
        .soft-gold-btn {
          color: #000000; /* Color changed for contrast */
          /* Gradient background added */
          background: #FFD700;
          border: 1px solid #FFD700;
          padding: 0.4em 0.8em;
          font-weight: 600;
          font-size: 18px;
          border-radius: 0.5em;
          cursor: pointer;
          box-shadow: 2px 2px 6px #E0C060;
          transition: all 0.2s ease;
        }
        .soft-gold-btn:hover {
          /* Gradient direction reversed and scaling added */
         color: #FFD700;
          background: transparent;
          border: 2px solid #FFD700;
          transform: scale(1.05);
        }
        .soft-gold-btn:active {
          transform: translateY(2px);
        }
      `}</style>

      <div className="flex flex-wrap items-center justify-center gap-8">
        
        <button className="solid-gold-btn">
          begin as a creator
        </button>

        <button className="outline-gold-btn">
          sign up
        </button>

        <button className="ghost-gold-btn">
          get started
        </button>
        
        <button className="soft-gold-btn">
          register
        </button>

      </div>
    </main>
  );
};

export default GoldButtonShowcase;