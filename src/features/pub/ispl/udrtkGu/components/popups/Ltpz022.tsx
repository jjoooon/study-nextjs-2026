/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { AiIcon } from '@icons';
import { Button } from '@uiux/Button';
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
import { Input } from '@uiux/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@uiux/Table';

/** 탭 메뉴 구성 타입 정의 */
type Ltpz022TabType = {
  name: string;
  value: string;
  label: string;
};

const DATA_TABS: Ltpz022TabType[] = [
  {
    name: '설계',
    value: 'tab1',
    label: '설계',
  },
];

/** 인수 지침 위배 내역 데이터 타입 */
type UnderwritingViolationRow = {
  id: number;
  criteria: string; // 인수제한 구분 (인수기준, 청약완료불가 등)
  details: string; // 상세 위배 내용 (HTML 포함 가능)
};

/** 그리드에 표시될 임시 데이터 */
const violationRowData: UnderwritingViolationRow[] = [
  {
    id: 1,
    criteria: '인수기준',
    details:
      '[ULA16364H01_1814_01] [암(유사암제외)항암호르몬약물(연1회)][전체누적][인수한도: 300 만원][초과: 300 만원]',
  },
  {
    id: 2,
    // target: '홍길순',
    criteria: '인수기준',
    details: '[ULA16364H01_1818_01] [암(유사암제외)항암호르몬약물(합)][전체누적][인수한도: 300 만원][초과: 300 만원]',
  },
  {
    id: 3,
    // target: '홍길순',
    criteria: '인수기준',
    details:
      '[ULA16364H01_1095_01] [카티(CAR-T)항암약물허가치료비(1회한)][전체누적][인수한도: 5000 만원][초과: 5,000 만원]',
  },
  {
    id: 4,
    // target: '홍길순',
    criteria: '인수기준',
    details:
      '[ULA16364H01_1035_01] [표적항암약물허가치료비(1회한)(합)][전체누적][인수한도: 7000 만원][초과: 2,000 만원]',
  },
  {
    id: 5,
    // target: '홍길순',
    criteria: '인수기준',
    details: '[ULA16364H01_663_01] [표적항암약물허가치료비(합)][전체누적][인수한도: 16000 만원][초과: 3,000 만원]',
  },
  {
    id: 6,
    // target: '홍길순',
    criteria: '인수기준',
    details: '[ULA16364H01_834_01] [항암양성자방사선치료비(1회한)][전체누적][인수한도: 3000 만원][초과: 3,000 만원]',
  },
  {
    id: 7,
    // target: '홍길순',
    criteria: '인수기준',
    details: '[ULA16364H01_2634_01] [항암양성자방사선치료비(합)][전체누적][인수한도: 4000 만원][초과: 2,000 만원]',
  },
  {
    id: 8,
    // target: '홍길순',
    criteria: '인수기준',
    details:
      '[ULA16364H01_2280_01] [항암중입자방사선치료(유사암포함)(1회한)][전체누적][인수한도: 5000 만원][초과: 5,000 만원]',
  },
  {
    id: 9,
    // target: '홍길순',
    criteria: '특인대상',
    details: '[표준하체산출이력001] [특별조건부 확인 필요] 표준하체 위험지수 산출의뢰 이력이 있습니다.',
  },
  {
    id: 10,
    // target: '홍길순',
    criteria: '참고사항',
    details: '[표준하체산출이력001] [특별조건부 확인 필요] 표준하체 위험지수 산출의뢰 이력이 있습니다.',
  },
  {
    id: 11,
    // target: '홍길순',
    criteria: '참고사항',
    details: '[시그니처여성올인원플랜00] [시그니처 여성 올인원플랜]',
  },
  {
    id: 12,
    // target: '홍길순',
    criteria: '참고사항',
    details:
      '[모집인제한_암담보비중안내_여성] ▶암담보제한◀ 전체 보장보험료 (119814원) 중 암담보보장보험료 (71507원)  비중 40% 초과되었습니다. ①암직접치료통원비(상급종합병원포함) 5만원 이상 또는 ②뇌출혈진단비 1500만원 이상 가입 필요합니다. (암/유의담보 리스트는 대내문서 참고)',
  },
  {
    id: 13,
    // target: '홍길순',
    criteria: '참고사항',
    details: '[테스트_13] 대인벌금:  0대물벌금:  0변호사:  0형사합의실손:  0형사합의실손_42일미만:  0',
  },
  {
    id: 14,
    // target: '홍길순',
    criteria: '청약완료불가(업계누적)',
    details:
      '[정액담보(항암약물치료)초과ICIS001] [업계가입금액 초과 수납불가][주소희] 고액항암치료비 2억7천만원 초과시(업계 정액보상담보 포함) 가입이 불가능합니다. [당사 : 37000만원 / 타사 : 0만원]',
  },
];

/** 인수제한 구분값에 따른 기본 텍스트 색상 매핑 */
const criteriaColorMap: Record<string, string> = {
  인수기준: 'var(--color-danger-50)',
  '청약완료불가\n(업계누적)': 'var(--color-information-50)',
};

/**
 * Ltpz022: 보험 설계의 지침 확인 결과(인수 지침 위배 사항)를 보여주는 팝업 컴포넌트입니다.
 */
const Ltpz022 = () => {
  type SelectedViolationCell = Pick<UnderwritingViolationRow, 'id' | 'criteria'>;

  /** 위배내용 텍스트 중 특정 키워드에 색상을 입히는 치환 함수 */
  const applyDetailsColor = (html: string): string => {
    return html
      .replace(/(\[상해사망[^\]]*\])/g, `<b style="color:var(--color-information-50)">$1</b>`)
      .replace(/(\[인수한도:[^\]]*\])/g, `<span style="color:var(--color-information-50)">$1</span>`)
      .replace(/(\[초과금액:[^\]]*\])/g, `<b style="color:var(--color-danger-50)">$1</b>`)
      .replace(/(가입금액 2\.5배 적용)/g, `<span style="color:var(--color-success-50)">$1</span>`)
      .replace(/(\d+억원)/g, `<b style="color:var(--color-danger-50)">$1</b>`)
      .replace(/(\[당사:[^\]]*\])/g, `<b style="color:var(--color-danger-50)">$1</b>`);
  };

  /** 현재 선택된 셀(위배 내역) 정보 상태 */
  const [selectedCell, setSelectedCell] = React.useState<SelectedViolationCell | null>(null);

  /** criteria 연속 항목 개수를 계산하여 rowSpan 매핑 생성 */
  const rowSpanMap = React.useMemo(() => {
    const spans: number[] = new Array(violationRowData.length).fill(1);
    let i = 0;
    while (i < violationRowData.length) {
      let count = 1;
      while (
        i + count < violationRowData.length &&
        violationRowData[i + count].criteria === violationRowData[i].criteria
      ) {
        count++;
      }
      spans[i] = count;
      for (let j = 1; j < count; j++) {
        spans[i + j] = 0;
      }
      i += count;
    }
    return spans;
  }, []);

  /** 셀 클릭 이벤트 핸들러: 상세 내용을 클릭하면 해당 행을 강조 표시 */
  const handleCellClicked = (row: UnderwritingViolationRow) => {
    if (selectedCell?.id === row.id) return;
    setSelectedCell({
      id: row.id,
      criteria: row.criteria,
    });
  };

  /** 탭 상태 관리 훅 */
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="md" className="h-[50rem]">
        {/* 헤더: 제목 및 화면ID */}
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              지침확인결과
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ022)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr] overflow-x-hidden">
          {/* 상단: 설계 기본 정보 표시 영역 */}
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant={'head'}>
              <FormRow>
                <FormCell
                  title={'설계번호'}
                  className="whitespace-nowrap "
                  tdClassName="grid grid-cols-[auto_1fr_auto] w-full"
                >
                  <Input aria-label="" width={'quoteNo'} value={'LA260706315118'} align="center" readOnly />
                  <Input aria-label="" width={220} value={'시그니처여성건강(4종/올인원플랜)'} readOnly />
                  <Input aria-label="" width={80} value={''} readOnly />
                </FormCell>
                <FormCell title={'플랜명'} className="whitespace-nowrap">
                  <Input aria-label="" value={'100세만기 월납 / 20년납'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          {/* 중간: 탭 영역 및 위배 내역 그리드 */}
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            removable={false}
            onRemove={handleRemove}
            visibleCount={5}
            hasTableBelow={true}
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => <span>{tab.label}</span>}
            // AI 자동해소 버튼 추가 (플래시 효과 적용)
            renderAfter={
              <Button variant={'contained'} size={'md'} effect={'flash'}>
                <AiIcon color={'#fff'} color2={'#fff'} />
                AI자동해소
              </Button>
            }
            renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (
              <Button
                variant="text"
                key={String(tab.value)}
                onClick={() => {
                  setActive(String(tab.value));
                  const idx = data.findIndex((t) => String(t.value) === String(tab.value));
                  if (idx !== -1) {
                    const page = Math.floor(idx / visibleCount);
                    setVisibleStart(page * visibleCount);
                  }
                }}
              ></Button>
            )}
            className="border-separate"
            contentClass="relative"
          >
            <div className="absolute h-full overflow-y-auto">
              <Table variant="default" className="border-0 !border-t-0">
                <colgroup>
                  <col style={{ width: '12rem' }} />
                  <col style={{ width: 'auto' }} />
                </colgroup>
                <TableHeader className="sticky top-0">
                  <TableRow>
                    <TableHead className="text-center">인수제한</TableHead>
                    <TableHead className="text-center">위배내용</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {violationRowData.map((row, index) => {
                    const span = rowSpanMap[index];
                    const isSelectedCriteria = selectedCell?.criteria === row.criteria;
                    const isSelectedDetails = selectedCell?.id === row.id;

                    const criteriaBg = isSelectedCriteria
                      ? '#FEF4D4'
                      : row.criteria.startsWith('청약완료불가') || row.criteria === '참고사항'
                        ? '#F4F4F4'
                        : '#FFFFFF';

                    const detailsBg = isSelectedDetails ? '#FEF4D4' : (index + 1) % 2 !== 0 ? '#FFFFFF' : '#F4F4F4';

                    const criteriaColor = criteriaColorMap[row.criteria];

                    return (
                      <TableRow key={row.id}>
                        {span > 0 && (
                          <TableCell
                            rowSpan={span}
                            className="text-center align-middle whitespace-pre-line border-r border-[#E5E5E5] p-2"
                            style={{ backgroundColor: criteriaBg }}
                          >
                            <div
                              className="leading-[1.3] text-[1.3rem] font-medium"
                              style={criteriaColor ? { color: criteriaColor } : undefined}
                              dangerouslySetInnerHTML={{ __html: String(row.criteria).replace(/\n/g, '<br/>') }}
                            />
                          </TableCell>
                        )}
                        <TableCell
                          className="cursor-pointer py-2 px-3 align-middle text-left whitespace-normal break-all leading-[1.3] text-[1.3rem]"
                          style={{ backgroundColor: detailsBg }}
                          onClick={() => handleCellClicked(row)}
                        >
                          <div dangerouslySetInnerHTML={{ __html: applyDetailsColor(String(row.details)) }} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabPager>
        </DialogSection>

        {/* 푸터: 추가 확인 버튼 및 닫기 */}
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                당사누적확인
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                타사누적확인
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                청약포인트
              </Button>
            </Grow>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                간편누적해소
              </Button>
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

export default Ltpz022;
