import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { PlusIcon, SearchIcon } from '@icons';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Checkbox } from '@uiux/Checkbox';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, EditableCallbackParams, ICellRendererParams } from 'ag-grid-community';
import { amountUnitInputCellRenderer, createCellValueChangedHandler, editableSelectCellRenderer, numberValueFormatter } from '@aggrid';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { useCallback, useRef } from 'react';
;

ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_전환_가입설계',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => {
        return (
          <>
            <Title />
            <br />
            <br />
            <h2>LTPZ010</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

const LTPZ010P = () => {
  const amountInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [relationValue, setRelationValue] = React.useState('');

  // 중복 셀 렌더러 (중복 여부에 따라 추가 버튼 노출)
  const duplicateRenderer = useCallback((params: ICellRendererParams<DummyDataType>) => {
    const isDuplicate = params.value as boolean;
    return isDuplicate ? (
      <Grow className="w-full h-full flex items-center justify-center">
        <Button
          aria-label="고객 추가"
          variant={'outlined'}
          only={'icon'}
          size={'sm'}
          color={'gray-light'}
          onClick={() => alert('추가')}
        >
          <PlusIcon color={'var(--color-gray-30)'} />
        </Button>
      </Grow>
    ) : (
      ''
    );
  }, []);
  
  // 속성 셀 렌더러
  const attributeRenderer = (params: ICellRendererParams<DummyDataType>) => {
    if (!params.value) return null;
    return (
      <div className="flex flex-wrap gap-1 justify-center items-center w-full h-full">
        <Button only={'icon'} variant={'none'} size={'sm'}>
          <SearchIcon color={'var(--color-primary-50)'} />
        </Button>
      </div>
    );

  };
  // 가입금액(만원) 셀 렌더러 (공통 컴포넌트 활용)
  const coverageAmountCellRenderer = (params: ICellRendererParams<DummyDataType>) => editableSelectCellRenderer<DummyDataType>(params);

  // 보험요(원) 셀 렌더러 (공통 컴포넌트 활용)
  const premiumAmountCellRenderer = (params: ICellRendererParams<DummyDataType>) => amountUnitInputCellRenderer<DummyDataType>({ ...params, amountInputRefs: amountInputRefs.current });


  type DummyDataType = {
    id: number;
    isCheck: boolean;
    isDuplicate: boolean;
    productName: string;
    attribute: boolean;
    coverageAmount: string;
    premium: number;
    expiryPeriod: string;
    paymentPeriod: string;
    canEditExpiry: boolean;
  };

  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: false, isDuplicate: true, productName: '기본형 실손의료비(상해급여)(갱신형)', attribute: true, coverageAmount: '5천만원(통원20만원)', premium: 1377, expiryPeriod:'01년만기', paymentPeriod:'전기납', canEditExpiry: true, },
    { id: 2, isCheck: false, isDuplicate: true, productName: '기본형 실손의료비(상해급여)(갱신형)', attribute: false, coverageAmount: '2천만원(통원20만원)', premium: 9999999, expiryPeriod:'01년만기', paymentPeriod:'전기납', canEditExpiry: false },
    { id: 3, isCheck: true, isDuplicate: false, productName: '기본형 실손의료비(상해급여)(갱신형)', attribute: true, coverageAmount: '3천만원(통원20만원)', premium: 159999, expiryPeriod:'01년만기', paymentPeriod:'전기납', canEditExpiry: false },
    { id: 4, isCheck: false, isDuplicate: true, productName: '기본형 실손의료비(상해급여)(갱신형)', attribute: false, coverageAmount: '4천만원(통원20만원)', premium: 2323230, expiryPeriod:'01년만기', paymentPeriod:'전기납', canEditExpiry: false },
  ];

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
      cellRenderer: premiumAmountCellRenderer,
    },
    {
      headerName: '만기',
      field: 'expiryPeriod',
      width: 60,
      cellClass: 'text-center editable-cell px-[0.2rem]!',
      sortable: false,
      filter: false,
    },
    {
      headerName: '납기',
      field: 'paymentPeriod',
      width: 60,
      cellClass: 'text-center editable-cell px-[0.2rem]!',
      sortable: false,
      filter: false,
    },
  ];





  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [errorRows, setErrorRows] = React.useState<number[]>(
    DummyData.filter(row => !row.isCheck).map(row => row.id)
  );


  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  return (
    <Gcol className="w-full">
      <FormTable caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
        <FormRow>
          <FormCell title={'계번호'}>
            <Input aria-label="" width={'10rem'} value={'LA26020945959594'} readOnly />
            <div className="separator">-</div>
            <Input aria-label="" width={'3rem'} value={'1'} readOnly />
            <Input aria-label="" width={'30rem'} value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
          </FormCell>
        </FormRow>
      </FormTable>
      <FormTable caption='계약기본사항' cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1']}>
        <FormRow >
          <FormCell title={'상품선택'} colSpan={3}>
            <RadioGroup
              className="gap-2"
              errorMsg="하나를 선택해주세요."
              errorPs="bl"
              onValueChange={() => { }}
              width="full"
            >
              <RadioGroupItem
                color="primary"
                id="SelectProduct1"
                size="lg"
                value="option1"
                variant="default"
                checked={true}
              >
                4세대신손
              </RadioGroupItem>
              <RadioGroupItem
                color="primary"
                id="SelectProduct2"
                size="lg"
                value="option2"
                variant="default"
              >
                간편실손
              </RadioGroupItem>
            </RadioGroup>
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'보험시기'}>
            2026-03-06
          </FormCell>
          <FormCell title={'유효설계'}>
            2026-03-06까지
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'보장내용변경주기'}>
            <RadioGroup
              className="gap-2"
              errorMsg="하나를 선택해주세요."
              errorPs="bl"
              onValueChange={() => { }}
              width="full"
            >
              <RadioGroupItem
                color="primary"
                id="BenefitPeriod1"
                size="lg"
                value="option1"
                variant="default"
                checked={true}
              >
                05년만기
              </RadioGroupItem>
            </RadioGroup>
          </FormCell>
          <FormCell title={'납기'}>
            <RadioGroup
              className="gap-2"
              errorMsg="하나를 선택해주세요."
              errorPs="bl"
              onValueChange={() => { }}
              width="full"
            >
              <RadioGroupItem
                color="primary"
                id="FullTerm1"
                size="lg"
                value="option1"
                variant="default"
                checked={true}
              >
                전기납
              </RadioGroupItem>
            </RadioGroup>
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'납기주기'}>
            <RadioGroup
              className="gap-2"
              errorMsg="하나를 선택해주세요."
              errorPs="bl"
              onValueChange={() => { }}
              width="full"
            >
              <RadioGroupItem
                color="primary"
                id="Monthly1"
                size="lg"
                value="option1"
                variant="default"
                checked={true}
              >
                월납
              </RadioGroupItem>
              <RadioGroupItem
                color="primary"
                id="Monthly2"
                size="lg"
                value="option2"
                variant="default"
              >
                2월납
              </RadioGroupItem>
              <RadioGroupItem
                color="primary"
                id="Monthly3"
                size="lg"
                value="option3"
                variant="default"
              >
                3월납
              </RadioGroupItem>
              <RadioGroupItem
                color="primary"
                id="Monthly6"
                size="lg"
                value="option4"
                variant="default"
              >
                6월납
              </RadioGroupItem>
              <RadioGroupItem
                color="primary"
                id="Yearly1"
                size="lg"
                value="option5"
                variant="default"
              >
                년납
              </RadioGroupItem>
            </RadioGroup>
          </FormCell>
          <FormCell title={'갱신주기'}>
            <RadioGroup
              className="gap-2"
              errorMsg="하나를 선택해주세요."
              errorPs="bl"
              onValueChange={() => { }}
              width="full"
            >
              <RadioGroupItem
                color="primary"
                id="1year"
                size="lg"
                value="option1"
                variant="default"
                checked={true}
              >
                1년
              </RadioGroupItem>
            </RadioGroup>
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'태아여부'}>
            <Checkbox
              color="primary"
              errorMsg="선택은 필수입니다."
              errorPs="bl"
              onCheckedChange={() => { }}
              size="lg"
              variant="default"
            >
              가입
            </Checkbox>
          </FormCell>
          <FormCell title={'일신부'}>
            <Input aria-label="" width={'7rem'} value={''} readOnly />
            <Input aria-label="" width={'14rem'} value={''} readOnly />
          </FormCell>
        </FormRow>
      </FormTable>
      <FormTable caption='피보험자' cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1']}>
        <FormRow>
          <FormCell title={'피보험자'}>
            <Input aria-label="" width={'7rem'} value={'김한화'} readOnly />
            <Input aria-label="" width={'14rem'} value={'910101-1******'} readOnly />
          </FormCell>
          <FormCell title={'알림사항'}>
            <Grow placement='bwc'>
              <Grow>
                <Input aria-label="" width={'4rem'} value={'무'} readOnly />
                <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">
                  입력
                </Button>
              </Grow>
              <Checkbox
                color="primary"
                errorMsg="선택은 필수입니다."
                errorPs="bl"
                onCheckedChange={() => { }}
                size="lg"
                variant="default"
              >
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
            <NativeSelect
              aria-label="개인정보취득경로 선택"
              width="10rem"
              readOnly
              value={relationValue}
              onChange={(e) => setRelationValue(e.target.value)}
            >
              {[
                { value: 'selection', id: 'personalinfo-1', label: '선택1' },
                { value: 'selection2', id: 'personalinfo-2', label: '선택2' },
              ].map((option) => (
                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
              ))}
            </NativeSelect>
          </FormCell>
        </FormRow>
      </FormTable>
      <FormTable caption='합계보험료' cols={['w-[14rem] min-w-[14rem]', 'w-auto',]}>
        <FormRow>
          <FormCell title={'합계보험료'}>
            <Input aria-label="" width={'10rem'} value={'123,456원'} readOnly />
            <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">
              보험료 계산
            </Button>
          </FormCell>
        </FormRow>

      </FormTable>
      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: false }}
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
            rowSelection={{
              mode: 'multiRow',
              headerCheckbox: true,
              checkboxes: true,
              enableClickSelection: false,
            }}
            rowClassRules={{}}
            onGridReady={params => {
              params.api.forEachNode(node => {
                if (node.data?.isCheck) {
                  node.setSelected(true);
                }
              });
            }}
          />
        </div>
      </Grow>
    </Gcol>
  );
};

type Story = StoryObj<typeof meta>;

export const LTPZ010: Story = {
  render: () => <LTPZ010P />,
};


const LTPZ011P = () => {
  return (
    <Gcol className="w-full">
      <FormTable caption="대표담보명" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
        <FormRow>
          <FormCell title={'대표담보명'}>
            <Input aria-label="" width={'20rem'} value={'대표담보명.text'} readOnly />
          </FormCell>
        </FormRow>
      </FormTable>
      
    </Gcol>
  );
};

export const LTPZ011: Story = {
  render: () => <LTPZ011P />,
};     

