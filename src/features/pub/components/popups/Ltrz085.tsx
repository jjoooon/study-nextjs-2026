'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';
import { SearchIcon } from '@icons';
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
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltrz085 = ({ open, onOpenChange }: PopupBaseProps) => {
  type DummyDataType = {
    id: number;
    isCheck: boolean;
    type: string;
    designNo: string;
    policyNo: string;
    status: string;
    changeDate: string;
    paymentStatus: string;
    productName: string;
    contractor: string;
    insured: string;
    detailCondition: boolean;
    mandatoryYn: string;
  };

  const dummyData: DummyDataType[] = [
    {
      id: 1,
      isCheck: false,
      type: '계약변경',
      designNo: 'LA260209313558',
      policyNo: 'LA260209313558',
      status: '청약중',
      changeDate: '2026-03-22',
      paymentStatus: 'TEXT',
      productName: '한화실손의료보험(갱신형)2601',
      contractor: '김한화',
      insured: '변경조건적용',
      detailCondition: true,
      mandatoryYn: 'Y',
    },
    {
      id: 2,
      isCheck: false,
      type: '만기예정',
      designNo: 'LA260209313558',
      policyNo: 'LA260209313558',
      status: '정상',
      changeDate: '2026-03-22',
      paymentStatus: 'TEXT',
      productName: '한화실손의료보험(갱신형)2601',
      contractor: '김한화',
      insured: '변경조건적용',
      detailCondition: true,
      mandatoryYn: 'N',
    },
    {
      id: 3,
      isCheck: false,
      type: '만기예정',
      designNo: 'LA260209313558',
      policyNo: 'LA260209313558',
      status: '청약중',
      changeDate: '2026-03-22',
      paymentStatus: '',
      productName: '한화실손의료보험(갱신형)2601',
      contractor: '김한화',
      insured: '변경조건적용',
      detailCondition: true,
      mandatoryYn: 'N',
    },
    {
      id: 4,
      isCheck: false,
      type: '선택',
      designNo: 'LA260209313558',
      policyNo: '',
      status: '',
      changeDate: '',
      paymentStatus: '',
      productName: '',
      contractor: '',
      insured: '',
      detailCondition: true,
      mandatoryYn: 'Y',
    },
  ];

  const [relationValue, setRelationValue] = useState('');
  const [rowData, setRowData] = useState<DummyDataType[]>(dummyData);
  const [, setErrorRows] = useState<number[]>(dummyData.filter((row) => !row.isCheck).map((row) => row.id));

  // 설계번호/증권번호 + 검색버튼 렌더러
  const designNoCellRenderer = (params: ICellRendererParams<DummyDataType>) => {
    return (
      <Grow className="h-full w-full">
        <Grow className="flex-1">
          <span>{String(params.value ?? '')}</span>
        </Grow>
        <Grow className="border-l border-[#ddddde] h-full aspect-auto w-[3rem] flex items-center justify-center shrink-0">
          <Button aria-label="검색" variant={'none'} only="icon" size={'sm'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
        </Grow>
      </Grow>
    );
  };

  // 상세조건 검색버튼 렌더러
  const detailConditionRenderer = () => {
    return (
      <Grow className="h-full w-full items-center justify-center">
        <Button aria-label="상세조건" variant={'none'} only="icon" size={'sm'}>
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
      </Grow>
    );
  };

  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '구분',
      field: 'type',
      width: 100,
      cellClass: 'text-center editable-cell',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['선택', '계약변경', '만기예정', '해약예정', '삭제예정'],
      },
    },
    {
      headerName: '설계번호/증권번호',
      field: 'designNo',
      flex: 1,
      minWidth: 160,
      cellClass: 'text-center p-0!',
      cellRenderer: designNoCellRenderer,
    },
    {
      headerName: '상태',
      field: 'status',
      width: 60,
      cellClass: 'text-center',
    },
    {
      headerName: '변경일자',
      field: 'changeDate',
      width: 100,
      cellClass: 'text-center',
    },
    {
      headerName: '지급여부',
      field: 'paymentStatus',
      width: 60,
      cellClass: 'text-center',
    },
    {
      headerName: '상품명',
      field: 'productName',
      flex: 1,
      minWidth: 180,
      cellClass: 'text-center',
    },
    {
      headerName: '계약자',
      field: 'contractor',
      width: 60,
      cellClass: 'text-center',
    },
    {
      headerName: '피보험자(명)',
      field: 'insured',
      width: 110,
      cellClass: 'text-center',
    },
    {
      headerName: '상세조건',
      field: 'detailCondition',
      width: 60,
      cellClass: 'text-center px-0!',
      cellRenderer: detailConditionRenderer,
    },
    {
      headerName: '필수이행여부',
      field: 'mandatoryYn',
      width: 80,
      cellClass: 'text-center editable-cell',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Y', 'N'],
      },
    },
  ];

  const onCellValueChanged = useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="2xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              변경조건
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTRZ085)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr_auto]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable
              caption="보험정보"
              cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}
              variant="head"
            >
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={'15rem'} value={'LA260209313558'} readOnly />
                  -
                  <Input aria-label="" width={'3rem'} value={'1'} readOnly />
                </FormCell>
                <FormCell title={'보험시기'}>2026-03-01</FormCell>
                <FormCell title={'설계상태'}>TEXT</FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'피보험자'} colSpan={3}>
                  <NativeSelect
                    aria-label="피보험자 선택"
                    width="10rem"
                    value={relationValue}
                    onChange={(e) => setRelationValue(e.target.value)}
                  >
                    {[
                      { value: '', id: 'insured-0', label: '선택' },
                      { value: 'insured1', id: 'insured-1', label: '선택1' },
                      { value: 'insured2', id: 'insured-2', label: '선택2' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <Gcol placement={'ss'} className="w-full">
            <TableFold variant="accordion">
              <TableFoldHead title="변경조건 설계/계약">
                <Grow>
                  <Button id="btnCA" variant={'outlined'} size={'xl'} color={'gray'}>
                    행추가
                  </Button>
                  <Button id="btnDA" variant={'outlined'} size={'xl'} color={'gray'}>
                    행삭제
                  </Button>
                </Grow>
              </TableFoldHead>
              <TableFoldBody>
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType>
                    getRowId={(params) => String(params.data.id)}
                    noRowsOverlayComponent={AgGridEmptyComponent}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                      sortable: false,
                      resizable: false,
                      cellClass: 'p-0',
                      cellStyle: { padding: 0 },
                    }}
                    singleClickEdit={true}
                    onCellValueChanged={onCellValueChanged}
                    rowSelection={{
                      mode: 'singleRow',
                      checkboxes: true,
                      enableClickSelection: false,
                    }}
                    selectionColumnDef={{
                      headerName: '선택',
                      width: 60,
                      cellClass: 'text-center editable-cell',
                    }}
                    domLayout="autoHeight"
                    onGridReady={(params) => {
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
          </Gcol>

          <Gcol placement={'ss'} variant={'box-info'} className="w-full">
            <Typo variant={'body-md'} icon={'info'}>
              <b>필수 확인 사항</b>
            </Typo>
            <BulletList color={'info'} size="md">
              <BulletListItem before="1." type="symbols">
                변경조건은 등록된 설계/증권번호의 누적을 예외처리하는 기능으로 <em>청약진행 이후 수정/삭제 불가능.</em>
              </BulletListItem>
              <BulletListItem before="2." type="symbols">
                만기예정/해약예정은 청약완료시 청약상태가 완성되어 있어야 함. (해약, 철회, 취소의 경우 지급환급 포함)
              </BulletListItem>
              <BulletListItem before="3." type="symbols">
                삭제예정은 등록된 설계는 청약완료시 자동으로 삭제.{' '}
                <Typo
                  tag="em"
                  icon="detail"
                  className="[&_svg_path]:stroke-(--color-information-50) [&_svg_circle]:fill-(--color-information-50)"
                >
                  GA:타모집인 설계는 취급지에서 삭제 필요.
                </Typo>
              </BulletListItem>
              <BulletListItem before="4." type="symbols">
                * 표시된 설계번호는 삭제예정으로 서로 연결된 변경조건
                <BulletList color={'warning'} size="md">
                  <BulletListItem before="①" type="symbols">
                    삭제예정 설계 중 먼저 청약완료 된 설계 있에는 모든 설계 삭제
                  </BulletListItem>
                  <BulletListItem before="②" type="symbols">
                    * 표시의 변경조건 수정 필요시 해당 설계군으로 화면이동하여 처리 필요
                  </BulletListItem>
                  <BulletListItem before="③" type="symbols">
                    * 표시된 경우 누적 예외 미적용 (누적예외가 필요한 경우 행추가 후 직접 등록 필요)
                  </BulletListItem>
                </BulletList>
              </BulletListItem>
            </BulletList>
          </Gcol>
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
