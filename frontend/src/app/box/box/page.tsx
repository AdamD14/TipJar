import { Box2 } from "@/components/ui/forms/Box2";
import Button from "@/components/ui/buttons/Button";

export default function Page() {
  return (
    <main className="min-h-screen bg-teal-950 p-6 md:p-12 flex flex-col items-center justify-center selection:bg-gold-400 selection:text-teal-950">
      <div className="max-w-5xl w-full space-y-16">
        {/* ================================================================
            SEKCJA HERO (Inlined z dawnego HeroCtas)
        ================================================================ */}
        <header className="space-y-6 md:max-w-2xl">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl font-heading">
              Silnik Kinetyczny: Oś Z i Termodynamika OKLCH
            </h1>
            <p className="text-teal-100/60 text-base md:text-lg font-body">
              Przetestuj pełną fizykę systemu TIPJAR+. Przyciski i karty reagują
              na masę, inercję (overshoot) oraz sprzętową aberrację
              pryzmatyczną.
            </p>
          </div>

          {/* Dawny komponent HeroCtas — teraz bezpośrednio w kodzie */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button variant="primary" size="lg">
              Begin as a Creator
            </Button>
            <Button variant="secondary" size="lg">
              Explore as a Fan
            </Button>
          </div>
        </header>

        {/* ================================================================
            SIATKA BENTO GRID (Twoje 7 zoptymalizowanych kart Box2)
        ================================================================ */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-gold-400">
            Matryca Paradygmatów (Bento Grid)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Karta 1: Base (Teal) + Interaktywna */}
            <Box2 variant="base" interactive>
              <div className="space-y-2 text-white">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-300">
                  Base Wariant
                </span>
                <h3 className="text-xl font-bold font-heading">
                  Zoptymalizowana Fala
                </h3>
                <p className="text-sm text-teal-100/70 font-body">
                  Najedź myszką. Tło płynnie traci nasycenie na osi Z, a
                  wektorowa sieć Connection pod spodem rozciąga się o 1.03x.
                </p>
              </div>
            </Box2>

            {/* Karta 2: Premium (Gold) + Interaktywna + Urwany Róg */}
            <Box2 variant="premium" interactive hasArc>
              <div className="space-y-2 text-white">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Premium Wariant
                </span>
                <h3 className="text-xl font-bold font-heading">
                  Luksusowa Refrakcja
                </h3>
                <p className="text-sm text-amber-100/70 font-body">
                  Ostry laserowy refleks z <code>gold-50</code> od 97%
                  szerokości. Ramka wektorowa chroni krawędzie ściętego rogu.
                </p>
              </div>
            </Box2>

            {/* Karta 3: Purple + Interaktywna */}
            <Box2 variant="purple" interactive>
              <div className="space-y-2 text-white">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
                  Purple Wariant
                </span>
                <h3 className="text-xl font-bold font-heading">
                  Topologia Spektralna
                </h3>
                <p className="text-sm text-purple-100/70 font-body">
                  Na hover ramka rozszczepia światło (aberracja chromatyczna) na
                  cyjan i fiolet, naśladując pryzmat grubego szkła.
                </p>
              </div>
            </Box2>

            {/* Karta 4: Modal (Statyczna - brak interactive) */}
            <Box2 variant="modal">
              <div className="space-y-2 text-white">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Modal Wariant
                </span>
                <h3 className="text-xl font-bold font-heading">
                  Frozen Glass 3.0
                </h3>
                <p className="text-sm text-slate-300 font-body">
                  Ta karta leży płasko. Dzięki <code>color-mix</code> tło jest
                  transparentne i potęguje złudzenie mrożonego szkła.
                </p>
              </div>
            </Box2>

            {/* Karta 5: Purple Klasyczna */}
            <Box2 variant="purple">
              <div className="text-white/80">
                <p className="font-mono text-xs text-purple-300 mb-1">
                  Standard Geometry
                </p>
                <p className="font-body">
                  Klasyczny, fioletowy prostokąt bez modyfikatorów.
                </p>
              </div>
            </Box2>

            {/* Karta 6: Purple ze ścięciem */}
            <Box2 variant="purple" hasArc>
              <div className="text-white/80">
                <p className="font-mono text-xs text-purple-300 mb-1">
                  Arc Geometry
                </p>
                <p className="font-body">
                  Fioletowa karta z kosmicznym, uciętym rogiem.
                </p>
              </div>
            </Box2>

            {/* Karta 7: Premium ze ścięciem */}
            <Box2 variant="premium" hasArc>
              <div className="text-white/80">
                <p className="font-mono text-xs text-amber-400 mb-1">
                  Premium Static Arc
                </p>
                <p className="font-body">
                  Złota struktura geometryczna z wymuszonym cięciem wektora.
                </p>
              </div>
            </Box2>
          </div>
        </section>

        {/* ================================================================
            SEKCJA SIGNUP (Inlined z dawnego Signup)
        ================================================================ */}
        <section className="py-12 border-t border-white/10 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-heading font-bold text-gold-400">
              Ready to earn with tips?
            </h2>
            <p className="font-body text-teal-100/60 max-w-lg mx-auto">
              Sign up as a creator and launch your tipping page today. Wypróbuj
              też focus tabulatorem, aby odpalić rezonans jądrowy 0.2Hz.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button variant="primary" size="lg">
              Sign Up as Creator
            </Button>
            <p className="font-body text-sm text-teal-100/40">
              Already have an account?{" "}
              <Button variant="link" href="/login">
                Log In
              </Button>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
