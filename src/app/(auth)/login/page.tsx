import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account',
};

export default function LoginPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <p className="text-gray-600 text-center">Login form will be implemented here.</p>
    </div>
  );
}
