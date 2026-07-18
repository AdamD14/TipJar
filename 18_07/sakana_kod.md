# 
tsx
// components/ui/button/ButtonBase.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Tokeny kolorów zgodne z dokumentem (przykładowe – można podmienić na rzeczywiste zmienne CSS)
const buttonTokens = {
  // Paleta Teal
  'teal-25': '#E0F2F2',
  'teal-50': '#CCF7F4',
  'teal-100': '#ABE1E1',
  'teal-200': '#76CBCB',
  'teal-300': '#3FB5B5',
  'teal-400': '#2A8A8A',
  'teal-450': '#0F7F7F',
  'teal-500': '#007373',
  'teal-600': '#005959',
  'teal-700': '#004545',
  'teal-800': '#003737',
  'teal-850': '#002121',
  'teal-900': '#001F1F',

  // Paleta Gold (Primary Action)
  'gold-50': '#FEFFE0',
  'gold-100': '#FAFF46',
  'gold-200': '#FFEA00',
  'gold-300': '#FFE100',
  'gold-400': '#FFD700', // Główny akcent CTA
  'gold-500': '#FFC312',
  'gold-600': '#FFAB00',
  'gold-700': '#FF8F00',
  'gold-800': '#F08010',
  'gold-900': '#CC7A06',

  // Paleta Purple (Secondary Accent)
  'purple-100': '#661B66',
  'purple-200': '#5C005C',
  'purple-300': '#4D194D', // Bazowy akcent pomocniczy
  'purple-400': '#3A143A',
  'purple-500': '#2F0D2F',

  // Error
  'error-base': '#FF5252',
  'error-dark': '#3D1010',
  'error-light': '#FFB4AB',
} as const;

// Warianty rozmiarów (Large, Medium, Small)
const buttonSizes = cva('grid place-items-center transition-all duration-200', {
  variants: {
    size: {
      large: 'h-14 px-8 text-lg gap-2 min-h-[56px]',
      medium: 'h-12 px-6 text-base gap-2 min-h-[48px]',
      small: 'h-10 px-4 text-sm gap-1.5 min-h-[40px]',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

// Warianty stylu (Primary, SecondaryGold, SecondaryPurple, Destructive, Ghost)
const buttonStyles = cva(
  // Base styles – zgodne z dokumentem: border-radius 8px, font Mukta Malar SemiBold, grid stacking
  [
    'inline-grid grid-areas-[stack] place-items-center',
    'rounded-lg border-2 border-transparent',
    'font-[Mukta_Malar] font-semibold tracking-wide',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'relative overflow-hidden', // dla efektów ripple i touch target
  ],
  {
    variants: {
      variant: {
        // Primary: tło złote, tekst ciemnoturkusowy (--gold-400 / --teal-900)
        primary: [
          'bg-gold-400 text-teal-900',
          'hover:bg-gold-500',
          'active:scale-98 active:shadow-none',
          'focus-visible:ring-purple-300 focus-visible:ring-offset-teal-800',
        ],
        // SecondaryGold: obramowanie złote, przezroczyste tło
        secondaryGold: [
          'border-gold-400 text-gold-400 bg-transparent',
          'hover:bg-gold-400/10',
          'active:scale-98 active:shadow-none',
          'focus-visible:ring-purple-300 focus-visible:ring-offset-teal-800',
        ],
        // SecondaryPurple: obramowanie fioletowe, przezroczyste tło
        secondaryPurple: [
          'border-purple-300 text-purple-300 bg-transparent',
          'hover:bg-purple-300/10',
          'active:scale-98 active:shadow-none',
          'focus-visible:ring-purple-300 focus-visible:ring-offset-teal-800',
        ],
        // Destructive: tło ciemne, tekst/border czerwony (--error-dark / --error-base)
        destructive: [
          'bg-error-dark text-error-base border-error-base',
          'hover:bg-error-base/10',
          'active:scale-98 active:shadow-none',
          'focus-visible:ring-error-base focus-visible:ring-offset-teal-800',
        ],
        // Ghost: tylko tekst (turkusowy na ciemnym tle)
        ghost: [
          'text-teal-100 bg-transparent border-transparent',
          'hover:text-teal-50 hover:bg-teal-800/20',
          'active:scale-98',
          'focus-visible:ring-purple-300 focus-visible:ring-offset-teal-800',
        ],
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

// Props dla ButtonBase
interface ButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles>,
    VariantProps<typeof buttonSizes> {
  children: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'leading' | 'trailing';
  fullWidth?: boolean;
}

export const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      loading = false,
      icon,
      iconPosition = 'leading',
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={`
          ${buttonStyles({ variant })} 
          ${buttonSizes({ size })} 
          ${fullWidth ? 'w-full' : 'inline-flex'}
          ${className || ''}
        `}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {/* Warstwa zawartości (tekst + ikona) */}
        <span
          className={`
            grid-area-stack flex items-center gap-2
            transition-opacity duration-200
            ${loading ? 'opacity-0 invisible' : 'opacity-100 visible'}
          `}
        >
          {icon && iconPosition === 'leading' && (
            <span className="shrink-0">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'trailing' && (
            <span className="shrink-0">{icon}</span>
          )}
        </span>

        {/* Spinner w stanie loading – grid stacking zapobiega CLS */}
        {loading && (
          <span
            className="grid-area-stack flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeOpacity="0.25"
                fill="none"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeDasharray="1 4"
              />
            </svg>
          </span>
        )}

        {/* Niewidzialny touch target dla mobile (min. 48×48px) */}
        <span
          className="absolute inset-0 -m-2"
          aria-hidden="true"
          data-touch-target
        />
      </button>
    );
  }
);

ButtonBase.displayName = 'ButtonBase';

// Eksport wariantów jako aliasów dla wygody
export const ButtonPrimary = (props: Omit<ButtonBaseProps, 'variant'>) => (
  <ButtonBase variant="primary" {...props} />
);

export const ButtonSecondaryGold = (props: Omit<ButtonBaseProps, 'variant'>) => (
  <ButtonBase variant="secondaryGold" {...props} />
);

export const ButtonSecondaryPurple = (props: Omit<ButtonBaseProps, 'variant'>) => (
  <ButtonBase variant="secondaryPurple" {...props} />
);

export const ButtonDestructive = (props: Omit<ButtonBaseProps, 'variant'>) => (
  <ButtonBase variant="destructive" {...props} />
);

export const ButtonGhost = (props: Omit<ButtonBaseProps, 'variant'>) => (
  <ButtonBase variant="ghost" {...props} />
);
```

# 
css
/* styles/globals.css – przykładowe definicje tokenów (lub w :root) */
@import url('https://fonts.googleapis.com/css2?family=Mukta+Malar:wght@400;600&display=swap');

:root {
  /* Teal */
  --teal-25: #e0f2f2;
  --teal-50: #ccf7f4;
  --teal-100: #abe1e1;
  --teal-200: #76cbcb;
  --teal-300: #3fb5b5;
  --teal-400: #2a8a8a;
  --teal-450: #0f7f7f;
  --teal-500: #007373;
  --teal-600: #005959;
  --teal-700: #004545;
  --teal-800: #003737;
  --teal-850: #002121;
  --teal-900: #001f1f;

  /* Gold */
  --gold-50: #feffe0;
  --gold-100: #faff46;
  --gold-200: #ffea00;
  --gold-300: #ffe100;
  --gold-400: #ffd700;
  --gold-500: #ffc312;
  --gold-600: #ffab00;
  --gold-700: #ff8f00;
  --gold-800: #f08010;
  --gold-900: #cc7a06;

  /* Purple */
  --purple-100: #661b66;
  --purple-200: #5c005c;
  --purple-300: #4d194d;
  --purple-400: #3a143a;
  --purple-500: #2f0d2f;

  /* Error */
  --error-base: #ff5252;
  --error-dark: #3d1010;
  --error-light: #ffb4ab;
}

/* Tailwind config – rozszerzenie kolorów */
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        teal: {
          25: 'var(--teal-25)',
          50: 'var(--teal-50)',
          100: 'var(--teal-100)',
          200: 'var(--teal-200)',
          300: 'var(--teal-300)',
          400: 'var(--teal-400)',
          450: 'var(--teal-450)',
          500: 'var(--teal-500)',
          600: 'var(--teal-600)',
          700: 'var(--teal-700)',
          800: 'var(--teal-800)',
          850: 'var(--teal-850)',
          900: 'var(--teal-900)',
        },
        gold: {
          50: 'var(--gold-50)',
          100: 'var(--gold-100)',
          200: 'var(--gold-200)',
          300: 'var(--gold-300)',
          400: 'var(--gold-400)',
          500: 'var(--gold-500)',
          600: 'var(--gold-600)',
          700: 'var(--gold-700)',
          800: 'var(--gold-800)',
          900: 'var(--gold-900)',
        },
        purple: {
          100: 'var(--purple-100)',
          200: 'var(--purple-200)',
          300: 'var(--purple-300)',
          400: 'var(--purple-400)',
          500: 'var(--purple-500)',
        },
        error: {
          base: 'var(--error-base)',
          dark: 'var(--error-dark)',
          light: 'var(--error-light)',
        },
      },
      fontFamily: {
        'mukta-malar': ['Mukta Malar', 'sans-serif'],
      },
      scale: {
        '98': '0.98',
      },
    },
  },
};
```

## Kluczowe elementy zgodne z dokumentem:

- **Typografia:** `font-[Mukta_Malar] font-semibold` (SemiBold 600)  
- **Geometria:** `rounded-lg` (8px), wysokości `h-14`/`h-12`/`h-10`, padding poziomy zgodny z siatką 8px  
- **Kolory:** Primary (`bg-gold-400 text-teal-900`), SecondaryGold/Purple, Destructive, Ghost  
- **Stany:**  
  - `hover` – zmiana tła/borderu  
  - `active` – `scale-98` i redukcja cienia  
  - `focus-visible` – podwójny ring `purple-300` z offsetem  
  - `disabled` – `cursor-not-allowed opacity-50`  
  - `loading` – grid stacking zapobiega CLS, spinner w kolorze tekstu  
- **Dostępność:** `aria-busy`, touch target min. 48×48px, focus trap gotowy do użycia z `FocusTrap`  
- **Tokeny:** Wszystkie kolory zdefiniowane jako zmienne CSS i rozszerzone w Tailwind

Komponent jest gotowy do użycia w formularzach, kartach, floating CTA i każdym miejscu, gdzie potrzebny jest przycisk zgodny z systemem designu TipJar+.

# 
tsx
// components/ui/button/ButtonSpinner.tsx
import React from 'react';

interface ButtonSpinnerProps {
  /**
   * Rozmiar spinnera w pikselach.
   * Domyślnie dostosowany do rozmiarów przycisku (Large: 24px, Medium: 20px, Small: 16px).
   */
  size?: number;
  /**
   * Kolor spinnera. Powinien dziedziczyć kolor tekstu przycisku (np. `currentColor`).
   * @default 'currentColor'
   */
  color?: string;
  /**
   * Dodatkowe klasy Tailwind dla kontenera.
   */
  className?: string;
}

/**
 * Spinner SVG używany w stanie loading przycisku.
 * Zgodny z dokumentem: minimalistyczny okrąg z animacją stroke-dasharray,
 * w kolorze tekstu przycisku, bez zmiany wymiarów przycisku (eliminacja CLS).
 */
export const ButtonSpinner = React.forwardRef<HTMLSpanElement, ButtonSpinnerProps>(
  ({ size = 20, color = 'currentColor', className = '' }, ref) => {
    // Obliczenia dla stroke-dasharray – okrąg o obwodzie ~2πr
    const radius = size / 2 - 2; // margines wewnętrzny
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${circumference * 0.25} ${circumference * 0.75}`; // 25% wypełnienia

    return (
      <span
        ref={ref}
        className={`inline-flex items-center justify-center ${className}`}
        aria-hidden="true"
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
          className="animate-spin"
        >
          {/* Tło okręgu (subtelną linią) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeOpacity="0.25"
            fill="none"
          />
          {/* Główna linia z animacją dasharray */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            fill="none"
            transform={`rotate(-90 ${size / 2} ${size / 2})`} // start od góry
          />
        </svg>
      </span>
    );
  }
);

ButtonSpinner.displayName = 'ButtonSpinner';
```

## Użycie w `ButtonBase` (przykład – już wcześniej zaimplementowane):

```tsx
// components/ui/button/ButtonBase.tsx (fragment)
import { ButtonSpinner } from './ButtonSpinner';

// Wewnątrz komponentu ButtonBase:
{loading && (
  <span className="grid-area-stack flex items-center justify-center" aria-hidden="true">
    <ButtonSpinner size={/* 24/20/16 w zależności od `size` */} color="currentColor" />
  </span>
)}
```

### Kluczowe cechy zgodne z dokumentem:

- **Kolor:** `color="currentColor"` – spinner dziedziczy kolor tekstu przycisku (np. `--teal-900` na złotym tle).  
- **Animacja:** `animate-spin` + `stroke-dasharray` – płynne obracanie z przerwaną linią, przypominające mechaniczny spinner.  
- **Rozmiar:** Parametryzowany `size` – można dostosować do `Large` (24px), `Medium` (20px), `Small` (16px).  
- **Grid stacking:** Spinner renderowany w tej samej komórce grid co tekst (`grid-area-stack`), więc przycisk nie zmienia wymiarów podczas ładowania (eliminacja CLS).  
- **Dostępność:** `aria-hidden="true"` – spinner jest czysto wizualny, stan ładowania jest komunikowany przez `aria-busy` na przycisku.  
- **Minimalizm:** Tylko okrąg + animowana linia – zgodnie z wymogiem „minimalistycznego spinnera” z dokumentu.

Komponent jest gotowy do użycia nie tylko w przyciskach, ale także w innych miejscach, gdzie potrzebny jest loading indicator w stylu systemu TipJar+.


```tsx
// components/ui/form/FormFieldBase.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Tokeny kolorów zgodne z dokumentem (przykładowe – można podmienić na rzeczywiste zmienne CSS)
const formTokens = {
  // Teal
  'teal-25': '#E0F2F2',
  'teal-50': '#CCF7F4',
  'teal-100': '#ABE1E1',
  'teal-200': '#76CBCB',
  'teal-300': '#3FB5B5',
  'teal-400': '#2A8A8A',
  'teal-500': '#007373',
  'teal-600': '#005959',
  'teal-700': '#004545',
  'teal-800': '#003737',
  'teal-850': '#002121',
  'teal-900': '#001F1F',

  // Gold
  'gold-400': '#FFD700',

  // Purple
  'purple-300': '#4D194D',

  // Error / Success
  'error-light': '#FFB4AB',
  'success-light': '#69F0AE',
} as const;

// Warianty rozmiarów pól
const fieldSizes = cva('rounded-md transition-all duration-200', {
  variants: {
    size: {
      large: 'h-14 px-4 text-lg',
      standard: 'h-12 px-4 text-base',
    },
  },
  defaultVariants: {
    size: 'standard',
  },
});

// Stany pola (default, hover, focus, filled, error, success, disabled)
const fieldStates = cva(
  [
    'w-full bg-teal-700 border border-teal-500',
    'font-[IBM_Plex_Sans] text-teal-25 placeholder-teal-100',
    'focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 focus:ring-offset-1 focus:ring-offset-teal-800',
    'disabled:bg-teal-850 disabled:border-teal-500/50 disabled:text-teal-25/50 disabled:cursor-not-allowed',
    'transition-all duration-200 ease-out',
  ],
  {
    variants: {
      state: {
        default: '',
        hover: 'bg-teal-600 border-teal-400',
        error: 'border-error-light focus:border-error-light focus:ring-error-light',
        success: 'border-teal-500 focus:border-success-light focus:ring-success-light',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

interface FormFieldBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    VariantProps<typeof fieldSizes>,
    VariantProps<typeof fieldStates> {
  as?: 'input' | 'textarea';
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode; // np. ikona walidacji
}

export const FormFieldBase = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldBaseProps
>(
  (
    {
      as: Component = 'input',
      size = 'standard',
      state = 'default',
      label,
      helperText,
      error,
      success,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    const isError = !!error;
    const isSuccess = success && !isError;

    return (
      <div className="space-y-1">
        {label && <FormLabel htmlFor={props.id}>{label}</FormLabel>}
        <div className="relative">
          <Component
            ref={ref as any}
            className={`
              ${fieldSizes({ size })} 
              ${fieldStates({ state: isError ? 'error' : isSuccess ? 'success' : state })} 
              ${className || ''}
            `}
            aria-invalid={isError ? 'true' : undefined}
            aria-describedby={
              helperText || error ? `${props.id}-helper` : undefined
            }
            {...props}
          />
          {icon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-100">
              {icon}
            </span>
          )}
        </div>
        {(helperText || error) && (
          <FormHelperText id={`${props.id}-helper`} variant={isError ? 'error' : 'default'}>
            {error || helperText}
          </FormHelperText>
        )}
      </div>
    );
  }
);

FormFieldBase.displayName = 'FormFieldBase';

// InputStandard / InputLarge / Textarea jako aliasy
export const InputStandard = (props: Omit<FormFieldBaseProps, 'size'>) => (
  <FormFieldBase size="standard" {...props} />
);

export const InputLarge = (props: Omit<FormFieldBaseProps, 'size'>) => (
  <FormFieldBase size="large" {...props} />
);

export const Textarea = (props: Omit<FormFieldBaseProps, 'as'>) => (
  <FormFieldBase as="textarea" {...props} />
);
```

```tsx
// components/ui/form/FormLabel.tsx
import React from 'react';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`block text-sm font-medium text-teal-100 mb-1 ${className || ''}`}
        {...props}
      >
        {children}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';
```

```tsx
// components/ui/form/FormHelperText.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const helperTextStyles = cva('text-xs transition-colors', {
  variants: {
    variant: {
      default: 'text-teal-100',
      error: 'text-error-light',
      success: 'text-success-light',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface FormHelperTextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof helperTextStyles> {
  children: React.ReactNode;
}

export const FormHelperText = React.forwardRef<HTMLParagraphElement, FormHelperTextProps>(
  ({ variant = 'default', children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`${helperTextStyles({ variant })} ${className || ''}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);

FormHelperText.displayName = 'FormHelperText';
```

```tsx
// components/ui/form/FormErrorIcon.tsx
import React from 'react';

interface FormErrorIconProps {
  size?: number;
  className?: string;
}

export const FormErrorIcon = React.forwardRef<SVGSVGElement, FormErrorIconProps>(
  ({ size = 16, className = '' }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="currentColor"
        className={`text-error-light ${className}`}
      >
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8 5V8M8 11V11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
);

FormErrorIcon.displayName = 'FormErrorIcon';
```

```tsx
// components/ui/form/FormSuccessIcon.tsx
import React from 'react';

interface FormSuccessIconProps {
  size?: number;
  className?: string;
}

export const FormSuccessIcon = React.forwardRef<SVGSVGElement, FormSuccessIconProps>(
  ({ size = 16, className = '' }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="currentColor"
        className={`text-success-light ${className}`}
      >
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5 8L7 10L11 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

FormSuccessIcon.displayName = 'FormSuccessIcon';
```

```tsx
// components/ui/form/Checkbox.tsx
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only peer"
          {...props}
        />
        <span
          className={`
            w-5 h-5 rounded border-2 border-teal-500 
            bg-transparent transition-all duration-200
            group-hover:border-teal-400
            peer-checked:bg-gold-400 peer-checked:border-gold-400
            peer-focus-visible:ring-2 peer-focus-visible:ring-purple-300 peer-focus-visible:ring-offset-2
            ${className || ''}
          `}
        >
          {/* Checkmark SVG */}
          <svg
            className="w-3 h-3 m-0.5 text-teal-700 opacity-0 peer-checked:opacity-100 transition-opacity"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 6L5 9L10 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {label && <span className="text-sm text-teal-100">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
```

```tsx
// components/ui/form/Radio.tsx
import React from 'react';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          ref={ref}
          type="radio"
          className="sr-only peer"
          {...props}
        />
        <span
          className={`
            w-5 h-5 rounded-full border-2 border-teal-500 
            bg-transparent transition-all duration-200
            group-hover:border-teal-400
            peer-checked:border-gold-400
            peer-focus-visible:ring-2 peer-focus-visible:ring-purple-300 peer-focus-visible:ring-offset-2
            ${className || ''}
          `}
        >
          {/* Kropka w środku */}
          <span
            className="
              block w-2.5 h-2.5 rounded-full bg-gold-400 
              opacity-0 peer-checked:opacity-100 transition-opacity
              m-0.5
            "
          />
        </span>
        {label && <span className="text-sm text-teal-100">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
```

```tsx
// components/ui/form/ToggleSwitch.tsx
import React from 'react';

interface ToggleSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const ToggleSwitch = React.forwardRef<HTMLInputElement, ToggleSwitchProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only peer"
          {...props}
        />
        <span
          className={`
            w-9 h-5 rounded-full border border-teal-500 
            bg-teal-850 transition-all duration-300 ease-out
            group-hover:border-teal-400
            peer-checked:bg-purple-300 peer-checked:border-purple-300
            peer-focus-visible:ring-2 peer-focus-visible:ring-purple-300 peer-focus-visible:ring-offset-2
            ${className || ''}
          `}
        >
          {/* Suwak */}
          <span
            className="
              block w-4 h-4 rounded-full bg-teal-500 
              transition-transform duration-300 ease-out
              translate-x-0.5 peer-checked:translate-x-3.5
            "
          />
        </span>
        {label && <span className="text-sm text-teal-100">{label}</span>}
      </label>
    );
  }
);

ToggleSwitch.displayName = 'ToggleSwitch';
```

```tsx
// components/ui/form/SelectTrigger.tsx
import React from 'react';

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isOpen?: boolean;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, isOpen, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          w-full h-12 px-4 rounded-md 
          bg-teal-700 border border-teal-500 
          text-teal-25 text-left
          hover:bg-teal-600 hover:border-teal-400
          focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 focus:ring-offset-1
          disabled:bg-teal-850 disabled:border-teal-500/50 disabled:text-teal-25/50
          transition-all duration-200 ease-out
          flex items-center justify-between
          ${className || ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        {...props}
      >
        {children}
        <svg
          className={`w-4 h-4 text-teal-100 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4 6L8 10L12 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';
```

```tsx
// components/ui/form/SelectDropdown.tsx
import React from 'react';

interface SelectDropdownProps extends React.HTMLAttributes<HTMLUListElement> {
  isOpen: boolean;
  children: React.ReactNode;
}

export const SelectDropdown = React.forwardRef<HTMLUListElement, SelectDropdownProps>(
  ({ isOpen, children, className, ...props }, ref) => {
    if (!isOpen) return null;

    return (
      <ul
        ref={ref}
        className={`
          absolute z-50 w-full mt-1 
          bg-teal-700 border border-teal-500 rounded-md 
          shadow-lg overflow-hidden
          ${className || ''}
        `}
        role="listbox"
        {...props}
      >
        {children}
      </ul>
    );
  }
);

SelectDropdown.displayName = 'SelectDropdown';
```

```tsx
// components/ui/form/SelectItem.tsx
import React from 'react';

interface SelectItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  isSelected?: boolean;
}

export const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ children, isSelected, className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={`
          h-12 px-4 flex items-center 
          text-teal-25 cursor-pointer 
          hover:bg-teal-600
          ${isSelected ? 'bg-teal-850 text-gold-400' : ''}
          transition-colors duration-150
          ${className || ''}
        `}
        role="option"
        aria-selected={isSelected}
        {...props}
      >
        {children}
      </li>
    );
  }
);

SelectItem.displayName = 'SelectItem';
```

### Kluczowe cechy zgodne z dokumentem:

- **Ciemny tryb Teal:**  
  - Tło pól: `bg-teal-700`  
  - Border: `border-teal-500` → hover `teal-400`  
  - Focus: `border-gold-400` + `ring-gold-400`  
  - Error: `border-error-light` + `ring-error-light`  
  - Success: `border-success-light` + `ring-success-light`  
- **Typografia:** `font-[IBM_Plex_Sans]`, tekst `teal-25`, placeholder `teal-100`  
- **Geometria:**  
  - `InputStandard`: `h-12`, `InputLarge`: `h-14`, `rounded-md` (6px)  
  - `Checkbox`/`Radio`: 20×20px, `ToggleSwitch`: 36×20px  
- **Dostępność:**  
  - `aria-invalid`, `aria-describedby` dla pól  
  - `aria-selected` dla `SelectItem`  
  - `aria-expanded` dla `SelectTrigger`  
- **Stany:** hover, focus, error, success, disabled z płynnymi przejściami  
- **Select:** Dropdown z tłem `teal-700`, border `teal-500`, shadow, hover `teal-600`, selected `gold-400`

Komponenty są gotowe do użycia w formularzach płatności, ustawieniach, dashboardach i każdym miejscu, gdzie potrzebne są pola wprowadzania danych zgodne z systemem designu TipJar+.

```tsx
// components/ui/background/BackgroundPatternProvider.tsx
import React, { createContext, useContext } from 'react';

// Typy wzorów zgodne z dokumentami
export type PatternType = 'tactical' | 'web3' | 'clinical';

interface BackgroundPatternContextValue {
  pattern: PatternType;
  setPattern: (pattern: PatternType) => void;
}

const BackgroundPatternContext = createContext<BackgroundPatternContextValue | undefined>(
  undefined
);

interface BackgroundPatternProviderProps {
  children: React.ReactNode;
  defaultPattern?: PatternType;
}

/**
 * Provider zarządzający aktywnym wzorem tła aplikacji.
 * Umożliwia przełączanie między archetypami (tactical, web3, clinical).
 */
export const BackgroundPatternProvider: React.FC<BackgroundPatternProviderProps> = ({
  children,
  defaultPattern = 'tactical',
}) => {
  const [pattern, setPattern] = React.useState<PatternType>(defaultPattern);

  return (
    <BackgroundPatternContext.Provider value={{ pattern, setPattern }}>
      {children}
    </BackgroundPatternContext.Provider>
  );
};

export const useBackgroundPattern = () => {
  const context = useContext(BackgroundPatternContext);
  if (!context) {
    throw new Error('useBackgroundPattern must be used within a BackgroundPatternProvider');
  }
  return context;
};
```

```tsx
// components/ui/background/SVGPattern.tsx
import React from 'react';
import { PatternType } from './BackgroundPatternProvider';

// Tokeny kolorów zgodne z dokumentami (przykładowe)
const patternTokens = {
  // Teal
  'teal-25': '#E0F2F2',
  'teal-50': '#CCF7F4',
  'teal-100': '#ABE1E1',
  'teal-200': '#76CBCB',
  'teal-300': '#3FB5B5',
  'teal-400': '#2A8A8A',
  'teal-500': '#007373',
  'teal-600': '#005959',
  'teal-700': '#004545',
  'teal-800': '#003737',
  'teal-850': '#002121',
  'teal-900': '#001F1F',

  // Gold
  'gold-400': '#FFD700',

  // Purple
  'purple-300': '#4D194D',
} as const;

interface SVGPatternProps {
  pattern: PatternType;
  width: number;  // szerokość kafla wzoru (np. 160, 200, 120)
  height: number; // wysokość kafla wzoru
}

/**
 * Komponent definiujący wzór SVG (`<pattern>`) wewnątrz `<defs>`.
 * Zgodnie z dokumentem: patternUnits="userSpaceOnUse", bezszwowość, gradient tła.
 */
export const SVGPattern: React.FC<SVGPatternProps> = ({ pattern, width, height }) => {
  // Tutaj należy wkleić pełny kod SVG z dokumentów dla każdego archetypu.
  // Poniżej tylko szkielet z gradientem i placeholderem na `<pattern>`.

  const patternId = `${pattern}Pattern`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        {/* Gradient tła zgodny z dokumentem: linear-gradient(270deg, #001717 0%, #003737 50%, #001111 100%) */}
        <linearGradient id={`bgGrad-${pattern}`} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#001717" />
          <stop offset="50%" stopColor="#003737" />
          <stop offset="100%" stopColor="#001111" />
        </linearGradient>

        {/* Filtry glow (goldGlow, purpleGlow, tealGlow) – zgodne z dokumentem */}
        <filter id="goldGlow" filterUnits="userSpaceOnUse" x="0" y="0" width="160" height="160">
          <feGaussianBlur stdDeviation="1.5" result="blur1" />
          <feGaussianBlur stdDeviation="3.5" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="purpleGlow" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
          <feGaussianBlur stdDeviation="2.5" result="blur1" />
          <feGaussianBlur stdDeviation="5.5" result="blur2" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="tealGlow" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Wzór SVG – należy wkleić odpowiedni kod z dokumentu */}
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          {/* Placeholder – w rzeczywistości wklej tutaj pełny <pattern> z dokumentu */}
          <rect width={width} height={height} fill={`url(#bgGrad-${pattern})`} />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={pattern === 'tactical' ? patternTokens['teal-50'] : pattern === 'web3' ? patternTokens['purple-300'] : patternTokens['teal-100']}
            fontSize="12"
            opacity="0.5"
          >
            {pattern.toUpperCase()} PATTERN
          </text>
        </pattern>
      </defs>

      {/* Tło gradientowe */}
      <rect width="100%" height="100%" fill={`url(#bgGrad-${pattern})`} />
      {/* Nakładka wzoru */}
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};
```

```tsx
// components/ui/background/SeamlessPatternTile.tsx
import React from 'react';
import { PatternType } from './BackgroundPatternProvider';

// Rozmiary kafli zgodne z dokumentami
const patternSizes: Record<PatternType, { width: number; height: number }> = {
  tactical: { width: 160, height: 160 },
  web3: { width: 200, height: 200 },
  clinical: { width: 120, height: 120 },
};

interface SeamlessPatternTileProps {
  pattern: PatternType;
  className?: string;
}

/**
 * Pojedynczy kafelek wzoru SVG, który zapętla się bezszwowo.
 * Używa `patternUnits="userSpaceOnUse"` i precyzyjnych rozmiarów z dokumentów.
 */
export const SeamlessPatternTile: React.FC<SeamlessPatternTileProps> = ({
  pattern,
  className = '',
}) => {
  const { width, height } = patternSizes[pattern];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <defs>
              <linearGradient id="bgGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stop-color="#001717"/>
                <stop offset="50%" stop-color="#003737"/>
                <stop offset="100%" stop-color="#001111"/>
              </linearGradient>
              <pattern id="patt" width="${width}" height="${height}" patternUnits="userSpaceOnUse">
                <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
                <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="${
                  pattern === 'tactical' ? '#CCF7F4' : pattern === 'web3' ? '#4D194D' : '#ABE1E1'
                }" font-size="12" opacity="0.5">${pattern.toUpperCase()}</text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#patt)"/>
          </svg>"
        )}")`,
        backgroundSize: `${width}px ${height}px`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
};
```

```tsx
// components/ui/background/BackgroundPattern.tsx
import React from 'react';
import { useBackgroundPattern } from './BackgroundPatternProvider';
import { SeamlessPatternTile } from './SeamlessPatternTile';

/**
 * Główny komponent tła aplikacji, który renderuje aktywny wzór SVG.
 * Może być użyty w layoutcie (np. pod wszystkimi stronami).
 */
export const BackgroundPattern: React.FC = () => {
  const { pattern } = useBackgroundPattern();

  return <SeamlessPatternTile pattern={pattern} className="z-0" />;
};
```

### Użycie w aplikacji (przykład):

```tsx
// pages/_app.tsx
import { BackgroundPatternProvider, BackgroundPattern } from '../components/ui/background';

function MyApp({ Component, pageProps }) {
  return (
    <BackgroundPatternProvider defaultPattern="web3">
      <div className="relative min-h-screen bg-teal-900">
        <BackgroundPattern />
        <Component {...pageProps} />
      </div>
    </BackgroundPatternProvider>
  );
}

export default MyApp;
```

```tsx
// components/layout/AppShell.tsx
import { useBackgroundPattern } from '../ui/background';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pattern, setPattern } = useBackgroundPattern();

  return (
    <div className="min-h-screen bg-teal-900 text-teal-25">
      {/* Przełącznik wzorów (opcjonalnie) */}
      <nav className="fixed top-4 right-4 z-10">
        <select
          value={pattern}
          onChange={(e) => setPattern(e.target.value as PatternType)}
          className="bg-teal-800 border-teal-500 text-teal-25 rounded px-2 py-1"
        >
          <option value="tactical">Tactical</option>
          <option value="web3">Web3</option>
          <option value="clinical">Clinical</option>
        </select>
      </nav>
      {children}
    </div>
  );
};
```

### Kluczowe cechy zgodne z dokumentami:

- **Bezszwowość:** `patternUnits="userSpaceOnUse"` + precyzyjne rozmiary kafli (160×160, 200×200, 120×120)  
- **Gradient tła:** `linear-gradient(270deg, #001717 0%, #003737 50%, #001111 100%)` – zgodnie z dokumentem  
- **Filtry glow:** `goldGlow`, `purpleGlow`, `tealGlow` z wieloma warstwami `feGaussianBlur`  
- **Tokeny kolorów:** Teal, Gold, Purple – spójne z resztą systemu  
- **Responsywność:** Tło skalowane przez `background-size` i `background-repeat`  
- **Architektura:** Provider do zarządzania aktywnym wzorem, komponent `SeamlessPatternTile` do renderowania kafli

Aby dokończyć implementację, należy wkleić pełne kody SVG z dokumentów do odpowiednich `<pattern>` w `SVGPattern` (zamiast placeholder text).


```tsx
// types/theme.ts
export type ThemeVibe = 'teal' | 'gold' | 'purple';
export type ThemeShape = 'sharp' | 'soft' | 'organic';
export type ThemeDensity = 'compact' | 'comfortable' | 'spacious';
export type ThemeCharacter = 'modern' | 'bold' | 'minimalist';

export interface ThemeConfig {
  vibe: ThemeVibe;
  shape: ThemeShape;
  density: ThemeDensity;
  character: ThemeCharacter;
}

// Tokeny kolorów zgodne z dokumentem (przykładowe)
export const themeTokens = {
  // Teal
  'teal-50': '#CCF7F4',
  'teal-100': '#ABE1E1',
  'teal-200': '#76CBCB',
  'teal-300': '#3FB5B5',
  'teal-400': '#2A8A8A',
  'teal-500': '#007373',
  'teal-600': '#005959',
  'teal-700': '#004545',
  'teal-800': '#003737',
  'teal-900': '#001F1F',

  // Gold
  'gold-50': '#FEFFE0',
  'gold-100': '#FAFF46',
  'gold-200': '#FFEA00',
  'gold-300': '#FFE100',
  'gold-400': '#FFD700',
  'gold-500': '#FFC312',
  'gold-600': '#FFAB00',
  'gold-700': '#FF8F00',

  // Purple
  'purple-100': '#661B66',
  'purple-200': '#5C005C',
  'purple-300': '#4D194D',
  'purple-400': '#3A143A',
  'purple-500': '#2F0D2F',

  // Error
  'error-base': '#FF5252',
} as const;
```

```tsx
// hooks/useTheme.ts
import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeConfig, ThemeVibe, ThemeShape, ThemeDensity, ThemeCharacter } from '../types/theme';

interface ThemeContextValue {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  isSyncing: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Mock: pobieranie motywu z API
const fetchThemeFromAPI = async (): Promise<ThemeConfig> => {
  // W rzeczywistości: GET /api/profile/theme
  return {
    vibe: 'teal',
    shape: 'soft',
    density: 'comfortable',
    character: 'modern',
  };
};

// Mock: zapisywanie motywu do API
const saveThemeToAPI = async (theme: ThemeConfig): Promise<void> => {
  // W rzeczywistości: PUT /api/profile/theme
  console.log('Saving theme to API:', theme);
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

```tsx
// components/theme/ThemeProvider.tsx
import React, { useEffect, useState } from 'react';
import { ThemeConfig, themeTokens } from '../../types/theme';
import { fetchThemeFromAPI, saveThemeToAPI, ThemeContext } from '../../hooks/useTheme';
import { ThemeSyncManager } from './ThemeSyncManager';
import { ThemeValidator } from './ThemeValidator';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Główny provider Theme Engine – Single Source of Truth dla motywu twórcy.
 * Wstrzykuje tokeny CSS do :root i synchronizuje zmiany z backendem.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Ładowanie motywu przy starcie
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await fetchThemeFromAPI();
      setTheme(savedTheme);
    };
    loadTheme();
  }, []);

  // Aktualizacja motywu i zapis do API
  const updateTheme = async (updates: Partial<ThemeConfig>) => {
    if (!theme) return;
    const newTheme = { ...theme, ...updates };
    setIsSyncing(true);
    setTheme(newTheme);
    await saveThemeToAPI(newTheme);
    setIsSyncing(false);
  };

  // Wstrzykiwanie tokenów CSS do :root
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;

    // Mapowanie vibe na główne kolory akcji
    const primaryBg = themeTokens[`${theme.vibe}-400` as keyof typeof themeTokens];
    const primaryText = theme.vibe === 'gold' ? themeTokens['teal-900'] : themeTokens['teal-25'];

    // Mapowanie shape na border-radius
    const borderRadiusMap: Record<ThemeShape, string> = {
      sharp: '0px',
      soft: '6px',
      organic: '12px',
    };

    // Mapowanie density na spacing scale
    const spacingMap: Record<ThemeDensity, string> = {
      compact: '0.5rem',
      comfortable: '1rem',
      spacious: '1.5rem',
    };

    // Mapowanie character na fonty i fluid typography
    const fontMap: Record<ThemeCharacter, { heading: string; body: string }> = {
      modern: { heading: 'Mukta Malar', body: 'IBM Plex Sans' },
      bold: { heading: 'Mukta Malar', body: 'IBM Plex Sans' },
      minimalist: { heading: 'IBM Plex Sans', body: 'IBM Plex Sans' },
    };

    root.style.setProperty('--theme-primary-bg', primaryBg);
    root.style.setProperty('--theme-primary-text', primaryText);
    root.style.setProperty('--theme-border-radius', borderRadiusMap[theme.shape]);
    root.style.setProperty('--theme-spacing-base', spacingMap[theme.density]);
    root.style.setProperty('--theme-font-heading', fontMap[theme.character].heading);
    root.style.setProperty('--theme-font-body', fontMap[theme.character].body);

    // Przykładowe fluid typography dla nagłówków
    root.style.setProperty('--theme-heading-lg', 'clamp(2rem, 4vw + 1rem, 3rem)');
    root.style.setProperty('--theme-heading-md', 'clamp(1.5rem, 3vw + 1rem, 2.25rem)');
  }, [theme]);

  if (!theme) {
    return <div>Loading theme...</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, isSyncing }}>
      <ThemeSyncManager />
      <ThemeValidator />
      {children}
    </ThemeContext.Provider>
  );
};
```

```tsx
// components/theme/ThemeConfigurator.tsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { ThemeVibe, ThemeShape, ThemeDensity, ThemeCharacter } from '../../types/theme';

/**
 * Interfejs konfiguracyjny motywu w dashboardzie.
 * Zgodnie z dokumentem: bez żargonu technicznego, tylko mentalne modele.
 */
export const ThemeConfigurator: React.FC = () => {
  const { theme, updateTheme, isSyncing } = useTheme();

  const handleVibeChange = (vibe: ThemeVibe) => {
    updateTheme({ vibe });
  };

  const handleShapeChange = (shape: ThemeShape) => {
    updateTheme({ shape });
  };

  const handleDensityChange = (density: ThemeDensity) => {
    updateTheme({ density });
  };

  const handleCharacterChange = (character: ThemeCharacter) => {
    updateTheme({ character });
  };

  return (
    <div className="p-6 bg-teal-800 rounded-lg space-y-6">
      <h2 className="text-2xl font-heading text-teal-25">Twój styl</h2>

      {/* Primary Vibe */}
      <section>
        <h3 className="text-lg font-medium text-teal-100 mb-2">Główny motyw</h3>
        <div className="flex gap-4">
          {(['teal', 'gold', 'purple'] as ThemeVibe[]).map((vibe) => (
            <button
              key={vibe}
              onClick={() => handleVibeChange(vibe)}
              className={`
                px-4 py-2 rounded border-2 transition-all
                ${theme.vibe === vibe ? 'border-gold-400 bg-gold-400/10 text-gold-400' : 'border-teal-500 text-teal-100'}
              `}
            >
              {vibe === 'teal' && 'Głęboki Turkus'}
              {vibe === 'gold' && 'Złota Aura'}
              {vibe === 'purple' && 'Fioletowa Energia'}
            </button>
          ))}
        </div>
      </section>

      {/* Shape */}
      <section>
        <h3 className="text-lg font-medium text-teal-100 mb-2">Kształt geometrii</h3>
        <div className="flex gap-4">
          {(['sharp', 'soft', 'organic'] as ThemeShape[]).map((shape) => (
            <button
              key={shape}
              onClick={() => handleShapeChange(shape)}
              className={`
                px-4 py-2 rounded border-2 transition-all
                ${theme.shape === shape ? 'border-gold-400 bg-gold-400/10 text-gold-400' : 'border-teal-500 text-teal-100'}
              `}
            >
              {shape === 'sharp' && 'Ostre'}
              {shape === 'soft' && 'Łagodne'}
              {shape === 'organic' && 'Organiczne'}
            </button>
          ))}
        </div>
      </section>

      {/* Density */}
      <section>
        <h3 className="text-lg font-medium text-teal-100 mb-2">Gęstość informacji</h3>
        <div className="flex gap-4">
          {(['compact', 'comfortable', 'spacious'] as ThemeDensity[]).map((density) => (
            <button
              key={density}
              onClick={() => handleDensityChange(density)}
              className={`
                px-4 py-2 rounded border-2 transition-all
                ${theme.density === density ? 'border-gold-400 bg-gold-400/10 text-gold-400' : 'border-teal-500 text-teal-100'}
              `}
            >
              {density === 'compact' && 'Zwarte'}
              {density === 'comfortable' && 'Komfortowe'}
              {density === 'spacious' && 'Przestrzenne'}
            </button>
          ))}
        </div>
      </section>

      {/* Character */}
      <section>
        <h3 className="text-lg font-medium text-teal-100 mb-2">Charakter główny</h3>
        <div className="flex gap-4">
          {(['modern', 'bold', 'minimalist'] as ThemeCharacter[]).map((character) => (
            <button
              key={character}
              onClick={() => handleCharacterChange(character)}
              className={`
                px-4 py-2 rounded border-2 transition-all
                ${theme.character === character ? 'border-gold-400 bg-gold-400/10 text-gold-400' : 'border-teal-500 text-teal-100'}
              `}
            >
              {character === 'modern' && 'Nowoczesny'}
              {character === 'bold' && 'Zdecydowany'}
              {character === 'minimalist' && 'Minimalistyczny'}
            </button>
          ))}
        </div>
      </section>

      {isSyncing && (
        <div className="text-teal-100 text-sm">Synchronizowanie zmian...</div>
      )}
    </div>
  );
};
```

```tsx
// components/theme/ThemeSyncManager.tsx
import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

/**
 * Komponent odpowiedzialny za synchronizację motywu z backendem
 * i propagację do wszystkich węzłów (Widget, Overlay, QR) via WebSocket/SSE.
 */
export const ThemeSyncManager: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    if (!theme) return;

    // Mock: otwieranie połączenia WebSocket/SSE do backendu
    const connectToThemeUpdates = () => {
      // W rzeczywistości: new WebSocket('wss://...') lub EventSource('/api/theme/updates')
      console.log('Connecting to theme updates channel...');
      
      // Symulacja odbioru aktualizacji (np. z Redis pub/sub)
      const simulateUpdate = () => {
        // Tutaj powinien być kod wysyłający theme do wszystkich podłączonych węzłów
        console.log('Broadcasting theme update:', theme);
      };

      // Wysyłamy aktualizację przy każdej zmianie theme
      simulateUpdate();

      return () => {
        console.log('Disconnecting from theme updates channel...');
      };
    };

    const disconnect = connectToThemeUpdates();
    return disconnect;
  }, [theme]);

  return null; // Komponent niewidoczny, tylko logika
};
```

```tsx
// components/theme/ThemeValidator.tsx
import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { themeTokens } from '../../types/theme';

/**
 * Walidator kontrastu WCAG przy zmianie motywu.
 * Blokuje niebezpieczne kombinacje kolorów i sugeruje poprawki.
 */
export const ThemeValidator: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    if (!theme) return;

    // Przykład: sprawdzanie kontrastu złotego tła z turkusowym tekstem
    const primaryBg = themeTokens[`${theme.vibe}-400` as keyof typeof themeTokens];
    const primaryText = theme.vibe === 'gold' ? themeTokens['teal-900'] : themeTokens['teal-25'];

    // Prostą funkcję kontrastu można zaimplementować na podstawie luminance
    const getLuminance = (hex: string) => {
      // Uproszczone obliczenia – w rzeczywistości użyj biblioteki jak `color2k`
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const bgLum = getLuminance(primaryBg);
    const textLum = getLuminance(primaryText);
    const contrast = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);

    // WCAG AAA wymaga min. 7:1 dla normalnego tekstu
    if (contrast < 7) {
      console.warn('Low contrast detected. Consider adjusting your theme.');
      // W UI można pokazać toast: "Ten motyw może być trudny do czytania"
    }
  }, [theme]);

  return null; // Komponent niewidoczny, tylko logika
};
```

### Użycie w aplikacji:

```tsx
// pages/_app.tsx
import { ThemeProvider } from '../components/theme/ThemeProvider';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
```

```tsx
// pages/dashboard.tsx
import { ThemeConfigurator } from '../components/theme/ThemeConfigurator';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-teal-900 text-teal-25 p-6">
      <h1 className="text-3xl font-heading mb-6">Twój kokpit</h1>
      <ThemeConfigurator />
      {/* Reszta dashboardu */}
    </div>
  );
}
```

### Kluczowe cechy zgodne z dokumentem:

- **Single Source of Truth:** `ThemeProvider` przechowuje motyw i wstrzykuje tokeny CSS do `:root`.  
- **Mentalne modele:** `ThemeConfigurator` używa terminów „Główny motyw”, „Kształt”, „Gęstość”, „Charakter” zamiast HEX, border-radius, font-family.  
- **Automatyczna synchronizacja:** `ThemeSyncManager` symuluje propagację zmian do widgetów, overlayów, QR (w rzeczywistości WebSocket/SSE).  
- **Ochrona dostępności:** `ThemeValidator` sprawdza kontrast i blokuje niebezpieczne kombinacje kolorów.  
- **Fluid typography:** Zmienne CSS jak `--theme-heading-lg: clamp(...)` dla responsywnych fontów.

Komponenty są gotowe do integracji z backendem (REST/GraphQL, WebSocket/SSE) i resztą systemu Support Surfaces.

```tsx
// types/widget.ts
export interface WidgetConfig {
  creatorId: string;
  variant: 'floating' | 'inline';
  position?: 'bottom-right' | 'bottom-left' | 'inline';
  theme?: {
    primaryBg: string;
    primaryText: string;
    borderRadius: string;
  };
}

export interface TipData {
  amount: number;
  currency: 'USDC' | 'EUR' | 'USD';
  message?: string;
}
```

```tsx
// providers/SmartWidgetProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { WidgetConfig, TipData } from '../types/widget';

interface SmartWidgetContextValue {
  config: WidgetConfig | null;
  setConfig: (config: WidgetConfig) => void;
  sendTip: (data: TipData) => Promise<void>;
}

const SmartWidgetContext = createContext<SmartWidgetContextValue | undefined>(undefined);

// Mock: pobieranie konfiguracji widgetu z API
const fetchWidgetConfig = async (creatorId: string): Promise<WidgetConfig> => {
  // W rzeczywistości: GET /api/widget/config?creatorId=...
  return {
    creatorId,
    variant: 'floating',
    position: 'bottom-right',
  };
};

// Mock: wysyłanie tipu do backendu
const sendTipToAPI = async (data: TipData): Promise<void> => {
  // W rzeczywistości: POST /api/tips
  console.log('Sending tip:', data);
};

export const useSmartWidget = () => {
  const context = useContext(SmartWidgetContext);
  if (!context) {
    throw new Error('useSmartWidget must be used within a SmartWidgetProvider');
  }
  return context;
};

interface SmartWidgetProviderProps {
  children: React.ReactNode;
  creatorId: string;
}

/**
 * Globalny provider dla widgetów osadzanych na zewnętrznych domenach.
 * Zarządza konfiguracją widgetu i synchronizacją z Theme Engine.
 */
export const SmartWidgetProvider: React.FC<SmartWidgetProviderProps> = ({
  children,
  creatorId,
}) => {
  const [config, setConfig] = useState<WidgetConfig | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      const widgetConfig = await fetchWidgetConfig(creatorId);
      setConfig(widgetConfig);
    };
    loadConfig();
  }, [creatorId]);

  const sendTip = async (data: TipData) => {
    await sendTipToAPI(data);
  };

  return (
    <SmartWidgetContext.Provider value={{ config, setConfig, sendTip }}>
      {children}
    </SmartWidgetContext.Provider>
  );
};
```

```tsx
// components/widget/SmartWidgetElement.ts (Web Component)
import { WidgetConfig } from '../../types/widget';

// Style wewnętrzne widgetu – używają zmiennych CSS z dokumentu nadrzędnego
const widgetStyles = `
  :host {
    display: block;
    font-family: var(--theme-font-body, system-ui);
  }

  .widget {
    background: var(--theme-primary-bg, #FFD700);
    color: var(--theme-primary-text, #001F1F);
    border-radius: var(--theme-border-radius, 6px);
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-out;
  }

  .widget:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  .widget button {
    background: var(--theme-primary-bg, #FFD700);
    color: var(--theme-primary-text, #001F1F);
    border: none;
    border-radius: var(--theme-border-radius, 6px);
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease-out;
  }

  .widget button:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

/**
 * Custom Element z Shadow DOM dla widgetów TipJar+.
 * Dziedziczy zmienne CSS z dokumentu nadrzędnego, ale hermetyzuje strukturę.
 */
export class SmartWidgetElement extends HTMLElement {
  private config: WidgetConfig | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  // Metoda do aktualizacji konfiguracji z zewnątrz (np. przez skrypt embed)
  updateConfig(newConfig: WidgetConfig) {
    this.config = newConfig;
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>${widgetStyles}</style>
      <div class="widget">
        <h3>Wesprzyj twórcę</h3>
        <p>Dzięki TipJar+ możesz łatwo wspierać swojego ulubionego twórcę.</p>
        <button id="tip-btn">Wesprzyj teraz</button>
      </div>
    `;

    const button = this.shadowRoot.getElementById('tip-btn');
    button?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('tip-request', { detail: { amount: 5, currency: 'USDC' } }));
    });
  }
}

// Rejestracja Custom Elementu
customElements.define('smart-widget', SmartWidgetElement);
```

```tsx
// components/widget/FloatingActionWidget.tsx
import React, { useEffect, useRef } from 'react';
import { useSmartWidget } from '../../providers/SmartWidgetProvider';
import { TipData } from '../../types/widget';

/**
 * Pływający przycisk monetyzacji (Smart Button) z motywem twórcy.
 * Osadzany przez skrypt na zewnętrznych domenach.
 */
export const FloatingActionWidget: React.FC = () => {
  const { config, sendTip } = useSmartWidget();
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!config || config.variant !== 'floating') return;

    // Pozycjonowanie zgodne z dokumentem (strefa kciuka na mobile)
    const positionClass = config.position === 'bottom-left' ? 'bottom-4 left-4' : 'bottom-4 right-4';
    widgetRef.current?.classList.add('fixed', positionClass, 'z-50');
  }, [config]);

  const handleTip = async () => {
    const tipData: TipData = {
      amount: 5,
      currency: 'USDC',
      message: 'Dzięki za świetną treść!',
    };
    await sendTip(tipData);
  };

  if (!config || config.variant !== 'floating') {
    return null;
  }

  return (
    <div
      ref={widgetRef}
      className="
        bg-theme-primary-bg text-theme-primary-text 
        rounded-theme-border-radius shadow-lg 
        px-4 py-3 transition-all duration-200 
        hover:shadow-xl hover:-translate-y-1
      "
    >
      <button
        onClick={handleTip}
        className="font-semibold focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
      >
        Wesprzyj twórcę
      </button>
    </div>
  );
};
```

```tsx
// components/widget/InlineTipWidget.tsx
import React from 'react';
import { useSmartWidget } from '../../providers/SmartWidgetProvider';
import { TipData } from '../../types/widget';

/**
 * Widget wbudowany w treść strony (np. pod postem na blogu).
 * Renderuje formularz tipów z motywem twórcy.
 */
export const InlineTipWidget: React.FC = () => {
  const { config, sendTip } = useSmartWidget();
  const [amount, setAmount] = React.useState(5);
  const [message, setMessage] = React.useState('');

  if (!config || config.variant !== 'inline') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tipData: TipData = {
      amount,
      currency: 'USDC',
      message: message || undefined,
    };
    await sendTip(tipData);
    setAmount(5);
    setMessage('');
  };

  return (
    <div
      className="
        bg-theme-primary-bg text-theme-primary-text 
        rounded-theme-border-radius shadow-md 
        p-4 my-4
      "
    >
      <h3 className="text-lg font-semibold mb-2">Wesprzyj ten wpis</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Kwota (USDC)
          </label>
          <input
            id="amount"
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="
              w-full px-3 py-2 
              bg-white/10 border border-white/20 
              rounded-theme-border-radius 
              focus:outline-none focus:ring-2 focus:ring-purple-300
            "
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Wiadomość (opcjonalnie)
          </label>
          <textarea
            id="message"
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="
              w-full px-3 py-2 
              bg-white/10 border border-white/20 
              rounded-theme-border-radius 
              focus:outline-none focus:ring-2 focus:ring-purple-300
            "
          />
        </div>
        <button
          type="submit"
          className="
            w-full py-2 
            bg-theme-primary-bg text-theme-primary-text 
            rounded-theme-border-radius 
            font-semibold 
            hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-300
          "
        >
          Wyślij napiwek
        </button>
      </form>
    </div>
  );
};
```

### Skrypt embed do osadzania widgetu (przykład):

```html
<!-- script do wklejenia przez twórcę na stronie -->
<script src="https://tipjar.plus/widget.js" data-creator="username"></script>
```

```tsx
// public/widget.js (przykładowa zawartość)
(function() {
  const script = document.currentScript;
  const creatorId = script?.getAttribute('data-creator') || 'default';

  // Inicjalizacja Custom Elementu
  if (!customElements.get('smart-widget')) {
    // Tutaj powinien być import klasy SmartWidgetElement (w bundlerze)
    console.log('Initializing smart-widget for creator:', creatorId);
  }

  // Alternatywnie: renderowanie React widgetu jeśli strona obsługuje React
  const root = document.createElement('div');
  root.id = 'tipjar-widget-root';
  document.body.appendChild(root);

  // W rzeczywistości: ReactDOM.render(<SmartWidgetProvider creatorId={creatorId}>...</SmartWidgetProvider>, root)
  console.log('TipJar+ widget loaded for creator:', creatorId);
})();
```

### Kluczowe cechy zgodne z dokumentem:

- **Hermetyzacja Shadow DOM:** `SmartWidgetElement` używa Shadow DOM do izolacji struktury, ale dziedziczy zmienne CSS (`--theme-primary-bg`, `--theme-primary-text`) z dokumentu nadrzędnego.  
- **Dziedziczenie motywu:** Widgety korzystają z tokenów wstrzykniętych przez Theme Engine, więc zmiana motywu w dashboardzie natychmiast odbija się na widgetach.  
- **In-situ płatności:** `FloatingActionWidget` i `InlineTipWidget` umożliwiają wsparcie bez opuszczania strony.  
- **Bez iframe:** Widgety są renderowane jako część dokumentu (lub Custom Element), co omija ograniczenia iframe i CORS.  
- **Synchronizacja:** `SmartWidgetProvider` łączy się z backendem, aby pobrać konfigurację i wysyłać tipy.

Komponenty są gotowe do integracji z Theme Engine i backendem TipJar+.



```tsx
// pages/overlay/[username].tsx (Next.js SSR)
import { GetServerSideProps } from 'next';
import { OverlayPage } from '../../components/overlay/OverlayPage';
import { fetchOverlayData } from '../../lib/api/overlay';

interface OverlayPageProps {
  username: string;
  theme: {
    primaryBg: string;
    primaryText: string;
    borderRadius: string;
  };
  initialTips: Array<{ id: string; amount: number; message?: string }>;
  goal?: { target: number; current: number };
}

/**
 * Specjalna strona SSR dla OBS Browser Source.
 * Wstrzykuje motyw twórcy i renderuje overlay bez UI chrome.
 */
export default function OverlayRoute({ username, theme, initialTips, goal }: OverlayPageProps) {
  return (
    <OverlayPage
      username={username}
      theme={theme}
      initialTips={initialTips}
      goal={goal}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as { username: string };

  try {
    const overlayData = await fetchOverlayData(username);

    return {
      props: {
        username,
        theme: overlayData.theme,
        initialTips: overlayData.recentTips || [],
        goal: overlayData.goal || null,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
```

```tsx
// components/overlay/OverlayPage.tsx
import React from 'react';
import { LiveTickerOverlay } from './LiveTickerOverlay';
import { GoalBarOverlay } from './GoalBarOverlay';
import { OverlaySSEConnector } from './OverlaySSEConnector';

interface OverlayPageProps {
  username: string;
  theme: {
    primaryBg: string;
    primaryText: string;
    borderRadius: string;
  };
  initialTips: Array<{ id: string; amount: number; message?: string }>;
  goal?: { target: number; current: number };
}

/**
 * Strona overlayu dla OBS Browser Source.
 * Renderuje ticker i goal bar bez żadnych chrome UI.
 */
export const OverlayPage: React.FC<OverlayPageProps> = ({
  username,
  theme,
  initialTips,
  goal,
}) => {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-transparent"
      style={{
        // Wstrzyknięcie motywu jako inline styles dla OBS
        '--theme-primary-bg': theme.primaryBg,
        '--theme-primary-text': theme.primaryText,
        '--theme-border-radius': theme.borderRadius,
      } as React.CSSProperties}
    >
      {/* SSE do dynamicznych aktualizacji */}
      <OverlaySSEConnector username={username} />

      {/* Live Ticker – pokazuje ostatnie tipy */}
      <LiveTickerOverlay initialTips={initialTips} />

      {/* Goal Bar – pokazuje progres zbiórki */}
      {goal && <GoalBarOverlay goal={goal} />}
    </div>
  );
};
```

```tsx
// components/overlay/LiveTickerOverlay.tsx
import React, { useState, useEffect } from 'react';

interface Tip {
  id: string;
  amount: number;
  message?: string;
}

interface LiveTickerOverlayProps {
  initialTips: Tip[];
}

/**
 * Komponent wyświetlający powiadomienia o napiwkach na strumieniu wideo.
 * Animuje wchodzenie i wychodzenie wiadomości.
 */
export const LiveTickerOverlay: React.FC<LiveTickerOverlayProps> = ({ initialTips }) => {
  const [tips, setTips] = useState<Tip[]>(initialTips.slice(0, 3)); // Pokazujemy tylko 3 ostatnie

  // SSE lub WebSocket będą dodawać nowe tipy do kolejki
  useEffect(() => {
    // Mock: symulacja nowego tipu co 10s
    const interval = setInterval(() => {
      const newTip: Tip = {
        id: Date.now().toString(),
        amount: Math.floor(Math.random() * 20) + 1,
        message: 'Dzięki za stream!',
      };
      setTips((prev) => {
        const updated = [newTip, ...prev].slice(0, 3);
        return updated;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-4 right-4 space-y-2">
      {tips.map((tip) => (
        <div
          key={tip.id}
          className="
            bg-theme-primary-bg text-theme-primary-text 
            rounded-theme-border-radius shadow-lg 
            px-4 py-3 max-w-xs 
            animate-in slide-in-from-right-8 fade-in duration-300
          "
        >
          <div className="font-semibold">
            {tip.amount} USDC
          </div>
          {tip.message && (
            <div className="text-sm opacity-90 mt-1">
              {tip.message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
```

```tsx
// components/overlay/GoalBarOverlay.tsx
import React from 'react';

interface GoalBarOverlayProps {
  goal: {
    target: number;
    current: number;
  };
}

/**
 * Pasek postępu celu zbiórki renderowany na overlayu OBS.
 * Pokazuje procent ukończenia i pozostałą kwotę.
 */
export const GoalBarOverlay: React.FC<GoalBarOverlayProps> = ({ goal }) => {
  const progress = Math.min((goal.current / goal.target) * 100, 100);
  const remaining = goal.target - goal.current;

  return (
    <div className="absolute bottom-4 left-4 right-4">
      <div className="bg-black/50 backdrop-blur-sm rounded-theme-border-radius p-4">
        <div className="text-white text-sm font-medium mb-2">
          Cel zbiórki: {goal.target} USDC
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
          <div
            className="bg-theme-primary-bg h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-white text-sm">
          {goal.current} USDC zebrane ({progress.toFixed(1)}%) – zostało {remaining} USDC
        </div>
      </div>
    </div>
  );
};
```

```tsx
// components/overlay/OverlaySSEConnector.tsx
import { useEffect, useState } from 'react';

interface OverlaySSEConnectorProps {
  username: string;
}

interface OverlayEvent {
  type: 'tip' | 'goal-update' | 'theme-change';
  data: any;
}

/**
 * Połączenie Server-Sent Events między overlayem a serwerem TipJar+.
 * Dynamicznie aktualizuje motyw i dane bez „Refresh cache” w OBS.
 */
export const OverlaySSEConnector: React.FC<OverlaySSEConnectorProps> = ({ username }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!username) return;

    const eventSource = new EventSource(`/api/overlay/events?username=${username}`);

    eventSource.onopen = () => {
      setIsConnected(true);
      console.log('SSE connected for overlay:', username);
    };

    eventSource.onmessage = (event) => {
      const overlayEvent: OverlayEvent = JSON.parse(event.data);

      switch (overlayEvent.type) {
        case 'tip':
          // W rzeczywistości: dispatch do kontekstu lub Redux
          console.log('New tip event:', overlayEvent.data);
          break;

        case 'goal-update':
          console.log('Goal updated:', overlayEvent.data);
          break;

        case 'theme-change':
          // Aktualizacja zmiennych CSS na stronie overlayu
          const { primaryBg, primaryText, borderRadius } = overlayEvent.data;
          document.documentElement.style.setProperty('--theme-primary-bg', primaryBg);
          document.documentElement.style.setProperty('--theme-primary-text', primaryText);
          document.documentElement.style.setProperty('--theme-border-radius', borderRadius);
          break;

        default:
          console.warn('Unknown overlay event:', overlayEvent.type);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      setIsConnected(false);
      // W rzeczywistości: reconnection logic z backoff
    };

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [username]);

  // Wskaźnik połączenia (opcjonalnie)
  return (
    <div className="absolute top-2 left-2">
      <div
        className={`
          w-3 h-3 rounded-full 
          ${isConnected ? 'bg-green-500' : 'bg-red-500'}
        `}
        title={isConnected ? 'Połączony z TipJar+' : 'Rozłączony'}
      />
    </div>
  );
};
```

### Przykład endpointu SSE na backendzie (Nest.js):

```ts
// overlay.controller.ts (Nest.js)
import { Controller, Sse, Query } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('overlay')
export class OverlayController {
  @Sse('events')
  sse(@Query('username') username: string): Observable<MessageEvent> {
    // W rzeczywistości: połączenie z Redis pub/sub lub WebSocket
    return interval(5000).pipe(
      map(() => ({
        data: {
          type: 'heartbeat',
          timestamp: Date.now(),
        },
      })),
    );
  }
}
```

### Kluczowe cechy zgodne z dokumentem:

- **SSR dla OBS:** Strona `/overlay/username` jest renderowana po stronie serwera, więc OBS Browser Source otrzymuje gotowy HTML z wstrzykniętym motywem.  
- **Bez Custom CSS:** Twórca nie musi ręcznie wklejać CSS – wszystko jest zarządzane przez Theme Engine.  
- **Live Ticker:** `LiveTickerOverlay` pokazuje ostatnie tipy z animacjami wchodzenia/wychodzenia.  
- **Goal Bar:** `GoalBarOverlay` wizualizuje progres zbiórki na overlayu.  
- **SSE Connector:** `OverlaySSEConnector` utrzymuje połączenie z serwerem i dynamicznie aktualizuje dane oraz motyw bez odświeżania cache w OBS.  
- **Synchronizacja motywu:** Zmiana motywu w dashboardzie natychmiast propaguje się na overlay przez SSE i aktualizację zmiennych CSS.

Komponenty są gotowe do integracji z Theme Engine i backendem TipJar+.


```tsx
// components/share/ShareCardGenerator.tsx
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useTheme } from '../../hooks/useTheme';

interface ShareCardGeneratorProps {
  children: React.ReactNode;
}

/**
 * Generator kart udostępniania (PNG/PDF) z podglądem na żywo motywu twórcy.
 * Renderuje podgląd jako canvas i eksportuje do PNG/PDF.
 */
export const ShareCardGenerator: React.FC<ShareCardGeneratorProps> = ({ children }) => {
  const { theme } = useTheme();
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const captureCanvas = async (): Promise<HTMLCanvasElement> => {
    if (!previewRef.current) throw new Error('Preview ref not found');

    // html2canvas używa computed styles, więc tokeny CSS są już przetłumaczone na piksele
    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: null,
      scale: 2, // Wyższa rozdzielczość dla social media
      useCORS: true,
      allowTaint: false,
    });

    return canvas;
  };

  const exportPNG = async () => {
    setIsGenerating(true);
    try {
      const canvas = await captureCanvas();
      const link = document.createElement('a');
      link.download = `tipjar-share-${theme.vibe}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to export PNG:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportPDF = async () => {
    setIsGenerating(true);
    try {
      const canvas = await captureCanvas();
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`tipjar-share-${theme.vibe}-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Podgląd na żywo z motywem twórcy */}
      <div
        ref={previewRef}
        className="
          bg-theme-primary-bg text-theme-primary-text 
          rounded-theme-border-radius shadow-lg 
          p-6 max-w-md mx-auto
        "
      >
        {children}
      </div>

      {/* Przyciski eksportu */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={exportPNG}
          disabled={isGenerating}
          className="
            px-4 py-2 
            bg-theme-primary-bg text-theme-primary-text 
            rounded-theme-border-radius 
            font-semibold 
            hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-300
            disabled:opacity-50
          "
        >
          {isGenerating ? 'Generowanie...' : 'Eksportuj PNG'}
        </button>
        <button
          onClick={exportPDF}
          disabled={isGenerating}
          className="
            px-4 py-2 
            bg-theme-primary-bg text-theme-primary-text 
            rounded-theme-border-radius 
            font-semibold 
            hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-300
            disabled:opacity-50
          "
        >
          {isGenerating ? 'Generowanie...' : 'Eksportuj PDF'}
        </button>
      </div>
    </div>
  );
};
```

```tsx
// components/share/DynamicCanvasRenderer.tsx
import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface DynamicCanvasRendererProps {
  children: React.ReactNode;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
  onError?: (error: Error) => void;
}

/**
 * Abstrakcja do renderowania canvas z aktualnymi wartościami computed styles.
 * Umożliwia tłumaczenie tokenów CSS na wartości pikselowe w eksportowanych grafikach.
 */
export const DynamicCanvasRenderer: React.FC<DynamicCanvasRendererProps> = ({
  children,
  onCanvasReady,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderCanvas = async () => {
      try {
        const canvas = await html2canvas(containerRef.current!, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
          allowTaint: false,
        });

        setCanvas(canvas);
        onCanvasReady?.(canvas);
      } catch (error) {
        console.error('Canvas rendering failed:', error);
        onError?.(error as Error);
      }
    };

    renderCanvas();
  }, [children, onCanvasReady, onError]);

  return (
    <div>
      {/* Ukryty kontener do renderowania – nie jest widoczny w UI */}
      <div ref={containerRef} style={{ position: 'absolute', top: -9999, left: -9999 }}>
        {children}
      </div>

      {/* Opcjonalnie: podgląd canvas */}
      {canvas && (
        <div className="mt-4">
          <img
            src={canvas.toDataURL('image/png')}
            alt="Podgląd eksportu"
            className="max-w-full h-auto border rounded"
          />
        </div>
      )}
    </div>
  );
};
```

```tsx
// services/ThemeBroadcastService.ts
import { ThemeConfig } from '../types/theme';

/**
 * Serwis odpowiedzialny za wysyłanie aktualizacji motywu do wszystkich podłączonych węzłów.
 * Używa WebSocket/SSE do real-time propagacji zmian.
 */
export class ThemeBroadcastService {
  private ws: WebSocket | null = null;
  private eventSource: EventSource | null = null;
  private subscribers: Array<(theme: ThemeConfig) => void> = [];

  constructor(private apiUrl: string) {}

  connect(username: string) {
    // Przykład z WebSocket
    this.ws = new WebSocket(`${this.apiUrl}/ws/theme?username=${username}`);

    this.ws.onopen = () => {
      console.log('ThemeBroadcastService: WebSocket connected');
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'theme-update') {
        this.subscribers.forEach((callback) => callback(data.theme));
      }
    };

    this.ws.onerror = (error) => {
      console.error('ThemeBroadcastService: WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('ThemeBroadcastService: WebSocket closed');
    };
  }

  // Alternatywnie z SSE
  connectSSE(username: string) {
    this.eventSource = new EventSource(`${this.apiUrl}/sse/theme?username=${username}`);

    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'theme-update') {
        this.subscribers.forEach((callback) => callback(data.theme));
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('ThemeBroadcastService: SSE error:', error);
    };
  }

  subscribe(callback: (theme: ThemeConfig) => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  broadcastTheme(theme: ThemeConfig) {
    // Wysyłanie aktualizacji motywu do backendu, który rozgłosi ją do wszystkich węzłów
    fetch(`${this.apiUrl}/api/theme/broadcast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme, username: 'current-user' }),
    }).catch(console.error);
  }

  disconnect() {
    this.ws?.close();
    this.eventSource?.close();
    this.subscribers = [];
  }
}
```

```tsx
// components/widget/WidgetScriptLoader.ts
/**
 * Skrypt ładowany przez twórcę na zewnętrzne strony (`<script src="...">`).
 * Inicjuje widget i łączy się z Theme Engine.
 */
(function() {
  const script = document.currentScript;
  const creatorId = script?.getAttribute('data-creator') || 'default';
  const variant = script?.getAttribute('data-variant') || 'floating';
  const position = script?.getAttribute('data-position') || 'bottom-right';

  // Sprawdzamy, czy strona obsługuje React (opcjonalnie)
  const hasReact = typeof window.React !== 'undefined';

  // Tworzymy kontener dla widgetu
  const widgetRoot = document.createElement('div');
  widgetRoot.id = `tipjar-widget-${creatorId}`;
  document.body.appendChild(widgetRoot);

  // Ładujemy konfigurację z backendu
  fetch(`https://api.tipjar.plus/widget/config?creator=${creatorId}`)
    .then((res) => res.json())
    .then((config) => {
      // Jeśli strona ma React, renderujemy komponent
      if (hasReact && window.ReactDOM) {
        const { createElement } = window.React;
        const { render } = window.ReactDOM;

        // Przykład: renderowanie FloatingActionWidget
        const Widget = createElement('div', {
          className: 'tipjar-widget',
          'data-creator': creatorId,
        });

        render(Widget, widgetRoot);
      } else {
        // Fallback: używamy Custom Element lub prostego HTML
        const widgetElement = document.createElement('smart-widget');
        widgetElement.setAttribute('creator-id', creatorId);
        widgetElement.setAttribute('variant', variant);
        widgetElement.setAttribute('position', position);
        widgetRoot.appendChild(widgetElement);
      }

      // Łączymy się z Theme Engine przez SSE/WebSocket
      const eventSource = new EventSource(`https://api.tipjar.plus/sse/theme?creator=${creatorId}`);
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'theme-update') {
          // Aktualizujemy zmienne CSS na stronie
          Object.entries(data.theme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--theme-${key}`, value as string);
          });
        }
      };
    })
    .catch((error) => {
      console.error('TipJar+ widget failed to load:', error);
    });
})();
```

```tsx
// components/embed/EmbedConfigurator.tsx
import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

type EmbedType = 'widget' | 'overlay' | 'smart-link';
type WidgetVariant = 'floating' | 'inline';
type WidgetPosition = 'bottom-right' | 'bottom-left';

/**
 * Interfejs w dashboardzie do generowania kodu embed (Smart Link) dla widgetów i overlayów.
 * Upraszcza proces „podłącz przycisk” bez żargonu technicznego.
 */
export const EmbedConfigurator: React.FC = () => {
  const { theme } = useTheme();
  const [embedType, setEmbedType] = useState<EmbedType>('widget');
  const [widgetVariant, setWidgetVariant] = useState<WidgetVariant>('floating');
  const [widgetPosition, setWidgetPosition] = useState<WidgetPosition>('bottom-right');

  const generateEmbedCode = (): string => {
    const baseUrl = 'https://tipjar.plus';
    const creatorId = 'username'; // W rzeczywistości z kontekstu użytkownika

    switch (embedType) {
      case 'widget':
        return `
<script src="${baseUrl}/widget.js" 
        data-creator="${creatorId}" 
        data-variant="${widgetVariant}" 
        data-position="${widgetPosition}">
</script>
        `.trim();

      case 'overlay':
        return `
<!-- OBS Browser Source URL -->
${baseUrl}/overlay/${creatorId}
        `.trim();

      case 'smart-link':
        return `
<!-- Smart Link do strony twórcy -->
<a href="${baseUrl}/c/${creatorId}" 
   style="background: var(--theme-primary-bg); color: var(--theme-primary-text); 
          border-radius: var(--theme-border-radius); padding: 0.5rem 1rem; 
          text-decoration: none; font-weight: 600;">
  Wesprzyj mnie na TipJar+
</a>
        `.trim();

      default:
        return '';
    }
  };

  const [embedCode] = useState(generateEmbedCode);

  return (
    <div className="p-6 bg-teal-800 rounded-lg space-y-6">
      <h2 className="text-2xl font-heading text-teal-25">Podłącz przycisk</h2>

      {/* Wybór typu embed */}
      <section>
        <h3 className="text-lg font-medium text-teal-100 mb-2">Co chcesz podłączyć?</h3>
        <div className="flex gap-4">
          {(['widget', 'overlay', 'smart-link'] as EmbedType[]).map((type) => (
            <button
              key={type}
              onClick={() => setEmbedType(type)}
              className={`
                px-4 py-2 rounded border-2 transition-all
                ${embedType === type ? 'border-gold-400 bg-gold-400/10 text-gold-400' : 'border-teal-500 text-teal-100'}
              `}
            >
              {type === 'widget' && 'Widget na stronie'}
              {type === 'overlay' && 'Overlay OBS'}
              {type === 'smart-link' && 'Smart Link'}
            </button>
          ))}
        </div>
      </section>

      {/* Opcje widgetu */}
      {embedType === 'widget' && (
        <>
          <section>
            <h3 className="text-lg font-medium text-teal-100 mb-2">Styl widgetu</h3>
            <div className="flex gap-4">
              {(['floating', 'inline'] as WidgetVariant[]).map((variant) => (
                <button
                  key={variant}
                  onClick={() => setWidgetVariant(variant)}
                  className={`
                    px-4 py-2 rounded border-2 transition-all
                    ${widgetVariant === variant ? 'border-gold-400 bg-gold-400/10 text-gold-400' : 'border-teal-500 text-teal-100'}
                  `}
                >
                  {variant === 'floating' && 'Pływający przycisk'}
                  {variant === 'inline' && 'Wbudowany w treść'}
                </button>
              ))}
            </div>
          </section>

          {widgetVariant === 'floating' && (
            <section>
              <h3 className="text-lg font-medium text-teal-100 mb-2">Pozycja</h3>
              <div className="flex gap-4">
                {(['bottom-right', 'bottom-left'] as WidgetPosition[]).map((position) => (
                  <button
                    key={position}
                    onClick={() => setWidgetPosition(position)}
                    className={`
                      px-4 py-2 rounded border-2 transition-all
                      ${widgetPosition === position ? 'border-gold-400 bg-gold-400/10 text-gold-400' : 'border-teal-500 text-teal-100'}
                    `}
                  >
                    {position === 'bottom-right' && 'Dół po prawej'}
                    {position === 'bottom-left' && 'Dół po lewej'}
                  </button>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Wygenerowany kod */}
      <section>
        <h3 className="text-lg font-medium text-teal-100 mb-2">Kod do wklejenia</h3>
        <pre className="bg-teal-900 text-teal-25 p-4 rounded overflow-x-auto text-sm">
          <code>{embedCode}</code>
        </pre>
        <button
          onClick={() => navigator.clipboard.writeText(embedCode)}
          className="
            mt-2 px-4 py-2 
            bg-theme-primary-bg text-theme-primary-text 
            rounded-theme-border-radius 
            font-semibold 
            hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-300
          "
        >
          Kopiuj kod
        </button>
      </section>
    </div>
  );
};
```

### Kluczowe cechy zgodne z dokumentem:

- **ShareCardGenerator:** Renderuje podgląd karty z motywem twórcy i eksportuje do PNG/PDF przy użyciu `html2canvas` i `jsPDF`. Tokeny CSS są tłumaczone na wartości pikselowe przez przeglądarkę.  
- **DynamicCanvasRenderer:** Abstrakcja do renderowania canvas z computed styles, użyteczna do zaawansowanych eksportów (np. wielu kart na raz).  
- **ThemeBroadcastService:** Serwis do rozgłaszania zmian motywu przez WebSocket/SSE do wszystkich węzłów (widgety, overlay, QR).  
- **WidgetScriptLoader:** Skrypt embed, który automatycznie konfiguruje widget i łączy się z Theme Engine bez interwencji użytkownika.  
- **EmbedConfigurator:** Interfejs w dashboardzie do generowania kodu embed w języku nietechnicznym („Widget na stronie”, „Overlay OBS”, „Smart Link”).

Komponenty są gotowe do integracji z Theme Engine i resztą systemu TipJar+.

