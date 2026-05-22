/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */

/**
 * Dialog / AlertDialog 공유 오버레이 레지스트리
 *
 * Dialog와 AlertDialog(ConfirmDialog 포함) 모두 이 레지스트리에 등록되어
 * 열린 순서 기준으로 최상위 레이어만 딤(overlay)을 표시합니다.
 */

export type OpenDialogMeta = {
  depth: number;
  order: number;
};

// 열린 다이얼로그 추적 (중첩/병렬 모두 등록 순서 기준으로 레이어 계산)
const openDialogs = new Map<string, OpenDialogMeta>(); // id → meta
let openDialogOrder = 0;
const overlayListeners = new Set<() => void>();

export function registerDialog(id: string, depth: number) {
  const existing = openDialogs.get(id);
  openDialogs.set(id, {
    depth,
    order: existing?.order ?? ++openDialogOrder,
  });
  overlayListeners.forEach((fn) => fn());
}

export function unregisterDialog(id: string) {
  openDialogs.delete(id);
  overlayListeners.forEach((fn) => fn());
}

export function getOpenCount() {
  return openDialogs.size;
}

export function getTopOpenDialogId(): string | null {
  let topId: string | null = null;
  let maxOrder = -1;

  openDialogs.forEach((meta, id) => {
    if (meta.order > maxOrder) {
      maxOrder = meta.order;
      topId = id;
    }
  });

  return topId;
}

export function getDialogLayerIndex(id: string | null): number {
  if (!id) return 1;

  const orderedIds = Array.from(openDialogs.entries())
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([dialogId]) => dialogId);

  const index = orderedIds.indexOf(id);
  return index >= 0 ? index + 1 : 1;
}

export function subscribeOverlay(fn: () => void): () => void {
  overlayListeners.add(fn);
  return () => {
    overlayListeners.delete(fn);
  };
}
