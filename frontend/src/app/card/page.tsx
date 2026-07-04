"use client";
export default function CardPage() {
 return (
    <div className="grid grid-cols-2 gap-6 justify-center content-center justify-items-center items-center min-h-screen py-12">
      <div
        className="relative w-[480px] h-[240px]"
        style={{
          border: "1px solid var(--color-teal-300)",
          borderRadius: "36px",
          background: "var(--color-teal-700)",
          "corner-shape": "bevel",
          outline: "1px solid var(--color-teal-400)",
        }} >
        <div className="w-full h-full flex items-center justify-center text-primary font-heading font-bold text-2xl">
          1
        </div>
      </div>
      <div
        className="relative w-[480px] h-[240px]"
        style={{
        border: "1px solid var(--color-teal-300)",
          borderRadius: "48px",
          "corner-shape": "square bevel square", 
         outline: "1px solid var(--color-teal-400)",
          background:
            
        }} >
        <div className="w-full h-full flex items-center justify-center">
          2
        </div>
      </div>

      <div
        className="relative w-[480px] h-[240px]"
        style={{
          border: "1px solid var(--color-teal-300)",
          outline: "1px solid var(--color-teal-400)",
          borderRadius: "36px",
          "corner-shape": "bevel square bevel", 
     background:
            "linear-gradient(110deg in oklch, oklch(0.3419 0.0745 198.08) 0%, oklch(0.3241 0.0632 201.1) 50%, oklch(0.3485 0.0809 195.15) 100%)",
        }}
      >
       <div className="w-full h-full flex items-center justify-center">
          3
        </div>
      </div>

      <div
        className="w-[480px] h-[240px]"
        style={{
          border: "1px solid var(--color-teal-300)",
          borderRadius: "24px",
          outline: "1px solid var(--color-teal-400)",
          background:
            "linear-gradient(110deg in oklch, oklch(0.3034 0.0596 197.48) 0%, oklch(0.3229 0.0663 196.24) 50%, oklch(0.3419 0.0745 198.08) 100%)",
          "corner-shape": "scoop",
        }} 
        >
        <div className="w-full h-full flex items-center justify-center">
          4
        </div>
      </div>

      <div
        className="relative w-[480px] h-[240px]"
        style={{
          border: "1px groove var(--color-teal-300)",
          borderRadius: "32px",
          background: "linear-gradient(110deg in oklch, oklch(0.3034 0.0596 200.93) 0%, oklch(0.3376 0.0733 202.24) 50%, oklch(0.32 0.0623 201.1) 100%)",
          "corner-shape": "superellipse(-0.4)",
       outline: "1px solid var(--color-teal-400)"
        }}
       >
       <div className="w-full h-full flex items-center justify-center">
          5
        </div>
        </div>
      
      <div className="relative w-[480px] h-[240px]"
        style={{
          border: "1px solid var(--color-teal-400)",
          borderRadius: "18px",
        outline: "1px solid var(--color-teal-400)",
          background:
            "linear-gradient(110deg in oklch, oklch(0.3034 0.0596 200.93) 0%, oklch(0.3376 0.0733 202.24) 50%, oklch(0.3241 0.0623 201.1) 100%)",
           "corner-shape": "notch",
        }} >
 <div className="w-full h-full flex items-center justify-center">
          6
        </div>

 </div>
    </div>
  );
}
