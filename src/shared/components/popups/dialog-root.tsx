'use client';

/**
 * Dialog Root Container
 *
 * @description
 * - Redux Store에 있는 모든 팝업을 렌더링
 * - Z-Index 자동 관리
 * - Portal로 렌더링하여 DOM 계층구조 분리
 *
 * @location
 * src/app/layout.tsx에 추가하여 전역 팝업 관리
 *
 * @usage
 * // src/app/layout.tsx
 * import { DialogRoot } from '@/shared/components/popups/dialog-root';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <DialogRoot />
 *       </body>
 *     </html>
 *   );
 * }
 */

import { createPortal } from 'react-dom';
import { useAppSelector } from '@/redux';
import { selectAllPopups } from '@/shared/store/popupSelectors';
import { DialogRenderer } from './dialog-renderer';

export function DialogRoot() {
  const popups = useAppSelector(selectAllPopups);

  // 팝업이 없으면 아무것도 렌더링하지 않음
  if (popups.length === 0) return null;

  // Portal로 body 하단에 렌더링
  if (typeof window === 'undefined') return null;

  return createPortal(
    <>
      {popups.map((popup) => (
        <DialogRenderer key={popup.id} {...popup} />
      ))}
    </>,
    document.body
  );
}
