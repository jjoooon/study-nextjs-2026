/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Gcol, Grow, Typo } from '@atoms';
import { CircleCheckIcon, TimeRecordIcon, InfoBoxWarningIcon, SpinnerBIcon } from '@icons';
import { Button } from '@uiux/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogSection,
  DialogTitle,
  DialogFooterArea,
  DialogClose,
} from '@uiux/Dialog';

export type PlanApplyStatusType = 'idle' | 'processing' | 'error' | 'success';

export interface PlanApplyItem {
  /** 항목 고유 ID ('notice' | 'reduction' | string) */
  id: string;
  /** 항목 명칭 ('알릴사항', '담보감액' 등) */
  title: string;
  /** 1단계: 항목별 상세 안내 설명문구 */
  description?: string;
  /** 1단계: 항목별 경고 안내문구 */
  warningNotice?: string;
  /** 2단계: 실시간 진행 상태 */
  status?: PlanApplyStatusType;
  /** 오류 발생 시 이동할 타겟 정보/경로 */
  targetUrl?: string;
  /** 오류 발생 시 표시할 에러 문구 */
  errorMsg?: string;
}

export interface PlanApplyStatusProps {
  /** 다이얼로그 열림 여부 */
  open: boolean;
  /** 다이얼로그 열림 상태 변경 콜백 */
  onOpenChange: (open: boolean) => void;
  /** 반영 대상 항목 데이터 목록 (알릴사항, 담보감액 등) */
  items: PlanApplyItem[];
  /** 1단계 [진행] 클릭 시 호출되는 콜백 (실시간 처리 시작 시점) */
  onStart?: () => void;
  /** 오류 발생 시 [화면이동] 클릭 시 호출되는 콜백 */
  onNavigate?: (item?: PlanApplyItem) => void;
  /** 반영 완료 시 [확인] 클릭 시 호출되는 콜백 */
  onConfirm?: () => void;
  /** [닫기] 클릭 시 호출되는 콜백 */
  onClose?: () => void;
  /** 다이얼로그 단계 ('confirm': 안내, 'progress': 진행상태) - 미지정 시 1단계 시작 후 진행 */
  step?: 'confirm' | 'progress';
}

export function PlanApplyStatus({
  open,
  onOpenChange,
  items = [],
  onStart,
  onNavigate,
  onConfirm,
  onClose,
  step: initialStep,
}: PlanApplyStatusProps) {
  const [currentStep, setCurrentStep] = useState<'confirm' | 'progress'>(initialStep ?? 'confirm');

  // 외부 initialStep 변경 시 동기화
  useEffect(() => {
    if (initialStep) {
      setCurrentStep(initialStep);
    }
  }, [initialStep]);

  // 다이얼로그가 닫히면 step을 다시 1단계('confirm')로 리셋
  useEffect(() => {
    if (!open) {
      setCurrentStep(initialStep ?? 'confirm');
    }
  }, [open, initialStep]);

  // 진행 상태 분석
  const hasError = useMemo(() => items.some((item) => item.status === 'error'), [items]);
  const isAllSuccess = useMemo(() => items.length > 0 && items.every((item) => item.status === 'success'), [items]);
  const activeProcessingItem = useMemo(
    () => items.find((item) => item.status === 'processing') || items.find((item) => item.status === 'idle'),
    [items]
  );
  const errorItem = useMemo(() => items.find((item) => item.status === 'error'), [items]);

  // [진행] 버튼 클릭 핸들러
  const handleStart = () => {
    setCurrentStep('progress');
    onStart?.();
  };

  // [닫기] 핸들러
  const handleClose = () => {
    onClose?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton resizable={false} className="w-[37rem]">
        <DialogHeader>
          <DialogTitle>
            <Typo tag="strong" variant="heading-lg">
              {currentStep === 'confirm' ? '설계반영 확인 안내' : '설계반영 진행상태 안내'}
            </Typo>
          </DialogTitle>
        </DialogHeader>

        <DialogSection>
          <Gcol>
            {currentStep === 'confirm' ? (
              /* ================= 1단계: 설계반영 확인 안내 ================= */
              <Gcol gap={3} placement="ss">
                {items.map((item, idx) => (
                  <Gcol key={item.id} gap={2} placement="ss">
                    <Typo tag="h3" variant="body-md" weight="bold">
                      {items.length > 1 ? `${idx + 1}. ` : ''}
                      {item.title} 반영
                    </Typo>
                    <Typo tag="p" variant="body-sm" icon={'dash'} color={'gray'}>
                      {item.description ||
                        (item.id === 'notice'
                          ? '보험금 지급을 기준으로 일부 항목을 자동으로 반영합니다.'
                          : '심사결과 가입불가한 담보를 조정하며, 동시가입조건의 담보도 함께 조정합니다.')}
                    </Typo>
                    {item.id === 'notice' && (
                      <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
                        <Typo tag={'span'} variant={'body-sm'} icon={'warning'}>
                          조회정보를 기준으로 추정입력되며 (예: 완치여부) 실제 사실관계와 다를 수 있으므로 반드시
                          고객에게 확인바랍니다.
                        </Typo>
                      </Gcol>
                    )}
                  </Gcol>
                ))}
                <Gcol variant={'box-warning'} placement={'ss'} className="w-full">
                  <Typo tag={'strong'} variant={'body-sm'} icon={'warning'} weight={'bold'} color={'danger'}>
                    추가확인 또는 입력이 필요한 경우 해당 입력화면으로 이동합니다.
                  </Typo>
                </Gcol>

                <Gcol placement="cc">
                  <Typo tag="strong" variant="body-lg" weight="bold">
                    위 내용을 확인하였으며, 설계에 반영합니다.
                  </Typo>
                </Gcol>
              </Gcol>
            ) : (
              /* ================= 2단계: 설계반영 진행상태 안내 ================= */
              <Gcol gap={5} placement="cc">
                {/* 진행 상태 카드 영역 */}
                <Grow className="w-full" placement="cc" gap={0}>
                  {items.map((item, idx) => {
                    const status = item.status || 'idle';
                    return (
                      <React.Fragment key={item.id}>
                        {idx > 0 && (
                          <div className="w-[4rem] h-[2px] bg-[linear-gradient(to_right,#c4c4c4_4px,transparent_4px)] bg-[length:7px_2px] bg-repeat-x translate-y-[1rem]"></div>
                        )}

                        <Gcol placement="cc" gap={2} className="w-auto">
                          <Typo tag="b" variant="body-sm" weight="bold">
                            {item.title}
                          </Typo>

                          <Gcol
                            placement="cc"
                            className={`w-[11.8rem] p-3 rounded-[1rem] border gap-[0.2rem] transition-all ${
                              status === 'idle'
                                ? 'bg-[var(--color-gray-10)] border-[var(--color-gray-20)] text-[var(--color-gray-50)]'
                                : status === 'processing'
                                  ? 'bg-[var(--color-information-5)] border-[var(--color-information-50)] text-[var(--color-information-50)]'
                                  : status === 'error'
                                    ? 'bg-[var(--color-danger-10)] border-[var(--color-danger-50)] text-[var(--color-danger-50)]'
                                    : 'bg-[var(--color-success-10)] border-[var(--color-success-60)] text-[var(--color-success-60)]'
                            }`}
                          >
                            {status === 'idle' && <TimeRecordIcon size={16} />}
                            {status === 'processing' && <SpinnerBIcon size={16} color="var(--color-information-50)" />}
                            {status === 'error' && <InfoBoxWarningIcon size={16} />}
                            {status === 'success' && <CircleCheckIcon size={16} />}

                            <Typo
                              tag="span"
                              variant="body-lg"
                              className={
                                status === 'idle'
                                  ? 'text-gray-400'
                                  : status === 'processing'
                                    ? 'text-blue-600'
                                    : status === 'error'
                                      ? 'text-red-500'
                                      : 'text-emerald-600'
                              }
                            >
                              {status === 'idle' && '대기중'}
                              {status === 'processing' && '반영중'}
                              {status === 'error' && '추가확인 필요'}
                              {status === 'success' && '완료'}
                            </Typo>
                          </Gcol>
                        </Gcol>
                      </React.Fragment>
                    );
                  })}
                </Grow>

                {/* 하단 진행상태 안내 문구 */}
                <Gcol className="w-full" placement="cc">
                  {hasError ? (
                    <div className="flex flex-col items-center gap-1">
                      <Typo tag="p" variant="body-lg">
                        {errorItem?.title || '항목'} 입력 과정 중 확인사항이 발생하였습니다.
                      </Typo>
                      <Typo tag="p" variant="body-lg" color={'danger'}>
                        중단 후, 해당 입력화면으로 이동합니다.
                      </Typo>
                    </div>
                  ) : isAllSuccess ? (
                    <Typo tag="p" variant="body-lg">
                      설계반영이 완료되었습니다.
                    </Typo>
                  ) : (
                    <Typo tag="p" variant="body-lg">
                      {activeProcessingItem
                        ? `${activeProcessingItem.title}를 반영하고 있습니다.`
                        : '반영을 진행하고 있습니다.'}
                    </Typo>
                  )}
                </Gcol>
              </Gcol>
            )}
          </Gcol>
        </DialogSection>

        <DialogFooter>
          <DialogFooterArea>
            <Grow className="gap-2" placement="ec">
              {currentStep === 'confirm' ? (
                /* 1단계 버튼 */
                <Button variant="contained" size="xl" onClick={handleStart}>
                  진행
                </Button>
              ) : isAllSuccess ? (
                /* 2단계 완료 후 버튼 */
                <Button variant="contained" size="xl" onClick={onConfirm}>
                  확인
                </Button>
              ) : (
                /* 2단계 진행/오류 시 [화면이동] 버튼 */
                <Button variant="contained" size="xl" disabled={!hasError} onClick={() => onNavigate?.(errorItem)}>
                  화면이동
                </Button>
              )}

              <DialogClose asChild>
                <Button variant="outlined" size="xl" color="gray-light" onClick={handleClose}>
                  닫기
                </Button>
              </DialogClose>
            </Grow>
          </DialogFooterArea>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
