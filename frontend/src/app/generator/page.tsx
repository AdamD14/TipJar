'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const PLATFORMS = ['instagram', 'twitter', 'facebook', 'linkedin'];

export default function GeneratorPage() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate/hashtags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, platform }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setHashtags(data.hashtags || []);
    } catch {
      setError('Błąd podczas pobierania hashtagów');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generator Hashtagów</h1>
      <form onSubmit={submit} className="space-y-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Temat"
          required
          className="w-full border p-2 rounded"
        />
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {PLATFORMS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Generuj
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {hashtags.length > 0 && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 space-y-2"
        >
          {hashtags.map((h) => (
            <li key={h} className="bg-gray-100 p-2 rounded">{h}</li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
