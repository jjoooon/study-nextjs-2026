import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'View our pricing plans',
};

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Pricing</h1>
      <p className="text-lg text-gray-700">
        This is the pricing page. Part of the marketing route group.
      </p>
    </div>
  );
}
