import { ReactNode } from 'react';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Marketing pages can add their own header/footer */}
      {children}
    </div>
  );
}
