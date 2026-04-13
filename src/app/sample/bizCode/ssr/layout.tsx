import { ReactNode } from 'react';
import { fetchBizcode } from '@/shared/utils/bizcodeUtils';
import type { BizCodeTemplate } from '@/shared/utils/bizcodeUtils';
import { StoreHydrator } from './StoreHydrator';

// ============================================================================
// SSR Bizcode 샘플 - Layout (서버 컴포넌트)
// 동일한 BizCodeTemplate으로 fetchBizcode 호출 → StoreHydrator로 전달
// ============================================================================

/** 이 페이지에서 사용할 비즈코드 템플릿 (5개 search 타입 전체) */
const BIZCODE_TEMPLATE: BizCodeTemplate = {
  // clsfCd/detlLvl/pprDtCd/stdt/enGb
  codeSearch: ['CD001', 'CD002/2/PPR01/20130101'],
  // suboRelTpcd/lvl1Dtcd/.../lvlNDtcd
  complexCodeSearch: ['REL01', 'REL02/DTL01/DTL02'],
  // txCode, record, code: [inputCd1/inputCd2/...]
  partCodeSearch: [{ txCode: 'TRX001', record: 'REC01', code: ['PARAM01', 'PARAM02/PARAM03'] }],
  // clsfCd/stdt/detlLvl/pprDtCd
  codeFullSearch: ['FULL01', 'FULL02/20130101/3/PPR01'],
  // gdcd/gdFlg/applDt/atrcdFlg/rkTpcd
  xmlSearch: ['PROD01/GDRSK/20130101/Y/01', 'PROD02'],
};

interface LayoutProps {
  children: ReactNode;
}

export default async function BizCodeSSRLayout({ children }: LayoutProps) {
  const bizcodeData = await fetchBizcode(BIZCODE_TEMPLATE);

  return (
    <StoreHydrator bizcodeData={bizcodeData}>
      {children}
    </StoreHydrator>
  );
}
