import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MonthPicker } from "@common/MonthPicker";

const meta: Meta<typeof MonthPicker> = {
  title: "Components/Date/MonthPicker",
  component: MonthPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "월 선택 전용 MonthPicker 컴포넌트. 연도 이동, 월 비활성화, 커스텀 라벨 등 다양한 옵션 지원.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MonthPicker>;

export const Default: Story = {
  args: {
    selectedMonth: new Date(2026, 2, 1),
    onMonthSelect: (date: Date) => alert(`선택된 월: ${date.getFullYear()}-${date.getMonth() + 1}`),
  },
};

export const WithMinMax: Story = {
  args: {
    selectedMonth: new Date(2026, 2, 1),
    minDate: new Date(2025, 5, 1),
    maxDate: new Date(2027, 8, 1),
    onMonthSelect: (date: Date) => alert(`선택된 월: ${date.getFullYear()}-${date.getMonth() + 1}`),
  },
};

export const DisabledDates: Story = {
  args: {
    selectedMonth: new Date(2026, 2, 1),
    disabledDates: [new Date(2026, 3, 1), new Date(2026, 7, 1)],
    onMonthSelect: (date: Date) => alert(`선택된 월: ${date.getFullYear()}-${date.getMonth() + 1}`),
  },
};
