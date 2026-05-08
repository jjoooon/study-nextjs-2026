'use client';

import { useTabs } from '@/shared/hooks/useTabs';
import { Grow, Typo, Grid } from '@atoms';

import { DialogBottomInfo } from '@common/DialogBottomInfo';

import { TabPager } from '@common/TabPager';
import { Button } from '@uiux/Button';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';

import '@/shared/lib/agGridPub';

import Ltpz01501 from './Ltpz01501';
import Ltpz01502 from './Ltpz01502';
import Ltpz01503 from './Ltpz01503';

type LTPZ015Tab = { value: string; label: string };
const DATA_TABS: LTPZ015Tab[] = [
  { value: 'tab1', label: '동의서출력' },
  { value: 'tab2', label: '문자동의(LMS)' },
  { value: 'tab3', label: '직접동의(모바일)' },
];

const Ltpz015 = () => {
  // AgGrid Column
  const { tabs, active, setActive } = useTabs(DATA_TABS);

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="lg">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가입설계동의
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ015)
            </Typo>
          </DialogTitle>
        </DialogHeader>
        <DialogSection>
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            hasTableBelow={true}
            getValue={(t) => t.value}
            renderTab={(t) => t.label ?? t.value}
            visibleCount={4}
            removable={false}
          >
            <>
              {active === 'tab1' ? (
                <Ltpz01501 />
              ) : active === 'tab2' ? (
                <Ltpz01502 />
              ) : active === 'tab3' ? (
                <Ltpz01503 />
              ) : null }
            </>
          </TabPager>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            {active === 'tab1' ? (
              <Grow>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  문서스캔
                </Button>
                <Button variant={'outlined'} size={'xl'} color={'gray'}>
                  QR스캔
                </Button>
              </Grow>
            ) : null}
            <Grow>
            {active === 'tab1' ? (  
              <Button variant={'contained'} size={'xl'}>
                출력하기
              </Button>
            ) : null}
            {active === 'tab3' ? (  
              <Button variant={'contained'} size={'xl'}>
                발송
              </Button>
            ) : null}
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

export default Ltpz015;
