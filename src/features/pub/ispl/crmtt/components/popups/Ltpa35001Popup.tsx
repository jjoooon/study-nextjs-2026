/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import '@/shared/lib/agGridPub';
import { Gcol, Grow, Typo } from '@atoms';
import { BulletList, BulletListItem } from '@common/BulletList';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogFooterArea,
  DialogHeader,
  DialogSection,
  DialogTitle,
} from '@uiux/Dialog';

type Ltpa35001PopupProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
};

const Ltpa35001Popup = ({ open = true, onOpenChange, onClose }: Ltpa35001PopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={true} size="md">
        <DialogHeader>
          <DialogTitle>
            <Typo tag={'strong'} variant={'heading-lg'}>
              출산육아휴직 보험료 할인 안내
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Gcol placement="ss" gap={2}>
            <Typo tag={'strong'} variant={'body-lg'}>
              출산(과거1년이내)할인 적용시
            </Typo>

            <Gcol placement="ss" gap={2}>
              <BulletList position="col">
                <BulletListItem className="flex-row">
                  <Typo variant={'body-sm'} tag={'b'} className="color-[#000]">
                    적용대상
                  </Typo>
                  <BulletList position="col" type="dash" className="-ml-2 font-normal">
                    <BulletListItem className="text-[1.2rem]">
                      계약자(법정대리인포함) 또는 계약자의 배우자가 출산을 하게 된 경우{' '}
                      <Typo variant={'body-sm'} tag={'b'} color={'danger'}>
                        (단, 피보험자를 출수한 경우는 제외)
                      </Typo>
                    </BulletListItem>
                  </BulletList>
                </BulletListItem>
              </BulletList>

              <Gcol placement={'ss'} gap={1}>
                <Gcol placement={'ss'} variant={'box-info'}>
                  <Typo variant={'body-sm'} icon={'info'}>
                    <b>할인 가능 예시</b>
                  </Typo>
                  <BulletList position="col">
                    <BulletListItem className="text-[1.2rem]">
                      첫째를 출산하고 1년 이내 둘째(태아포함)를 피보험자로 어린이보험 가입 시
                    </BulletListItem>
                    <BulletListItem className="text-[1.2rem]">
                      둘째를 출산하고 1년 이내 첫째를 피보험자로 어린이보험 가입 시
                    </BulletListItem>
                  </BulletList>
                </Gcol>
                <Gcol placement={'ss'} variant={'box-warning'}>
                  <Typo variant={'body-sm'} icon={'warning'}>
                    <b>할인 불가 예시</b>
                  </Typo>
                  <BulletList position="col">
                    <BulletListItem className="text-[1.2rem]">
                      출산 대상 자녀(태아 포함)를 피보험자로 어린이보험 가입 시
                    </BulletListItem>
                    <BulletListItem className="text-[1.2rem]">출산일로부터 1년이 초과된 경우</BulletListItem>
                  </BulletList>
                </Gcol>
              </Gcol>

              <BulletList position="col">
                <BulletListItem className="flex-row font-bold text-[1.2rem]">
                  <Typo variant={'body-sm'} tag={'b'} className="color-[#000]">
                    증빙서류(계약자 또는 계약자의 배우자 기준) 확인
                  </Typo>

                  <BulletList position="col" type="dash" className="-ml-2 font-normal">
                    <BulletListItem className="text-[1.2rem]">
                      가족관계증명서 또는 주민등록등본 내 계약자(또는 배우자)의 마지막 출생자녀 생년월일과 설계화면
                      동일여부 확인
                    </BulletListItem>
                    <BulletListItem className="text-[1.2rem]">
                      계약자가 미성년자인 경우, 기본증명서의 법정대리인(친권자)와 법정대리인 등록화면에 등록된 대상과
                      생년월일이 동일한지 확인
                    </BulletListItem>
                  </BulletList>
                </BulletListItem>
              </BulletList>
            </Gcol>

            <Typo tag={'strong'} variant={'body-lg'}>
              육아휴직할인 적용시
            </Typo>

            <Gcol placement="ss" gap={2}>
              <BulletList position="col" className="gap-1">
                <BulletListItem className="flex-row font-bold text-[1.2rem]">
                  <Typo variant={'body-sm'} tag={'b'} className="color-[#000]">
                    적용대상
                  </Typo>

                  <BulletList position="col" type="dash" className="-ml-2 font-normal">
                    <BulletListItem className="text-[1.2rem]">
                      계약자(법정대리인포함) 또는 계약자의 배우자가 육아휴직 기간 중인 경우
                    </BulletListItem>
                  </BulletList>
                </BulletListItem>
                <BulletListItem className="flex-row font-bold text-[1.2rem]">
                  <Typo variant={'body-sm'} tag={'b'} className="color-[#000]">
                    증빙서류(계약자 또는 계약자의 배우자 기준) 확인
                  </Typo>

                  <BulletList position="col" type="dash" className="-ml-2 font-normal">
                    <BulletListItem className="text-[1.2rem]">
                      가족관계증명서 또는 주민등록등본 내 계약자(또는 배우자)의 육아휴직(육아기 근로시간 단축) 확인서의
                      육아휴직 기간 확인
                    </BulletListItem>
                    <BulletListItem className="text-[1.2rem]">
                      계약자가 미성년자인 경우, 기본증명서의 법정대리인(친권자)와 법정대리인 등록화면에 등록된 대상과
                      생년월일이 동일한지 확인
                    </BulletListItem>
                  </BulletList>
                </BulletListItem>
              </BulletList>

              <Gcol placement={'ss'} variant={'box-warning'}>
                <Typo variant={'body-sm'} icon={'warning'}>
                  <b>유의사항</b>
                </Typo>
                <BulletList position="col">
                  <BulletListItem className="text-[1.2rem]">
                    할인 관련 자세한 사항은 &quot;출산육아휴직 보험료 할인 특별약관&quot;의 사업방법서 별지를 확인
                    하시기 바랍니다.
                  </BulletListItem>
                </BulletList>
              </Gcol>
            </Gcol>
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow>
              <DialogClose asChild>
                <Button variant={'outlined'} size={'xl'} color={'gray-light'} onClick={onClose}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Ltpa35001Popup;
