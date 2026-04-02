'use client';
// 권오택
import * as React from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { Button } from '@uiux/Button';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogSection, DialogTitle } from '@uiux/Dialog';

import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridEmptyComponent } from '@/shared/components/aggrid/aggridComponents';
import { useTabs } from '@/shared/hooks/useTabs';
import { TabPager } from '@/shared/components/common/TabPager';
import { Checkbox } from '@/shared/components/uiux/Checkbox';
import type { PopupBaseProps } from './types';
import { Input } from '@/shared/components/uiux/Input';
import { SearchIcon } from '@/shared/components/icons/CommonIcons';

ModuleRegistry.registerModules([AllCommunityModule]);

export const LTPZ052 = ({ open, onOpenChange }: PopupBaseProps) => {
  const [policySearchPart, setPolicySearchPart] = React.useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="xl" >
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>특별조건특약조회</Typo>
            <Typo tag={'p'} variant={'body-xl'}>(LTPZ049)</Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection className='grid-rows-[auto_1fr]'>
          <Grow placement='bwe' className="w-full" variant={'box-round'} gap={5}>
            <FormTable caption="증권번호" cols={['w-[14rem]', 'w-auto','w-[14rem]', 'w-auto']} variant={'head'}>
              <FormRow>
                <FormCell title={'증권번호'} className='w-full'>
                  <Grow>
                    <Input aria-label="증권번호 검색" width={'10rem'} value={policySearchPart} onChange={(e) => setPolicySearchPart(e.target.value)} />
                    <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                      <SearchIcon color={'var(--color-primary-50)'} />
                    </Button>
                    <Input aria-label="" width={'30rem'} value={'한화 더 건강한 1040종합'} readOnly />
                  </Grow>
                </FormCell>
                <FormCell title={'증권번호'} className='w-full'>
                  <Grow>
                    <Input aria-label="" width={'6rem'} value={'123'} />
                    <Input aria-label="" width={'6rem'} value={'1234'} />
                    <Input aria-label="" width={'6rem'} value={'1234'} />
                  </Grow>
                </FormCell>
              </FormRow>
            </FormTable>
          </Grow>
          <Gcol className='w-full' gap={2.5}>
            
           </Gcol>
     
        </DialogSection> 

        <DialogFooter>
          <Gcol className="w-full" gap={0}>
            <Grow placement={'bwc'} gap={2} className="w-full pb-5 px-6">
              <Grow>
              </Grow>
              <Grow>
                <Button variant={'contained'} size={'xl'}>
                  확인
                </Button>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </Grow>
            </Grow>
            <DialogBottomInfo />
          </Gcol>
        </DialogFooter>
    </DialogContent>
  </Dialog>    
  );
};

export default LTPZ052;