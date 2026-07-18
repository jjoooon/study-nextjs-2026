/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
const LOCAL_STORYBOOK_BASE_URL = 'http://localhost:6006';
const PROD_STORYBOOK_BASE_URL = 'https://jjoooon.github.io/study-nextjs-2026';
const HYGITEST_STORYBOOK_BASE_URL = 'https://story-dev.hwgitest.com';
const HYGITEST_STORYBOOK_BASE_URL2 = 'https://story.hwgitest.com';

const LOCAL_HOST_NAMES = new Set(['localhost', '127.0.0.1']);
const HYGITEST_HOST_NAMES = new Set(['story-dev.hwgitest.com']);
const HYGITEST_HOST_NAMES2 = new Set(['story.hwgitest.com']);

function getStorybookBaseUrl(): string {
  if (typeof window === 'undefined') return LOCAL_STORYBOOK_BASE_URL;
  const { hostname } = window.location;

  if (LOCAL_HOST_NAMES.has(hostname)) {
    return LOCAL_STORYBOOK_BASE_URL;
  }

  if (HYGITEST_HOST_NAMES.has(hostname)) {
    return HYGITEST_STORYBOOK_BASE_URL;
  }

  if (HYGITEST_HOST_NAMES2.has(hostname) || hostname.endsWith('.hwgitest.com')) {
    return HYGITEST_STORYBOOK_BASE_URL2;
  }

  return PROD_STORYBOOK_BASE_URL;
}

/**
 * path: 'ispl/isplBsnsSupt', id: 'LTPA010' => app-ispl-isplbsnssupt-ltpa010--default
 */
export function getStoryUrl(id: string, path: string, activeStep?: number, subId?: string): string {
  const storybookBaseUrl = getStorybookBaseUrl();
  let finalPath = path;
  if (/^LTPA350/i.test(id)) {
    finalPath = 'ispl';
  }
  const storyPath = 'app-' + finalPath.replace(/\//g, '-').toLowerCase() + '-' + id.toLowerCase();
  const stepQuery = activeStep ? `&activeStep=${activeStep}` : '';
  const subIdQuery = subId && subId.includes('sub_') ? `&step=${encodeURIComponent(subId)}` : '';
  return `${storybookBaseUrl}/?path=/story/${storyPath}--default${stepQuery}${subIdQuery}`;
}

/**
 * 사이드바/컨트롤 없이 캔버스만 표시하는 iframe 전용 URL
 */
export function getStoryIframeUrl(id: string, path: string, activeStep?: number, subId?: string): string {
  const storybookBaseUrl = getStorybookBaseUrl();
  let finalPath = path;
  if (/^LTPA350/i.test(id)) {
    finalPath = 'ispl';
  }
  const storyPath = 'app-' + finalPath.replace(/\//g, '-').toLowerCase() + '-' + id.toLowerCase();
  const stepQuery = activeStep ? `&activeStep=${activeStep}` : '';
  const subIdQuery = subId && subId.includes('sub_') ? `&step=${encodeURIComponent(subId)}` : '';
  return `${storybookBaseUrl}/iframe.html?id=${storyPath}--default&viewMode=story${stepQuery}${subIdQuery}`;
}

export function linkGo(id: string, path: string, activeStep?: number, subId?: string): string {
  const url = getStoryUrl(id, path, activeStep, subId);
  window.open(url, '_blank', 'noopener,noreferrer');
  return url;
}
