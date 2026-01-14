import type { Metadata } from 'next';

import '@/shared/styles/globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Next.js 16 + Redux Toolkit',
  description: 'Modern Next.js application with Redux Toolkit and MSW',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
