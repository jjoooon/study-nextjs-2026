'use client';

import type { ColDef, ColGroupDef, EditableCallbackParams, GridApi, ICellEditorParams, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import { useTabs } from '@/shared/hooks/useTabs';
import { AgGridEmptyComponent } from '@aggrid';
import { Gcol, Grow, Typo, Grid } from '@atoms';
import { BulletItem, BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { FormCell, FormRow, FormTable } from '@common/FormTable';
import { TabPager } from '@common/TabPager';
import { Button } from '@uiux/Button';
import { Checkbox } from '@uiux/Checkbox';

import { Input } from '@uiux/Input';

import '@/shared/lib/agGridPub';
import { FileExportIcon, FileImportIcon, SearchIcon } from '@/shared/components/icons/CommonIcons';
import { TableFold, TableFoldBody, TableFoldHead } from '@/shared/components/common/TableFold';
import { useFormFields } from '@/shared/hooks/useFormFields';


const Ltpz01502 = () => {
  const [form, setFormField] = useFormFields({
    type01: '',
    type02: '',
    type03: '',
    type04: '',
    type05: '',
  });
  return (
    <Grid className='w-full grid-rows-[auto_1fr] h-full' gap={3}>
      <Grow className="w-full" variant="box-round">
        <FormTable variant={'head'} lineTop={false} caption="">
          <FormRow>
            <FormCell title={'취급자(전화번호)'}>
              <Input width={120} value={form.type01} onChange={(e) => setFormField('type01', e.target.value)} required />
              <Button aria-label="검색" variant={'outlined'} only="icon" size={'lg'} color={'gray-light'}>
                <SearchIcon color={'var(--color-primary-50)'} />
              </Button>
              <Input width={200} value={form.type02} readOnly onChange={(e) => setFormField('type02', e.target.value)}/>
              <Grow>
                (
                  <Input width={40} value={form.type03} onChange={(e) => setFormField('type03', e.target.value)} />-
                  <Input width={40} value={form.type04} onChange={(e) => setFormField('type04', e.target.value)} />-
                  <Input width={40} value={form.type05} onChange={(e) => setFormField('type05', e.target.value)} />
                )
              </Grow>
            </FormCell>
          </FormRow>
        </FormTable>
      </Grow>
      <TableFold variant="accordion">
        <TableFoldHead title="가입설계 동의(LMS)">
          <Grow>
            <Button variant={'outlined'} color={'secondary'} onClick={() => {}}>
              초기화
            </Button>
          </Grow>
        </TableFoldHead>
        <TableFoldBody>
          <Gcol gap={2} placement='ss'>
            <BulletItem
              size="md"
              type="dotBig"
            >
              입력된 정보는 저장되지 않습니다.(고객정보 미입력 출력 가능)
            </BulletItem>
            
          </Gcol>
        </TableFoldBody>
      </TableFold>
    </Grid>
  );
};

export default Ltpz01502;
