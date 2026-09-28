import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const weights = [
  { label: 'Thin (100)', value: 100 },
  { label: 'ExtraLight (200)', value: 200 },
  { label: 'Light (300)', value: 300 },
  { label: 'Regular (400)', value: 400 },
  { label: 'Medium (500)', value: 500 },
  { label: 'SemiBold (600)', value: 600 },
  { label: 'Bold (700)', value: 700 },
  { label: 'ExtraBold (800)', value: 800 },
  { label: 'Black (900)', value: 900 },
];

const FontTestComponent = () => {
  const sampleText = '가나01다2라마바아사자차카타하3456789 , . % + -';

  return (
    <div style={{ padding: '24px', fontFamily: 'inherit', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
        전체 굵기(100~900) 폰트 호환성 비교 테스트
      </h2>
      <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>
        크롬 109 등 구형 브라우저 환경에서 <strong>1. WOFF2 (가변 Variable)</strong>,{' '}
        <strong>2. WOFF (가변 Variable)</strong>, <strong>3. WOFF (정적 Static 1세대 9개 굵기)</strong>의 렌더링 차이를 비교 검증합니다.
      </p>

      {/* 3열 비교 레이아웃 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {/* 1. WOFF2 (가변 Variable) 테스트 박스 */}
        <div style={{ border: '2px solid #3b82f6', borderRadius: '12px', padding: '16px', backgroundColor: '#eff6ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1d4ed8' }}>
              1. WOFF2 (가변 Variable)
            </h3>
            <span style={{ fontSize: '11px', background: '#3b82f6', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
              NotoSansKRNumber-WOFF2
            </span>
          </div>

          <div className="use-font-woff2" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {weights.map((w) => (
              <div key={`woff2-${w.value}`} style={{ background: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>{w.label}</span>
                <div style={{ fontSize: '17px', fontWeight: w.value, color: '#2563eb', wordBreak: 'break-all' }}>
                  {sampleText}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. WOFF (가변 Variable) 테스트 박스 */}
        <div style={{ border: '2px solid #8b5cf6', borderRadius: '12px', padding: '16px', backgroundColor: '#f5f3ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#6d28d9' }}>
              2. WOFF (가변 Variable)
            </h3>
            <span style={{ fontSize: '11px', background: '#8b5cf6', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
              NotoSansKRNumber-WOFF-Var
            </span>
          </div>

          <div className="use-font-woff-var" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {weights.map((w) => (
              <div key={`woff-var-${w.value}`} style={{ background: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>{w.label}</span>
                <div style={{ fontSize: '17px', fontWeight: w.value, color: '#7c3aed', wordBreak: 'break-all' }}>
                  {sampleText}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. WOFF (정적 Static 1세대) 테스트 박스 */}
        <div style={{ border: '2px solid #10b981', borderRadius: '12px', padding: '16px', backgroundColor: '#ecfdf5' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#047857' }}>
              3. WOFF (정적 Static 1세대)
            </h3>
            <span style={{ fontSize: '11px', background: '#10b981', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
              NotoSansKRNumber-WOFF-Static
            </span>
          </div>

          <div className="use-font-woff-static" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {weights.map((w) => (
              <div key={`woff-static-${w.value}`} style={{ background: '#fff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                <span style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>{w.label}</span>
                <div style={{ fontSize: '17px', fontWeight: w.value, color: '#059669', wordBreak: 'break-all' }}>
                  {sampleText}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof FontTestComponent> = {
  title: 'system/FontTest',
  component: FontTestComponent,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FontTestComponent>;

export const Default: Story = {};
