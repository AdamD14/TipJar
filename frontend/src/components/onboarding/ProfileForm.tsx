"use client";
import { useId, useState } from "react";

type Props = {
  onChange?: (v: { displayName: string; language: string; bio: string }) => void;
};

export default function ProfileForm({ onChange }: Props) {
  const idName = useId();
  const idLang = useId();
  const idBio = useId();
  const [displayName, setDisplayName] = useState("");
  const [language, setLanguage] = useState("English");
  const [bio, setBio] = useState("");
  const [errName, setErrName] = useState<string | null>(null);
  const [errBio, setErrBio] = useState<string | null>(null);

  function push() {
    onChange?.({ displayName, language, bio });
  }

  return (
    <form
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
      aria-describedby={errName || errBio ? "profile-errors" : undefined}
    >
      <label className="block">
        <span className="mb-1 block text-sm text-muted">Display name</span>
        <input
          id={idName}
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
            setErrName(null);
            push();
          }}
          placeholder="Jane Creator"
          maxLength={60}
          aria-invalid={!!errName}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400"
        />
        {errName && <p className="mt-1 text-xs text-red-400">{errName}</p>}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm text-muted">Language</span>
        <select
          id={idLang}
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            push();
          }}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
        >
          <option>English</option>
          <option>Polski</option>
        </select>
      </label>

      <label className="block md:col-span-2">
        <span className="mb-1 block text-sm text-muted">Bio</span>
        <textarea
          id={idBio}
          rows={4}
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
            setErrBio(null);
            push();
          }}
          placeholder="Tell supporters about yourself…"
          maxLength={280}
          aria-invalid={!!errBio}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-400"
        />
        {errBio && <p className="mt-1 text-xs text-red-400">{errBio}</p>}
        <p id="profile-errors" className="sr-only">
          {errName || errBio}
        </p>
        <p className="mt-1 text-xs text-muted">
          Max 60 znaków (nazwa) i 280 (bio). UI zapiszesz później w ustawieniach.
        </p>
      </label>
    </form>
  );
}

