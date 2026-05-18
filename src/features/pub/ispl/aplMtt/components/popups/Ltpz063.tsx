/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { Gcol, Grow, Typo } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';

import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';

import '@/shared/lib/agGridPub';
import { Input } from '@uiux/Input';
import { ColDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { AgGridEmptyComponent } from '@/shared/components/agGridUtils/AgGridUtils';
import { BulletItem, BulletList, BulletListItem } from '@/shared/components/common/BulletList';
import { DialogBottomInfo } from '@/shared/components/common/DialogBottomInfo';

import { useTabs } from '@/shared/hooks/useTabs';

type LTPZ051Tab = { name: string; value: string; label: string };
const DATA_TABS: LTPZ051Tab[] = [
  { name: '승환계약정보 (0건)', value: 'value1', label: '승환계약정보 (0건)' },
  { name: '정상계약정보 (0건)', value: 'value2', label: '정상계약정보 (0건)' },
  { name: '추가계약정보 (0건)', value: 'value3', label: '추가계약정보 (0건)' },
];

type DummyDataType = {
  id: number;
  field1: string | number;
  field2: string | number;
  field3: string | number;
  field4: string | number;
  field5: string | number;
};

const DummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '보험회사명',
    field2: '한화손보',
    field3: '한화손보',
    field4: '메리츠화재',
    field5: '삼성화재',
  },
  {
    id: 2,
    field1: '상품명',
    field2: '한화 여성간편건강보험 4.0',
    field3: 'ㅇㅇ 간편보험 2601',
    field4: '(무)메리츠간편한355건강보험',
    field5: '삼성간편건강보험',
  },
  {
    id: 3,
    field1: '계약상태',
    field2: '신규',
    field3: '해지(2024-03-01)',
    field4: '실효(2024-03-01)',
    field5: '철회(2024-03-01)',
  },
  {
    id: 4,
    field1: '피보험자',
    field2: '홍길순',
    field3: '홍길순',
    field4: '홍길순',
    field5: '홍길순',
  },
  {
    id: 5,
    field1: '보험기간',
    field2: '2024-03-01 ~ 2026-03-31',
    field3: '2024-03-01 ~ 2026-03-31',
    field4: '2024-03-01 ~ 2026-03-31',
    field5: '2025-12-15 ~ 2026-03-15',
  },
  {
    id: 6,
    field1: '보험료',
    field2: '165,000원',
    field3: '165,000원',
    field4: '165,000원',
    field5: '165,000원',
  },
  {
    id: 7,
    field1: '납입주기/기간',
    field2: '월납/10년납',
    field3: '월납/10년납',
    field4: '월납/10년납',
    field5: '월납/10년납',
  },
  {
    id: 8,
    field1: '주요보장내용',
    field2: '질병후유장해 등',
    field3: '질병후유장해 등',
    field4: '유병자상해사망 등',
    field5: '유병자상해사망 등',
  },
  {
    id: 9,
    field1: '보험가입금액',
    field2: '3,000만원 등',
    field3: '3,000만원 등',
    field4: '3,000만원 등',
    field5: '3,000만원 등',
  },
  {
    id: 10,
    field1: '해약환급금',
    field2: '30,000,000원',
    field3: '30,000,000원',
    field4: '30,000,000원',
    field5: '',
  },
  {
    id: 11,
    field1: '예정이율',
    field2: '5.99%',
    field3: '5.99%',
    field4: '5.99%',
    field5: '5.99%',
  },
  {
    id: 12,
    field1: '보험목적',
    field2: '장기상해',
    field3: '장기상해',
    field4: '장기상해',
    field5: '장기상해',
  },
  {
    id: 13,
    field1: '면책사유 및 면책사항',
    field2: '계약자,피보험자,수익자의 고의사고 등',
    field3: '계약자,피보험자,수익자의 고의사고 등',
    field4: '계약자,피보험자,수익자의 고의사고 등',
    field5: '계약자,피보험자,수익자의 고의사고 등',
  },
  {
    id: 14,
    field1: '승환',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
  },
];
export const Ltpz063 = () => {
  const { tabs, active, setActive } = useTabs(DATA_TABS);

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '구분',
      width: 150,
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: 'text-center font-bold',
      field: 'field1',
      pinned: 'left',
    },
    {
      headerName: '당사신규',
      width: 180,
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: 'text-center',
      field: 'field2',
      pinned: 'left',
    },
    {
      headerName: '당사기존',
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: 'text-center',
      flex: 1,
      minWidth: 200,
      field: 'field3',
    },
    {
      headerName: '타사기존',
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: 'text-center',
      flex: 1,
      minWidth: 200,
      field: 'field4',
    },
    {
      headerName: '타사기존',
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: ({ data }) => (data?.field1 === '해약환급금' ? 'text-center editable-cell' : 'text-center'),
      flex: 1,
      minWidth: 200,
      field: 'field5',
      editable: ({ data }) => data?.field1 === '해약환급금',
    },
    {
      headerName: '타사기존',
      headerClass: '[&_.ag-header-cell-text]:font-bold',
      cellClass: ({ data }) => (data?.field1 === '해약환급금' ? 'text-center editable-cell' : 'text-center'),
      flex: 1,
      minWidth: 200,
      field: 'field5',
      editable: ({ data }) => data?.field1 === '해약환급금',
    },
  ];
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              비교안내확인서(타사용) 입력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ063)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable
              variant={'head'}
              lineTop={false}
              caption="정액담보점검목록 조회"
              cols={['w-[6rem]', 'w-[auto]', 'w-[8rem]', 'w-[auto]']}
            >
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input
                    aria-label="설계번호 입력"
                    value={'LA26022432174'}
                    onChange={() => {}}
                    variant="info"
                    readOnly
                  />
                  <Input
                    aria-label=""
                    value={'한화 더 건강한 한아름좋합보험2601'}
                    onChange={() => {}}
                    variant="info"
                    readOnly
                  />
                </FormCell>
                <FormCell title={'승환확인여부 대상'}>
                  <Input aria-label="" value={'계약자:홍길동'} onChange={() => {}} variant="info" readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
            <Grow>
              <Button id="btnRA" color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                검색
              </Button>
            </Grow>
          </Grow>
          <Gcol className="w-full" placement="ss" variant="box-warning">
            <Typo icon="warning" variant="body-sm">
              <b>주의사항</b>
            </Typo>
            <BulletList color={'warning'} size="sm">
              <BulletListItem>
                하단의 비교안내 정보는 고객님께 <b>정확한 설명 필요.</b> (고객에게 유리한 내용만 설명하는 행위 금지)
              </BulletListItem>
              <BulletListItem>
                항목별 공란은 고객님께 확인 후 <b>정확하게 기재</b>. (별도 설명자료 첨부 가능)
              </BulletListItem>
              <BulletListItem>
                휴대폰, 태블릿, 음성녹음 서명의 경우 전자서명 요청 전 모든 공란 기입 필수 (공란 존재 시 발송 불가) /
                문서서명은 모든 공란 기입 후 스캔
                <BulletItem color="warning" size="sm" type="ref">
                  {"보험회사 면책사유 및 면책사항은 '상품설명서 참조' 등의 단순 기재가 불가. (* 금감원 주의사항)"}
                </BulletItem>
                <BulletItem color="warning" size="sm" type="ref">
                  조회기준일에 따라 일부 기존계약은 계약상태가 다르게 표기될 수 있음
                </BulletItem>
              </BulletListItem>
            </BulletList>
          </Gcol>
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            hasTableBelow={true}
            getValue={(t) => t.value}
            renderTab={(t) => t.label ?? t.value}
            visibleCount={4}
            removable={false}
            renderAfter={
              <Grow gap={2} placement={'sc'}>
                <Typo>(2026-03-30 12:32 기준 한국신용정보원 계약정보 조회)</Typo>
                <Button color="gray" variant="outlined" onClick={() => {}}>
                  재조회
                </Button>
              </Grow>
            }
          >
            {active === 'value1' ? (
              <div className="ag-theme-alpine ag-border-t min-h-[13rem]">
                <AgGridReact<DummyDataType>
                  getRowId={(params) => String(params.data.id)}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  rowData={DummyData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                  }}
                  rowClassRules={{}}
                  domLayout="autoHeight"
                />
              </div>
            ) : active === 'value2' ? (
              <div></div>
            ) : active === 'value3' ? (
              <div></div>
            ) : null}
          </TabPager>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <BulletItem color="warning" size="sm" type="ref">
                06.6월 이전 비교안내할 타 보험회사 계약이 있거나, 고객님께서 추가로 안내받고 싶어하는 계약이 있는 경우
                작성해주세요.
              </BulletItem>
            </Grow>
            <Grow>
              <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => {}}>
                불러오기
              </Button>
              <Button variant={'outlined'} color={'gray'} size={'xl'} onClick={() => {}}>
                타사승환추가
              </Button>
              <Button variant={'contained'} size={'xl'}>
                저장
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

export default Ltpz063;
