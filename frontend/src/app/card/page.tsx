"use client";
export default function CardPage() {
 return (
    <div className="grid grid-cols-2 gap-6 justify-center content-center justify-items-center items-center min-h-screen py-12">
      <div
        className="relative w-[880px] h-[480px]"
        style={{
          border: "1px solid var(--color-teal-300)",
          borderRadius: "36px",
          background: "linear-gradient(135deg in oklch, oklch(0.31 0.062 195) 0%, oklch(0.35 0.072 192) 50%, oklch(0.31 0.062 195) 100%)",
          "corner-shape": "bevel",
          outline: "1px solid var(--color-teal-400)",
        }} >
        <div className="w-full h-full flex items-center justify-center text-primary font-heading font-bold text-2xl">
          1
        </div>
      </div>
      <div
        className="relative w-[880px] h-[480px]"
        style={{
          border: "1px solid var(--color-teal-300)",
          borderRadius: "48px",
          "corner-shape": "square bevel square",
          outline: "1px solid var(--color-teal-400)",
          background:
            "linear-gradient(135deg in oklch, oklch(0.31 0.062 204) 0%, oklch(0.35 0.072 202) 50%, oklch(0.31 0.062 204) 100%)",
        }}>
        <div className="w-full h-full flex items-center justify-center">
          2
        </div>
      </div>

      <div
        className="relative w-[880px] h-[480px]"
        style={{
          border: "1px solid var(--color-teal-300)",
          outline: "1px solid var(--color-teal-400)",
          borderRadius: "36px",
          "corner-shape": "bevel square bevel", 
     background:
            "linear-gradient(135deg in oklch, oklch(0.31 0.062 200) 0%, oklch(0.35 0.072 198) 50%, oklch(0.31 0.062 200) 100%)",
        }}
      >
       <div className="w-full h-full flex items-center justify-center">
          3
        </div>
      </div>

      <div
        className="w-[880px] h-[480px]"
        style={{
          border: "1px solid var(--color-teal-300)",
          borderRadius: "24px",
          outline: "1px solid var(--color-teal-400)",
          background:
            "linear-gradient(135deg, hsla(185, 100%, 10%, 1) 2%, hsla(186, 100%, 12%, 1) 17%, hsla(184, 100%, 15%, 1) 37%, hsla(186, 100%, 14%, 1) 54%, hsla(186, 100%, 13%, 1) 72%, hsla(186, 100%, 12%, 1) 100%)",
          "corner-shape": "scoop",
        }} 
        >
        <div className="w-full h-full flex items-center justify-center">
          4
        </div>
      </div>

      <div
        className="relative w-[880px] h-[480px]"
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
      
      <div className="relative w-[880px] h-[480px]"
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
