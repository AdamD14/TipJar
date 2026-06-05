import { Box } from "@/components/ui/forms/Box";

export default function Page() {
  return (
    <main className="min-h-screen bg-teal-250 p-4">
      <div className="max-w-5xl w-full space-y-8">
        {/* Nagłówek strony testowej */}
        <header className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Siatka Testowa: Silnik Geometrii Box
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Poniższe karty używają maski SVG <code>objectBoundingBox</code>,
            gradientu oświetlenia 110° oraz wektorowej ochrony linii.
          </p>
        </header>

        {/* Bento Grid z Twojej prezentacji (gap-6 to dokładnie 24px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Karta 1: Base (Teal) + Interaktywna */}
          <Box variant="base" interactive>
            <div className="space-y-2 text-white">
              <span className="text-xs uppercase tracking-wider text-teal-300">
                Wariant: Base
              </span>
              <h2 className="text-xl font-bold">Zoptymalizowana Fala</h2>
              <p className="text-sm text-teal-100/70">
                Najedź na mnie myszką. Zobaczysz płynne przesunięcie gradientu
                (hardware acceleration) i uniesienie karty.
              </p>
            </div>
          </Box>

          {/* Karta 2: Premium (Gold) + Interaktywna */}
          <Box variant="premium" interactive>
            <div className="space-y-2 text-white">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Wariant: Premium
              </span>
              <h2 className="text-xl font-bold text-amber-100">
                Luksusowa Refrakcja
              </h2>
              <p className="text-sm text-amber-100/70">
                Kąt 110 stopni symuluje naturalne, asymetryczne opadanie światła
                z góry i z lewej strony. Wektorowa ramka ma stałą grubość.
              </p>
            </div>
          </Box>

          {/* Karta 3: Purple + Interaktywna */}
          <Box variant="purple" interactive>
            <div className="space-y-2 text-white">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
                Wariant: Purple
              </span>
              <h2 className="text-xl font-bold">Topologia Connection</h2>
              <p className="text-sm text-purple-100/70">
                Maska idealnie dopasowuje się do wymiarów karty bez używania
                jakichkolwiek zapytań @media w CSS.
              </p>
            </div>
          </Box>

          {/* Karta 4: Modal (Statyczna - brak interactive) */}
          <Box variant="modal">
            <div className="space-y-2 text-white">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Wariant: Modal
              </span>
              <h2 className="text-xl font-bold text-slate-200">
                Frozen Glass 3.0
              </h2>
              <p className="text-sm text-slate-400">
                Ta karta nie ma flagi <code>interactive</code>. Leży płasko, nie
                zmienia tła pod wpływem myszki i służy jako czysty kontener na
                dane.
              </p>
            </div>
          </Box>

          {/* TA KARTA BĘDZIE ZWYKŁYM PROSTOKĄTEM (bo nie ma hasArc) */}
          <Box variant="purple">
            <p>Jestem klasycznym, fioletowym prostokątem.</p>
          </Box>

          {/* TA KARTA DOSTANIE TWÓJ LUKSUSOWY ŚCIĘTY RÓG */}
          <Box variant="purple" hasArc>
            <p>Jestem fioletową kartą z kosmicznym, ściętym rogiem!</p>
          </Box>

          {/* MOŻESZ TEŻ ŚCIĄĆ KAŻDY INNY KOLOR */}
          <Box variant="premium" hasArc>
            <p>Złota karta też dostała ścięcie rogu.</p>
          </Box>
        </div>
      </div>
    </main>
  );
}
