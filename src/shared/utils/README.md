# Utils 디렉토리 명명 규칙

이 디렉토리의 파일 명명 규칙과 각 접미사의 사용 목적을 설명합니다.

## 📋 명명 규칙 요약

| 접미사 | 용도 | 예시 |
|--------|------|------|
| 접미사 없음 | 코어 인프라 서비스 | `logger.ts`, `performance.ts` |
| `Helper` | 복잡한 로직/상태/동작 구현 | `mdiHelper.ts` |
| `Utils` | 순수 유틸리티 함수 | `cookieUtils.ts`, `ipUtils.ts` |

---

## 📁 카테고리별 가이드라인

### 1. 접미사 없음 (No Suffix)

**용도**: 애플리케이션의 핵심 인프라 서비스

**특징**:
- 단일 책임을 가진 독립적인 서비스 모듈
- 주로 싱글톤 패턴으로 사용
- 다른 모듈에서 널리 import되는 기반 기능

**예시**:
```typescript
// ✅ 올바른 예시
logger.ts        // 로깅 서비스
performance.ts   // 성능 모니터링 서비스
```

**Import 예시**:
```typescript
import log from '@/shared/utils/logger';
```

---

### 2. Helper 접미사

**용도**: 특정 도메인의 복잡한 로직, 상태 관리, 동작을 구현하는 헬퍼

**특징**:
- 특정 기능이나 시스템을 위한 복잡한 로직 포함
- 내부 상태를 유지하거나 관리하는 경우
- 여러 유틸리티 함수를 하나로 모은 복합 모듈

**사용 기준**:
- 단순 함수들의 집합이 아닌 경우
- 내부에 상태나 복잡한 로직이 있는 경우
- 특정 도메인/시스템 전용 헬퍼인 경우

**예시**:
```typescript
// ✅ 올바른 예시
mdiHelper.ts    // MDI (Multiple Document Interface) 윈도우 관리
```

**Import 예시**:
```typescript
import { mdi } from '@/shared/utils/mdiHelper';
import type { MDIDocument } from '@/shared/utils/mdiHelper';
```

---

### 3. Utils 접미사

**용도**: 순수 유틸리티 함수들의 모음

**특징**:
- 부작용(side-effect)이 없는 순수 함수들
- 입력 → 출력 변환 함수들
- 재사용 가능한 일반적인 유틸리티

**사용 기준**:
- 단순한 함수들의 집합인 경우
- 상태 관리 없이 입력만으로 출력을 결정하는 경우
- 여러 곳에서 재사용되는 일반적인 유틸리티인 경우

**예시**:
```typescript
// ✅ 올바른 예시
cookieUtils.ts   // 쿠키 조작 유틸리티
ipUtils.ts       // IP 주소 처리 유틸리티
storageUtils.ts  // 스토리지 조작 유틸리티
```

**Import 예시**:
```typescript
import { getCookieValue, setCookieValue } from '@/shared/utils/cookieUtils';
import { getClientIp } from '@/shared/utils/ipUtils';
```

---

## 🎯 결정 트리

새로운 파일을 생성할 때 어떤 접미사를 사용할지 결정하는 방법:

```
┌─────────────────────────────────────┐
│ 새 유틸리티 파일을 만들려고 합니다   │
└─────────────────┬───────────────────┘
                  │
                  ▼
        ┌─────────────────┐
        │ 핵심 인프라인가? │
        │ (로거, 성능 등) │
        └────────┬────────┘
           YES   │   NO
      ┌──────────┴──────────┐
      ▼                     ▼
┌──────────┐      ┌─────────────────┐
│ 접미사 없음 │      │ 내부 상태/복잡한 │
└──────────┘      │ 로직이 있는가?   │
                  └────────┬────────┘
                     YES   │   NO
                ┌──────────┴──────────┐
                ▼                     ▼
          ┌──────────┐         ┌──────────┐
          │ Helper  │         │  Utils   │
          └──────────┘         └──────────┘
```

---

## 📝 코드 예시 비교

### Utils (순수 함수)
```typescript
// cookieUtils.ts
export function getCookieValue(name: string): string | undefined {
  // 입력만으로 결정되는 순수 함수
}

export function setCookieValue(name: string, value: string): void {
  // 단순한 조작 함수
}
```

### Helper (복잡한 로직/상태)
```typescript
// mdiHelper.ts
class MDIHelper {
  private windows: Map<string, MDIWindow> = new Map(); // 내부 상태

  openWindow(options: MDIOpenOptions): MDIDocument {
    // 복잡한 윈도우 관리 로직
  }

  closeWindow(id: string): void {
    // 상태 변경 및 정리 로직
  }
}

export const mdi = new MDIHelper();
```

### Core Service (접미사 없음)
```typescript
// logger.ts
class Logger {
  // 독립적인 인프라 서비스
  log(level: LogLevel, message: string): void { ... }
}

export default new Logger();
```

---

## 🔄 네이밍 변경 시 고려사항

새로운 파일을 추가하거나 네이밍을 변경할 때:
1. 이 README의 가이드라인을 먼저 확인
2. 기존 import 문 영향도 검토
3. 일관성 유지를 위해 팀원과 협의

---

## 📚 참고

- 이 규칙은 `/src/shared/utils/` 루트 디렉토리의 파일들에 적용됩니다
- 하위 디렉토리(`date/`, `file/`, `url/`, `validation/`, `xml/`, `popup/`)는 각자의 맥락에 따라 자율적으로 명명합니다
