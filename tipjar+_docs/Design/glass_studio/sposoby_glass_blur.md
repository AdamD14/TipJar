***  
 <!-- Kontener przycisku o rozmiarze 192x56 -->
        **var(--gradient-oklch);** mój gradient 
        <div class="btn-container-lg">
          
          <!-- Warstwa 0: Tło aplikacji -->
          <div class="absolute inset-0 z-0 bg-[#002222] rounded-[16px]"></div>
          
          <!-- Warstwa 1: The overlay rgba(0, 31, 31, 0.85) + blur działający na overlay (4px, no saturate) -->
          <div class="absolute inset-0 z-1 rounded-[16px]" style="background: rgba(0, 31, 31, 0.85); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);"></div>
          
          <!-- Warstwa 2: Gradient przycisku z zaokrągleniem 16px, border-none i drop-s
          hadow -->
          <div class="absolute inset-0 z-2 rounded-[16px]" style="background:**var(--gradient-oklch);** border: none; filter: drop-shadow(0px 3px 5px rgba(0,0,0,0.8));"></div>
        </div>
***

***
<!-- Przycisk z warstwami -->
        <div class="btn-container-lg rounded-[8px]">
          
          <!-- Warstwa 1: Tło aplikacji -->
          <div class="absolute inset-0 z-1 bg-[#002222] rounded-[8px]"></div>
          
          <!-- Warstwa 2: box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6) -->
          <div class="absolute inset-0 z-2 rounded-[8px]" style="box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6); pointer-events: none;"></div>
          
          <!-- Warstwa 3: box-shadow: 0 0 10px rgba(252, 194, 1, 0.1) -->
          <div class="absolute inset-0 z-3 rounded-[8px]" style="box-shadow: 0 0 10px rgba(252, 194, 1, 0.1); pointer-events: none;"></div>
          
          <!-- Warstwa 4: backdrop-filter: blur(20px) -->
          <div class="absolute inset-0 z-4 rounded-[8px]" style="backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);"></div>
          
          <!-- Warstwa 5: border: 1px solid rgba(255, 255, 255, 0.1) -->
          <div class="absolute inset-0 z-5 rounded-[8px]" style="border: 1px solid rgba(255, 255, 255, 0.1); pointer-events: none;"></div>
          
          <!-- Włożony button z gradientem -->
          <div class="absolute inset-0 z-6 rounded-[8px]" style="background: ***var(--gradient-oklch)***;"></div>
***          

