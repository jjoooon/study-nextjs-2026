const STORYBOOK_BASE_URL = 'http://localhost:6006';

type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;

export function getStoryUrl(data: string, activeStep?: PageProcessStep): string {
  const stepQuery = activeStep ? `&activeStep=${activeStep}` : '';
  return `${STORYBOOK_BASE_URL}/?path=/story/page-proto-${data.toLowerCase()}--default${stepQuery}`;
}

/** 사이드바/컨트롤 없이 캔버스만 표시하는 iframe 전용 URL */
export function getStoryIframeUrl(data: string, activeStep?: PageProcessStep): string {
  const stepQuery = activeStep ? `&activeStep=${activeStep}` : '';
  return `${STORYBOOK_BASE_URL}/iframe.html?id=page-proto-${data.toLowerCase()}--default&viewMode=story${stepQuery}`;
}

export default function LinkGo(data: string, activeStep?: PageProcessStep): string {
  const url = getStoryUrl(data, activeStep);
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
