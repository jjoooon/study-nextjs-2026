/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { StoryDocTemplate } from '@/shared/components/storybook/StoryDocTemplate';
import { Grow } from '@atoms';
import { FileUpload } from '@common/FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <StoryDocTemplate
          title="FileUpload"
          overview={`FileUpload 컴포넌트는 파일선택 버튼과 선택된 파일 태그를 함께 표시하는 UI 요소입니다.
업로드 로직은 포함하지 않으며, 파일 목록과 이벤트 핸들러를 외부에서 주입하는 Controlled 컴포넌트입니다.
파일명 hover 시 파란색(#006FF2) + 밑줄 + 전체 이름을 보여주는 툴팁이 활성화되며, error 상태일 때 빨간색 + 밑줄로 바뀝니다.`}
          history={['2026.06.14 - Props 한글 JSDoc 추가 및 스토리북 명세 1:1 동기화']}
          usageCode={`
import { FileUpload } from '@common/FileUpload';

<FileUpload
  files={[
    {
      edmsId: 'file-1',
      originalFilename: '첨부파일.png',
      fileSize: 1024,
      extension: 'png',
      storedFilename: 'stored_file_1.png',
    },
  ]}
  onClickButton={() => { /* 파일선택 */ }}
  onChange={(files) => { /* 상태반영 */ }}
/>
          `}
        >
          <h2>Default</h2>
          <p>파일이 선택되지 않은 기본 상태입니다.</p>
          <Grow
            gap={4}
            className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
          >
            <FileUpload files={[]} onClickButton={() => {}} onChange={() => {}} />
          </Grow>

          <h2 className="mt-8">Preview</h2>
          <p>파일명 hover 시 파란색(#006FF2) + 밑줄로 변경되며 전체 이름이 툴팁으로 표시됩니다.</p>
          <Grow
            gap={4}
            className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
          >
            <FileUpload
              files={[
                {
                  edmsId: '1',
                  originalFilename: '매우긴이름의첨부파일이름예시입니다확장자포함.pdf',
                  fileSize: 2048500,
                  extension: 'pdf',
                  storedFilename: 'stored_pdf.pdf',
                },
              ]}
              onClickButton={() => {}}
              onChange={() => {}}
            />
          </Grow>

          <h2 className="mt-8">Error</h2>
          <p>errorMessage 전달 시 파일명이 빨간색 + 밑줄로 표시되고, 에러 메시지가 나타납니다.</p>
          <Grow
            gap={4}
            className="p-16 border border-[var(--color-gray-10)] border-dashed bg-[var(--color-gray-0)] rounded-[1rem] w-full"
          >
            <FileUpload
              files={[
                {
                  edmsId: '2',
                  originalFilename: '오류난첨부파일.jpg',
                  fileSize: 512000,
                  extension: 'jpg',
                  storedFilename: 'stored_jpg.jpg',
                },
              ]}
              errorMessage="파일 형식이 올바르지 않습니다."
              onClickButton={() => {}}
              onChange={() => {}}
            />
          </Grow>
        </StoryDocTemplate>
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
      table: { category: '에러 props' },
    },
    onClickButton: {
      action: 'clickedButton',
      table: { category: '이벤트 props' },
    },
    onClickFileName: {
      action: 'clickedFileName',
      table: { category: '이벤트 props' },
    },
    onChange: {
      action: 'changed',
      table: { category: '이벤트 props' },
    },
  },
  args: {
    files: [
      {
        edmsId: 'file-1',
        originalFilename: '테스트파일.txt',
        fileSize: 1024,
        extension: 'txt',
        storedFilename: 'stored_txt.txt',
      },
    ],
    errorMessage: '',
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: (args) => {
    const [files, setFiles] = React.useState(args.files ?? []);
    React.useEffect(() => {
      setFiles(args.files ?? []);
    }, [args.files]);

    return (
      <FileUpload
        {...args}
        files={files}
        onChange={(nextFiles) => {
          setFiles(nextFiles);
          args.onChange?.(nextFiles);
        }}
      />
    );
  },
};
