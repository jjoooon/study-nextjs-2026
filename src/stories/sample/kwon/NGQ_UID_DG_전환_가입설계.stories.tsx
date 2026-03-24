import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { SearchIcon } from '@icons';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { Checkbox } from '@uiux/Checkbox';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { createCellValueChangedHandler } from '@aggrid';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/shared/components/uiux/Table';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';
import { Form } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux/NativeSelect';
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
  const [relationValue, setRelationValue] = React.useState('');

  type DummyDataType = {
      id: number;
      isCheck: boolean;
      seq: number;
      docName: string;
      printSeq: string;
      issueSeq: string;
      customerName: string;
      scanDateTime: string;
      scanProcessor: string;
      compare: string;
    };
  
    const DummyData: DummyDataType[] = [
      { id: 1, isCheck: false, seq: 1, docName: '보험청약서', printSeq: 'P001', issueSeq: 'I001', customerName: '홍길동', scanDateTime: '2026-01-15 09:12:33', scanProcessor: '김처리', compare: '일치'},
      { id: 2, isCheck: false, seq: 2, docName: '개인정보동의서', printSeq: 'P002', issueSeq: 'I002', customerName: '이영희', scanDateTime: '2026-01-15 10:05:21', scanProcessor: '김처리', compare: '불일치' },
      { id: 3, isCheck: true, seq: 3, docName: '자필서명확인서', printSeq: 'P003', issueSeq: 'I003', customerName: '박철수', scanDateTime: '2026-01-16 11:30:00', scanProcessor: '이처리', compare: '일치' },
      { id: 4, isCheck: false, seq: 4, docName: '상품설명서', printSeq: 'P004', issueSeq: 'I004', customerName: '최지수', scanDateTime: '2026-01-16 14:22:45', scanProcessor: '이처리', compare: '일치' },
    ];
  
    const columnDefs: ColDef<DummyDataType>[] = [
      {
        headerName: '중복',
        field: 'seq',
        width: 70,
        cellClass: 'text-center',
      },
      {
        headerName: '문서명',
        field: 'docName',
        flex: 2,
      },
      {
        headerName: '출력순번',
        field: 'printSeq',
        width: 100,
        cellClass: 'text-center',
      },
      {
        headerName: '발행순번',
        field: 'issueSeq',
        width: 100,
        cellClass: 'text-center',
      },
      {
        headerName: '고객명',
        field: 'customerName',
        width: 100,
        cellClass: 'text-center',
      },
      {
        headerName: '스캔일시',
        field: 'scanDateTime',
        flex: 1.5,
        cellClass: 'text-center',
      },
      {
        headerName: '스캔처리자',
        field: 'scanProcessor',
        width: 110,
        cellClass: 'text-center',
      },
      {
        headerName: '비교',
        field: 'compare',
        width: 80,
        cellClass: 'text-center',
      },
    ];
    
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
      <FormTable caption='계약기본사항' cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
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
              onCheckedChange={() => {}}
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
      <FormTable caption='피보험자' cols={['w-[14rem] min-w-[14rem]', 'min-w-[32.6rem] flex-1', 'w-[14rem] min-w-[14rem]','min-w-[32.6rem] flex-1']}>
        <FormRow>
          <FormCell title={'피보험자'}>
             <Input aria-label="" width={'7rem'} value={'김한화'} readOnly />
            <Input aria-label="" width={'14rem'} value={'910101-1******'} readOnly />
          </FormCell>
          <FormCell title={'알림사항'}>
            <Checkbox
              color="primary"
              errorMsg="선택은 필수입니다."
              errorPs="bl"
              onCheckedChange={() => {}}
              size="lg"
              variant="default"
            >
              의료급여수급권자할인
            </Checkbox>
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
              required
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
            <Button color="secondary" onClick={() => {}} only="default" size="md" variant="contained">
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
