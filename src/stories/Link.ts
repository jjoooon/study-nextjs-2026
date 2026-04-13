const LOCAL_STORYBOOK_BASE_URL = 'http://localhost:6006';
const PROD_STORYBOOK_BASE_URL = 'https://jjoooon.github.io/study-nextjs-2026';

function getStorybookBaseUrl(): string {
  if (typeof window === 'undefined') {
    return LOCAL_STORYBOOK_BASE_URL;
  }

  const { hostname } = window.location;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return LOCAL_STORYBOOK_BASE_URL;
  }

  return PROD_STORYBOOK_BASE_URL;
}

type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;

export function getStoryUrl(data: string, activeStep?: PageProcessStep, popup?: string): string {
  const storybookBaseUrl = getStorybookBaseUrl();
  const stepQuery = activeStep ? `&activeStep=${activeStep}` : '';
  const popupQuery = popup === '팝업' ? `&popup=${popup}` : '';
  return `${storybookBaseUrl}/?path=/story/${popup === '팝업' ? `popup` : 'page'}-${data.toLowerCase()}--default${stepQuery}${popupQuery}`;
}

/** 사이드바/컨트롤 없이 캔버스만 표시하는 iframe 전용 URL */
export function getStoryIframeUrl(data: string, activeStep?: PageProcessStep, popup?: string): string {
  const storybookBaseUrl = getStorybookBaseUrl();
  const stepQuery = activeStep ? `&activeStep=${activeStep}` : '';
  const popupQuery = popup === '팝업' ? `&popup=${popup}` : '';
  return `${storybookBaseUrl}/iframe.html?id=${popup === '팝업' ? `popup` : 'page'}-${data.toLowerCase()}--default&viewMode=story${stepQuery}${popupQuery}`;
}

export default function LinkGo(data: string, activeStep?: PageProcessStep, popup?: string): string {
  const url = getStoryUrl(data, activeStep, popup);
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
