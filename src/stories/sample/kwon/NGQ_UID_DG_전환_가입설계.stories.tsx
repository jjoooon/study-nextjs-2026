import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { PlusIcon, SearchIcon, MemoIcon, QuestionMark } from '@icons';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, EditableCallbackParams, ICellRendererParams } from 'ag-grid-community';
import { amountUnitInputCellRenderer, createCellValueChangedHandler, editableSelectCellRenderer, numberValueFormatter, createFieldRenderer } from '@aggrid';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { InfoBox } from '@common/InfoBox';
import { useTabs } from '@/shared/hooks/useTabs';
import { useCallback, useRef } from 'react';
import { DatePickerInput } from '@/shared/components/common/DatePicker';
import { useFormFields } from '@hooks/useFormFields';

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
          <FormCell title={'설계번호'}>
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
            defaultColDef={{ sortable: false, cellClass: 'p-0', cellStyle: { padding: 0 } }}
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
  const amountInputRefs2 = useRef<Array<HTMLInputElement | null>>([]);

  type DummyDataType2 = {
    id: number;
    담보상태: string;
    담보코드: string;
    담보보험시기: string;
    담보보험종기: string;
    세부담보명: string;
    보험료: number;
    isSumRow?: boolean;
  };

  const DummyData2: DummyDataType2[] = [
    { id: 1, 담보상태: '', 담보코드: '', 담보보험시기: '', 담보보험종기: '', 세부담보명: '', 보험료: 1377 },
    { id: 2, 담보상태: '', 담보코드: '', 담보보험시기: '', 담보보험종기: '', 세부담보명: '', 보험료: 9999999 },
    { id: 3, 담보상태: '', 담보코드: '', 담보보험시기: '', 담보보험종기: '', 세부담보명: '', 보험료: 159999 },
    { id: 4, 담보상태: '', 담보코드: '', 담보보험시기: '', 담보보험종기: '', 세부담보명: '', 보험료: 2323230 },
  ];

  const premiumAmountCellRenderer2 = (params: ICellRendererParams<DummyDataType2>) =>
    amountUnitInputCellRenderer<DummyDataType2>({ ...params, amountInputRefs: amountInputRefs2.current });

  const columnDefs2: ColDef<DummyDataType2>[] = [
    {
      headerName: '담보상태',
      field: '담보상태',
      width: 80,
      cellClass: (params) => params.data?.isSumRow ? 'text-center font-bold' : 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => params.data?.isSumRow ? <b>합계2</b> : params.value,
      colSpan: (params) => params.data?.isSumRow ? 5 : 1,
    },
    {
      headerName: '담보코드',
      field: '담보코드',
      width: 80,
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => params.data?.isSumRow ? null : params.value,
      colSpan: (params) => params.data?.isSumRow ? 0 : 1,
    },
    {
      headerName: '담보보험시기',
      field: '담보보험시기',
      width: 110,
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => params.data?.isSumRow ? null : params.value,
      colSpan: (params) => params.data?.isSumRow ? 0 : 1,
    },
    {
      headerName: '담보보험종기',
      field: '담보보험종기',
      width: 110,
      cellClass: 'text-center',
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => params.data?.isSumRow ? null : params.value,
      colSpan: (params) => params.data?.isSumRow ? 0 : 1,
    },
    {
      headerName: '세부담보명',
      field: '세부담보명',
      flex: 1,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => params.data?.isSumRow ? null : params.value,
      colSpan: (params) => params.data?.isSumRow ? 0 : 1,
    },
    {
      headerName: '보험료(원)',
      field: '보험료',
      width: 120,
      cellClass: 'text-right',
      headerClass: 'px-0!',
      sortable: false,
      filter: false,
      cellRenderer: (params: ICellRendererParams<DummyDataType2>) => {
        if (params.data?.isSumRow) {
          return <b>{Number(params.value ?? 0).toLocaleString()}</b>;
        }
        return premiumAmountCellRenderer2(params);
      },
    },
  ];

  const rowData2 = React.useMemo(() => DummyData2, []);
  const sumRow2 = React.useMemo<DummyDataType2[]>(
    () => [{
      id: -1,
      담보상태: '합계2',
      담보코드: '',
      담보보험시기: '',
      담보보험종기: '',
      세부담보명: '',
      보험료: rowData2.reduce((sum, row) => sum + row.보험료, 0),
      isSumRow: true,
    }],
    [rowData2]
  );


  return (
    <Gcol className="w-full">
      <FormTable caption="대표담보명" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
        <FormRow>
          <FormCell title={'대표담보명'}>
            <Input aria-label="" width={'20rem'} value={'대표담보명.text'} readOnly />
          </FormCell>
        </FormRow>
      </FormTable>
      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType2>
            rowData={rowData2}
            columnDefs={columnDefs2}
            pinnedBottomRowData={sumRow2}
            defaultColDef={{ sortable: false }}
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            rowClassRules={{}}
          />
        </div>
      </Grow>
    </Gcol>
  );
};

export const LTPZ011: Story = {
  render: () => <LTPZ011P />,
};

const LTPZ016P = () => {
  return (
    <Gcol className="w-full">
      <FormTable caption="설계번호" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
        <FormRow>
          <FormCell title={'설계번호'}>
            <Input aria-label="" width={'10rem'} value={'LA26020945959594'} readOnly />
            <div className="separator">-</div>
            <Input aria-label="" width={'3rem'} value={'1'} readOnly />
            <Input aria-label="" width={'30rem'} value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
          </FormCell>
        </FormRow>
      </FormTable>
    </Gcol>  
  )
}

export const LTPZ016: Story = {
  render: () => <LTPZ016P />,
};

const LTPZ017P = () => {
  type DummyDataType = {
    id: number;
    isCheck: boolean;
    planNo: number;
    planName: string;
    registrationDate: string;
  };

  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: false, planNo: 1, planName: '', registrationDate: '' },
    { id: 2, isCheck: false, planNo: 2, planName: '', registrationDate: '' },
    { id: 3, isCheck: true, planNo: 3, planName: '', registrationDate: '' },
    { id: 4, isCheck: false, planNo: 4, planName: '', registrationDate: '' },
  ];

  const columnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '플랜순번',
      field: 'planNo',
      flex: 1,
      cellClass: 'text-center',
    },
    {
      headerName: '플랜명',
      field: 'planName',
      flex: 1,
    },
    {
      headerName: '등록일자',
      field: 'registrationDate',
      width: 120,
      cellClass: 'text-center',
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
      <Grow placement='bwc' className="w-full" variant={'box'}>
        <FormTable variant={'none'} lineTop={false} caption="보험정보" cols={['w-[14rem] min-w-[14rem]', 'w-[20rem] min-w-[20rem]', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'설계사'}>
              <Input aria-label="" width={'10rem'} value={'text'} readOnly />
            </FormCell>
            <FormCell title={'상품명'}>
              <Grow>
                <Input aria-label="" width={'20rem'} value={'무배당 1등 엄마의 똑똑한 자녀보힘 1404'} readOnly />
              </Grow>
            </FormCell>
          </FormRow>
        </FormTable>
        <Grow>
          <Button aria-label="" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>
          <Button color={'secondary'} size={'lg'} variant={'outlined'} onClick={() => {}}>
            새로고침
          </Button>
        </Grow>
      </Grow>
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


export const LTPZ017: Story = {
  render: () => <LTPZ017P />,
}

type LTPZ020TabType = {
  name: string;
  value: string;
  label: string;
};

const DATA_TABS: LTPZ020TabType[] = [
  {
    name: '인담보',
    value: 'humanCoverage',
    label: '인담보',
  },
  {
    name: '재물담보',
    value: 'propertyCoverage',
    label: '재물담보',
  },
];

const LTPZ020_01P = () => {
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);
  const [copyValues, setCopyValues] = React.useState<string[]>(['coverage-copy']);

  type InsuredListRow = {
    id: number;
    name: string;
    grade: string;
    choice: string;
    gender: string;
    age: number;
  };

  type CoverageListRow = {
    id: number;
    coverageCode: string;
    coverageName: string;
    insurancePeriod: string;
    paymentPeriod: string;
    designCoverageCode: string;
    designCoverageName: string;
  };

  const insuredListData: InsuredListRow[] = [
    { id: 1, choice:'', name: '', grade: '', gender: '', age: 0 },
    { id: 2, choice:'', name: '', grade: '', gender: '', age: 0 },
    { id: 3, choice:'', name: '', grade: '', gender: '', age: 0 },
    { id: 4, choice:'', name: '', grade: '', gender: '', age: 0 },
  ];

  const coverageListData: CoverageListRow[] = [
    { id: 1, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 2, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 3, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
    { id: 4, coverageCode: '', coverageName: '', insurancePeriod: '', paymentPeriod: '', designCoverageCode: '', designCoverageName: '' },
  ];

  const insuredListColumnDefs: ColDef<InsuredListRow>[] = [
    { headerName: '선택', field: 'choice', width: 100, cellClass: 'text-center' },
    { headerName: '성명', field: 'name', flex: 1, cellClass: 'text-center' },
    { headerName: '급수', field: 'grade', width: 120, cellClass: 'text-center' },
    { headerName: '성별', field: 'gender', width: 80, cellClass: 'text-center' },
    { headerName: '연령', field: 'age', width: 80, cellClass: 'text-center' },
  ];

  const coverageListColumnDefs: ColDef<CoverageListRow>[] = [
    { headerName: '담보코드', field: 'coverageCode', width: 100, cellClass: 'text-center' },
    { headerName: '담보명', field: 'coverageName', flex: 1 },
    { headerName: '보험기간', field: 'insurancePeriod', width: 100, cellClass: 'text-center' },
    { headerName: '납입기간', field: 'paymentPeriod', width: 100, cellClass: 'text-center' },
    { headerName: '설계담보코드', field: 'designCoverageCode', width: 120, cellClass: 'text-center' },
    { headerName: '설계담보명', field: 'designCoverageName', flex: 1 },
  ];

  return (
    <Gcol className="w-full">
      <FormTable caption="증권번호" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
        <FormRow>
          <FormCell title={'증권번호'}>
            <Grow placement='bwc'>
              <Grow>
                <Input aria-label="" width={'10rem'} value={''} />
                <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                  <SearchIcon color={'var(--color-primary-50)'} />
                </Button>
                <Input aria-label="" width={'30rem'} value={'한화 더 건강한 1040종합'} readOnly />
              </Grow>
              <Grow>
                <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">
                  조회
                </Button>
              </Grow>
            </Grow>
          </FormCell>
        </FormRow>
      </FormTable>
      <TabPager
        data={tabs}
        active={active}
        setActive={setActive}
        removable={false}
        onRemove={handleRemove}
        visibleCount={4}
        variant="default"
        hasTableBelow={true}
        error={false}
        errorMsg="에러 메시지 예시"
        renderButtons={
          <CheckboxGroup
            className="gap-3"
            color="primary"
            errorMsg="2개 이상 선택해 주세요."
            errorPs="bl"
            minSelected={0}
            onValueChange={setCopyValues}
            size="lg"
            value={copyValues}
            variant="default"
            width="auto"
          >
            <CheckboxGroupItem value="insured-copy" >
              피보험자복사
            </CheckboxGroupItem>
            <CheckboxGroupItem value="coverage-copy" disabled>
              담보복사
            </CheckboxGroupItem>
          </CheckboxGroup>
        }
        getValue={tab => String(tab.value)}
        renderTab={tab => <span>{tab.label}</span>}
        renderDropdownItem={false}
      >
        {active === 'humanCoverage' ? (
          <div className="w-full flex gap-2 pt-2">
            <div className="w-[30%]">
              <Typo variant={'heading-sm'} className="mb-1">피보험자목록</Typo>
              <div className="ag-theme-alpine aggrid-pagination-ko w-full h-160!">
                <AgGridReact<InsuredListRow>
                  rowData={insuredListData}
                  columnDefs={insuredListColumnDefs}
                  defaultColDef={{ sortable: false }}
                  animateRows={false}
                  rowClassRules={{}}
                />
              </div>
            </div>
            <div className="w-[70%]">
              <Typo variant={'heading-sm'} className="mb-1">담보목록</Typo>
              <div className="ag-theme-alpine aggrid-pagination-ko w-full h-160!">
                <AgGridReact<CoverageListRow>
                  rowData={coverageListData}
                  columnDefs={coverageListColumnDefs}
                  defaultColDef={{ sortable: false }}
                  animateRows={false}
                  rowClassRules={{}}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full pt-2">
            <Typo variant={'heading-sm'} className="mb-1">재물담보</Typo>
            <div className="ag-theme-alpine aggrid-pagination-ko w-full h-160!">
              <AgGridReact<CoverageListRow>
                rowData={coverageListData}
                columnDefs={coverageListColumnDefs}
                defaultColDef={{ sortable: false }}
                animateRows={false}
                rowClassRules={{}}
              />
            </div>
          </div>
        )}
      </TabPager>
    </Gcol>
  );
};

export const LTPZ020_01: Story = {
  render: () => <LTPZ020_01P />,
}  

const LTPZ021P = () => {
  return (
    <Gcol className="w-full">
     <FormTable caption="설계번호" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
        <FormRow>
          <FormCell title={'설계번호'}>
            <Input aria-label="" width={'10rem'} value={'123456789'} readOnly/>
            <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
              <SearchIcon color={'var(--color-primary-50)'} />
            </Button>
          </FormCell>
        </FormRow>
      </FormTable>
      <Grow placement='ss' className='w-full' gap={2}>
        <Gcol className="w-full">
          <Grow placement='bwc' className="w-full">
            <Typo variant={'heading-sm'} className="mb-1">계약정보</Typo>
            <Grow>
              <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">출생후보험료</Button>
              <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">예상환급금조회</Button>
              <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">영업수수료</Button>
            </Grow>
          </Grow>
          <FormTable caption="계약정보" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
            <FormRow>
              <FormCell title={'계약자'} colSpan={3}>
                김한화
              </FormCell>
            </FormRow>  
            <FormRow>
              <FormCell title={'상품명'} colSpan={3}>
                한화실손의료보험(갱신형) 무배당2601
              </FormCell>  
            </FormRow>
            <FormRow>
              <FormCell title={'가입플랜'} colSpan={3}>
                자유설계
              </FormCell>  
            </FormRow>
            <FormRow>
              <FormCell title={'보험기간'}>
                05년 만기
              </FormCell>
              <FormCell title={'납입기간'}>
                월납/전기납
              </FormCell>  
            </FormRow>
          </FormTable>
          <FormTable caption="포인트정보" cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}>
            <FormRow vertical={true}>
              <FormCell title={'보장P'} tdClassName="justify-center items-center">
                99
              </FormCell>
              <FormCell title={'적립P'} tdClassName="justify-center items-center">
                99
              </FormCell>
              <FormCell title={'입시납P'} tdClassName="justify-center items-center">
                99
              </FormCell>
              <FormCell title={<span>합계P <br /> (할인전)</span>} tdClassName="justify-center items-center">
                99
              </FormCell>
              <FormCell title={<span>합계P <br /> (할인후)</span>} tdClassName="justify-center items-center">
                99
              </FormCell>
              <FormCell title={<span>만기환급금 <br /> (예상)</span>} tdClassName="justify-center items-center">
                99
              </FormCell> 
              <FormCell title={<span>환급률 <br /> (예상)</span>} tdClassName="justify-center items-center">    
                99
              </FormCell>
            </FormRow>
          </FormTable>      
          <InfoBox
            title="만기환급급은 예상금으로 공시이율의 변동, 중도인출금, 보험료 납입일자 등에 따라 금액이 달라질 수 있습니다."
            variant={'info'}
            bg={false}
          ></InfoBox>
        </Gcol>
        <Gcol className="w-full">
          <Grow placement='bwc' className="w-full">
            <Typo variant={'heading-sm'} className="mb-1">계약정보</Typo>
            <Grow>
              <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">출생후보험료</Button>
              <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">예상환급금조회</Button>
              <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">영업수수료</Button>
            </Grow>
          </Grow>
          <FormTable caption="계약정보" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
            <FormRow>
              <FormCell title={'계약자'} colSpan={3}>
                김한화
              </FormCell>
            </FormRow>  
            <FormRow>
              <FormCell title={'상품명'} colSpan={3}>
                한화실손의료보험(갱신형) 무배당2601
              </FormCell>  
            </FormRow>
            <FormRow>
              <FormCell title={'가입플랜'} colSpan={3}>
                자유설계
              </FormCell>  
            </FormRow>
            <FormRow>
              <FormCell title={'보험기간'}>
                05년 만기
              </FormCell>
              <FormCell title={'납입기간'}>
                월납/전기납
              </FormCell>  
            </FormRow>
          </FormTable>
          <FormTable caption="포인트정보" cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}>
            <FormRow vertical={true}>
              <FormCell title={'보장P'} tdClassName="justify-center items-center">
                99
              </FormCell>
              <FormCell title={'적립P'} tdClassName="justify-center items-center">
                99
              </FormCell>
              <FormCell title={'입시납P'} tdClassName="justify-center items-center">
                99
              </FormCell>
              <FormCell title={<span>합계P <br /> (할인전)</span>} tdClassName="justify-center items-center">
                99
              </FormCell>
              <FormCell title={<span>합계P <br /> (할인후)</span>} tdClassName="justify-center items-center">
                99
              </FormCell>
              <FormCell title={<span>만기환급금 <br /> (예상)</span>} tdClassName="justify-center items-center">
                99
              </FormCell> 
              <FormCell title={<span>환급률 <br /> (예상)</span>} tdClassName="justify-center items-center">    
                99
              </FormCell>
            </FormRow>
          </FormTable>
          <InfoBox
            title="만기환급급은 예상금으로 공시이율의 변동, 중도인출금, 보험료 납입일자 등에 따라 금액이 달라질 수 있습니다."
            variant={'info'}
            bg={false}
          ></InfoBox>
        </Gcol>  
      </Grow>
      <Grow placement='ss' className='w-full' gap={2}>
        <Grow className="w-full">
          {/* 인보험/물보험 TabPager 예시 */}
          <Gcol className="w-full" placement='ss'>
            <Typo variant={'heading-sm'} className="mb-1">피보험자정보</Typo>
            {(() => {
              const [tabActive, setTabActive] = React.useState('human');
              const tabData = [
                { label: '인보험', value: 'human' },
                { label: '물보험', value: 'property' },
              ];
              return (
                <TabPager
                  data={tabData}
                  active={tabActive}
                  setActive={setTabActive}
                  getValue={tab => tab.value}
                  renderTab={tab => <span>{tab.label}</span>}
                  visibleCount={2}
                >
                  {tabActive === 'human' ? (
                    <Gcol className="w-full">
                      <FormTable caption="포인트정보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}>
                        <FormRow vertical={true}>
                          <FormCell title={'피보험자'}>
                            김한화
                          </FormCell>
                          <FormCell title={'연령'}>
                            30
                          </FormCell>
                          <FormCell title={'직업명'}>
                            회사사무직종사자
                          </FormCell>
                          <FormCell title={'급수'}>
                            1급
                          </FormCell>
                          <FormCell title={'보장P'} tdClassName="justify-end items-center">
                            0
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      <FormTable caption="담보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}>
                        <FormRow vertical={true}>
                          <FormCell title={'담보명'}>
                          </FormCell>
                          <FormCell title={'보험기간'}>
                          </FormCell>
                          <FormCell title={'납입기간'}>
                          </FormCell>
                          <FormCell title={'가입금액'}>
                          </FormCell>
                          <FormCell title={'보장P'} tdClassName="justify-end items-center">
                            
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Gcol> 
                  ) : (
                    <Gcol className="w-full">
                      <FormTable caption="포인트정보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto', 'w-auto']}>
                        <FormRow vertical={true}>
                          <FormCell title={'소유자'}>
                            김한화
                          </FormCell>
                          <FormCell title={'직업업종'}>
                            30
                          </FormCell>
                          <FormCell title={'급수'}>
                            1급
                          </FormCell>
                          <FormCell title={'보장P'} tdClassName="justify-end items-center">
                            0
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      <FormTable caption="소재지" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
                        <FormRow>
                          <FormCell title={'소재지'}
                          >
                          </FormCell>
                        </FormRow>
                      </FormTable>
                       <FormTable caption="담보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto']}>
                        <FormRow vertical={true}>
                          <FormCell title={'화재기본담보'}>
                            김한화
                          </FormCell>
                          <FormCell title={'가입금액'}>
                            30
                          </FormCell>
                          <FormCell title={'담보P'} tdClassName="justify-end items-center">
                            0
                          </FormCell>
                        </FormRow>
                      </FormTable>
                       <FormTable caption="담보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}>
                        <FormRow vertical={true}>
                          <FormCell title={'화재특약담보'}>
                            김한화
                          </FormCell>
                          <FormCell title={'보험기간'}>
                            30
                          </FormCell>
                          <FormCell title={'납입기간'}>
                            
                          </FormCell>
                          <FormCell title={'가입금액'}>
                            
                          </FormCell>
                          <FormCell title={'담보P'} tdClassName="justify-end items-center">
                            0
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Gcol>  
                  )}
                </TabPager>
              );
            })()}
          </Gcol>
        </Grow>
        <Grow className="w-full">
           {/* 인보험/물보험 TabPager 예시 */}
          <Gcol className="w-full" placement='ss'>
            <Typo variant={'heading-sm'} className="mb-1">피보험자정보</Typo>
            {(() => {
              const [tabActive, setTabActive] = React.useState('human');
              const tabData = [
                { label: '인보험', value: 'human' },
                { label: '물보험', value: 'property' },
              ];
              return (
                <TabPager
                  data={tabData}
                  active={tabActive}
                  setActive={setTabActive}
                  getValue={tab => tab.value}
                  renderTab={tab => <span>{tab.label}</span>}
                  visibleCount={2}
                >
                  {tabActive === 'human' ? (
                    <Gcol className="w-full">
                      <FormTable caption="포인트정보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}>
                        <FormRow vertical={true}>
                          <FormCell title={'피보험자'}>
                            김한화
                          </FormCell>
                          <FormCell title={'연령'}>
                            30
                          </FormCell>
                          <FormCell title={'직업명'}>
                            회사사무직종사자
                          </FormCell>
                          <FormCell title={'급수'}>
                            1급
                          </FormCell>
                          <FormCell title={'보장P'} tdClassName="justify-end items-center">
                            0
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      <FormTable caption="담보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}>
                        <FormRow vertical={true}>
                          <FormCell title={'담보명'}>
                          </FormCell>
                          <FormCell title={'보험기간'}>
                          </FormCell>
                          <FormCell title={'납입기간'}>
                          </FormCell>
                          <FormCell title={'가입금액'}>
                          </FormCell>
                          <FormCell title={'보장P'} tdClassName="justify-end items-center">
                            
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Gcol> 
                  ) : (
                    <Gcol className="w-full">
                      <FormTable caption="포인트정보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto', 'w-auto']}>
                        <FormRow vertical={true}>
                          <FormCell title={'소유자'}>
                            김한화
                          </FormCell>
                          <FormCell title={'직업업종'}>
                            30
                          </FormCell>
                          <FormCell title={'급수'}>
                            1급
                          </FormCell>
                          <FormCell title={'보장P'} tdClassName="justify-end items-center">
                            0
                          </FormCell>
                        </FormRow>
                      </FormTable>
                      <FormTable caption="소재지" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
                        <FormRow>
                          <FormCell title={'소재지'}
                          >
                          </FormCell>
                        </FormRow>
                      </FormTable>
                       <FormTable caption="담보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto']}>
                        <FormRow vertical={true}>
                          <FormCell title={'화재기본담보'}>
                            김한화
                          </FormCell>
                          <FormCell title={'가입금액'}>
                            30
                          </FormCell>
                          <FormCell title={'담보P'} tdClassName="justify-end items-center">
                            0
                          </FormCell>
                        </FormRow>
                      </FormTable>
                       <FormTable caption="담보" lineTop={false} cols={['w-auto', 'w-auto', 'w-auto', 'w-auto', 'w-auto']}>
                        <FormRow vertical={true}>
                          <FormCell title={'화재특약담보'}>
                            김한화
                          </FormCell>
                          <FormCell title={'보험기간'}>
                            30
                          </FormCell>
                          <FormCell title={'납입기간'}>
                            
                          </FormCell>
                          <FormCell title={'가입금액'}>
                            
                          </FormCell>
                          <FormCell title={'담보P'} tdClassName="justify-end items-center">
                            0
                          </FormCell>
                        </FormRow>
                      </FormTable>
                    </Gcol>  
                  )}
                </TabPager>
              );
            })()}
          </Gcol>
        </Grow>
      </Grow>    
    </Gcol>
  )
}
export const LTPZ021: Story = {
  render: () => <LTPZ021P />,
}

const LTPZ010_01P = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type07: '',
    type08: '',
  });

  type DummyDataType3 = {
    id: number;
    isCheck: boolean;
    field01: string;
    field02: string;
    field03: string;
    field04: string;
    field05: string;
    field06: string;
    field07: string;
    field08: string;
    field09: string;
    field10: string;
    field11: string;
    field12: string;
    field13: string;
    field14: string;
    field15: string;
    field16: string;
    field17: string;
    field18: string;
    field19: string;
  };

  const DummyData: DummyDataType3[] = [
    { id: 1, isCheck: true, field01: 'LA2131234123', field02: '한화실손의료보헌갱신형2601', field03: 'memoCreate', field04: '김한화', field05: '2009-01-01', field06: '9,999,999', field07: '', field08: '설계중', field09: '', field10: '', field11: '', field12: '신부산GA지점/00팀', field13: '박한화(123123)', field14: '박한화(123123)', field15: '', field16: '박한화(123123)', field17: '', field18: '배서설계', field19: '' },
    { id: 1, isCheck: true, field01: 'LA2131234123', field02: '한화실손의료보헌갱신형2601', field03: 'memoView', field04: '김한화', field05: '2009-01-01', field06: '9,999,999', field07: '', field08: '설계중', field09: '', field10: '', field11: '', field12: '신부산GA지점/00팀', field13: '박한화(123123)', field14: '박한화(123123)', field15: '', field16: '박한화(123123)', field17: '', field18: '배서설계', field19: '' },
    { id: 1, isCheck: true, field01: 'LA2131234123', field02: '한화실손의료보헌갱신형2601', field03: '', field04: '김한화', field05: '2009-01-01', field06: '9,999,999', field07: '', field08: '설계중', field09: '', field10: '', field11: '', field12: '신부산GA지점/00팀', field13: '박한화(123123)', field14: '박한화(123123)', field15: '', field16: '박한화(123123)', field17: '', field18: '배서설계', field19: '' },
  ];

  const columnDefs: (ColDef<DummyDataType3> | ColGroupDef<DummyDataType3>)[] = [
    {
      headerName: '설계번호',
      flex: 1,
      cellClass: 'text-center px-0!',
      cellRenderer: createFieldRenderer<DummyDataType3>('field01'),
      autoHeight: true,
    },
    {
      headerName: '상품명/구분',
      children: [
        {
          flex: 1.2,
          headerName: '플랜명/차량번호',
          cellClass: 'text-center px-0! ',
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType3>(
            'field02',
            ({ data }: ICellRendererParams<DummyDataType3>) => {
              if (data?.field03 === 'memoCreate') {
                return (
                  <Grow placement='ee' className='h-full pr-1'>
                    <Button aria-label="메모" variant={'none'} only="icon" size={'lg'} color={'gray-light'}>
                      <MemoIcon />
                    </Button>
                  </Grow>
                );
              } else if (data?.field03 === 'memoView') {
                return (
                  <Grow placement='ec' className='h-full pr-1' >
                      <Tooltip>
                        <TooltipTrigger asChild>
                        <Button color="secondary" onClick={() => {}} only="default" size="sm" variant="outlined">3대진단</Button>
                        </TooltipTrigger>
                        <TooltipContent
                          align="center"
                          side="bottom"
                          sideOffset={0}
                          variant="default"
                          className="w-[16rem]"
                        >
                          {`3대 진단비+특정치료비 지원해야하는 고객`}
                        </TooltipContent>
                      </Tooltip>
                  </Grow>
                );
              } else if (data?.field03 === '') {
                return null;
              }
            }
          ),
        },
      ],
    },
    {
      headerName: '계약자',
      cellClass: 'text-center px-0!',
      autoHeight: true,
      children: [
        {
          headerName: '생년월일',
          flex: 1,
          cellClass: 'text-center px-0!',
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType3>('field04', 'field05'),
        }
      ]
    },
    {
      headerName: '보험료(원)',
      autoHeight: true,
      children: [
        {
          headerName: '',
          cellClass: 'text-center px-0!',
          flex: 1,
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType3>('field06', 'field07'),
        }
      ]
    },
    {
      headerName: '설계일자',
      autoHeight: true,
      children: [
        {
          headerName: '유효기간',
          cellClass: 'text-center px-0!',
          flex: 1,
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType3>(
          <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
            2026-01-01
          </Button>, 
          <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
            2026-01-01
          </Button>)
        }
      ]
    },
    {
      headerName: '설계상태',
      children: [
        {
          headerName: '심사결과',
          cellClass: 'text-center px-0!',
          flex: 1,
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType3>('field08', 'field09'),
        }
      ]
    },
    {
      headerName: '청약서출력',
      children: [
        {
          headerName: '스캔여부',
          cellClass: 'text-center px-0!',
          flex: 1,
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType3>( <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
            미출력
          </Button>, 'field11'),
        }
      ]
    },
    {
      headerName: '취급기관/팀',
      children: [
        {
          headerName: '취급자',
          cellClass: 'text-center px-0!',
          flex: 1,
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType3>('field12', 'field13'),
        }
      ]
    },
    {
      headerName: '최초설계자',
      children: [
        {
          headerName: 'SM',
          cellClass: 'text-center px-0!',
          flex: 1,
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType3>('field14', 
          <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
            ID
          </Button>),
        }
      ]
    },
    {
      headerName: '사용인',
      children: [
        {
          headerName: '부실유의',
          cellClass: 'text-center px-0!',
          flex: 1,
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType3>('field16', 'field17'),
        }
      ]
    },
    {
      headerName: '설계종료',
      children: [
        {
          headerName: '증권번호',
          cellClass: 'text-center px-0!',
          flex: 1,
          autoHeight: true,
          cellRenderer: createFieldRenderer<DummyDataType3>('field18', 
          <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
            LA20143129023123912
          </Button>),
        }
      ]
    }
  ];

  const [rowData, setRowData] = React.useState<DummyDataType3[]>(DummyData);
  const [errorRows, setErrorRows] = React.useState<number[]>(
    DummyData.filter(row => !row.isCheck).map(row => row.id)
  );

  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType3, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );

  return (
    <Gcol className="w-full" gap={4}>
      <Grow className='w-full' variant="box-round" placement={'bwe'}>
        <FormTable variant={'none'} caption="설계번호" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]','w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'보종군'}>
              <NativeSelect
                aria-label="보종군 선택"
                width="10rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '전체' },
                  { value: 'selection2', id: 'type01-2', label: '전체2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'조회구분'}>
              <NativeSelect
                aria-label="조회구분 선택"
                width="10rem"
                value={form.type02}
                onChange={(e) => setFormField('type02', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '전체' },
                  { value: 'selection2', id: 'type02-2', label: '전체2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>  
            <FormCell title={'설계구분'}>
              <NativeSelect
                aria-label="설계구분 선택"
                width="10rem"
                value={form.type03}
                onChange={(e) => setFormField('type03', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type03-1', label: '전체' },
                  { value: 'selection2', id: 'type03-2', label: '전체2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>  
            <FormCell title={'설계상태'}>
              <NativeSelect
                aria-label="설계상태 선택"
                width="10rem"
                value={form.type04}
                onChange={(e) => setFormField('type04', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'personalinfo-1', label: '전체' },
                  { value: 'selection2', id: 'personalinfo-2', label: '전체2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>  
            <FormCell title={'설계경로'}>
              <NativeSelect
                aria-label="설계경로 선택"
                width="10rem"
                value={form.type05}
                onChange={(e) => setFormField('type05', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'personalinfo-1', label: '전체' },
                  { value: 'selection2', id: 'personalinfo-2', label: '전체2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'설계조직'} colSpan={3}>
              <NativeSelect
                aria-label="설계조직 선택"
                width="10rem"
                value={form.type07}
                onChange={(e) => setFormField('type07', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type06-1', label: '선택1' },
                  { value: 'selection2', id: 'type06-2', label: '선택2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input aria-label="" width={'16rem'} value={'12345678'} />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>  
              <Input aria-label="" width={'16rem'} value={''} readOnly />
            </FormCell>  
            <FormCell title={'영업가족'}>
              <NativeSelect
                aria-label="영업가족 선택"
                width="10rem"
                value={form.type08}
                onChange={(e) => setFormField('type08', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type08-1', label: '선택1' },
                  { value: 'selection2', id: 'type08-2', label: '선택2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
            </FormCell>
            <FormCell title={'설계일자'} colSpan={3}>
              <DatePickerInput
                errorMsg="입력은 필수입니다."
                errorPs="bl"
                mode="range"
                onChange={() => {}}
                rangeValue={{
                  from: '2026-03-01',
                  to: '2026-03-07'
                }}
                required
                size="lg"
                width="sm"
              />
            </FormCell>    
          </FormRow>
        </FormTable>  
        <Grow>
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <SearchIcon color={'var(--color-primary-50)'} />
          </Button>  
          <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">
            새로고침
          </Button>
        </Grow>
      </Grow>
      <Grow className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType3>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: false }}
            animateRows={false}
            alwaysShowHorizontalScroll={true}
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
            rowSelection={{
              mode: 'multiRow',
              headerCheckbox: false,
              checkboxes: true,
              enableClickSelection: false,
            }}
            selectionColumnDef={{
              headerName: '선택',
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
  )
}
export const LTPZ010_01: Story = {
  render: () => <LTPZ010_01P />,
}


