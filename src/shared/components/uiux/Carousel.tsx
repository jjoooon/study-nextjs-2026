/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/shadcn/utils';
import { Button } from '@uiux/Button';

/** Embla 캐러셀의 API 인스턴스 타입 */
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
/** Embla 캐러셀 설정 옵션 타입 */
type CarouselOptions = UseCarouselParameters[0];
/** Embla 캐러셀 플러그인 타입 */
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  /**
   * Embla 캐러셀 설정 옵션 객체
   */
  opts?: CarouselOptions;
  /**
   * Embla 캐러셀 플러그인 배열 (예: Autoplay 등)
   */
  plugins?: CarouselPlugin;
  /**
   * 캐러셀이 스크롤되는 방향
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * 생성된 Embla API 인스턴스를 외부 상태와 동기화하기 위한 콜백 함수
   */
  setApi?: (api: CarouselApi) => void;
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

/**
 * 캐러셀 컨텍스트 훅
 * - Carousel 하위 컴포넌트에서 캐러셀 상태 및 제어 함수를 가져올 때 사용합니다.
 */
function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

/**
 * 캐러셀 루트 컴포넌트 (Carousel)
 * - Embla Carousel을 기반으로 한 반응형 슬라이더 컨테이너입니다.
 */
function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [prevApi, setPrevApi] = React.useState<CarouselApi>(undefined);

  // api 인스턴스 획득 시 초기 스크롤 상태 동기화 (렌더 단계에서 동기화)
  if (api && api !== prevApi) {
    setPrevApi(api);
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('cp-carousel relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

/**
 * 캐러셀 뷰포트/콘텐츠 영역 컴포넌트 (CarouselContent)
 * - 슬라이드 아이템들을 감싸는 스크롤 영역입니다.
 */
function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className={cn('overflow-hidden', orientation === 'vertical' && 'h-full')}
      data-slot="carousel-content"
    >
      <div
        className={cn('flex', orientation === 'horizontal' ? '-ml-1' : '-mt-1 h-full flex-col', className)}
        {...props}
      />
    </div>
  );
}

/**
 * 캐러셀 개별 슬라이드 아이템 컴포넌트 (CarouselItem)
 * - 캐러셀 안의 하나의 페이지/슬라이드를 나타냅니다.
 */
function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 min-h-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-1' : 'pt-1',
        className
      )}
      {...props}
    />
  );
}

/**
 * 캐러셀 이전 이동 버튼 컴포넌트 (CarouselPrevious)
 * - 클릭 시 이전 슬라이드로 스크롤 이동합니다.
 */
function CarouselPrevious({
  className,
  variant = 'outlined',
  size = 'sm',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'rounded-full absolute touch-manipulation',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon className="cn-rtl-flip" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

/**
 * 캐러셀 다음 이동 버튼 컴포넌트 (CarouselNext)
 * - 클릭 시 다음 슬라이드로 스크롤 이동합니다.
 */
function CarouselNext({ className, variant = 'outlined', size = 'sm', ...props }: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'rounded-full absolute touch-manipulation',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon className="cn-rtl-flip" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

/**
 * 캐러셀 페이지 인디케이터/페이지네이션 컴포넌트 (CarouselPagination)
 * - 현재 슬라이드 인덱스를 표시하고 특정 슬라이드로 바로 이동하는 점 버튼들을 제공합니다.
 */
function CarouselPagination() {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [slideCount, setSlideCount] = React.useState(0);
  const [prevApi, setPrevApi] = React.useState<typeof api>(undefined);

  // api 인스턴스 획득 시 초기 슬라이드 개수 및 선택 인덱스 동기화 (렌더 단계에서 동기화)
  if (api && api !== prevApi) {
    setPrevApi(api);
    setSlideCount(api.scrollSnapList().length);
    setSelectedIndex(api.selectedScrollSnap());
  }

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (slideCount <= 1) return null;

  return (
    <div className=" flex justify-center items-center gap-1 absolute bottom-0 w-full" data-slot="carousel-pagination">
      {Array.from({ length: slideCount }).map((_, idx) => (
        <button
          key={idx}
          type="button"
          aria-label={`Go to slide ${idx + 1}`}
          className={
            'w-1 h-1 rounded-full transition-all ' +
            (selectedIndex === idx ? 'w-3 bg-[var(--color-blue-gray-50)]' : 'bg-[var(--color-blue-gray-40)]')
          }
          onClick={() => api && api.scrollTo(idx)}
        />
      ))}
    </div>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
  CarouselPagination,
};
