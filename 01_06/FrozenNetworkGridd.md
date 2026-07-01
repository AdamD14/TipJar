```tsx
import React, { useMemo } from "react";

interface FrozenNetworkGridProps {
  /**
   * Opacity całej siatki (domyślnie 0.08, jak w dokumencie)
   */
  opacity?: number;
  /**
   * Kolor linii siatki (domyślnie `#FFD700` – żółty)
   */
  lineColor?: string;
  /**
   * Rozmiar komórki siatki w pikselach (domyślnie 40)
   */
  cellSize?: number;
  /**
   * Czy renderować jako osobny element SVG w tle,
   * czy tylko zdefiniować `<defs>` z patternem do użycia przez rodzica
   */
  mode?: "standalone" | "defs-only";
}

const PATTERN_ID = "frozen-network-grid";

/**
 * Komponent definiujący wektorową siatkę "Frozen Network Grid"
 * do użycia jako tło modala lub innych komponentów.
 *
 * W trybie `standalone` renderuje pełny SVG wypełniający kontener.
 * W trybie `defs-only` zwraca tylko `<defs>` z patternem,
 * które rodzic może umieścić w swoim `<svg>`.
 */
export const FrozenNetworkGrid: React.FC<FrozenNetworkGridProps> = React.memo(
  ({
    opacity = 0.08,
    lineColor = "#FFD700",
    cellSize = 40,
    mode = "standalone",
  }) => {
    const patternDefs = useMemo(
      () => (
        <defs>
          <pattern
            id={PATTERN_ID}
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            {/* Poziome linie siatki – tylko góra i dół komórki */}
            <line
              x1="0"
              y1="0"
              x2={cellSize}
              y2="0"
              stroke={lineColor}
              strokeWidth="1"
              strokeOpacity="1"
            />
            <line
              x1="0"
              y1={cellSize}
              x2={cellSize}
              y2={cellSize}
              stroke={lineColor}
              strokeWidth="1"
              strokeOpacity="1"
            />

            {/* Pionowe linie siatki – tylko lewa i prawa krawędź komórki */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={cellSize}
              stroke={lineColor}
              strokeWidth="1"
              strokeOpacity="1"
            />
            <line
              x1={cellSize}
              y1="0"
              x2={cellSize}
              y2={cellSize}
              stroke={lineColor}
              strokeWidth="1"
              strokeOpacity="1"
            />
          </pattern>
        </defs>
      ),
      [cellSize, lineColor]
    );

    if (mode === "defs-only") {
      return patternDefs;
    }

    return (
      <svg
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        {patternDefs}
        <rect width="100%" height="100%" fill={`url(#${PATTERN_ID})`} />
      </svg>
    );
  }
);

FrozenNetworkGrid.displayName = "FrozenNetworkGrid";
```

---

## Co się zmieniło

- **Jedna opacity** – tylko `style={{ opacity }}` na `<svg>`; linie mają `strokeOpacity="1"`.  
  Nie ma już efektu `opacity * opacity`.
- **Czyste deps w `useMemo`** – tylko `[cellSize, lineColor]`.  
  `PATTERN_ID` jest stałą poza komponentem, `opacity` nie wpływa na kształt patternu.
- **Konsekwentne `<defs>`** – w obu trybach zwracamy dokładnie to samo `<defs>`, tylko w `standalone` dodatkowo opakowujemy w `<svg>` z wypełnieniem.
- **`React.memo`** – komponent nie rerenderuje się przy niezmienionych propsach.  
  Jeśli `opacity` będzie się często zmieniać (np. animacja), warto rozważyć wydzielenie jej kontroli poza ten komponent (np. osobny wrapper z `transition-opacity`).

---

## Przykład użycia w PremiumModal (bez zmian w stosunku do poprzedniej wersji)

```tsx
// Wewnątrz modala:
<svg
  aria-hidden="true"
  className="absolute inset-0 pointer-events-none"
  style={{ opacity: 0.08 }}
>
  <FrozenNetworkGrid mode="defs-only" />
  <rect width="100%" height="100%" fill="url(#frozen-network-grid)" />
</svg>
```

Teraz siatka będzie miała dokładnie taką przezroczystość, jaką podasz w `opacity`, bez nieoczekiwanego przyciemnienia.


W defs-only zwracasz <defs>, ale w standalone też wrzucasz {patternDefs} (czyli zagnieżdżone <defs>). Działa, ale nie jest to najładniejsze.
Można by w standalone robić <defs>{patternContent}</defs> bez opakowania, ale to już nitpicking.
strokeOpacity="1" jako string — lepiej strokeOpacity={1} (number).
Brak key przy dynamicznym renderze patternu nie jest problemem, ale przy bardzo częstych zmianach cellSize/lineColor mógłby być.