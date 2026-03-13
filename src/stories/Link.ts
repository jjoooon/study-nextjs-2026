const STORYBOOK_BASE_URL = 'http://localhost:6006';

type PageProcessStep = 1 | 2 | 3 | 4 | 5 | 6;

export default function LinkGo(data: string, activeStep?: PageProcessStep): string {
  const stepQuery = activeStep ? `&activeStep=${activeStep}` : '';
  const url = `${STORYBOOK_BASE_URL}/?path=/story/page-proto-${data.toLowerCase()}--default${stepQuery}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
