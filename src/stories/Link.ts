const STORYBOOK_BASE_URL = 'http://localhost:6006';

type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;

export function getStoryUrl(data: string, activeStep?: PageProcessStep, popup?: string): string {
  const stepQuery = activeStep ? `&activeStep=${activeStep}` : '';
  const popupQuery = popup === 'Y' ? `&popup=${popup}` : '';
  return `${STORYBOOK_BASE_URL}/?path=/story/${popup === 'Y' ? `popup` : 'page-proto'}-${data.toLowerCase()}--default${stepQuery}${popupQuery}`;
}

/** 사이드바/컨트롤 없이 캔버스만 표시하는 iframe 전용 URL */
export function getStoryIframeUrl(data: string, activeStep?: PageProcessStep, popup?: string): string {
  const stepQuery = activeStep ? `&activeStep=${activeStep}` : '';
  const popupQuery = popup === 'Y' ? `&popup=${popup}` : '';
  return `${STORYBOOK_BASE_URL}/iframe.html?id=${popup === 'Y' ? `popup` : 'page-proto'}-${data.toLowerCase()}--default&viewMode=story${stepQuery}${popupQuery}`;
}

export default function LinkGo(data: string, activeStep?: PageProcessStep, popup?: string): string {
  const url = getStoryUrl(data, activeStep, popup);
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
