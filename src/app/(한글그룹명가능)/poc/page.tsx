import { Navigation } from '@/shared/components/layout/Navigation';

/**
 * Home Page - 애플리케이션 메인 페이지
 */
export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">HELLO POC!</div>
      </main>
    </>
  );
}
