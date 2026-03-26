import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { ResetIcon, MemoIcon } from '@icons';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, EditableCallbackParams, ICellRendererParams } from 'ag-grid-community';
import { amountUnitInputCellRenderer, createCellValueChangedHandler, editableSelectCellRenderer, numberValueFormatter, createFieldRenderer, AgGridEmptyComponent } from '@aggrid';
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
  title: 'Sample/kwon/NGQ_UID_DG_전환_가입설계2',
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
            <h2>LTPA296</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPA296P = () => {
  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
  });
  
  // dummy data
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
  };
  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: true, field01: 'Text', field02: '10명', field03: '31110', field04: '회사 사무직 종사자', field05: '1/A', field06: '', field07: '999999999', field08: '', field09: '', field10: '', },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '그룹명',
      flex: 1,
      field: 'field01',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '인원',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '성별',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '평균연령',
      flex: 1,
      field: 'field04',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '직업코드',
      flex: 1,
      field: 'field05',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '직업명',
      flex: 1,
      field: 'field06',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '급수',
      flex: 1,
      field: 'field07',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '운전용도',
      flex: 1,
      field: 'field08',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
    {
      headerName: '보험료',
      flex: 1,
      field: 'field09',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true,
      valueParser: params => Number(params.newValue) || 0,
      valueFormatter: numberValueFormatter, // 천단위 콤마 표시
      cellClassRules: {
        'ag-cell-error-border': params => params.value === '' || params.value === undefined || Number(params.value) === 0,
      },
    },
    {
      headerName: '등록인원',
      flex: 1,
      field: 'field10',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
      editable: true
    },
  ];
  
  // rowSelection 사용시
  const [rowData, setRowData] = React.useState<DummyDataType[]>(DummyData);
  const [errorRows, setErrorRows] = React.useState<number[]>(
    DummyData.filter(row => !row.isCheck).map(row => row.id)
  );
  const onCellValueChanged = React.useMemo(
    () => createCellValueChangedHandler<DummyDataType, number>('isCheck', setRowData, setErrorRows, 'id'),
    [setRowData, setErrorRows]
  );
    


  return (
    <Gcol className="w-full" gap={4}>
      <Grow className='w-full' variant="box-round" placement={'bwe'}>
        <FormTable variant={'none'} caption="설계번호" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
          <FormRow>
            <FormCell title={'설계번호'}>
              <Input aria-label="" width={'20rem'} value={'대표담보명.text'} readOnly />
            </FormCell>
            <FormCell title={'발행후변경순번'}>
              <Input aria-label="" width={'20rem'} value={'Text'} readOnly />
            </FormCell>
            <FormCell title={'피보험자찾기'}>
              <NativeSelect
                aria-label="설계번호 선택"
                width="10rem"
                value={form.type01}
                onChange={(e) => setFormField('type01', e.target.value)}
                readOnly
              >
                {[
                  { value: 'selection', id: 'type01-1', label: '전체' },
                  { value: 'selection2', id: 'type01-2', label: '전체2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input aria-label="" width={'20rem'} value={'Text'} readOnly />
            </FormCell>
          </FormRow>
        </FormTable>  
        <Grow>
          <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
            <ResetIcon />
          </Button>  
          <Button color="secondary" onClick={() => { }} only="default" size="lg" variant="outlined">
            조회
          </Button>
        </Grow>
      </Grow>
      <Gcol className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType>
            getRowId={params => String(params.data.id)}
            noRowsOverlayComponent={AgGridEmptyComponent}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ 
              sortable: false,
              resizable: false,
            }}

            // 에디터 시
            singleClickEdit={true}
            onCellValueChanged={onCellValueChanged}
            
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
              params.api.forEachNode(node => {
                if (node.data?.isCheck) {
                  node.setSelected(true);
                }
              });
            }}
          />
        </div>
        <InfoBox title="설계조회 가능기간: 취급기간(7일), 법인대리점(30일), FC/사용인/개인대리점 등(60일) " variant="info" bg={false} />
      </Gcol>
    </Gcol>
  )
}
export const LTPA296: Story = {
  render: () => <LTPA296P />,
}
