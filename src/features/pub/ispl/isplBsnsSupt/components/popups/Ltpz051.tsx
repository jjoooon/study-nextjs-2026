'use client';

import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import type { PopupBaseProps } from '@/shared/types/uiTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

type LTPZ051Tab = { name: string; value: string; label: string };
const DATA_TABS: LTPZ051Tab[] = [
  { name: '직업정보(상해급수)변경대상(d건)', value: 'basic', label: '직업정보(상해급수)변경대상(d건)' },
  { name: '이륜차부담보 변경대상(d건)', value: 'detail', label: '이륜차부담보 변경대상(d건)' },
];

type DummyDataType = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    field01: '-',
    field02: '-',
    field03: 'LA20234472050000',
    field04: '1급',
    field05: '회사원',
    field06: '1급',
    field07: '회사원',
  },
  {
    id: 2,
    field01: '-',
    field02: '-',
    field03: 'LA20234472050001',
    field04: '1급',
    field05: '회사원',
    field06: '1급',
    field07: '회사원',
  },
];

export const Ltpz051 = ({ open, onOpenChange }: PopupBaseProps) => {
  // AgGrid Column
  const { tabs, active, setActive } = useTabs(DATA_TABS);
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '대상여부',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '증권번호',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '변경설계번호',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '변경전 직업정보',
      headerClass: 'ag-header-right-divider',
      children: [
        {
          headerName: '상해급수',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field04 ?? '')}</Typo>
          ),
        },
        {
          headerName: '직업',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field05 ?? '')}</Typo>
          ),
        },
      ],
    },
    {
      headerName: '변경후 직업정보',
      children: [
        {
          headerName: '상해급수',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field06 ?? '')}</Typo>
          ),
        },
        {
          headerName: '직업',
          flex: 1,
          cellClass: 'text-center px-0! whitespace-nowrap',
          cellRenderer: (params: ICellRendererParams<DummyDataType>) => (
            <Typo className="whitespace-nowrap">{String(params.data?.field07 ?? '')}</Typo>
          ),
        },
      ],
    },
  ];

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              고객 직업정보(상해급수)변경안내
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ051)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round">
            <FormTable variant={'head'} lineTop={false} caption="">
              <FormRow>
                <FormCell title={'상품명'}>
                  <Typo color="default" tag="span" variant="body-lg" weight="bold">
                    Text
                  </Typo>
                </FormCell>
                <FormCell title={'설계번호'}>
                  <Typo color="default" tag="span" variant="body-lg" weight="bold">
                    LA123123123123
                  </Typo>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Grid className="w-full grid-rows-[auto_auto_1fr]" gap={2.5}>
            <Gcol variant={'box-info'}>
              <Typo variant="body-sm" icon={'info'}>
                고객 직업정보(상해급수) 또는 이륜차부담보 가입여부가 불일치 할 경우 신계약 체결이 불가능합니다. 해당
                신계약 청약완료 이전에 기계약의 직업변경 또는 이윤차부담보 변경 완료 필요. 또한, 신계약 청약서 발행
                이전에 배서(청약중 이후) 진행 필요
              </Typo>
            </Gcol>
            <Gcol className="w-full" placement="ss" variant="box-warning">
              <Typo variant="body-sm">
                <Checkbox>
                  계약변경 설계 청약서 발급 및 확인서명을 조건으로 청약 진행 (단, 계약변경 미완료시{' '}
                  <Typo weight="bold" color="primary">
                    신계약 청약완료불가
                  </Typo>
                  )
                </Checkbox>
              </Typo>
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
            >
              <Grid className="grid-rows-[1fr_auto] h-full">
                {active === 'basic' ? (
                  <Grid className="w-full grid-rows-[auto_auto_1fr] h-full" gap={4}>
                    <FormTable
                      caption="직업 상세"
                      cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}
                      lineTop={false}
                    >
                      <FormRow>
                        <FormCell title={'고객명'}>김한화</FormCell>
                        <FormCell title={'직업정보'}>1급/회사원</FormCell>
                      </FormRow>
                    </FormTable>
                    <Gcol>
                      <Grow className="w-full" gap={1} placement="se">
                        <Typo variant="body-md" color="default">
                          직업정보(상해급수) 상이 계약
                        </Typo>
                        <Typo variant="body-md" weight={'bold'} color="primary">
                          99건
                        </Typo>
                      </Grow>
                    </Gcol>
                    <div className="ag-theme-alpine min-h-[18.4rem]">
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        domLayout="normal"
                      />
                    </div>
                  </Grid>
                ) : (
                  <Grid className="w-full grid-rows-[auto_1fr] h-full" gap={4}>
                    <FormTable
                      caption="직업 상세"
                      cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}
                      lineTop={false}
                    >
                      <FormRow>
                        <FormCell title={'고객명'}>김한화2</FormCell>
                        <FormCell title={'직업정보'}>1급/회사원2</FormCell>
                      </FormRow>
                    </FormTable>
                    <Gcol>
                      <Grow className="w-full" gap={1} placement="se">
                        <Typo variant="body-md" color="default">
                          이륜차부담보 가입 사이 계약
                        </Typo>
                        <Typo variant="body-md" weight={'bold'} color="primary">
                          99건
                        </Typo>
                      </Grow>
                      <div className="ag-theme-alpine min-h-[18.4rem]">
                        <AgGridReact<DummyDataType>
                          getRowId={(params) => String(params.data.id)}
                          rowData={rowData}
                          columnDefs={columnDefs}
                          noRowsOverlayComponent={AgGridEmptyComponent}
                          defaultColDef={{
                            sortable: true,
                            resizable: true,
                          }}
                          domLayout="normal"
                        />
                      </div>
                    </Gcol>
                  </Grid>
                )}
                <Gcol className="w-full mt-[2rem]" placement="ss" variant="box-info">
                  <BulletList>
                    <BulletListItem size="sm">
                      신규설계의 직업정보가 정확할 경우: 기계약 직업 변경배서 진행 (변경설계가 청약중 이후이고 변경후
                      직업정보(상해급수)가 일치하여야 신계약 청약서 발행가능함)
                    </BulletListItem>
                    <BulletListItem size="sm">
                      기계약의 직업정보가 정확할 경우: 고객정보화면의 직업정보 변경 후 피보험자를 다시 불러온 후 신계약
                      설계 진행
                    </BulletListItem>
                    <BulletListItem size="sm">
                      직업정보는 현재기준 [2026.01.01] 기준으로 표기되고 있습니다. (구 직업코드의 경우 현재 기준으로
                      매핑한 결과로 비교함)
                    </BulletListItem>
                    <BulletListItem size="sm">
                      변경대상의 경우 계약변경설계화면으로 이동하여 진행바랍니다. (계약변경설계이동 클릭 시
                      변경설계화면으로 이동)
                    </BulletListItem>
                    <BulletListItem size="sm">
                      상해급수가 동일하더라도 고객님의 정확한 직업정보의 관리를 위하여 재확인 바랍니다.
                    </BulletListItem>
                    <BulletListItem size="sm">
                      관련문서: [대내-1507-1552] 직업정보(상해급수) 일치 관련 신계약 프로세스 변경통보, 장기계약관리파트
                    </BulletListItem>
                  </BulletList>
                </Gcol>
              </Grid>
            </TabPager>
          </Grid>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                확인
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
