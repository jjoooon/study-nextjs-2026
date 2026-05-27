/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
//* 2026-05-27 *
import { AgGridEmptyComponent, useAgGridInfiniteAppend } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import {
  QuestionRadioCard,
  QuestionRadioCardHeader,
  QuestionRadioCardHeaderTitle,
  QuestionRadioCardContents,
} from '@common/QuestionRadioCard';
import { TableMore } from '@common/TablePagination';
import { TooltipQ } from '@common/TooltipQ';
import { CheckIcon, InfoBoxInfoIcon } from '@icons';
import { Badge } from '@uiux/Badge';
import { Button } from '@uiux/Button';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { Input } from '@uiux/Input';

import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/uiux/Table';
import { useFormFields } from '@/shared/hooks/useFormFields';

type DummyDataType = {
  id: number;
  isAuto?: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isAuto: true,
    field01: '대장·직장용종',
    field02: '2026-01-01 ~ 2026-01-15',
    field03:
      '수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)수술/시술(봉합술)',
    field04: '한화내과',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 2,
    isAuto: false,
    field01: '대장·직장용종',
    field02: '2026-01-01 ~ 2026-01-15',
    field03: '수술/시술(봉합술)',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 3,
    isAuto: false,
    field01: '대장·직장용종',
    field02: '2026-01-01 ~ 2026-01-15',
    field03: '수술/시술(봉합술)',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 4,
    isAuto: false,
    field01: '대장·직장용종',
    field02: '2026-01-01 ~ 2026-01-15',
    field03: '수술/시술(봉합술)',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 5,
    isAuto: false,
    field01: '대장·직장용종',
    field02: '2026-01-01 ~ 2026-01-15',
    field03: '수술/시술(봉합술)',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 6,
    isAuto: false,
    field01: '대장·직장용종',
    field02: '2026-01-01 ~ 2026-01-15',
    field03: '수술/시술(봉합술)',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 7,
    isAuto: false,
    field01: '대장·직장용종',
    field02: '2026-01-01 ~ 2026-01-15',
    field03: '수술/시술(봉합술)',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 8,
    isAuto: false,
    field01: '대장·직장용종',
    field02: '2026-01-01 ~ 2026-01-15',
    field03: '수술/시술(봉합술)',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
  {
    id: 9,
    isAuto: false,
    field01: '대장·직장용종',
    field02: '2026-01-01 ~ 2026-01-15',
    field03: '수술/시술(봉합술)',
    field04: '한화병원',
    field05: '완치',
    field06: '없음',
  },
];

const Ltpz003 = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '',
    type09: '',
    type10: '',
    type11: '',
    type12: '',
    type13: '',
    type14: '',
    type15: '',
  });

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: 'NO',
      width: 38,
      field: 'id',
      cellClass: 'text-center',
    },
    {
      headerName: '병명',
      width: 160,
      field: 'field01',
      cellClass: 'text-left',
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        const data = params.data as DummyDataType | undefined;
        if (!data) return null;
        const { isAuto, field01 } = data;
        return (
          <span className="flex items-center gap-1">
            {field01}
            {isAuto && (
              <Badge color="green" size="md">
                자동완성
              </Badge>
            )}
          </span>
        );
      },
    },
    {
      headerName: '치료기간',
      width: 160,
      field: 'field02',
      cellClass: 'text-center',
    },
    {
      headerName: '치료내용',
      flex: 1,
      field: 'field03',
      cellClass: 'text-left leading-normal!',
      wrapText: true,
      autoHeight: true,
    },
    {
      headerName: '치료병원',
      width: 89,
      field: 'field04',
      cellClass: 'text-center',
    },
    {
      headerName: '완치여부',
      width: 86,
      field: 'field05',
      cellClass: 'text-center',
    },
    {
      headerName: '재발여부',
      width: 86,
      field: 'field06',
      cellClass: 'text-center',
    },
  ];

  const pageSize = 4;
  const { loadedCount, totalCount, handleLoadAll, handleLoadNext, setLoadedCount } = useAgGridInfiniteAppend({
    allRows: DummyData,
    pageSize,
  });

  const [periodType, setPeriodType] = useState<string>('');

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              알릴사항 미리보기
            </Typo>
          </DialogTitle>
        </DialogHeader>
        {/* M1. 전체적으로 수정 */}
        <DialogSection className="grid-rows-[1fr]">
          <Gcol placement="ss" gap={1} className="w-full">
            {/* 2026-05-27 */}
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="1">
                  최근 3개월 이내에 의사로부터 진찰 또는 검사(건강검진 포함)를 통하여 다음과 같은 의료행위를 받은 사실이
                  있습니까?
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Grid className="w-full grid-cols-4 gap-[0.8rem] px-[1rem]">
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    질병확정진단
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    질병의심소견
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    치료
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    입원
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    수술(제왕절개포함)
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    투약
                  </Checkbox>
                </Grid>
                <Gcol className="w-full" placement="ss" variant="box-detail">
                  <Typo icon="detail" variant="body-sm">
                    <b>질병의심소견</b>이란 의사가 진단서나 소견서 또는 진료의뢰서 등을 포함하여 서면(전자문서 포함)으로
                    교부한 경우를 말합니다.
                  </Typo>
                  <Typo icon="detail" variant="body-sm">
                    <b>투약이란</b> 의사가 환자에게 약을 처방하는 행위를 말하는 것으로 실제로 약을 구입하지 않았어도
                    기재해야 합니다.
                  </Typo>
                </Gcol>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="2">
                  최근 3개월 이내에 마약을 사용하거나 혈압강하제, 신경안정제, 수면제, 각성제(흥분제), 진통제 등 약물을
                  상시 복용한 사실이 있습니까?
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Gcol className="w-full" placement="ss" variant="box-detail">
                  <Typo icon="detail" variant="body-sm">
                    <b>혈압강하제</b>란 혈압을 내리게 하는 의약품을 말하며, 각성제란 신경계를 흥분시켜 잠이 오는 것을
                    억제하는 의약품을 말합니다.
                  </Typo>
                </Gcol>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="3">
                  최근 1년 이내에 의사로부터 진찰 또는 검사를 받고, 이를 통하여 추가검사(재검사)를 받은 사실이 있습니까?
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Gcol className="w-full" placement="ss" variant="box-detail">
                  <Typo icon="detail" variant="body-sm">
                    <b>추가검사(재검사)</b>란 검사 결과 이상 소견이 확인되어 보다 정확한 진단을 위해 시행한 검사를
                    의미하며, 병증에 대한 치료 필요 없이 유지되는 상태에서 시행하는 정기검사 또는 추적관찰은 포함하지
                    않습니다.
                  </Typo>
                </Gcol>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="4">
                  최근 5년 이내에 의사로부터 진찰 또는 검사를 통하여 다음과 같은 의료행위를 받은 사실이 있습니까?
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Grid className="w-full grid-cols-4 gap-[0.8rem] px-[1rem]">
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    입원
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    수술(제왕제갤포함)
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    계속하여 7일이상 치료
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    계속하여 30일이상 투약
                  </Checkbox>
                </Grid>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="5">
                  최근 5년 이내에 아래의 질병으로 의사로부터 진찰 또는 검사를 통하여 다음과 같은 의료행위를 받은 사실이
                  있습니까?
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Grid className="w-full grid-cols-4 gap-[0.8rem] px-[1rem]">
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    암
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    백혈병
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    고혈압
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    협심증
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    심근경색
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    심장판막
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    간경화증
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    뇌졸중증(뇌출혈, 뇌경색)
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    당뇨병
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    에이즈(AIDS) 및 HIV보균
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    직장 또는 항문 관련 질환(치질, 치루(누공), 치열(찢어짐))
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    항문 농양(고름집)
                  </Checkbox>
                  <Checkbox
                    color="primary"
                    errorMsg="선택은 필수입니다."
                    errorPs="bl"
                    onCheckedChange={() => {}}
                    size="lg"
                    variant="default"
                    disabled
                  >
                    직장또는
                  </Checkbox>
                </Grid>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            {/* 2026-05-27 */}
            <QuestionRadioCard>
              <QuestionRadioCardHeader bg={'#EFF8FF'}>
                <QuestionRadioCardHeaderTitle icon={<InfoBoxInfoIcon />} className={'items-center'}>
                  상기 1~5번 질문에 대한 상세내용 기재해주세요.
                </QuestionRadioCardHeaderTitle>
                <Grow gap={2.5}>
                  <Typo variant={'body-sm'} color="information" weight={'bold'}>
                    입력된 질병 6건
                  </Typo>
                  <Grow gap={1}>
                    <Button color="gray" onClick={() => {}} size="lg" variant="outlined">
                      질병목록 일괄보기
                    </Button>
                    <Button color="primary" onClick={() => {}} size="lg" variant="outlined">
                      질병 입력/수정
                    </Button>
                    <TooltipQ>
                      <Typo weight={'bold'}>질병검색 및 입력화면</Typo>
                      <BulletList position="col">
                        <BulletListItem type="dotBig">질병 입력(수정) 가능</BulletListItem>
                        <BulletListItem type="dotBig">최근 1개월 이내 입력한 질병정보 가져오기 가능</BulletListItem>
                        <BulletListItem type="dotBig">[공통] 질병별 심사기준, 필요서류 확인가능</BulletListItem>
                        <BulletListItem type="dotBig">[SI]경증질환 리스트 확인가능</BulletListItem>
                      </BulletList>
                    </TooltipQ>
                  </Grow>
                </Grow>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Grid className="w-full">
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      // rowData={rowData}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      className="text-center"
                      domLayout="autoHeight"
                      rowData={DummyData.slice(0, loadedCount)}
                    />
                  </div>
                  <TableMore
                    loadedCount={loadedCount}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onLoadAll={handleLoadAll}
                    onLoadNext={handleLoadNext}
                    onLoadReset={() => setLoadedCount(pageSize)}
                    only={'all'}
                    isNext={false}
                  />
                </Grid>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="6">
                  청약서 상의 피보험자 직업을 확인했는지 여부
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <FormTable
                  caption="FormTable 예시"
                  className=""
                  cols={['w-[5.3rem]', 'w-[auto]', 'w-[5.3rem]', 'w-[auto]', 'w-[5.3rem]', 'w-[auto]']}
                  lineTop
                  variant="none"
                >
                  <FormRow>
                    <FormCell
                      className=""
                      title={<b className="text-[#000]">직업정보</b>}
                      variant="default"
                      colSpan={5}
                    >
                      <Input onChange={() => {}} width={100} value={'23511'} readOnly />
                      <Input onChange={() => {}} width={'100%'} value={'전기공학 개발자 및 연구원'} readOnly />
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell className="" title={<b className="text-[#000]">직장명</b>} variant="default">
                      <Input onChange={() => {}} width={'100%'} value={'전기공학 개발자 및 연구원'} readOnly />
                    </FormCell>
                    <FormCell className="" title={<b className="text-[#000]">직장명</b>} variant="default">
                      <Input onChange={() => {}} width={'100%'} value={'전기공학 개발자 및 연구원'} readOnly />
                    </FormCell>
                    <FormCell className="" title={<b className="text-[#000]">직장명</b>} variant="default">
                      <Input onChange={() => {}} width={'100%'} value={'전기공학 개발자 및 연구원'} readOnly />
                    </FormCell>
                  </FormRow>
                </FormTable>
                <Gcol className="w-full" placement="ss" variant="box-detail">
                  <Typo icon="detail" variant="body-sm">
                    보험계약 체결 당시 <b>직업*</b> 또는 <b>직무*</b>를 사실대로 알리지 않거나 보험계약 체결 후{' '}
                    <b>직업*</b> 또는 <b>직무*</b>가 <b>변경*</b>된 사실(예:사무관리 ↔ 현장관리)을 지체없이 회사에
                    알리지 않은 경우 계약 해지 등 알릴 의무 위반에 따른 <b>불이익*</b>이 발생할 수 있습니다.{' '}
                    <b>(*보험계약자가 직접 기재하여야 하는 문구)</b>
                  </Typo>
                </Gcol>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle className="items-center" badgeLabel="7">
                  현재 운전을 하고 있습니까? 운전하고 계신다면 다음 중 어느 것입니까? (해당하는 것에{' '}
                  <CheckIcon color="#FF5C2E" />표 하세요.)
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Table variant="default">
                  <TableHeader>
                    <TableRow className="">
                      <TableHead className="w-[6rem]">차종</TableHead>
                      <TableHead className="w-[auto] min-w-[26rem] [&>div]:justify-center">
                        <Checkbox disabled>승합차</Checkbox>
                      </TableHead>
                      <TableHead className="w-[auto] min-w-[26rem] [&>div]:justify-center">
                        <Checkbox disabled>화물차</Checkbox>
                      </TableHead>
                      <TableHead className="w-[auto] min-w-[26rem] [&>div]:justify-center">
                        <Checkbox disabled>이륜자동차</Checkbox>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableHead>용도</TableHead>
                      <TableCell>
                        <Grow gap={'3'}>
                          <Checkbox disabled>자가용</Checkbox>
                          <Checkbox disabled>영업용</Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell>
                        <Grow gap={'3'}>
                          <Checkbox disabled>자가용</Checkbox>
                          <Checkbox disabled>영업용</Checkbox>
                        </Grow>
                      </TableCell>
                      <TableCell>
                        <Grow gap={'3'}>
                          <Checkbox disabled>자가용</Checkbox>
                          <Checkbox disabled>영업용</Checkbox>
                        </Grow>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableHead>그외</TableHead>
                      <TableCell colSpan={3}>
                        <Grid className="grid-flow-col grid-cols-3">
                          <Checkbox disabled>건설기계</Checkbox>
                          <Checkbox disabled>농기계</Checkbox>
                          <Grow className="flex justify-start">
                            <Checkbox disabled>기타운전차종</Checkbox>
                            <Input
                              onChange={(e) => setFormField('type01', e.target.value)}
                              size="lg"
                              value={form.type01}
                              variant="default"
                              width={140}
                              placeholder="내용을 입력하세요"
                              readOnly
                            />
                          </Grow>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Gcol className="w-full" placement="ss" variant="box-detail">
                  <Typo icon="detail" variant="body-sm">
                    기타에 해당하는 경우 차종을 구체적으로 기재하고, 둘 이상의 차량을 운전하거나 하나의 차량을 둘 이상의
                    목적으로 사용하는 경우 해당되는 사항을 모두 기재하십시오.
                  </Typo>
                </Gcol>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="8">
                  원동기장치 자전거(전동킥보드, 전동이륜평행차, 전동기의 동력만으로 움직일 수 있는 자전거 등 개인형
                  이동장치를 포함)를 사용하십니까? (다만, 전동휠체어, 의료용 스쿠터 등 보행보조용 의자차는 제외합니다.)
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Gcol className="w-full" placement="ss" variant="box-detail">
                  <Typo icon="detail" variant="body-sm">
                    계속적으로 사용(직업, 직무 또는 동호회 활동과 출퇴근용도 등으로 주로 사용하는 경우에 한함)하는 경우
                    기재
                  </Typo>
                  <Typo icon="detail" variant="body-sm">
                    본 질문에 ‘아니오’로 기재하고 보험계약 체결 후 <b>이륜자동차*</b> 또는 전동킥보드 등{' '}
                    <b>개인형이동장치*</b>를 포함한 <b>원동기장치 자전거*</b>를 사용하게 된 사실을 지체없이 회사에
                    알리지 않은 경우 계약해지 등 알릴 의무 위반에 따른 <b>불이익*</b>이 발생할 수 있습니다.{' '}
                    <b>(*보험계약자가 직접 기재하여야 하는 문구)</b>
                  </Typo>
                </Gcol>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="9">
                  최근 1년 이내에 다음과 같은 취미를 자주 반복적으로 하고 있거나 관련 자격증을 가지고 있습니까?
                  (해당하는 것에 <CheckIcon color="#FF5C2E" />표 하세요.)
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Grid className="w-full grid-cols-4 gap-[0.8rem] px-[1rem]">
                  {[
                    '스쿠버다이바이',
                    '행글라이딩, 패러글라이딩',
                    '스카이다이빙',
                    '수상스키',
                    '자동차, 오토바이 경주',
                    '번지점프',
                    '빙벽, 암벽등반',
                    '제트스키',
                    '래프팅',
                  ].map((label) => (
                    <Checkbox
                      key={label}
                      color="primary"
                      errorMsg="선택은 필수입니다."
                      errorPs="bl"
                      onCheckedChange={() => {}}
                      size="lg"
                      variant="default"
                      disabled
                    >
                      {label}
                    </Checkbox>
                  ))}
                </Grid>
                <Grid className="w-full gap-[0.8rem] px-[1rem] flex items-center flex-row">
                  <RadioGroup
                    className="gap-2 flex w-[11rem]"
                    errorMsg="하나를 선택해주세요."
                    errorPs="bl"
                    value={periodType}
                    onValueChange={setPeriodType}
                  >
                    {[
                      { value: 'option1', label: '년간' },
                      { value: 'option2', label: '월간' },
                    ].map((item) => (
                      <RadioGroupItem key={item.value} value={item.value} disabled>
                        {item.label}
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                  <CheckboxGroup color="primary" size="lg" variant="default" className="gap-3">
                    <Grow className="flex justify-start ">
                      <CheckboxGroupItem value="c" disabled>
                        횟수
                      </CheckboxGroupItem>
                      <Input
                        onChange={(e) => setFormField('type02', e.target.value)}
                        size="lg"
                        value={form.type02}
                        variant="default"
                        width={60}
                        readOnly
                      />
                    </Grow>
                    <Grow className="flex justify-start">
                      <CheckboxGroupItem value="d" disabled>
                        자격증명칭
                      </CheckboxGroupItem>
                      <Input
                        onChange={(e) => setFormField('type03', e.target.value)}
                        size="lg"
                        value={form.type03}
                        variant="default"
                        width={312}
                        readOnly
                      />
                    </Grow>
                  </CheckboxGroup>
                </Grid>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="10">
                  부업 또는 겸업, 계절적으로 종사하는 업무가 있습니까? (“예”인 경우 업무명을 작성하세요.)
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Grow gap={4} placement="sc" className="px-2.5">
                  <Typo variant="body-lg" weight={'bold'}>
                    “예”인 경우 업무명{' '}
                  </Typo>
                  <Input width={207} placeholder="업무명을 입력하세요" readOnly></Input>
                </Grow>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="11">
                  향후 3개월 이내에 다음과 같은 해외위험지역으로 출국할 예정이 있습니까? [전쟁지역, 미개척지(열대,
                  한대), 등반산악지대]
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Grid className="w-full gap-3 px-2.5">
                  <CheckboxGroup className="grid grid-cols-[1fr_1fr] gap-x-[1.2rem] gap-y-[0.8rem] [&_label]:flex [&_label]:items-center [&_label]:gap-1 w-full [&_label]:w-full">
                    <CheckboxGroupItem value="a" disabled>
                      <Typo variant="body-md" className="w-[9rem]">
                        해외출국기간
                      </Typo>
                      <Input
                        onChange={(e) => setFormField('type04', e.target.value)}
                        size="lg"
                        value={form.type04}
                        variant="default"
                        width="100%"
                        readOnly
                      />
                    </CheckboxGroupItem>
                    <CheckboxGroupItem value="b" disabled>
                      <Typo variant="body-md" className="w-[5rem]">
                        지역
                      </Typo>
                      <Input
                        onChange={(e) => setFormField('type05', e.target.value)}
                        size="lg"
                        value={form.type05}
                        variant="default"
                        width="100%"
                        readOnly
                      />
                    </CheckboxGroupItem>
                    <CheckboxGroupItem value="c" disabled>
                      <Typo variant="body-md" className="w-[9rem]">
                        출국목적
                      </Typo>
                      <Input
                        onChange={(e) => setFormField('type06', e.target.value)}
                        size="lg"
                        value={form.type06}
                        variant="default"
                        width="100%"
                        readOnly
                      />
                    </CheckboxGroupItem>
                  </CheckboxGroup>
                </Grid>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="12">음주여부</QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Grid className="w-full grid-cols-[1fr_1fr] px-2.5">
                  <Grow className="justify-start" gap={2}>
                    <Typo variant="body-lg" weight={'bold'}>
                      음주횟수
                    </Typo>
                    <Grow>
                      <Typo variant="body-md">주</Typo>
                      <Input
                        onChange={(e) => setFormField('type07', e.target.value)}
                        size="lg"
                        value={form.type07}
                        variant="default"
                        width={60}
                        readOnly
                      />
                      <Typo variant="body-md">회</Typo>
                    </Grow>
                  </Grow>
                  <Grow className="justify-start" gap={2}>
                    <Typo variant="body-lg" weight={'bold'}>
                      음주량
                    </Typo>
                    <Grow>
                      <Typo variant="body-md">소주기준</Typo>
                      <Input
                        onChange={(e) => setFormField('type08', e.target.value)}
                        size="lg"
                        value={form.type08}
                        variant="default"
                        width={60}
                        readOnly
                      />
                      <Typo variant="body-md">병</Typo>
                    </Grow>
                  </Grow>
                </Grid>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="13">
                  흡연여부, 1일 흡연량과 흡연기간은?
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Grid className="w-full grid-cols-[1fr_1fr] px-2.5">
                  <Grow className="justify-start" gap={2}>
                    <Typo variant="body-lg" weight={'bold'}>
                      흡연량
                    </Typo>
                    <Grow>
                      <Typo variant="body-md">주</Typo>
                      <Input
                        onChange={(e) => setFormField('type09', e.target.value)}
                        size="lg"
                        value={form.type09}
                        variant="default"
                        width={60}
                        readOnly
                      />
                      <Typo variant="body-md">회</Typo>
                    </Grow>
                  </Grow>
                  <Grow className="justify-start" gap={2}>
                    <Typo variant="body-lg" weight={'bold'}>
                      흡연기간
                    </Typo>
                    <Grow>
                      <Input
                        onChange={(e) => setFormField('type10', e.target.value)}
                        size="lg"
                        value={form.type10}
                        variant="default"
                        width={60}
                        readOnly
                      />
                      <Typo variant="body-md">년 동안 흡연</Typo>
                    </Grow>
                  </Grow>
                </Grid>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="14">
                  다른 보험회사(우체국보험 및 각종 공제계약 판매사 포함)에 생명보험, 손해보험, 제3보험 또는 각종
                  공제계약을 가입하고 있습니까? (단, 단체보험 제외)
                </QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'예'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Grid className="w-full gap-3 px-2.5">
                  <CheckboxGroup className="grid grid-cols-[1fr_1fr_1fr] gap-3 [&_label]:flex [&_label]:items-center [&_label]:gap-1 w-full [&_label]:w-full">
                    <CheckboxGroupItem value="a" disabled>
                      <Typo variant="body-md" className="w-[4.2rem]">
                        회사수
                      </Typo>
                      <Input
                        onChange={(e) => setFormField('type11', e.target.value)}
                        size="lg"
                        value={form.type11}
                        variant="default"
                        width="100%"
                        readOnly
                      />
                    </CheckboxGroupItem>
                    <CheckboxGroupItem value="b" disabled>
                      <Typo variant="body-md" className="w-[2.8rem]">
                        건수
                      </Typo>
                      <Input
                        onChange={(e) => setFormField('type12', e.target.value)}
                        size="lg"
                        value={form.type12}
                        variant="default"
                        width="100%"
                        readOnly
                      />
                    </CheckboxGroupItem>
                    <CheckboxGroupItem value="c" disabled>
                      <Typo variant="body-md" className="w-[6rem]">
                        월보험료
                      </Typo>
                      <Input
                        onChange={(e) => setFormField('type13', e.target.value)}
                        size="lg"
                        value={form.type13}
                        variant="default"
                        width="100%"
                        readOnly
                      />
                    </CheckboxGroupItem>
                  </CheckboxGroup>
                </Grid>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
            <QuestionRadioCard>
              <QuestionRadioCardHeader>
                <QuestionRadioCardHeaderTitle badgeLabel="15">현재 키와 몸무게</QuestionRadioCardHeaderTitle>
                <RadioGroup className={'gap-[1.2rem] w-[11rem]'} width="auto" value={'아니오'}>
                  {[
                    { value: '예', label: '예' },
                    { value: '아니오', label: '아니오' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value} disabled>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </QuestionRadioCardHeader>
              <QuestionRadioCardContents>
                <Grid className="w-full grid-cols-[1fr_1fr] px-2.5">
                  <Grow className="justify-start" gap={2}>
                    <Typo variant="body-lg" weight={'bold'}>
                      키
                    </Typo>
                    <Grow>
                      <Input
                        onChange={(e) => setFormField('type14', e.target.value)}
                        size="lg"
                        value={form.type14}
                        variant="default"
                        width={60}
                        readOnly
                      />
                      <Typo variant="body-md">cm</Typo>
                    </Grow>
                  </Grow>
                  <Grow className="justify-start" gap={2}>
                    <Typo variant="body-lg" weight={'bold'}>
                      몸무게
                    </Typo>
                    <Grow>
                      <Input
                        onChange={(e) => setFormField('type15', e.target.value)}
                        size="lg"
                        value={form.type15}
                        variant="default"
                        width={60}
                        readOnly
                      />
                      <Typo variant="body-md">kg</Typo>
                    </Grow>
                  </Grow>
                </Grid>
              </QuestionRadioCardContents>
            </QuestionRadioCard>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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

export default Ltpz003;
