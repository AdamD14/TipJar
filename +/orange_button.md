<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Podział Canvas na 4</title>
    <!-- Import czcionki Mukta Malar (Semi-bold: 600) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Mukta+Malar:wght@600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: linear-gradient(in oklch 125deg, #003737 0%, #004545 40%, #003737 85%);
            position: relative;
        }

        /* Linia pionowa przez środek szerokości */
        .line-v {
            position: absolute;
            left: 50%;
            top: 0;
            width: 1px;
            height: 100%;
            background-color: #C7F5F2;
            transform: translateX(-50%);
            z-index: 10;
        }

        /* Linia pozioma przez środek wysokości */
        .line-h {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #C7F5F2;
            transform: translateY(-50%);
            z-index: 10;
        }

        /* Siatka dzieląca tło na 4 równe kwadraty */
        .grid {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            z-index: 5;
        }

        .quadrant {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* --- BAZOWE WŁAŚCIWOŚCI PRZYCISKÓW CTA --- */
        .card {
            height: 144px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            cursor: pointer;
            
            /* Płynna animacja przejścia filtrów, tła oraz sprężystego kliknięcia */
            transition: filter 0.2s ease, background 0.25s ease-in-out, transform 0.1s ease;
        }

        /* UJEDNOLICONY HOVER BRIGHTNESS: Taki sam, dynamiczny rozbłysk dla wszystkich przycisków */
        .card:hover {
            filter: brightness(1.1);
        }

        /* Ujednolicony rozbłysk wektorów technologicznych SVG po najechaniu myszką */
        .card:hover svg {
            filter: brightness(1.1);
        }

        /* Płynny, sprężysty aktywny klik (active state) zachowujący unikalne nachylenia 3D */
        .card:active {
            transform: perspective(1000px) rotateX(var(--rotX, 0deg)) rotateY(var(--rotY, 0deg)) scale(0.975) translateY(2px) !important;
        }

        .card svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: block;
            z-index: 1;
            pointer-events: none;
            transition: filter 0.2s ease, opacity 0.2s ease;
        }

        /* UJEDNOLICONE METALICZNE RAMKI (BORDER): Zastosowane globalnie dla wszystkich kart */
        .card::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: 2px;
            background: linear-gradient(in oklch 125deg,
                oklch(0.95 0.15 85) 0%,
                oklch(0.80 0.15 70) 40%,
                oklch(0.98 0.10 90) 85%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            z-index: 1;
            transition: background 0.25s ease-in-out;
        }

        /* UJEDNOLICONY ROZBŁYSK RAMKI: Lewa krawędź i góra rozświetlają się intensywnym, jasnym złotem */
        .card:hover::before {
            background: linear-gradient(in oklch 125deg,
                oklch(0.999 0.03 95) 0%,   /* Intensywny biało-złoty refleks */
                oklch(0.85 0.15 72) 40%,
                oklch(0.98 0.10 90) 85%
            );
        }

        /* --- SPERSONALIZOWANA TYPOGRAFIA --- */
        .card-text {
            font-family: 'Mukta Malar', sans-serif;
            font-weight: 600; /* Stała waga Semi-bold (600) na wszystkich przyciskach */
            font-size: 60px;
            z-index: 2;
            text-align: center;
            white-space: nowrap;
            user-select: none;
            
            /* Nakładanie złotej palety na czcionkę */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;

            /* UJEDNOLICONY GRAWEROWANY CIEŃ TEKSTU: Głęboki trójwymiarowy grawer (engraved style) */
            text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.8), 0px 1px 0px rgba(255, 255, 255, 0.15);
        }

        /* DEDYKOWANE CIEŚNIEJSZE ODSTĘPY: Zastosowane wyłącznie dla dłuższych kart (2 i 3) */
        .card-2 .card-text,
        .card-3 .card-text {
            letter-spacing: -0.025em;
            word-spacing: -0.05em;
        }

        /* ============================================
           KARTA 1 – SIGN UP (CONVEX 1:3)
           Wymiary: 432px x 144px
           Gradient: 122deg | 0% 40% 90%
           ============================================ */
        .card-1 {
            width: 432px;
            background: linear-gradient(in oklch 122deg, oklch(0.711 0.177 54.5) 0%, oklch(0.840 0.172 84.1) 40%, oklch(0.852 0.189 95.8) 90%);
            border-radius: 8px;
            border: 2px solid transparent;
            background-clip: padding-box;
            
            /* Subtelne cienie wypukłości 3D */
            box-shadow: 
                0 -2px 6px rgba(255, 255, 255, 0.18),
                0 3px 6px rgba(60, 25, 5, 0.5),
                0 16px 48px rgba(60, 25, 5, 0.6),
                0 20px 60px rgba(180, 120, 20, 0.2),
                inset 0 1px 2px rgba(255, 255, 255, 0.35),
                inset 0 8px 20px -8px rgba(255, 255, 240, 0.15),
                inset 0 -1px 0px rgba(180, 80, 10, 0.65),
                inset 0 -8px 16px rgba(0, 0, 0, 0.3);
                
            --rotX: 2deg;
            --rotY: -2deg;
            transform: perspective(1000px) rotateX(var(--rotX)) rotateY(var(--rotY));
        }

        .card-1 svg {
            opacity: 0.4;
        }

        /* Górny refleks świetlny (mokry połysk krawędzi) */
        .card-1::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: radial-gradient(circle at 30% 20%,
                rgba(255, 255, 255, 0.12) 0%,
                transparent 60%);
            pointer-events: none;
            z-index: 1;
        }

        /* Gradient tekstu pierwszej karty */
        .card-1 .card-text {
            background-image: linear-gradient(in oklch 125deg, oklch(0.2856 0.0472 201.54) 0%, oklch(0.2696 0.0425 207.64) 50%, oklch(0.2843 0.0446 206.86) 100%);
        }

        /* ============================================
           KARTA 2 – BEGIN AS A CREATOR (CONVEX 1:4)
           Wymiary: 576px x 144px
           Gradient: 144deg | 0% 45% 95% (Ostatni stop: #ffd700)
           ============================================ */
        .card-2 {
            width: 576px;
            background: linear-gradient(in oklch 144deg, oklch(0.711 0.177 54.5) 0%, oklch(0.840 0.172 84.1) 45%, oklch(0.852 0.189 95.8) 95%);
            border-radius: 8px; /* Promień ujednolicony z pierwszą kartą */
            border: 2px solid transparent;
            background-clip: padding-box;
            position: relative;
            
            box-shadow: 
                0 -1px 3px rgba(255, 255, 255, 0.07),
                0 2px 4px rgba(0, 15, 15, 0.5),
                0 12px 40px rgba(0, 15, 15, 0.65),
                inset 0 1px 2px rgba(255, 255, 255, 0.06),
                inset 0 -6px 12px rgba(0, 0, 0, 0.35);
                
            --rotX: 3deg;
            --rotY: -3deg;
            transform: perspective(1000px) rotateX(var(--rotX)) rotateY(var(--rotY));
        }

        .card-2 svg {
            opacity: 0.3;
        }

        /* Delikatny overlay świetlny (mokry połysk) */
        .card-2::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: radial-gradient(circle at 30% 20%,
                rgba(255, 255, 255, 0.05) 0%,
                transparent 60%);
            pointer-events: none;
            z-index: 1;
        }

        /* Gradient tekstu drugiej karty */
        .card-2 .card-text {
            background-image: linear-gradient(in oklch 125deg, oklch(0.2236 0.0313 243.98) 0%, oklch(0.2257 0.0337 211.87) 50%, oklch(0.2543 0.0385 218.28) 100%);
        }

        /* ============================================
           KARTA 3 – JOIN AS A CREATOR (CONVEX 1:4)
           Wymiary: 576px x 144px
           Gradient: 315deg | 0% 50% 100% (Pierwszy stop: #ffd700)
           ============================================ */
        .card-3 {
            width: 576px;
            background: linear-gradient(in oklch 315deg, oklch(0.852 0.189 95.8) 0%, oklch(0.840 0.172 84.1) 50%, oklch(0.954 0.202 108.8) 100%);
            border-radius: 8px;
            border: 2px solid transparent;
            background-clip: padding-box;
            position: relative;
            
            box-shadow:
                0 -1px 3px rgba(255, 255, 220, 0.25),
                0 2px 4px rgba(80, 40, 5, 0.5),
                0 12px 40px rgba(80, 40, 5, 0.6),
                inset 0 1px 2px rgba(255, 255, 220, 0.3),
                inset 0 -6px 12px rgba(60, 25, 0, 0.4);
                
            --rotX: 3deg;
            --rotY: -3deg;
            transform: perspective(1000px) rotateX(var(--rotX)) rotateY(var(--rotY));
        }

        .card-3 svg {
            opacity: 0.3;
        }

        /* Delikatny overlay świetlny (mokry połysk) */
        .card-3::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: radial-gradient(circle at 30% 20%,
                rgba(255, 250, 200, 0.2) 0%,
                transparent 60%);
            pointer-events: none;
            z-index: 1;
        }

        /* Gradient tekstu trzeciej karty */
        .card-3 .card-text {
            background-image: linear-gradient(in oklch 245deg, oklch(0.2543 0.0385 218.28) 0%, oklch(0.2655 0.04 217.12) 50%, oklch(0.2236 0.0313 243.98) 100%);
        }

        /* ============================================
           KARTA 4 – TIP IT $ (ARCHED 1:3)
           Wymiary: 432px x 144px
           Gradient: 110deg | 0% 55% 100%
           ============================================ */
        .card-4 {
            width: 432px;
            background: linear-gradient(in oklch 110deg, oklch(0.711 0.177 54.5) 0%, oklch(0.840 0.172 84.1) 55%, oklch(0.954 0.202 108.8) 100%);
            border-radius: 12px;
            border: 2px solid transparent;
            background-clip: padding-box;
            
            box-shadow: 
                0 -1px 3px rgba(255, 255, 200, 0.2),
                0 2px 6px rgba(50, 25, 0, 0.55),
                0 16px 48px rgba(50, 25, 0, 0.7),
                inset 0 1px 2px rgba(255, 255, 200, 0.2),
                inset 0 -8px 18px rgba(40, 18, 0, 0.45);
                
            position: relative;
            overflow: visible;
            --rotX: 2deg;
            --rotY: -2deg;
            transform: perspective(1000px) rotateX(var(--rotX)) rotateY(var(--rotY));
        }

        .card-4 svg {
            opacity: 0.4;
        }

        /* Jasne refleksy na środkach każdego z czterech boków (szkło 3D) */
        .card-4::after {
            content: "";
            position: absolute;
            inset: 2px;
            border-radius: inherit;
            pointer-events: none;
            background: transparent;
            box-shadow:
                inset 0 3px 4px -2px rgba(255, 255, 220, 0.25),
                inset 0 -3px 4px -2px rgba(255, 255, 220, 0.12),
                inset 3px 0 4px -2px rgba(255, 255, 220, 0.18),
                inset -3px 0 4px -2px rgba(255, 255, 220, 0.12);
            z-index: 1;
        }

        /* Gradient tekstu czwartej karty */
        .card-4 .card-text {
            background-image: linear-gradient(in oklch 125deg, oklch(0.2101 0.0318 264.66) 0%, oklch(0.2307 0.0326 240.91) 50%, oklch(0.3047 0.0489 203.4) 100%);
        }

        /* ---------- RESPONSYWNOŚĆ ---------- */
        @media (max-width: 768px) {
            html, body {
                overflow-y: auto;
            }
            body {
                padding: 1.5rem 1rem;
            }
            .grid {
                grid-template-columns: 1fr;
                gap: 1.8rem;
                justify-items: center;
                max-width: 100%;
            }
            .card {
                width: 100%;
                max-width: 100%;
            }
            .card-1, .card-4 {
                width: 100%;
                max-width: 432px;
            }
            .card-2, .card-3 {
                width: 100%;
                max-width: 576px;
            }
            .card-text {
                font-size: clamp(34px, 8vw, 60px);
            }
        }
    </style>
</head>
<body>

    <div class="line-v"></div>
    <div class="line-h"></div>

    <div class="grid">
        <!-- KARTA 1 (Sign up) -->
        <div class="quadrant">
            <div class="card card-1">
                <!-- Wzór geometryczny SVG przeniesiony z karty 4 -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" width="100%" height="100%">
                    <polyline points="0,50 450,50 450,250 900,250" fill="none" stroke="#80bfbf" stroke-width="1" />
                    <polyline points="0,62 438,62 438,262 850,262" fill="none" stroke="#e0f2f2" stroke-width="1" />
                    <polyline points="150,300 150,120 800,120" fill="none" stroke="#b3d9d9" stroke-width="1" />
                    <polyline points="172,300 172,142 800,142" fill="none" stroke="#80bfbf" stroke-width="1" />
                    <circle cx="150" cy="120" r="1.5" fill="#b3d9d9" />
                </svg>
                <span class="card-text">Sign up</span>
            </div>
        </div>
        
        <!-- KARTA 2 (Begin as a creator) -->
        <div class="quadrant">
            <div class="card card-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" width="100%" height="100%">
                    <polyline points="0,80 600,80 600,200 900,200" fill="none" stroke="#e0f2f2" stroke-width="1" />
                    <polyline points="30,94 586,94 586,214 900,214" fill="none" stroke="#b3d9d9" stroke-width="1" />
                    
                    <polyline points="250,0 250,140 750,140 750,300" fill="none" stroke="#80bfbf" stroke-width="1" />
                    <polyline points="285,0 285,175 715,175 715,300" fill="none" stroke="#e0f2f2" stroke-width="1" />
                    <circle cx="250" cy="140" r="1.5" fill="#80bfbf" />
                </svg>
                <span class="card-text">Begin as a creator</span>
            </div>
        </div>
        
        <!-- KARTA 3 (Join as a creator) -->
        <div class="quadrant">
            <div class="card card-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" width="100%" height="100%">
                    <polyline points="0,80 600,80 600,200 900,200" fill="none" stroke="#e0f2f2" stroke-width="1" />
                    <polyline points="30,94 586,94 586,214 900,214" fill="none" stroke="#b3d9d9" stroke-width="1" />
                    
                    <polyline points="250,0 250,140 750,140 750,300" fill="none" stroke="#80bfbf" stroke-width="1" />
                    <polyline points="285,0 285,175 715,175 715,300" fill="none" stroke="#e0f2f2" stroke-width="1" />
                    <circle cx="250" cy="140" r="1.5" fill="#80bfbf" />
                </svg>
                <span class="card-text">Join as a creator</span>
            </div>
        </div>
        
        <!-- KARTA 4 (Tip It $) -->
        <div class="quadrant">
            <div class="card card-4">
                <!-- Wzór geometryczny SVG przeniesiony z karty 1 -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" width="100%" height="100%">
                    <polyline points="0,50 400,50 550,200 900,200" fill="none" stroke="#e0f2f2" stroke-width="1" />
                    <polyline points="30,66 438.6,66 588.6,216 900,216" fill="none" stroke="#b3d9d9" stroke-width="1" />
                    
                    <polyline points="200,300 350,150 750,150" fill="none" stroke="#80bfbf" stroke-width="1" />
                    <polyline points="168.9,300 296.9,172 820,172" fill="none" stroke="#e0f2f2" stroke-width="1" />
                    <circle cx="350" cy="150" r="1.5" fill="#80bfbf" />
                </svg>
                <span class="card-text">Tip It $</span>
            </div>
        </div>
    </div>

</body>
</html>
