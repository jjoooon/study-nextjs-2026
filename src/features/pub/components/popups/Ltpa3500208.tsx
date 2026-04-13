'use client';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { PopupBaseProps } from '@/shared/types/uiTypes';
import { Gcol, Grow, Typo } from '@atoms';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';
import { FormCell, FormRow, FormTable } from '@/shared/components/common/FormTable';
import { NativeSelect, NativeSelectOption } from '@/shared/components/uiux/NativeSelect';
import { Input } from '@/shared/components/uiux/Input';

ModuleRegistry.registerModules([AllCommunityModule]);

export const Ltpa3500208 = ({ open, onOpenChange }: PopupBaseProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              출생전후 예정보험료
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPA350)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[1fr]">
          <Grow className="w-full" variant="box-round" placement={'ss'}>
            <FormTable
              caption="보험정보"
              cols={['w-auto', 'w-auto', 'w-auto']}
              variant="head"
            >
              <FormRow>
                <FormCell title={'설계번호'}>
                  <Input aria-label="" width={'15rem'} value={'LA260209313558'} readOnly />
                  -
                  <Input aria-label="" width={'3rem'} value={'1'} readOnly />
                </FormCell>
                <FormCell title={'보험시기'}>2026-03-01</FormCell>
                <FormCell title={'설계상태'}>TEXT</FormCell>
              </FormRow>
              <FormRow>
                <FormCell title={'피보험자'} colSpan={3}>
                  <NativeSelect
                    aria-label="피보험자 선택"
                    width="10rem"
                  >
                    {[
                      { value: '', id: 'insured-0', label: '선택' },
                      { value: 'insured1', id: 'insured-1', label: '선택1' },
                      { value: 'insured2', id: 'insured-2', label: '선택2' },
                    ].map((option) => (
                      <NativeSelectOption key={option.id} value={option.value}>
                        {option.label}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Gcol className="w-full" gap={5} placement="ss">
            <Typo tag={'p'} variant={'body-lg'}>
              복사할 기능을 선택하세요.
            </Typo>
            <Gcol className="w-full text-center" gap={1}>
              <Button
                style={{ width: '20rem' }}
                onClick={() => {}}
                size="xl"
                variant="outlined"
              >
                현재고객으로 복사
              </Button>
              <Button
                style={{ width: '20rem' }}
                onClick={() => {}}
                size="xl"
                variant="outlined"
              >
                신규 고객으로 복사 (간편 설계)
              </Button>
              <Button
                style={{ width: '20rem' }}
                onClick={() => {}}
                size="xl"
                variant="outlined"
              >
                다태아연계 복사
              </Button>
            </Gcol>
          </Gcol>
        </DialogSection>
        <DialogFooter>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
