# Next.js 기본 지식

이 문서는 현재 프로젝트를 이해하기 위해 필요한 Next.js의 핵심 개념과 App Router 사용법을 설명합니다.

## 목차

1. [Next.js란 무엇인가?](#nextjs란-무엇인가)
2. [핵심 특징](#핵심-특징)
3. [프로젝트 구조](#프로젝트-구조)
4. [App Router](#app-router)
5. [라우팅](#라우팅)
6. [데이터 가져오기](#data-fetching)
7. [레이아웃과 템플릿](#레이아웃과-템플릿)
8. [최적화 기술](#최적화-기술)
9. [배포 및 운영](#배포-및-운영)

---

## Next.js란 무엇인가?

### 정의

Next.js는 Vercel에서 개발한 **React 기반的全스택 프레임워크**로, 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), API Routes 등의 기능을 제공합니다.

### 프로젝트의 Next.js 버전

```json
{
  "next": "16.1.1"
}
```

**Next.js 16의 새로운 특징:**
- ✅ Turbopack 기본 활성화 (dev 모드)
- ✅ 성능 및 안정성 개선
- ✅ React 19 완벽 지원
- ✅ App Router 안정화
- ✅ Partial Prerendering (PPR) 개선

---

## 핵심 특징

### 1. 서버 사이드 렌더링 (SSR)

```typescript
// app/page.tsx
export default async function Home() {
  // 서버에서 데이터 가져오기
  const products = await fetch('https://api.example.com/products').then(r => r.json());

  return (
    <main>
      {products.map(p => <div key={p.id}>{p.name}</div>)}
    </main>
  );
}
```

**장점:**
- 빠른 초기 페이지 로딩
- SEO 친화적
- 서버 리소스 활용 (DB, 파일 시스템)

### 2. 정적 사이트 생성 (SSG)

```typescript
// 빌드 시점에 데이터 가져오기
export const dynamic = 'force-static'; // 또는 fetch에 { cache: 'force-cache' }

export default async function Blog() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // 1시간마다 재검증
  }).then(r => r.json());

  return <div>{posts.map(/* ... */)}</div>;
}
```

### 3. Incremental Static Regeneration (ISR)

```typescript
// 일정 주기로 페이지 재생성
export const revalidate = 3600; // 1시간마다

export default async function Products() {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }
  }).then(r => r.json());

  return <div>{products.map(/* ... */)}</div>;
}
```

### 4. API Routes

```typescript
// app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello, World!' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
```

---

## 프로젝트 구조

### 전체 구조

```
study-nextjs-2026/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── page.tsx            # 홈 페이지 (/)
│   │   ├── loading.tsx         # 전역 로딩 UI
│   │   ├── error.tsx           # 전역 에러 UI
│   │   ├── global-error.tsx    # 치명적 에러 UI
│   │   ├── login/
│   │   │   └── page.tsx        # 로그인 페이지 (/login)
│   │   └── sample/             # 샘플 애플리케이션
│   │       ├── layout.tsx      # 샘플 레이아웃
│   │       ├── dashboard/
│   │       │   ├── page.tsx    # 대시보드 (/sample/dashboard)
│   │       │   └── loading.tsx # 대시보드 로딩 UI
│   │       └── products/
│   │           ├── [pageId]/   # 동적 라우트
│   │           │   └── page.tsx
│   │           └── pages/      # 페이지 컴포넌트
│   │               ├── List.tsx
│   │               ├── Detail.tsx
│   │               ├── New.tsx
│   │               └── Edit.tsx
│   │
│   ├── features/               # 기능별 컴포넌트
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   └── products/
│   │       ├── components/
│   │       ├── sections/
│   │       ├── hooks/
│   │       └── store/
│   │
│   ├── shared/                 # 공유 컴포넌트 및 유틸리티
│   │   ├── components/
│   │   │   ├── Navigation.tsx
│   │   │   ├── AuthGuard.tsx
│   │   │   └── ui/            # 기본 UI 컴포넌트
│   │   ├── config/
│   │   ├── lib/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── redux/                  # Redux 설정
│   │   ├── config.ts
│   │   ├── hooks.ts
│   │   ├── reducers/
│   │   └── registry/
│   │
│   └── mocks/                  # MSW Mock 설정
│       ├── browser.ts
│       ├── server.ts
│       └── handlers/
│
├── public/                     # 정적 파일
├── docs/                       # 프로젝트 문서
├── .storybook/                 # Storybook 설정
├── next.config.ts              # Next.js 설정
├── tailwind.config.ts          # Tailwind CSS 설정
├── tsconfig.json               # TypeScript 설정
└── package.json                # 프로젝트 의존성
```

### 주요 설정 파일

#### next.config.ts

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // 패키지 Import 최적화
  experimental: {
    optimizePackageImports: [
      '@reduxjs/toolkit',
      'react-redux',
      'lucide-react',
    ],
  },
};

export default nextConfig;
```

---

## App Router

### 파일 시스템 라우팅

Next.js 13+부터 도입된 App Router는 **파일 시스템 기반의 라우팅**을 제공합니다.

```
app/
├── layout.tsx          # → / (루트 레이아웃)
├── page.tsx            # → / (홈 페이지)
├── about/
│   └── page.tsx        # → /about
├── blog/
│   ├── page.tsx        # → /blog
│   └── [slug]/         # → /blog/:slug
│       └── page.tsx
└── api/
    └── hello/
        └── route.ts    # → /api/hello
```

### 필수 파일

#### layout.tsx (레이아웃)

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Study App',
  description: 'Next.js 학습 프로젝트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

**특징:**
- 자식 경로에 레이아웃 적용
- 상태 유지 (navigation 시 재렌더링 안 됨)
- 중첩 가능

#### page.tsx (페이지)

```typescript
// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>홈 페이지</h1>
    </main>
  );
}
```

**특징:**
- 경로의 UI 정의
- Server Component가 기본
- 'use client'로 Client Component 가능

#### loading.tsx (로딩 UI)

```typescript
// app/sample/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}
```

**특징:**
- 페이지 로딩 중에 표시
- Server Suspense 사용

#### error.tsx (에러 UI)

```typescript
// app/sample/dashboard/error.tsx
'use client'; // Error Boundary는 Client Component

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>에러가 발생했습니다</h2>
      <p>{error.message}</p>
      <button onClick={reset}>다시 시도</button>
    </div>
  );
}
```

**특징:**
- Client Component여야 함
- 자식 경로의 에러를 포착

---

## 라우팅

### 동적 라우트

```typescript
// app/sample/products/[pageId]/page.tsx
import dynamic from 'next/dynamic';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;

  // 동적으로 페이지 컴포넌트 로드
  const PageComponent = dynamic(
    () => import(`../pages/${pageId}`),
    { ssr: true }
  );

  return <PageComponent />;
}
```

### 동적 세그먼트 타입

```typescript
// 1. 단일 동적 세그먼트
app/products/[id]/page.tsx      # → /products/123
type Params = { id: string }

// 2. 여러 동적 세그먼트
app/products/[category]/[id]/page.tsx  # → /products/electronics/123
type Params = { category: string; id: string }

// 3. 캡처 모든 세그먼트
app/docs/[...slug]/page.tsx      # → /docs/a/b/c
type Params = { slug: string[] }

// 4. 선택적 캡처 모든 세그먼트
app/[[...slug]]/page.tsx         # → /, /a, /a/b
type Params = { slug?: string[] }
```

### 프로그래매틱 네비게이션

```typescript
'use client';

import { useRouter } from 'next/navigation';

export function NavigationButtons() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push('/dashboard')}>
        대시보드로 이동
      </button>
      <button onClick={() => router.replace('/login')}>
        로그인 페이지로 이동 (기록 교체)
      </button>
      <button onClick={() => router.back()}>
        뒤로 가기
      </button>
      <button onClick={() => router.refresh()}>
        새로고침
      </button>
    </div>
  );
}
```

**참고:**
- `next/router` (Pages Router) → 사용하지 않음
- `next/navigation` (App Router) → 사용

### Link 컴포넌트

```typescript
import Link from 'next/link';

export function Navigation() {
  return (
    <nav>
      <Link href="/">홈</Link>
      <Link href="/dashboard">대시보드</Link>

      {/* 동적 링크 */}
      <Link href={`/products/${productId}`}>
        상품 상세
      </Link>

      {/* 쿼리 파라미터 */}
      <Link href="/search?q=nextjs">
        검색
      </Link>
    </nav>
  );
}
```

---

## 데이터 가져오기

### Fetch API와 캐싱

Next.js 13+부터 확장된 `fetch` API를 사용합니다.

```typescript
// 1. 기본 사용 (캐시됨)
const data = await fetch('https://api.example.com/data').then(r => r.json());

// 2. 캐시하지 않음
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
}).then(r => r.json());

// 3. 일정 시간마다 재검증 (ISR)
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 } // 60초마다
}).then(r => r.json());

// 4. 요청마다 다른 데이터로 캐시
const data = await fetch(`https://api.example.com/data?id=${id}`, {
  next: { tags: ['product-data'] } // 태그 기반 재검증
}).then(r => r.json());
```

### 렌더링 전략

```typescript
// 1. Static Generation (기본)
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache' // 또는 next: { revalidate: 인트 }
  });
  return <div>{/* ... */}</div>;
}

// 2. Server-Side Rendering
export const revalidate = 0; // 또는 cache: 'no-store'
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 0 } // 또는 cache: 'no-store'
  });
  return <div>{/* ... */}</div>;
}

// 3. Incremental Static Regeneration
export const revalidate = 3600; // 1시간마다
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  });
  return <div>{/* ... */}</div>;
}
```

### 서버 액션 (Server Actions)

```typescript
// app/actions.ts
'use server';

export async function createProduct(formData: FormData) {
  const name = formData.get('name');
  const price = formData.get('price');

  // DB 작업 수행
  const product = await db.products.create({
    data: { name, price },
  });

  return product;
}

// app/products/new/page.tsx
import { createProduct } from '../actions';

export default function NewProductPage() {
  return (
    <form action={createProduct}>
      <input name="name" placeholder="상품명" />
      <input name="price" type="number" placeholder="가격" />
      <button type="submit">생성</button>
    </form>
  );
}
```

---

## 레이아웃과 템플릿

### 중첩 레이아웃

```typescript
// app/layout.tsx (루트)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <h1>공통 헤더</h1>
        {children}
        <footer>공통 푸터</footer>
      </body>
    </html>
  );
}

// app/sample/layout.tsx (샘플 섹션 레이아웃)
export default function SampleLayout({ children }) {
  return (
    <div className="sample-layout">
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
```

### 레이아웃 vs 템플릿

| 특징 | layout.tsx | template.tsx |
|------|------------|--------------|
| **상태 유지** | ✅ 유지 | ❌ 재마운트 |
| **재렌더링** | ❌ 안 됨 | ✅ 됨 |
| **용도** | 공통 UI, 내비게이션 | 상태가 초기화되야 하는 UI |

```typescript
// template.tsx 예시
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* 경로 변경 시마다 재마운트 */}
      {children}
    </div>
  );
}
```

---

## 최적화 기술

### 1. 이미지 최적화

```typescript
import Image from 'next/image';

export function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={300}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

### 2. 폰트 최적화

```typescript
import { Inter, Noto_Sans_KR } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-kr',
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${notoSansKR.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### 3. 코드 분할

```typescript
import dynamic from 'next/dynamic';

// 기본 지연 로딩
const HeavyChart = dynamic(() => import('@/components/HeavyChart'));

// 로딩 UI 커스텀
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // 클라이언트 사이드만 렌더링
});

// 조건부 로딩
const AdminPanel = dynamic(
  () => import('@/components/AdminPanel'),
  { loading: () => <AdminPanelSkeleton /> }
);

export function Dashboard({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {isAdmin && <AdminPanel />}
    </div>
  );
}
```

### 4. 메타 데이터 최적화

```typescript
import type { Metadata } from 'next';

// 정적 메타데이터
export const metadata: Metadata = {
  title: '상품 목록',
  description: '모든 상품을 확인하세요',
  openGraph: {
    title: '상품 목록',
    description: '모든 상품을 확인하세요',
    images: ['/og-image.png'],
  },
};

// 동적 메타데이터
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}
```

---

## 배포 및 운영

### Vercel에 배포

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 배포
vercel

# 3. 프로덕션 배포
vercel --prod
```

### 환경 변수 설정

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App
DATABASE_URL=postgresql://...
```

### 빌드 및 시작

```bash
# 개발 모드 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start

# 타입 체크
npm run type-check

# Lint
npm run lint
```

---

## 요약

### Next.js 핵심 개념

1. **App Router**: 파일 시스템 기반 라우팅
2. **Server Component**: 기본 렌더링 방식
3. **데이터 가져오기**: 확장된 `fetch` API
4. **최적화**: 이미지, 폰트, 코드 분할 자동화
5. **배포**: Vercel에 최적화

### 프로젝트 적용 가이드

- **레이아웃**: app/layout.tsx에서 공통 UI 정의
- **페이지**: app/*/page.tsx에서 경로별 UI 구현
- **데이터**: Server Component에서 `fetch`로 데이터 가져오기
- **상호작용**: 'use client'로 Client Component 명시
- **최적화**: Image, dynamic, Metadata 활용

### 다음 학습 단계

1. [React 기본 지식](./react-fundamentals.md) - React 이해하기
2. [프로젝트 아키텍처](./architecture.md) - 프로젝트 구조 파악
3. [코딩 컨벤션](./coding-conventions.md) - 코드 스타일 가이드

---

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [App Router 문서](https://nextjs.org/docs/app)
- [Next.js 16 변경 사항](https://nextjs.org/blog)
- [Turbopack 문서](https://turbo.build/pack/docs)
