import ProfileForm from '@/components/dashboard/ProfileForm';

export default function ProfileSettingsPage() {
  const initial = {
    name: '',
    alias: '',
    bio: '',
    links: { youtube: '', twitch: '' },
    goal: { target: 500, current: 120 },
  };
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Ustawienia profilu</h1>
      <ProfileForm initial={initial} onSubmit={async () => {}} />
    </div>
  );
}
