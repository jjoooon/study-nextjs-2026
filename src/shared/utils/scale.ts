export const SCALE_CHANGE_EVENT = 'app:scale-change';

let scale = 1;

export function setScale(newScale: number) {
  scale = newScale;

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(SCALE_CHANGE_EVENT, {
        detail: { scale: newScale },
      })
    );
  }
}

export function getScale() {
  return scale;
}

export function scaleChange(px: number) {
  return Math.round(px * scale);
}
