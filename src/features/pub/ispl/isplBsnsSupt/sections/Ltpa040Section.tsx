/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import { Grow } from '@atoms';
import { BottomBar } from '@common/BottomBar';
import { TabPager } from '@common/TabPager';
import { MainBottom, MainBottomItem } from '@features/MainFoot';
import { PageID } from '@features/PageID';
import { Button } from '@uiux/Button';
import Ltpa04001Section from './Ltpa04001Section';
import Ltpa04002Section from './Ltpa04002Section';
import { LayoutFoot, LayoutHead } from '@/shared/components/layout';
import { LayoutTemplate } from '@/shared/components/layout/LayoutTemplate';
import { useTabs } from '@/shared/hooks/useTabs';

import '@/shared/lib/agGridPub';

type Ltp040TabType = { name: string; value: string; label: string };

const DATA_TABS: Ltp040TabType[] = [
  { name: '추천설계명세', value: 'tab1', label: '추천설계명세' },
  { name: '추천설계조건입력 현황', value: 'tab2', label: '추천설계조건입력 현황' },
];

export default function Ltpa040Section() {
  const { tabs, active, setActive, handleRemove } = useTabs(DATA_TABS);

  return (
    <>
      <LayoutHead>
        <PageID data={{ pageName: '추천 설계 만족도 조사 및 활용 모니터링', pageId: 'LTPA040' }} />
      </LayoutHead>
      <LayoutTemplate
        mainBody={
          <TabPager
            data={tabs}
            active={active}
            setActive={setActive}
            removable={false}
            onRemove={handleRemove}
            visibleCount={6}
            variant="default"
            hasTableBelow={true}
            error={false}
            errorMsg="에러 메시지 예시"
            getValue={(tab) => String(tab.value)}
            renderTab={(tab) => <span>{tab.label}</span>}
            renderDropdownItem={false}
          >
            {active === 'tab1' ? <Ltpa04001Section /> : active === 'tab2' ? <Ltpa04002Section /> : null}
          </TabPager>
        }
        mainFoot={
          <MainBottom>
            {active === 'tab1' && (
              <MainBottomItem className="justify-between">
                <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'primary'} size={'xl'}>
                  추천설계상세보기
                </Button>
                <Grow gap={1}>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'primary'} size={'xl'}>
                    엑셀내려받기
                  </Button>
                </Grow>
              </MainBottomItem>
            )}
            {active === 'tab2' && (
              <MainBottomItem className="justify-end">
                <Grow gap={1}>
                  <Button type="submit" form={'page2-MainForm'} variant={'outlined'} color={'primary'} size={'xl'}>
                    엑셀내려받기
                  </Button>
                </Grow>
              </MainBottomItem>
            )}
          </MainBottom>
        }
      />
      <LayoutFoot>
        <BottomBar />
      </LayoutFoot>
    </>
  );
}
