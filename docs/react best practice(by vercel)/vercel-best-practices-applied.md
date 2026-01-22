# Vercel Best Practices 실무 적용 가이드

> **목적**: 이 문서는 Vercel React Best Practices를 실무 프로젝트에 단계적으로 적용하는 방법을 안내합니다.

---

## 📋 적용 우선순위 로드맵

### 1주차: 🔴 CRITICAL (즉시 적용)

#### 1. 배럴 파일 임포트 제거

**현재 프로젝트에서의 예시:**

```typescript
// ❌ 현재: src/features/products/components/ProductList.tsx
import { SkeletonList } from '@/shared/components/ui/Skeleton';

// ✅ 개선:
import SkeletonList from '@/shared/components/ui/Skeleton/SkeletonList';
```

**적용 방법:**
```bash
# 프로젝트 전체에서 배럴 임포트 찾기
grep -r "import.*from '@/shared/components/ui" src/

# 일괄 변환 스크립트
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # 배럴 임포트를 직접 임포트로 변환
  sed -i "s/import { \([^}]*\) } from '\(.*\)'/import \1 from '\2\/\1'/g" "$file"
done
```

**Next.js 최적화 설정 추가:**

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*'],
  },
};
```

---

#### 2. 무거운 컴포넌트 동적 임포트

**적용 대상:**
- ProductGrid
- ProductFilters
- 상세/수정 페이지 컴포넌트

**실제 적용 코드:**

```typescript
// src/features/products/sections/ListSection.tsx
import dynamic from 'next/dynamic';

// ✅ 동적 임포트로 변경
const ProductGrid = dynamic(
  () => import('@/features/products/components/ProductGrid').then(mod => ({ default: mod.ProductGrid })),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-64 animate-pulse rounded-lg" />
        ))}
      </div>
    ),
    ssr: false // 필요시 서버 사이드 렌더링 비활성화
  }
);

const ProductList = dynamic(
  () => import('@/features/products/components/ProductList').then(mod => ({ default: mod.default })),
  {
    loading: () => <SkeletonList count={5} />
  }
);
```

**성능 측정:**
```bash
# 빌드 후 번들 크기 확인
npm run build

# 분석 리포트 생성
npm run analyze
```

---

#### 3. Promise.all()로 병렬 데이터 가져오기

**현재 코드 개선:**

```typescript
// src/features/products/hooks/useProducts.ts
// ✅ 이미 잘 구현되어 있음! RTK Query가 자동으로 처리

// 하지만 Server Components에서는 명시적으로 적용 필요:

// app/products/page.tsx (Server Component 예시)
async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // ✅ 병렬 가져오기
  const [products, categories, user] = await Promise.all([
    fetchProducts(searchParams),
    fetchCategories(),
    fetchUser()
  ]);

  return (
    <div>
      <ProductFilters categories={categories} />
      <ProductList products={products} />
    </div>
  );
}
```

---

### 2주차: 🟡 HIGH (최우선 적용)

#### 1. Suspense 경계로 스트리밍 렌더링

**적용 예시:**

```typescript
// src/app/sample/products/pages/List.tsx
import { Suspense } from 'react';

export default function ListSection() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ✅ 헤더는 즉시 렌더링 */}
      <PageHeader />

      {/* ✅ 필터는 별도로 로딩 */}
      <Suspense fallback={<FiltersSkeleton />}>
        <ProductFiltersWrapper />
      </Suspense>

      {/* ✅ 제품 목록은 독립적으로 로딩 */}
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsWrapper />
      </Suspense>
    </div>
  );
}

// 별도의 데이터 가져오기 컴포넌트
async function ProductsWrapper() {
  const products = await fetchProducts();
  return <ProductList products={products} />;
}
```

---

#### 2. React.cache()로 중복 제거

**서버 사이드에서의 적용:**

```typescript
// src/lib/cache.ts
import { cache } from 'react';

export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user?.id) return null;

  return await db.user.findUnique({
    where: { id: session.user.id }
  });
});

export const getUserPreferences = cache(async (userId: string) => {
  return await db.preference.findUnique({
    where: { userId }
  });
});
```

---

### 3주차: 🟢 MEDIUM (점진적 적용)

#### 1. React.memo로 컴포넌트 최적화

**ProductItem 컴포넌트 추출:**

```typescript
// src/features/products/components/ProductItem.tsx
import { memo } from 'react';

interface ProductItemProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

// ✅ 메모이즈된 컴포넌트
export const ProductItem = memo(function ProductItem({ product, onProductClick }: ProductItemProps) {
  return (
    <div
      className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onProductClick(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onProductClick(product);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            ₩{product.price.toLocaleString()}
          </p>
        </div>
        <StatusBadge status={product.status} />
      </div>
    </div>
  );
});
```

**ProductList에서 사용:**

```typescript
// src/features/products/components/ProductList.tsx
import { ProductItem } from './ProductItem';

export default function ProductList({ products, isLoading, onProductClick }: ProductListProps) {
  if (isLoading) {
    return <SkeletonList count={5} />;
  }

  if (products.length === 0) {
    return <EmptyList message="등록된 제품이 없습니다." />;
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        // ✅ 메모이즈된 컴포넌트 사용
        <ProductItem
          key={product.id}
          product={product}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
}
```

---

#### 2. useCallback으로 핸들러 최적화

**ListSection에서의 적용:**

```typescript
// src/features/products/sections/ListSection.tsx
import { useCallback } from 'react';

function Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, filters, sort, isLoading, viewMode } = useProducts();

  // ✅ useCallback으로 메모이즈
  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    updateFilters(newFilters);
  }, [updateFilters]);

  const handleSortChange = useCallback((sortBy: string) => {
    const sortOrder: 'asc' | 'desc' =
      sort.sortBy === sortBy && sort.sortOrder === 'asc' ? 'desc' : 'asc';
    updateSort({ sortBy, sortOrder });
  }, [sort.sortBy, sort.sortOrder, updateSort]);

  const handleProductClick = useCallback((product: (typeof products)[0]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', product.id);
    router.push(`${PRODUCTS_ROUTES.DETAIL}?${params.toString()}`);
  }, [searchParams, router]);

  const handleNewProductClick = useCallback(() => {
    router.push(`${PRODUCTS_ROUTES.NEW}?${searchParams.toString()}`);
  }, [searchParams, router]);

  const updateViewModeCallback = useCallback((mode: 'table' | 'grid') => {
    updateViewMode(mode);
  }, [updateViewMode]);

  // ... 나머지 코드
}
```

---

#### 3. content-visibility로 긴 목록 최적화

**CSS 추가:**

```css
/* src/app/globals.css */
.message-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 200px;
}

.product-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 150px;
}
```

**적용:**

```typescript
// src/features/products/components/ProductList.tsx
export default function ProductList({ products, isLoading, onProductClick }: ProductListProps) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <ProductItem product={product} onProductClick={onProductClick} />
        </div>
      ))}
    </div>
  );
}
```

---

### 4주차: 🔵 LOW (시간 허용 시)

#### 1. 프리로딩 추가

**호버 시 프리로드:**

```typescript
// src/features/products/components/ProductCard.tsx
import { useRouter } from 'next/navigation';

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  const preload = useCallback(() => {
    // ✅ 호버 시 상세 페이지 프리로드
    router.prefetch(`/sample/products/Detail?id=${product.id}`);
  }, [product.id, router]);

  return (
    <div
      className="bg-white rounded-lg shadow p-6"
      onMouseEnter={preload}
      onFocus={preload}
    >
      {/* 제품 정보 */}
    </div>
  );
}
```

---

## 📊 성능 측정 및 모니터링

### 1. 빌드 전후 크기 비교

```bash
# 현재 상태 측정
npm run build
# .next/analyze/output.html 확인

# 최적화 후 측정
npm run build
# 개선된 번들 크기 확인
```

### 2. Lighthouse 성능 점수

```bash
# Lighthouse CLI 설치
npm install -g lighthouse

# 측정 실행
lighthouse http://localhost:3000 --view
```

### 3. Core Web Vitals 모니터링

```typescript
// src/app/layout.tsx
export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* ✅ Web Vitals 리포팅 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    console.log('[Web Vitals]', entry.name, entry.value);
                    // Analytics로 전송
                    if (window.gtag) {
                      window.gtag('event', entry.name, {
                        value: Math.round(entry.name === 'CLS' ? entry.value * 1000 : entry.value),
                        event_label: entry.id,
                        non_interaction: true,
                      });
                    }
                  }
                });
                observer.observe({ entryTypes: ['web-vital'] });
              }
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🎯 체크리스트

### 개발자별 확인사항

**주차별 진행 상황:**

- [ ] **1주차**
  - [ ] 배럴 파일 임포트 제거
  - [ ] Next.js optimizePackageImports 설정
  - [ ] 무거운 컴포넌트 동적 임포트 적용
  - [ ] Promise.all()로 데이터 병렬 가져오기

- [ ] **2주차**
  - [ ] Suspense 경계 추가
  - [ ] React.cache()로 중복 제거
  - [ ] Server Actions 인증 확인

- [ ] **3주차**
  - [ ] React.memo로 컴포넌트 최적화
  - [ ] useCallback으로 핸들러 최적화
  - [ ] content-visibility 적용

- [ ] **4주차**
  - [ ] 프리로딩 추가
  - [ ] 기타 마이크로 최적화

---

## 📈 기대 효과

### 성능 개선 목표

| 지표 | 현재 | 목표 | 개선율 |
|------|------|------|--------|
| Initial Bundle Size | ~500KB | ~300KB | 40% ↓ |
| Time to Interactive (TTI) | 3.5s | 2.0s | 43% ↓ |
| Largest Contentful Paint (LCP) | 2.8s | 1.5s | 46% ↓ |
| First Contentful Paint (FCP) | 1.2s | 0.8s | 33% ↓ |
| Build Time | 45s | 30s | 33% ↓ |

### 개발 경험 개선

- ⚡ 더 빠른 HMR (Hot Module Replacement)
- 🚀 빠른 개발 서버 부팅
- 📦 더 작은 번들 크기
- 🔍 더 나은 코드 분할

---

## 🔍 문제 해결 가이드

### 일반적인 이슈들

**1. 동적 임포트 후 스타일 깨짐**

```typescript
// ❌ 문제: CSS가 로드되지 않음
const ProductGrid = dynamic(() => import('./ProductGrid'), { ssr: false });

// ✅ 해결: CSS 파일 명시적으로 로드
const ProductGrid = dynamic(() => import('./ProductGrid'), {
  ssr: false,
  loading: () => <SkeletonGrid />
});
```

**2. React.memo가 작동하지 않음**

```typescript
// ❌ 문제: 객체 참조가 매번 변경됨
<ProductItem product={product} onClick={handleClick} />

// ✅ 해결: useCallback 사용
const handleClick = useCallback(() => {
  // ...
}, []);

<ProductItem product={product} onClick={handleClick} />
```

**3. Suspense가 hydration 오류 발생**

```typescript
// ❌ 문제: SSR과 CSR 결과 불일치
<Suspense fallback={<Loading />}>
  <div>{typeof window !== 'undefined' && window.innerWidth}</div>
</Suspense>

// ✅ 해결: 클라이언트 전용 컴포넌트 분리
<Suspense fallback={<Loading />}>
  <ClientOnlyWidth />
</Suspense>
```

---

## 📚 추가 학습 자료

- [Vercel 공식 블로그 - 성능 최적화](https://vercel.com/blog)
- [React 공식 문서 - 성능](https://react.dev/learn/render-and-commit)
- [Next.js 공식 문서 - 최적화](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev - Core Web Vitals](https://web.dev/vitals/)

---

**마지막 업데이트**: 2025년 1월
**유지 관리자**: 개발팀
