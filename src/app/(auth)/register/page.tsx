import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new account',
};

export default function RegisterPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      <p className="text-gray-600 text-center">Registration form will be implemented here.</p>
    </div>
  );
}
