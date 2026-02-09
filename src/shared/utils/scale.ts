let scale = 1;

export function setScale(newScale: number) {
  scale = newScale;
}

export function getScale() {
  return scale;
}

export function scaleChange(px: number) {
  return Math.round(px * scale);
}
