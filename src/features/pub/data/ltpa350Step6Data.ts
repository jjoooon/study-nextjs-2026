export type Ltpa350Step6GridRow = {
  id: number;
  field01: string | number;
  field02: string | number;
  field03: string | number;
  field04: string | number;
  field05: string | number;
  isSumRow?: boolean;
};

export interface Ltpa350Step6DataType {
  agGridTable: Ltpa350Step6GridRow[];
}

export const Ltpa350Step6Data: Ltpa350Step6DataType = {
  agGridTable: [
    {
      id: -1,
      field01: '선택건수',
      field02: '0',
      field03: '선택합계',
      field04: '46,500',
      field05: '',
      isSumRow: true,
    },
    {
      id: 1,
      field01: '',
      field02: '',
      field03: '',
      field04: '',
      field05: '',
    },
    {
      id: 2,
      field01: '',
      field02: '',
      field03: '',
      field04: '',
      field05: '',
    },
  ],
};
