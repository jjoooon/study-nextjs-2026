/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { createExpiryCellRenderer } from '@grid/CellRenderers';
import { ArrowIcon, EssentialIcon } from '@icons';
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
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { editableCellClassRules } from '@/features/pub/ispl/cvrPl/utils/agGridUtils';
import { PopupBaseProps } from '@/shared/types/uiTypes';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isCheck: boolean;
  field01: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    field01: '철골절근콘크리트조',
  },
  {
    id: 2,
    isCheck: false,
    field01: '철골절근콘크리트조',
  },
  {
    id: 3,
    isCheck: false,
    field01: '철골절근콘크리트조',
  },
  {
    id: 4,
    isCheck: false,
    field01: '철골절근콘크리트조',
  },
  {
    id: 5,
    isCheck: false,
    field01: '철골절근콘크리트조',
  },
  {
    id: 6,
    isCheck: false,
    field01: '철골절근콘크리트조',
  },
  {
    id: 7,
    isCheck: false,
    field01: '철골절근콘크리트조',
  },
  {
    id: 8,
    isCheck: false,
    field01: '철골절근콘크리트조',
  },
  {
    id: 9,
    isCheck: false,
    field01: '철골절근콘크리트조',
  },
  {
    id: 10,
    isCheck: false,
    field01: '철골절근콘크리트조',
  },
];

type DummyDataType2 = {
  id: number;
  isCheck: boolean;
  field01: string | number;
};
const DummyData2: DummyDataType2[] = [
  {
    id: 1,
    isCheck: false,
    field01: '슬래프즙',
  },
  {
    id: 2,
    isCheck: false,
    field01: '슬래프위아스파트슁글즙',
  },
  {
    id: 3,
    isCheck: false,
    field01: '슬래프즙',
  },
  {
    id: 4,
    isCheck: false,
    field01: '슬래프즙',
  },
  {
    id: 5,
    isCheck: false,
    field01: '슬래프즙',
  },
  {
    id: 6,
    isCheck: false,
    field01: '슬래프즙',
  },
  {
    id: 7,
    isCheck: false,
    field01: '슬래프즙',
  },
  {
    id: 8,
    isCheck: false,
    field01: '슬래프즙',
  },
  {
    id: 9,
    isCheck: false,
    field01: '슬래프즙',
  },
  {
    id: 10,
    isCheck: false,
    field01: '슬래프즙',
  },
];
type DummyDataType3 = {
  id: number;
  isCheck: boolean;
  field01: string | number;
};
const DummyData3: DummyDataType3[] = [
  {
    id: 1,
    isCheck: false,
    field01: '콘크리트벽',
  },
  {
    id: 2,
    isCheck: false,
    field01: '치장벽돌',
  },
  {
    id: 3,
    isCheck: false,
    field01: '시멘트벽돌',
  },
  {
    id: 4,
    isCheck: false,
    field01: '시멘트벽돌',
  },
  {
    id: 5,
    isCheck: false,
    field01: '시멘트벽돌',
  },
  {
    id: 6,
    isCheck: false,
    field01: '시멘트벽돌',
  },
  {
    id: 7,
    isCheck: false,
    field01: '시멘트벽돌',
  },
  {
    id: 8,
    isCheck: false,
    field01: '시멘트벽돌',
  },
  {
    id: 9,
    isCheck: false,
    field01: '시멘트벽돌',
  },
  {
    id: 10,
    isCheck: false,
    field01: '시멘트벽돌',
  },
];
type DummyDataType4 = {
  id: number;
  field01: string | number;
  field02: string | number;
  rowType?: 'normal' | 'title' | 'spacer';
};

type ImageSectionType = '기둥' | '지붕' | '외벽';

type ImageItemType = {
  id: number;
  src: string;
  label: string;
};

type InsuredFloorType = '전체' | '일부' | null;

const IMAGE_PAGE_SIZE = 5;

const imageItemsBySection: Record<ImageSectionType, ImageItemType[]> = {
  기둥: [
    { id: 1, src: '/images/Ltpz059/dummy.jpg', label: '철골철근콘크리트조' },
    { id: 2, src: '/images/Ltpz059/dummy2.jpg', label: '철근콘크리트조' },
    { id: 3, src: '/images/Ltpz059/dummy3.jpg', label: '연와조' },
    { id: 4, src: '/images/Ltpz059/dummy4.jpg', label: '목조' },
    { id: 5, src: '/images/Ltpz059/dummy5.jpg', label: '경량철골조' },
    { id: 6, src: '/images/Ltpz059/dummy6.jpg', label: '석조' },
    { id: 7, src: '/images/Ltpz059/dummy7.jpg', label: '시멘트블록조' },
    { id: 8, src: '/images/Ltpz059/dummy7.jpg', label: '시멘트블록조' },
    { id: 9, src: '/images/Ltpz059/dummy7.jpg', label: '시멘트블록조' },
    { id: 10, src: '/images/Ltpz059/dummy7.jpg', label: '시멘트블록조' },
    { id: 11, src: '/images/Ltpz059/dummy7.jpg', label: '시멘트블록조' },
  ],
  지붕: [
    { id: 1, src: '/images/Ltpz059/dummy.jpg', label: '슬래브즙' },
    { id: 2, src: '/images/Ltpz059/dummy2.jpg', label: '슬래브위아스팔트슁글즙슬래브위아스팔트슁글즙' },
    { id: 3, src: '/images/Ltpz059/dummy3.jpg', label: '기와즙' },
    { id: 4, src: '/images/Ltpz059/dummy4.jpg', label: '슬레이트즙' },
    { id: 5, src: '/images/Ltpz059/dummy5.jpg', label: '금속판즙' },
    { id: 6, src: '/images/Ltpz059/dummy6.jpg', label: '초가즙' },
    { id: 7, src: '/images/Ltpz059/dummy7.jpg', label: '판넬즙' },
  ],
  외벽: [
    { id: 1, src: '/images/Ltpz059/dummy.jpg', label: '콘크리트벽' },
    { id: 2, src: '/images/Ltpz059/dummy2.jpg', label: '치장벽돌' },
    { id: 3, src: '/images/Ltpz059/dummy3.jpg', label: '시멘트벽돌' },
    { id: 4, src: '/images/Ltpz059/dummy4.jpg', label: '목재' },
    { id: 5, src: '/images/Ltpz059/dummy5.jpg', label: '금속판넬' },
    { id: 6, src: '/images/Ltpz059/dummy6.jpg', label: '유리커튼월' },
    { id: 7, src: '/images/Ltpz059/dummy7.jpg', label: '석재' },
  ],
};

const DummyData4: DummyDataType4[] = [
  {
    id: 1,
    field01: '표제부',
    field02: '',
    rowType: 'title',
  },
  {
    id: 2,
    field01: '동명',
    field02: '',
  },
  {
    id: 3,
    field01: '기둥',
    field02: 'text',
  },
  {
    id: 4,
    field01: '지붕',
    field02: 'text',
  },
  {
    id: 5,
    field01: '외벽',
    field02: 'text',
  },
  {
    id: 6,
    field01: '지상층',
    field02: 'text',
  },
  {
    id: 7,
    field01: '지하층',
    field02: 'text',
  },
  {
    id: 8,
    field01: '연면적',
    field02: 'text',
  },
  {
    id: 9,
    field01: '사용승인일',
    field02: 'text',
  },
  {
    id: 10,
    field01: '',
    field02: '',
    rowType: 'spacer',
  },
  {
    id: 11,
    field01: '전유부',
    field02: '',
    rowType: 'title',
  },
  {
    id: 12,
    field01: '호칭명',
    field02: '',
  },
  {
    id: 13,
    field01: '기둥',
    field02: '',
  },
  {
    id: 14,
    field01: '전용부분',
    field02: '',
  },
];

const Ltpz059 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [editableFieldName, setEditableFieldName] = React.useState<string | null>(null);
  const [insuredFloorType, setInsuredFloorType] = React.useState<InsuredFloorType>(null);
  const [detailPlace, setDetailPlace] = React.useState<string>('건물전체');
  const [imagePageBySection, setImagePageBySection] = React.useState<Record<ImageSectionType, number>>({
    기둥: 0,
    지붕: 0,
    외벽: 0,
  });
  const getExpiryRenderer = createExpiryCellRenderer<DummyDataType4>;

  const getEditableFieldNameByTitle = (title: string | number | undefined): string | null => {
    const titleText = String(title ?? '');

    if (titleText === '표제부') {
      return '동명';
    }

    if (titleText === '전유부') {
      return '호칭명';
    }

    return null;
  };

  const isValueRow = (data?: DummyDataType4): data is DummyDataType4 => {
    if (!data) {
      return false;
    }

    return data.rowType !== 'title' && data.rowType !== 'spacer';
  };

  const isEditableRow = (data?: DummyDataType4): boolean => {
    if (!isValueRow(data)) {
      return false;
    }

    return String(data.field01) === editableFieldName;
  };

  const isEmptyCellValue = (value: string | number | null | undefined): boolean => String(value ?? '') === '';

  const getMaxImagePage = (section: ImageSectionType) =>
    Math.max(Math.ceil(imageItemsBySection[section].length / IMAGE_PAGE_SIZE) - 1, 0);

  const updateImagePage = (section: ImageSectionType, direction: 'prev' | 'next') => {
    setImagePageBySection((prev) => {
      const currentPage = prev[section];
      const nextPage =
        direction === 'prev' ? Math.max(currentPage - 1, 0) : Math.min(currentPage + 1, getMaxImagePage(section));

      return {
        ...prev,
        [section]: nextPage,
      };
    });
  };

  const getVisibleImageItems = (section: ImageSectionType): ImageItemType[] => {
    const startIndex = imagePageBySection[section] * IMAGE_PAGE_SIZE;

    return imageItemsBySection[section].slice(startIndex, startIndex + IMAGE_PAGE_SIZE);
  };

  const renderImageSelectorRow = (section: ImageSectionType) => {
    const currentPage = imagePageBySection[section];
    const visibleItems = getVisibleImageItems(section);

    return (
      <Grow className="h-[18rem]">
        <Button
          color="gray-light"
          onClick={() => updateImagePage(section, 'prev')}
          only="icon"
          size="lg"
          variant="outlined"
          disabled={currentPage === 0}
        >
          <ArrowIcon color="#FF5C2E" />
        </Button>
        <div className="flex gap-2 w-[90.7rem]">
          {visibleItems.map((item) => (
            <Gcol key={`${section}-${item.id}`} className="w-70 shrink-0">
              <img
                src={item.src}
                alt={item.label}
                className="border border-solid border-[#D8D8D8] w-[175rem] h-[13rem] aspect-square object-cover"
              />
              <Typo className="text-center w-full h-[4.3rem] min-h-[4.3rem]">{item.label}</Typo>
            </Gcol>
          ))}
        </div>
        <Button
          color="gray-light"
          onClick={() => updateImagePage(section, 'next')}
          only="icon"
          size="lg"
          variant="outlined"
          disabled={currentPage === getMaxImagePage(section)}
        >
          <ArrowIcon color="#FF5C2E" className="rotate-180" />
        </Button>
      </Grow>
    );
  };

  // AgGrid Column
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '기둥',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
    },
  ];
  const columnDefs2: (ColDef<DummyDataType2> | ColGroupDef<DummyDataType2>)[] = [
    {
      headerName: '지붕',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
    },
  ];
  const columnDefs3: (ColDef<DummyDataType3> | ColGroupDef<DummyDataType3>)[] = [
    {
      headerName: '외벽',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left',
    },
  ];
  const columnDefs4: (ColDef<DummyDataType4> | ColGroupDef<DummyDataType4>)[] = [
    {
      headerName: '건축물대장',
      headerClass: 'ag-visible',
      children: [
        {
          headerName: '',
          field: 'field01',
          width: 80,
          cellClass: 'text-left flex!',
          colSpan: ({ data }) => (data?.rowType === 'spacer' ? 3 : 1),
          cellRenderer: ({ data }: { data?: DummyDataType4 }) =>
            data?.rowType === 'spacer' ? null : data?.rowType === 'title' ? (
              <b>{data.field01}</b>
            ) : (
              <span>{data?.field01}</span>
            ),
        },
        {
          headerName: '',
          field: 'field02',
          flex: 1,
          colSpan: ({ data }) => (data?.rowType === 'title' ? 1 : 2),
          cellClassRules: editableCellClassRules<DummyDataType4>(),
          cellClass: ({ data }) => {
            const base = 'text-center px-[0.2rem]! tracking-tighter';

            if (!isValueRow(data)) {
              return base;
            }

            return isEditableRow(data) ? base : `${base} no-edited`;
          },
          editable: ({ data }) => {
            if (data?.rowType === 'spacer') {
              return false;
            }

            return isEditableRow(data);
          },
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ['동명1', '동명2'],
          },
          cellRenderer: (params: ICellRendererParams<DummyDataType4>) =>
            params.data?.rowType === 'spacer' ? null : params.data?.rowType === 'title' ? (
              <Button
                color="gray"
                only="default"
                size="sm"
                variant="contained"
                onClick={() => {
                  const targetFieldName = getEditableFieldNameByTitle(params.data?.field01);

                  setEditableFieldName(targetFieldName);
                }}
              >
                조회
              </Button>
            ) : isEditableRow(params.data) && isEmptyCellValue(params.value as string | number | null | undefined) ? (
              <span className="flex w-full h-full items-center justify-end pr-2">
                <img
                  src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22black%22%20stroke%3D%22none%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M7.334%2010.667%2016%2021.334l8.667-10.667H7.334Z%22%2F%3E%3C%2Fsvg%3E"
                  alt="select-arrow"
                  className="w-[1.8rem]! h-[1.8rem]!"
                />
              </span>
            ) : (
              getExpiryRenderer('center')(params)
            ),
        },
        {
          flex: 1,
          cellClass: 'text-center',
          cellRenderer: ({ data }: { data?: DummyDataType4 }) =>
            data?.rowType === 'title' ? (
              <Button color="gray" onClick={() => {}} only="default" size="sm" variant="contained">
                발급
              </Button>
            ) : null,
        },
      ],
    },
  ];

  const [buildingSelectType, setBuildingSelectType] = React.useState<string>('건물구조선택');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="full">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              건물구조입력
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ059)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid grid-rows-[1fr]">
          <TableFold variant="accordion" className="grid grid-rows-[auto_1fr]">
            <TableFoldHead title="건물구조입력">
              <Grow>
                <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                  건축물대장조회
                </Button>
                <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                  다음지도
                </Button>
                <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                  전자정부
                </Button>
              </Grow>
            </TableFoldHead>
            <TableFoldBody className="gap-3 flex flex-col">
              <Grow placement="bwc" className="w-full" variant={'box-round'}>
                <RadioGroup defaultValue="건물구조선택" onValueChange={(value) => setBuildingSelectType(value)}>
                  {[
                    { value: '건물구조선택', label: '건물구조선택' },
                    { value: '이미지로선택', label: '이미지로선택' },
                  ].map((option) => (
                    <RadioGroupItem key={option.value} value={option.value}>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </Grow>
              {buildingSelectType === '건물구조선택' && (
                <Grid className="w-full h-full grid-cols-[2fr_2fr_2fr_4fr]">
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataType>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={DummyData}
                      columnDefs={columnDefs}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: true,
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        width: 30,
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataType2>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={DummyData2}
                      columnDefs={columnDefs2}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: true,
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        width: 30,
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                  <div className="ag-theme-alpine">
                    <AgGridReact<DummyDataType3>
                      getRowId={(params) => String(params.data.id)}
                      noRowsOverlayComponent={AgGridEmptyComponent}
                      rowData={DummyData3}
                      columnDefs={columnDefs3}
                      defaultColDef={{
                        sortable: true,
                        resizable: true,
                      }}
                      rowSelection={{
                        mode: 'multiRow',
                        headerCheckbox: true,
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        width: 30,
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                    />
                  </div>
                  <Grid className="grid-rows-[1fr_auto]">
                    <div className="ag-theme-alpine">
                      <AgGridReact<DummyDataType4>
                        getRowId={(params) => String(params.data.id)}
                        noRowsOverlayComponent={AgGridEmptyComponent}
                        rowData={DummyData4}
                        columnDefs={columnDefs4}
                        defaultColDef={{
                          sortable: true,
                          resizable: true,
                        }}
                        groupHeaderHeight={30}
                        headerHeight={0}
                        getRowHeight={(params) => (params.data?.rowType === 'spacer' ? 30 : 30)}
                        singleClickEdit={true}
                        domLayout="autoHeight"
                      />
                    </div>
                    <Gcol className="w-full" placement="ss" variant="box-warning">
                      <Typo icon="warning" variant="body-sm">
                        <b>주의사항</b>
                      </Typo>
                      <BulletList position="col">
                        <BulletListItem type="dotBig">
                          조회결과를 참고하여 건물구조를 선택하시기 바랍니다.
                        </BulletListItem>
                        <BulletListItem type="dotBig">조회결과는 저장되지 않습니다.</BulletListItem>
                      </BulletList>
                    </Gcol>
                  </Grid>
                </Grid>
              )}
              {buildingSelectType === '이미지로선택' && (
                <Gcol className="w-full h-full" placement="ss">
                  <FormTable caption="사업자" cols={['w-[14rem]', 'w-[calc(100%-14rem)]']}>
                    <FormRow>
                      <FormCell title={'기둥'} className="h-auto">
                        {renderImageSelectorRow('기둥')}
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'지붕'} className="h-72">
                        {renderImageSelectorRow('지붕')}
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'외벽'} className="h-72">
                        {renderImageSelectorRow('외벽')}
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </Gcol>
              )}
              <TableFold variant="accordion">
                <TableFoldHead title="소재지">
                  <Grow>
                    <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                      층/면적반영
                    </Button>
                  </Grow>
                </TableFoldHead>
                <TableFoldBody>
                  <FormTable
                    caption="사업자"
                    cols={['w-[14rem]', 'w-[calc(50%-14rem)]', 'w-[14rem]', 'w-[calc(50%-14rem)]']}
                  >
                    <FormRow>
                      <FormCell
                        title={
                          <Grow placement="sc">
                            소재지
                            <EssentialIcon />
                          </Grow>
                        }
                        colSpan={3}
                      >
                        소재지정보 text text text
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'건물급수'} colSpan={3}>
                        <Grow>
                          <Input value={'김한화'} width={75} readOnly />
                          <Typo variant="body-sm" className="shrink-0">
                            급(적용급수)
                          </Typo>
                          <NativeSelect
                            aria-label="조회구분 선택"
                            width="20rem"
                            value={'선택'}
                            required
                            onChange={() => ''}
                          >
                            {[
                              { value: 'selection', id: 'type01', label: '선택1' },
                              { value: 'selection2', id: 'type02', label: '선택2' },
                            ].map((option) => (
                              <NativeSelectOption key={option.id} value={option.value}>
                                {option.label}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                          <Typo variant="body-sm" className="shrink-0">
                            건축년도
                          </Typo>
                          <Input value={''} width={75} readOnly />
                        </Grow>
                        <Input value={''} width={'full'} readOnly />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'전체증수'} colSpan={3}>
                        지상
                        <Input value={''} width={75} required />
                        층 / 지하
                        <Input value={''} width={75} required />층
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'보험가입층수'}>
                        <RadioGroup
                          value={insuredFloorType ?? ''}
                          onValueChange={(value) => {
                            if (value === '전체' || value === '일부') {
                              setInsuredFloorType(value);
                            }
                          }}
                        >
                          {[
                            { value: '전체', label: '전체' },
                            { value: '일부', label: '일부' },
                          ].map((option) => (
                            <RadioGroupItem key={option.value} value={option.value}>
                              {option.label}
                            </RadioGroupItem>
                          ))}
                        </RadioGroup>
                      </FormCell>
                      <FormCell title={'가입면적'}>
                        <Input value={''} width={70} readOnly />
                        ㎡ ↔
                        <Input value={''} width={70} readOnly />평
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'세부장소'} colSpan={3}>
                        <Input
                          value={detailPlace}
                          width={400}
                          onChange={(e) => setDetailPlace(e.target.value)}
                          readOnly={insuredFloorType === '전체'}
                        />
                        입력예시: 2층 201호
                      </FormCell>
                    </FormRow>
                  </FormTable>
                </TableFoldBody>
              </TableFold>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
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

export default Ltpz059;
