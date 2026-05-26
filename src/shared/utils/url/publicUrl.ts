const getPublicBaseUrl = (): string => {
  const configuredBaseUrl = (process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.PUBLIC_URL ?? '').replace(/\/$/, '');

  if (configuredBaseUrl !== '') {
    return configuredBaseUrl.startsWith('/') ? configuredBaseUrl : `/${configuredBaseUrl}`;
  }

  if (typeof window === 'undefined') {
    return '';
  }

  if (!window.location.hostname.endsWith('github.io')) {
    return '';
  }

  const firstPathSegment = window.location.pathname.split('/').filter(Boolean)[0];
  return firstPathSegment ? `/${firstPathSegment}` : '';
};

export const withPublicUrl = (src: string): string => {
  if (/^https?:\/\//.test(src)) {
    return src;
  }

  const publicBaseUrl = getPublicBaseUrl();
  const normalizedPath = src.startsWith('/') ? src : `/${src}`;

  if (publicBaseUrl !== '' && normalizedPath.startsWith(`${publicBaseUrl}/`)) {
    return normalizedPath;
  }

  return `${publicBaseUrl}${normalizedPath}`;
};
