// app/@[username]/page.tsx
export default function CreatorProfilePage({ params }: { params: { username: string } }) {
  const username = params.username;
  return (
    <main className="min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif', backgroundColor: '#F0F4F4' }}>
      <div className="bg-[#003737] text-white p-8">
        <h1 className="text-5xl">@{username}</h1>
        <p className="mt-2 text-lg">Welcome to @{username}'s profile! Thank you for your support.</p>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-[#FFD700] h-4 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <p className="mt-1">Goal: $5000 (60% reached)</p>
        </div>
        <button className="mt-4 bg-[#FFD700] text-[#003737] py-2 px-4 rounded">Send Tip</button>
      </div>
      <div className="p-8">
        <h2 className="text-2xl mb-4">Recent Supporters</h2>
        <ul className="list-disc pl-5 text-gray-800">
          <li>Alice – $50</li>
          <li>Bob – $20 (Great stream!)</li>
          <li>Anonymous – $5</li>
        </ul>
      </div>
    </main>
  );
}
