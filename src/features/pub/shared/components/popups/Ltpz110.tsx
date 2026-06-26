/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { DialogBottomInfo } from '@/shared/components/common/DialogBottomInfo';
import '@/shared/lib/agGridPub';
import { Gcol, Grow, Typo } from '@atoms';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { Button } from '@uiux/Button';
import { CheckboxGroup, CheckboxGroupItem } from '@uiux/Checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';
import { RadioGroup, RadioGroupItem } from '@uiux/RadioGroup';

interface Ltpz110Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Ltpz110 = ({ open = true, onOpenChange }: Ltpz110Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              고지유형 찾기 정보 변경
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (Ltpz110)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Gcol placement="ss">
            <Typo>아래 정보를 변경 후 [재조회]를 눌러주세요.</Typo>
            <FormTable caption="추가고지 및 적용담보 설정" cols={['w-[7rem]', 'w-[7rem]', 'w-auto']}>
              <FormRow>
                <FormCell title="간편 추가 고지형" titleRowSpan={2} tdNone />
                <FormCell title="고혈압">
                  <RadioGroup defaultValue="Y">
                    <RadioGroupItem value="Y" id="hypertension-Y">
                      있음
                    </RadioGroupItem>
                    <RadioGroupItem value="N" id="hypertension-N">
                      없음
                    </RadioGroupItem>
                  </RadioGroup>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title="당뇨">
                  <RadioGroup defaultValue="N">
                    <RadioGroupItem value="Y" id="diabetes-Y">
                      있음
                    </RadioGroupItem>
                    <RadioGroupItem value="N" id="diabetes-N">
                      없음
                    </RadioGroupItem>
                  </RadioGroup>
                </FormCell>
              </FormRow>
              <FormRow>
                <FormCell title="(공통)적용담보" titleColSpan={2}>
                  {/* <Grid className="grid-cols-4 gap-y-2">
                    <Checkbox id="cov-1">질병휴유</Checkbox>
                    <Checkbox id="cov-2">암</Checkbox>
                    <Checkbox id="cov-3">2대</Checkbox>
                    <Checkbox id="cov-4">질병입원비</Checkbox>
                    <Checkbox id="cov-5">질병수술비</Checkbox>
                    <Checkbox id="cov-6">상해입원비</Checkbox>
                    <Checkbox id="cov-7">상해수술비</Checkbox>
                  </Grid> */}
                  <CheckboxGroup className="grid grid-cols-4 gap-y-2 gap-x-1">
                    {[
                      { label: '질병휴유', value: '0' },
                      { label: '암', value: '1' },
                      { label: '2대', value: '2' },
                      { label: '질병입원비', value: '3' },
                      { label: '질병수술비', value: '4' },
                      { label: '상해입원비', value: '5' },
                      { label: '상해수술비', value: '6' },
                      { label: '상해후유3%', value: '7' },
                      { label: '요양진단비', value: '8' },
                    ].map((category) => (
                      <CheckboxGroupItem key={category.value} value={category.value}>
                        {category.label}
                      </CheckboxGroupItem>
                    ))}
                  </CheckboxGroup>
                </FormCell>
              </FormRow>
            </FormTable>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'} color={'primary'}>
                재조회
              </Button>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz110;
