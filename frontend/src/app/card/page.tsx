export default function CardPage() {
  return (
    <div className="grid grid-cols-2 gap-6 justify-center content-center justify-items-center items-center min-h-screen py-12">
      <div
        className="w-[480px] h-[240px]"
        style={{
          border: '1px solid var(--color-teal-500)',
          borderRadius: '56px',
          outline: '1px solid var(--color-teal-400)',
          cornerShape: 'square square bevel',
          backdropFilter: 'blur(16px) saturate(120%)',
          background: 'linear-gradient(110deg in oklch, oklch(0.408 0.0676 194.83/0.8) 0%, oklch(0.3814 0.0632 194.83/0.8) 50%, oklch(0.3603 0.0615 194.77/0.8) 100%)',
        }}
      />
      <div
        className="w-[480px] h-[240px]"
        style={{
         border: '2px solid var(--color-teal-400)',
          borderRadius: '12px',
          cornerShape: 'squircle',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          background: 'linear-gradient(110deg in oklch, oklch(0.4559 0.0788 189.53) 0%, oklch(0.4147 0.0789 184.59) 50%, oklch(0.3833 0.0595 194.96) 100%)',
        }}
      />
      <div
        className="w-[480px] h-[240px]"
        style={{
          border: '1px solid var(--color-teal-300)',
          borderRadius: '24px',
         cornerShape: 'square bevel',
          boxShadow: ' 1px 1px 2px var(--color-teal-500), -1px -1px 2px var(--color-teal-500)',
          background: 'linear-gradient(110deg in oklch, oklch(0.3603 0.0615 194.77) 0%, oklch(0.3912 0.0897 196.94) 50%, oklch(0.4147 0.0789 184.59) 100%)',
        }}
      />
      <div
        className="w-[480px] h-[240px]"
        style={{
          border: '1px solid var(--color-teal-300)',
          borderRadius: '36px',
          outline: '2px solid var(--color-teal-400)',
          cornerShape: 'scoop',
          background: 'linear-gradient(110deg in oklch, oklch(0.4147 0.0789 184.59) 0%, oklch(0.4559 0.0788 189.53) 50%, oklch(0.4147 0.0789 184.59) 100%)',
        }}
      />
      
      
      <div
        className="w-[480px] h-[240px]"
        style={{
         border: '2px solid var(--color-teal-300)',
        backdropFilter: 'blur(16px) saturate(160%)',
          borderRadius: '48px',
          cornerShape: 'bevel',
          background: 'linear-gradient(110deg in oklch, oklch(0.345 0.0587 194.8/0.8) 0%, oklch(0.3618 0.0613 200.12/0.8) 50%, oklch(0.3912 0.0897 196.94/0.8) 100%)',
        }}
      />
      <div
        className="w-[480px] h-[240px]"
        style={{
          border: '2px solid var(--color-teal-300)',
          borderRadius: '12px',
          filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1))',
          background: 'linear-gradient(110deg in oklch, oklch(0.3955 0.0634 193.37) 0%, oklch(0.4559 0.0788 189.53) 50%, oklch(0.4147 0.0789 184.59) 100%)',
        }}
      />
    </div> 
  );
}
