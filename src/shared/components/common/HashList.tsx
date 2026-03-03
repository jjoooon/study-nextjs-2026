'use client';

import { useState, useRef, useEffect } from 'react';
import { Grow, BulletList, BulletListItem, ButtonGroup } from '@/shared/components/common';
import { HashIcon, PlusIcon } from '@/shared/components/icons';
import { 
  Button, 
} from '@/shared/components/uiux';
import { cn } from '@/shared/lib/shadcn/utils';

export const HashList = ({ data }: { data: string[] }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const checkWidths = () => {
      const wrapWidth = wrapRef.current?.offsetWidth || 0;
      const itemWidth = itemRef.current?.scrollWidth || 0;

      console.log('wrapWidth:', wrapWidth, 'itemWidth:', itemWidth); // 디버깅 로그

      setShowMore(itemWidth > wrapWidth);
    };
    checkWidths();
    window.addEventListener('resize', checkWidths);
    return () => window.removeEventListener('resize', checkWidths);
  }, [data]);

  return (
    <Grow className="gap-3 w-full" placement="sc">
      <div data-hashlist="wrap" ref={wrapRef} className={cn('relative max-w-[calc(100vw-70rem)] overflow-hidden', showMore && 'after:absolute after:block after:bg-gradient-to-r after:from-transparent after:to-[var(--color-gray-5)] after:right-[0] after:top-[0] after:w-[2rem] after:h-full')}>
        <div data-hashlist="item" ref={itemRef} style={{ width: 'fit-content' }}>
          <BulletList
            position="row"
            className="gap-x-2.5 gap-y-[0.2rem] flex-1 flex-nowrap whitespace-nowrap relative"
            type="hash"
          >
            {data.map((hash, index) => (
              <BulletListItem
                key={index}
                type="hash"
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log('디버깅 데이터:', hash);
                }}
              >
                {hash}
              </BulletListItem>
            ))}
          </BulletList>
        </div>
      </div>
      <ButtonGroup className="gap-1 shrink-0" placement="ec">
        {showMore && (
          <Button variant="outlined" color="gray" size="md">
            <PlusIcon />
            더보기
          </Button>
        )}
        <Button variant="outlined" color="gray" size="md">
          <HashIcon />
          편집
        </Button>
      </ButtonGroup>
    </Grow>
  );
}