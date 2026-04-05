import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol } from '@atoms';
import { Input } from '@uiux/Input';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { useFormFields } from '@hooks/useFormFields';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/Ha/전환_가입설계_0326/LTPA401',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />
          <h2>가입설계 &gt; 설계데이터조회 &gt; 납입예정리스트 LTPA401</h2>
          <Primary />
        </>
      ),
    },
  },
};

export default meta;

type LTPA401Props = {
  isNoData?: boolean;
};

const LTPA401 = (props: LTPA401Props) => {

  // form event
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
  });

  return (
    <Gcol className="w-full gap-[1.2rem]">
      {/* form */}
      <Grow className="w-full" variant='box-round'>
        <FormTable variant='none'
          caption="설계접수번호 테이블"
          cols={[
            'w-[14rem]', 'min-w-[16rem] flex-1',
          ]}
        >
          <FormRow>
            <FormCell title={'설계번호'}>
              <b>LA260209313558</b>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>

      <Grow className="w-full">
        <FormTable caption="요청내용 테이블"
          cols={[
            'w-[14rem]', 'min-w-[16rem] flex-1',
            'w-[14rem]', 'min-w-[16rem] flex-1',
            'w-[14rem]', 'min-w-[16rem] flex-1',
          ]}>
          <FormRow>
            <FormCell title={'접수번호'}>
              
            </FormCell>
            <FormCell title={'진행상태'}>
              
            </FormCell>
            <FormCell title={''}>
              
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'요청자사번'}>
              
            </FormCell>
            <FormCell title={'요청자명'}>
              
            </FormCell>
            <FormCell title={'요청자 휴대폰 번호'}>
              
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'상품(상품유형)'}>
              
            </FormCell>
            <FormCell title={'플랜'}>
              
            </FormCell>
            <FormCell title={'희망보험료'}>
              
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'계약자명'}>
              
            </FormCell>
            <FormCell title={'계약자 생년월일'}>
              
            </FormCell>
            <FormCell title={''}>
              
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'피보험자명'}>
              
            </FormCell>
            <FormCell title={'피보험자 생년월일'}>
              
            </FormCell>
            <FormCell title={'상해급수'}>
              3급
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'기타요청내용'} colSpan={5}>
              
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow> 

      {/* 처리결과 등록 테이블 */}
      <Grow className="w-full">
        <FormTable caption="처리결과 등록 테이블" cols={['w-[14rem]', 'min-w-[18rem] flex-1']}>
          <FormRow>
            <FormCell title={'처리결과'}>
              <RadioGroup
                className="gap-2"
                errorMsg="하나를 선택해주세요."
                errorPs="bl"
                onValueChange={() => { }}
                width="full"
              >
                <RadioGroupItem
                  color="primary"
                  id="result1"
                  size="lg"
                  value="option1"
                  variant="default"
                  checked={true}
                >
                  설계완료
                </RadioGroupItem>
                <RadioGroupItem
                  color="primary"
                  id="result2"
                  size="lg"
                  value="option2"
                  variant="default"
                >
                  반려
                </RadioGroupItem>
              </RadioGroup>
            </FormCell>
          </FormRow> 
          <FormRow>
            <FormCell title={'설계번호'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
                readOnly
              />
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title={'메모'}>
              <Input
                placeholder=""
                size="lg"
                value=""
                variant="default"
                width="full"
                readOnly
              />
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>

    </Gcol>
  );
}

type Story = StoryObj<typeof meta>;

export const LTPA401Story: Story = {
  render: () => <LTPA401 />,
};

export const LTPA401NoData: Story = {
  render: () => <LTPA401 isNoData={true} />,
};