/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { BulletItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import '@/shared/lib/agGridPub';

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
  isID?: boolean;
}

const Ltpz110 = ({ open = true, onOpenChange, isID }: Ltpz110Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              고지유형 찾기 정보 변경
            </Typo>
            {!isID && (
              <Typo tag={'p'} variant={'body-xl'}>
                (Ltpz110)
              </Typo>
            )}
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Gcol placement="ss">
            <Typo>아래 정보를 변경 후 [재조회]를 눌러주세요.</Typo>
            <FormTable caption="추가고지 및 적용담보 설정" cols={['w-[7.2rem]', 'w-[6rem]', 'w-auto']}>
              <FormRow>
                <FormCell title={isID ? '간편 추가 고지형' : '추가고지'} titleRowSpan={2} tdNone />
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
                  <CheckboxGroup className="flex flex-wrap gap-y-2 gap-x-1">
                    {(isID
                      ? [
                          { label: '질병후유3%', value: '0' },
                          { label: '암', value: '1' },
                          { label: '2대', value: '2' },
                          { label: '질병입원비', value: '3' },
                          { label: '질병수술비', value: '4' },
                          { label: '상해입원비', value: '5' },
                          { label: '상해수술비', value: '6' },
                          { label: '상해후유3%', value: '7' },
                          { label: '요양진단비', value: '8' },
                        ]
                      : [
                          { label: '질병후유', value: '0' },
                          { label: '암', value: '1' },
                          { label: '2대', value: '2' },
                          { label: '질병입원비', value: '3' },
                          { label: '질병수술비', value: '4' },
                          { label: '상해입원비', value: '5' },
                          { label: '상해수술비', value: '6' },
                        ]
                    ).map((category) => (
                      <div key={category.value} className="w-[calc(25%-6px)] min-w-[85px] whitespace-nowrap">
                        <CheckboxGroupItem value={category.value}>{category.label}</CheckboxGroupItem>
                      </div>
                    ))}
                  </CheckboxGroup>
                </FormCell>
              </FormRow>
            </FormTable>
            {!isID && (
              <BulletItem size="sm" type="star">
                간편고지 정보 변경 사항은 저장되지 않으므로, 알릴사항 입력시 새로 입력하시기 바랍니다.
              </BulletItem>
            )}
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
          {!isID && <DialogBottomInfo />}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz110;
