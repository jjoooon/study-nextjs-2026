'use client';
// 권오택
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle, DialogFooterArea } from '@uiux/Dialog';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent } from '@/shared/components/aggrid/aggridComponents';
import { InfoBox } from '@/shared/components/common/InfoBox';
import type { PopupBaseProps } from './types';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ050 = ({ open, onOpenChange }: PopupBaseProps) => {

   
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl" >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>부실유의계약 선별인수 확인서</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ050)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          <Gcol className='w-full' gap={5}>
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
        </DialogSection> 

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
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

export default LTPZ050;