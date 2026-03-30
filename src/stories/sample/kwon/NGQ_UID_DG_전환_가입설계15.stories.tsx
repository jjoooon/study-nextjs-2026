import type { Meta, StoryObj } from '@storybook/react';
import { Gcol } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { InfoBox } from '@/shared/components/common/InfoBox';



ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/15_부실유의계약 선별인수 확인서',
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
            <h2>LTPZ050</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPZ050P   = () => {

 

  return(
    <Gcol>
     <FormTable caption="부실유의계약 선별인수 확인서" cols={['w-[14rem] min-w-[14rem]', 'w-auto', 'w-[14rem] min-w-[14rem]', 'w-auto']} lineTop variant="default">
        <FormRow>
          <FormCell title={'상품명'}>
            Text
          </FormCell>
          <FormCell title={'설계번호'}>
            Text
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'계약자'}>
            Text
          </FormCell>
          <FormCell title={'주피보험자'}>
            Text
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'모집자'} colSpan={3}>
            Text
          </FormCell>
        </FormRow>
     </FormTable>
      <InfoBox
        bg
        subTitle="부실유의계약 해당 항목"
        variant="warning"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: '<strong>단 사유 입력시 DB 암호화  정책에 의거 개인정보 입력불가</strong>'
          }}
        />
      </InfoBox>
    </Gcol>    
  )
}
export const LTPZ050: Story = {
  render: () => <LTPZ050P />,

}
