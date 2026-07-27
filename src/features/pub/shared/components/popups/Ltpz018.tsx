/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

/**
 * @file Ltpz018.tsx
 * @description 한화손해보험 포털 내 메인 바로가기(나의 메뉴)를 설정하고 순서를 관리하는 팝업 다이얼로그 컴포넌트입니다.
 *
 * 주요 비즈니스 및 기술적 특징:
 * 1. 최대 선택 제한: 고정된 필수 메뉴를 포함해 등록할 수 있는 나의 메뉴의 개수는 최대 7개(MAX_SELECTED_MENU = 7)로 고정됩니다.
 * 2. 탭 상태에 따른 이원화 동작:
 *    - 전체메뉴(tab1): 즐겨찾기로 등록된 나의메뉴 목록을 단순히 링크 버튼 형식으로 나열해 제공합니다.
 *    - 편집모드(tab2): 체크박스로 나의메뉴 등록 대상을 선택하고, 우측 패널에서 등록된 메뉴들의 노출 순서를 변경합니다.
 * 3. 고정(fix) 항목 제어: fix 옵션이 true인 기본 필수 메뉴는 사용자가 해제하거나 정렬 순서를 바꿀 수 없습니다.
 * 4. 세부 정렬 로직: 우측 나의 메뉴 리스트에서 임의 메뉴를 선택한 뒤 위/아래 이동 버튼을 통해 정순/역순으로 인덱스를 Swap(교환)합니다.
 */

import '@/shared/lib/agGridPub';
import { Fragment, useMemo, useState } from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { Grid, Grow, Typo, Gcol } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { TabPager } from '@common/TabPager';
import { ArrowIcon, InputClearIcon } from '@icons';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { toast } from '@uiux/Sonner';

/**
 * 내부 메뉴 항목 아이템에 대한 타입 규격
 */
type MenuItem = {
  code: string; // 메뉴 고유 코드
  group: string; // 메뉴 그룹/카테고리명
  name: string; // 화면에 표시될 메뉴명
  link: string; // 이동할 URL 링크 주소
  fix?: boolean; // 기본 필수(고정) 여부
  selected?: boolean; // 즐겨찾기(나의 메뉴) 등록 선택 여부
};

/**
 * 외부(Props) 노출용 메뉴 규격 타입 정의
 */
export type Ltpz018MenuItem = {
  code: string;
  group: string;
  name: string;
  link: string;
  fix?: boolean;
  selected?: boolean;
};

const MENU_LIST: MenuItem[] = [
  { code: 'm1_1', selected: false, fix: true, group: '공통(기본)', name: '설계매뉴얼', link: '/' },
  { code: 'm1_2', selected: false, fix: false, group: '공통(기본)', name: '질문하기', link: '/' },
  { code: 'm1_3', selected: true, fix: false, group: '공통(기본)', name: '설계동의', link: '/' },
  { code: 'm1_4', selected: false, fix: false, group: '공통(기본)', name: '동의현황', link: '/' },
  { code: 'm1_5', selected: false, fix: false, group: '공통(기본)', name: '약관조회', link: '/' },

  { code: 'm2_1', selected: false, fix: true, group: '지침', name: '실손정액조회', link: '/' },
  { code: 'm2_2', selected: false, fix: false, group: '지침', name: '전체누적', link: '/' },
  { code: 'm2_3', selected: false, fix: false, group: '지침', name: '부실유의', link: '/' },
  { code: 'm2_4', selected: false, fix: false, group: '지침', name: '인수기준', link: '/' },
  { code: 'm2_5', selected: false, fix: false, group: '지침', name: '인수스코어', link: '/' },

  { code: 'm3_1', selected: false, fix: false, group: '영업관리', name: '수수료조회', link: '/' },
  { code: 'm3_2', selected: false, fix: false, group: '영업관리', name: '物비용처리', link: '/' },

  { code: 'm4_1', selected: false, fix: false, group: '설계', name: '다른상품설계', link: '/' },
  { code: 'm4_2', selected: false, fix: false, group: '설계', name: '동일상품복사', link: '/' },
  { code: 'm4_3', selected: false, fix: false, group: '설계', name: '계약복사', link: '/' },
  { code: 'm4_4', selected: false, fix: false, group: '설계', name: '설계비교', link: '/' },
  { code: 'm4_5', selected: false, fix: false, group: '설계', name: '건축물대장', link: '/' },
  { code: 'm4_6', selected: false, fix: false, group: '설계', name: '업종선택', link: '/' },
  { code: 'm4_7', selected: false, fix: false, group: '설계', name: '건물구조입력', link: '/' },
  { code: 'm4_8', selected: false, fix: false, group: '설계', name: '설계완료알림', link: '/' },
  { code: 'm4_9', selected: false, fix: false, group: '설계', name: '법정대리인등록', link: '/' },
  { code: 'm4_10', selected: false, fix: false, group: '설계', name: '담보순서조정', link: '/' },

  { code: 'm5_1', selected: false, fix: false, group: 'UW', name: '질병가이드', link: '/' },
  { code: 'm5_2', selected: false, fix: false, group: 'UW', name: '고지콕콕', link: '/' },
  { code: 'm5_3', selected: false, fix: false, group: 'UW', name: '청약완료불가사전안내', link: '/' },

  { code: 'm6_1', selected: false, fix: false, group: '스캔', name: '이미지조회', link: '/' },
  { code: 'm6_2', selected: false, fix: false, group: '스캔', name: '이미지스캔', link: '/' },
  { code: 'm6_3', selected: false, fix: false, group: '스캔', name: '원클릭스캔', link: '/' },
  { code: 'm6_4', selected: false, fix: false, group: '스캔', name: '전자문서지갑', link: '/' },

  { code: 'm7_1', selected: false, fix: false, group: 'TM', name: 'QA심사이력', link: '/' },
  { code: 'm7_2', selected: false, fix: false, group: 'TM', name: '통판스크립트', link: '/' },
  { code: 'm7_3', selected: false, fix: false, group: 'TM', name: '공통스크립트', link: '/' },
  { code: 'm7_4', selected: false, fix: false, group: 'TM', name: 'TMI마케팅동의', link: '/' },
];

const MAX_SELECTED_MENU = 7;

/**
 * Ltpz018 컴포넌트의 Props 타입 정의
 */
type Ltpz018Props = {
  onSaveMyMenuList?: (nextMenus: Ltpz018MenuItem[]) => void; // 설정 완료(저장) 시 최종 즐겨찾기 메뉴 리스트를 전달하는 콜백
};

const Ltpz018 = ({ onSaveMyMenuList }: Ltpz018Props) => {
  // 탭 목록 정의 (전체메뉴: 바로가기 링크 노출 / 편집모드: 추가, 삭제, 순서 변경)
  const DATA_TABS = [
    { label: '전체메뉴', value: 'tab1' },
    { label: '편집모드', value: 'tab2' },
  ];

  // 전체 메뉴 목록 상태
  const [menuList, setMenuList] = useState<MenuItem[]>(MENU_LIST);

  // 코드(code) 기준으로 중복이 제거된 순수 메뉴 목록 캐싱
  const uniqueMenuList = useMemo(
    () => menuList.filter((menu, index, list) => list.findIndex((item) => item.code === menu.code) === index),
    [menuList]
  );

  // 기본 고정 필수 메뉴(fix: true)의 총 개수 계산
  const fixedMenuCount = useMemo(() => uniqueMenuList.filter((menu) => menu.fix).length, [uniqueMenuList]);

  // 사용자가 즐겨찾기(선택) 등록한 메뉴 코드 배열
  const [selectedMenuNames, setSelectedMenuNames] = useState<string[]>(
    MENU_LIST.filter((menu) => menu.selected).map((menu) => menu.code)
  );

  // 메뉴 7개 초과 선택 시 경고 토스트 팝업 표출
  const showSelectionLimitToast = () => {
    toast.info('나의 메뉴는 최대 7개까지 선택할 수 있습니다.', { duration: 3000 });
  };

  /**
   * 체크되어 수집된 코드 목록 중, 고정 필수 메뉴가 아닌 순수 가변 메뉴의 개수를 카운트합니다.
   */
  const countNonFixedSelected = (codes: string[]) =>
    codes.filter((code) => {
      const target = uniqueMenuList.find((menu) => menu.code === code);
      return target !== undefined && !target.fix;
    }).length;

  /**
   * 편집모드 탭의 체크박스 그룹에서 항목을 선택/선택 해제할 때 호출되는 핸들러
   * - 고정 메뉴 개수 + 가변 선택 개수가 최대 허용치(7개)를 초과하는지 유효성 검사 수행
   */
  const handleMenuSelectionChange = (nextValues: string[]) => {
    // 필수(고정) 메뉴 개수와 사용자가 선택하려는 가변 메뉴 개수의 합이 7을 초과하면 토스트 알림 후 차단
    if (fixedMenuCount + countNonFixedSelected(nextValues) > MAX_SELECTED_MENU) {
      showSelectionLimitToast();
      return;
    }

    setSelectedMenuNames(nextValues);
    // 선택된 가변 메뉴 리스트에 대해 selected 상태 반영
    setMenuList((prev) =>
      prev.map((menu) => {
        if (menu.fix) return menu;
        return { ...menu, selected: nextValues.includes(menu.code) };
      })
    );
  };

  /**
   * 우측 나의메뉴 리스트 패널에서 삭제(X) 버튼 클릭 시, 해당 메뉴를 즉시 해제 처리하는 핸들러
   */
  const handleRemoveMenu = (code: string) => {
    setSelectedMenuNames((prev) => prev.filter((selectedCode) => selectedCode !== code));
    setMenuList((prev) => prev.map((menu) => (menu.code === code ? { ...menu, selected: false } : menu)));
    // 순서 정렬을 위해 선택(하이라이트)되어 있던 상태도 함께 클리어
    setSelectedMenuCode((prev) => (prev === code ? null : prev));
  };

  // 순서 조정을 위해 우측 패널에서 클릭하여 포커스(선택)된 메뉴 코드 상태
  const [selectedMenuCode, setSelectedMenuCode] = useState<string | null>(null);

  /**
   * [위로 이동] 선택된 메뉴의 노출 순서를 배열 내에서 한 단계 위로 올립니다.
   */
  const handleMoveUp = () => {
    if (!selectedMenuCode) return;
    setSelectedMenuNames((prev) => {
      const idx = prev.indexOf(selectedMenuCode);
      // 이미 최상단(인덱스 0)이거나 목록에 없으면 처리 생략
      if (idx <= 0) return prev;
      const next = [...prev];
      // 이전 원소와 현재 원소의 위치 교환(Swap)
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  /**
   * [아래로 이동] 선택된 메뉴의 노출 순서를 배열 내에서 한 단계 아래로 내립니다.
   */
  const handleMoveDown = () => {
    if (!selectedMenuCode) return;
    setSelectedMenuNames((prev) => {
      const idx = prev.indexOf(selectedMenuCode);
      // 이미 최하단(마지막 인덱스)이거나 목록에 없으면 처리 생략
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const next = [...prev];
      // 다음 원소와 현재 원소의 위치 교환(Swap)
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  // 탭 제어 Hooks
  const { tabs, active, setActive } = useTabs(DATA_TABS);

  /**
   * 저장 버튼 클릭 시 최종 즐겨찾기 메뉴 구조(Ltpz018MenuItem)를 조립하여 부모 컴포넌트로 전송
   */
  const handleSave = () => {
    const menuMap = new Map(uniqueMenuList.map((menu) => [menu.code, menu]));
    const nextMenus = selectedMenuNames
      .map((code) => menuMap.get(code))
      .filter((menu): menu is Ltpz018MenuItem => menu !== undefined);

    onSaveMyMenuList?.(nextMenus);
  };

  /**
   * 메뉴 전체 리스트를 화면 렌더링 목적(그룹별 타이틀 하위에 아이템을 배치)으로 그룹화하여 캐싱
   */
  const groupedMenuList = useMemo(() => {
    const groups: { group: string; items: MenuItem[] }[] = [];
    for (const menu of MENU_LIST) {
      const last = groups[groups.length - 1];
      if (last?.group === menu.group) {
        last.items.push(menu);
      } else {
        groups.push({ group: menu.group, items: [menu] });
      }
    }
    return groups;
  }, []);

  const customChunkedMenuList = useMemo(() => {
    const chunks = [];
    if (groupedMenuList.length > 0) {
      chunks.push(groupedMenuList.slice(0, 3));
    }
    let i = 3;
    while (i < groupedMenuList.length) {
      chunks.push(groupedMenuList.slice(i, i + 2));
      i += 2;
    }
    return chunks;
  }, [groupedMenuList]);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg" className="ltpz018-popup">
        {/* 다이얼로그 헤더 영역 */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              바로가기 설정
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ018)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        {/* 다이얼로그 바디 영역 */}
        <DialogSection>
          <Grid gap={5} className="grid-cols-[1fr_auto] place-items-stretch" placement="ss">
            {/* 좌측 탭 컨트롤러 (전체메뉴 / 편집모드 탭 분기 제공) */}
            <TabPager
              data={tabs}
              active={active}
              setActive={setActive}
              getValue={(tab) => String(tab.value)}
              renderTab={(tab) => <span>{tab.label}</span>}
            >
              {/* 탭 내부 콘텐츠 영역 */}
              <Gcol
                variant="box-round-b"
                className="w-full flex-wrap content-start overflow-y-auto h-full min-h-[27rem] relative "
                placement="ss"
              >
                <Grow
                  className="absolute top-0 left-0 w-full px-5 py-4 flex-wrap content-start items-start"
                  placement="ss"
                  gap={2.5}
                >
                  {/* [탭1] 전체메뉴 뷰: 등록된 바로가기 메뉴들을 아웃라인 버튼 형식으로 나열 */}
                  {active === 'tab1' &&
                    customChunkedMenuList.map((chunk, chunkIdx) => (
                      <Gcol className="flex-1 gap-[1.3rem]" key={`col-${chunkIdx}`} placement="ss">
                        {chunk.map((g, gIdx) => (
                          <Gcol className="w-full" key={`group-${chunkIdx}-${gIdx}`} placement="ss">
                            {/* 카테고리/그룹명 타이틀 */}
                            <Typo tag="h3" variant={'body-sm'} weight={'bold'}>
                              {g.group}
                            </Typo>
                            {/* 그룹별 소속 메뉴 바로가기 버튼 */}
                            <Gcol className="w-full" placement="ss">
                              {g.items.map((menu) => (
                                <Button
                                  key={menu.code}
                                  variant={'outlined'}
                                  size={'md'}
                                  color={'gray-light'}
                                  className="w-full min-w-[14.8rem] justify-start! text-left!"
                                >
                                  {menu.name}
                                </Button>
                              ))}
                            </Gcol>
                          </Gcol>
                        ))}
                      </Gcol>
                    ))}

                  {/* [탭2] 편집모드 뷰: 체크박스 버튼을 통해 즐겨찾기 메뉴 추가/해제 가능 */}
                  {active === 'tab2' &&
                    customChunkedMenuList.map((chunk, chunkIdx) => (
                      <Gcol className="flex-1 gap-[1.3rem]" key={`col-${chunkIdx}`} placement="ss">
                        {chunk.map((g, gIdx) => (
                          <Gcol className="w-full" key={`group-${chunkIdx}-${gIdx}`} placement="ss">
                            {/* 카테고리/그룹명 타이틀 */}
                            <Typo tag="h3" variant={'body-sm'} weight={'bold'}>
                              {g.group}
                            </Typo>
                            {/* 그룹별 소속 메뉴 체크박스 그룹 */}
                            <Gcol className="w-auto" placement="ss">
                              <CheckboxGroup
                                className="gap-1 [&>div]:min-w-[calc(25%_-_0.3rem)]"
                                value={selectedMenuNames} // 현재 즐겨찾기 선택된 메뉴 고유 코드 바인딩
                                onValueChange={handleMenuSelectionChange} // 선택 한계(7개) 제어 검증 포함 핸들러
                              >
                                {g.items.map((menu) => (
                                  <CheckboxGroupItem
                                    variant="button"
                                    key={menu.code}
                                    value={menu.code}
                                    size="md"
                                    className="w-full min-w-[14.8rem] justify-start! text-left! ltpz018-checkbox-btn"
                                    disabled={menu.fix} // [중요] 기본 필수 고정(fix: true) 메뉴는 비활성화하여 해제 불가 처리
                                  >
                                    {menu.name}
                                  </CheckboxGroupItem>
                                ))}
                              </CheckboxGroup>
                            </Gcol>
                          </Gcol>
                        ))}
                      </Gcol>
                    ))}
                </Grow>
              </Gcol>
            </TabPager>

            {/* 
              우측 영역: '나의 메뉴' 리스트 및 순서 조정 패널 
              - 편집모드(tab2)일 때만 순서 이동 버튼(위로/아래로)이 보입니다.
              - 선택한 메뉴를 클릭하여 포커스 한 후, 위/아래 버튼을 눌러 바로가기 노출 순서를 동적으로 조정합니다.
            */}
            <Grid placement="ss" className="w-[15.2rem] h-full grid-rows-[auto_1fr]">
              <Grow className="w-full" placement="bwc">
                <Typo tag={'h3'} variant={'heading-md'}>
                  나의메뉴
                </Typo>
                {/* 편집모드(tab2) 활성화 시 순서 변경용 위/아래 컨트롤러 노출 */}
                {active === 'tab2' && (
                  <Grow>
                    {/* 위로 이동 버튼 (선택된 메뉴가 없거나 리스트 최상단일 때 disabled) */}
                    <Button
                      variant={'outlined'}
                      size={'sm'}
                      color={'gray-light'}
                      only={'icon'}
                      aria-label="위로 이동"
                      disabled={!selectedMenuCode || selectedMenuNames.indexOf(selectedMenuCode) <= 0}
                      onClick={handleMoveUp}
                    >
                      <ArrowIcon size={13} color={'var(--color-primary-50)'} className="rotate-[90deg]" />
                    </Button>
                    {/* 아래로 이동 버튼 (선택된 메뉴가 없거나 리스트 최하단일 때 disabled) */}
                    <Button
                      variant={'outlined'}
                      size={'sm'}
                      color={'gray-light'}
                      only={'icon'}
                      aria-label="아래로 이동"
                      disabled={
                        !selectedMenuCode || selectedMenuNames.indexOf(selectedMenuCode) >= selectedMenuNames.length - 1
                      }
                      onClick={handleMoveDown}
                    >
                      <ArrowIcon size={13} color={'var(--color-primary-50)'} className="-rotate-[90deg]" />
                    </Button>
                  </Grow>
                )}
              </Grow>

              {/* 나의 메뉴 리스트 박스 영역 */}
              <Grow
                variant="box-line"
                className="w-full flex-wrap content-start overflow-y-auto relative overflow-x-hidden"
                placement="ss"
                gap={1}
              >
                <Gcol className="absolute top-0 w-full left-0 p-2.5">
                  {active === 'tab2' ? (
                    /* [편집모드] 삭제 버튼 및 클릭 선택 하이라이트가 포함된 조작형 아이템 목록 */
                    <>
                      {/* 1) 필수 고정(fix: true) 메뉴 렌더링 (해제 불가능하여 삭제 아이콘 제외) */}
                      {uniqueMenuList
                        .filter((menu) => menu.fix)
                        .map((menu) => (
                          <div
                            key={`mymenu-${menu.code}`}
                            tabIndex={0}
                            role="button"
                            onClick={() => setSelectedMenuCode((prev) => (prev === menu.code ? null : menu.code))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ')
                                setSelectedMenuCode((prev) => (prev === menu.code ? null : menu.code));
                            }}
                            className={`flex w-full items-center justify-between gap-2 px-2 rounded-[0.3rem] text-[#fff] h-[3.2rem] text-[1.2rem] font-bold cursor-pointer outline-none bg-[var(--color-gray-20)]`}
                          >
                            <div className="truncate w-[10rem]">{menu.name}</div>
                          </div>
                        ))}
                      {/* 2) 사용자가 직접 선택한 가변 메뉴 렌더링 (클릭 시 하이라이트 활성화 및 X 버튼 클릭 시 해제) */}
                      {selectedMenuNames
                        .map((code) => uniqueMenuList.find((menu) => menu.code === code))
                        .filter((menu): menu is MenuItem => menu !== undefined && !menu.fix)
                        .map((menu) => (
                          <div
                            key={`mymenu-${menu.code}`}
                            tabIndex={0}
                            role="button"
                            onClick={() => setSelectedMenuCode((prev) => (prev === menu.code ? null : menu.code))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ')
                                setSelectedMenuCode((prev) => (prev === menu.code ? null : menu.code));
                            }}
                            className={`flex w-full items-center justify-between gap-2 px-2 rounded-[0.3rem] text-[#fff] h-[3.2rem] text-[1.2rem] font-bold cursor-pointer outline-none ${
                              selectedMenuCode === menu.code
                                ? 'bg-[var(--color-primary-50)] ring-2 ring-[var(--color-primary-30)]'
                                : 'bg-[var(--color-gray-50)]'
                            }`}
                          >
                            <div className="truncate w-[10rem]">{menu.name}</div>
                            {/* 개별 메뉴 선택 해제(삭제) 버튼 */}
                            <Button
                              variant={'none'}
                              only={'icon'}
                              onClick={(e) => {
                                e.stopPropagation(); // 부모 컨테이너의 포커스 클릭 이벤트 버블링 차단
                                handleRemoveMenu(menu.code);
                              }}
                              className="w-[1.2rem] h-[1.2rem]"
                            >
                              <InputClearIcon size={12} />
                            </Button>
                          </div>
                        ))}
                    </>
                  ) : (
                    /* [비편집모드 / 전체메뉴] 단순히 저장되어 있는 나의 바로가기 목록을 버튼 목록으로 출력 */
                    <>
                      {/* 고정 메뉴 리스트 */}
                      {uniqueMenuList
                        .filter((menu) => menu.fix)
                        .map((menu) => (
                          <Button
                            key={`mymenu-${menu.code}`}
                            variant={'contained'}
                            size={'xl'}
                            color={'gray'}
                            className="w-full text-[1.2rem] rounded-[0.3rem]"
                          >
                            {menu.name}
                          </Button>
                        ))}
                      {/* 가변 추가 메뉴 리스트 */}
                      {selectedMenuNames
                        .map((code) => uniqueMenuList.find((menu) => menu.code === code))
                        .filter((menu): menu is MenuItem => menu !== undefined && !menu.fix)
                        .map((menu) => (
                          <Button
                            key={`mymenu-${menu.code}`}
                            variant={'contained'}
                            size={'xl'}
                            color={'gray'}
                            className="w-full text-[1.2rem] rounded-[0.3rem]"
                          >
                            {menu.name}
                          </Button>
                        ))}
                    </>
                  )}
                </Gcol>
              </Grow>
            </Grid>
          </Grid>
        </DialogSection>

        {/* 팝업 하단 풋터 영역 */}
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray'}>
                설정
              </Button>
            </Grow>
            <Grow>
              {/* 편집모드(tab2)에서만 적용 및 저장 버튼군 제공 */}
              {active === 'tab2' && (
                <>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    TMT설정 적용
                  </Button>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    기본설정 적용
                  </Button>
                  {/* 최종 변경 상태 저장 및 부모 콜백 호출 */}
                  <Button variant={'contained'} size={'xl'} onClick={handleSave}>
                    저장
                  </Button>
                </>
              )}
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz018;
