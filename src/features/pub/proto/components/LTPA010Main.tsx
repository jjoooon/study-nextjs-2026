
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { Input } from '@uiux/Input';
import { SearchIcon, MemoIcon, QuestionMark } from '@icons';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef, ColGroupDef, EditableCallbackParams, ICellRendererParams } from 'ag-grid-community';
import { createCellValueChangedHandler, AgGridEmptyComponent, createFieldRenderer } from '@aggrid';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { Tooltip, TooltipContent, TooltipTrigger } from '@uiux/Tooltip';
import { InfoBox } from '@common/InfoBox';
import { DatePickerInput } from '@/shared/components/common/DatePicker';
import { useFormFields } from '@hooks/useFormFields';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPA010Main = () => {
  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type07: '',
    type08: '',
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
    field11: string | number;
    field12: string | number;
    field13: string | number;
    field14: string | number;
    field15: string | number;
    field16: string | number;
    field17: string | number;
    field18: string | number;
    field19: string | number;
  };
  const DummyData: DummyDataType[] = [
    { id: 1, isCheck: true, field01: 'LA2131234123', field02: '한화실손의료보헌갱신형2601', field03: 'memoCreate', field04: '김한화', field05: '2009-01-01', field06: '9,999,999', field07: '', field08: '설계중', field09: '', field10: '', field11: '', field12: '신부산GA지점/00팀', field13: '박한화(123123)', field14: '박한화(123123)', field15: '', field16: '박한화(123123)', field17: '', field18: '배서설계', field19: '' },
    { id: 2, isCheck: true, field01: 'LA2131234123', field02: '한화실손의료보헌갱신형2601', field03: 'memoView', field04: '김한화', field05: '2009-01-01', field06: '9,999,999', field07: '', field08: '설계중', field09: '', field10: '', field11: '', field12: '신부산GA지점/00팀', field13: '박한화(123123)', field14: '박한화(123123)', field15: '', field16: '박한화(123123)', field17: '', field18: '배서설계', field19: '' },
    { id: 3, isCheck: true, field01: 'LA2131234123', field02: '한화실손의료보헌갱신형2601', field03: '', field04: '김한화', field05: '2009-01-01', field06: '9,999,999', field07: '', field08: '설계중', field09: '', field10: '', field11: '', field12: '신부산GA지점/00팀', field13: '박한화(123123)', field14: '박한화(123123)', field15: '', field16: '박한화(123123)', field17: '', field18: '배서설계', field19: '' },
  ];

  // AgGrid Column 
  const columnDefs: (ColDef<DummyDataType> | ColGroupDef<DummyDataType>)[] = [
    {
      headerName: '설계번호',
      flex: 1,
      cellClass: 'text-center px-0!',
      cellRenderer: createFieldRenderer<DummyDataType>('field01'),
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
          cellRenderer: createFieldRenderer<DummyDataType>(
            'field02',
            ({ data }: ICellRendererParams<DummyDataType>) => {
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
          cellRenderer: createFieldRenderer<DummyDataType>('field04', 'field05'),
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
          cellRenderer: createFieldRenderer<DummyDataType>('field06', 'field07'),
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
          cellRenderer: createFieldRenderer<DummyDataType>(
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
          cellRenderer: createFieldRenderer<DummyDataType>('field08', 'field09'),
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
          cellRenderer: createFieldRenderer<DummyDataType>( <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
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
          cellRenderer: createFieldRenderer<DummyDataType>('field12', 'field13'),
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
          cellRenderer: createFieldRenderer<DummyDataType>('field14', 
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
          cellRenderer: createFieldRenderer<DummyDataType>('field16', 'field17'),
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
          cellRenderer: createFieldRenderer<DummyDataType>('field18', 
          <Button color="link" onClick={() => {}} only="default" size="lg" variant="text">
            LA20143129023123912
          </Button>),
        }
      ]
    }
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
                required
                onChange={(e) => setFormField('type02', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type02-1', label: '전체' },
                  { value: 'selection2', id: 'type02-2', label: '전체2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input aria-label="" width={'16rem'} value={'123123'} required/>
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
                required
                onChange={(e) => setFormField('type07', e.target.value)}
              >
                {[
                  { value: 'selection', id: 'type06-1', label: '선택1' },
                  { value: 'selection2', id: 'type06-2', label: '선택2' },
                ].map((option) => (
                  <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
                ))}
              </NativeSelect>
              <Input aria-label="" width={'16rem'} value={'12345678'} required/>
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>  
              <Input aria-label="" width={'16rem'} value={''} required/>
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
      <Gcol className="w-full">
        <div className="ag-theme-alpine aggrid-pagination-ko w-full h-104!">
          <AgGridReact<DummyDataType>
            noRowsOverlayComponent={AgGridEmptyComponent}
            getRowId={params => String(params.data.id)}
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
              enableClickSelection: false,
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

export default LTPA010Main;