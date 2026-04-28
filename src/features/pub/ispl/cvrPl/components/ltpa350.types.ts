export interface AgGridRow {
  id: number;
  num: number | null;
  isChecked?: boolean;
  isStandard?: {
    group: boolean;
    edit: boolean;
  };
  coverageName?: string;
  isAttributeVisible?: boolean;
  amount?: string | number | string[];
  isAmountRequired?: boolean;
  isAmountSelectMode?: boolean;
  availableAmount?: number | string | (number | string)[];
  expiry?: string | string[];
  isExpiryEditable?: boolean | boolean[];
  paymentTerm?: string | string[];
  isPaymentTermEditable?: boolean | boolean[];
  premium?: number | string | (number | string)[];
  uwStatus?: string;
  isDuplicateEnabled?: boolean;
  coverageDetail?: {
    title: string;
    description: string;
    info: string[];
  };
  filePath?: string[];
  locked?: boolean;
  isHighlighted?: boolean;
  isError?: boolean;
  badge?: string[];
  isDuplicate?: boolean;
  displayNo?: number;
  _tooltipOn?: boolean;
  [key: string]: unknown;
}

export interface Ltpa350Step2Props {
  onSelectPlan?: (planId: number) => void;
  isWidthExpanded?: boolean;
  setIsWidthExpanded?: (value: boolean) => void;
}
