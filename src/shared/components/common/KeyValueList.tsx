/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { cn } from '@/shared/lib/shadcn/utils';
import { Grow, Typo } from '@atoms';

/**
 * KeyValueList 내에 들어가는 개별 Key-Value 아이템 타입입니다.
 */
interface KeyValueItem {
  /** 항목의 key (이름/라벨) */
  key: React.ReactNode;
  /** 항목의 value (내용/값) */
  value: React.ReactNode;
}

/** KeyValueList의 스타일 종류 */
type KeyValueListVariant = 'default' | 'amount';
/** KeyValueList의 배치 방향 */
type KeyValueListDirection = 'row' | 'col';

/**
 * KeyValueList 컴포넌트의 Props 인터페이스입니다.
 */
interface KeyValueListProps {
  /** 표시할 key-value 데이터 배열 */
  data: KeyValueItem[];
  /** 루트 요소에 추가로 적용할 스타일 클래스 */
  className?: string;
  /**
   * 컴포넌트의 스타일 형태
   * - `default`: 기본 한 행 레이아웃 (구분선 표시)
   * - `amount`: 그리드 형태의 금액/상세 명세 레이아웃
   * @default 'default'
   */
  variant?: KeyValueListVariant;
  /**
   * 목록 배치 방향
   * - `row`: 가로 정렬
   * - `col`: 세로 정렬
   * @default 'row'
   */
  direction?: KeyValueListDirection;
}

/**
 * KeyValueList는 key-value 형태의 정보를 가로 또는 세로 목록으로 표시하는 컴포넌트입니다.
 * 항목 사이의 구분자(|)를 자동으로 넣어 요약 정보 영역에 적합하며,
 * variant 지정을 통해 금액 상세 명세 등 그리드 형태의 레이아웃도 제공합니다.
 */
export const KeyValueList = ({ data, className, variant = 'default', direction = 'row' }: KeyValueListProps) => {
  // direction: row (default) | col
  const isRow = direction === 'row';

  if (variant === 'amount') {
    return (
      <dl
        className={`flex ${isRow ? 'flex-row flex-wrap gap-x-6 gap-y-[0.2rem]' : 'flex-col gap-y-[0.2rem]'} ${className}`}
      >
        {data.map((item, index) => (
          <div key={index} className={`grid grid-cols-[auto_1fr] gap-4`}>
            <dt className="text-[1.3rem] font-bold whitespace-nowrap">{item.key}</dt>
            <dd className="text-[1.2rem] text-[var(--color-gray-70)] whitespace-nowrap text-right">{item.value}</dd>
          </div>
        ))}
      </dl>
    );
  }
  // default variant
  return (
    <ul
      className={`flex ${isRow ? 'flex-row gap-1 items-center' : 'flex-col gap-y-2'} justify-start flex-1 overflow-x-auto ${className}`}
    >
      {data.map((item, index) => (
        <li
          key={index}
          className={`flex flex-row items-center gap-1 ${isRow ? "after:content-['|'] after:mx-3 after:text-gray-400 last:after:hidden" : ''}`}
        >
          <span className="text-[1.4rem] whitespace-nowrap">{item.key}</span>
          <b className="text-[1.8rem] font-bold whitespace-nowrap">{item.value}</b>
        </li>
      ))}
    </ul>
  );
};

/**
 * KeyValueItem 컴포넌트의 Props 인터페이스입니다.
 */
interface KeyValueItemProps {
  /** 라벨 텍스트 */
  label: React.ReactNode;
  /** 상세 내용 컴포넌트 */
  children?: React.ReactNode;
  /** 추가 스타일 클래스 */
  className?: string;
  /**
   * 컴포넌트의 스타일 형태
   * - `default`: 기본 스타일
   * - `info`: 회색 글씨의 요약 정보 스타일
   * - `error`: 빨간색 텍스트의 경고 스타일
   * @default 'default'
   */
  variant?: 'default' | 'info' | 'error';
}

/**
 * KeyValueItem은 단일 항목의 Key와 Value를 구조화해서 표시해주는 서브 컴포넌트입니다.
 */
export const KeyValueItem = ({ label, children, className, variant = 'default' }: KeyValueItemProps) => {
  const variantStyles = {
    default: '',
    info: '[&>div]:text-[1.3rem] [&>div]:text-[var(--color-gray-70)] flex gap-2 items-center [&>div+div]:text-[var(--color-gray-100)] [&>div+div]:font-bold',
    error: 'text-[var(--color-text-danger)]',
  };
  return (
    <Grow className={cn(className, variantStyles[variant])}>
      <Typo tag="div">{label}</Typo>
      <Grow>{children}</Grow>
    </Grow>
  );
};
