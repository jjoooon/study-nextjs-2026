/**
 * Bizcode Utilities
 *
 * @description
 * 비즈니스 코드 처리를 위한 유틸리티 함수
 * - fetchBizcode: 순수 조회 (SSR/CSR 공통) → 데이터만 반환
 * - loadBizcode:      조회 + window.bizCodes 저장 (CSR 전용)
 * - hydrateBizcode:   이미 조회된 데이터를 window.bizCodes에 저장 (SSR→CSR 전달용)
 * - getBizcode:       window.bizCodes에서 데이터 반환
 *
 * @key-format
 * 키는 슬래시(/) 구분 문자열로 관리됩니다.
 * 예: 'code3/temp1//20130101'
 *
 * @usage
 * // [CSR] 조회 + 저장 한번에
 * await loadBizcode({ codeSearch: ['code1', 'code3/temp1//20130101'] });
 * const data = getBizcode('codeSearch', 'code1');
 *
 * // [SSR] layout에서 조회 → hydrator에서 저장 → page에서 사용
 * const result = await fetchBizcode({ codeSearch: ['code1'] });  // layout (서버)
 * hydrateBizcode(result);                                            // StoreHydrator (클라이언트)
 * const data = getBizcode('codeSearch', 'code1');                    // page (클라이언트)
 */

import log from '@/shared/utils/logger';

const logger = log.getLogger('BizcodeUtils');

// ============================================================================
// TYPES
// ============================================================================

/** 비즈니스 코드 유형 */
export type BizCodeType = 'codeSearch' | 'complexCodeSearch' | 'partCodeSearch' | 'codeFullSearch' | 'xmlSearch';

/** 슬래시 구분 키 문자열 (e.g., 'code3/temp1//20130101') */
export type BizCodeKey = string;

/** partCodeSearch 입력 형식 (txCode, record는 그룹 단위, code는 슬래시 키 배열) */
export interface PartCodeSearchGroup {
  txCode: string;
  record: string;
  code: BizCodeKey[];
}

/** loadBizcode / fetchBizcode 파라미터 템플릿 */
export interface BizCodeTemplate {
  codeSearch?: BizCodeKey[];
  complexCodeSearch?: BizCodeKey[];
  partCodeSearch?: PartCodeSearchGroup[];
  codeFullSearch?: BizCodeKey[];
  xmlSearch?: BizCodeKey[];
}

/** 비즈니스 코드 결과 아이템 (API 응답에서 숫자 접미사 제거된 형태) */
export interface BizcodeResultItem {
  detlCd: string;
  detlCdNm: string;
  detlNumvl: string;
  [key: string]: unknown;
}

/** codeSearch API 원시 응답 타입 (clsfCd1~9, cdCnt1~9_entf 포함) */
interface CodeSearchRawResponse {
  [key: string]: unknown;
}

/** complexCodeSearch API 원시 응답 타입 */
interface ComplexCodeSearchRawResponse {
  suboRelTpcd?: string;
  lvlNDtcd?: string;
  dtcdct?: string;
  dtcdct_entf?: { dtcd: string; dtcnm: string }[];
}

/** codeFullSearch API 원시 응답 타입 */
interface CodeFullSearchRawResponse {
  clsfCd?: string;
  stdt?: string;
  detlLvl?: string;
  pprDtCd?: string;
  cdCnt?: string;
  cdCntG?: {
    detlCd: string;
    detlCdNm: string;
    tdcdEnnm: string;
    detlNumvl: string;
    numUnt: string;
    mnNumvl: string;
    mxNumvl: string;
    valdStrdt: string;
    valdNddt: string;
  }[];
}

/** window.bizCodes 전역 저장소 타입 */
export type BizcodeStore = {
  [T in BizCodeType]: Record<BizCodeKey, BizcodeResultItem[]>;
};

/** fetchBizcode 반환 타입 (조회 결과 전체) */
export type BizcodeDataResult = Partial<BizcodeStore>;

/** window 타입 확장 */
declare global {
  interface Window {
    bizCodes: BizcodeStore;
  }
}

// ============================================================================
// CONSTANTS
// ============================================================================

/** 키 구분자 (슬래시 키 split/join에 사용) */
export const KEY_DELIMITER = '/';

/** bizCodeType별 API TX Code 매핑 */
const TX_CODE_MAP: Record<Exclude<BizCodeType, 'partCodeSearch'>, string> = {
  codeSearch: 'comA002',
  complexCodeSearch: 'comA005',
  codeFullSearch: 'comA008',
  xmlSearch: 'comA004',
};

/** codeSearch 한 번 호출 시 최대 키 개수 */
const CODE_SEARCH_CHUNK_SIZE = 9;

// ============================================================================
// INTERNAL - 순수 조회 함수 (SSR/CSR 공통, 저장하지 않음)
// ============================================================================

/**
 * codeSearch 데이터 조회
 *
 * @description
 * n개의 키를 9개씩 chunking하여 API 호출합니다.
 *
 * 입력 키:       'clsfCd/detlLvl/pprDtCd/stdt/enGb' (슬래시 구분, 순서 고정)
 * 요청 파라미터: chunk 내 N번째 키 → clsfCd{N}, detlLvl{N}, pprDtCd{N}, stdt{N}, enGb{N}
 * 응답 구조:     cdCnt{N}_entf ([{ detlCd{N}, detlCdNm{N}, detlNumvl{N} }])
 * 저장 구조:     result[입력키] = [{ detlCd, detlCdNm, detlNumvl }] (숫자 접미사 제거)
 */
async function fetchCodeSearch(keys: BizCodeKey[]): Promise<Record<BizCodeKey, BizcodeResultItem[]>> {
  const txCode = TX_CODE_MAP.codeSearch;
  const result: Record<BizCodeKey, BizcodeResultItem[]> = {};

  /** 슬래시 키 split 순서에 대응하는 서버 파라미터명 */
  const PARAM_NAMES = ['clsfCd', 'detlLvl', 'pprDtCd', 'stdt', 'enGb'];

  // n개의 키를 9개씩 chunk로 분할
  for (let chunkStart = 0; chunkStart < keys.length; chunkStart += CODE_SEARCH_CHUNK_SIZE) {
    const chunk = keys.slice(chunkStart, chunkStart + CODE_SEARCH_CHUNK_SIZE);

    // API 요청 파라미터 조립
    // 'a/b/c/d' (1번째 키) → clsfCd1='a', detlLvl1='b', pprDtCd1='c', stdt1='d'
    // 'e/f/g/h' (2번째 키) → clsfCd2='e', detlLvl2='f', pprDtCd2='g', stdt2='h'
    const params: Record<string, string> = {};
    for (let i = 0; i < chunk.length; i++) {
      const n = i + 1;
      const segments = chunk[i].split(KEY_DELIMITER);
      PARAM_NAMES.forEach((name, idx) => {
        if (idx < segments.length && segments[idx] !== '') {
          params[`${name}${n}`] = segments[idx];
        }
      });
    }

    logger.debug(`[BizcodeUtils] fetchCodeSearch: txCode=${txCode}, chunk=${JSON.stringify(chunk)}`);

    try {
      // TODO: 실제 API 호출로 교체
      // const response = await api.call(txCode, params);

      // ── MOCK: 임시 응답 데이터 (실 서버 연동 시 제거) ──
      const response: CodeSearchRawResponse = {};
      for (let m = 0; m < chunk.length; m++) {
        const n = m + 1;
        response[`clsfCd${n}`] = chunk[m];
        response[`cdCnt${n}_entf`] = [
          { [`detlCd${n}`]: 'A01', [`detlCdNm${n}`]: `${chunk[m]} 예금`, [`detlNumvl${n}`]: '100' },
          { [`detlCd${n}`]: 'A02', [`detlCdNm${n}`]: `${chunk[m]} 적금`, [`detlNumvl${n}`]: '200' },
          { [`detlCd${n}`]: 'A03', [`detlCdNm${n}`]: `${chunk[m]} 펀드`, [`detlNumvl${n}`]: '300' },
        ];
      }
      // ── MOCK END ──

      // 응답 파싱: 입력 키(chunk[i]) 기준으로 저장, cdCnt{n}_entf → 원시 아이템 배열
      for (let i = 1; i <= chunk.length; i++) {
        const key = chunk[i - 1]; // 입력 슬래시 키를 그대로 사용
        const rawItems = response[`cdCnt${i}_entf`] as Record<string, string>[] | undefined;

        if (!rawItems || rawItems.length === 0) {
          result[key] = [];
          continue;
        }

        // 숫자 접미사 제거: detlCd{i} → detlCd, detlCdNm{i} → detlCdNm, detlNumvl{i} → detlNumvl
        result[key] = rawItems.map((rawItem) => {
          const cleaned: Record<string, string> = {};
          for (const [rawKey, value] of Object.entries(rawItem)) {
            const cleanedKey = rawKey.replace(/\d+$/, '');
            cleaned[cleanedKey] = value;
          }
          return cleaned as unknown as BizcodeResultItem;
        });
      }
    } catch (error) {
      logger.error(`[BizcodeUtils] fetchCodeSearch failed: chunk=${JSON.stringify(chunk)}`, error);
      for (const key of chunk) {
        result[key] = [];
      }
    }
  }

  return result;
}

/**
 * complexCodeSearch 데이터 조회
 *
 * @description
 * 키 형식: 'suboRelTpcd/lvl1Dtcd/.../lvlNDtcd'
 * 요청: suboRelTpcd, lvl1Dtcd, lvl2Dtcd, ... 로 파라미터 매핑
 * 응답: { suboRelTpcd, lvlNDtcd, dtcdct, dtcdct_entf: [{dtcd, dtcnm}, ...] }
 * 저장: result[key] = dtcdct_entf
 */
async function fetchComplexCodeSearch(keys: BizCodeKey[]): Promise<Record<BizCodeKey, BizcodeResultItem[]>> {
  const txCode = TX_CODE_MAP.complexCodeSearch;
  const result: Record<BizCodeKey, BizcodeResultItem[]> = {};

  for (const key of keys) {
    logger.debug(`[BizcodeUtils] fetchComplexCodeSearch: txCode=${txCode}, key=${key}`);

    try {
      // 키를 split하여 파라미터 조립
      // 'a/b/c' → suboRelTpcd='a', lvl1Dtcd='b', lvl2Dtcd='c'
      const segments = key.split(KEY_DELIMITER);
      const params: Record<string, string> = { suboRelTpcd: segments[0] };
      segments.slice(1).forEach((dtcd, idx) => {
        if (dtcd !== '') {
          params[`lvl${idx + 1}Dtcd`] = dtcd;
        }
      });

      // TODO: 실제 API 호출로 교체
      // const response = await api.call(txCode, params);

      // ── MOCK: 임시 응답 데이터 (실 서버 연동 시 제거) ──
      const response: ComplexCodeSearchRawResponse = {
        suboRelTpcd: segments[0],
        dtcdct: '3',
        dtcdct_entf: [
          { dtcd: 'C01', dtcnm: `${segments[0]} 종속코드1` },
          { dtcd: 'C02', dtcnm: `${segments[0]} 종속코드2` },
          { dtcd: 'C03', dtcnm: `${segments[0]} 종속코드3` },
        ],
      };
      // ── MOCK END ──

      // dtcdct_entf 배열을 결과로 저장
      const items = response.dtcdct_entf ?? [];
      result[key] = items.map((item) => ({
        dtcd: item.dtcd ?? '',
        dtcnm: item.dtcnm ?? '',
      })) as unknown as BizcodeResultItem[];
    } catch (error) {
      logger.error(`[BizcodeUtils] fetchComplexCodeSearch failed: key=${key}`, error);
      result[key] = [];
    }
  }

  return result;
}

/**
 * partCodeSearch 데이터 조회
 *
 * @description
 * 화면에서 ['a/b/c', 'd/e/f'] 형태로 받고, 1개씩 서버에 전송합니다.
 * 슬래시 키를 split하여 inputCd1, inputCd2, ... 로 매핑합니다.
 *
 * 입력 키: 'a/b/c' → inputCd1='a', inputCd2='b', inputCd3='c'
 * 요청: { txCode(그룹), record(그룹), inputCd1, inputCd2, ... }
 * 응답: codeArr (배열 자체가 결과)
 * 저장: result['a/b/c'] = codeArr
 */
async function fetchPartCodeSearch(groups: PartCodeSearchGroup[]): Promise<Record<BizCodeKey, BizcodeResultItem[]>> {
  const result: Record<BizCodeKey, BizcodeResultItem[]> = {};

  for (const group of groups) {
    for (const key of group.code) {
      logger.debug(`[BizcodeUtils] fetchPartCodeSearch: txCode=${group.txCode}, key=${key}`);

      try {
        // 슬래시 키를 split하여 파라미터 조립
        // 'a/b/c' → inputCd1='a', inputCd2='b', inputCd3='c'
        const segments = key.split(KEY_DELIMITER);
        const params: Record<string, string> = { record: group.record };
        segments.forEach((cd, idx) => {
          if (cd !== '') {
            params[`inputCd${idx + 1}`] = cd;
          }
        });

        // TODO: 실제 API 호출로 교체
        // const response = await api.call(group.txCode, params);

        // ── MOCK: 임시 응답 데이터 (실 서버 연동 시 제거) ──
        const codeArr = [
          { detlCd: 'P01', detlCdNm: `${segments[0]} 부분코드1`, detlNumvl: '10' },
          { detlCd: 'P02', detlCdNm: `${segments[0]} 부분코드2`, detlNumvl: '20' },
        ] as unknown as BizcodeResultItem[];
        // ── MOCK END ──

        // 응답 배열(codeArr)을 그대로 결과로 사용
        result[key] = codeArr;
      } catch (error) {
        logger.error(`[BizcodeUtils] fetchPartCodeSearch failed: key=${key}`, error);
        result[key] = [];
      }
    }
  }

  return result;
}

/**
 * codeFullSearch 데이터 조회
 *
 * @description
 * 화면에서 ['a/b/c/d'] 형태로 받고, 1개씩 서버에 전송합니다.
 * 슬래시 키를 split하여 clsfCd, stdt, detlLvl, pprDtCd 순서로 매핑합니다.
 *
 * 입력 키: 'a/b/c/d' → clsfCd='a', stdt='b', detlLvl='c', pprDtCd='d'
 * 응답: { clsfCd, stdt, detlLvl, pprDtCd, cdCnt, cdCntG: [{detlCd, detlCdNm, tdcdEnnm, detlNumvl, numUnt, mnNumvl, mxNumvl, valdStrdt, valdNddt}] }
 * 저장: result['a/b/c/d'] = cdCntG
 */
async function fetchCodeFullSearch(keys: BizCodeKey[]): Promise<Record<BizCodeKey, BizcodeResultItem[]>> {
  const txCode = TX_CODE_MAP.codeFullSearch;
  const result: Record<BizCodeKey, BizcodeResultItem[]> = {};

  /** 슬래시 키 split 순서에 대응하는 서버 파라미터명 */
  const PARAM_NAMES = ['clsfCd', 'stdt', 'detlLvl', 'pprDtCd'];

  for (const key of keys) {
    logger.debug(`[BizcodeUtils] fetchCodeFullSearch: txCode=${txCode}, key=${key}`);

    try {
      // 슬래시 키를 split하여 파라미터 조립
      // 'a/b/c/d' → clsfCd='a', stdt='b', detlLvl='c', pprDtCd='d'
      const segments = key.split(KEY_DELIMITER);
      const params: Record<string, string> = {};
      PARAM_NAMES.forEach((name, idx) => {
        if (idx < segments.length && segments[idx] !== '') {
          params[name] = segments[idx];
        }
      });

      // TODO: 실제 API 호출로 교체
      // const response = await api.call(txCode, params);

      // ── MOCK: 임시 응답 데이터 (실 서버 연동 시 제거) ──
      const response: CodeFullSearchRawResponse = {
        clsfCd: segments[0],
        cdCnt: '2',
        cdCntG: [
          { detlCd: 'F01', detlCdNm: `${segments[0]} 전체코드1`, tdcdEnnm: 'FullCode1', detlNumvl: '1000', numUnt: 'KRW', mnNumvl: '0', mxNumvl: '9999', valdStrdt: '20130101', valdNddt: '99991231' },
          { detlCd: 'F02', detlCdNm: `${segments[0]} 전체코드2`, tdcdEnnm: 'FullCode2', detlNumvl: '2000', numUnt: 'KRW', mnNumvl: '0', mxNumvl: '9999', valdStrdt: '20130101', valdNddt: '99991231' },
        ],
      };
      // ── MOCK END ──

      // cdCntG 배열을 결과로 저장
      result[key] = (response.cdCntG ?? []) as unknown as BizcodeResultItem[];
    } catch (error) {
      logger.error(`[BizcodeUtils] fetchCodeFullSearch failed: key=${key}`, error);
      result[key] = [];
    }
  }

  return result;
}

/**
 * xmlSearch 데이터 조회
 *
 * @description
 * 화면에서 ['gdcd/gdFlg/applDt/atrcdFlg/rkTpcd'] 형태로 받고, 1개씩 서버에 전송합니다.
 * gdFlg는 코드 매핑하여 숫자로 변환 후 전송합니다.
 *
 * 입력 키: 'a/GDRSK/20130101/Y/01' → gdcd='a', gdFlg='0', applDt='20130101', atrcdFlg='Y', rkTpcd='01'
 * gdFlg 매핑: GDRSK→0, GDCSF→1, CRCVR→2, CLMTP→3, CLMCAS→4, 없으면→0
 * 응답: 서버 JSON 응답을 그대로 저장
 * 저장: result[입력키] = 응답 JSON
 */
async function fetchXmlSearch(keys: BizCodeKey[]): Promise<Record<BizCodeKey, BizcodeResultItem[]>> {
  const txCode = TX_CODE_MAP.xmlSearch;
  const result: Record<BizCodeKey, BizcodeResultItem[]> = {};

  /** gdFlg 문자열 → 서버 전송 코드 매핑 */
  const GD_FLG_MAP: Record<string, string> = {
    GDRSK: '0',
    GDCSF: '1',
    CRCVR: '2',
    CLMTP: '3',
    CLMCAS: '4',
  };

  /** 슬래시 키 split 순서에 대응하는 서버 파라미터명 */
  const PARAM_NAMES = ['gdcd', 'gdFlg', 'applDt', 'atrcdFlg', 'rkTpcd'];

  for (const key of keys) {
    logger.debug(`[BizcodeUtils] fetchXmlSearch: txCode=${txCode}, key=${key}`);

    try {
      const segments = key.split(KEY_DELIMITER);
      const params: Record<string, string> = {};

      PARAM_NAMES.forEach((name, idx) => {
        if (idx < segments.length && segments[idx] !== '') {
          if (name === 'gdFlg') {
            // gdFlg: 코드 매핑 (없거나 매핑에 없으면 '0')
            params[name] = GD_FLG_MAP[segments[idx]] ?? '0';
          } else {
            params[name] = segments[idx];
          }
        } else if (name === 'gdFlg') {
          // gdFlg 값이 없으면 기본값 '0'
          params[name] = '0';
        }
      });

      // TODO: 실제 API 호출로 교체
      // const response = await api.call(txCode, params);

      // ── MOCK: 임시 응답 데이터 (실 서버 연동 시 제거) ──
      const gdcd = segments[0] ?? 'UNKNOWN';
      const response = [
        { gdcd, gdNm: `${gdcd} 상품A`, rskGrd: '1등급', atrcd: 'ATR01' },
        { gdcd, gdNm: `${gdcd} 상품B`, rskGrd: '2등급', atrcd: 'ATR02' },
      ] as unknown as BizcodeResultItem[];
      // ── MOCK END ──

      // 서버 JSON 응답을 그대로 저장
      result[key] = response;
    } catch (error) {
      logger.error(`[BizcodeUtils] fetchXmlSearch failed: key=${key}`, error);
      result[key] = [];
    }
  }

  return result;
}

// ============================================================================
// INTERNAL - window.bizCodes 관리
// ============================================================================

function initGlobalStore(): BizcodeStore {
  if (typeof window === 'undefined') {
    throw new Error('[BizcodeUtils] window is not available (hydrateBizcode는 클라이언트에서만 사용 가능합니다)');
  }

  if (!window.bizCodes) {
    window.bizCodes = {
      codeSearch: {},
      complexCodeSearch: {},
      partCodeSearch: {},
      codeFullSearch: {},
      xmlSearch: {},
    };
  }

  return window.bizCodes;
}

// ============================================================================
// PUBLIC FUNCTIONS
// ============================================================================

/**
 * 비즈니스 코드 순수 조회 (SSR/CSR 공통)
 *
 * @description
 * 동일한 BizCodeTemplate으로 API를 호출하고, 결과 데이터만 반환합니다.
 * 어디에도 저장하지 않으므로 SSR 서버 컴포넌트에서도 안전하게 사용 가능합니다.
 *
 * @param template - 조회할 비즈니스 코드 템플릿
 * @returns bizCodeType별 { key: data[] } 구조의 조회 결과
 *
 * @example
 * // SSR layout.tsx (서버 컴포넌트)
 * const result = await fetchBizcode({
 *   codeSearch: ['code1', 'code3/temp1//20130101'],
 *   complexCodeSearch: ['code3/temp1'],
 * });
 * // result = { codeSearch: { 'code1': [...], 'code3/temp1//20130101': [...] }, complexCodeSearch: { ... } }
 */
export async function fetchBizcode(template: BizCodeTemplate): Promise<BizcodeDataResult> {
  logger.debug('[BizcodeUtils] fetchBizcode start', template);

  const result: BizcodeDataResult = {};
  const tasks: Promise<void>[] = [];

  if (template.codeSearch?.length) {
    tasks.push(fetchCodeSearch(template.codeSearch).then((data) => { result.codeSearch = data; }));
  }
  if (template.complexCodeSearch?.length) {
    tasks.push(fetchComplexCodeSearch(template.complexCodeSearch).then((data) => { result.complexCodeSearch = data; }));
  }
  if (template.partCodeSearch?.length) {
    tasks.push(fetchPartCodeSearch(template.partCodeSearch).then((data) => { result.partCodeSearch = data; }));
  }
  if (template.codeFullSearch?.length) {
    tasks.push(fetchCodeFullSearch(template.codeFullSearch).then((data) => { result.codeFullSearch = data; }));
  }
  if (template.xmlSearch?.length) {
    tasks.push(fetchXmlSearch(template.xmlSearch).then((data) => { result.xmlSearch = data; }));
  }

  await Promise.all(tasks);

  logger.debug('[BizcodeUtils] fetchBizcode complete', result);
  return result;
}

/**
 * 조회 결과를 window.bizCodes에 저장 (SSR→CSR 전달용)
 *
 * @description
 * fetchBizcode로 조회한 결과를 window.bizCodes에 병합 저장합니다.
 * SSR layout에서 조회한 데이터를 클라이언트 StoreHydrator에서 저장할 때 사용합니다.
 *
 * @param data - fetchBizcode의 반환값
 *
 * @example
 * // StoreHydrator.tsx (클라이언트 컴포넌트)
 * hydrateBizcode(bizcodeData);
 */
export function hydrateBizcode(data: BizcodeDataResult): void {
  const store = initGlobalStore();

  for (const [type, entries] of Object.entries(data)) {
    const bizType = type as BizCodeType;
    for (const [key, items] of Object.entries(entries)) {
      store[bizType][key] = items;
    }
  }

  logger.debug('[BizcodeUtils] hydrateBizcode complete');
}

/**
 * 비즈니스 코드 조회 + 저장 (CSR 전용)
 *
 * @description
 * fetchBizcode로 조회한 뒤, 결과를 window.bizCodes에 자동 저장합니다.
 * 클라이언트 컴포넌트에서 조회와 저장을 한번에 처리할 때 사용합니다.
 *
 * @param template - 조회할 비즈니스 코드 템플릿
 *
 * @example
 * // CSR page.tsx (클라이언트 컴포넌트)
 * await loadBizcode({
 *   codeSearch: ['code1', 'code3/temp1//20130101'],
 *   complexCodeSearch: ['code1', 'code3/temp1'],
 * });
 */
export async function loadBizcode(template: BizCodeTemplate): Promise<void> {
  const data = await fetchBizcode(template);
  hydrateBizcode(data);
}

/**
 * 비즈니스 코드 데이터 반환
 *
 * @description
 * window.bizCodes에 저장된 비즈니스 코드 데이터를 반환합니다.
 *
 * @param type - 비즈니스 코드 유형
 * @param key - 슬래시 구분 키 문자열
 * @returns 비즈니스 코드 결과 배열 또는 undefined
 *
 * @example
 * const result = getBizcode('codeSearch', 'code1');
 * const result2 = getBizcode('codeSearch', 'code3/temp1//20130101');
 */
export function getBizcode(type: BizCodeType, key: BizCodeKey): BizcodeResultItem[] | undefined {
  logger.debug(`[BizcodeUtils] getBizcode: type=${type}, key=${key}`);

  if (typeof window === 'undefined' || !window.bizCodes) {
    logger.warn('[BizcodeUtils] getBizcode: window.bizCodes가 초기화되지 않았습니다.');
    return undefined;
  }

  const typeData = window.bizCodes[type];
  if (!typeData) {
    return undefined;
  }

  return typeData[key] ?? undefined;
}

/**
 * 전역 비즈코드 저장소 초기화
 */
export function clearBizcode(): void {
  if (typeof window !== 'undefined') {
    window.bizCodes = {
      codeSearch: {},
      complexCodeSearch: {},
      partCodeSearch: {},
      codeFullSearch: {},
      xmlSearch: {},
    };
  }
}
