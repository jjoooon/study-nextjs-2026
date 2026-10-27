/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import * as React from 'react';

/**
 * 다이얼로그(Dialog / AlertDialog) 내부 포탈 컨테이너 Context
 * - Dialog 내부에 위치한 팝오버(Popover 등)가 document.body 대신 해당 다이얼로그 DOM 내부에 렌더링되도록
 *   다이얼로그 Content의 HTMLDivElement를 자식 컴포넌트들에게 공유합니다.
 */
export const DialogPortalContainerContext = React.createContext<HTMLElement | null>(null);

/** 다이얼로그 내부 컨테이너 DOM 노드를 반환하는 Hook */
export const useDialogPortalContainer = () => React.useContext(DialogPortalContainerContext);
