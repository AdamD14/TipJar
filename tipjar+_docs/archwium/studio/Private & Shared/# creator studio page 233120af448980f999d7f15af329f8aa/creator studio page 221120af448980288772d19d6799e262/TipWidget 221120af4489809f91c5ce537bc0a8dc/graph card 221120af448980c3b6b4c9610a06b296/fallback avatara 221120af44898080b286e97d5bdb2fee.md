# fallback avatara

✅ Domyślny avatar słoik+ dodany:

- `/fallback-jar.svg` ładowany automatycznie
- Styl: złota obwódka + subtelny glow (`shadow-yellow-400`)
- Obsługa `onError` gdyby obrazek nie załadował się z zewnętrznego źródła

<img
src={profile.avatarUrl || `https://avatar.vercel.sh/${handle}.svg`}
alt={`@${handle}`}
className="w-16 h-16 rounded-full"
/>

<img
src={profile.avatarUrl || '/fallback-jar.svg'}
alt={`@${handle}`}
className="w-24 h-24 rounded-full border-4 border-[#FFD700]"
onError={(e) => e.currentTarget.src = '/fallback-jar.svg'}
/>

![image.png](fallback%20avatara%20221120af44898080b286e97d5bdb2fee/image.png)