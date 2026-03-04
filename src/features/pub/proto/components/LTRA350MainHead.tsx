'use client';

import { useState } from 'react';
import { 
  Grow, 
  Gcol, 
  FormItem,
  BulletList, 
  BulletListItem, 
  ButtonGroup, 
  ErrorMsg, 
  HashList 
} from '@/shared/components/common';
import { TabHead } from '@/shared/components/common/TabHead';
import { PaperIcon, SearchIcon, ResetIcon, PlusIcon, HashIcon } from '@/shared/components/icons';
import { 
  Button, 
  Checkbox, 
  Input, 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger 
} from '@/shared/components/uiux';

import type { LTRA350DataType } from '@/features/pub/proto/data/LTRA350Data';
import { useTabs } from '@/shared/hooks/useTabs';

interface LTRA350MainHeadProps {
  data: LTRA350DataType['mainHead'];
}

export function LTRA350MainHead({ data }: LTRA350MainHeadProps) {
  const [coverageName, setCoverageName] = useState('');
  const stringifiedData = data.tabList.map(item => ({
    ...item,
    value: String(item.value),
  }));
  const {
    tabs: LTRA350_tabs,
    active: LTRA350_active,
    setActive: LTRA350_setActive,
    handleRemove: LTRA350_handleRemove,
  } = useTabs(stringifiedData);

  return (
    <TabHead 
      // removable={true}
      // onRemove={LTRA350_handleRemove}
      variant="outlined"
      data={LTRA350_tabs} 
      active={LTRA350_active}
      setActive={LTRA350_setActive}
      visibleCount={data.visibleCount}
      getValue={tab => String(tab.value)}
      renderTab={tab => (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div>
              <span className="flex items-center">
                <span className="max-w-20 truncate block">{tab.name}</span>
                <span className="block">{`${tab.age}세(${tab.gender})`}</span>
              </span>
              {tab.error && (
                <ErrorMsg aria-live="polite" show={true} position="tl" id="test">
                  입력하세요.
                </ErrorMsg>
              )}
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <BulletList>
              {tab.info.map((info, index) => (
                <BulletListItem key={index} type="dot">
                  {info}
                </BulletListItem>
              ))}
            </BulletList>
          </HoverCardContent>
        </HoverCard>
      )}
      renderDropdownItem={(tab, setActive, setVisibleStart, data, visibleCount) => (  
        <Button
          variant="text"
          key={String(tab.value)}
          onClick={() => {
            setActive(String(tab.value));
            const idx = data.findIndex((t) => String(t.value) === String(tab.value));
            if (idx !== -1) {
              const page = Math.floor(idx / visibleCount);
              setVisibleStart(page * visibleCount);
            }
          }}
        >
          <span className="flex items-center gap-2">
            <span className="block">{tab.name}</span>
            <span className="block">{`${tab.age}세(${tab.gender})`}</span>
          </span>
        </Button>
      )}
    >
      <Gcol variant="box" placement="ss" className="w-full">
        <Grow className="gap-3">
          <Button variant="contained" color="gray-cool" size="md">
            <PaperIcon />
            담보패키지 선택
          </Button>
          <Grow className="gap-x-1 gap-y-1 flex-wrap" placement="ss">
            {data.checkboxList1.map((category) => (
              <Checkbox key={category.value} variant="button">
                {category.label}
              </Checkbox>
            ))}
          </Grow>
        </Grow>

        <Grow className="gap-3 w-full" placement="bwc">
          <Grow className="gap-3 w-full" placement="ss">
            <Grow className="gap-x-1 gap-y-1 flex-wrap shrink-0" placement="ss">
              {data.checkboxList2.map((category) => (
                <Checkbox key={category.value} variant="button">
                  {category.label}
                </Checkbox>
              ))}
            </Grow>
            <HashList data={data.hashList} />
          </Grow>
          <ButtonGroup className="gap-1" placement="ec">
            <Button variant="contained" color="gray-cool" size="lg">
              <ResetIcon />
              초기화
            </Button>
          </ButtonGroup>
        </Grow>
      </Gcol>
    </TabHead>
  );
}
