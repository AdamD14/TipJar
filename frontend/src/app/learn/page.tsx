import { useEffect } from 'react';

import { track } from '@/lib/analytics';

export default function LearnPage() {
  useEffect(() => {
    track('view_learn_article');
  }, []);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <article className="prose">
        <h1 className="text-3xl font-bold">Learn about TipJar</h1>
        <p>
          TipJar helps creators receive support from their audience through simple
          tipping experiences. This article explains the basics so you can get
          started quickly.
        </p>
        <p>
          After creating an account, share your TipJar link with fans. They can
          send tips in a few clicks, and you&apos;ll see them in your dashboard.
          Explore additional features like goal tracking and community rewards to
          keep your supporters engaged.
        </p>
      </article>
    </main>
  );
}

