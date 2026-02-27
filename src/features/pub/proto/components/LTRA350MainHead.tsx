'use client';

import { useState } from 'react';
import { Grow, Gcol, FormItem, BulletList, BulletListItem, ButtonGroup } from '@/shared/components/common';
import { TabHead } from '@/shared/components/common/TabHead';
import { PaperIcon, SearchIcon, ResetIcon } from '@/shared/components/icons';
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
            <span className="flex items-center">
              <span className="max-w-20 truncate block">{tab.name}</span>
              <span className="block">{`${tab.age}세(${tab.gender})`}</span>
            </span>
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
            <Grow className="gap-x-1 gap-y-1 flex-wrap" placement="ss">
              {data.checkboxList2.map((category) => (
                <Checkbox key={category.value} variant="button">
                  {category.label}
                </Checkbox>
              ))}
            </Grow>
            <Grow className="gap-3" placement="sc">
              <FormItem className="shrink-0 w-auto">
                <Input
                  aria-label="담보명"
                  placeholder="담보명 입력"
                  type="text"
                  width="md"
                  clear={true}
                  value={coverageName}
                  onChange={(e) => setCoverageName(e.target.value)}
                />
                <Button aria-label="담보명 검색" variant="outlined" color="gray-light" only="icon" size="lg">
                  <SearchIcon color="var(--color-primary-50)" />
                </Button>
              </FormItem>
              <BulletList position="row" className="gap-x-2.5 gap-y-1 flex-1 w-full">
                {data.tagList.map((tag, index) => {
                  return (
                    <BulletListItem
                      key={index}
                      type="tag"
                      onClick={() => {
                        // eslint-disable-next-line no-console
                        console.log('디버깅 데이터:', tag);
                      }}
                    >
                      {tag}
                    </BulletListItem>
                  );
                })}
              </BulletList>
            </Grow>
          </Grow>
          <ButtonGroup className="gap-1" placement="ec">
            <Button variant="contained" color="secondary" size="lg">
              <ResetIcon />
              초기화
            </Button>
          </ButtonGroup>
        </Grow>
      </Gcol>
    </TabHead>
  );
}
