"use client"
import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

/**
 * ChooseUsername
 *
 * This page collects a unique username from the user after registration.  It
 * fetches the current user from the backend to determine their role (creator
 * or fan).  The username must be unique across the platform; on submit the
 * value is posted to `/auth/username`.  Once saved the user is redirected to
 * the appropriate onboarding flow: creators proceed to `/creator/setup` and
 * fans to `/fan/setup`.
 */
export default function ChooseUsername() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState<{ role: string } | null>(null);

  // Fetch current user
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMe();
  }, []);

  // Check username availability when it changes
  useEffect(() => {
    if (!username) {
      setIsAvailable(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/auth/username-check?username=${encodeURIComponent(username)}`);
        if (res.ok) {
          const data = await res.json();
          setIsAvailable(data.available);
        }
      } catch (err) {
        console.error(err);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [username]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username) {
      setError('Please enter a username');
      return;
    }
    if (isAvailable === false) {
      setError('This username is already taken');
      return;
    }
    try {
      const res = await fetch('/api/auth/username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      if (!res.ok) throw new Error(await res.text());
      // redirect based on role
      if (user?.role === 'CREATOR') {
        router.push('/creator/setup');
      } else {
        router.push('/fan/setup');
      }
    } catch (err) {
      setError('Failed to save username');
    }
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="text-3xl font-semibold mb-4">Choose your username</h1>
      <p className="mb-6 text-gray-600">
        Pick a unique handle that will be part of your public profile URL.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value.toLowerCase());
              setError('');
            }}
            required
            className="w-full border rounded p-2"
          />
          {isAvailable === false && (
            <p className="text-red-500 text-sm mt-1">This username is taken</p>
          )}
          {isAvailable === true && (
            <p className="text-green-600 text-sm mt-1">This username is available</p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="px-6 py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
        >
          Save and continue
        </button>
      </form>
    </div>
  );
}