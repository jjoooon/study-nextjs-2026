'use client';

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';
import { Grow, Gcol, FormCell, FormTable, Typo } from '@/shared/components/common';
import { SearchIcon, ResetIcon } from '@/shared/components/icons';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  TableRow,
  Input,
  Checkbox,
  NativeSelect,
  NativeSelectOption,
} from '@/shared/components/uiux';

ModuleRegistry.registerModules([AllCommunityModule]);

// Types
interface ProductData {
  customerName: string;
  customerId: string;
  customerType: string;
  phone: string;
  address: string;
}

// Mock Data
const MOCK_DATA: ProductData[] = [
  {
    customerName: '홍길동',
    customerId: 'CUST001',
    customerType: '개인',
    phone: '010-1234-5678',
    address: '서울특별시 강남구 테헤란로 123, 삼성타워 45층 4501호',
  },
  {
    customerName: '김철수',
    customerId: 'CUST002',
    customerType: '사업자',
    phone: '010-2345-6789',
    address: '부산광역시 해운대구 마린시티 1차 101동 2502호',
  },
  {
    customerName: '이영희',
    customerId: 'CUST003',
    customerType: '단체',
    phone: '010-3456-7890',
    address: '대구광역시 수성구 두산위브 더 숲 B동 1204호',
  },
  {
    customerName: '박민수',
    customerId: 'CUST004',
    customerType: '개인',
    phone: '010-4567-8901',
    address: '인천광역시 연수구 센트럴파크앙리 32층 3205호',
  },
  {
    customerName: '홍길동',
    customerId: 'CUST001',
    customerType: '개인',
    phone: '010-1234-5678',
    address: '서울특별시 강남구 테헤란로 123, 삼성타워 45층 4501호',
  },
  {
    customerName: '김철수',
    customerId: 'CUST002',
    customerType: '사업자',
    phone: '010-2345-6789',
    address: '부산광역시 해운대구 마린시티 1차 101동 2502호',
  },
  {
    customerName: '이영희',
    customerId: 'CUST003',
    customerType: '단체',
    phone: '010-3456-7890',
    address: '대구광역시 수성구 두산위브 더 숲 B동 1204호',
  },
  {
    customerName: '박민수',
    customerId: 'CUST004',
    customerType: '개인',
    phone: '010-4567-8901',
    address: '인천광역시 연수구 센트럴파크앙리 32층 3205호',
  },
  {
    customerName: '홍길동',
    customerId: 'CUST001',
    customerType: '개인',
    phone: '010-1234-5678',
    address: '서울특별시 강남구 테헤란로 123, 삼성타워 45층 4501호',
  },
  {
    customerName: '김철수',
    customerId: 'CUST002',
    customerType: '사업자',
    phone: '010-2345-6789',
    address: '부산광역시 해운대구 마린시티 1차 101동 2502호',
  },
  {
    customerName: '이영희',
    customerId: 'CUST003',
    customerType: '단체',
    phone: '010-3456-7890',
    address: '대구광역시 수성구 두산위브 더 숲 B동 1204호',
  },
  {
    customerName: '박민수',
    customerId: 'CUST004',
    customerType: '개인',
    phone: '010-4567-8901',
    address: '인천광역시 연수구 센트럴파크앙리 32층 3205호',
  },
];

/**
 * 고객 검색 결과 타입
 */
export interface UserSearchResult {
  /** 수행된 액션 타입 */
  action: 'select' | 'cancel';
  /** 선택된 고객 (select 액션 시) */
  // TODO: @YunJunmo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customer?: any;
}

/**
 * 고객찾기 팝업 Props
 */
export interface UserSearchProps {
  /** 팝업 제목 */
  title?: string;
  /** 팝업 설명 */
  description?: string;
  /** Promise resolve 함수 (결과 반환) */
  resolve: (result: UserSearchResult) => void;
}

export default function UserSearchDialog({ resolve }: UserSearchProps) {
  const columnDefs: ColDef<ProductData>[] = useMemo(
    () => [
      {
        headerName: '고객명',
        field: 'customerName',
        width: 120,
        cellClass: 'text-center',
        sortable: false,
        filter: false,
        tooltipValueGetter: (params) => {
          if (!params.data) return '';
          return params.data.customerName;
        },
      },
      {
        headerName: '고객식별번호',
        field: 'customerId',
        width: 120,
        cellClass: 'text-center',
        sortable: false,
        filter: false,
      },
      {
        headerName: '고객유형명',
        field: 'customerType',
        width: 100,
        cellClass: 'text-center',
        sortable: false,
        filter: false,
      },
      {
        headerName: '휴대폰번호',
        field: 'phone',
        width: 140,
        cellClass: 'text-center',
        sortable: false,
        filter: false,
      },
      {
        headerName: '주소',
        field: 'address',
        flex: 2,
        cellClass: 'text-left',
        sortable: false,
        filter: false,
        tooltipValueGetter: (params) => {
          if (!params.data) return '';
          return params.data.address;
        },
      },
    ],
    []
  );

  /**
   * 취소 버튼 핸들러
   */
  const handleCancel = () => {
    resolve({
      action: 'cancel',
    });
  };

  /**
   * 고객등록 버튼 핸들러
   */
  const handleRegister = () => {
    resolve({
      action: 'select',
    });
  };

  return (
    <Dialog open onOpenChange={handleCancel}>
      <DialogContent className="h-[80vh] w-[90rem] min-w-[80rem] min-h-[60rem]" resizable={true}>
        <DialogHeader>
          <DialogTitle>고객찾기 (CUSZ001)</DialogTitle>
        </DialogHeader>

        {/* 모달 내용 - FormTable 사용 */}
        <div className="gap-8 flex-1 grid grid-rows-[auto_1fr] w-full px-[3.2rem]">
          <Gcol className="gap-2">
            <FormTable
              variant="setting"
              caption="상품,가입연령 검색테이블입니다."
              cols={['w-[10rem]', 'w-[29rem]', 'w-[15rem]', '']}
            >
              <TableRow>
                <FormCell title="고객유형">
                  <NativeSelect aria-label="고객유형 선택" readOnly={false} required={false}>
                    <NativeSelectOption value="">전체</NativeSelectOption>
                    <NativeSelectOption value="개인">개인</NativeSelectOption>
                    <NativeSelectOption value="사업자">사업자</NativeSelectOption>
                    <NativeSelectOption value="단체">단체</NativeSelectOption>
                  </NativeSelect>
                </FormCell>
                <FormCell title="고객식별번호">
                  <Input type="text" aria-label="고객식별번호" />
                </FormCell>
              </TableRow>

              <TableRow>
                <FormCell title="고객명">
                  <Input type="text" aria-label="고객명" />
                </FormCell>
                <FormCell title="생년월일">
                  <Input type="tel" width="lg" placeholder="주민번호앞6자리" />
                  <Typo variant="body-s">예) YYMMDD</Typo>
                </FormCell>
              </TableRow>

              <TableRow>
                <FormCell title="휴대폰번호">
                  <NativeSelect aria-label="테스트선택1" readOnly={false} required={false}>
                    <NativeSelectOption value="">전체</NativeSelectOption>
                    <NativeSelectOption value="todo">010</NativeSelectOption>
                  </NativeSelect>
                  <div className="separator">-</div>
                  <Input type="tel" className="w-20" aria-label="휴대번호 앞자리" />
                  <div className="separator">-</div>
                  <Input type="tel" className="w-20" aria-label="휴대번호 뒷자리" />
                </FormCell>
                <FormCell title="최근등록고객(3개월)">
                  <Checkbox variant="noneText">포함</Checkbox>
                </FormCell>
              </TableRow>
            </FormTable>
            <Grow placement="me" className="w-full gap-2">
              <Button variant="contained" color="secondary" size="md" onClick={() => {}}>
                <SearchIcon color="white" />
                검색
              </Button>
              <Button variant="icon" color="gray" size="md" onClick={() => {}} aria-label="리셋">
                <ResetIcon />
              </Button>
            </Grow>
          </Gcol>

          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-alpine grid grid-rows-[1fr_auto]" style={{ height: '100%', width: '100%' }}>
              <AgGridReact<ProductData>
                rowData={MOCK_DATA}
                columnDefs={columnDefs}
                rowSelection="multiple"
                suppressRowHoverHighlight={false}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 20, 50, 100]}
              />
              <div className="px-[1rem] py-[.8rem] flex gap gap-[.8rem]">
                <Grow className="gap-1" placement="ms">
                  <Checkbox defaultChecked>해지고객 제외</Checkbox>
                </Grow>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="lg" color="gray" onClick={handleCancel}>
            고객수정
          </Button>
          <Button variant="contained" size="lg" onClick={handleRegister}>
            고객등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
