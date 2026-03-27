import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TagsInput } from "@/shared/components/common/TagInput";

const meta: Meta<typeof TagsInput> = {
  title: "Components/Common/TagsInput",
  component: TagsInput,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TagsInput>;

export const Default: Story = {
  render: (args) => {
    const [tags, setTags] = React.useState<string[]>([]);
    return (
      <div style={{ maxWidth: 400 }}>
        <TagsInput
          {...args}
          value={tags}
          onChange={setTags}
          placeholder="태그를 입력하세요"
        />
        <div style={{ marginTop: 12, fontSize: 14, color: '#888' }}>
          현재 태그: {tags.length === 0 ? '없음' : tags.join(', ')}
        </div>
      </div>
    );
  },
};

export const MaxTags: Story = {
  render: (args) => {
    const [tags, setTags] = React.useState<string[]>([]);
    return (
      <div style={{ maxWidth: 400 }}>
        <TagsInput
          {...args}
          value={tags}
          onChange={setTags}
          placeholder="최대 3개까지 입력"
          maxTags={3}
        />
        <div style={{ marginTop: 12, fontSize: 14, color: '#888' }}>
          현재 태그: {tags.length === 0 ? '없음' : tags.join(', ')}
        </div>
      </div>
    );
  },
};
