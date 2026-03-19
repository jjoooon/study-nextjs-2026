import type { Meta, StoryObj } from '@storybook/react';
import { Gcol, Grow } from '@atoms';
import { Title, Primary, Controls, Markdown, Unstyled } from '@storybook/addon-docs/blocks';
import { FileUpload } from '@/shared/components/common/FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Common/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => {
        return (
          <>
            <Title /><br /><br />
            <h2>Overview</h2>
            <div>
              <p>
                FileUpload 컴포넌트는 파일 선택 버튼과 선택된 파일 태그를 함께 제공하는 UI 요소입니다.<br />
                단일/다중 파일 선택, 파일 형식 제한, 에러 메시지 표시 등을 지원합니다.
              </p>
            </div>

            <Primary />
            <Controls />

            <h2>Usage</h2>
            <p>FileUpload 컴포넌트는 다음과 같은 형태로 사용할 수 있습니다.</p>
            <ul>
              <li>기본 단일 파일 선택</li>
              <li>다중 파일 선택 (multiple)</li>
              <li>파일 형식 제한 (accept)</li>
              <li>최대 파일 수 제한 (maxFiles)</li>
              <li>에러 메시지 표시 (errorMessage)</li>
              <li>비활성화 (disabled)</li>
            </ul>
            <Markdown>
              {`
\`\`\`tsx
import { FileUpload } from '@uiux/FileUpload';

<FileUpload
  buttonLabel="파일선택"
  multiple={false}
  accept=".pdf,.png,.jpg"
  maxFiles={5}
  onChange={(files) => console.log(files)}
  onRemove={(file, index) => console.log(file, index)}
  errorMessage="파일을 선택해 주세요."
  disabled={false}
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
                  <th>타입/옵션</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>buttonLabel</td><td>string</td><td>파일 선택 버튼 텍스트 (기본값: '파일선택')</td></tr>
                <tr><td>multiple</td><td>boolean</td><td>다중 파일 선택 여부</td></tr>
                <tr><td>accept</td><td>string</td><td>허용할 파일 형식 (e.g. ".pdf,.png")</td></tr>
                <tr><td>maxFiles</td><td>number</td><td>선택 가능한 최대 파일 수</td></tr>
                <tr><td>disabled</td><td>boolean</td><td>비활성화 여부</td></tr>
                <tr><td>errorMessage</td><td>string</td><td>에러 메시지 표시</td></tr>
                <tr><td>onChange</td><td>(files: File[]) =&gt; void</td><td>파일 목록 변경 콜백</td></tr>
                <tr><td>onRemove</td><td>(file: File, index: number) =&gt; void</td><td>파일 태그 삭제 콜백</td></tr>
                <tr><td>className</td><td>string</td><td>추가 클래스명</td></tr>
              </tbody>
            </table>

            <h2>기본</h2>
            <p>기본 단일 파일 선택입니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <FileUpload buttonLabel="파일선택" />
              </Gcol>
            </Unstyled>

            <h2>다중 파일 선택</h2>
            <p>multiple을 사용하면 여러 파일을 선택할 수 있습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <FileUpload buttonLabel="파일선택" multiple />
              </Gcol>
            </Unstyled>

            <h2>파일 형식 제한</h2>
            <p>accept를 사용하면 선택 가능한 파일 형식을 제한할 수 있습니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <Grow gap={4}>
                  <FileUpload buttonLabel="이미지 선택" accept=".jpg,.jpeg,.png,.gif" />
                  <FileUpload buttonLabel="PDF 선택" accept=".pdf" />
                </Grow>
              </Gcol>
            </Unstyled>

            <h2>에러 상태</h2>
            <p>errorMessage를 전달하면 에러 메시지와 함께 에러 스타일이 적용됩니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <FileUpload
                  buttonLabel="파일선택"
                  errorMessage="파일을 선택해 주세요."
                />
              </Gcol>
            </Unstyled>

            <h2>비활성화</h2>
            <p>disabled를 사용하면 파일 선택 버튼과 삭제 버튼이 비활성화됩니다.</p>
            <Unstyled>
              <Gcol gap={4} variant="box-line" className="p-16">
                <FileUpload buttonLabel="파일선택" disabled />
              </Gcol>
            </Unstyled>
          </>
        );
      },
    },
  },
  argTypes: {
    buttonLabel: {
      control: { type: 'text' },
      table: { category: '텍스트 props' },
    },
    multiple: {
      control: { type: 'boolean' },
      table: { category: '기능 props' },
    },
    accept: {
      control: { type: 'text' },
      table: { category: '기능 props' },
    },
    maxFiles: {
      control: { type: 'number' },
      table: { category: '기능 props' },
    },
    disabled: {
      control: { type: 'boolean' },
      table: { category: '상태 props' },
    },
    errorMessage: {
      control: { type: 'text' },
      table: { category: '상태 props' },
    },
    onChange: {
      control: false,
      table: { disable: true },
    },
    onRemove: {
      control: false,
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
  },
  args: {
    buttonLabel: '파일선택',
    multiple: false,
    accept: undefined,
    maxFiles: undefined,
    disabled: false,
    errorMessage: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: (args) => <FileUpload {...args} />,
};

export const Multiple: Story = {
  args: {
    multiple: true,
    buttonLabel: '파일선택',
  },
  render: (args) => <FileUpload {...args} />,
};

export const WithError: Story = {
  args: {
    errorMessage: '파일을 선택해 주세요.',
  },
  render: (args) => <FileUpload {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <FileUpload {...args} />,
};

export const AcceptImage: Story = {
  args: {
    accept: '.jpg,.jpeg,.png,.gif',
    buttonLabel: '이미지 선택',
  },
  render: (args) => <FileUpload {...args} />,
};

export const AcceptPDF: Story = {
  args: {
    accept: '.pdf',
    buttonLabel: 'PDF 선택',
  },
  render: (args) => <FileUpload {...args} />,
};

export const MaxFiles: Story = {
  args: {
    multiple: true,
    maxFiles: 3,
    buttonLabel: '최대 3개 선택',
  },
  render: (args) => <FileUpload {...args} />,
};
