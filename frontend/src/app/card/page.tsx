export default function CardPage() {
  return (
    <div className="grid grid-cols-2 gap-6 justify-center content-center justify-items-center items-center min-h-screen py-12">
      <div
        className="w-[480px] h-[240px]"
        style={{
          border: '1px solid var(--color-teal-200)',
          borderRadius: '56px',
          outline: '1px solid var(--color-teal-300)',
          cornerShape: 'square square bevel',
          backdropFilter: 'blur(16px) saturate(120%)',
          background: 'linear-gradient(110deg in oklch, oklch(0.1463 0.0258 214.5/0.8) 0%, oklch(0.246939 0.042152 194.7689/0.8) 50%, oklch(0.1463 0.0258 214.5/0.8) 100%)',
        }}
      />
      <div
        className="w-[480px] h-[240px]"
        style={{
         border: '1px solid var(--color-teal-500)',
          borderRadius: '48px',
          outline: '1px solid var(--color-teal-450)',
          cornerShape: 'squircle',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(110deg in oklch, oklch(0.1608 0.0275 194.77) 0%, oklch(0.22 0.0718 188.47) 50%, oklch(0.1608 0.0275 194.77) 100%)',
        }}
      />
      <div
        className="w-[480px] h-[240px]"
        style={{
          border: '1px solid var(--color-teal-200)',
          borderRadius: '24px',
         outline: '1px solid var(--color-teal-300)',
          cornerShape: 'scoop bevel ',
          boxShadow: ' 2px 2px 6px var(--color-teal-400), -2px -2px 6px var(--color-teal-400)',
          background: 'linear-gradient(110deg in oklch, oklch(0.246939 0.042152 194.7689) 0%, oklch(0.22 0.0718 188.47) 50%, oklch(0.2118 0.0362 194.77) 100%)',
        }}
      />
      <div
        className="w-[480px] h-[240px]"
        style={{
          border: '1px solid var(--color-teal-200)',
          borderRadius: '24px',
          outline: '2px solid var(--color-teal-450)',
          cornerShape: 'scoop notch',
          background: 'linear-gradient(110deg in oklch, oklch(0.2647 0.0493 205.42) 0%, oklch(0.256 0.0403 194.93) 40%, oklch(0.246939 0.042152 194.7689) 100%)',
        }}
      />
      
      
      <div
        className="w-[480px] h-[240px]"
        style={{
         border: 'oklch(0.74 0.07 194/0.8) 2px double',
        backdropFilter: 'blur(16px) saturate(160%)',
          borderRadius: '48px',
          cornerShape: 'bevel',
          background: 'linear-gradient(110deg in oklch, oklch(0.22 0.0718 188.47/0.4) 0%, oklch(0.246939 0.042152 194.7689/0.5) 50%, oklch(0.2647 0.0493 205.42/0.6) 100%)',
        }}
      />
      <div
        className="w-[480px] h-[240px]"
        style={{
          border: '1px solid var(--color-teal-400)',
          borderRadius: '48px',
          outline: '1px solid var(--color-teal-200)',
          cornerShape: 'notch square',
          boxShadow: 'inset 2px 2px 5px rgba(0, 0, 0, 0.5), inset -2px -2px 5px rgba(255, 255, 255, 0.2)',
          filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1))',
          background: 'linear-gradient(110deg in oklch, oklch(0.246939 0.042152 194.7689) 0%, oklch(0.256 0.0403 194.93) 50%, oklch(0.2647 0.0493 205.42) 100%)',
        }}
      />
    </div>
  );
}
