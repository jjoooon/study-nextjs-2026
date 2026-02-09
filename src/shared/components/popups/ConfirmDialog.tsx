'use client';

/**
 * Confirm Dialog (공통 확인 팝업)
 *
 * @description
 * - 사용자의 확인을 받는 2버튼 팝업
 * - 확인/취소 버튼 제공
 * - Promise<boolean> 반환 (확인: true, 취소: false)
 *
 * @usage
 * import { popup } from '@/shared/utils/popup';
 *
 * const confirmed = await popup.confirm({
 *   title: '삭제 확인',
 *   message: '정말 삭제하시겠습니까?',
 *   confirmText: '삭제',
 *   cancelText: '취소',
 *   variant: 'danger'
 * });
 *
 * if (confirmed) {
 *   await deleteItem();
 * }
 */

import { Button } from '@/shared/components/uiux/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/uiux/dialog';

interface ConfirmDialogProps {
  /** 팝업 제목 */
  title?: string;
  /** 팝업 메시지 */
  message?: string;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 */
  cancelText?: string;
  /** 변종 (danger, warning, info) */
  variant?: 'danger' | 'warning' | 'info';
  /** Promise resolve 함수 */
  resolve: (result: boolean) => void;
}

export function ConfirmDialog({
  title = '확인',
  message = '진행하시겠습니까?',
  confirmText = '확인',
  cancelText = '취소',
  variant = 'info',
  resolve,
}: ConfirmDialogProps) {
  const handleConfirm = () => resolve(true);
  const handleCancel = () => resolve(false);

  // 변종에 따른 버튼 스타일
  const getConfirmButtonVariant = (): 'default' | 'destructive' | 'secondary' => {
    switch (variant) {
      case 'danger':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button variant={getConfirmButtonVariant()} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
