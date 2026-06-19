/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { ColDef, ColGroupDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useMemo, useState } from 'react';
import { Grow, Typo } from '@/shared/components/atoms';
import { ResetIcon } from '@/shared/components/icons/CommonIcons';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
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

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isChecked?: boolean;
  field01: string | number;
  field02: string | number;
};

const DUMMY_DATA: DummyDataType[] = [
  { id: 1, isChecked: true, field01: 'M00.0', field02: '대장직장용종' },
  { id: 2, isChecked: false, field01: 'M00.0', field02: '척추 염좌' },
  { id: 3, isChecked: false, field01: 'M00.0', field02: '후천성 백내장' },
  { id: 4, isChecked: false, field01: 'M00.0', field02: '치핵/치질' },
  { id: 5, isChecked: false, field01: 'M00.0', field02: '헤르페스바이러스[단순헤르페스]감염' },
  { id: 6, isChecked: false, field01: 'M00.0', field02: '급성인지 만성인지 명시되지 않은 기관지염' },
  { id: 7, isChecked: false, field01: 'M00.0', field02: '후천성 백내장' },
  { id: 8, isChecked: false, field01: 'M00.0', field02: '치핵/치질' },
  { id: 9, isChecked: false, field01: 'M00.0', field02: '헤르페스바이러스[단순헤르페스]감염' },
  { id: 10, isChecked: false, field01: 'M00.0', field02: '급성인지 만성인지 명시되지 않은 기관지염' },
  { id: 11, isChecked: false, field01: 'M00.0', field02: '치핵/치질' },
  { id: 12, isChecked: false, field01: 'M00.0', field02: '헤르페스바이러스[단순헤르페스]감염' },
  { id: 13, isChecked: false, field01: 'M00.0', field02: '급성인지 만성인지 명시되지 않은 기관지염' },
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
        cellRenderer: (params: { value: string | number }) => (
          <span className="[&>span]:text-[#FF5C2E]">{renderHighlightedText(String(params.value ?? ''), keyword)}</span>
        ),
      },
    ],
    [keyword, attributeColumnWidth]
  );

  return (
    <Dialog open minimized={minimized} onMinimizeChange={onMinimizeChange}>
      <DialogContent showCloseButton resizable size="sm" minimized={true}>
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
          <div className="ag-theme-alpine radio-selection min-h-[33rem]">
            <AgGridReact<DummyDataType>
              getRowId={(params) => String(params.data.id)}
              rowData={filteredRowData}
              columnDefs={columnDefs}
              noRowsOverlayComponent={AgGridEmptyComponent}
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
                width: 34,
                cellClass: 'text-center editable-cell',
              }}
              domLayout="normal"
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
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

export default Ltpz034;
