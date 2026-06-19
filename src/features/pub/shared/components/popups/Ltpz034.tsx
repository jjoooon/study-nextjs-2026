/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef, FirstDataRenderedEvent, SelectionChangedEvent } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useMemo, useState } from 'react';
import { Grid, Grow, Typo } from '@/shared/components/atoms';
import { useTabs } from '@/shared/hooks/useTabs';
import { ResetIcon, RightArrowIcon } from '@icons';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
import { Badge } from '@uiux/Badge';
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
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InputCombo } from '@common/InputCombo';
import { TabPager } from '@common/TabPager';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isChecked?: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04?: string | number;
};

const DUMMY_DATA: DummyDataType[] = [
  // { id: 1, isChecked: true, field01: 'M00.0', field02: '대장직장용종', field03: '무관', field04: 'SI경증' },
  // { id: 2, isChecked: false, field01: 'M00.0', field02: '척추 염좌', field03: '10개월', field04: 'SI경증(감액)' },
  // { id: 3, isChecked: false, field01: 'M00.0', field02: '후천성 백내장', field03: '10개월' },
  // { id: 4, isChecked: false, field01: 'M00.0', field02: '치핵/치질', field03: '10년내' },
  // { id: 5, isChecked: false, field01: 'M00.0', field02: '헤르페스바이러스[단순헤르페스]감염', field03: '10개월' },
  // { id: 6, isChecked: false, field01: 'M00.0', field02: '급성인지 만성인지 명시되지 않은 기관지염', field03: '10개월' },
  // { id: 7, isChecked: false, field01: 'M00.0', field02: '후천성 백내장', field03: '10개월' },
  // { id: 8, isChecked: false, field01: 'M00.0', field02: '치핵/치질', field03: '10개월' },
  // { id: 9, isChecked: false, field01: 'M00.0', field02: '헤르페스바이러스[단순헤르페스]감염', field03: '10개월' },
  // {
  //   id: 10,
  //   isChecked: false,
  //   field01: 'M00.0',
  //   field02: '급성인지 만성인지 명시되지 않은 기관지염',
  //   field03: '10개월',
  // },
  // { id: 11, isChecked: false, field01: 'M00.0', field02: '치핵/치질', field03: '10개월' },
  // { id: 12, isChecked: false, field01: 'M00.0', field02: '헤르페스바이러스[단순헤르페스]감염', field03: '10개월' },
  // {
  //   id: 13,
  //   isChecked: false,
  //   field01: 'M00.0',
  //   field02: '급성인지 만성인지 명시되지 않은 기관지염',
  //   field03: '10개월',
  // },
];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getKeyword = (value: string) => value.trim().replace(/^#/, '');

const renderHighlightedText = (text: string, keyword: string) => {
  if (!keyword) {
    return text;
  }

  const escapedKeyword = escapeRegExp(keyword);
  const regExp = new RegExp(`(${escapedKeyword})`, 'g');
  const chunks = text.split(regExp);

  return chunks.map((chunk, index) =>
    chunk === keyword ? (
      <span key={`${chunk}-${index}`} className="text-primary font-bold">
        {chunk}
      </span>
    ) : (
      <React.Fragment key={`${chunk}-${index}`}>{chunk}</React.Fragment>
    )
  );
};

interface Ltpz034Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  minimized?: boolean;
  onMinimizeChange?: (minimized: boolean) => void;
}

const Ltpz034 = ({ minimized, onMinimizeChange }: Ltpz034Props) => {
  type ComboFieldKey = 'hash';

  const handleComboValueChange = useCallback(
    <TField extends ComboFieldKey>(field: TField) =>
      (nextValue: string) => {
        setComboValues((prev) => ({
          ...prev,
          [field]: nextValue,
        }));
      },
    []
  );
  const [comboValues, setComboValues] = useState<Record<ComboFieldKey, string>>({
    hash: '',
  });
  const [rowData] = React.useState<DummyDataType[]>(DUMMY_DATA);
  const keyword = getKeyword(comboValues.hash);

  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const onSelectionChanged = useCallback((event: SelectionChangedEvent<DummyDataType>) => {
    const selectedNodes = event.api.getSelectedNodes();
    if (selectedNodes.length > 0) {
      setSelectedRowId(selectedNodes[0].id ?? null);
    } else {
      setSelectedRowId(null);
    }
  }, []);

  const onFirstDataRendered = useCallback(
    (params: FirstDataRenderedEvent<DummyDataType>) => {
      if (selectedRowId) {
        const node = params.api.getRowNode(selectedRowId);
        if (node) {
          node.setSelected(true);
        }
      }
    },
    [selectedRowId]
  );

  const filteredRowData = React.useMemo(() => {
    if (!keyword) {
      return rowData;
    }

    return rowData.filter((row) => String(row.field02).includes(keyword));
  }, [keyword, rowData]);

  const { attributeColumnWidth } = useDynamicColumnWidths();

  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = useMemo(
    () => [
      {
        headerName: 'KCD코드',
        field: 'field01',
        width: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
      {
        headerName: '질병명',
        field: 'field02',
        flex: 1,
        cellClass: 'text-left',
        tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field02' }),
        cellRenderer: (params: { value: string | number; data?: DummyDataType }) => (
          <Grow className="justify-between">
            <span className="[&>span]:text-[#FF5C2E]">
              {renderHighlightedText(String(params.value ?? ''), keyword)}
            </span>
            {params.data?.field04 && <Badge color={'blue'}>{params.data.field04}</Badge>}
          </Grow>
        ),
      },
      {
        headerName: 'N년 이상',
        field: 'field03',
        width: attributeColumnWidth(80),
        cellClass: 'text-center',
      },
    ],
    [keyword, attributeColumnWidth]
  );
  const DATA_TABS = [
    { label: '등록고객', value: 'tab1' },
    { label: '미등록고객', value: 'tab2' },
  ];
  const { tabs, active, setActive } = useTabs(DATA_TABS);
  return (
    <Dialog open minimized={minimized} onMinimizeChange={onMinimizeChange}>
      <DialogContent showCloseButton resizable size="lg" minimized={true}>
        <DialogHeader>
          <DialogTitle>
            <Typo tag="strong" variant="heading-lg">
              고지유형찾기
            </Typo>
            <Typo tag="p" variant="body-xl">
              (LTPZ034)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid grid-rows-[auto_1fr]">
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => <span>{tab.label}</span>}
            renderAfter={
              <Grow>
                <Button variant={'outlined'} size={'md'} color={'secondary'}>
                  N년내 입원수슬
                </Button>
                <Button variant={'outlined'} size={'md'} color={'secondary'}>
                  정보 변경
                </Button>
                <Grow>
                  <Typo>거절</Typo>
                  <Typo>심사</Typo>
                  <Typo>조건부</Typo>
                  <Typo>인수</Typo>
                </Grow>
              </Grow>
            }
          >
            {active === 'tab1' && (
              <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                테스트
              </Button>
            )}
            {active === 'tab2' && (
              <Grid className="h-full ">
                <Grid className="grid-rows-[1fr_auto] grid-flow-col">
                  <div className="ag-theme-alpine min-h-[33rem]">
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      noRowsOverlayComponentParams={{
                        message: '검색 결과가 없습니다111ㅁㄴㅇㄻㄴㅇㄹ.',
                      }}
                      rowData={filteredRowData}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        sortable: false,
                        resizable: true,
                      }}
                      rowSelection={{
                        mode: 'singleRow',
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '선택',
                        width: 30,
                        cellClass: 'text-center editable-cell',
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      onSelectionChanged={onSelectionChanged}
                      onFirstDataRendered={onFirstDataRendered}
                    />
                  </div>
                  <Grow className="w-full h-full flex justify-center items-center ">
                    <Button variant={'none'} size={'lg'} color={'primary'} className="p-0">
                      <RightArrowIcon color="#FF5C2E" />
                    </Button>
                  </Grow>
                </Grid>
                <Grow>
                  <Typo>s</Typo>
                </Grow>
              </Grid>
            )}
          </TabPager>
          <Grow placement="bwe" className="w-full" variant="box-round">
            <FormTable variant="head" cols={['w-1', 'w-auto']}>
              <FormRow>
                <FormCell title="병명/코드">
                  <InputCombo
                    aria-label="고객 검색"
                    width={200}
                    col={1}
                    options={[
                      { value: '#척수염좌', label: '#척수염좌' },
                      { value: '#후천성백내장', label: '#후천성백내장' },
                      { value: '#어꺠병변', label: '#어꺠병변' },
                      { value: '#추간판장애(탈출,변성,전위)', label: '#추간판장애(탈출,변성,전위)' },
                    ]}
                    value={comboValues.hash}
                    onChange={handleComboValueChange('hash')}
                    placeholder="고객 검색"
                  />
                </FormCell>
              </FormRow>
            </FormTable>
            <Grow>
              <Button color="coolgray" onClick={() => {}} only="default" size="lg" variant="contained">
                조회
              </Button>
              <Button
                color={'gray'}
                only={'icon'}
                size={'lg'}
                variant={'outlined'}
                onClick={() => {}}
                aria-label="새로고침"
              >
                <ResetIcon />
              </Button>
            </Grow>
          </Grow>
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

export default Ltpz034;
