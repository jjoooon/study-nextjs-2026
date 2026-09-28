import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const FontTestComponent = () => {
  const sampleText = '가나01다2라마바아사자차카타하3456789 , . % + -';

  return (
    <div style={{ padding: '24px', fontFamily: 'inherit', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
        폰트 호환성 테스트 (WOFF2 가변 vs WOFF 가변 vs WOFF 정적)
      </h2>
      <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>
        크롬 109 등 구형 브라우저 환경에서 <strong>1. WOFF2 (가변 Variable)</strong>,{' '}
        <strong>2. WOFF (가변 Variable)</strong>, <strong>3. WOFF (정적 Static 1세대)</strong>의 렌더링 차이를 비교 검증합니다.
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
              Variable.woff2
            </span>
          </div>

          <div className="use-font-woff2" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Regular (400)</span>
              <div style={{ fontSize: '15px', fontWeight: 400 }}>
                금액: <strong>1,234,567원</strong> (+15.5%)
              </div>
              <div style={{ fontSize: '18px', fontWeight: 400, color: '#2563eb', marginTop: '6px', wordBreak: 'break-all' }}>
                {sampleText}
              </div>
            </div>

            <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Medium (500)</span>
              <div style={{ fontSize: '15px', fontWeight: 500 }}>
                금액: <strong>1,234,567원</strong> (+15.5%)
              </div>
              <div style={{ fontSize: '18px', fontWeight: 500, color: '#2563eb', marginTop: '6px', wordBreak: 'break-all' }}>
                {sampleText}
              </div>
            </div>

            <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Bold (700)</span>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>
                금액: <strong>1,234,567원</strong> (+15.5%)
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#2563eb', marginTop: '6px', wordBreak: 'break-all' }}>
                {sampleText}
              </div>
            </div>
          </div>
        </div>

        {/* 2. WOFF (가변 Variable) 테스트 박스 */}
        <div style={{ border: '2px solid #8b5cf6', borderRadius: '12px', padding: '16px', backgroundColor: '#f5f3ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#6d28d9' }}>
              2. WOFF (가변 Variable)
            </h3>
            <span style={{ fontSize: '11px', background: '#8b5cf6', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
              Variable.woff
            </span>
          </div>

          <div className="use-font-woff-var" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Regular (400)</span>
              <div style={{ fontSize: '15px', fontWeight: 400 }}>
                금액: <strong>1,234,567원</strong> (+15.5%)
              </div>
              <div style={{ fontSize: '18px', fontWeight: 400, color: '#7c3aed', marginTop: '6px', wordBreak: 'break-all' }}>
                {sampleText}
              </div>
            </div>

            <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Medium (500)</span>
              <div style={{ fontSize: '15px', fontWeight: 500 }}>
                금액: <strong>1,234,567원</strong> (+15.5%)
              </div>
              <div style={{ fontSize: '18px', fontWeight: 500, color: '#7c3aed', marginTop: '6px', wordBreak: 'break-all' }}>
                {sampleText}
              </div>
            </div>

            <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Bold (700)</span>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>
                금액: <strong>1,234,567원</strong> (+15.5%)
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#7c3aed', marginTop: '6px', wordBreak: 'break-all' }}>
                {sampleText}
              </div>
            </div>
          </div>
        </div>

        {/* 3. WOFF (정적 Static 1세대) 테스트 박스 */}
        <div style={{ border: '2px solid #10b981', borderRadius: '12px', padding: '16px', backgroundColor: '#ecfdf5' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#047857' }}>
              3. WOFF (정적 Static 1세대)
            </h3>
            <span style={{ fontSize: '11px', background: '#10b981', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>
              Static.woff
            </span>
          </div>

          <div className="use-font-woff-static" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Regular (400)</span>
              <div style={{ fontSize: '15px', fontWeight: 400 }}>
                금액: <strong>1,234,567원</strong> (+15.5%)
              </div>
              <div style={{ fontSize: '18px', fontWeight: 400, color: '#059669', marginTop: '6px', wordBreak: 'break-all' }}>
                {sampleText}
              </div>
            </div>

            <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Medium (500)</span>
              <div style={{ fontSize: '15px', fontWeight: 500 }}>
                금액: <strong>1,234,567원</strong> (+15.5%)
              </div>
              <div style={{ fontSize: '18px', fontWeight: 500, color: '#059669', marginTop: '6px', wordBreak: 'break-all' }}>
                {sampleText}
              </div>
            </div>

            <div style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Bold (700)</span>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>
                금액: <strong>1,234,567원</strong> (+15.5%)
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#059669', marginTop: '6px', wordBreak: 'break-all' }}>
                {sampleText}
              </div>
            </div>
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
