# Vercel React Best Practices 가이드

**버전 1.0.0**
Vercel Engineering
2025년 1월

> **목차**
> 이 가이드는 Vercel 엔지니어링 팀이 정리한 React 및 Next.js 애플리케이션 성능 최적화 가이드입니다. 40개 이상의 규칙이 8개 카테고리로 분류되어 있으며, 영향도(CRITICAL → LOW)별로 우선순위가 정해져 있습니다.

---

## 📋 목차

1. [워터폴 제거 (Eliminating Waterfalls)](#1-워터폴-제거-eliminating-waterfalls) — **🔴 CRITICAL**
2. [번들 크기 최적화 (Bundle Size Optimization)](#2-번들-크기-최적화-bundle-size-optimization) — **🔴 CRITICAL**
3. [서버 사이드 성능 (Server-Side Performance)](#3-서버-사이드-성능-server-side-performance) — **🟡 HIGH**
4. [클라이언트 사이드 데이터 가져오기 (Client-Side Data Fetching)](#4-클라이언트-사이드-데이터-가져오기-client-side-data-fetching) — **🟢 MEDIUM-HIGH**
5. [재렌더링 최적화 (Re-render Optimization)](#5-재렌더링-최적화-re-render-optimization) — **🟢 MEDIUM**
6. [렌더링 성능 (Rendering Performance)](#6-렌더링-성능-rendering-performance) — **🟢 MEDIUM**
7. [JavaScript 성능 (JavaScript Performance)](#7-javascript-성능-javascript-performance) — **🔵 LOW-MEDIUM**
8. [고급 패턴 (Advanced Patterns)](#8-고급-패턴-advanced-patterns) — **⚪ LOW**

---

## 1. 워터폴 제거 (Eliminating Waterfalls)

**영향도: 🔴 CRITICAL**

워터폴(Waterfall)은 성능의 #1 적입니다. 각 순차적 await는 전체 네트워크 지연시간을 추가합니다. 워터폴을 제거하는 것이 가장 큰 성능 향상을 가져옵니다.

### 1.1 필요할 때까지 Await 지연하기 (Defer Await Until Needed)

**영향도: 🟡 HIGH (사용하지 않는 코드 경로 차단 방지)**

실제로 사용되는 분기에서만 `await` 작업을 수행하여 필요하지 않은 코드 경로가 차단되지 않도록 합니다.

**❌ 잘못된 예: 두 경로 모두 차단됨**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  const userData = await fetchUserData(userId)

  if (skipProcessing) {
    // 즉시 반환하지만 userData를 위해 기다림
    return { skipped: true }
  }

  // 이 분기만 userData 사용
  return processUserData(userData)
}
```

**✅ 올바른 예: 필요할 때만 차단**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  if (skipProcessing) {
    // 즉시 반환, 기다림 없음
    return { skipped: true }
  }

  // 필요할 때만 가져오기
  const userData = await fetchUserData(userId)
  return processUserData(userData)
}
```

**💡 핵심 포인트:**
- 건너뛰기 분기가 자주 실행되거나
- 지연된 작업이 비용이 클 때 특히 유용합니다.

---

### 1.2 의존성 기반 병렬화 (Dependency-Based Parallelization)

**영향도: 🔴 CRITICAL (2-10배 개선)**

부분적 의존성이 있는 작업의 경우 `better-all`을 사용하여 병렬화를 극대화합니다.

**❌ 잘못된 예: profile이 config를 불필요하게 기다림**

```typescript
const [user, config] = await Promise.all([
  fetchUser(),
  fetchConfig()
])
const profile = await fetchProfile(user.id)
```

**✅ 올바른 예: config와 profile을 병렬 실행**

```typescript
import { all } from 'better-all'

const { user, config, profile } = await all({
  async user() { return fetchUser() },
  async config() { return fetchConfig() },
  async profile() {
    return fetchProfile((await this.$.user).id)
  }
})
```

**📚 참고:** https://github.com/shuding/better-all

---

### 1.3 API Routes에서 워터폴 체인 방지 (Prevent Waterfall Chains in API Routes)

**영향도: 🔴 CRITICAL (2-10배 개선)**

API Routes와 Server Actions에서 독립적인 작업을 즉시 시작하세요. 아직 await하지 않더라도요.

**❌ 잘못된 예: config가 auth를 기다리고, data가 둘 다 기다림**

```typescript
export async function GET(request: Request) {
  const session = await auth()
  const config = await fetchConfig()
  const data = await fetchData(session.user.id)
  return Response.json({ data, config })
}
```

**✅ 올바른 예: auth와 config를 즉시 시작**

```typescript
export async function GET(request: Request) {
  const sessionPromise = auth()
  const configPromise = fetchConfig()
  const session = await sessionPromise
  const [config, data] = await Promise.all([
    configPromise,
    fetchData(session.user.id)
  ])
  return Response.json({ data, config })
}
```

---

### 1.4 독립 작업을 위한 Promise.all() (Promise.all() for Independent Operations)

**영향도: 🔴 CRITICAL (2-10배 개선)**

상호 의존성이 없는 비동기 작업은 `Promise.all()`을 사용하여 동시에 실행하세요.

**❌ 잘못된 예: 순차적 실행, 3번의 왕복**

```typescript
const user = await fetchUser()
const posts = await fetchPosts()
const comments = await fetchComments()
```

**✅ 올바른 예: 병렬 실행, 1번의 왕복**

```typescript
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
])
```

---

### 1.5 전략적 Suspense 경계 (Strategic Suspense Boundaries)

**영향도: 🟡 HIGH (더 빠른 초기 페인트)**

JSX를 반환하기 전에 async 컴포넌트에서 데이터를 기다리는 대신 Suspense 경계를 사용하여 데이터가 로드되는 동안 래퍼 UI를 더 빨리 표시하세요.

**❌ 잘못된 예: 데이터 가져오기가 래퍼를 차단**

```tsx
async function Page() {
  const data = await fetchData() // 전체 페이지 차단

  return (
    <div>
      <div>Sidebar</div>
      <div>Header</div>
      <div>
        <DataDisplay data={data} />
      </div>
      <div>Footer</div>
    </div>
  )
}
```

**✅ 올바른 예: 래퍼가 즉시 표시되고, 데이터가 스트림으로 들어옴**

```tsx
function Page() {
  return (
    <div>
      <div>Sidebar</div>
      <div>Header</div>
      <div>
        <Suspense fallback={<Skeleton />}>
          <DataDisplay />
        </Suspense>
      </div>
      <div>Footer</div>
    </div>
  )
}

async function DataDisplay() {
  const data = await fetchData() // 이 컴포넌트만 차단
  return <div>{data.content}</div>
}
```

**💡 핵심 포인트:**
- Sidebar, Header, Footer가 즉시 렌더링됨
- DataDisplay만 데이터를 기다림

---

## 2. 번들 크기 최적화 (Bundle Size Optimization)

**영향도: 🔴 CRITICAL**

초기 번들 크기를 줄이면 Time to Interactive와 Largest Contentful Paint가 개선됩니다.

### 2.1 배럴 파일 임포트 피하기 (Avoid Barrel File Imports)

**영향도: 🔴 CRITICAL (200-800ms 임포트 비용, 느린 빌드)**

사용하지 않는 수천 개의 모듈을 로드하는 것을 피하기 위해 배럴 파일이 아닌 소스 파일에서 직접 임포트하세요. **배럴 파일**은 여러 모듈을 다시 내보내는 진입점입니다 (예: `index.js`에서 `export * from './module'` 수행).

인기 있는 아이콘 및 컴포넌트 라이브러리는 진입 파일에 **최대 10,000개의 재내보기**가 있을 수 있습니다. 많은 React 패키지의 경우 **임포트하는 데만 200-800ms**가 소요되며, 이는 개발 속도와 프로덕션 콜드 스타트 모두에 영향을 미칩니다.

**❌ 잘못된 예: 전체 라이브러리 임포트**

```tsx
import { Check, X, Menu } from 'lucide-react'
// 1,583개 모듈 로드, 개발에서 ~2.8초 추가 소요
// 런타임 비용: 모든 콜드 스타트에서 200-800ms

import { Button, TextField } from '@mui/material'
// 2,225개 모듈 로드, 개발에서 ~4.2초 추가 소요
```

**✅ 올바른 예: 필요한 것만 임포트**

```tsx
import Check from 'lucide-react/dist/esm/icons/check'
import X from 'lucide-react/dist/esm/icons/x'
import Menu from 'lucide-react/dist/esm/icons/menu'
// 3개 모듈만 로드 (~2KB vs ~1MB)

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// 사용하는 것만 로드
```

**🔧 Next.js 13.5+ 대안:**

```js
// next.config.js - optimizePackageImports 사용
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@mui/material']
  }
}

// 그럼 인간 공학적인 배럴 임포트를 유지할 수 있음:
import { Check, X, Menu } from 'lucide-react'
// 빌드 시 자동으로 직접 임포트로 변환됨
```

**📊 성능 향상:**
- 15-70% 더 빠른 개발 부팅
- 28% 더 빠른 빌드
- 40% 더 빠른 콜드 스타트
- 상당히 더 빠른 HMR

**⚠️ 자주 영향받는 라이브러리:**
`lucide-react`, `@mui/material`, `@mui/icons-material`, `@tabler/icons-react`, `react-icons`, `@headlessui/react`, `@radix-ui/react-*`, `lodash`, `ramda`, `date-fns`, `rxjs`, `react-use`

**📚 참고:** https://vercel.com/blog/how-we-optimized-package-imports-in-next-js

---

### 2.2 조건부 모듈 로딩 (Conditional Module Loading)

**영향도: 🟡 HIGH (큰 데이터를 필요할 때만 로드)**

큰 데이터나 모듈은 기능이 활성화될 때만 로드하세요.

**예시: 애니메이션 프레임 지연 로딩**

```tsx
function AnimationPlayer({ enabled, setEnabled }: { enabled: boolean; setEnabled: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [frames, setFrames] = useState<Frame[] | null>(null)

  useEffect(() => {
    if (enabled && !frames && typeof window !== 'undefined') {
      import('./animation-frames.js')
        .then(mod => setFrames(mod.frames))
        .catch(() => setEnabled(false))
    }
  }, [enabled, frames, setEnabled])

  if (!frames) return <Skeleton />
  return <Canvas frames={frames} />
}
```

`typeof window !== 'undefined'` 체크는 SSR용 모듈 번들링을 방지하여 서버 번들 크기와 빌드 속도를 최적화합니다.

---

### 2.3 비중요 제3자 라이브러리 지연 (Defer Non-Critical Third-Party Libraries)

**영향도: 🟢 MEDIUM (수화 후 로드)**

분석, 로깅, 오류 추적은 사용자 상호작용을 차단하지 않습니다. 수화 후에 로드하세요.

**❌ 잘못된 예: 초기 번들 차단**

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**✅ 올바른 예: 수화 후 로드**

```tsx
import dynamic from 'next/dynamic'

const Analytics = dynamic(
  () => import('@vercel/analytics/react').then(m => m.Analytics),
  { ssr: false }
)

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

### 2.4 무거운 컴포넌트를 위한 동적 임포트 (Dynamic Imports for Heavy Components)

**영향도: 🔴 CRITICAL (TTI와 LCP에 직접적인 영향)**

초기 렌더링에 필요하지 않은 큰 컴포넌트는 `next/dynamic`을 사용하여 지연 로드하세요.

**❌ 잘못된 예: Monaco가 메인 청크와 번들됨 ~300KB**

```tsx
import { MonacoEditor } from './monaco-editor'

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```

**✅ 올바른 예: Monaco가 필요 시 로드됨**

```tsx
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(
  () => import('./monaco-editor').then(m => m.MonacoEditor),
  { ssr: false }
)

function CodePanel({ code }: { code: string }) {
  return <MonacoEditor value={code} />
}
```

---

### 2.5 사용자 의도 기반 프리로드 (Preload Based on User Intent)

**영향도: 🟢 MEDIUM (인지된 지연시간 감소)**

필요하기 전에 무거운 번들을 프리로드하여 인지된 지연시간을 줄이세요.

**예시: hover/focus 시 프리로드**

```tsx
function EditorButton({ onClick }: { onClick: () => void }) {
  const preload = () => {
    if (typeof window !== 'undefined') {
      void import('./monaco-editor')
    }
  }

  return (
    <button
      onMouseEnter={preload}
      onFocus={preload}
      onClick={onClick}
    >
      Open Editor
    </button>
  )
}
```

**예시: 기능 플래그 활성화 시 프리로드**

```tsx
function FlagsProvider({ children, flags }: Props) {
  useEffect(() => {
    if (flags.editorEnabled && typeof window !== 'undefined') {
      void import('./monaco-editor').then(mod => mod.init())
    }
  }, [flags.editorEnabled])

  return <FlagsContext.Provider value={flags}>
    {children}
  </FlagsContext.Provider>
}
```

---

## 3. 서버 사이드 성능 (Server-Side Performance)

**영향도: 🟡 HIGH**

서버 사이드 렌더링과 데이터 가져오기를 최적화하면 서버 사이드 워터폴을 제거하고 응답 시간을 줄입니다.

### 3.1 Server Actions를 API Routes처럼 인증하기 (Authenticate Server Actions Like API Routes)

**영향도: 🔴 CRITICAL (서버 변조에 대한 무단 액세스 방지)**

Server Actions (`"use server"`가 있는 함수)은 API Routes와 마찬가지로 공개 엔드포인트로 노출됩니다. **각 Server Action 내부에서** 인증과 권한을 항상 확인하세요 - 미들웨어, 레이아웃 가드, 페이지 수준 확인만 의존하지 마세요. Server Actions는 직접 호출될 수 있습니다.

**❌ 잘못된 예: 인증 확인 없음**

```typescript
'use server'

export async function deleteUser(userId: string) {
  // 누구나 이것을 호출할 수 있음! 인증 확인 없음
  await db.user.delete({ where: { id: userId } })
  return { success: true }
}
```

**✅ 올바른 예: 액션 내부 인증**

```typescript
'use server'

import { verifySession } from '@/lib/auth'
import { unauthorized } from '@/lib/errors'

export async function deleteUser(userId: string) {
  // 액션 내부에서 항상 인증 확인
  const session = await verifySession()

  if (!session) {
    throw unauthorized('로그인이 필요합니다')
  }

  // 권한도 확인
  if (session.user.role !== 'admin' && session.user.id !== userId) {
    throw unauthorized('다른 사용자를 삭제할 수 없습니다')
  }

  await db.user.delete({ where: { id: userId } })
  return { success: true }
}
```

**📚 참고:** https://nextjs.org/docs/app/guides/authentication

---

### 3.2 RSC Props에서 중복 직렬화 피하기 (Avoid Duplicate Serialization in RSC Props)

**영향도: ⚪ LOW (중복 직렬화를 피해 네트워크 페이로드 감소)**

RSC→클라이언트 직렬화는 객체 참조로, 값으로 중복을 제거합니다. 동일한 참조 = 한 번 직렬화; 새 참조 = 다시 직렬화. 변환(`.toSorted()`, `.filter()`, `.map()`)은 서버가 아닌 클라이언트에서 수행하세요.

**❌ 잘못된 예: 배열 중복**

```tsx
// RSC: 6개 문자열 전송 (2개 배열 × 3개 항목)
<ClientList usernames={usernames} usernamesOrdered={usernames.toSorted()} />
```

**✅ 올바른 예: 3개 문자열 전송**

```tsx
// RSC: 한 번 전송
<ClientList usernames={usernames} />

// Client: 변환은 여기서
'use client'
const sorted = useMemo(() => [...usernames].sort(), [usernames])
```

---

### 3.3 크로스-요청 LRU 캐싱 (Cross-Request LRU Caching)

**영향도: 🟡 HIGH (요청 간 캐시)**

`React.cache()`는 하나의 요청 내에서만 작동합니다. 순차적 요청 간에 공유되는 데이터의 경우 LRU 캐시를 사용하세요.

**구현:**

```typescript
import { LRUCache } from 'lru-cache'

const cache = new LRUCache<string, any>({
  max: 1000,
  ttl: 5 * 60 * 1000  // 5분
})

export async function getUser(id: string) {
  const cached = cache.get(id)
  if (cached) return cached

  const user = await db.user.findUnique({ where: { id } })
  cache.set(id, user)
  return user
}

// 요청 1: DB 쿼리, 결과 캐시됨
// 요청 2: 캐시 적중, DB 쿼리 없음
```

---

### 3.4 RSC 경계에서 직렬화 최소화 (Minimize Serialization at RSC Boundaries)

**영향도: 🟡 HIGH (데이터 전송 크기 감소)**

React Server/Client 경계는 모든 객체 속성을 문자열로 직렬화하여 HTML 응답과 후속 RSC 요청에 포함합니다. 이 직렬화된 데이터는 페이지 무게와 로드 시간에 직접적인 영향을 미치므로 **크기가 매우 중요합니다**. 클라이언트가 실제로 사용하는 필드만 전달하세요.

**❌ 잘못된 예: 50개 필드 모두 직렬화**

```tsx
async function Page() {
  const user = await fetchUser()  // 50개 필드
  return <Profile user={user} />
}

'use client'
function Profile({ user }: { user: User }) {
  return <div>{user.name}</div>  // 1개 필드만 사용
}
```

**✅ 올바른 예: 1개 필드만 직렬화**

```tsx
async function Page() {
  const user = await fetchUser()
  return <Profile name={user.name} />
}

'use client'
function Profile({ name }: { name: string }) {
  return <div>{name}</div>
}
```

---

### 3.5 컴포넌트 구성으로 병렬 데이터 가져오기 (Parallel Data Fetching with Component Composition)

**영향도: 🔴 CRITICAL (서버 사이드 워터폴 제거)**

React Server Components는 트리 내에서 순차적으로 실행됩니다. 구성으로 재구성하여 데이터 가져오기를 병렬화하세요.

**❌ 잘못된 예: Sidebar가 Page의 가져오기 완료를 기다림**

```tsx
export default async function Page() {
  const header = await fetchHeader()
  return (
    <div>
      <div>{header}</div>
      <Sidebar />
    </div>
  )
}

async function Sidebar() {
  const items = await fetchSidebarItems()
  return <nav>{items.map(renderItem)}</nav>
}
```

**✅ 올바른 예: 둘 다 동시에 가져오기**

```tsx
async function Header() {
  const data = await fetchHeader()
  return <div>{data}</div>
}

async function Sidebar() {
  const items = await fetchSidebarItems()
  return <nav>{items.map(renderItem)}</nav>
}

export default function Page() {
  return (
    <div>
      <Header />
      <Sidebar />
    </div>
  )
}
```

---

### 3.6 React.cache()로 요청별 중복 제거 (Per-Request Deduplication with React.cache())

**영향도: 🟢 MEDIUM (요청 내 중복 제거)**

서버 사이드 요청 중복 제거를 위해 `React.cache()`를 사용하세요. 인증과 데이터베이스 쿼리가 가장 혜택을 받습니다.

**사용법:**

```typescript
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null
  return await db.user.findUnique({
    where: { id: session.user.id }
  })
})
```

단일 요청 내에서 `getCurrentUser()`를 여러 번 호출해도 쿼리는 한 번만 실행됩니다.

---

## 4. 클라이언트 사이드 데이터 가져오기 (Client-Side Data Fetching)

**영향도: 🟢 MEDIUM-HIGH**

자동 중복 제거와 효율적인 데이터 가져오기 패턴은 중복 네트워크 요청을 줄입니다.

### 4.1 전역 이벤트 리스너 중복 제거 (Deduplicate Global Event Listeners)

**영향도: ⚪ LOW (N개 컴포넌트에 1개 리스너)**

`useSWRSubscription()`을 사용하여 컴포넌트 인스턴스 간에 전역 이벤트 리스너를 공유하세요.

**❌ 잘못된 예: N개 인스턴스 = N개 리스너**

```tsx
function useKeyboardShortcut(key: string, callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === key) {
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, callback])
}
```

**✅ 올바른 예: N개 인스턴스 = 1개 리스너**

```tsx
import useSWRSubscription from 'swr/subscription'

// 키별 콜백을 추적하는 모듈 수준 Map
const keyCallbacks = new Map<string, Set<() => void>>()

function useKeyboardShortcut(key: string, callback: () => void) {
  // Map에 이 콜백 등록
  useEffect(() => {
    if (!keyCallbacks.has(key)) {
      keyCallbacks.set(key, new Set())
    }
    keyCallbacks.get(key)!.add(callback)

    return () => {
      const set = keyCallbacks.get(key)
      if (set) {
        set.delete(callback)
        if (set.size === 0) {
          keyCallbacks.delete(key)
        }
      }
    }
  }, [key, callback])

  useSWRSubscription('global-keydown', () => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && keyCallbacks.has(e.key)) {
        keyCallbacks.get(e.key)!.forEach(cb => cb())
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })
}
```

---

### 4.2 스크롤 성능을 위한 Passive Event Listeners (Use Passive Event Listeners for Scrolling Performance)

**영향도: 🟢 MEDIUM (이벤트 리스너로 인한 스크롤 지연 제거)**

터치 및 휠 이벤트 리스너에 `{ passive: true }`를 추가하여 즉시 스크롤을 활성화하세요. 브라우저는 일반적으로 `preventDefault()`가 호출되는지 확인하기 위해 리스너가 완료될 때까지 기다리며, 이로 인해 스크롤 지연이 발생합니다.

**❌ 잘못된 예:**

```typescript
useEffect(() => {
  const handleTouch = (e: TouchEvent) => console.log(e.touches[0].clientX)
  const handleWheel = (e: WheelEvent) => console.log(e.deltaY)

  document.addEventListener('touchstart', handleTouch)
  document.addEventListener('wheel', handleWheel)

  return () => {
    document.removeEventListener('touchstart', handleTouch)
    document.removeEventListener('wheel', handleWheel)
  }
}, [])
```

**✅ 올바른 예:**

```typescript
useEffect(() => {
  const handleTouch = (e: TouchEvent) => console.log(e.touches[0].clientX)
  const handleWheel = (e: WheelEvent) => console.log(e.deltaY)

  document.addEventListener('touchstart', handleTouch, { passive: true })
  document.addEventListener('wheel', handleWheel, { passive: true })

  return () => {
    document.removeEventListener('touchstart', handleTouch)
    document.removeEventListener('wheel', handleWheel)
  }
}, [])
```

---

## 5. 재렌더링 최적화 (Re-render Optimization)

**영향도: 🟢 MEDIUM**

불필요한 재렌더링을 줄이면 낭비되는 계산을 최소화하고 UI 반응성을 개선합니다.

### 5.1 사용 지점까지 상태 읽기 지연 (Defer State Reads to Usage Point)

**영향도: 🟢 MEDIUM (불필요한 구독 방지)**

콜백 내부에서만 읽는 동적 상태(searchParams, localStorage)를 구독하지 마세요.

**❌ 잘못된 예: 모든 searchParams 변경에 구독**

```tsx
function ShareButton({ chatId }: { chatId: string }) {
  const searchParams = useSearchParams()

  const handleShare = () => {
    const ref = searchParams.get('ref')
    shareChat(chatId, { ref })
  }

  return <button onClick={handleShare}>Share</button>
}
```

**✅ 올바른 예: 요청 시 읽기, 구독 없음**

```tsx
function ShareButton({ chatId }: { chatId: string }) {
  const handleShare = () => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    shareChat(chatId, { ref })
  }

  return <button onClick={handleShare}>Share</button>
}
```

---

### 5.2 메모이즈된 컴포넌트로 추출 (Extract to Memoized Components)

**영향도: 🟢 MEDIUM (조기 반환 활성화)**

비싼 작업을 메모이즈된 컴포넌트로 추출하여 계산 전 조기 반환을 활성화하세요.

**❌ 잘못된 예: 로딩 시에도 avatar 계산**

```tsx
function Profile({ user, loading }: Props) {
  const avatar = useMemo(() => {
    const id = computeAvatarId(user)
    return <Avatar id={id} />
  }, [user])

  if (loading) return <Skeleton />
  return <div>{avatar}</div>
}
```

**✅ 올바른 예: 로딩 시 계산 건너뜀**

```tsx
const UserAvatar = memo(function UserAvatar({ user }: { user: User }) {
  const id = useMemo(() => computeAvatarId(user), [user])
  return <Avatar id={id} />
})

function Profile({ user, loading }: Props) {
  if (loading) return <Skeleton />
  return (
    <div>
      <UserAvatar user={user} />
    </div>
  )
}
```

---

## 6. 렌더링 성능 (Rendering Performance)

**영향도: 🟢 MEDIUM**

렌더링 프로세스를 최적화하면 브라우저가 수행해야 하는 작업을 줄입니다.

### 6.1 SVG 요소 대신 래퍼 애니메이션 (Animate SVG Wrapper Instead of SVG Element)

**영향도: ⚪ LOW (하드웨어 가속 활성화)**

많은 브라우저는 SVG 요소의 CSS3 애니메이션에 대한 하드웨어 가속이 없습니다. SVG를 `<div>`로 감싸고 래퍼를 대신 애니메이션하세요.

**❌ 잘못된 예: SVG 직접 애니메이션 - 하드웨어 가속 없음**

```tsx
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" />
    </svg>
  )
}
```

**✅ 올바른 예: 래퍼 div 애니메이션 - 하드웨어 가속**

```tsx
function LoadingSpinner() {
  return (
    <div className="animate-spin">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" />
      </svg>
    </div>
  )
}
```

---

### 6.2 긴 목록을 위한 CSS content-visibility (CSS content-visibility for Long Lists)

**영향도: 🟡 HIGH (더 빠른 초기 렌더링)**

화면 밖 렌더링을 지연하려면 `content-visibility: auto`를 적용하세요.

**CSS:**

```css
.message-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 80px;
}
```

**예시:**

```tsx
function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="overflow-y-auto h-screen">
      {messages.map(msg => (
        <div key={msg.id} className="message-item">
          <Avatar user={msg.author} />
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  )
}
```

1000개 메시지의 경우 브라우저는 ~990개 오프스크린 항목의 레이아웃/페인트를 건너뜁니다 (초기 렌더링 10배 더 빠름).

---

## 7. JavaScript 성능 (JavaScript Performance)

**영향도: 🔵 LOW-MEDIUM**

핫 경로에 대한 마이크로 최적화가 의미 있는 개선으로 더해질 수 있습니다.

### 7.1 DOM CSS 변경 배치 (Batch DOM CSS Changes)

**영향도: 🟢 MEDIUM (리플로우/리페인트 감소)**

레이아웃 읽기와 스타일 쓰기를 섞지 마세요. 스타일 변경 사이에 레이아웃 속성(`offsetWidth`, `getBoundingClientRect()`, `getComputedStyle()` 등)을 읽으면 브라우저가 동기적 리플로우를 트리거해야 합니다.

**❌ 잘못된 예: 읽기/쓰기 인터리빙이 리플로우 강제**

```typescript
function updateElementStyles(element: HTMLElement) {
  element.style.width = '100px'
  const width = element.offsetWidth  // 리플로우 강제
  element.style.height = '200px'
  const height = element.offsetHeight  // 또 다른 리플로우 강제
}
```

**✅ 올바른 예: 쓰기 배치, 그 다음 한 번 읽기**

```typescript
function updateElementStyles(element: HTMLElement) {
  element.classList.add('highlighted-box')

  const { width, height } = element.getBoundingClientRect()
}
```

**더 나음: CSS 클래스 사용**

가능하면 인라인 스타일보다 CSS 클래스를 선호하세요. CSS 파일은 브라우저에 의해 캐시되며 클래스는 더 나은 관심사 분리를 제공하고 유지 관리가更容易합니다.

---

## 8. 고급 패턴 (Advanced Patterns)

**영향도: ⚪ LOW**

신중한 구현이 필요한 특정 사례를 위한 고급 패턴입니다.

### 8.1 Refs에 이벤트 핸들러 저장 (Store Event Handlers in Refs)

**영향도: ⚪ LOW (안정적인 구독)**

콜백 변경 시 재구독해서는 안 되는 효과에서 사용되는 콜백을 refs에 저장하세요.

**❌ 잘못된 예: 모든 렌더링 시 재구독**

```tsx
function useWindowEvent(event: string, handler: (e) => void) {
  useEffect(() => {
    window.addEventListener(event, handler)
    return () => window.removeEventListener(event, handler)
  }, [event, handler])
}
```

**✅ 올바른 예: 안정적인 구독**

```tsx
import { useEffectEvent } from 'react'

function useWindowEvent(event: string, handler: (e) => void) {
  const onEvent = useEffectEvent(handler)

  useEffect(() => {
    window.addEventListener(event, onEvent)
    return () => window.removeEventListener(event, onEvent)
  }, [event])
}
```

---

## 📚 참고자료

1. [React 공식 문서](https://react.dev)
2. [Next.js 공식 문서](https://nextjs.org)
3. [SWR 공식 문서](https://swr.vercel.app)
4. [better-all 라이브러리](https://github.com/shuding/better-all)
5. [lru-cache 라이브러리](https://github.com/isaacs/node-lru-cache)
6. [Vercel 블로그: Package Imports 최적화](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
7. [Vercel 블로그: 대시보드 2배 빠르게 만들기](https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast)

---

## 🎯 빠른 참조 카드

### 우선순위별 규칙 요약

**🔴 CRITICAL (즉시 적용 필요)**
1. 배럴 파일 임포트 피하기
2. 독립 작업 병렬화 (Promise.all)
3. API Routes에서 워터폴 방지
4. 무거운 컴포넌트 동적 임포트
5. 의존성 기반 병렬화 (better-all)
6. 컴포넌트 구성으로 병렬 데이터 가져오기
7. Server Actions 인증

**🟡 HIGH (최우선 적용)**
1. 필요할 때까지 await 지연
2. 전략적 Suspense 경계
3. 크로스-요청 LRU 캐싱
4. RSC 경계 직렬화 최소화
5. 긴 목록에 content-visibility 적용

**🟢 MEDIUM (점진적 적용)**
1. 메모이즈된 컴포넌트 추출
2. 상태 읽기 지연
3. Passive Event Listeners
4. DOM CSS 변경 배치

**⚪ LOW (시간 허용 시 적용)**
1. SVG 래퍼 애니메이션
2. 고급 패턴 (refs, useLatest)

---

## 📝 학습 체크리스트

개발자는 다음 개념들을 이해하고 있어야 합니다:

- [ ] 워터폴이 성능에 미치는 영향 이해
- [ ] Promise.all()과 better-all로 병렬화
- [ ] 배럴 파일 vs 직접 임포트
- [ ] 동적 임포트 (next/dynamic)
- [ ] Server Actions 인증的重要性
- [ ] RSC 직렬화 비용
- [ ] React.cache()로 중복 제거
- [ ] 메모이제이션 전략 (memo, useMemo, useCallback)
- [ ] CSS content-visibility
- [ ] 이벤트 리스너 최적화

---

## 🔗 관련 문서

- [프로젝트 아키텍처](./architecture.md)
- [코딩 컨벤션](./coding-conventions.md)
- [디렉토리 구조](./directory-structure.md)
