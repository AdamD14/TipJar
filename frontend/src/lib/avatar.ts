export function initials(handle: string) {
  const h = (handle || "").replace(/^@/, "");
  if (!h) return "✦";
  const parts = h.split(/[^a-z0-9]+/i).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? h[1] ?? "";
  return (a + b).toUpperCase();
}

export function gradientStyle(seed: string) {
  let x = 0;
  for (let i = 0; i < seed.length; i++) x = (x * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = x % 360;
  const hue2 = (hue + 40) % 360;
  const angle = x % 180;
  const from = `hsl(${hue} 65% 35% / .95)`;
  const to = `hsl(${hue2} 70% 25% / .95)`;
  return { background: `linear-gradient(${angle}deg, ${from}, ${to})` };
}
