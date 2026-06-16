/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import type { ColDef, ColGroupDef, GridApi, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { Grow, Typo } from '@atoms';
import { SearchIcon } from '@icons';
import { AgGridEmptyComponent, createTooltipValueGetter, useDynamicColumnWidths } from '@aggrid';
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
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';

type DummyDataType = {
  id: number;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
};
const DummyData: DummyDataType[] = [
  { id: 1, isCheck: true, field01: '김한화한화', field02: '계약자', field03: '등록대상', field04: '-' },
  { id: 2, isCheck: true, field01: '김한화한화김한화한화', field02: '법인대리인', field03: '등록대상', field04: '-' },
  { id: 3, isCheck: true, field01: '김한화', field02: '등록대상', field03: '등록대상', field04: '-' },
];

const Ltpz053 = () => {
  const { attributeColumnWidth } = useDynamicColumnWidths();
  const designCellRenderer = (params: ICellRendererParams<DummyDataType>) => {
    return (
      <Grow className="h-full w-full">
        <Grow className="flex-1 justify-center">{params.data?.field02}</Grow>
        <Grow className="border-l border-[#ddddde] h-full pl-1 text-left! aspect-auto flex-1 items-center justify-center text-[var(--color-danger-50)]">
          {params.data?.field03}
        </Grow>
      </Grow>
    );
  };
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '주민등록증',
  });
  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '고객명',
      width: attributeColumnWidth(70),
      field: 'field01',
      cellClass: 'text-center !px-0',
      autoHeight: true,
      tooltipValueGetter: createTooltipValueGetter<DummyDataType>({ field: 'field01' }),
    },
    {
      headerName: '실명증표진위여부 확인서',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center ',
      autoHeight: true,
      cellRenderer: designCellRenderer,
    },
    {
      headerName: '타인사망피보험자 동의확인서',
      flex: 1,
      field: 'field04',
      cellClass: 'text-center',
      autoHeight: true,
    },
  ];
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  // M1. 추가

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              원클릭스캔
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ053)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid grid-rows-[auto_1fr_auto_auto]">
          <Grow placement="bwe" className="w-full" variant={'box-round'}>
            <FormTable caption="설계번호" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']} variant={'head'}>
              <FormRow>
                <FormCell title={'설계번호'} tdClassName="gap-1">
                  <Input
                    aria-label="설계번호 검색"
                    value={form.type01}
                    width={'quoteNo'}
                    onChange={(e) => setFormField('type01', e.target.value)}
                  />
                  <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                </FormCell>
                <FormCell title={'상품명'}>
                  <Input
                    value={'한화 더건강한 한아름종합보험2601한화 더건강한 한아름종합보험2601'}
                    readOnly
                    variant="info"
                  />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <div className="ag-theme-alpine inner-scroll radio-selection" data-row={rowData.length}>
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
              rowSelection={{
                mode: 'singleRow',
                checkboxes: true,
                enableClickSelection: true,
              }}
              selectionColumnDef={{
                headerName: '선택',
                width: 30,
              }}
              onGridReady={(params) => {
                gridApiRef.current = params.api;
                params.api.forEachNode((node) => {
                  if (node.data?.isCheck) {
                    node.setSelected(true);
                  }
                });
              }}
              tooltipShowMode="whenTruncated"
              tooltipShowDelay={0}
            />
          </div>
          <TableFold variant="accordion">
            <TableFoldHead title="조회항목"></TableFoldHead>
            <TableFoldBody>
              {/* M1. 수정 */}
              <FormTable
                caption="조회항목"
                cols={['w-[7rem]', 'w-[10.4rem]', 'w-[11rem]', 'w-auto', 'w-[7rem]', 'w-auto']}
              >
                <FormRow>
                  <FormCell title={'구분'} colSpan={5}>
                    <RadioGroup
                      value={form.type02}
                      onValueChange={(value) => setFormField('type02', value)}
                      className="gap-3"
                    >
                      {[
                        { value: '주민등록증', label: '주민등록증' },
                        { value: '운전면허증', label: '운전면허증' },
                        { value: '외국인등록증', label: '외국인등록증' },
                        { value: '사업자등록번호', label: '사업자등록번호' },
                      ].map((option) => (
                        <RadioGroupItem key={option.value} value={option.value}>
                          {option.label}
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  </FormCell>
                </FormRow>
                {form.type02 === '주민등록증' && (
                  <FormRow>
                    <FormCell title={'성명'}>
                      <Input aria-label="" value={'김환화환하'} required />
                    </FormCell>
                    <FormCell title={'주민등록번호'}>
                      <Input aria-label="" value={'000000-0******'} required />
                    </FormCell>
                    <FormCell title={'발급일자'}>
                      <DatePickerInput mode="single" onChange={() => {}} size="lg" value="" required />
                      <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                        신원확인
                      </Button>
                    </FormCell>
                  </FormRow>
                )}
                {form.type02 === '운전면허증' && (
                  <FormRow>
                    <FormCell title={'성명'}>
                      <Input aria-label="" value={''} required />
                    </FormCell>
                    <FormCell title={'생년월일'}>
                      <DatePickerInput mode="single" onChange={() => {}} size="lg" value="" required />
                    </FormCell>
                    <FormCell title={'면허번호'}>
                      <Input aria-label="" value={''} required />
                      <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                        신원확인
                      </Button>
                    </FormCell>
                  </FormRow>
                )}
                {form.type02 === '외국인등록증' && (
                  <>
                    <FormRow>
                      <FormCell title={'성명'}>
                        <Input aria-label="" value={''} required />
                      </FormCell>
                      <FormCell title={'외국인번호'}>
                        <Input aria-label="" value={''} required />
                      </FormCell>
                      <FormCell title={'발급일자'}>
                        <DatePickerInput mode="single" onChange={() => {}} size="lg" value="" required />
                        <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                          신원확인
                        </Button>
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'일련번호'} colSpan={5}>
                        <Input aria-label="" width={140} value={''} required />
                      </FormCell>
                    </FormRow>
                  </>
                )}
                {form.type02 === '사업자등록번호' && (
                  <FormRow>
                    <FormCell title={'사업자명'}>
                      <Input aria-label="" value={''} required />
                    </FormCell>
                    <FormCell title={'사업자등록번호'} colSpan={5} tdClassName="grid grid-cols-[1fr_auto] gap-1">
                      <Input aria-label="" value={''} required />
                      <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                        사업자등록번호조회
                      </Button>
                    </FormCell>
                  </FormRow>
                )}
              </FormTable>
            </TableFoldBody>
          </TableFold>
          <TableFold variant="accordion">
            <TableFoldHead title="신원확인결과"></TableFoldHead>
            <TableFoldBody>
              <FormTable caption="월클릭스켄" cols={['w-[7rem]', 'w-auto', 'w-[7rem]', 'w-auto']}>
                <FormRow>
                  <FormCell title={'진위여부'}>
                    <Input aria-label="" value={'12345678'} readOnly />
                  </FormCell>
                  <FormCell title={'사유'} tdClassName="grid grid-cols-[1fr_auto] gap-1">
                    <Input aria-label="" value={'12345678'} readOnly />
                    <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                      확인서발행
                    </Button>
                  </FormCell>
                </FormRow>
              </FormTable>
            </TableFoldBody>
          </TableFold>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                이미지조회
              </Button>
            </Grow>
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

export default Ltpz053;
