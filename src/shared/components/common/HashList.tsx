/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

'use client';

import { Grow } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { HashIcon, PlusIcon } from '@icons';
import { Button } from '@uiux/Button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@uiux/DropdownMenu';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/shared/lib/shadcn/utils';

export const HashList = ({ data }: { data: string[] }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const checkWidths = () => {
      const wrapWidth = wrapRef.current?.offsetWidth || 0;
      const itemWidth = itemRef.current?.scrollWidth || 0;
      setShowMore(itemWidth > wrapWidth);
    };
    checkWidths();
    window.addEventListener('resize', checkWidths);
    return () => window.removeEventListener('resize', checkWidths);
  }, [data]);

  return (
    <Grow className="gap-2 w-full" placement={'sc'}>
      <div
        data-hashlist="wrap"
        ref={wrapRef}
        className={cn(
          'relative max-w-[calc(100vw-70rem)] min-w-[52rem] overflow-hidden',
          showMore &&
            'after:absolute after:block after:bg-gradient-to-r after:from-transparent after:to-[var(--color-gray-5)] after:right-[0] after:top-[0] after:w-[2rem] after:h-full'
        )}
      >
        <div data-hashlist="item" ref={itemRef} style={{ width: 'fit-content' }}>
          <BulletList
            position={'row'}
            type={'hash'}
            className="gap-x-2.5 gap-y-[0.2rem] flex-1 flex-nowrap whitespace-nowrap relative font-bold translate-y-[0.1rem] text-[var(--color-blue-gray-60)]"
          >
            {data.map((hash, index) => (
              <BulletListItem
                key={index}
                type={'hash'}
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log('디버깅 데이터:', hash);
                }}
                style={{ cursor: 'pointer' }}
              >
                {hash}
              </BulletListItem>
            ))}
          </BulletList>
        </div>
      </div>
      <Grow className="shrink-0" placement={'ec'}>
        {showMore && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'outlined'} only={'icon'} color={'gray'} size={'md'} aria-label="더보기">
                <PlusIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[30rem] p-3 flex flex-col gap-1 overflow-auto" align="end">
              <BulletList
                position={'row'}
                className="gap-x-2.5 gap-y-[0.2rem] flex-1 flex-wrap whitespace-nowrap relative"
                type={'hash'}
              >
                {data.map((hash, index) => (
                  <BulletListItem
                    key={index}
                    type={'hash'}
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log('디버깅 데이터:', hash);
                    }}
                  >
                    {hash}
                  </BulletListItem>
                ))}
              </BulletList>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button variant={'outlined'} color={'gray'} size={'md'}>
          <HashIcon />
          편집
        </Button>
      </Grow>
    </Grow>
  );
};
