import type { Meta, StoryObj } from '@storybook/react';
import { Gcol, Grow } from '@atoms';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import { FileUpload } from '@/shared/components/common/FileUpload';

const SAMPLE_FILES = [{ name: '매우 긴 파일명 입니다.이렇게 길면 잘립니다 확인용' }];


const meta: Meta<typeof FileUpload> = {
  title: 'Components/Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title /><br /><br />

          <h2>Overview</h2>
          <p>
            FileUpload 컴포넌트는 파일선택 버튼과 선택된 파일 태그를 함께 표시하는 UI 요소입니다.<br />
            업로드 로직은 포함하지 않으며, 파일 목록과 이벤트 핸들러를 외부에서 주입하는 Controlled 컴포넌트입니다.<br />
            파일명 hover 시 <span style={{ color: '#006FF2' }}>#006FF2</span> 파란색 + 밑줄, error 시 빨간색 + 밑줄로 표시됩니다.<br />
            파일명 hover 시 파일명 전체를 툴팁으로 확인할 수 있습니다.
          </p>

          <Primary />
          <Controls />

          <h2>Usage</h2>
          <p>FileUpload 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
          <ul>
            <li>파일선택 버튼만 표시 (파일 없음)</li>
            <li>파일 태그 1개 이상 표시</li>
            <li>Preview: 파일명 hover 시 파란색(#006FF2) + 밑줄 + 툴팁 표시</li>
            <li>Error: 파일명 빨간색 + 밑줄 + 에러 메시지</li>
          </ul>
          <Markdown>
            {`
\`\`\`tsx
import { FileUpload } from '@/shared/components/common/FileUpload';

<FileUpload
  files={[{ name: '첨부파일.png', key: 'file-1' }]}
  onClickButton={() => { /* 파일 선택 다이얼로그 */ }}
  onRemove={(file, index) => { /* 목록에서 제거 */ }}
/>
\`\`\`
            `}
          </Markdown>

          <h2>API Reference</h2>
          <p>FileUpload 컴포넌트에서 사용할 수 있는 주요 prop 옵션은 다음과 같습니다.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>prop</th>
                <th>타입</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>files</td><td>{'{ name: string; key?: string }[]'}</td><td>표시할 파일 목록</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>에러 문구 표시 + 파일명 빨간색 밑줄</td></tr>
              <tr><td>onClickButton</td><td>{'() => void'}</td><td>파일선택 버튼 클릭 콜백</td></tr>
              <tr><td>onRemove</td><td>{'(file, index) => void'}</td><td>파일 태그 X 클릭 콜백</td></tr>
            </tbody>
          </table>

          <h2>Default</h2>
          <p>파일이 선택되지 않은 기본 상태입니다.</p>
          <Unstyled>
            <Gcol gap={4} variant="box-line" className="p-16">
              <FileUpload files={[]} onClickButton={() => {}} onRemove={() => {}} />
            </Gcol>
          </Unstyled>

          <h2>Preview</h2>
          <p>파일명 hover 시 <strong style={{ color: '#006FF2' }}>#006FF2</strong> 파란색 + 밑줄로 변경되며, 파일명 전체가 툴팁으로 표시됩니다.</p>
          <Unstyled>
            <Gcol gap={4} variant="box-line" className="p-16">
              <FileUpload files={SAMPLE_FILES} onClickButton={() => {}} onRemove={() => {}} />
            </Gcol>
          </Unstyled>

          <h2>Error</h2>
          <p>errorMessage 전달 시 파일명이 빨간색 + 밑줄로 표시되고, 에러 메시지가 함께 나타납니다.</p>
          <Unstyled>
            <Gcol gap={4} variant="box-line" className="p-16">
              <FileUpload
                files={SAMPLE_FILES}
                errorMessage="파일 형식이 올바르지 않습니다."
                onClickButton={() => {}}
                onRemove={() => {}}
              />
            </Gcol>
          </Unstyled>
        </>
      ),
    },
  },
  argTypes: {
    files: {
      control: false,
      description: '표시할 파일 목록',
      table: { category: '데이터 props' },
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지 (파일명 빨간색 밑줄)',
      table: { category: '스타일 props' },
    },
    onClickButton: {
      description: '파일선택 버튼 클릭 콜백',
      table: { category: '이벤트 props' },
    },
    onRemove: {
      description: '파일 태그 X 클릭 콜백 (file, index)',
      table: { category: '이벤트 props' },
    },
    id: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    files: SAMPLE_FILES,
    errorMessage: '',
    onClickButton: () => {},
    onRemove: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: (args) => <FileUpload {...args} />,
};

export const Preview: Story = {
  name: 'Preview (hover → 파란색 + 밑줄 + 툴팁)',
  render: (args) => <FileUpload {...args} />,
};

export const WithError: Story = {
  name: 'Error (빨간색 + 밑줄)',
  render: (args) => <FileUpload {...args} />,
  args: { errorMessage: '파일 형식이 올바르지 않습니다.' },
};