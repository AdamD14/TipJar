"use client"
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

/**
 * FanSetup
 *
 * This simple onboarding form collects a fan’s avatar and a display name.  Fans
 * on TipJar+ primarily use the platform to discover creators and send
 * donations, so the profile is intentionally lightweight.  Upon submission
 * the data is posted to `/fans/setup` and the user is redirected to their
 * dashboard.
 */
export default function FanSetup() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = new FormData();
    body.append('displayName', displayName);
    if (avatar) body.append('avatar', avatar);
    try {
      await fetch('/api/fans/setup', { method: 'POST', body });
      router.push('/fan/dashboard');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-3xl font-semibold mb-4">Set up your profile</h1>
      <p className="mb-8 text-gray-600">Add a picture and choose a name to personalise your experience.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1" htmlFor="avatar">Avatar</label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
            className="block w-full"
          />
        </div>
        <div>
          <label className="block font-medium mb-1" htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mt-8">
          <button type="submit" className="px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition">
            Save and continue
          </button>
        </div>
      </form>
    </div>
  );
}