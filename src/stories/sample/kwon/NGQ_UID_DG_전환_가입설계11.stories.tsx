import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grow, Gcol, Typo } from '@atoms';
import { Title, Primary } from '@storybook/addon-docs/blocks';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { NativeSelect, NativeSelectOption } from '@uiux/NativeSelect';
import { useFormFields } from '@/shared/hooks/useFormFields';
import { Checkbox } from '@uiux/Checkbox';
import { Input } from '@uiux/Input';
import { InfoBox } from '@common/InfoBox';


ModuleRegistry.registerModules([AllCommunityModule]);


const meta: Meta = {
  title: 'Sample/kwon/NGQ_UID_DG_V0.22/11_주차장배상책임',
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
            <h2>LTPZ043</h2>
            <Primary />
          </>
        );
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const LTPZ043P = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
    type06: '',
    type07: '',
    type08: '',
  });
  
  return(
    <Gcol>
      <Grow className='w-full' variant="box-round">
        <FormTable variant={'none'} caption="설계번호" cols={['w-[14rem] min-w-[14rem]']}>
          <FormRow>
            <FormCell title={'설계번호'}>
              <Grow gap={2}>
                <Typo variant={'body-sm'}>설계번호</Typo> 
                <Typo variant={'body-sm'}>설계번호의 상품명</Typo>
              </Grow>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <FormTable caption="주차장 정보" cols={['w-[14rem] min-w-[14rem]', 'w-[14rem] min-w-[14rem]', 'w-auto', 'w-auto']}>
        <FormRow>
          <FormCell title={'옥내주차장'} titleColSpan={2}>
            <Checkbox
              color="primary"
              errorMsg="선택은 필수입니다."
              errorPs="bl"
              onCheckedChange={() => {}}
              size="lg"
              variant="noneText"
            >
            </Checkbox>
            <Input errorMsg="입력은 필수입니다." errorPs="bl"  onChange={(e) => setFormField('type01', e.target.value)} size="lg" value={form.type01} variant="default" width="10rem" commaAmount after={'㎡'}/>
            ↔
            <Input errorMsg="입력은 필수입니다." errorPs="bl"  onChange={(e) => setFormField('type02', e.target.value)} size="lg" value={form.type02} variant="default" width="10rem" commaAmount after={'평'}/>
          </FormCell>
          <FormCell>
            <Input onChange={() => {}} size="lg" value={'10,000,000'} variant="default" width="12rem"  commaAmount after="원" readOnly/>
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'2단주차기'} titleColSpan={2}>
            <Checkbox
              color="primary"
              errorMsg="선택은 필수입니다."
              errorPs="bl"
              onCheckedChange={() => {}}
              size="lg"
              variant="noneText"
            >
            </Checkbox>
            <Input errorMsg="입력은 필수입니다." errorPs="bl"  onChange={(e) => setFormField('type03', e.target.value)} size="lg" value={form.type03} variant="default" width="10rem" commaAmount after={'대'}/>
          </FormCell>
          <FormCell>
            <Input onChange={() => {}} size="lg" value={'10,000,000'} variant="default" width="12rem" commaAmount after="원" readOnly/>
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'기계식주차기'} titleColSpan={2}>
            <Checkbox
              color="primary"
              errorMsg="선택은 필수입니다."
              errorPs="bl"
              onCheckedChange={() => {}}
              size="lg"
              variant="noneText"
            >
            </Checkbox>
            <Input errorMsg="입력은 필수입니다." errorPs="bl"  onChange={(e) => setFormField('type04', e.target.value)} size="lg" value={form.type04} variant="default" width="10rem" commaAmount after={'대'}/>
          </FormCell>
          <FormCell>
            <Input onChange={() => {}} size="lg" value={'10,000,000'} variant="default" width="12rem" commaAmount after="원" readOnly/>
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'카리프트'} titleColSpan={2}>
            <Checkbox
              color="primary"
              errorMsg="선택은 필수입니다."
              errorPs="bl"
              onCheckedChange={() => {}}
              size="lg"
              variant="noneText"
            >
            </Checkbox>
            <Input errorMsg="입력은 필수입니다." errorPs="bl"  onChange={(e) => setFormField('type05', e.target.value)} size="lg" value={form.type05} variant="default" width="10rem" commaAmount after={'대'}/>
          </FormCell>
          <FormCell>
            <Input onChange={() => {}} size="lg" value={'10,000,000'} variant="default" width="12rem" commaAmount after="원" readOnly/>
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'보상한도'} titleRowSpan={2}></FormCell>
          <FormCell title={'대인보상'} colSpan={2}>
            (1사고당)
            <NativeSelect
              aria-label="선택"
              width="10rem"
              value={form.type06}
              onChange={(e) => setFormField('type06', e.target.value)}
            >
              {[
                { value: 'selection', id: 'type06-1', label: '선택1' },
                { value: 'selection2', id: 'type06-2', label: '선택2' },
              ].map((option) => (
                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
              ))}
            </NativeSelect>
            (1인장)
            <Input onChange={() => {}} size="lg" value={''} variant="default" width="10rem" readOnly/>
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'대물보상'} colSpan={2}>
            (1사고당)
            <NativeSelect
              aria-label="선택"
              width="10rem"
              value={form.type06}
              onChange={(e) => setFormField('type06', e.target.value)}
            >
              {[
                { value: 'selection', id: 'type06-1', label: '선택1' },
                { value: 'selection2', id: 'type06-2', label: '선택2' },
              ].map((option) => (
                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
              ))}
            </NativeSelect>
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell title={'공제금액'} titleColSpan={2} colSpan={2}>
              <NativeSelect
              aria-label="선택"
              width="10rem"
              value={form.type07}
              required
              onChange={(e) => setFormField('type07', e.target.value)}
            >
              {[
                { value: 'selection', id: 'type07-1', label: '선택1' },
                { value: 'selection2', id: 'type07-2', label: '선택2' },
              ].map((option) => (
                <NativeSelectOption key={option.id} value={option.value}>{option.label}</NativeSelectOption>
              ))}
            </NativeSelect>
          </FormCell>
        </FormRow>
      </FormTable>
      <InfoBox bg subTitle="해당업종의 면적은 ㎡단위(1평=3.3㎡)로 입력하시기 바랍니다." variant="warning"></InfoBox>         
    </Gcol>    
  )
}
export const LTPZ043: Story = {
  render: () => <LTPZ043P />,

}
