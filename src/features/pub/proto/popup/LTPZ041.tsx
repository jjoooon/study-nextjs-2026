'use client';

import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea } from '@uiux/Dialog';
import { TableFold, TableFoldHead, TableFoldBody } from '@common/TableFold';

import { Input } from '@uiux/Input';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { InfoBox } from '@/shared/components/common/InfoBox';
import { useFormFields } from '@/shared/hooks/useFormFields';
import type { PopupBaseProps } from './types';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ041 = ({ open, onOpenChange }: PopupBaseProps) => {
  
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
  });
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>개인사업자 정보 등록</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ041)</Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection className="grid-rows-[auto_1fr]">
          <TableFold>
            <TableFoldHead title="개인사업자정보">
            </TableFoldHead>
            <TableFoldBody>
               <Gcol>
                <FormTable caption="사업자" cols={['w-[14rem] min-w-[14rem]', 'w-auto']}>
                    <FormRow>
                      <FormCell title={'사업자명'}>
                        <Input size="lg" value={form.type01} variant="default" width="md" onChange={(e) => setFormField('type01', e.target.value)} required />
                      </FormCell>
                    </FormRow>
                    <FormRow>
                      <FormCell title={'사업자번호'}>
                        <Input size="lg" value={form.type02} variant="default" width="md" onChange={(e) => setFormField('type02', e.target.value)} required/>
                      </FormCell>
                    </FormRow>
                  </FormTable>

                  <InfoBox
                    subTitle="개인사업자정보는 계약자의 보조정보로 계약자는 대표자인 개인으로 함"
                    variant="info"
                    >
                  </InfoBox>
                  <InfoBox
                    subTitle="계약자와 개인사업자의 대표자가 동일한 경우만 입력 가능(사업자등록증 스캔 필수)"
                    variant="info"
                    >
                  </InfoBox>
               </Gcol>
            </TableFoldBody>
          </TableFold>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'contained'} size={'xl'}>
                저장
              </Button>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'} onClick={onOpenChange ? () => onOpenChange(false) : undefined}>
                닫기
              </Button>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
	);
};
