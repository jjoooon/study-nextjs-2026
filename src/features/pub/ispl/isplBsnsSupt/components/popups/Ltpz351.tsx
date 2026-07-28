/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';
import type { ColDef, ICellRendererParams } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';
import {
  InputWithSearchCellRenderer,
  InputWithSearchCellEditor,
  createEditableCallbackForButton,
  useDynamicColumnWidths,
  AgGridEmptyComponent,
} from '@aggrid';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { DialogBottomInfo } from '@common/DialogBottomInfo';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogClose,
} from '@uiux/Dialog';

import '@/shared/lib/agGridPub';

type DummyDataType = {
  id: number;
  isChecked: boolean;
  field1: string | number;
  field2: string | number;
  field3: string | number;
};
const DummyData: DummyDataType[] = [
  { id: 1, isChecked: true, field1: '취급자', field2: '안손보', field3: '010-0000-0000' },
  { id: 2, isChecked: false, field1: '계약자', field2: '', field3: '' },
];

export type NoticeType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I';

export interface Ltpz351Props {
  noticeType?: NoticeType;
  isPayExempt?: boolean;
}

const Ltpz351 = ({ noticeType = 'B', isPayExempt = true }: Ltpz351Props) => {
  const [selectedNotice, setSelectedNotice] = React.useState<NoticeType>(noticeType);

  const [isPayExemptState, setIsPayExemptState] = React.useState(isPayExempt);

  React.useEffect(() => {
    setSelectedNotice(noticeType);
  }, [noticeType]);

  React.useEffect(() => {
    setIsPayExemptState(isPayExempt);
  }, [isPayExempt]);

  const { attributeColumnWidth } = useDynamicColumnWidths();
  const columnDefs = React.useMemo<ColDef<DummyDataType>[]>(
    () => [
      {
        headerName: '구분',
        field: 'field1',
        flex: 1,
        minWidth: attributeColumnWidth(70),
        cellClass: 'text-center',
      },
      {
        headerName: '성명',
        field: 'field2',
        flex: 1,
        cellClass: isPayExemptState ? 'text-center editable-cell' : 'text-center',
        editable: isPayExemptState ? createEditableCallbackForButton() : false,
        cellRenderer: isPayExemptState ? InputWithSearchCellRenderer : undefined,
        cellEditor: InputWithSearchCellEditor,
        cellRendererParams: {
          onButtonClick: (params: ICellRendererParams<DummyDataType>) => {
            alert(`[공용 Renderer] 검색 버튼 클릭: ${params.value ?? '빈 값'}`);
          },
        },
        cellEditorParams: {
          onButtonClick: (val: string) => {
            alert(`[공용 Editor] 검색 버튼 클릭: ${val}`);
          },
        },
      },
      {
        headerName: '휴대폰',
        field: 'field3',
        flex: 1,
        cellClass: isPayExemptState ? 'text-center editable-cell' : 'text-center',
        editable: isPayExemptState,
        cellEditor: 'agTextCellEditor',
        cellEditorParams: {
          maxLength: 13,
        },
      },
    ],
    [attributeColumnWidth, isPayExemptState]
  );

  const [rowData] = React.useState<DummyDataType[]>(DummyData);

  const renderNoticeContent = () => {
    switch (selectedNotice) {
      case 'A':
        return (
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              상령일/동의종료일
            </Typo>
            <BulletList>
              <BulletListItem size="sm">
                상령일 : 보험 연령이 바뀌는 날짜입니다. 상령일 이전은 만나이, 상령일 이후는 만나이 +1살로 보험연령이
                결정됩니다.
              </BulletListItem>
              <BulletListItem size="sm">동의종료일 : 가입설계동의를 받은 날로부터 1년이 지난날입니다.</BulletListItem>
            </BulletList>
          </Gcol>
        );

      case 'B':
        return (
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              보험차익비과세
            </Typo>
            <BulletList>
              <BulletListItem size="sm">
                보험차익비과세란? - 저축성보험에서 보험차익이 이자소득에 해당되어 과세가 되어야 하나 금융산업을 위해
                일정한 조건을 충족하면 이에 대해 비과세를 적용합니다.
              </BulletListItem>
              <BulletListItem size="sm">
                저축성보험 비과세 적용 요건 및 가입한도 : 비과세 상품 가입시 세금우대 등록이 필수입니다. (전 금융권 통합
                가입한도 초과여부 관리)
                <BulletList>
                  <BulletListItem size="sm" before="1." type="symbols">
                    월 적립식 저축성보험
                    <BulletList>
                      <BulletListItem size="sm" before="①" type="symbols">
                        비과세요건 - 10년 이상 유지, 5년 이상 납입
                      </BulletListItem>
                      <BulletListItem size="sm" before="②" type="symbols">
                        가입한도 - 월 납입액 150만원 이하
                      </BulletListItem>
                      <BulletListItem size="sm" before="③" type="symbols">
                        비과세 적용 - 세금우대전산망 비과세 등록시
                      </BulletListItem>
                    </BulletList>
                  </BulletListItem>
                  <BulletListItem size="sm" before="2." type="symbols">
                    월 적립식 외 저축성보험
                    <BulletList>
                      <BulletListItem size="sm" before="①" type="symbols">
                        비과세요건 - 10년 이상 유지
                      </BulletListItem>
                      <BulletListItem size="sm" before="②" type="symbols">
                        가입한도 - 계약기간 총 납입액 1억 이하
                      </BulletListItem>
                      <BulletListItem size="sm" before="③" type="symbols">
                        비과세 적용 - 세금우대전산망 비과세 등록시
                      </BulletListItem>
                    </BulletList>
                  </BulletListItem>
                </BulletList>
              </BulletListItem>
            </BulletList>
          </Gcol>
        );

      case 'C':
        return (
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              실손 전부(비례) 보상
            </Typo>
            <BulletList>
              <BulletListItem size="sm">
                실손 비례보상 : 보험가액(화재가 발생했을 때의 물건 가치) 대비 보험가입금액으로 실제 손해를 보상하는
                방식입니다.
                <BulletList className="mt-1">
                  <BulletListItem size="sm" type="symbols" before="ex)">
                    보험가액 2억, 보험가입금액 1억원인 경우 - 1.2억원 화재손해 발생했을 경우 6천만원의 보험금을
                    지급합니다.
                  </BulletListItem>
                </BulletList>
              </BulletListItem>
              <BulletListItem size="sm">
                실손 전부보상 : 보험가액을 따지지 않고 가입금액 한도 내에서 실제 손해액 보상하는 방식입니다.
                <BulletList className="mt-1">
                  <BulletListItem size="sm" type="symbols" before="ex)">
                    보험가액 2억, 보험가입금액 1억원인 경우 - 1.2억원 화재손해 발생했을 경우 1억원의 보험금을
                    지급합니다.
                  </BulletListItem>
                </BulletList>
              </BulletListItem>
            </BulletList>
          </Gcol>
        );

      case 'D':
        return (
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              장애보험 전환
            </Typo>
            <BulletList>
              <BulletListItem size="sm" before="1." type="symbols">
                장애인보험 전환 제도란?
                <BulletList className="mt-1">
                  <BulletListItem size="sm" type="dot">
                    장애인전용보험으로 전환 시 소득세법에 따라 「장애인전용 보장성보험 특별세액공제」 적용
                  </BulletListItem>
                  <BulletListItem size="sm" type="dot">
                    보장내용 및 보험료는 변경되지 않으며, 연말정산시 영수증 처리만 변경
                  </BulletListItem>
                </BulletList>
              </BulletListItem>
              <BulletListItem size="sm" before="2." type="symbols">
                장애인보험 전환 세부 내용
                <BulletList className="mt-1">
                  <BulletListItem size="sm" before="①" type="symbols">
                    가입대상 : 장기보장성보험 개인계약 中 피보험자(또는 수익자)가 세법상 장애인에 해당하는 계약
                  </BulletListItem>
                  <BulletListItem size="sm" before="②" type="symbols">
                    장애인 범위 : 소득세법상 인적공제 대상 장애인
                    <BulletList className="mt-1">
                      <BulletListItem size="sm" type="dash">
                        「장애인복지법」에 따른 장애인(장애인 등록자)
                      </BulletListItem>
                      <BulletListItem size="sm" type="dash">
                        「장애아동복지법」에 따라 발달재활서비스를 받고 있는 장애아동
                      </BulletListItem>
                      <BulletListItem size="sm" type="dash">
                        「국가유공자법」에 의한 상이자 및 이와 유사한 사람으로서 근로능력이 없는 자
                      </BulletListItem>
                      <BulletListItem size="sm" type="dash">
                        상시 치료를 요하는 중증환자
                      </BulletListItem>
                    </BulletList>
                  </BulletListItem>
                  <BulletListItem size="sm" before="③" type="symbols">
                    제출서류 : 장애인을 확인할 수 있는 공식적인 서류(소득세법 적용)
                  </BulletListItem>
                </BulletList>
              </BulletListItem>
              <BulletListItem size="sm" before="※" type="symbols">
                허위 서류 제출 등 부정 신청 시 소득세법 위반에 해당할 수 있으므로 신청 시 유의하시기 바랍니다.
              </BulletListItem>
            </BulletList>
          </Gcol>
        );

      case 'E':
        return (
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              수익자 지정, 변경 추가약정
            </Typo>
            <BulletList>
              <BulletListItem size="sm">
                &apos;약정함&apos; 선택시 효력 : 계약자 사망한 경우 승계인이 보험수익자 지정, 변경권을 행사 할 수
                있습니다.
              </BulletListItem>
              <BulletListItem size="sm">
                &apos;약정안함&apos; 선택시 효력 : 계약자 사망한 경우 상속인 등 승계인이 보험수익자 지정, 변경권을
                행사할 수 없습니다.
              </BulletListItem>
            </BulletList>
          </Gcol>
        );

      case 'F':
        return (
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              지정대리 청구인
            </Typo>
            <BulletList>
              <BulletListItem size="sm">
                지정대리청구인 제도 : 보험계약자 본인이 치매진단으로 보험에 가입한 사실을 잊었거나 중대한 사고 발생
                등으로 보험료 청구가 현실적으로 어려운 경우 &apos;보험료 지정대리 청구인 제도&apos;를 통해 보험기간 중
                계약자가 사전에 지정해 둔 대리인이 보험료 청구가 불가능한 계약자를 대신해 보험금을 청구할 수 있도록 만든
                제도입니다.
              </BulletListItem>
              <BulletListItem size="sm">
                지정대리인은 계약자, 피보험자, 보험수익자가 모두 같을 경우 지정할 수 있습니다. 치매관련 담보를 가입했을
                시에는 필수로 지정해야 합니다.
              </BulletListItem>
            </BulletList>
          </Gcol>
        );

      case 'G':
        return (
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              당월 해지 자동이체 신청 서비스
            </Typo>
            <BulletList>
              <BulletListItem size="sm" className="font-bold">
                당월 해지 자동이체 신청 서비스 : 보험료 미납에 따른 보험계약 효력 상실 방지를 위해 연체보험료(1회)를
                해지 당일에 자동이체 하는 서비스입니다.
              </BulletListItem>
              <BulletListItem size="sm" className="font-bold">
                서비스 세부 내용
                <BulletList className="mt-1 font-normal">
                  <BulletListItem size="sm" before="1." type="symbols">
                    서비스 신청 시 해당 계약자의 보유 계약 전체에 적용됩니다.
                  </BulletListItem>
                  <BulletListItem size="sm" before="2." type="symbols">
                    출금일은 해지 당월 첫번째 이체일(통상 5일)에 하며, 전월 말일이 비영업일인 경우 일정이 변경 될 수
                    있습니다.
                  </BulletListItem>
                  <BulletListItem size="sm" before="3." type="symbols">
                    출금의뢰 시점에 등록된 계약자 및 피보험자의 자동이체 계좌에서 출금처리 됩니다. (자동이체 계좌
                    예금주가 제3자인 경우 적용되지 않습니다.)
                  </BulletListItem>
                </BulletList>
              </BulletListItem>
            </BulletList>
          </Gcol>
        );

      case 'H':
        return (
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              해지방지 휴대폰결제
            </Typo>
            <BulletList>
              <BulletListItem size="sm" className="font-bold">
                해지방지 휴대폰 결제 서비스 : 보험료 미납에 따른 보험계약 효력 상실 방지를 위해 연체보험료(1회)를 휴대폰
                결제 하는 서비스입니다.
              </BulletListItem>
              <BulletListItem size="sm" className="font-bold">
                서비스 세부 내용
                <BulletList className="mt-1 font-normal">
                  <BulletListItem size="sm" before="1." type="symbols">
                    서비스 신청 시 계약자가 보유한 유지계약 전체에 적용됩니다.
                  </BulletListItem>
                  <BulletListItem size="sm" before="2." type="symbols">
                    보험료가 2회 미납 되어 납입월 말일까지 보험료 납입이 되지 않을 경우 익월 2영업일에 휴대폰결제 승인
                    요청 됩니다. (말일이 휴일인 경우 3영업일에 승인 요청)
                  </BulletListItem>
                  <BulletListItem size="sm" before="3." type="symbols">
                    승인 시점에 휴대폰결제 사용한도초과 금액보다 작거나 통신요금 미납 등의 사유로 보험료 결제가 되지
                    않을 경우 보험계약이 해지(실효) 될 수 있습니다.
                  </BulletListItem>
                  <BulletListItem size="sm" before="4." type="symbols">
                    휴대폰번호는 결제 시점에 당사에 등록된 계약자의 최종정보로 결제되므로 휴대폰번호 또는 통신사가
                    변경된 경우 당사 고객센터 및 취급지점으로 변경신청 바랍니다.
                  </BulletListItem>
                  <BulletListItem size="sm" before="5." type="symbols">
                    SKT망을 사용하는 알뜰폰은 SKT 정책상 신청이 불가능합니다. (SK7모바일 가입자만 신청 가능)
                  </BulletListItem>
                </BulletList>
              </BulletListItem>
            </BulletList>
          </Gcol>
        );

      case 'I':
        return (
          <Gcol className="w-full" placement="ss" variant="box-info">
            <Typo icon="info" variant="body-sm" weight={'bold'}>
              보험료 납입면제 안내
            </Typo>
            <BulletList>
              <BulletListItem size="sm">알림톡 발송 시 상품별 보험료납입면제 요약 내용이 발송됩니다.</BulletListItem>
            </BulletList>
          </Gcol>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open>
      <DialogContent showCloseButton resizable={true} size="sm">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              가입설계도우미 알림톡발송
            </Typo>
            <Typo tag={'p'} variant={'body-xl'}>
              (LTPZ351)
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Gcol className="w-full" placement="ss" gap={2}>
            <div className="ag-theme-alpine radio-selection inner-scroll" data-row={rowData.length}>
              <AgGridReact<DummyDataType>
                getRowId={(params) => String(params.data.id)}
                noRowsOverlayComponent={AgGridEmptyComponent}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                  sortable: true,
                  resizable: true,
                }}
                selectionColumnDef={{
                  width: 30,
                }}
                rowSelection={{
                  mode: 'singleRow',
                  checkboxes: true,
                  enableClickSelection: true,
                }}
                singleClickEdit={true}
                rowClassRules={{}}
                domLayout="normal"
              />
            </div>
            <Grow placement="ec" className="w-full">
              <Button variant={'contained'} size={'md'}>
                전송
              </Button>
            </Grow>
          </Gcol>
          <Gcol gap={2}>
            <Gcol className="w-full" placement="ss" variant="box-warning">
              <Typo icon="warning" variant="body-sm">
                계약자 휴대폰 번호는 고객등록화면에서 수정
              </Typo>
            </Gcol>
            {renderNoticeContent()}
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
          <DialogBottomInfo />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpz351;
