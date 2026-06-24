******
1. Warstwa 1 tło 
2. Warstwa 2 DYFRAKCJA
  --glass-blur: blur(20px) saturate(200%) 
   backdrop-filter : (20px)
3. Warstwa 3 TINTING
   oklch(0.15 0.05 190 / 0.44)
4. Warstwa 4 KRAWĘDZ
   1px solid oklch(1  0  0 / 0.125)
   Niskie krycie 10-20%
******
*****
0. Tło aplikacji
1. The overlay rgba(0, 31, 31, 0.85)
     backdrop-filter: blur(4px)
 2. 16px border radius , masywny drop-shadow
 *****
****
CSS Nano-Grid
.nano-grid { bg-image: radial-gradient(circle, rgba(0, 128, 128, 0.3) 1px, transparent 1px);
                      bg-size: 24px 24px;}
 ****                 
****
1. Warstwa 1 
     tło aplikacji
2. Warstwa 2
   box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6)
3. Warstwa 3 
    box-shadow: 0 0 10px rgba(252, 194, 1, 0.1)
4. Warstwa 4 
      backdrop-filter: blur(20px)
5. Warstwa 5 
      border: 1px solid rgba(255, 255, 255, 0.1)
 ****
****
1. Warstwa 1 
   Tło aplikacji 
2. Warstwa 2
    Gradient masking
3. Warstwa 3
    backdrop-filter: blur(10px) nałożone na 10%           
    jasnej warstwy 
    Optymalizacja sprzętowa przez:
    transform: translateZ(0)
4. Warstwa 4
    1px glow border, pseudo element z maską CSS   
    (mask-composite: exclude)
****