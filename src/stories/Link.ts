const STORYBOOK_BASE_URL = 'http://localhost:6006';

export default function LinkGo(data: string): string {
  const url = `${STORYBOOK_BASE_URL}/?path=/story/page-proto-${data.toLowerCase()}--default`;
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
