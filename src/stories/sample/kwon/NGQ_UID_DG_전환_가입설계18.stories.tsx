import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, GridApi, IHeaderParams } from 'ag-grid-community';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { AgGridEmptyComponent, createCellValueChangedHandler} from '@/shared/components/aggrid/aggridComponents';
import { AgGridReact } from 'ag-grid-react';
import { Input } from '@/shared/components/uiux/Input';
import { Button } from '@/shared/components/uiux/Button';
import { SearchIcon } from '@/shared/components/icons/CommonIcons';
import { Checkbox } from '@uiux/Checkbox';
import { RadioGroup, RadioGroupItem } from '@/shared/components/uiux/RadioGroup';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/18_원클릭스캔',
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
            <h2>LTPZ053</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPZ053P = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
  });
  type DummyDataType = {
    id: number;
    isCheck: boolean;
    field01: string | number;
    field02: string | number;
    field03: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: true, field01: '김한화', field02: '911212-1111111', field03: '010-1234-5678'},
    { id: 2, isCheck: true, field01: '김한화', field02: '911212-1111111', field03: '010-1234-5678'},
    { id: 3, isCheck: true, field01: '김한화', field02: '911212-1111111', field03: '010-1234-5678'},
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
      <Grow className="ag-header-cell-label" >
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

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '고객명',
      width: 200,
      field: 'field01',
      cellClass: 'text-left flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '실명증표진위여부 확인서',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
     {
      headerName: '타인사망피보험자 동의확인서',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
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
    <Gcol>
      <Grow className='w-full' variant="box-round">
        <FormTable caption="월클릭스켄" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']} variant={'none'}>
          <FormRow>
            <FormCell title={'설계번호'}>
              <Input aria-label="" width={'16rem'} value={'12345678'}/>
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </FormCell>
            <FormCell title={'취급자 연락처'}>
              한화 더 건강한 한아름 종합 보험2601
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <div className="ag-theme-alpine aggrid-pagination-ko w-full">
        <AgGridReact<DummyDataType>
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
            headerCheckbox: false,
            checkboxes: true,
            enableClickSelection: true,
          }}
          selectionColumnDef={{
            headerName: '선택',
          }}
          onGridReady={params => {
            gridApiRef.current = params.api;
            params.api.forEachNode(node => {
              if (node.data?.isCheck) {
                node.setSelected(true);
              }
            });
          }}
        />
      </div>
      <FormTable caption="월클릭스켄" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow >
            <FormCell title={'구분'} colSpan={5}>
              <RadioGroup
                className="gap-2"
                errorMsg="하나를 선택해주세요."
                errorPs="bl"
                onValueChange={() => {}}
                width="full"
              >
                <RadioGroupItem
                  color="primary"
                  id="d1"
                  size="lg"
                  value="option1"
                  variant="default"
                >
                  주민등록증
                </RadioGroupItem>
                <RadioGroupItem
                  color="primary"
                  id="d2"
                  size="lg"
                  value="option2"
                  variant="default"
                >
                  운전면허증
                </RadioGroupItem>
                <RadioGroupItem
                  color="primary"
                  id="d3"
                  size="lg"
                  value="option3"
                  variant="default"
                >
                  외국인등록증
                </RadioGroupItem>
                <RadioGroupItem
                  color="primary"
                  id="d4"
                  size="lg"
                  value="option4"
                  variant="default"
                >
                  사업자등록번호
                </RadioGroupItem>
              </RadioGroup>
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'취급자 연락처'}>
              <Input aria-label="" width={'16rem'} value={'12345678'} required readOnly/>
            </FormCell>
            <FormCell title={'주민등록번호'}>
              <Input aria-label="" width={'16rem'} value={'12345678'} required readOnly/>
            </FormCell>
            <FormCell title={'발급일자'}>
              <Input aria-label="" width={'16rem'} value={'12345678'} required readOnly/>
              <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">신원확인</Button>
            </FormCell>
          </FormRow>
        </FormTable>
      <FormTable caption="월클릭스켄" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
        <FormRow >
          <FormCell title={'진위여부'}>
            <Input aria-label="" width={'16rem'} value={'12345678'} readOnly/>
          </FormCell>
          <FormCell title={'사유'}>
            <Input aria-label="" width={'30rem'} value={'12345678'} readOnly/>
            <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">확인서발행</Button>

          </FormCell>
        </FormRow>
      </FormTable>
    </Gcol>
  );
};
export const LTPZ053: Story = {
  render: () => <LTPZ053P />,

}
