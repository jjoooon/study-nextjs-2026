/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import type { CellClickedEvent, ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { editableCellClassRules } from '@/features/pub/ispl/cvrPl/utils/agGridUtils';
import { withPublicUrl } from '@/shared/utils/url/publicUrl';
import { Gcol, Grid, Grow, Typo } from '@atoms';
import { ArrowIcon, EssentialIcon } from '@icons';
import { AgGridEmptyComponent, useDynamicColumnWidths } from '@aggrid';
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
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldBody, TableFoldHead } from '@common/TableFold';
import { createExpiryCellRenderer } from '@grid/CellRenderers';

import '@/shared/lib/agGridPub';

/**
 * 기둥/지붕/외벽 등 구조 선택용 공통 데이터 타입
 */
type DummyDataType = {
  id: number;
  isCheck: boolean;
  field01: string | number;
};

/**
 * 기둥(구조) 선택을 위한 그리드 더미 데이터 목록
 */
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

/**
 * 지붕 선택을 위한 그리드 더미 데이터 타입 및 목록
 */
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

/**
 * 외벽 선택을 위한 그리드 더미 데이터 타입 및 목록
 */
type DummyDataType3 = {
  id: number;
  isCheck: boolean;
  field01: string | number;
};

/**
 * 기둥/지붕/외벽 구조 선택 그리드에서 공통으로 처리하기 위한 셀 선택 데이터 타입
 */
type SelectableStructureDataType = DummyDataType | DummyDataType2 | DummyDataType3;

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

/**
 * 우측 건축물대장 그리드 데이터 타입 정의
 * - rowType: 행의 렌더링 목적('normal': 일반 입력 데이터, 'title': 섹션 헤더, 'spacer': 레이아웃용 공백)
 */
type DummyDataType4 = {
  id: number;
  field01: string | number;
  field02: string | number;
  rowType?: 'normal' | 'title' | 'spacer';
};

/**
 * 이미지 선택 모드에서 기둥, 지붕, 외벽 탭을 구분하는 리터럴 타입
 */
type ImageSectionType = '기둥' | '지붕' | '외벽';

/**
 * 이미지 선택 모드의 각 이미지 카드 정보 타입
 */
type ImageItemType = {
  id: number;
  src: string;
  label: string;
};

/**
 * 보험 가입 층수의 범위 타입 ('전체' | '일부')
 */
type InsuredFloorType = '전체' | '일부' | null;

/**
 * 이미지 선택 시 슬라이드 당 표시할 이미지 수
 */
const IMAGE_PAGE_SIZE = 5;

/**
 * 이미지 선택 모드용 기둥, 지붕, 외벽 썸네일 이미지 및 라벨 설정
 */
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

/**
 * 우측 건축물대장 그리드용 더미 데이터
 * - 표제부 타이틀, 동명, 기둥 등의 일반 행, 빈 행, 전유부 타이틀 및 호칭명 등을 계층화하여 표현
 */
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

/**
 * 건물구조입력 다이얼로그 (Ltpz059)
 * - 기둥, 지붕, 외벽의 자재 방식을 AG Grid 테이블 혹은 이미지 썸네일을 통해 선택할 수 있는 입력 폼 제공
 * - 조회 결과 매칭을 위한 건축물대장 표시 영역 포함
 * - 소재지 정보(건물급수, 전체층수, 보험가입층수, 세부장소) 입력 폼 제공
 */
const Ltpz059 = () => {
  // AG Grid 열 크기 조절을 위한 훅
  const { attributeColumnWidth } = useDynamicColumnWidths();

  // 건축물대장 그리드에서 현재 편집(활성화) 중인 필드의 이름 저장 ('동명' 또는 '호칭명')
  const [editableFieldName, setEditableFieldName] = React.useState<string | null>(null);

  // 보험가입층수 선택 상태 관리 ('전체' | '일부')
  const [insuredFloorType, setInsuredFloorType] = React.useState<InsuredFloorType>(null);

  // 소재지 세부장소 입력 필드 상태
  const [detailPlace, setDetailPlace] = React.useState<string>('');

  // 이미지 선택 모드 시, 각 섹션(기둥/지붕/외벽)별 현재 캐러셀 페이지 번호 저장
  const [imagePageBySection, setImagePageBySection] = React.useState<Record<ImageSectionType, number>>({
    기둥: 0,
    지붕: 0,
    외벽: 0,
  });

  // 이미지 선택 모드 시, 각 섹션별 최종 선택된 이미지 카드 ID 저장
  const [selectedImageIdBySection, setSelectedImageIdBySection] = React.useState<
    Record<ImageSectionType, number | null>
  >({
    기둥: null,
    지붕: null,
    외벽: null,
  });

  // AG Grid 셀 내 텍스트 정렬 및 UI 처리를 위한 헬퍼 렌더러
  const getExpiryRenderer = createExpiryCellRenderer<DummyDataType4>;

  /**
   * 타이틀 이름에 따라 편집 가능한 속성 필드 매핑 반환
   * - '표제부' 조회 -> '동명' 수정 활성화
   * - '전유부' 조회 -> '호칭명' 수정 활성화
   */
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

  /**
   * 행 데이터가 단순 레이아웃용(헤더 타이틀 또는 공백 여백)이 아닌 실데이터 입력 행인지 판별
   */
  const isValueRow = (data?: DummyDataType4): data is DummyDataType4 => {
    if (!data) {
      return false;
    }

    return data.rowType !== 'title' && data.rowType !== 'spacer';
  };

  /**
   * 건축물대장 그리드 내에서 해당 행이 수정 가능한 활성 필드인지 여부 판단
   */
  const isEditableRow = (data?: DummyDataType4): boolean => {
    if (!isValueRow(data)) {
      return false;
    }

    return String(data.field01) === editableFieldName;
  };

  /**
   * 입력된 셀 값이 비어있는지 확인
   */
  const isEmptyCellValue = (value: string | number | null | undefined): boolean => String(value ?? '') === '';

  /**
   * 이미지 섹션별 전체 개수 기반의 최대 캐러셀 페이지 수 계산
   */
  const getMaxImagePage = (section: ImageSectionType) =>
    Math.max(Math.ceil(imageItemsBySection[section].length / IMAGE_PAGE_SIZE) - 1, 0);

  /**
   * 이미지 슬라이더의 이전/다음 페이지 네비게이션 제어
   */
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

  /**
   * 각 이미지 섹션의 현재 슬라이더 페이지에 렌더링할 5개 이미지 슬라이스 반환
   */
  const getVisibleImageItems = (section: ImageSectionType): ImageItemType[] => {
    const startIndex = imagePageBySection[section] * IMAGE_PAGE_SIZE;

    return imageItemsBySection[section].slice(startIndex, startIndex + IMAGE_PAGE_SIZE);
  };

  /**
   * 기둥/지붕/외벽 그리드의 리스트 셀을 클릭 시 selection 상태를 토글하는 이벤트 핸들러
   */
  const handleStructureLabelCellClicked = (params: CellClickedEvent<SelectableStructureDataType>) => {
    if (params.colDef.field !== 'field01') {
      return;
    }

    const isSelected = params.node.isSelected();

    params.node.setSelected(!isSelected);
  };

  /**
   * 이미지로 선택 모드 시 사용될 가로 슬라이더(캐러셀) UI 렌더링 헬퍼 함수
   */
  const renderImageSelectorRow = (section: ImageSectionType) => {
    const currentPage = imagePageBySection[section];
    const visibleItems = getVisibleImageItems(section);

    return (
      <Grow className="h-[18rem]">
        {/* 이전 이미지 리스트 슬라이드 버튼 */}
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
        {/* 이미지 리스트 영역 */}
        <div className="flex gap-2 w-[90.7rem]">
          {visibleItems.map((item) => (
            <Gcol key={`${section}-${item.id}`} className="w-70 shrink-0">
              <img
                src={withPublicUrl(item.src)}
                alt={item.label}
                onClick={() => {
                  setSelectedImageIdBySection((prev) => ({
                    ...prev,
                    [section]: item.id,
                  }));
                }}
                className={`border border-solid w-[175rem] h-[13rem] aspect-square object-cover cursor-pointer ${
                  selectedImageIdBySection[section] === item.id
                    ? 'border-[#FF5C2E] shadow-[0_0.2rem_0.2rem_0_rgba(255,92,46,0.20)]'
                    : 'border-[#D8D8D8]'
                }`}
              />
              <Typo className="text-center w-full h-[4.3rem] min-h-[4.3rem]">{item.label}</Typo>
            </Gcol>
          ))}
        </div>
        {/* 다음 이미지 리스트 슬라이드 버튼 */}
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

  /**
   * 우측 건축물대장 그리드 열 구성
   * - 3개의 컬럼 영역을 rowType에 맞춰 병합(colSpan)하여 유동적인 레이아웃 제공
   */
  const columnDefs4: (ColDef<DummyDataType4> | ColGroupDef<DummyDataType4>)[] = [
    {
      headerName: '건축물대장',
      headerClass: 'ag-visible',
      children: [
        {
          headerName: '',
          field: 'field01',
          width: attributeColumnWidth(80),
          cellClass: 'text-left flex!',
          // 구분선(spacer) 행인 경우 한 줄로 3개 열 합치기
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
          // title 행(표제부/전유부 헤더)일 경우 버튼들을 위해 1칸만 할당, 그 외에는 2칸을 합쳐 넓게 씀
          colSpan: ({ data }) => (data?.rowType === 'title' ? 1 : 2),
          cellClassRules: editableCellClassRules<DummyDataType4>(),
          cellClass: ({ data }) => {
            const base = 'text-center px-[0.2rem]! tracking-tighter';

            if (!isValueRow(data)) {
              return base;
            }

            return isEditableRow(data) ? base : `${base} no-edited`;
          },
          // 현재 활성화 및 입력 가능한 항목일 때만 편집 상태 진입 가능
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
              // 표제부/전유부 헤더의 우측 첫 번째 조회 버튼
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
              // 편집 가능하고 비어있을 때는 화살표 콤보박스 아이콘 렌더링
              <span className="flex w-full h-full items-center justify-end pr-2">
                <img
                  src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ag-icon%22%20fill%3D%22black%22%20stroke%3D%22none%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M7.334%2010.667%2016%2021.334l8.667-10.667H7.334Z%22%2F%3E%3C%2Fsvg%3E"
                  alt="select-arrow"
                  className="w-[1.8rem]! h-[1.8rem]!"
                />
              </span>
            ) : (
              // 만료일 처리가 가미된 텍스트 셀 렌더러
              getExpiryRenderer('center')(params)
            ),
        },
        {
          flex: 1,
          cellClass: 'text-center',
          cellRenderer: ({ data }: { data?: DummyDataType4 }) =>
            data?.rowType === 'title' ? (
              // 표제부/전유부 헤더의 우측 두 번째 발급 버튼
              <Button color="gray" onClick={() => {}} only="default" size="sm" variant="contained">
                발급
              </Button>
            ) : null,
        },
      ],
    },
  ];

  // 건물구조 선택 유형 ('건물구조선택' | '이미지로선택')
  const [buildingSelectType, setBuildingSelectType] = React.useState<string>('건물구조선택');
  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} className="w-[110.4rem]">
        {/* 팝업 상단 타이틀 */}
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

        {/* 팝업 본문 영역 */}
        <DialogSection className="flex flex-col w-full">
          {/* 아코디언 섹션 1: 건물구조입력 */}
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
              {/* 입력 선택 라디오 그룹 */}
              <Grow placement="bwc" className="w-full" variant={'box-round'}>
                <RadioGroup
                  defaultValue="건물구조선택"
                  onValueChange={(value) => setBuildingSelectType(value)}
                  className="gap-3"
                >
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

              {/* [분기 1] 텍스트 목록 그리드로 선택할 경우 */}
              {buildingSelectType === '건물구조선택' && (
                <Grid className="w-full h-full grid-cols-[2fr_2fr_2fr_4fr] gap-3">
                  {/* 기둥 그리드 */}
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
                        mode: 'singleRow',
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '선택',
                        width: 30,
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      onCellClicked={handleStructureLabelCellClicked}
                    />
                  </div>
                  {/* 지붕 그리드 */}
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
                        mode: 'singleRow',
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '선택',
                        width: 30,
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      onCellClicked={handleStructureLabelCellClicked}
                    />
                  </div>
                  {/* 외벽 그리드 */}
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
                        mode: 'singleRow',
                        checkboxes: true,
                        enableClickSelection: false,
                      }}
                      selectionColumnDef={{
                        headerName: '선택',
                        width: 30,
                      }}
                      domLayout="normal"
                      tooltipShowMode="whenTruncated"
                      tooltipShowDelay={0}
                      onCellClicked={handleStructureLabelCellClicked}
                    />
                  </div>
                  {/* 건축물대장 그리드 및 주의사항 */}
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
                    {/* 하단 주의사항 경고 박스 */}
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

              {/* [분기 2] 시각 자료 이미지 카드로 선택할 경우 */}
              {buildingSelectType === '이미지로선택' && (
                <Gcol className="w-full h-full" placement="ss">
                  <FormTable caption="사업자" cols={['w-[6rem]', 'w-auto']}>
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
            </TableFoldBody>
          </TableFold>

          {/* 아코디언 섹션 2: 소재지 상세 입력 */}
          <TableFold variant="accordion">
            <TableFoldHead title="소재지">
              <Grow>
                <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                  층/면적반영
                </Button>
                {/* 2026-05-22 button 추가 */}
                <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
                  복합건물
                </Button>
              </Grow>
            </TableFoldHead>
            <TableFoldBody>
              <FormTable caption="사업자" cols={['w-[10rem]', 'w-[20rem]', 'w-[10rem]', 'w-auto']}>
                {/* 소재지 텍스트 노출 행 */}
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
                {/* 건물급수 및 적용년도 입력 행 */}
                <FormRow>
                  <FormCell title={'건물급수'} colSpan={3}>
                    <Grid className="w-full grid-cols-[8.6rem_auto_10rem_auto_8rem_1fr] place-items-center">
                      <Input value={'김한화한화'} readOnly />
                      <Typo variant="body-sm">급(적용급수)</Typo>
                      <NativeSelect aria-label="조회구분 선택" value={'선택'} required onChange={() => ''}>
                        {[
                          { value: 'selection', id: 'type01', label: '선택1' },
                          { value: 'selection2', id: 'type02', label: '선택2' },
                        ].map((option) => (
                          <NativeSelectOption key={option.id} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <Typo variant="body-sm">건축년도</Typo>
                      <Input readOnly />
                      <Input readOnly />
                    </Grid>
                  </FormCell>
                </FormRow>
                {/* 지상/지하 전체층수 입력 행 */}
                <FormRow>
                  <FormCell title={'전체증수'} colSpan={3}>
                    지상
                    <Input width={40} align="right" required />
                    층 / 지하
                    <Input width={32} align="right" required />층
                  </FormCell>
                </FormRow>
                {/* 보험가입층수 라디오 및 가입면적 노출 행 */}
                <FormRow>
                  <FormCell title={'보험가입층수'}>
                    {/* 2026-05-27 radio 수정 */}
                    <RadioGroup
                      className="gap-3"
                      value={insuredFloorType ?? ''}
                      onValueChange={(value) => {
                        if (value === '전체' || value === '일부') {
                          setInsuredFloorType(value);
                          if (value === '일부') {
                            setDetailPlace('');
                          }
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
                    <Input width={70} align="right" readOnly />
                    ㎡ ↔
                    <Input width={70} align="right" readOnly />평
                  </FormCell>
                </FormRow>
                {/* 세부장소 입력 행 */}
                <FormRow>
                  <FormCell title={'세부장소'} colSpan={3}>
                    <Grid className="w-full grid-cols-[1fr_auto] place-items-center">
                      <Input
                        value={detailPlace}
                        onChange={(e) => setDetailPlace(e.target.value)}
                        // 가입층수가 '전체'일 경우 읽기 전용 및 플레이스홀더 제공
                        readOnly={insuredFloorType === '전체'}
                        placeholder={insuredFloorType === '전체' ? '건물전체' : undefined}
                      />
                      <p>입력예시: 2층 201호</p>
                    </Grid>
                  </FormCell>
                </FormRow>
              </FormTable>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        {/* 팝업 하단 푸터 영역 */}
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
