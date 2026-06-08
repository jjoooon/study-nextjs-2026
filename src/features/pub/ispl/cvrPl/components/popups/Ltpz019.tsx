/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { ResetIcon, SearchIcon } from '@icons';
import { Badge } from '@uiux/Badge';
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
import { Input } from '@uiux/Input';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useState } from 'react';
import * as React from 'react';

import { useTabs } from '@/shared/hooks/useTabs';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  field1: string | number;
  field2: string | number;
};
type DummyDataType2 = {
  id: number;
  field1: string | number;
  field2: string | number;
};
type Ltpz032TabType = {
  name: string;
  value: string;
  label: string;
};

type DummyDataType3 = {
  id: number;
  field1: string | number;
};

const dummyData3: DummyDataType3[] = [
  {
    id: 1,
    field1: '올인원플랜(15~40세)올인원플랜(15~40세)올인원플랜(15~40세)올인원플랜(15~40세)올인원플랜(15~40세)',
  },
  {
    id: 2,
    field1: '비대면진단심사플랜(15~40세)',
  },
  {
    id: 3,
    field1: '비대면진단심사플랜(15~40세)',
  },
  {
    id: 4,
    field1: '올인원플랜(15~40세)',
  },
  {
    id: 5,
    field1: '올인원플랜(15~40세)',
  },
  {
    id: 6,
    field1: '올인원플랜(15~40세)',
  },
  {
    id: 7,
    field1: '올인원플랜(15~40세)',
  },
  {
    id: 8,
    field1: '올인원플랜(15~40세)',
  },
];

const dummyData2: DummyDataType2[] = [
  {
    id: 1,
    field1: '1종',
    field2:
      '납입면제 강화형, 기본형(할증운영상품)납입면제 강화형, 기본형(할증운영상품)납입면제 강화형, 기본형(할증운영상품)',
  },
  {
    id: 2,
    field1: '2종',
    field2: '납입면제 강화형, 기본형(할증운영상품)',
  },
  {
    id: 3,
    field1: '3종',
    field2: '납입면제 강화형, 기본형(할증운영상품)',
  },
  {
    id: 4,
    field1: '4종',
    field2: '납입면제 강화형, 기본형(할증운영상품)',
  },
  {
    id: 5,
    field1: '4종',
    field2: '납입면제 강화형, 기본형(할증운영상품)',
  },
  {
    id: 6,
    field1: '4종',
    field2: '납입면제 강화형, 기본형(할증운영상품)',
  },
  {
    id: 7,
    field1: '4종',
    field2: '납입면제 강화형, 기본형(할증운영상품)',
  },
  {
    id: 8,
    field1: '4종',
    field2: '납입면제 강화형, 기본형(할증운영상품)',
  },
  {
    id: 9,
    field1: '4종',
    field2: '납입면제 강화형, 기본형(할증운영상품)',
  },
];

const dummyData: DummyDataType[] = [
  {
    id: 1,
    field1: '종합건강22',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 2,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 3,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 4,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 5,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 6,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 7,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 8,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 9,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 10,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 11,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 12,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 13,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 14,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
  {
    id: 20,
    field1: '종합건강',
    field2: '{LA1312312}한화 311 간편건강보험(연만기 경신쳥)',
  },
];

const DATA_TABS: Ltpz032TabType[] = [
  {
    name: '회사플랜',
    value: 'tab1',
    label: '회사플랜(6)',
  },
  {
    name: '기관플랜',
    value: 'tab2',
    label: '기관플랜(6)',
  },
  {
    name: '나만의플랜',
    value: 'tab3',
    label: '나만의플랜(6)',
  },
];

const Ltpz019 = () => {
  const [showProductNameTooltip, setShowProductNameTooltip] = useState(false);
  const [coverageName, setCoverageName] = useState('');

  const productNameHeader = useCallback(() => {
    const handleTooltipCheck = (checked: boolean | 'indeterminate') => {
      setShowProductNameTooltip(!!checked);
    };
    return (
      <Grow className="w-full px-[0.6rem]" placement={'cc'} gap={3}>
        <Grow>
          <Input
            aria-label="상품명"
            placeholder="상품명 입력"
            type="text"
            width={'full'}
            size={'sm'}
            clear={true}
            value={coverageName}
            onChange={(e) => setCoverageName(e.target.value)}
          />
          <Button aria-label="상품명 검색" variant={'outlined'} color={'gray-light'} only={'icon'} size={'md'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
          <Button
            aria-label="상품명 초기화"
            variant={'outlined'}
            color={'gray-light'}
            only={'icon'}
            size={'md'}
            onClick={() => setCoverageName('')}
          >
            <ResetIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grow>
        <Grow placement={'sc'}>
          <Checkbox size={'md'} checked={showProductNameTooltip} onCheckedChange={handleTooltipCheck}>
            상품명 말풍선
          </Checkbox>
        </Grow>
      </Grow>
    );
  }, [coverageName, showProductNameTooltip]);

  const titleRenderer = useCallback((params: ICellRendererParams<DummyDataType>) => {
    return <p className="truncate w-full pl-1.5">{params.data?.field2 ?? ''}</p>;
  }, []);
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '상품분류',
        field: 'field1',
        cellClass: 'text-center',
        flex: 1,
        minWidth: attributeColumnWidth(80),
      },
      {
        headerName: '상품명',
        flex: 6,
        cellClass: 'text-left p-0!',
        sortable: false,
        filter: false,
        autoHeight: true,
        suppressMovable: true, // 이동 방지
        lockPinned: true, // 고정 열에서 제외 방지
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({
          label: '상품명',
          field: 'field2',
        }),
        headerComponent: productNameHeader,
        cellRenderer: titleRenderer,
      },
    ],
    [attributeColumnWidth]
  );

  const designCellRenderer = (params: ICellRendererParams<DummyDataType>) => {
    return (
      <Grow className="h-full w-full">
        <Grow className="border-r border-[#ddddde] h-full aspect-auto w-[3rem] flex items-center justify-center shrink-0">
          {params.data?.field1}
        </Grow>
        <Grow className="flex-1 justify-start ">{params.data?.field2}</Grow>
      </Grow>
    );
  };

  const columnDefs2 = React.useMemo<ColDef<DummyDataType2>[]>(
    () => [
      {
        headerName: '종구분',
        field: 'field1',
        flex: 1,
        cellClass: '[&>div]:flex! [&>div]:justify-between!',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType2>({ field: 'field2' }),
        cellRenderer: designCellRenderer,
      },
    ],
    [attributeColumnWidth]
  );

  const columnDefs3 = React.useMemo<ColDef<DummyDataType3>[]>(
    () => [
      {
        headerName: '플랜명',
        field: 'field1',
        flex: 1,
        tooltipValueGetter: createTooltipValueGetter<DummyDataType3>({ field: 'field1' }),
      },
    ],
    [attributeColumnWidth]
  );

  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              다른상품설계
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ019)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable variant="head">
              <FormRow>
                <FormCell title={'현재 상품'}>
                  <Input value="한화 시그니처 여성 건강보험40 2504" readOnly variant="info" />
                </FormCell>
                <FormCell title={'현재 고객'}>
                  <Input value="홍길순 외 0명" readOnly variant="info" />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <Gcol placement={'ss'} className="w-full" gap={2}>
            {/* 간편설계인 경우 */}
            <Gcol placement={'ss'} className="w-full">
              <Typo variant={'body-lg'} weight={'bold'} className="flex items-center">
                간편설계를 생성할 상품을 선택해주세요.
              </Typo>
            </Gcol>

            {/* 상세설계인 경우 */}
            <Gcol gap={3} placement={'ss'}>
              <Gcol placement={'ss'} className="w-full">
                <Typo variant={'body-lg'} weight={'bold'} className="flex items-center gap-[0.6rem]">
                  <Badge color="secondary" size="md" variant="contained" className="w-[1.8rem] h-[1.8rem]">
                    1
                  </Badge>
                  현재 고객을 대상으로 다른 상품을 설계하시겠어요?
                </Typo>
                <RadioGroup className="gap-2 ml-[2.4rem]" onValueChange={() => {}} width="full">
                  {[
                    { value: 'v1', label: '네, 현재 고객으로 상세설계할게요.' },
                    { value: 'v2', label: '아니오, 신규 고객으로 간편설계할게요.' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value}>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </Gcol>
              <Typo variant={'body-lg'} weight={'bold'} className="flex items-center gap-[0.6rem]">
                <Badge color="secondary" size="md" variant="contained" className="w-[1.8rem] h-[1.8rem]">
                  2
                </Badge>
                상품을 선택해주세요.
              </Typo>
            </Gcol>

            <Grow placement={'ss'} className="w-full gap-3">
              {/* M2. 수정  */}
              <Grid className="w-full grid-cols-[1fr_1fr] gap-3">
                <TableFold variant={'default'}>
                  <TableFoldHead title="상품정보">
                    <Grow>
                      기준일자
                      <DatePickerInput mode={'single'} size={'md'} />
                    </Grow>
                  </TableFoldHead>
                  <TableFoldBody className="w-full">
                    <div
                      className={`h-full tooltip-hidden-toggle ag-theme-alpine inner-scroll ${showProductNameTooltip ? ' show-product-tooltip' : ''}`}
                      data-row={dummyData.length}
                    >
                      <AgGridReact<DummyDataType>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={dummyData}
                        columnDefs={columnDefs}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        tooltipShowDelay={0}
                        tooltipHideDelay={9999}
                        tooltipMouseTrack={true}
                      />
                    </div>
                  </TableFoldBody>
                </TableFold>
                <TableFold variant={'default'}>
                  <TableFoldHead title="종정보"></TableFoldHead>
                  <TableFoldBody>
                    <Gcol className="w-full" gap={3}>
                      <Gcol className="w-full">
                        <div className="ag-theme-alpine w-full inner-scroll" data-row={dummyData2.length}>
                          <AgGridReact<DummyDataType2>
                            getRowId={(params) => String(params.data.id)}
                            noRowsOverlayComponent={AgGridEmptyComponent}
                            rowData={dummyData2}
                            columnDefs={columnDefs2}
                            defaultColDef={{
                              sortable: true,
                              resizable: true,
                            }}
                            domLayout="normal"
                            tooltipShowMode="whenTruncated"
                            tooltipShowDelay={0}
                          />
                        </div>
                      </Gcol>
                      <Gcol className="w-full">
                        <TabPager
                          data={tabs}
                          active={active}
                          setActive={setActive}
                          removable={false}
                          onRemove={handleRemove}
                          visibleCount={4}
                          variant="default"
                          hasTableBelow={true}
                          error={false}
                          errorMsg="에러 메시지 예시"
                          getValue={(tab) => String(tab.value)}
                          renderTab={(tab) => <span>{tab.label}</span>}
                          renderDropdownItem={false}
                        >
                          <div className="ag-theme-alpine w-full ag-border-t inner-scroll" data-row={dummyData3.length}>
                            <AgGridReact<DummyDataType3>
                              getRowId={(params) => String(params.data.id)}
                              noRowsOverlayComponent={AgGridEmptyComponent}
                              rowData={dummyData3}
                              columnDefs={columnDefs3}
                              defaultColDef={{
                                sortable: true,
                                resizable: true,
                              }}
                              domLayout="normal"
                              tooltipShowMode="whenTruncated"
                              tooltipShowDelay={0}
                            />
                          </div>
                        </TabPager>
                      </Gcol>
                    </Gcol>
                  </TableFoldBody>
                </TableFold>
                {/* //M2. 수정  */}
              </Grid>
            </Grow>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                선택
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

export default Ltpz019;
