/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/shared/lib/shadcn/utils';

// 테마 이름과 실제 CSS 적용 범위를 매핑한다.
// - light: 기본 문서 영역
// - dark: .dark 하위 영역
const THEMES = { light: '', dark: '.dark' } as const;

// 차트 시리즈별 설정 타입
// - label: 범례/툴팁에 표시할 이름
// - icon: 범례/툴팁에서 사용할 아이콘
// - color 또는 theme 중 하나만 사용
//   - color: 단일 색상
//   - theme: light/dark 테마별 색상
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

// ChartContext에 전달되는 최소 정보
type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

// 차트 내부 보조 컴포넌트에서 공통 설정을 안전하게 꺼내기 위한 훅
function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

// 차트 공통 컨테이너
// - config를 Context로 하위 컴포넌트에 전달
// - ChartStyle로 CSS 변수 주입
// - ResponsiveContainer로 recharts 크기 반응형 처리
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  // CSS 변수 충돌 방지를 위해 차트별 고유 data-chart 값을 만든다.
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'Chart';

// 차트별 색상을 CSS 변수(--color-*)로 주입하는 스타일 컴포넌트
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  // 실제 색상 정보가 있는 항목만 추린다.
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        // 각 테마(light/dark)별로 data-chart 범위에 CSS 변수를 생성한다.
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join('\n')}
}
`
          )
          .join('\n'),
      }}
    />
  );
};

// recharts 기본 Tooltip을 그대로 다시 export
const ChartTooltip = RechartsPrimitive.Tooltip;

// 차트 공통 툴팁 콘텐츠
// - config를 기준으로 label/icon/name을 해석
// - indicator 모양(dot/line/dashed) 변경 가능
const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<'div'> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: 'line' | 'dot' | 'dashed';
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();

    // 툴팁 상단 라벨 계산
    // - hideLabel이면 숨김
    // - labelKey/dataKey/name 기준으로 config label을 찾아 표시
    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || 'value'}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === 'string'
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return <div className={cn('font-medium', labelClassName)}>{labelFormatter(value, payload)}</div>;
      }

      if (!value) {
        return null;
      }

      return <div className={cn('font-medium', labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    // 단일 payload + dot 이외 indicator일 때는 라벨을 항목 내부로 중첩 표시
    const nestLabel = payload.length === 1 && indicator !== 'dot';

    return (
      <div
        ref={ref}
        className={cn(
          'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload
            .filter((item) => item.type !== 'none')
            .map((item, index) => {
              // 현재 payload 항목에 대응하는 config를 찾는다.
              const key = `${nameKey || item.name || item.dataKey || 'value'}`;
              const itemConfig = getPayloadConfigFromPayload(config, item, key);
              const indicatorColor = color || item.payload.fill || item.color;

              return (
                <div
                  key={item.dataKey}
                  className={cn(
                    'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-[1rem] [&>svg]:w-[1rem] [&>svg]:text-muted-foreground',
                    indicator === 'dot' && 'items-center'
                  )}
                >
                  {formatter && item?.value !== undefined && item.name ? (
                    // formatter가 있으면 외부 포맷 결과를 우선 사용
                    formatter(item.value, item.name, item, index, item.payload)
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn('shrink-0 rounded-[0.2rem] border-[--color-border] bg-[--color-bg]', {
                              'h-[1rem] w-[1rem]': indicator === 'dot',
                              'w-[0.4rem]': indicator === 'line',
                              'w-0 border-[0.15rem] border-dashed bg-transparent': indicator === 'dashed',
                              'my-[0.05rem]': nestLabel && indicator === 'dashed',
                            })}
                            style={
                              {
                                '--color-bg': indicatorColor,
                                '--color-border': indicatorColor,
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div
                        className={cn(
                          'flex flex-1 justify-between leading-none',
                          nestLabel ? 'items-end' : 'items-center'
                        )}
                      >
                        <div className="grid gap-1.5">
                          {/* 단일 항목일 때는 라벨을 항목 내부에 함께 노출 */}
                          {nestLabel ? tooltipLabel : null}
                          <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                        </div>
                        {item.value && (
                          <span className="font-mono font-medium tabular-nums text-foreground">
                            {item.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = 'ChartTooltip';

// recharts 기본 Legend를 그대로 다시 export
const ChartLegend = RechartsPrimitive.Legend;

// 차트 공통 범례 콘텐츠
// - config에 icon이 있으면 아이콘 우선
// - 없으면 색상 사각형 표시
const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> &
    Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn('flex items-center justify-center gap-4', verticalAlign === 'top' ? 'pb-3' : 'pt-3', className)}
    >
      {payload
        .filter((item) => item.type !== 'none')
        .map((item) => {
          // 범례 항목도 payload 값을 기준으로 config를 찾아 label/icon을 맞춘다.
          const key = `${nameKey || item.dataKey || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={cn(
                'flex items-center gap-1.5 [&>svg]:h-[1.2rem] [&>svg]:w-[1.2rem] [&>svg]:text-muted-foreground'
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-[0.8rem] w-[0.8rem] shrink-0 rounded-[0.2rem]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
});
ChartLegendContent.displayName = 'ChartLegend';

// payload에서 config 키를 추출하는 헬퍼
// - recharts payload 구조가 상황에 따라 달라질 수 있어
//   payload 자신과 payload.payload를 모두 검사한다.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadPayload =
    'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  // 1) payload[key]가 문자열이면 우선 사용
  if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
  ) {
    // 2) payload.payload[key]가 문자열이면 대체 사용
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  // 찾은 키가 config에 있으면 그 설정을, 없으면 원래 key 기준 설정을 반환
  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
