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
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/20_업종코드조회',
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

const LTPZ058P = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
  });
  const [searchType, setSearchType] = React.useState<'option1' | 'option2'>('option2');
  type DummyDataType = {
    id: number;
    isCheck: boolean;
    field01: string | number;
    field02: string | number;
    field03: string | number;
    field04: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },
    { id: 2, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },  
    { id: 3, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },  
    { id: 4, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },
    { id: 5, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },
    { id: 6, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },
    { id: 7, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },
    { id: 8, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },
    { id: 9, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },
    { id: 10, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },
    { id: 11, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },
    { id: 12, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },
    { id: 13, isCheck: true, field01: '일반', field02: '근린생활시설', field03: '010100', field04: '(1)휴게음식점' },
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
      headerName: '대분류',
      width: 200,
      field: 'field01',
      cellClass: 'text-left flex [&>div>span]:h-auto!',
      autoHeight: true,   
    },
    {
      headerName: '중분류',
      flex: 1,
      field: 'field02',
      cellClass: 'text-left flex',
      autoHeight: true,
    },
    {
      headerName: '영업위종',
      flex: 1,
      cellClass: 'text-left flex p-0! h-[2.9rem] [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: (params: { data: DummyDataType }) => (
        <Grow className="w-full h-full items-stretch">
          <span className="w-[30%] h-[2.9rem] flex items-center px-2">{params.data.field03}</span>
          <span className="w-px h-[2.9rem] bg-[#d4d4d5]" />
          <span className="w-[70%] h-[2.9rem] flex items-center px-2">{params.data.field04}</span>
        </Grow>
      ),
    },
  ];

  const categoryMajorColumnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '대분류',
      field: 'field01',
      flex: 1,
      cellClass: 'text-left flex',
      autoHeight: true,
    },
  ];

  const categoryMiddleColumnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '중분류',
      field: 'field02',
      flex: 1,
      cellClass: 'text-left flex',
      autoHeight: true,
    },
  ];

  const categoryBusinessColumnDefs: ColDef<DummyDataType>[] = [
    {
      headerName: '영업위종',
      flex: 1,
      cellClass: 'text-left flex p-0! h-[2.9rem] [&>div>span]:h-auto!',
      autoHeight: true,
      cellRenderer: (params: { data: DummyDataType }) => (
        <Grow className="w-full h-full items-stretch">
          <span className="w-[30%] h-[2.9rem] flex items-center px-2">{params.data.field03}</span>
          <span className="w-px h-[2.9rem] bg-[#d4d4d5]" />
          <span className="w-[70%] h-[2.9rem] flex items-center px-2">{params.data.field04}</span>
        </Grow>
      ),
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
            <FormCell title={null}>
              <RadioGroup
                className="gap-2"
                onValueChange={(value) => {
                  if (value === 'option1' || value === 'option2') {
                    setSearchType(value);
                  }
                }}
                value={searchType}
                width="full"
              >
                <RadioGroupItem
                  color="primary"
                  id="d1"
                  size="lg"
                  value="option1"
                  variant="default"
                >
                  분류기준
                </RadioGroupItem>
                <RadioGroupItem
                  color="primary"
                  id="d2"
                  size="lg"
                  value="option2"
                  variant="default"
                >
                  <Grow>
                    업종명
                    <Input aria-label="" width={'16rem'} onChange={(e) => setFormField('type01', e.target.value)} value={form.type01}/>
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                  </Grow>
                </RadioGroupItem>
              </RadioGroup>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      {searchType === 'option2' ? (
        <>
          {/* 업종명 */}
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
              
            />
          </div>
          <FormTable caption="업종설명" cols={['w-[14rem] min-w-[14rem]', 'w-auto']} >
            <FormRow>
              <FormCell title={'업종설명'}>
              [장기UW파트]~ 음식류(도시락 포함)를 제조하여 납품(택배 포함)하거나 위탁 급식하는 경우 공장 요율 적용
              한솥도시락(일반음식점 허가인 경우)
              음식류를 조리, 판매하는 곳으로 음주행위가 허용되는 곳. 대중음식점, 전문음식점, 간이주(소주방, 호프집,막걸리집, 토속주점 등) 등
              </FormCell>
            </FormRow>    
          </FormTable>
          {/* //업종명 */}
        </>
      ) : (
        <Gcol>
          {/* 분류기준 */}
          <Grow className='w-full gap-2'>
            <Grow className='w-1/5' variant="box-round">
              <div className="ag-theme-alpine aggrid-pagination-ko w-full">
                <AgGridReact<DummyDataType>
                  rowData={rowData}
                  columnDefs={categoryMajorColumnDefs}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                  }}
                  animateRows={false}
                  alwaysShowHorizontalScroll={true}
                  rowClassRules={{}}
                  domLayout="autoHeight"
                />
              </div>
            </Grow>
            <Grow className='w-1/5' variant="box-round">
              <div className="ag-theme-alpine aggrid-pagination-ko w-full">
                <AgGridReact<DummyDataType>
                  rowData={rowData}
                  columnDefs={categoryMiddleColumnDefs}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                  }}
                  animateRows={false}
                  alwaysShowHorizontalScroll={true}
                  rowClassRules={{}}
                  domLayout="autoHeight"
                />
              </div>
            </Grow>
            <Grow className='w-3/5' variant="box-round">
              <div className="ag-theme-alpine aggrid-pagination-ko w-full">
                <AgGridReact<DummyDataType>
                  rowData={rowData}
                  columnDefs={categoryBusinessColumnDefs}
                  noRowsOverlayComponent={AgGridEmptyComponent}
                  defaultColDef={{
                    sortable: false,
                    resizable: false,
                  }}
                  animateRows={false}
                  alwaysShowHorizontalScroll={true}
                  rowClassRules={{}}
                  domLayout="autoHeight"
                />
              </div>
            </Grow>
          </Grow>
          <FormTable caption="업종설명" cols={['w-[14rem] min-w-[14rem]', 'w-auto']} >
            <FormRow>
              <FormCell title={'업종설명'}>
              [장기UW파트]~ 음식류(도시락 포함)를 제조하여 납품(택배 포함)하거나 위탁 급식하는 경우 공장 요율 적용
              한솥도시락(일반음식점 허가인 경우)
              음식류를 조리, 판매하는 곳으로 음주행위가 허용되는 곳. 대중음식점, 전문음식점, 간이주(소주방, 호프집,막걸리집, 토속주점 등) 등
              </FormCell>
            </FormRow>    
          </FormTable>
          {/* //분류기준 */}
        </Gcol>
      )}
    </Gcol>
  );
};
export const LTPZ058: Story = {
  render: () => <LTPZ058P />,

}
