'use client';

import type { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createFieldRenderer } from '@aggrid';
import { Grow, Typo, Grid } from '@atoms';
import { DatePickerInput } from '@common/DatePicker';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TablePagination } from '@common/TablePagination';
import { QuestionMark, ResetIcon, SearchIcon, FileExportIcon } from '@icons';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Table, TableBody, TableHead, TableHeader, TableCell, TableRow } from '@uiux/Table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';

import '@/shared/lib/agGridPub';

// Grid dummy data
type DummyDataType = {
  id: number;
  isCheck: boolean;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  field06: string | number;
  field07: string | number;
  field08: string | number;
  field09: string | number;
  field10: string | number;
  field11: string | number;
  field12: string | number;
  field13: string | number;
  field14: string | number;
  field15: string | number;
};
const DummyData: DummyDataType[] = [
  {
    id: 1,
    isCheck: false,
    field01: '안형민',
    field02: '1234567',
    field03: '900101',
    field04: '김한화',
    field05: '106289225',
    field06: '스캔(개인)',
    field07: '정상',
    field08: '보기',
    field09: '동의(전체)',
    field10: '동의(전체)',
    field11: '수동',
    field12: '2026-01-01',
    field13: '2026-01-01 00:00:00',
    field14: '',
    field15: '',
  },
  {
    id: 2,
    isCheck: false,
    field01: '에이플러스',
    field02: '3484604',
    field03: '900101',
    field04: '김한화',
    field05: '106289225',
    field06: '',
    field07: '',
    field08: '보기',
    field09: '미동의',
    field10: '미동의',
    field11: '수동',
    field12: '2026-01-01',
    field13: '2026-01-01 00:00:00',
    field14: '',
    field15: '',
  },
  {
    id: 3,
    isCheck: false,
    field01: '안형민',
    field02: '1234567',
    field03: '900101',
    field04: '',
    field05: '고객찾기',
    field06: '넷팩스(개인)',
    field07: '',
    field08: '보기',
    field09: '동의(전체)',
    field10: '동의(전체)',
    field11: '수동',
    field12: '2026-01-01',
    field13: '2026-01-01 00:00:00',
    field14: '',
    field15: '',
  },
  {
    id: 4,
    isCheck: false,
    field01: '안형민',
    field02: '1234567',
    field03: '900101',
    field04: '',
    field05: '고객찾기',
    field06: '휴대폰(LMS)',
    field07: '',
    field08: '보기',
    field09: '동의(전체)',
    field10: '동의(전체)',
    field11: '자동',
    field12: '2026-01-01',
    field13: '2026-01-01 00:00:00',
    field14: '',
    field15: '',
  },
  {
    id: 5,
    isCheck: false,
    field01: '',
    field02: '',
    field03: '',
    field04: '',
    field05: '',
    field06: '',
    field07: '',
    field08: '',
    field09: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
  },
  {
    id: 6,
    isCheck: false,
    field01: '안형민',
    field02: '1234567',
    field03: '900101',
    field04: '김한화',
    field05: '123456789',
    field06: '카카오인증',
    field07: '정상',
    field08: '보기',
    field09: '동의(전체)',
    field10: '동의(전체)',
    field11: '',
    field12: '2026-01-01',
    field13: '2026-01-01 00:00:00',
    field14: '2026-01-01 00:00:00',
    field15: '',
  },
  {
    id: 7,
    isCheck: false,
    field01: '안형민',
    field02: '1234567',
    field03: '900101',
    field04: '김한화',
    field05: '123456789',
    field06: '카카오인증',
    field07: '정상',
    field08: '보기',
    field09: '동의(전체)',
    field10: '동의(전체)',
    field11: '',
    field12: '2026-01-01',
    field13: '2026-01-01 00:00:00',
    field14: '2026-01-01 00:00:00',
    field15: '',
  },
];

export const Ltpa130 = ({ open, onOpenChange }: PopupBaseProps) => {
  const renderConsentCell = (params: ICellRendererParams<DummyDataType>) => {
    const value = String(params.value ?? '');

    if (value === '미동의') {
      return <Typo>{value}</Typo>;
    }

    return (
      <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
        {value}
      </Button>
    );
  };

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '취급직원',
      width: 150,
      field: 'field01',
      autoHeight: true,
      spanRows: true,
      cellRenderer: createFieldRenderer<DummyDataType>('field01', 'field02', 'row'),
    },
    {
      headerName: '생년월일',
      width: 80,
      field: 'field03',
      autoHeight: true,
    },
    {
      headerName: '고객명',
      width: 80,
      field: 'field04',
      autoHeight: true,
    },
    {
      headerName: '고객번호',
      width: 90,
      field: 'field05',
      autoHeight: true,
      cellStyle: (params) => {
        const value = String(params.value ?? '');
        return value === '고객찾기' ? { backgroundColor: '#E6F0FF' } : undefined;
      },
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        const value = String(params.value ?? '');

        if (value === '고객찾기') {
          return (
            <Button color="secondary" onClick={() => {}} only="default" size="sm" variant="contained">
              {value}
            </Button>
          );
        }

        return <Typo>{value}</Typo>;
      },
    },
    {
      headerName: '동의구분',
      width: 100,
      field: 'field06',
      autoHeight: true,
    },
    {
      headerName: '등록상태',
      width: 80,
      field: 'field07',
      autoHeight: true,
    },
    {
      headerName: '상세',
      width: 70,
      field: 'field08',
      autoHeight: true,
      cellRenderer: (_params: ICellRendererParams<DummyDataType>) => (
        <Grow className="w-full px-1">
          보기
          <Button
            aria-label="질병 상세내용 보기"
            variant={'outlined'}
            only="icon"
            size={'md'}
            color={'gray-light'}
            onClick={handleOpenDetailPopup}
          >
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grow>
      ),
    },
    {
      headerName: '수집이용조회',
      width: 90,
      field: 'field09',
      autoHeight: true,
      cellRenderer: renderConsentCell,
    },
    {
      headerName: '제3자제공',
      width: 90,
      field: 'field10',
      autoHeight: true,
      cellRenderer: renderConsentCell,
    },
    {
      headerName: '등록방법',
      width: 70,
      field: 'field11',
      autoHeight: true,
    },
    {
      headerName: '동의일자',
      width: 90,
      field: 'field12',
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        const value = String(params.value ?? '');
        const isNotAgreed = params.data?.field09 === '미동의' || params.data?.field10 === '미동의';

        if (isNotAgreed) {
          return <Typo>{value}</Typo>;
        }

        return (
          <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
            {value}
          </Button>
        );
      },
    },
    {
      headerName: '등록일시',
      width: 120,
      field: 'field13',
      autoHeight: true,
    },
    {
      headerName: '철회요청일시',
      width: 120,
      field: 'field14',
      autoHeight: true,
    },
    {
      headerName: '철회사유',
      width: 170,
      field: 'field15',
      autoHeight: true,
    },
  ];
  const [rowData] = React.useState<DummyDataType[]>(DummyData);
  const pageSize = 5;
  const gridRef = React.useRef<AgGridReact<DummyDataType>>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const handleGridReady = (params: GridReadyEvent<DummyDataType>) => {
    setTotalPages(Math.max(1, params.api.paginationGetTotalPages()));
  };

  const handlePaginationChanged = () => {
    if (gridRef.current?.api) {
      setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1);
      setTotalPages(Math.max(1, gridRef.current.api.paginationGetTotalPages()));
    }
  };

  // const handleSelectionChanged = () => {
  //   gridRef.current?.api?.refreshCells({ force: true, columns: ['radio-select'] });
  // };

  const handlePageChange = (page: number) => {
    if (gridRef.current?.api) {
      gridRef.current.api.paginationGoToPage(page - 1);
    }
  };

  // TODO: 상세 팝업 컴포넌트 연결 필요
  const handleOpenDetailPopup = () => {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl" className="">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가입설계동의 현황조회
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA130)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className="grid-rows-[auto_1fr] gap-3">
          <Grow className="w-full" variant="box-round" placement={'bwe'}>
            <FormTable variant={'none'} cols={['w-[6rem]', 'w-[20rem]', 'w-[8rem]', 'w-auto', 'w-[8rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'조직구분'}>
                  <NativeSelect width={100}>
                    {[
                      { value: '전체', label: '전체' },
                      { value: '취급기관', label: '취급기관' },
                      { value: '취급직원', label: '취급직원' },
                      { value: '사용인', label: '사용인' },
                    ].map((option, index) => (
                      <NativeSelectOption key={index} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Input value={'1301097'} width={80} />
                  <Button variant={'outlined'} only={'icon'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Input value={'신부산GA지점'} readOnly />
                </FormCell>
                <FormCell title={'조회일자'} colSpan={3}>
                  <DatePickerInput mode={'range'} />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button only="icon" size="md" variant="none">
                        <QuestionMark color="#61554F" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      sideOffset={1}
                      variant="default"
                      className="z-[999] [&>span]:whitespace-auto!"
                    >
                      {`1년 이전건은 조회불가합니다.`}
                    </TooltipContent>
                  </Tooltip>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'조회구분'}>
                  <NativeSelect width={100}>
                    <NativeSelectOption value="">주민번호</NativeSelectOption>
                    <NativeSelectOption value="">생년월일</NativeSelectOption>
                  </NativeSelect>
                  <Input value={''} width={130} />
                  <Button variant={'outlined'} only={'icon'} color={'gray-light'}>
                    <SearchIcon color={'var(--color-primary-50)'} />
                  </Button>
                  <Input value={''} width={80} readOnly />
                  <Checkbox color="primary" size="lg" variant="default">
                    <span className="whitespace-nowrap">교차제외</span>
                  </Checkbox>
                </FormCell>
                <FormCell title={'동의구분'}>
                  <NativeSelect width={'auto'}>
                    {[
                      { value: '전체', label: '전체' },
                      { value: '스캔(개인)', label: '스캔(개인)' },
                      { value: '스캔(변경,단체)', label: '스캔(변경,단체)' },
                      { value: '넷팩스(개인)', label: '넷팩스(개인)' },
                      { value: '넷팩스(변경,단체)', label: '넷팩스(변경,단체)' },
                      { value: '휴대폰(LMS)', label: '휴대폰(LMS)' },
                      { value: '휴대폰(홈페이지)', label: '휴대폰(홈페이지)' },
                      { value: '공인인증서', label: '공인인증서' },
                      { value: '음성녹음', label: '음성녹음' },
                      { value: '방카', label: '방카' },
                      { value: '카드인증', label: '카드인증' },
                      { value: '카카오인증', label: '카카오인증' },
                      { value: '네이버인증', label: '네이버인증' },
                      { value: '전자서명', label: '전자서명' },
                      { value: '사진인식', label: '사진인식' },
                      { value: '토스인증', label: '토스인증' },
                      { value: 'PASS인증', label: 'PASS인증' },
                      { value: 'PIN인증', label: 'PIN인증' },
                      { value: '지문/Face ID인증', label: '지문/Face ID인증' },
                      { value: '금융인증서', label: '금융인증서' },
                      { value: 'ARS', label: 'ARS' },
                    ].map((option, index) => (
                      <NativeSelectOption key={index} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
                <FormCell title={'등록상태'}>
                  <NativeSelect width={'auto'}>
                    {[
                      { value: '전체', label: '전체' },
                      { value: '정상', label: '정상' },
                      { value: '확인대상', label: '확인대상' },
                      { value: '보완(재스캔)', label: '보완(재스캔)' },
                    ].map((option, index) => (
                      <NativeSelectOption key={index} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
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

          <Grid className="grid-rows-[1fr_auto_auto] gap-2">
            <Grid className="grid-rows-[auto_1fr_auto] gap-1">
              <Grow className="w-full justify-end">
                <Button color="success" variant="outlined">
                  엑셀내보내기
                  <FileExportIcon />
                </Button>
              </Grow>
              <div className="ag-theme-alpine radio-selection min-h-[18.3rem]">
                <AgGridReact<DummyDataType>
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  getRowId={(params) => String(params.data.id)}
                  rowData={rowData}
                  columnDefs={columnDefs}
                  defaultColDef={{
                    sortable: true,
                    resizable: true,
                    cellClass: 'text-center p-0!',
                  }}
                  // selection 설정
                  rowSelection={{
                    mode: 'singleRow',
                    checkboxes: true,
                    enableClickSelection: false,
                  }}
                  selectionColumnDef={{
                    headerName: '선택',
                    cellClass: 'text-center editable-cell',
                  }}
                  // pagination 설정 (TablePagination과 연동)
                  pagination={true} // ag-Grid의 페이징 기능 활성화
                  paginationPageSize={pageSize} // 페이지당 행 수
                  suppressPaginationPanel={true} // ag-Grid 기본 페이징 UI 숨김(커스텀 TablePagination만 노출)
                  // 페이지네이션 연동을 위한 onGridReady 핸들러
                  ref={gridRef} // ag-Grid API 접근용 ref
                  onGridReady={handleGridReady} // ag-Grid 준비 완료 시 호출(초기 API 세팅, 페이지 정보 등)
                  onPaginationChanged={handlePaginationChanged}
                />
              </div>
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={pageSize}
              />
            </Grid>
            <Grow className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>공인인증서</TableHead>
                    <TableHead>스캔(개인)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-center">4건(57.1%)</TableCell>
                    <TableCell className="text-center">3건(42.9%)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grow>
            <Grow className="w-full" variant="box-info" placement="ss">
              <Typo icon="info" variant="body-sm">
                기등록 고객의 경우 고객찾기 버튼을 통해 <b>가입설계동의</b>와 <b>고객정보</b>를 매칭시켜 주시기
                바랍니다.
              </Typo>
            </Grow>
          </Grid>
        </DialogSection>
        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                보험신용정보통합조회
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                가입설계동의녹취
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                가입설계동의
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                철회알림톡발송
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                동의철회
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
