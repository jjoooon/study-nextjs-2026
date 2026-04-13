# Bizcode Utilities

비즈니스 코드 처리를 위한 유틸리티 함수 문서

## 개요

비즈니스 코드(Bizcode)는 시스템 전반에서 사용되는 공통 코드를 관리하는 체계입니다.

| 함수 | 환경 | 역할 |
|---|---|---|
| `fetchBizcodeData` | SSR/CSR 공통 | 순수 조회, 데이터만 반환 (저장 안함) |
| `hydrateBizcode` | 클라이언트 전용 | 조회 결과를 `window.__BIZCODE__`에 저장 |
| `loadBizcode` | 클라이언트 전용 | `fetchBizcodeData` + `hydrateBizcode` 한번에 |
| `getBizcode` | 클라이언트 전용 | `window.__BIZCODE__`에서 데이터 반환 |
| `clearBizcode` | 클라이언트 전용 | `window.__BIZCODE__` 전체 초기화 |

## 아키텍처

```
[CSR] 조회 + 저장 한번에
loadBizcode(template)  →  내부: fetchBizcodeData + hydrateBizcode
getBizcode(type, key)  →  window.__BIZCODE__에서 조회

[SSR] 조회와 저장을 분리
layout.tsx        →  fetchBizcodeData(template)    // 서버에서 순수 조회
StoreHydrator.tsx →  hydrateBizcode(data)           // 클라이언트에서 window에 저장
page.tsx          →  getBizcode(type, key)           // 클라이언트에서 조회
```

## 키 구조

모든 search 타입은 화면에서 **슬래시(/) 구분 문자열 배열**로 입력받습니다.

```typescript
['CD001', 'CD002/2/PPR01/20130101']
```

- 1번째 값(필수)만 있으면 단일 문자열 `'CD001'`
- 2번째 이후 값은 선택이며, 없으면 생략하거나 빈 문자열로 표현 (e.g., `'a//c'`)
- 유틸 내부에서 `key.split('/')` → 각 search 타입에 맞는 서버 파라미터로 매핑

## 저장소: window.__BIZCODE__

```typescript
window.__BIZCODE__ = {
  codeSearch:        { 'CD001': ResultItem[], 'CD002/2/PPR01/20130101': ResultItem[] },
  complexCodeSearch: { 'REL01': ResultItem[], 'REL02/DTL01/DTL02': ResultItem[] },
  partCodeSearch:    { 'PARAM01': ResultItem[], 'PARAM02/PARAM03': ResultItem[] },
  codeFullSearch:    { 'FULL01': ResultItem[], 'FULL02/20130101/3/PPR01': ResultItem[] },
  xmlSearch:         { 'PROD01/GDRSK/20130101/Y/01': ResultItem[], 'PROD02': ResultItem[] },
}
```

## bizCodeType 상세

### codeSearch (comA002)

일반 분류 코드 조회. **9개씩 chunking**하여 서버에 전송합니다.

**입력 키 구조:**

```
'clsfCd/detlLvl/pprDtCd/stdt/enGb'
```

| 순서 | 서버 파라미터 | 설명 | 필수 |
|---|---|---|---|
| 1 | `clsfCd{N}` | 분류코드 | O |
| 2 | `detlLvl{N}` | 세부레벨 | |
| 3 | `pprDtCd{N}` | 상위세부코드 | |
| 4 | `stdt{N}` | 기준일자 | |
| 5 | `enGb{N}` | 영문여부 | |

- `N` = chunk 내 순번 (1~9)
- 한 번의 API 호출에 최대 9개 키를 묶어서 전송

**응답 구조:** `cdCnt{N}_entf: [{ detlCd{N}, detlCdNm{N}, detlNumvl{N} }]`
- 숫자 접미사를 제거하여 저장: `detlCd{N}` → `detlCd`

**예시:**

```typescript
codeSearch: ['CD001', 'CD002/2/PPR01/20130101']
// CD001       → clsfCd1='CD001'
// CD002/2/... → clsfCd2='CD002', detlLvl2='2', pprDtCd2='PPR01', stdt2='20130101'
```

### complexCodeSearch (comA005)

종속관계 복합 코드 조회. **1개씩** 서버에 전송합니다.

**입력 키 구조:**

```
'suboRelTpcd/lvl1Dtcd/lvl2Dtcd/.../lvlNDtcd'
```

| 순서 | 서버 파라미터 | 설명 | 필수 |
|---|---|---|---|
| 1 | `suboRelTpcd` | 종속관계유형코드 | O |
| 2~ | `lvl{N}Dtcd` | N레벨 세부코드 | |

**응답 구조:** `{ suboRelTpcd, lvlNDtcd, dtcdct, dtcdct_entf: [{ dtcd, dtcnm }] }`
- `dtcdct_entf` 배열을 결과로 저장

**예시:**

```typescript
complexCodeSearch: ['REL01', 'REL02/DTL01/DTL02']
// REL01           → suboRelTpcd='REL01'
// REL02/DTL01/... → suboRelTpcd='REL02', lvl1Dtcd='DTL01', lvl2Dtcd='DTL02'
```

### partCodeSearch (전달받은 txCode)

거래코드 기반 부분 코드 조회. **1개씩** 서버에 전송합니다.
`txCode`와 `record`는 그룹 단위로 지정하고, `keys`에 슬래시 키 배열을 전달합니다.

**입력 형식:**

```typescript
{ txCode: 'TRX001', record: 'REC01', code: ['PARAM01', 'PARAM02/PARAM03'] }
```

**입력 키 구조:**

```
'inputCd1/inputCd2/.../inputCdN'
```

| 순서 | 서버 파라미터 | 설명 | 필수 |
|---|---|---|---|
| 그룹 | `record` | RRRECORD명 | O |
| 1~ | `inputCd{N}` | 입력파라미터 | O(1번째) |

**응답:** 응답 배열(codeArr)을 그대로 결과로 저장

**예시:**

```typescript
partCodeSearch: [{ txCode: 'TRX001', record: 'REC01', code: ['PARAM01', 'PARAM02/PARAM03'] }]
// PARAM01          → record='REC01', inputCd1='PARAM01'
// PARAM02/PARAM03  → record='REC01', inputCd1='PARAM02', inputCd2='PARAM03'
```

### codeFullSearch (comA008)

전체 코드 조회. **1개씩** 서버에 전송합니다.

**입력 키 구조:**

```
'clsfCd/stdt/detlLvl/pprDtCd'
```

| 순서 | 서버 파라미터 | 설명 | 필수 |
|---|---|---|---|
| 1 | `clsfCd` | 분류코드 | O |
| 2 | `stdt` | 기준일자 | |
| 3 | `detlLvl` | 세부레벨 | |
| 4 | `pprDtCd` | 상위세부코드 | |

**응답 구조:** `{ clsfCd, stdt, detlLvl, pprDtCd, cdCnt, cdCntG: [{ detlCd, detlCdNm, tdcdEnnm, detlNumvl, numUnt, mnNumvl, mxNumvl, valdStrdt, valdNddt }] }`
- `cdCntG` 배열을 결과로 저장

**예시:**

```typescript
codeFullSearch: ['FULL01', 'FULL02/20130101/3/PPR01']
// FULL01           → clsfCd='FULL01'
// FULL02/20130101/... → clsfCd='FULL02', stdt='20130101', detlLvl='3', pprDtCd='PPR01'
```

### xmlSearch (comA004)

XML 기반 상품 코드 조회. **1개씩** 서버에 전송합니다.
`gdFlg`는 코드 매핑하여 숫자로 변환 후 전송합니다.

**입력 키 구조:**

```
'gdcd/gdFlg/applDt/atrcdFlg/rkTpcd'
```

| 순서 | 서버 파라미터 | 설명 | 필수 |
|---|---|---|---|
| 1 | `gdcd` | 상품코드 | O |
| 2 | `gdFlg` | 상품구분 (코드 매핑) | |
| 3 | `applDt` | 적용일자 | |
| 4 | `atrcdFlg` | 속성코드구분 | |
| 5 | `rkTpcd` | 위험유형코드 | |

**gdFlg 매핑:**

| 입력값 | 서버 전송 코드 |
|---|---|
| `GDRSK` | `0` |
| `GDCSF` | `1` |
| `CRCVR` | `2` |
| `CLMTP` | `3` |
| `CLMCAS` | `4` |
| 없거나 매핑 없음 | `0` (기본값) |

**응답:** 서버 JSON 응답을 그대로 결과로 저장

**예시:**

```typescript
xmlSearch: ['PROD01/GDRSK/20130101/Y/01', 'PROD02']
// PROD01/GDRSK/... → gdcd='PROD01', gdFlg='0'(GDRSK→0), applDt='20130101', atrcdFlg='Y', rkTpcd='01'
// PROD02           → gdcd='PROD02', gdFlg='0'(기본값)
```

## 사용법

### CSR (클라이언트 컴포넌트)

```typescript
'use client';

import { loadBizcode, getBizcode } from '@/shared/utils/bizcodeUtils';

export default function Page() {
  useEffect(() => {
    async function init() {
      await loadBizcode({
        codeSearch: ['CD001', 'CD002/2/PPR01/20130101'],
        complexCodeSearch: ['REL01', 'REL02/DTL01/DTL02'],
        partCodeSearch: [{ txCode: 'TRX001', record: 'REC01', code: ['PARAM01', 'PARAM02/PARAM03'] }],
        codeFullSearch: ['FULL01', 'FULL02/20130101/3/PPR01'],
        xmlSearch: ['PROD01/GDRSK/20130101/Y/01', 'PROD02'],
      });

      const data = getBizcode('codeSearch', 'CD001');
    }
    init();
  }, []);
}
```

### SSR (서버 → 클라이언트)

```typescript
// 1. layout.tsx (서버 컴포넌트) - 순수 조회
import { fetchBizcodeData, BizCodeTemplate } from '@/shared/utils/bizcodeUtils';

const TEMPLATE: BizCodeTemplate = {
  codeSearch: ['CD001'],
  complexCodeSearch: ['REL01'],
};

export default async function Layout({ children }) {
  const data = await fetchBizcodeData(TEMPLATE);
  return <StoreHydrator bizcodeData={data}>{children}</StoreHydrator>;
}

// 2. StoreHydrator.tsx (클라이언트 컴포넌트) - window에 저장
import { hydrateBizcode } from '@/shared/utils/bizcodeUtils';

export function StoreHydrator({ bizcodeData, children }) {
  hydrateBizcode(bizcodeData);  // window.__BIZCODE__에 저장
  return <>{children}</>;
}

// 3. page.tsx (클라이언트 컴포넌트) - 저장된 값 사용
import { getBizcode } from '@/shared/utils/bizcodeUtils';

export default function Page() {
  useEffect(() => {
    const data = getBizcode('codeSearch', 'CD001');
  }, []);
}
```

## 샘플 페이지

| 경로 | 설명 |
|---|---|
| `/sample/bizCode/ssr` | SSR: layout(조회) → StoreHydrator(저장) → page(사용) |
| `/sample/bizCode/csr` | CSR: loadBizcode(조회+저장) → getBizcode(사용) |

두 샘플 모두 5개 search 타입 전체를 포함합니다.

## 주의사항

- `loadBizcode`는 비동기 함수이므로 `await`으로 호출해야 합니다.
- `getBizcode`는 데이터가 먼저 저장된 후에 사용해야 합니다.
- 조회 결과가 없으면 `undefined`를 반환합니다.
- `window.__BIZCODE__`는 클라이언트 전용입니다. SSR에서는 `fetchBizcodeData`를 사용하세요.
- 1번째 값만 필수이며, 나머지는 선택입니다. 단일 값 `'CD001'`도 정상 입력입니다.
- `clearBizcode()`로 전역 저장소를 초기화할 수 있습니다.
