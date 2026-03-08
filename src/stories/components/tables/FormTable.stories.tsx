import type { Meta, StoryObj } from '@storybook/react';
import { Title, Primary, Controls, Markdown } from '@storybook/addon-docs/blocks';
import * as React from 'react';
import { Gcol } from '@atoms';
import { FormCell, FormRow, FormTable } from '@common/FormTable';

type FormCellVariant = 'default' | 'primary' | 'secondary' | 'light' | 'none';

type FormTableStoryProps = React.ComponentProps<typeof FormTable> & {
  colsPreset?: 'default-4' | 'equal-4' | 'wide-label';
  tableClassName?: string;
  cellTitle?: string;
  cellVariant?: FormCellVariant;
  cellClassName?: string;
  cellContent?: string;
  cellColSpan?: number;
  cellRowSpan?: number;
  cellTitleColSpan?: number;
  cellTitleRowSpan?: number;
};

const COL_PRESETS: Record<NonNullable<FormTableStoryProps['colsPreset']>, string[]> = {
  'default-4': ['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]'],
  'equal-4': ['w-[25%]', 'w-[25%]', 'w-[25%]', 'w-[25%]'],
  'wide-label': ['w-[30%]', 'w-[20%]', 'w-[30%]', 'w-[20%]'],
};

const ALLOWED_TITLE_TAGS = new Set(['b', 'strong', 'em', 'i', 'u', 'mark', 'small', 'span']);

const toFormCellTitleNode = (value?: string): React.ReactNode => {
  const input = (value ?? '').trim();
  if (!input) return '기본';

  const matched = input.match(/^<([a-zA-Z][a-zA-Z0-9-]*)>([\s\S]*)<\/\1>$/);
  if (!matched) return input;

  const tag = matched[1].toLowerCase();
  const content = matched[2];
  if (!ALLOWED_TITLE_TAGS.has(tag)) return input;

  return React.createElement(tag, null, content);
};

const meta: Meta<FormTableStoryProps> = {
  title: 'Components/Tables/FormTable',
  component: FormTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>Overview</h2>
            <div>
              <p>
                FormTable은 폼 테이블 영역의 상단 구분선과 레이아웃 컨테이너 역할을 하는 컴포넌트입니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>기본 구성 및 병합 케이스 예시는 아래와 같습니다.</p>
            <Markdown>
              {`
\`\`\`tsx
import { FormTable, FormCell, FormRow } from '@/shared/components/common';

<FormTable caption="계약자 관련 정보 입력하세요." cols={['w-[15%]', 'w-[35%]', 'w-[15%]', 'w-[35%]']}>
  <FormRow>
    <FormCell title="계약자">...</FormCell>
    <FormCell title="개인정보취득경로">...</FormCell>
  </FormRow>
</FormTable>
\`\`\`

\`\`\`tsx
  <FormTable caption="행/열 병합 케이스" cols={['w-[20%]', 'w-[30%]', 'w-[20%]', 'w-[30%]']}>
    <FormRow>
      <FormCell title="colSpan 케이스" colSpan={3}>...</FormCell>
    </FormRow>
    <FormRow>
      <FormCell title="rowSpan 케이스" titleRowSpan={2} rowSpan={2}>...</FormCell>
      <FormCell title="우측 1행">...</FormCell>
    </FormRow>
    <FormRow>
      <FormCell title="우측 2행">...</FormCell>
    </FormRow>
  </FormTable>
\`\`\`
              `}
            </Markdown>

            <h2>API Reference</h2>
            <p>FormTable 관련 구성 요소의 주요 옵션입니다.</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>컴포넌트</th>
                  <th>주요 prop</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>FormTable</td><td>caption, cols, variant, lineTop</td><td>테이블 캡션/컬럼 폭/스타일/상단라인</td></tr>
                <tr><td>FormRow</td><td>children</td><td>행 컨테이너</td></tr>
                <tr><td>FormCell</td><td>title, variant, colSpan, rowSpan, titleColSpan, titleRowSpan</td><td>셀 제목/스타일/병합</td></tr>
              </tbody>
            </table>
          </>
        );
      },
      argTypes: { expanded: false },
    },
  },
  argTypes: {
    caption: {
      control: 'text',
      description: '테이블 캡션(접근성용, 화면에는 숨김)',
      table: { category: 'FormTable' },
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'favorite', 'setting', 'boxIn', 'none'],
      description: '테이블 스타일 변형',
      table: { category: 'FormTable' },
    },
    lineTop: {
      control: 'boolean',
      description: '상단 구분선 표시 여부',
      table: { category: 'FormTable' },
    },
    colsPreset: {
      control: 'select',
      options: ['default-4', 'equal-4', 'wide-label'],
      description: '테이블 colgroup 프리셋',
      table: { category: 'FormTable' },
    },
    tableClassName: {
      control: 'text',
      description: 'FormTable className',
      table: { category: 'FormTable' },
    },
    cellTitle: {
      control: 'text',
      description: '첫 번째 FormCell title (예: 기본, <b>기본</b>)',
      table: { category: 'FormCell' },
    },
    cellVariant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'light', 'none'],
      description: '첫 번째 FormCell 제목 영역 스타일',
      table: { category: 'FormCell' },
    },
    cellClassName: {
      control: 'text',
      description: '첫 번째 FormCell 제목 셀 className',
      table: { category: 'FormCell' },
    },
    cellContent: {
      control: 'text',
      description: '첫 번째 FormCell 내용 텍스트',
      table: { category: 'FormCell' },
    },
    cellColSpan: {
      control: { type: 'number', min: 1, max: 4, step: 1 },
      description: '첫 번째 FormCell 내용 셀 colSpan',
      table: { category: 'FormCell' },
    },
    cellRowSpan: {
      control: { type: 'number', min: 1, max: 4, step: 1 },
      description: '첫 번째 FormCell 내용 셀 rowSpan',
      table: { category: 'FormCell' },
    },
    cellTitleColSpan: {
      control: { type: 'number', min: 1, max: 4, step: 1 },
      description: '첫 번째 FormCell 제목 셀 colSpan',
      table: { category: 'FormCell' },
    },
    cellTitleRowSpan: {
      control: { type: 'number', min: 1, max: 4, step: 1 },
      description: '첫 번째 FormCell 제목 셀 rowSpan',
      table: { category: 'FormCell' },
    },
    children: { table: { disable: true } },
    cols: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    caption: 'FormTable 예시',
    variant: 'default',
    lineTop: true,
    colsPreset: 'default-4',
    tableClassName: '',
    cellTitle: '<b>기본</b>',
    cellVariant: 'default',
    cellClassName: '',
    cellContent: 'TEXT',
    cellColSpan: 1,
    cellRowSpan: 1,
    cellTitleColSpan: 1,
    cellTitleRowSpan: 1,
  },
};

export default meta;
type Story = StoryObj<FormTableStoryProps>;

export const Default: Story = {
  render: (args) => {
    const cellColSpan = (args.cellColSpan ?? 1) > 1 ? args.cellColSpan : undefined;
    const cellRowSpan = (args.cellRowSpan ?? 1) > 1 ? args.cellRowSpan : undefined;
    const cellTitleColSpan = (args.cellTitleColSpan ?? 1) > 1 ? args.cellTitleColSpan : undefined;
    const cellTitleRowSpan = (args.cellTitleRowSpan ?? 1) > 1 ? args.cellTitleRowSpan : undefined;
    const cellTitleNode = toFormCellTitleNode(args.cellTitle);
    const cols = COL_PRESETS[args.colsPreset ?? 'default-4'];

    return (
      <Gcol className="w-full p-8">
        <FormTable
          caption={args.caption}
          variant={args.variant}
          lineTop={args.lineTop}
          className={args.tableClassName}
          cols={cols}
        >
          <FormRow>
            <FormCell
              title={cellTitleNode}
              variant={args.cellVariant}
              className={args.cellClassName}
              colSpan={cellColSpan}
              rowSpan={cellRowSpan}
              titleColSpan={cellTitleColSpan}
              titleRowSpan={cellTitleRowSpan}
            >
              {args.cellContent}
            </FormCell>
            <FormCell title="개인정보취득경로">
              TEXT
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title="colSpan 케이스" colSpan={3}>
              전체 너비 확장 행
            </FormCell>
          </FormRow>
          <FormRow>
            <FormCell title="rowSpan 케이스" titleRowSpan={2} rowSpan={2}>
              2행 병합
            </FormCell>
            <FormCell title="우측 1행">값 1</FormCell>
          </FormRow>
          <FormRow>
            <FormCell title="우측 2행">값 2</FormCell>
          </FormRow>
        </FormTable>
      </Gcol>           
    );
  },
};
