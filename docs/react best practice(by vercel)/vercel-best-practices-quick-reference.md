# Vercel Best Practices 빠른 참조

> **⚡ 30초 만에 핵심 규칙 확인하기**

---

## 🔴 CRITICAL (지금 당장 적용하세요)

### 1. 배럴 파일 임포트 ❌ → 직접 임포트 ✅

```typescript
// ❌ 나쁨
import { Check, X, Menu } from 'lucide-react'

// ✅ 좋음
import Check from 'lucide-react/dist/esm/icons/check'
import X from 'lucide-react/dist/esm/icons/x'
import Menu from 'lucide-react/dist/esm/icons/menu'
```

**또는 Next.js 설정:**
```js
// next.config.ts
experimental: {
  optimizePackageImports: ['lucide-react']
}
```

---

### 2. 병렬 데이터 가져오기

```typescript
// ❌ 순차적 (느림)
const user = await fetchUser()
const posts = await fetchPosts()

// ✅ 병렬 (빠름)
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts()
])
```

---

### 3. 동적 임포트

```typescript
// ❌ 즉시 로드 (큰 번들)
import { HeavyChart } from './chart'

// ✅ 필요 시 로드 (작은 번들)
const HeavyChart = dynamic(() => import('./chart'), {
  loading: () => <Skeleton />
})
```

---

### 4. Server Actions 인증

```typescript
'use server'

// ❌ 위험함! 누구나 호출 가능
export async function deleteUser(id: string) {
  await db.user.delete({ where: { id } })
}

// ✅ 안전함! 인증 확인
export async function deleteUser(id: string) {
  const session = await verifySession()
  if (!session) throw new Error('Unauthorized')

  await db.user.delete({ where: { id } })
}
```

---

## 🟡 HIGH (최우선 적용)

### 5. Suspense로 스트리밍

```typescript
// ❌ 전체 페이지가 데이터를 기다림
async function Page() {
  const data = await fetchData()
  return <Layout data={data} />
}

// ✅ 레이아웃이 즉시 표시됨
function Page() {
  return (
    <Layout>
      <Suspense fallback={<Skeleton />}>
        <DataDisplay />
      </Suspense>
    </Layout>
  )
}
```

---

### 6. content-visibility로 긴 목록 최적화

```css
.product-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 150px;
}
```

**1000개 항목의 경우 10배 더 빠름!**

---

### 7. 필요할 때만 await

```typescript
// ❌ 항상 기다림
async function handle(skip) {
  const data = await fetchData()
  if (skip) return { skipped: true }
  return processData(data)
}

// ✅ 필요할 때만 기다림
async function handle(skip) {
  if (skip) return { skipped: true }
  const data = await fetchData()
  return processData(data)
}
```

---

## 🟢 MEDIUM (점진적 적용)

### 8. React.memo로 재렌더링 방지

```typescript
// ❌ 부모가 렌더링될 때마다 재렌더링
function ProductItem({ product }) {
  return <div>{product.name}</div>
}

// ✅ props가 변경될 때만 재렌더링
const ProductItem = memo(function ProductItem({ product }) {
  return <div>{product.name}</div>
})
```

---

### 9. useCallback로 안정적인 핸들러

```typescript
// ❌ 매번 새로운 함수
function Component() {
  const handleClick = () => doSomething(value)
  return <Button onClick={handleClick} />
}

// ✅ 안정적인 함수 참조
function Component() {
  const handleClick = useCallback(() => doSomething(value), [value])
  return <Button onClick={handleClick} />
}
```

---

### 10. Passive Event Listeners

```typescript
// ❌ 스크롤 차단
document.addEventListener('touchstart', handler)

// ✅ 즉시 스크롤
document.addEventListener('touchstart', handler, { passive: true })
```

---

## 🔵 LOW (시간 날 때)

### 11. CSS 배치

```typescript
// ❌ 여러 번 리플로우
el.style.width = '100px'
const width = el.offsetWidth
el.style.height = '200px'

// ✅ 한 번만 리플로우
el.style.cssText = 'width: 100px; height: 200px'
const { width, height } = el.getBoundingClientRect()
```

---

### 12. toSorted()로 불변성 유지

```typescript
// ❌ 원본 배열 변경 (React에서 위험)
const sorted = list.sort()

// ✅ 새 배열 생성 (안전)
const sorted = list.toSorted()
```

---

### 13. 조건부 렌더링 (0, NaN 처리)

```typescript
// ❌ "0"이 렌더링됨
<div>{count && <Badge>{count}</Badge>}</div>

// ✅ 아무것도 안 렌더링됨
<div>{count > 0 ? <Badge>{count}</Badge> : null}</div>
```

---

### 14. Map/Set으로 O(1) 룩업

```typescript
// ❌ O(n) - 느림
const user = users.find(u => u.id === id)

// ✅ O(1) - 빠름
const userMap = new Map(users.map(u => [u.id, u]))
const user = userMap.get(id)
```

---

### 15. React.cache()로 중복 제거

```typescript
import { cache } from 'react'

// ✅ 요청 내에서 한 번만 실행
export const getUser = cache(async (id: string) => {
  return await db.user.findUnique({ where: { id } })
})

// 여러 번 호출해도 한 번만 쿼리 실행됨
const user1 = await getUser('123')
const user2 = await getUser('123') // 캐시 적중
```

---

## 📊 영향도 비교

| 우선순위 | 영향도 | 규칙 수 | 적용 시간 | 성능 향상 |
|---------|--------|---------|-----------|-----------|
| 🔴 CRITICAL | 매우 높음 | 7개 | 1-2일 | 2-10배 |
| 🟡 HIGH | 높음 | 5개 | 3-5일 | 30-50% |
| 🟢 MEDIUM | 중간 | 12개 | 1-2주 | 10-30% |
| 🔵 LOW | 낮음 | 21개 | 시간 허용 시 | 5-15% |

---

## 🎯 시작하기: Top 3

1. **배럴 파일 제거** → 15-70% 빠른 빌드
2. **Promise.all()** → 2-10배 빠른 데이터 로딩
3. **동적 임포트** → 30-40% 작은 번들

---

## 📝 빠른 체크리스트

개발 전에 확인하세요:

```typescript
// ✅ 임포트 확인
import { ... } from 'library' → ❌ 피하기
import ... from 'library/feature' → ✅ 선호

// ✅ 데이터 가져오기 확인
await fetch1(); await fetch2() → ❌ 느림
await Promise.all([fetch1(), fetch2()]) → ✅ 빠름

// ✅ 컴포넌트 확인
function Comp() { ... } → memo()로 감싸기
function onClick() { ... } → useCallback()로 감싸기

// ✅ 이벤트 리스너 확인
addEventListener('event', handler) → ❌ 차단 가능
addEventListener('event', handler, { passive: true }) → ✅ 차단 없음
```

---

**🔗 전체 가이드:**
- [상세 가이드](./vercel-react-best-practices.md)
- [실무 적용](./vercel-best-practices-applied.md)
