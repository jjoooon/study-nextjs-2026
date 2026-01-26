'use client';

/**
 * Alert Dialog (공통 알림 팝업)
 *
 * @description
 * - 단순 정보 전달용 1버튼 팝업
 * - 확인 버튼만 제공
 * - Promise<void> 반환
 *
 * @usage
 * import { popup } from '@/shared/utils/popup';
 *
 * await popup.alert({
 *   title: '완료',
 *   message: '작업이 완료되었습니다',
 *   buttonText: '확인',
 *   variant: 'success'
 * });
 */

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';

interface AlertDialogProps {
  /** 팝업 제목 */
  title?: string;
  /** 팝업 메시지 */
  message?: string;
  /** 버튼 텍스트 */
  buttonText?: string;
  /** 변종 (info, success, warning, error) */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Promise resolve 함수 */
  resolve: () => void;
}

export function Alert({
  title = '알림',
  message = '',
  buttonText = '확인',
  variant = 'info',
  resolve,
}: AlertDialogProps) {
  const handleClose = () => resolve();

  // 변종에 따른 버튼 스타일
  const getButtonVariant = (): 'default' | 'destructive' | 'secondary' => {
    switch (variant) {
      case 'error':
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
          <Button variant={getButtonVariant()} onClick={handleClose}>
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Alert;
