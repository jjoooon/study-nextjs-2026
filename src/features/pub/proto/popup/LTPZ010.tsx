'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Badge } from '@uiux/Badge';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea, DialogTrigger, DialogClose } from '@uiux/Dialog';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';


import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { PlusIcon, SearchIcon } from '@icons';


import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { amountUnitInputCellRenderer, AgGridEmptyComponent, createCellValueChangedHandler, editableSelectCellRenderer, numberValueFormatter } from '@/shared/components/agGridUtils';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, EditableCallbackParams, ICellRendererParams } from 'ag-grid-community';
import type { PopupBaseProps } from './types';

ModuleRegistry.registerModules([AllCommunityModule]);


export const LTPZ010 = ({ open, onOpenChange }: PopupBaseProps) => {
    
  type DummyDataType = {
    id: number;
    isCheck: boolean;
    isDuplicate: boolean;
    productName: string;
    badge?: string[];
    attribute: boolean;
    coverageAmount: string;
    premium: number;
    expiryPeriod: string;
    paymentPeriod: string;
    canEditExpiry: boolean;
  };
    
  const dummyData: DummyDataType[] = [
    {
      id: 1,
      isCheck: false,
      isDuplicate: true,
      productName: '기본형 실손의료비(상해급여)(갱신형)',
      badge: ['갱신'],
      attribute: true,
      coverageAmount: '5천만원(통원20만원)',
      premium: 1377,
      expiryPeriod: '01년만기',
      paymentPeriod: '전기납',
      canEditExpiry: true,
    },
    {
      id: 2,
      isCheck: false,
      isDuplicate: true,
      productName: '기본형 실손의료비(상해급여)(갱신형)',
      badge: ['갱신'],
      attribute: false,
      coverageAmount: '2천만원(통원20만원)',
      premium: 9999999,
      expiryPeriod: '01년만기',
      paymentPeriod: '전기납',
      canEditExpiry: false,
    },
    {
      id: 3,
      isCheck: true,
      isDuplicate: false,
      productName: '기본형 실손의료비(상해급여)(갱신형)',
      badge: ['갱신'],
      attribute: true,
      coverageAmount: '3천만원(통원20만원)',
      premium: 159999,
      expiryPeriod: '01년만기',
      paymentPeriod: '전기납',
      canEditExpiry: false,
    },
    {
      id: 4,
      isCheck: false,
      isDuplicate: true,
      productName: '기본형 실손의료비(상해급여)(갱신형)',
      badge: ['갱신'],
      attribute: false,
      coverageAmount: '4천만원(통원20만원)',
      premium: 2323230,
      expiryPeriod: '01년만기',
      paymentPeriod: '전기납',
      canEditExpiry: false,
    },
  ];
  const amountInputRefs = useRef<Array<HTMLInputElement | null>>([]);
	const [relationValue, setRelationValue] = useState('');
	const [rowData, setRowData] = useState<DummyDataType[]>(dummyData);
	const [, setErrorRows] = useState<number[]>(dummyData.filter((row) => !row.isCheck).map((row) => row.id));
  

  //중복버튼 여부에 따른 셀 렌더러
	const duplicateRenderer = useCallback((params: ICellRendererParams<DummyDataType>) => {
    const isDuplicate = Boolean(params.value);
    return isDuplicate ? (
      <Grow className="h-full w-full items-center justify-center">
        <Button aria-label="중복" variant={'outlined'} only={'icon'} size={'sm'} color={'gray-light'} onClick={() => alert('추가')}>
          <PlusIcon color={'var(--color-gray-30)'} />
        </Button>
      </Grow>
    ) : (
      ''
    );
	}, []);

  // 검색버튼 여부에 따른 셀 렌더러
	const attributeRenderer = (params: ICellRendererParams<DummyDataType>) => {
		if (!params.value) {
			return null;
		}

		return (
			<div className="flex h-full w-full flex-wrap items-center justify-center gap-1">
				<Button only={'icon'} variant={'none'} size={'sm'}>
					<SearchIcon color={'var(--color-primary-50)'} />
				</Button>
			</div>
		);
	};

  // 담보명 셀 렌더러
  const titleRenderer = useCallback((params: ICellRendererParams<DummyDataType>) => {
    return (
      <Grow className="h-full pr-1.5" placement={'bwc'}>
        <p className="w-full flex-1 truncate pl-2">{params.data?.productName}</p>
        {params.data?.badge && (
          <Grow className="shrink-0">
            {params.data.badge.includes('갱신') && <Badge color={'blue'} className="w-[3rem]">갱신</Badge>}
          </Grow>
        )}
      </Grow>
    );
  }, []);

  // 가입금액 셀 렌더러
	const coverageAmountCellRenderer = (params: ICellRendererParams<DummyDataType>) => editableSelectCellRenderer<DummyDataType>(params);

  // 보험료 셀 렌더러
	const premiumAmountCellRenderer = (params: ICellRendererParams<DummyDataType>) =>
		amountUnitInputCellRenderer<DummyDataType>({ ...params, amountInputRefs: amountInputRefs.current });

	const columnDefs: ColDef<DummyDataType>[] = [
		{
			headerName: '중복',
			field: 'isDuplicate',
			width: 50,
			cellClass: 'text-center',
			cellRenderer: duplicateRenderer,
		},
		{
			headerName: '담보명',
			field: 'productName',
			flex: 1,
      cellRenderer: titleRenderer,
		},
		{
			headerName: '속성',
			field: 'attribute',
			width: 50,
			cellClass: 'text-center',
			cellRenderer: attributeRenderer,
		},
		{
			headerName: '가입금액(만원)',
			field: 'coverageAmount',
			width: 200,
			cellClass: () => 'w-auto text-centerleft editable-cell [&_input]:text-left!',
			sortable: false,
			filter: false,
			editable: (params: EditableCallbackParams<DummyDataType>) => params.data?.canEditExpiry ?? false,
			cellEditor: 'agSelectCellEditor',
			cellEditorParams: {
				values: ['5천만원(통원20만원)', '2천만원(통원20만원)', '3천만원(통원20만원)', '4천만원(통원20만원)'],
			},
			cellRenderer: coverageAmountCellRenderer,
		},
		{
			headerName: '보험료(만원)',
			field: 'premium',
			width: 100,
			cellClass: 'text-right',
			headerClass: 'px-0!',
			sortable: false,
			filter: false,
      valueFormatter: numberValueFormatter,
		},
		{
			headerName: '만기',
			field: 'expiryPeriod',
			width: 80,
      cellClass: 'text-center px-[0.2rem]!',
			sortable: false,
			filter: false,
		},
		{
			headerName: '납기',
			field: 'paymentPeriod',
			width: 80,
			cellClass: 'text-center px-[0.2rem]!',
			sortable: false,
			filter: false,
		},
	];

	const onCellValueChanged = useMemo(
		() => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
		[setRowData, setErrorRows],
	);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>동시가입설계상세</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ010)</Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <Grow className='w-full' variant="box-round" placement={'ss'}>
            <FormTable caption="보험정보" cols={['w-auto', 'w-auto']} variant='head'>
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={'15rem'} value={'LA26020945959594'} readOnly />
                  <div className="separator">-</div>
                  <Input aria-label="" width={'3rem'} value={'1'} readOnly />
                  <Input aria-label="" width={'30rem'} value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>

          <Gcol placement={'ss'} className="w-full gap-6">
            <TableFold variant={'default'}>
              <TableFoldHead title="계약기본사항">
              </TableFoldHead>
              <TableFoldBody>
                <FormTable caption={'계약기본사항'} cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'상품선택'} colSpan={3}>
                      <RadioGroup className="gap-2" errorMsg="하나를 선택해주세요." errorPs="bl" onValueChange={() => {}} width="full">
                        <RadioGroupItem color="primary" id="SelectProduct1" size="lg" value="option1" variant="default" checked={true}>
                          4세대신손
                        </RadioGroupItem>
                        <RadioGroupItem color="primary" id="SelectProduct2" size="lg" value="option2" variant="default">
                          간편실손
                        </RadioGroupItem>
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'보험시기'}>2026-03-06</FormCell>
                    <FormCell title={'유효설계'}>2026-03-06까지</FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'보장내용변경주기'}>
                      <RadioGroup className="gap-2" errorMsg="하나를 선택해주세요." errorPs="bl" onValueChange={() => {}} width="full">
                        <RadioGroupItem color="primary" id="BenefitPeriod1" size="lg" value="option1" variant="default" checked={true}>
                          05년만기
                        </RadioGroupItem>
                      </RadioGroup>
                    </FormCell>
                    <FormCell title={'납기'}>
                      <RadioGroup className="gap-2" errorMsg="하나를 선택해주세요." errorPs="bl" onValueChange={() => {}} width="full">
                        <RadioGroupItem color="primary" id="FullTerm1" size="lg" value="option1" variant="default" checked={true}>
                          전기납
                        </RadioGroupItem>
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'납기주기'}>
                      <RadioGroup className="gap-2" errorMsg="하나를 선택해주세요." errorPs="bl" onValueChange={() => {}} width="full">
                        <RadioGroupItem color="primary" id="Monthly1" size="lg" value="option1" variant="default" checked={true}>
                          월납
                        </RadioGroupItem>
                        <RadioGroupItem color="primary" id="Monthly2" size="lg" value="option2" variant="default">
                          2월납
                        </RadioGroupItem>
                        <RadioGroupItem color="primary" id="Monthly3" size="lg" value="option3" variant="default">
                          3월납
                        </RadioGroupItem>
                        <RadioGroupItem color="primary" id="Monthly6" size="lg" value="option4" variant="default">
                          6월납
                        </RadioGroupItem>
                        <RadioGroupItem color="primary" id="Yearly1" size="lg" value="option5" variant="default">
                          년납
                        </RadioGroupItem>
                      </RadioGroup>
                    </FormCell>
                    <FormCell title={'갱신주기'}>
                      <RadioGroup className="gap-2" errorMsg="하나를 선택해주세요." errorPs="bl" onValueChange={() => {}} width="full">
                        <RadioGroupItem color="primary" id="1year" size="lg" value="option1" variant="default" checked={true}>
                          1년
                        </RadioGroupItem>
                      </RadioGroup>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'태아여부'}>
                      <Checkbox color="primary" errorMsg="선택은 필수입니다." errorPs="bl" onCheckedChange={() => {}} size="lg" variant="default">
                        가입
                      </Checkbox>
                    </FormCell>
                    <FormCell title={'일신부'}>
                      <Input aria-label="" width={'7rem'} value={''} readOnly />
                      <Input aria-label="" width={'14rem'} value={''} readOnly />
                    </FormCell>
                  </FormRow>
                </FormTable>
              </TableFoldBody>
            </TableFold>

            <TableFold variant={'default'}>
              <TableFoldHead title="피보험자/계약자">
              </TableFoldHead>
              <TableFoldBody>
                <FormTable caption={'피보험자'} cols={['w-[14rem]', 'w-auto', 'w-[14rem]', 'w-auto']}>
                  <FormRow>
                    <FormCell title={'피보험자'}>
                      <Input aria-label="" width={'7rem'} value={'김한화'} readOnly />
                      <Input aria-label="" width={'14rem'} value={'910101-1******'} readOnly />
                    </FormCell>
                    <FormCell title={'알림사항'}>
                      <Grow placement={'bwc'}>
                        <Grow>
                          <Input aria-label="" width={'4rem'} value={'무'} readOnly />
                          <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                            입력
                          </Button>
                        </Grow>
                        <Checkbox color="primary" errorMsg="선택은 필수입니다." errorPs="bl" onCheckedChange={() => {}} size="lg" variant="default">
                          의료급여수급권자할인
                        </Checkbox>
                      </Grow>
                    </FormCell>
                  </FormRow>
                  <FormRow>
                    <FormCell title={'계약자'}>
                      <Input aria-label="" width={'7rem'} value={'김한화'} readOnly />
                      <Input aria-label="" width={'14rem'} value={'910101-1******'} readOnly />
                    </FormCell>
                    <FormCell title={'주피와관계'}>
                      주피보험자(김한화)는 계약자의
                      <NativeSelect aria-label="개인정보취득경로 선택" width="10rem" readOnly value={relationValue} onChange={(event) => setRelationValue(event.target.value)}>
                        {[
                          { value: 'selection', id: 'personalinfo-1', label: '선택1' },
                          { value: 'selection2', id: 'personalinfo-2', label: '선택2' },
                        ].map((option) => (
                          <NativeSelectOption key={option.id} value={option.value}>
                            {option.label}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormCell>
                  </FormRow>
                </FormTable>
              </TableFoldBody>
            </TableFold>  

            <FormTable caption={'합계보험료'} cols={['w-[14rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={'합계보험료'}>
                  <Input aria-label="" width={'20rem'} value={'123,456원'} readOnly />
                  <Button color="secondary" onClick={() => {}} only="default" size="lg" variant="outlined">
                    보험료 계산
                  </Button>
                </FormCell>
              </FormRow>
            </FormTable>

            <TableFold variant={'default'}>
              <TableFoldHead title="담보가입사항">
              </TableFoldHead>
              <TableFoldBody>
              <Grow className="w-full">
                <div className="ag-theme-alpine">
                  <AgGridReact<DummyDataType>
                    getRowId={params => String(params.data.id)}
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
              </Grow>
              </TableFoldBody>
            </TableFold>
          </Gcol>
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