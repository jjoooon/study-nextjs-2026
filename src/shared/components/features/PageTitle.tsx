/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { useState } from 'react';
import { FormItem, Grow, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { ViewMode } from '@common/ViewMode';
import { ArrowIcon, PenIcon, SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

// 페이지 타이틀 영역에서 사용하는 기본 데이터 모델이다.
// 화면마다 일부 값만 내려올 수 있으므로 대부분 optional로 선언되어 있다.
type DefaultPageTitle = {
  title?: string;
  pageName?: string;
  pageId?: string | number;
  contractHolder?: string;
  simpleMode?: boolean;
  planNumber?: [string?, string?] | string[];
  planNumberList?: Array<{ label: string; value: string; name: string; amount: string; state: string }>;
};

// 공통 타이틀 컴포넌트에서 사용하는 props 타입이다.
// `simpleMode`와 `onSimpleModeChange`는 상품형 타이틀에서만 의미 있게 사용된다.
type PageTitleProps = {
  data: DefaultPageTitle;
  simpleMode?: boolean;
  onSimpleModeChange?: (value: boolean) => void;
};

export function PageTitle({ data }: PageTitleProps) {
  // 외부에서 `data`가 비어 있더라도 렌더링이 깨지지 않도록 안전한 기본 객체를 만든다.
  const safeData = data ?? {};

  // 계약자명 입력값은 로컬 상태로 관리한다.
  // 초기값은 서버/상위 컴포넌트에서 내려준 `contractHolder`를 사용한다.
  const [contractHolder, setContractHolder] = useState<string>(safeData.contractHolder ?? '');

  return (
    <Grow placement={'bwc'} gap={3} className="w-full py-1 flex-wrap">
      {/* 좌측 영역: 화면의 대표 제목을 표시한다. */}
      <Grow className="gap-[.8rem] flex-1" placement={'sc'}>
        <Typo tag={'h2'} variant={'heading-lg'}>
          {safeData.title}
        </Typo>
      </Grow>

      {/* 우측 영역: 계약자명 입력과 조회 버튼을 표시한다. */}
      <Grow className="gap-2.5 shrink-0" placement={'ec'}>
        <FormItem className="w-[19.8rem] ml-1.5">
          {/* 입력창 hover/focus 시 보조 설명을 툴팁으로 제공한다. */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                aria-label="계약자명 입력"
                type="text"
                value={contractHolder}
                width={'full'}
                onChange={(e) => setContractHolder(e.target.value)}
              />
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={0}>
              계약자명을 입력하세요.
            </TooltipContent>
          </Tooltip>
          <Button variant={'outlined'} color={'gray-light'} aria-label="계약자 추가" only={'icon'} size={'lg'}>
            <SearchIcon color="var(--color-primary-50)" />
          </Button>
        </FormItem>
      </Grow>
    </Grow>
  );
}

export function PageTitleProduct({ data, simpleMode, onSimpleModeChange }: PageTitleProps) {
  // 상품형 타이틀도 동일하게 안전한 기본 객체를 만들어 예외 상황을 방지한다.
  const safeData = data ?? {};

  // 이 컴포넌트는 controlled / uncontrolled 두 방식 모두 지원한다.
  // `simpleMode` prop이 내려오면 외부 상태를 우선 사용하고,
  // 그렇지 않으면 내부 상태(`internalSimpleMode`)로 간편/상세 모드를 관리한다.
  const [internalSimpleMode, setInternalSimpleMode] = useState<boolean>(safeData.simpleMode ?? false);
  const resolvedSimpleMode = simpleMode ?? internalSimpleMode;

  // 모드 전환 시 내부 상태를 갱신하고, 외부 콜백이 있으면 함께 통지한다.
  const handleSimpleModeChange = (value: boolean) => {
    if (simpleMode === undefined) {
      setInternalSimpleMode(value);
    }
    onSimpleModeChange?.(value);
  };

  // 설계번호는 `앞자리-뒷자리` 구조이므로 문자열 배열 2칸으로 나누어 관리한다.
  // 첫 번째 값은 콤보 입력, 두 번째 값은 짧은 텍스트 입력과 연결된다.
  const [planNumber] = useState<string[]>([safeData.planNumber?.[0] ?? '', safeData.planNumber?.[1] ?? '']);

  // 계약자명 역시 화면 내 편집이 가능하므로 로컬 상태로 관리한다.
  const [contractHolder, setContractHolder] = useState<string>(safeData.contractHolder ?? '');

  return (
    <Grow placement="bwc" className="w-full py-1 gap-1.5 flex-wrap">
      {/* 좌측 영역: 보기 모드 전환, 제목, 플랜 선택 드롭다운을 배치한다. */}
      <Grow className="gap-2 flex-1" placement="sc">
        {/* 간편/상세 모드를 토글하는 UI. 실제 상태값은 controlled/uncontrolled 정책에 따라 결정된다. */}
        <ViewMode
          label={['간편', '상세']}
          state={resolvedSimpleMode}
          onChange={handleSimpleModeChange}
          disabled={true}
        />

        {/* 제목이 길 수 있으므로 툴팁으로 전체 제목을 확인할 수 있게 한다. */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="none" color="gray" className="px-0">
              <Typo tag="h2" variant="heading-lg">
                {safeData.title}
              </Typo>
              <ArrowIcon color="var(--color-gray-60)" className="rotate-180" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={0}>
            {safeData.title}
          </TooltipContent>
        </Tooltip>

        {/* 현재 플랜/상품군을 선택하는 셀렉트 박스 영역이다. */}
        <NativeSelect aria-label="플랜 선택" width={200} readOnly={false} required={false}>
          <NativeSelectOption value="1">차움건강검진할인형, 납입면제 강화형, 기본형</NativeSelectOption>
          <NativeSelectOption value="2">옵션 2</NativeSelectOption>
        </NativeSelect>
      </Grow>

      {/* 우측 영역: 메모 버튼과 설계번호/계약자 정보를 입력하는 폼을 배치한다. */}
      <Grow className="gap-2.5 shrink-0" placement="ec">
        <Button variant="outlined" color="gray" size="md">
          {/* M1. 아이콘 수정 */}
          <PenIcon size={12} />
          메모
        </Button>

        {/* `FormTable`을 사용해 레이블과 입력 필드를 정렬된 형태로 구성한다. */}
        <FormTable caption="계약자 관련 정보 입력하세요." cols={['', '']} variant="none" lineTop={false}>
          <FormRow>
            <FormCell title="설계번호" className="pr-[0.4rem]!">
              {/* 설계번호 앞자리는 드롭다운 + 직접 입력이 가능한 콤보 형태로 제공한다. */}
              <Input
                aria-label="설계번호 입력"
                type="text"
                width={131}
                readOnly
                value={planNumber[0]}
                placeholder="설계번호 입력하세요"
              />

              {/* 설계번호 구분자 표현 */}
              <span aria-hidden="true">-</span>
              {/* 설계번호 뒷자리는 짧은 고정 길이 입력으로 관리한다. */}
              <Input aria-label="설계번호 입력" type="text" readOnly value={planNumber[1]} width={26} />
              {/* 설계번호 입력 오른쪽에는 계약자명 입력과 조회 버튼을 함께 배치한다. */}
              <Grow className="ml-1.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input
                      aria-label="계약자명 입력"
                      type="text"
                      value={contractHolder}
                      width={166}
                      onChange={(e) => setContractHolder(e.target.value)}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={0}>
                    {contractHolder}
                  </TooltipContent>
                </Tooltip>

                {/* 계약자명 검색/조회 액션 버튼 */}
                <Button variant="outlined" color="gray-light" aria-label="계약자 추가" only="icon" size="lg">
                  <SearchIcon color="var(--color-primary-50)" />
                </Button>
              </Grow>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
    </Grow>
  );
}
