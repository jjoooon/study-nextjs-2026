/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem, BulletItem } from '@common/BulletList';

 
const meta: Meta = {
  title: 'Components/Common/InfoBox',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <br /><br />

          <h2>History</h2>
          <ul>
            <li>2026.03.30</li>
          </ul>

          <h2>Overview</h2>
          <p>
            <b>InfoBox</b>는 <b>Gcol</b>, <b>Grow</b>, <b>Typo</b>, <b>BulletList</b> 등 레이아웃/텍스트/목록 컴포넌트를 조합해
            <br />안내, 경고, 상세 등 다양한 정보 박스 UI를 빠르게 만들 수 있는 패턴 예시입니다.<br />
            <br />
          </p>
          <ul>
            <li><b>Gcol</b>: 세로 레이아웃, 박스 스타일(variant)로 정보 영역 구분</li>
            <li><b>Grow</b>: 타이틀/서브타이틀/아이콘 등 가로 정렬</li>
            <li><b>Typo</b>: 텍스트 스타일, 아이콘(안내/경고/상세 등) 지원</li>
            <li><b>BulletList</b>: 항목별 안내/약관/참조 등 목록 표현</li>
          </ul>
          <br /> 
          <p>
          실제 서비스에서는 아래와 같이 안내/경고/상세 정보 박스를 일관된 스타일로 쉽게 구현할 수 있습니다.</p>
         

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <Markdown>
            {`
\`\`\`tsx
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem, BulletItem } from '@common/BulletList';

<Gcol variant={'box-info'} placement={'ss'} className='w-full'>
  <Typo variant={'body-sm'} icon={'info'}>
    <b>제목</b>들어갑니다.
  </Typo>

  <BulletList>
    <BulletListItem size={'sm'}>
      텍스트 목록입니다.
    </BulletListItem>
      <BulletListItem size={'sm'} color={'info'}>
      텍스트 목록입니다.
    </BulletListItem>
  </BulletList>
</Gcol>
<Gcol placement={'ss'} className='w-full'>
  <Typo variant={'body-sm'} icon={'info'}>
    <b>제목</b>들어갑니다.
  </Typo>
</Gcol>

<Gcol variant={'box-warning'} placement={'ss'} className='w-full'>
  <Typo variant={'body-sm'} icon={'warning'}>
    <b>제목</b>들어갑니다.
  </Typo>

  <BulletList>
    <BulletListItem size={'sm'}>
      텍스트 목록입니다.
    </BulletListItem>
    <BulletListItem size={'sm'} color={'warning'}>
      텍스트 목록입니다.
    </BulletListItem>
  </BulletList>
</Gcol>

<Gcol variant={'box-detail'} placement={'ss'} className='w-full'>
  <Typo variant={'body-sm'} icon={'detail'}>
    <b>제목</b>들어갑니다.
  </Typo>
  <Typo variant={'body-sm'} icon={'detail'}>
    <b>제목</b>들어갑니다.
  </Typo>
</Gcol>

 
\`\`\`
            `}
          </Markdown>
           
        </>
      ),
    },
  },
  
  render: ({ showTitle, title, showSubTitle, subTitle, showHighlight, useChildren, childrenHTML, items, ...args }) => (
    <Gcol className='w-[100rem] p-5' gap={4}>
      <Gcol variant={'box-info'} placement={'ss'} className='w-full'>
        <Typo variant={'body-sm'} icon={'info'}>
          <b>제목</b>들어갑니다.
        </Typo>

        <BulletList>
          <BulletListItem size={'sm'}>
            텍스트 목록입니다.
          </BulletListItem>
           <BulletListItem size={'sm'} color={'info'}>
            텍스트 목록입니다.
          </BulletListItem>
        </BulletList>
      </Gcol>
      <Gcol placement={'ss'} className='w-full'>
        <Typo variant={'body-sm'} icon={'info'}>
          <b>제목</b>들어갑니다.
        </Typo>
      </Gcol>

      <Gcol variant={'box-warning'} placement={'ss'} className='w-full'>
        <Typo variant={'body-sm'} icon={'warning'}>
          <b>제목</b>들어갑니다.
        </Typo>

        <BulletList>
          <BulletListItem size={'sm'}>
            텍스트 목록입니다.
          </BulletListItem>
          <BulletListItem size={'sm'} color={'warning'}>
            텍스트 목록입니다.
          </BulletListItem>
        </BulletList>
      </Gcol>

      <Gcol variant={'box-detail'} placement={'ss'} className='w-full'>
        <Typo variant={'body-sm'} icon={'detail'}>
          <b>제목</b>들어갑니다.
        </Typo>
        <Typo variant={'body-sm'} icon={'detail'}>
          <b>제목</b>들어갑니다.
        </Typo>
      </Gcol>
    </Gcol>
  ),
};

export default meta;

export const Default: StoryObj = {};