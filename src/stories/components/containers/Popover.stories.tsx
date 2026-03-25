import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@uiux/Popover';
import { Button } from '@uiux/Button';
import { PlusIcon } from '@icons';
import { Gcol } from '@atoms';

export default {
 title: 'Components/Containers/Popover',
  component: Popover,
};

export const Default = () => (
  <div style={{ padding: 40 }}>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outlined'} color={'coolgray'}>
          기본 Popover
          <PlusIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent variant="default" closeButton={true} align="start">
        <Gcol className="w-[11rem] [&>*]:w-full">
          <Button variant={'outlined'} color={'coolgray'}>옵션 1</Button>
          <Button variant={'outlined'} color={'coolgray'}>옵션 2</Button>
        </Gcol>
      </PopoverContent>
    </Popover>

    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'text'} color={'link'}>
          기본 Popover
        </Button>
      </PopoverTrigger>
      <PopoverContent variant="default" closeButton={true} side="left">
        <Gcol className="w-[11rem] [&>*]:w-full">
          <Button variant={'outlined'} color={'coolgray'}>옵션 1</Button>
          <Button variant={'outlined'} color={'coolgray'}>옵션 2</Button>
        </Gcol>
      </PopoverContent>
    </Popover>
  </div>
);

export const MotionFade = () => (
  <div style={{ padding: 40 }}>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outlined'}>
          Fade 모션 Popover
          <PlusIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent motion="fade">
        Fade 모션 Popover<br />애니메이션 효과 확인
      </PopoverContent>
    </Popover>
  </div>
);

export const MotionScale = () => (
  <div style={{ padding: 40 }}>
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">Scale 모션 Popover</button>
      </PopoverTrigger>
      <PopoverContent motion="scale">
        Scale 모션 Popover<br />애니메이션 효과 확인
      </PopoverContent>
    </Popover>
  </div>
);

export const CustomWidth = () => (
  <div style={{ padding: 40 }}>
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">넓은 Popover</button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px]">
        400px 넓이의 Popover<br />컨텐츠가 넓게 표시됩니다.
      </PopoverContent>
    </Popover>
  </div>
);
