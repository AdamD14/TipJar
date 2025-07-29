"use client"
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

/**
 * CreatorSetup
 *
 * This page acts as an onboarding wizard for newly registered creators.  It collects
 * the essential information needed to publish a public profile on TipJar+.  The
 * form includes fields for avatar and banner uploads, display name, a short
 * biography, a fundraising goal, a set of quick‑tip amounts, and a colour accent
 * for the tipping widget.  Upon submission the data is posted to the backend
 * endpoint `/creators/setup` which persists the profile and marks the creator
 * as configured.  On success the user is redirected to their creator dashboard.
 */
export default function CreatorSetup() {
  const router = useRouter();
  // local form state
  const [displayName, setDisplayName] = useState('');
  const [tagline, setTagline] = useState('');
  const [bio, setBio] = useState('');
  const [goal, setGoal] = useState(0);
  const [quickAmounts, setQuickAmounts] = useState<number[]>([1, 5, 10]);
  const [accentColor, setAccentColor] = useState('#00C4B4');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = new FormData();
    body.append('displayName', displayName);
    body.append('tagline', tagline);
    body.append('bio', bio);
    body.append('goal', goal.toString());
    body.append('quickAmounts', JSON.stringify(quickAmounts));
    body.append('accentColor', accentColor);
    if (avatar) body.append('avatar', avatar);
    if (banner) body.append('banner', banner);
    try {
      await fetch('/api/creators/setup', { method: 'POST', body });
      // after successful save redirect to creator dashboard
      router.push('/creator/dashboard');
    } catch (err) {
      console.error(err);
      // TODO: display error notification
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold mb-4">Set up your creator profile</h1>
      <p className="mb-8 text-gray-600">
        Complete the information below to publish your public profile.  You can edit these
        details later from your settings.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar upload */}
        <div>
          <label className="block font-medium mb-1" htmlFor="avatar">
            Avatar
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
            className="block w-full"
          />
        </div>
        {/* Banner upload */}
        <div>
          <label className="block font-medium mb-1" htmlFor="banner">
            Banner image
          </label>
          <input
            id="banner"
            type="file"
            accept="image/*"
            onChange={(e) => setBanner(e.target.files?.[0] ?? null)}
            className="block w-full"
          />
        </div>
        {/* Display name */}
        <div>
          <label className="block font-medium mb-1" htmlFor="displayName">
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        {/* Tagline */}
        <div>
          <label className="block font-medium mb-1" htmlFor="tagline">
            Tagline
          </label>
          <input
            id="tagline"
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        {/* Biography */}
        <div>
          <label className="block font-medium mb-1" htmlFor="bio">
            About you
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full border rounded p-2"
          />
        </div>
        {/* Goal slider */}
        <div>
          <label className="block font-medium mb-1" htmlFor="goal">
            Fundraising goal (USDC)
          </label>
          <input
            id="goal"
            type="number"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            min="0"
            className="w-full border rounded p-2"
          />
        </div>
        {/* Quick amounts */}
        <div>
          <label className="block font-medium mb-1">Suggested tip amounts (comma‑separated)</label>
          <input
            type="text"
            value={quickAmounts.join(',')}
            onChange={(e) => {
              const values = e.target.value
                .split(',')
                .map((v) => v.trim())
                .filter(Boolean)
                .map((v) => parseFloat(v));
              setQuickAmounts(values);
            }}
            className="w-full border rounded p-2"
          />
        </div>
        {/* Accent colour */}
        <div>
          <label className="block font-medium mb-1" htmlFor="accentColor">
            Accent colour
          </label>
          <input
            id="accentColor"
            type="color"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
            className="h-10 w-20 border-0"
          />
        </div>
        {/* Submit button */}
        <div className="mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
          >
            Save and continue
          </button>
        </div>
      </form>
    </div>
  );
}