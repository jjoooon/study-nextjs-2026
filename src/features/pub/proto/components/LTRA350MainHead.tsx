'use client';

import { useState } from 'react';
import { Grow, Gcol, FormItem, BulletList, BulletListItem, ButtonGroup } from '@/shared/components/common';
import { TabHead } from '@/shared/components/common/TabHead';
import { PaperIcon, SearchIcon } from '@/shared/components/icons';
import { Button, Checkbox, Input } from '@/shared/components/uiux';
import type { TabDataType, Category, Tag } from '../types/LTRA350Data.types';

interface LTRA350MainHeadProps {
  data: TabDataType[];
  categories: Category[];
  tags: Tag[];
  visibleCount: number;
}

export function LTRA350MainHead({ data, categories, tags, visibleCount }: LTRA350MainHeadProps) {
  const [coverageName, setCoverageName] = useState('');

  return (
    <TabHead data={data} visibleCount={visibleCount}>
      <Gcol variant="box" placement="ss" className="w-full">
        <Grow className="gap-3">
          <Button variant="contained" color="secondary" size="md">
            <PaperIcon />
            담보패키지 선택
          </Button>
          <Grow className="gap-x-1 gap-y-1 flex-wrap" placement="ss">
            {categories.map((category) => (
              <Checkbox key={category.value} variant="button">
                {category.label}
              </Checkbox>
            ))}
          </Grow>
        </Grow>
        <Grow className="gap-2.5 w-full" placement="bwc">
          <Grow className="gap-4" placement="sc">
            <FormItem className="shrink-0 w-auto">
              <Input
                aria-label="담보명"
                placeholder="담보명 입력"
                type="text"
                width="lg"
                clear={true}
                value={coverageName}
                onChange={(e) => setCoverageName(e.target.value)}
              />
              <Button aria-label="담보명 검색" variant="outlined" color="gray-light" size="icon-lg">
                <SearchIcon color="var(--color-primary-50)" />
              </Button>
            </FormItem>
            <BulletList position="row" className="gap-x-4 gap-y-1 flex-1 w-full">
              {tags.map((tag, index) => {
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
          <ButtonGroup className="gap-1" placement="ec">
            <Button variant="contained" color="secondary" size="lg">
              <PaperIcon />
              편집
            </Button>
            <Button variant="contained" color="secondary" size="lg">
              <PaperIcon />
              초기화
            </Button>
          </ButtonGroup>
        </Grow>
      </Gcol>
    </TabHead>
  );
}
