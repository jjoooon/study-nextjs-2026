/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  color2?: string;
  color3?: string;
  strokeWidth?: number;
}

// 내부에서 rem 변환 함수
const toRem = (value?: number) => (typeof value === 'number' ? `${value / 10}rem` : undefined);

export const Num1: React.FC<IconProps> = ({ className = '', size = 18, color = '#FFFFFF' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 18 18`}
    fill="none"
    className={className}
  >
    <path
      d="M9.96137 5.58V12.73H8.47137V6.13H7.06137V4.87H9.19137C9.7047 4.87 9.96137 5.10667 9.96137 5.58Z"
      fill={color}
    />
  </svg>
);
export const Num2: React.FC<IconProps> = ({ className = '', size = 18, color = '#FFFFFF' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 18 18`}
    fill="none"
    className={className}
  >
    <path
      d="M7.8498 8.23H9.8898C10.6365 8.23 11.0098 7.97 11.0098 7.45V6.9C11.0098 6.37333 10.6298 6.11 9.8698 6.11H5.7798V4.87H10.0798C10.8665 4.87 11.4598 5.05 11.8598 5.41C12.2798 5.77 12.4898 6.23667 12.4898 6.81V7.54C12.4898 8.10667 12.2798 8.57 11.8598 8.93C11.4598 9.28333 10.8898 9.46 10.1498 9.46H8.1198C7.3798 9.46 7.0098 9.72 7.0098 10.24V11.49H12.5398V12.73H5.5298V10.18C5.5298 9.6 5.73647 9.13 6.1498 8.77C6.5498 8.41 7.11647 8.23 7.8498 8.23Z"
      fill={color}
    />
  </svg>
);
export const Num3: React.FC<IconProps> = ({ className = '', size = 18, color = '#FFFFFF' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 18 18`}
    fill="none"
    className={className}
  >
    <path
      d="M6.0398 9.42V8.19H9.7998C10.5598 8.19 10.9398 7.93 10.9398 7.41V6.89C10.9398 6.37 10.5598 6.11 9.7998 6.11H5.5498V4.87H10.0198C10.7998 4.87 11.3898 5.05 11.7898 5.41C12.2098 5.77 12.4198 6.23667 12.4198 6.81V7.5C12.4198 8.09333 12.2165 8.53 11.8098 8.81C12.2165 9.09667 12.4198 9.53667 12.4198 10.13V10.81C12.4198 11.3767 12.2098 11.84 11.7898 12.2C11.3898 12.5533 10.7965 12.73 10.0098 12.73H5.5498V11.49H9.7998C10.5598 11.49 10.9398 11.23 10.9398 10.71V10.2C10.9398 9.68 10.5598 9.42 9.7998 9.42H6.0398Z"
      fill={color}
    />
  </svg>
);
export const Num4: React.FC<IconProps> = ({ className = '', size = 18, color = '#FFFFFF' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 18 18`}
    fill="none"
    className={className}
  >
    <path
      d="M6.8998 4.87V8.61C6.8998 9.28333 7.2798 9.62 8.0398 9.62H10.3598V4.87H11.8498V9.62H12.9498V10.86H11.8498V12.73H10.3598V10.86H7.7898C7.01647 10.86 6.4298 10.6833 6.0298 10.33C5.62314 9.96333 5.4198 9.5 5.4198 8.94V4.87H6.8998Z"
      fill={color}
    />
  </svg>
);
export const Num5: React.FC<IconProps> = ({ className = '', size = 18, color = '#FFFFFF' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 18 18`}
    fill="none"
    className={className}
  >
    <path
      d="M5.6098 8.98V4.87H11.8698V6.11H7.0898V7.75H10.1898C10.9231 7.75 11.4898 7.93 11.8898 8.29C12.3031 8.65 12.5098 9.11667 12.5098 9.69V10.81C12.5098 11.3767 12.3031 11.84 11.8898 12.2C11.4898 12.5533 10.8965 12.73 10.1098 12.73H5.5698V11.49H9.8898C10.6498 11.49 11.0298 11.2267 11.0298 10.7V9.78C11.0298 9.24667 10.6498 8.98 9.8898 8.98H5.6098Z"
      fill={color}
    />
  </svg>
);
export const Num6: React.FC<IconProps> = ({ className = '', size = 18, color = '#FFFFFF' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 18 18`}
    fill="none"
    className={className}
  >
    <path
      d="M8.1498 11.49H10.0198C10.7331 11.49 11.0898 11.2267 11.0898 10.7V9.78C11.0898 9.24667 10.7331 8.98 10.0198 8.98H6.9898V10.15C6.9898 10.6167 7.0598 10.95 7.1998 11.15C7.3798 11.3767 7.69647 11.49 8.1498 11.49ZM7.9898 12.73C7.17647 12.73 6.55647 12.5167 6.1298 12.09C5.71647 11.6833 5.5098 11.0567 5.5098 10.21V7.41C5.5098 6.55667 5.71647 5.92 6.1298 5.5C6.55647 5.08 7.18314 4.87 8.0098 4.87H11.5198V6.11H8.2098C7.71647 6.11 7.3798 6.22667 7.1998 6.46C7.0598 6.66 6.9898 6.98 6.9898 7.42V7.75H10.2498C10.9831 7.75 11.5498 7.93 11.9498 8.29C12.3631 8.65 12.5698 9.11667 12.5698 9.69V10.81C12.5698 11.3767 12.3631 11.84 11.9498 12.2C11.5498 12.5533 10.9598 12.73 10.1798 12.73H7.9898Z"
      fill={color}
    />
  </svg>
);
