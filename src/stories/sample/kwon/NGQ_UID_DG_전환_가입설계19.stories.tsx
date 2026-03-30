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
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/20_업종선택',
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
            <h2>LTPZ057</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPZ057P = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
  });
  
    
  return (
    <Gcol>
      <FormTable caption="월클릭스켄" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']}>
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
      
      
    </Gcol>
  );
};
export const LTPZ057: Story = {
  render: () => <LTPZ057P />,

}
