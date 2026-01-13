import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your settings',
};

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Settings</h1>
      <p className="text-lg text-gray-700">Manage your account settings here. This is a protected route.</p>
    </div>
  );
}
