'use client';

// React
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';

import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { SearchIcon } from '@icons';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';
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

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type {
  ColDef,
  ColGroupDef,
  GridApi,
  ICellRendererParams,
  IHeaderParams,
  SuppressKeyboardEventParams,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import type { PopupBaseProps } from './types';
import { useFormFields } from '@/shared/hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ052 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [policySearchPart, setPolicySearchPart] = React.useState('');

  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });

  type DummyDataType = {
    id: number;
    isCheck: boolean;
    isAuthcheck1: boolean;
    isAuthcheck2: boolean;
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
      isCheck: true,
      isAuthcheck1: true,
      isAuthcheck2: true,
      field01: '12312312',
      field02: '911212-1111111',
      field03: '010-1234-5678',
      field04: '',
      field05: '',
      field06: '',
      field07: '',
    },
    {
      id: 2,
      isCheck: true,
      isAuthcheck1: true,
      isAuthcheck2: true,
      field01: '12312312',
      field02: '911212-1111111',
      field03: '010-1234-5678',
      field04: '',
      field05: '',
      field06: '',
      field07: '',
    },
  ];
  const gridApiRef = React.useRef<GridApi<DummyDataType> | null>(null);

  type HeaderCheckboxParams = IHeaderParams<DummyDataType> & {
    getAllChecked: () => boolean;
    toggleAll: (next: boolean) => void;
  };

  const HeaderCheckbox = (props: HeaderCheckboxParams) => {
    const checked = props.getAllChecked();
    const display = props.displayName ?? props.column.getColDef().headerName;

    return (
      <Grow className="ag-header-cell-label">
        <div onClick={(event) => event.stopPropagation()}>
          <Checkbox
            color="primary"
            variant="noneText"
            checked={checked}
            size={'md'}
            onCheckedChange={(value) => {
              props.toggleAll(value === true);
              gridApiRef.current?.refreshHeader();
            }}
          />
        </div>
        <span className="ag-header-cell-text">{display}</span>
      </Grow>
    );
  };

  const suppressGridKeyboardOnInput = (params: SuppressKeyboardEventParams<DummyDataType>) =>
    params.event?.target instanceof HTMLInputElement;

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      width: 80,
      field: 'id',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '인증방법',

      children: [
        {
          headerName: '동의서',
          width: 100,
          editable: true,
          field: 'isAuthcheck1',
          cellClass: 'text-center px-0! editable-cell',
          cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
          cellEditor: 'agCheckboxCellEditor', // ag-Grid 기본 체크박스 에디터 사용
          suppressKeyboardEvent: suppressGridKeyboardOnInput,
          headerComponent: HeaderCheckbox,
          headerComponentParams: {
            getAllChecked: () => rowData.length > 0 && rowData.every((row) => Boolean(row.isAuthcheck1)),
            toggleAll: (next: boolean) => setRowData((prev) => prev.map((row) => ({ ...row, isAuthcheck1: next }))),
          },
        },
        {
          headerName: '모바일',
          width: 100,
          editable: true,
          field: 'isAuthcheck2',
          headerClass: 'border-r-0!',
          cellClass: 'text-center px-0! editable-cell border-r-0!',
          cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
          cellEditor: 'agCheckboxCellEditor', // ag-Grid 기본 체크박스 에디터 사용
          suppressKeyboardEvent: suppressGridKeyboardOnInput,
          headerComponent: HeaderCheckbox,
          headerComponentParams: {
            getAllChecked: () => rowData.length > 0 && rowData.every((row) => Boolean(row.isAuthcheck2)),
            toggleAll: (next: boolean) => setRowData((prev) => prev.map((row) => ({ ...row, isAuthcheck2: next }))),
          },
        },
      ],
    },
    {
      headerName: '고객명',
      flex: 1,
      minWidth: 240,
      field: 'field01',
      headerClass: 'border-l border-[#d4d4d5]',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true,
      suppressNavigable: true,
      suppressKeyboardEvent: suppressGridKeyboardOnInput,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        return (
          <Grow className="w-full h-full flex items-center justify-center px-2 border-l border-[#d4d4d5]">
            <div
              onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              onDoubleClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => event.stopPropagation()}
              className="w-full h-full flex items-center justify-center gap-1"
            >
              <div className="w-[16rem] min-w-[16rem] max-w-[16rem] shrink-0">
                <Input
                  aria-label=""
                  width={'full'}
                  value={String(params.value ?? '')}
                  onChange={(event) => {
                    const value = event.target.value;
                    params.node.setDataValue('field01', value);
                  }}
                />
              </div>
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </div>
          </Grow>
        );
      },
    },
    {
      headerName: '주민번호',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '전화번호',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '변경전 직업정보',
      children: [
        {
          headerName: '상해급수',
          flex: 1,
          field: 'field04',
          cellClass: 'text-center px-0! whitespace-nowrap',
        },
        {
          headerName: '직업',
          flex: 1,
          field: 'field05',
          cellClass: 'text-center px-0! whitespace-nowrap',
        },
      ],
    },
  ];

  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [errorRows, setErrorRows] = React.useState<number[]>(
    DummyData.filter((row) => !row.isCheck).map((row) => row.id)
  );
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              일괄 가입설계동의 관리
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ052)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow placement="bwe" className="w-full" variant={'box-round'} gap={5}>
            <FormTable caption="증권번호" cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']} variant={'head'}>
              <FormRow>
                <FormCell title={'증권번호'} className="w-full">
                  <Grow>
                    <Input
                      aria-label="증권번호 검색"
                      width={'10rem'}
                      value={policySearchPart}
                      onChange={(e) => setPolicySearchPart(e.target.value)}
                    />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={'30rem'} value={'한화 더 건강한 1040종합'} readOnly />
                  </Grow>
                </FormCell>
                <FormCell title={'증권번호'} className="w-full">
                  <Grow>
                    <Input aria-label="" width={'6rem'} value={'123'} />
                    <Input aria-label="" width={'6rem'} value={'1234'} />
                    <Input aria-label="" width={'6rem'} value={'1234'} />
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Gcol className="w-full" gap={2.5}>
            <TableFold variant="accordion">
              <TableFoldHead title="고객정보">
                <Grow>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    행추가
                  </Button>
                  <Button variant={'outlined'} size={'xl'} color={'gray'}>
                    행삭제
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine ">
                  <AgGridReact<DummyDataType>
                    getRowId={(params) => String(params.data.id)}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                    }}
                    animateRows={false}
                    alwaysShowHorizontalScroll={true}
                    rowClassRules={{}}
                    domLayout="autoHeight"
                    // 체크박스 시
                    rowSelection={{
                      mode: 'multiRow',
                      headerCheckbox: true,
                      checkboxes: true,
                      enableClickSelection: true,
                    }}
                    onGridReady={(params) => {
                      gridApiRef.current = params.api;
                      params.api.forEachNode((node) => {
                        if (node.data?.isCheck) {
                          node.setSelected(true);
                        }
                      });
                    }}
                  />
                </div>
              </TableFoldBody>
            </TableFold>
            <Gcol className="w-full" placement="ss" variant="box-warning">
              <Typo icon="warning" variant="body-sm">
                <b>주의사항</b>
              </Typo>
              <BulletList color={'warning'} size="sm">
                <BulletListItem>
                  <em>단체보험 등 다수의 고객에게 동의</em>
                  <b>를</b> 받아야 하는 경우 사용하는 화면입니다.
                </BulletListItem>
                <BulletListItem>
                  <b>인증방법별 주민등록번호(동의서), 휴대전화번호(모바일)</b> <em>필수</em>입니다.
                </BulletListItem>
                <BulletListItem>
                  <b>모바일 동의는 당사 홈페이지 주소가 휴대폰 문자로 전송</b>되며,{' '}
                  <em>고객이 링크를 연결하여 직접 인증</em>하는 방식입니다. <em>(LMS인증과 다름)</em>
                </BulletListItem>
                <BulletListItem>
                  <b>모바일 동의는</b> <em>본인명의 핸드폰 일 때만 인증가능</em>합니다.
                </BulletListItem>
                <BulletListItem>
                  <em>카카오톡 미설치 고객의</em> 경우 카카오톡 알림톡 대신 <em>문자로 URL이 전송</em>됩니다.
                </BulletListItem>
                <BulletListItem>
                  LMS문자동의는 이 화면에서 불가하오니 <b>개별 동의</b>를 받으시기 바랍니다.{' '}
                  <em>(인증번호 적용으로 불가)</em>
                </BulletListItem>
                <BulletListItem>
                  <b>엑셀 업로드를</b> 통해서 <b>한꺼번에 여러 고객의 정보를 화면에 적용</b>가능합니다.{' '}
                  <em>(인증방법은 한가지에만 '1'로 표시하셔야 업로드 시 오류가 나지 않습니다.)</em>
                </BulletListItem>
              </BulletList>
            </Gcol>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                엑셀가져오기
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                엑셀양식받기
              </Button>
            </Grow>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                출력/발송
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

export default LTPZ052;
