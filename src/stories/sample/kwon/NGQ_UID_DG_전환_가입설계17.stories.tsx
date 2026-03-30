import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, GridApi, ICellRendererParams, IHeaderParams, SuppressKeyboardEventParams } from 'ag-grid-community';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@common/InfoBox';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { AgGridEmptyComponent, createCellValueChangedHandler } from '@/shared/components/aggrid/aggridComponents';
import { AgGridReact } from 'ag-grid-react';
import { Input } from '@/shared/components/uiux/Input';
import { Button } from '@/shared/components/uiux/Button';
import { SearchIcon } from '@/shared/components/icons/CommonIcons';
import { Checkbox } from '@uiux/Checkbox';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/17_일괄 가입설계동의 관리',
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
            <h2>LTPZ052</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPZ052P = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });
  type DummyDataType = {
    id: number;
    isCheck: boolean;
    isAuthcheck1: boolean;
    isAuthcheck2: boolean;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
    field05: string | number;
    field06: string | number;
    field07: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: true, isAuthcheck1: true, isAuthcheck2: true, field01: '12312312', field02: '911212-1111111', field03: '010-1234-5678', field04: '', field05: '', field06: '', field07: ''},
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

  const suppressGridKeyboardOnInput = (params: SuppressKeyboardEventParams<DummyDataType>) => params.event?.target instanceof HTMLInputElement;

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '순번',
      width: 100,
      field: 'id',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '인증방법',
      children: [
        {
          headerName: '동의서',
          width: 100,
          editable: true,
          field: 'isAuthcheck1',
          cellClass: 'text-center px-0! editable-cell',
          cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
          cellEditor: 'agCheckboxCellEditor',     // ag-Grid 기본 체크박스 에디터 사용
          suppressKeyboardEvent: suppressGridKeyboardOnInput,
          headerComponent: HeaderCheckbox,
          headerComponentParams: {
            getAllChecked: () => rowData.length > 0 && rowData.every((row) => Boolean(row.isAuthcheck1)),
            toggleAll: (next: boolean) => setRowData((prev) => prev.map((row) => ({ ...row, isAuthcheck1: next }))),
          },
        },
        {
          headerName: '모바일',
          width: 100,
          editable: true,
          field: 'isAuthcheck2',
          cellClass: 'text-center px-0! editable-cell',
          cellRenderer: 'agCheckboxCellRenderer', // ag-Grid 기본 체크박스 렌더러 사용
          cellEditor: 'agCheckboxCellEditor',     // ag-Grid 기본 체크박스 에디터 사용
          suppressKeyboardEvent: suppressGridKeyboardOnInput,
          headerComponent: HeaderCheckbox,
          headerComponentParams: {
            getAllChecked: () => rowData.length > 0 && rowData.every((row) => Boolean(row.isAuthcheck2)),
            toggleAll: (next: boolean) => setRowData((prev) => prev.map((row) => ({ ...row, isAuthcheck2: next }))),
          },
        }
      ]
    },
    {
      headerName: '고객명',
      flex: 1,
      minWidth: 360,
      field: 'field01',
      headerClass: 'border-l border-[#d4d4d5]',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto! border-l border-[#d4d4d5]',
      autoHeight: true,
      editable: true,
      suppressNavigable: true,
      suppressKeyboardEvent: suppressGridKeyboardOnInput,
      cellRenderer: (params: ICellRendererParams<DummyDataType>) => {
        return (
          <Grow className="w-full h-full flex items-center justify-center px-2">
            <div
              onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              onDoubleClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
              onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => event.stopPropagation()}
              className="w-full h-full flex items-center justify-center gap-1"
            >
              <Input
                aria-label=""
                width={'16rem'}
                value={String(params.value ?? '')}
                onChange={(event) => {
                  const value = event.target.value;
                  params.node.setDataValue('field01', value);
                }}
              />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
            </div>
          </Grow>
        );
      },
    },
    {
      headerName: '주민번호',
      flex: 1,
      field: 'field02',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
     {
      headerName: '전화번호',
      flex: 1,
      field: 'field03',
      cellClass: 'text-center px-0! flex [&>div>span]:h-auto!',
      autoHeight: true,
    },
    {
      headerName: '변경전 직업정보',
      children: [
        {
          headerName: '상해급수',
          flex: 1,
          field: 'field04',
          cellClass: 'text-center px-0! whitespace-nowrap',
        },
        {
          headerName: '직업',
          flex: 1,
          field: 'field05',
          cellClass: 'text-center px-0! whitespace-nowrap',
        }
      ]
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
        <FormTable caption="일괄 가입설계동의 관리" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']} variant={'none'}>
          <FormRow>
            <FormCell title={'취급자사번'}>
              <Input aria-label="" width={'16rem'} onChange={(e) => setFormField('type01', e.target.value)} value={form.type01}/>
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>  
              <Input aria-label="" width={'16rem'} value={'김한화'} readOnly/>
            </FormCell>
            <FormCell title={'취급자 연락처'}>
              <Input aria-label="" width={'6rem'} value={'123'} readOnly/>
              <div className='separator'>-</div>
              <Input aria-label="" width={'6rem'} value={'1234'} readOnly/>
              <div className='separator'>-</div>
              <Input aria-label="" width={'6rem'} value={'1234'} readOnly/>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <InfoBox bg variant="info"
        subTitle="고객 직업정보(상해급수) 또는 이륜차부담보 가입여부가 불일치 할 경우 신계약 체결이 불가능합니다. 해당 신계약 청약완료 이전에 기계약의 직업변경 또는 이윤차부담보 변경 완료 필요. 또한, 신계약 청약서 발행 이전에 배서(청약중 이후) 진행 필요"
      />
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
            headerCheckbox: true,
            checkboxes: true,
            enableClickSelection: true,
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
    </Gcol>
  );
};
export const LTPZ052: Story = {
  render: () => <LTPZ052P />,

}
