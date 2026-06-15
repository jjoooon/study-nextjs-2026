/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import { Title, Primary, Controls, Source } from '@storybook/addon-docs/blocks';
import * as React from 'react';
import { Grid } from '@atoms';

export interface ApiReferenceItem {
  prop: string;
  type: string;
  description: string;
}

export interface StoryDocTemplateProps {
  /** 컴포넌트 이름 (예: 'Badge') */
  title?: string;
  /** 컴포넌트 수정/생성 역사 (예: ['2026.03.30']) */
  history: string[];
  /** 컴포넌트 개요 설명 */
  overview: string;
  /** 사용 방법 안내 문구 리스트 (예: ['기본 상태 표시', 'variant + color 조합']) */
  usageItems?: string[];
  /** 코드 사용 예제 (Markdown 형식의 문자열) */
  usageCode?: string;
  /** API Reference 테이블에 표시할 속성 리스트 */
  apiReference?: ApiReferenceItem[];
  /** 추가적인 개별 변형이나 예시 등의 커스텀 마크업 영역 */
  children?: React.ReactNode;
}

/**
 * StoryDocTemplate은 Badge.stories.tsx의 구조와 스타일을 공통 포맷으로 추상화한 템플릿 컴포넌트입니다.
 * 스토리북 기본 Docs 테마의 헤더, 리스트, 테이블 마크업 형식을 그대로 유지하여 통일성을 제공합니다.
 */
export const StoryDocTemplate = ({
  title,
  history,
  overview,
  usageItems,
  usageCode,
  apiReference,
  children,
}: StoryDocTemplateProps) => {
  return (
    <Grid>
      {/* 좌측 열: 문서 영역 (Title, History, Overview, Usage, API Reference) */}
      <div className="flex flex-col gap-6 w-full">
        <div>
          <Title />
        </div>

        <section>
          <h2>History</h2>
          <ul>
            {history.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Overview</h2>
          <div>
            <p>
              {overview.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </section>

        {/* 우측 열: 실시간 시연 및 컨트롤러 영역 (Sticky 배치) */}
        <section>
          <h2>Preview & Controls</h2>
          <Primary />
          <Controls />
        </section>

        {children && <section>{children}</section>}

        {usageCode && (
          <section>
            <h2>Usage</h2>
            {usageItems && usageItems.length > 0 ? (
              <>
                <p>{title || '컴포넌트'}는 다음과 같은 형태로 사용할 수 있습니다.</p>
                <ul>
                  {usageItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>{title || '컴포넌트'} 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            )}
            <Source code={usageCode.trim()} language="tsx" />
          </section>
        )}

        {apiReference && apiReference.length > 0 && (
          <section>
            <h2>API Reference</h2>
            <p>{title || '컴포넌트'} 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px', marginBottom: '24px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                  <th style={{ padding: '8px 12px', fontWeight: 'bold' }}>prop</th>
                  <th style={{ padding: '8px 12px', fontWeight: 'bold' }}>타입/옵션</th>
                  <th style={{ padding: '8px 12px', fontWeight: 'bold' }}>설명</th>
                </tr>
              </thead>
              <tbody>
                {apiReference.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 'bold' }}>{item.prop}</td>
                    <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.9em' }}>{item.type}</td>
                    <td style={{ padding: '8px 12px' }}>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </Grid>
  );
};
