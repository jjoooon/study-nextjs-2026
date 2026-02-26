import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

// 내부에서 rem 변환 함수
const toRem = (value?: number) => (typeof value === 'number' ? `${value / 10}rem` : undefined);

// A
export const AddIcon: React.FC<IconProps> = ({ className = '', size = 16, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 16 16`}
    fill="none"
    className={className}
  >
    <circle cx="8" cy="8" r="6" fill={color} />
    <path d="M5 8H11" stroke="white" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="round" />
    <path d="M8 5V11" stroke="white" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="round" />
  </svg>
);

export const ArrowSideBg: React.FC<IconProps> = () => (
  <svg width="10" height="64" viewBox="0 0 10 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 0L8.24264 8.24264C9.36786 9.36786 10 10.894 10 12.4853L10 51.5147C10 53.106 9.36786 54.6321 8.24264 55.7574L0 64L0 0Z"
      fill="#61554F"
    />
  </svg>
);
export const ArrowSide: React.FC<IconProps> = ({
  className = '',
  size = 10,
  strokeWidth = '1.6',
  color = 'currentColor',
}) => (
  <svg
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 10 10`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M6.5 1L3 5L6.5 9" stroke={color} strokeWidth={strokeWidth} />
  </svg>
);

export const ArrowNext: React.FC<IconProps> = ({
  className = '',
  size = 24,
  strokeWidth = '2.1',
  color = 'currentColor',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 24 24`}
    fill="none"
    className={className}
  >
    <path
      d="M14.25 6.75L19.5 12L14.25 17.25"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M19.5 12L4.5 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowIcon: React.FC<IconProps> = ({ className = '', size = 16, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 16 16`}
    fill="none"
    className={className}
  >
    <path
      d="M10.1486 2.12325C10.4349 1.83692 10.8987 1.83702 11.1851 2.12325C11.4715 2.40963 11.4715 2.87332 11.1851 3.15971L6.34718 7.99825L11.1851 12.8374C11.4715 13.1238 11.4715 13.5882 11.1851 13.8746C10.8987 14.1605 10.4349 14.1606 10.1486 13.8746L4.79119 8.51713C4.505 8.23077 4.50497 7.76636 4.79119 7.48002L10.1486 2.12325Z"
      fill={color}
    />
  </svg>
);

// B
export const BackArrow: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 24 24`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// C
export const CalendarIcon: React.FC<IconProps> = ({ className = '', size = 16, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 16 16`}
    fill="none"
    className={className}
  >
    <path
      d="M3 3.25H13C13.6904 3.25 14.25 3.80964 14.25 4.5V13C14.25 13.6904 13.6904 14.25 13 14.25H3C2.30964 14.25 1.75 13.6904 1.75 13V4.5C1.75 3.80964 2.30964 3.25 3 3.25Z"
      stroke={color}
      strokeWidth="1.5"
    />
    <path d="M2 7.25H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 1.5L5 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 1.5L11 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 24 24`}
    fill="none"
    className={className}
  >
    <path d="M6 9L12 15L18 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CloseDialog: React.FC<IconProps> = ({ className = '', size = 14, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 14 14`}
    fill="none"
    className={className}
  >
    <path
      d="M12.293 0.292969C12.6835 -0.0975551 13.3165 -0.0975551 13.707 0.292969C14.0976 0.683493 14.0976 1.31651 13.707 1.70703L8.41406 7L13.707 12.293C14.0976 12.6835 14.0976 13.3165 13.707 13.707C13.3165 14.0976 12.6835 14.0976 12.293 13.707L7 8.41406L1.70703 13.707C1.31651 14.0976 0.683493 14.0976 0.292969 13.707C-0.0975552 13.3165 -0.0975554 12.6835 0.292969 12.293L5.58594 7L0.292969 1.70703C-0.0975549 1.31651 -0.0975549 0.683493 0.292969 0.292969C0.683493 -0.0975553 1.31651 -0.097555 1.70703 0.292969L7 5.58594L12.293 0.292969Z"
      fill={color}
    />
  </svg>
);
export const CheckIcon: React.FC<IconProps> = ({ className = '', size = 16, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 16 16`}
    fill="none"
    className={className}
  >
    <path
      d="M11.451 4.84682C11.7196 4.54385 12.1831 4.51594 12.4862 4.78432C12.7893 5.05293 12.8172 5.51638 12.5487 5.81947L7.34884 11.686C7.08334 11.9855 6.6267 12.0168 6.32279 11.7563L3.52266 9.35658C3.21535 9.09298 3.17973 8.63017 3.44324 8.32273C3.70676 8.01533 4.1696 7.97992 4.47709 8.2433L6.72904 10.1736L11.451 4.84682Z"
      fill={color}
    />
  </svg>
);

// D

export const DownArrow: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 24 24`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 5V19M12 19L19 12M12 19L5 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// F
export const Favorite: React.FC<IconProps> = ({ className = '', size = 20, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 20 20`}
    fill="none"
    className={className}
  >
    <path
      d="M17.9785 8.18741C17.9463 8.08918 17.8872 8.00157 17.8077 7.93423C17.7281 7.8669 17.6313 7.82244 17.5278 7.80574L12.7295 7.06484L10.4987 2.80469C10.4508 2.71275 10.3781 2.63559 10.2885 2.58172C10.1989 2.52784 10.0959 2.49933 9.99089 2.49933C9.88589 2.49933 9.78292 2.52784 9.69333 2.58172C9.60373 2.63559 9.53099 2.71275 9.48311 2.80469L7.28082 7.06484L2.48256 7.80574C2.37807 7.8216 2.28011 7.86572 2.19962 7.93316C2.11913 8.0006 2.05927 8.08872 2.02673 8.18769C1.99418 8.28665 1.99023 8.39256 2.01531 8.49361C2.04039 8.59465 2.09352 8.68686 2.16877 8.75993L5.59202 12.1276L4.85602 16.8537C4.84531 16.9537 4.86212 17.0547 4.90469 17.1461C4.94726 17.2376 5.01402 17.3161 5.09799 17.3735C5.18196 17.4308 5.28006 17.4649 5.38202 17.4722C5.48399 17.4795 5.58607 17.4597 5.6776 17.4149L9.99089 15.2652L14.3156 17.4374C14.3943 17.4794 14.4828 17.5007 14.5723 17.4991C14.6932 17.4996 14.8111 17.4622 14.909 17.3925C14.9975 17.3301 15.066 17.2441 15.1064 17.1447C15.1469 17.0452 15.1576 16.9364 15.1372 16.8312L14.3727 12.1332L17.7959 8.76554C17.8793 8.69642 17.9409 8.60523 17.9732 8.50277C18.0056 8.4003 18.0074 8.29087 17.9785 8.18741Z"
      fill={color}
    />
  </svg>
);

export const ForwardArrow: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 24 24`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// H
export const HomeIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={toRem(size)} height={toRem(size)} viewBox={`0 0 24 24`} fill="none" className={className}>
    <path
      d="M3 12L5 10M5 10L12 3L19 10M5 10V20A1 1 0 0 0 6 21H9M19 10L21 12M19 10V20A1 1 0 0 1 18 21H15M9 21V16A1 1 0 0 1 10 15H14A1 1 0 0 1 15 16V21M9 21H15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// M
export const MenuIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 24 24`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M5 7H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M5 17H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// P

// R
export const ResetIcon: React.FC<IconProps> = ({ className = '', size = 16, color = 'currentColor' }) => (
  <svg
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 16 16`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13 8.50909C12.7448 11.0182 10.5934 13 8.01367 13C5.26071 13 3 10.7455 3 8C3 5.25455 5.26071 3 8.01367 3C8.58797 3 9.14403 3.1 9.68186 3.28182C10.0009 3.39091 10.3108 3.53636 10.6026 3.71818"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 6L13 6V1L8 6Z" fill={color} />
  </svg>
);
// S
export const SelectArrowIcon: React.FC<IconProps> = ({ className = '', color = 'currentColor', size = 16 }) => (
  <svg
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 16 16`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width={size} height={size} fill="none" />
    <path
      d="M12.1456 5.33334C12.6058 5.33334 12.8498 5.87676 12.5441 6.22071L8.39889 10.8848C8.18674 11.1235 7.81352 11.1235 7.60137 10.8848L3.45554 6.22071C3.15017 5.87675 3.39456 5.33334 3.85462 5.33334H12.1456Z"
      fill={color}
    />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className = '', size = 16, color = 'currentColor' }) => (
  <svg
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 16 16`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 12L14 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="7.5" cy="7.5" r="5.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 24 24`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
    <path
      d="M19.4 15A1.65 1.65 0 0 0 18.7 13.8L19.4 15ZM20.6 9A1.65 1.65 0 0 0 19.9 10.2L20.6 9ZM17.6 6.9A1.65 1.65 0 0 0 16.4 6.1L17.6 6.9ZM6.4 17.1A1.65 1.65 0 0 0 7.6 17.9L6.4 17.1ZM3.4 9A1.65 1.65 0 0 0 4.1 10.2L3.4 9ZM4.6 15A1.65 1.65 0 0 0 5.3 13.8L4.6 15Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// U
export const UpArrow: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 24 24`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 19V5M12 5L5 12M12 5L19 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg width={toRem(size)} height={toRem(size)} viewBox={`0 0 24 24`} fill="none" className={className}>
    <path
      d="M20 21V19A4 4 0 0 0 16 15H8A4 4 0 0 0 4 19V21M16 7A4 4 0 1 1 8 7A4 4 0 0 1 16 7Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ------------------------
export const CloseIcon = ({ className = '', size = 16, color = 'currentColor' }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M12.8152 2.1485C13.1016 1.86212 13.5652 1.86212 13.8516 2.1485C14.138 2.43489 14.138 2.8986 13.8516 3.18496L9.03653 8.00007L13.8516 12.8152C14.138 13.1016 14.138 13.5653 13.8516 13.8516C13.5653 14.138 13.1016 14.138 12.8152 13.8516L8.00007 9.03653L3.18496 13.8516C2.8986 14.138 2.43489 14.138 2.1485 13.8516C1.86212 13.5652 1.86212 13.1016 2.1485 12.8152L6.96361 8.00007L2.1485 3.18496C1.86212 2.89858 1.86212 2.43489 2.1485 2.1485C2.43489 1.86212 2.89858 1.86212 3.18496 2.1485L8.00007 6.96361L12.8152 2.1485Z"
      fill={color}
    />
  </svg>
);

export const ArrowLightIcon: React.FC<IconProps> = ({ className = '', size = 15, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 15 15"
    fill="none"
    className={className}
  >
    <path
      d="M4.50281 1.99153C4.77124 1.72336 5.20607 1.72336 5.47449 1.99153L10.4971 7.01411C10.7654 7.28261 10.7655 7.71795 10.4971 7.9864L5.47449 13.0084C5.20603 13.2767 4.77126 13.2767 4.50281 13.0084C4.23437 12.7399 4.23446 12.3052 4.50281 12.0367L9.03833 7.50056L4.50281 2.96382C4.23437 2.69538 4.23446 2.26003 4.50281 1.99153Z"
      fill={color}
    />
  </svg>
);
export const ListIcon: React.FC<IconProps> = ({ className = '', size = 15, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 15 15"
    fill="none"
    className={className}
  >
    <path
      d="M12.5623 10.625C12.942 10.625 13.2495 10.9326 13.2495 11.3123C13.2495 11.692 12.942 11.9995 12.5623 11.9995H2.56226C2.18256 11.9995 1.875 11.692 1.875 11.3123C1.875 10.9326 2.18256 10.625 2.56226 10.625H12.5623Z"
      fill={color}
    />
    <path
      d="M12.5623 6.875C12.942 6.875 13.2495 7.18256 13.2495 7.56226C13.2495 7.94195 12.942 8.24951 12.5623 8.24951H2.56226C2.18256 8.24951 1.875 7.94195 1.875 7.56226C1.875 7.18256 2.18256 6.875 2.56226 6.875H12.5623Z"
      fill={color}
    />
    <path
      d="M12.5623 3.125C12.942 3.125 13.2495 3.43256 13.2495 3.81226C13.2495 4.19195 12.942 4.49951 12.5623 4.49951H2.56226C2.18256 4.49951 1.875 4.19195 1.875 3.81226C1.875 3.43256 2.18256 3.125 2.56226 3.125H12.5623Z"
      fill={color}
    />
  </svg>
);

export const ZoomOutIcon: React.FC<IconProps> = ({ className = '', size = 20, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <circle cx="9.99996" cy="9.99996" r="7.66667" fill={color} stroke={color} strokeWidth="1.33333" />
    <path d="M5.83337 10H14.1667" stroke="white" strokeWidth="1.83333" strokeLinecap="round" />
  </svg>
);
export const ZoomInIcon: React.FC<IconProps> = ({ className = '', size = 20, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.99996 1.66666C14.6023 1.66666 18.3333 5.39762 18.3333 9.99999C18.3333 14.6024 14.6023 18.3333 9.99996 18.3333C5.39759 18.3333 1.66663 14.6024 1.66663 9.99999C1.66663 5.39762 5.39759 1.66666 9.99996 1.66666ZM9.99996 4.91698C9.4937 4.91698 9.08362 5.32706 9.08362 5.83332V9.08365H5.83329C5.32703 9.08365 4.91695 9.49373 4.91695 9.99999C4.91695 10.5063 5.32703 10.9163 5.83329 10.9163H9.08362V14.1667C9.08362 14.6729 9.4937 15.083 9.99996 15.083C10.5062 15.083 10.9163 14.6729 10.9163 14.1667V10.9163H14.1666C14.6729 10.9163 15.083 10.5063 15.083 9.99999C15.083 9.49373 14.6729 9.08365 14.1666 9.08365H10.9163V5.83332C10.9163 5.32706 10.5062 4.91698 9.99996 4.91698Z"
      fill={color}
    />
  </svg>
);

export const CheckboxIcon: React.FC<IconProps> = ({ className = '', size = 14, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 14 14"
    fill="none"
    className={className}
  >
    <path
      d="M10.0196 4.24094C10.2546 3.97585 10.6602 3.95143 10.9254 4.18626C11.1906 4.42129 11.215 4.82681 10.9801 5.09202L6.43019 10.2252C6.19788 10.4873 5.79831 10.5147 5.5324 10.2868L3.08229 8.18699C2.81338 7.95634 2.78222 7.55137 3.01279 7.28237C3.24337 7.01339 3.64835 6.98241 3.91741 7.21287L5.88787 8.90191L10.0196 4.24094Z"
      fill={color}
    />
  </svg>
);
export const PaperIcon: React.FC<IconProps> = ({ className = '', size = 14, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 14 14"
    fill="none"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 1.16666C11.1443 1.16666 11.6667 1.689 11.6667 2.33333V11.6667C11.6667 12.311 11.1443 12.8333 10.5 12.8333H3.49999C2.85566 12.8333 2.33333 12.311 2.33333 11.6667V2.33333C2.33333 1.689 2.85566 1.16666 3.49999 1.16666H10.5ZM4.66666 9.27523C4.31228 9.27523 4.02522 9.56228 4.02522 9.91666C4.02522 10.271 4.31228 10.5581 4.66666 10.5581H9.33333C9.68771 10.5581 9.97477 10.271 9.97477 9.91666C9.97477 9.56228 9.68771 9.27523 9.33333 9.27523H4.66666ZM4.66666 6.94189C4.31228 6.94189 4.02522 7.22895 4.02522 7.58333C4.02522 7.93771 4.31228 8.22477 4.66666 8.22477H9.33333C9.68771 8.22477 9.97477 7.93771 9.97477 7.58333C9.97477 7.22895 9.68771 6.94189 9.33333 6.94189H4.66666ZM4.66666 3.44189C4.31228 3.44189 4.02522 3.72895 4.02522 4.08333C4.02522 4.43771 4.31228 4.72477 4.66666 4.72477H6.99999C7.35438 4.72477 7.64143 4.43771 7.64143 4.08333C7.64143 3.72895 7.35438 3.44189 6.99999 3.44189H4.66666Z"
      fill={color}
    />
  </svg>
);

export const SizeIcon: React.FC<IconProps> = ({ className = '', size = 14, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 14 14"
    fill="none"
    className={className}
  >
    <path d="M3.52696 4.15846C3.30666 3.94718 2.94996 3.94718 2.72965 4.15846L0.16543 6.61768C-0.0410776 6.81575 -0.0543242 7.12902 0.126366 7.34151L0.16543 7.38234L2.72965 9.84156C2.94995 10.0528 3.30666 10.0528 3.52696 9.84156C3.74726 9.63028 3.74725 9.28818 3.52696 9.07689L1.92533 7.54085H5C5.31155 7.54085 5.56391 7.29879 5.56393 7.00001C5.56393 6.70121 5.31156 6.45917 5 6.45917H1.92533L3.52696 4.92313C3.74726 4.71185 3.74725 4.36975 3.52696 4.15846Z" fill={color}/>
    <path d="M11.2704 4.15846C11.0501 3.94718 10.6934 3.94718 10.4731 4.15846C10.2528 4.36975 10.2528 4.71185 10.4731 4.92313L12.0747 6.45917H9C8.68844 6.45917 8.43607 6.70121 8.43607 7.00001C8.43609 7.29879 8.68845 7.54085 9 7.54085H12.0747L10.4731 9.07689C10.2528 9.28818 10.2528 9.63028 10.4731 9.84156C10.6934 10.0528 11.0501 10.0528 11.2704 9.84156L13.8346 7.38234L13.8737 7.34151C14.0544 7.12902 14.0411 6.81575 13.8346 6.61768L11.2704 4.15846Z" fill={color}/>
    <path d="M6.99951 2C7.33075 2 7.59989 2.26842 7.6001 2.59961V11.4004C7.59989 11.7316 7.33075 12 6.99951 12C6.66854 11.9997 6.40011 11.7314 6.3999 11.4004V2.59961C6.40011 2.26861 6.66854 2.00032 6.99951 2Z" fill={color}/>
  </svg>
);
export const PlusIcon: React.FC<IconProps> = ({ className = '', size = 14, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 14 14"
    fill="none"
    className={className}
  >
    <path
      d="M6.59995 1.04517C6.93408 1.04517 7.20474 1.31582 7.20474 1.64995V5.99517H11.55C11.8841 5.99517 12.1547 6.26582 12.1547 6.59995C12.1547 6.93408 11.8841 7.20474 11.55 7.20474H7.20474V11.55C7.20474 11.8841 6.93408 12.1547 6.59995 12.1547C6.26582 12.1547 5.99517 11.8841 5.99517 11.55V7.20474H1.64995C1.31582 7.20474 1.04517 6.93408 1.04517 6.59995C1.04517 6.26582 1.31582 5.99517 1.64995 5.99517H5.99517V1.64995C5.99517 1.31582 6.26582 1.04517 6.59995 1.04517Z"
      fill={color}
    />
  </svg>
);
export const InputClearIcon: React.FC<IconProps> = ({ className = '', size = 14, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 14 14"
    fill="none"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.66667 0C10.3486 0 13.3333 2.98477 13.3333 6.66667C13.3333 10.3486 10.3486 13.3333 6.66667 13.3333C2.98477 13.3333 0 10.3486 0 6.66667C0 2.98477 2.98477 0 6.66667 0ZM9.85156 3.48177C9.56518 3.19539 9.10149 3.19541 8.8151 3.48177L6.66667 5.63021L4.51823 3.48177C4.23185 3.19539 3.76816 3.19541 3.48177 3.48177C3.19539 3.76816 3.19539 4.23184 3.48177 4.51823L5.63021 6.66667L3.48177 8.8151C3.19539 9.10149 3.19539 9.56518 3.48177 9.85156C3.76816 10.1379 4.23187 10.1379 4.51823 9.85156L6.66667 7.70312L8.8151 9.85156C9.1015 10.1379 9.56521 10.1379 9.85156 9.85156C10.1379 9.56521 10.1378 9.10149 9.85156 8.8151L7.70312 6.66667L9.85156 4.51823C10.1379 4.23187 10.1378 3.76816 9.85156 3.48177Z"
      fill={color}
    />
  </svg>
);
export const NewPopupIcon: React.FC<IconProps> = ({ className = '', size = 14, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 14 14"
    fill="none"
    className={className}
  >
    <path
      d="M7.00008 1.16724C7.35433 1.16739 7.64152 1.45439 7.64152 1.80868C7.64137 2.16283 7.35424 2.44996 7.00008 2.45011H2.85921C2.63326 2.45029 2.44966 2.63372 2.44963 2.8597V11.2685C2.44978 11.4944 2.63334 11.6779 2.85921 11.6781H11.268C11.494 11.6781 11.6774 11.4945 11.6776 11.2685V7.00057C11.6776 6.64629 11.9648 6.35873 12.319 6.35856C12.6734 6.35856 12.961 6.64619 12.961 7.00057V11.2685C12.9609 12.2032 12.2028 12.9615 11.268 12.9615H2.85921C1.92457 12.9613 1.1669 12.2031 1.16675 11.2685V2.8597C1.16678 1.92495 1.9245 1.16741 2.85921 1.16724H7.00008Z"
      fill={color}
    />
    <path
      d="M12.3196 1.16724C12.6738 1.16737 12.961 1.45438 12.961 1.80868V4.69914C12.9609 5.05331 12.6738 5.34044 12.3196 5.34058C11.9653 5.34058 11.6777 5.05339 11.6776 4.69914V3.35758L6.64233 8.39282C6.39182 8.64308 5.98596 8.64306 5.73543 8.39282C5.48489 8.14228 5.48497 7.73595 5.73543 7.48535L10.7707 2.45011H9.42912C9.07483 2.45011 8.78726 2.16293 8.78711 1.80868C8.78711 1.45429 9.07473 1.16724 9.42912 1.16724H12.3196Z"
      fill={color}
    />
  </svg>
);

export const SettingIcon: React.FC<IconProps> = ({ className = '', size = 15, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 15 15"
    fill="none"
    className={className}
  >
    <path
      d="M7.90234 2.48828L8.03418 3.36816L8.88379 3.63086C9.30987 3.76248 9.70644 3.96081 10.0693 4.21582L10.7559 4.69824L11.5088 4.32715L12.5088 3.83203L12.9209 4.42871L12.1328 5.06641L11.4404 5.62598L11.6465 6.49316C11.7081 6.75225 11.7446 7.0157 11.752 7.28027V7.29004C11.7588 7.48806 11.7457 7.68896 11.7148 7.90039L11.582 8.81348L12.3633 9.30273L13.3467 9.91895L13.0205 10.5459L11.7363 10.0947L10.9707 9.8252L10.3516 10.3506C10.0028 10.6465 9.58539 10.8889 9.11426 11.0693L8.28906 11.3857L8.21094 12.2656L8.09668 13.5469L7.25098 13.5693L7.05176 12.2266L6.9248 11.375L6.10938 11.0967L5.8623 11.002C5.61788 10.8986 5.38087 10.7689 5.1543 10.6162L4.47461 10.1572L3.73926 10.5205L2.41309 11.1738L2.00098 10.5752L3.02637 9.74609L3.72266 9.18359L3.51172 8.31348C3.46078 8.1032 3.42553 7.89879 3.4082 7.69824L3.39648 7.49902C3.39272 7.35724 3.39709 7.22128 3.4082 7.08594L3.47852 6.22949L2.75098 5.77246L1.65332 5.08301L1.98242 4.45215L3.20898 4.88184L4.02051 5.16602L4.64551 4.57715C5.01661 4.22785 5.44996 3.94692 5.94141 3.74609L6.73926 3.4209L6.81445 2.56152L6.91211 1.45215L7.74414 1.43066L7.90234 2.48828ZM7.5 3.94238C5.53544 3.94238 3.94238 5.53544 3.94238 7.5C3.94238 9.46456 5.53545 11.0576 7.5 11.0576C9.46456 11.0576 11.0576 9.46456 11.0576 7.5C11.0576 5.53544 9.46456 3.94238 7.5 3.94238Z"
      stroke={color}
      strokeWidth="2.82857"
    />
  </svg>
);
export const MemoIcon: React.FC<IconProps> = ({ className = '', size = 14, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 14 14"
    fill="none"
    className={className}
  >
    <path d="M11.375 1.75H2.625C2.39294 1.75 2.17038 1.84219 2.00628 2.00628C1.84219 2.17038 1.75 2.39294 1.75 2.625V11.375C1.75 11.6071 1.84219 11.8296 2.00628 11.9937C2.17038 12.1578 2.39294 12.25 2.625 12.25H8.56898C8.68393 12.2504 8.79781 12.2279 8.90399 12.1839C9.01017 12.1398 9.10654 12.0751 9.1875 11.9935L11.9935 9.1875C12.0751 9.10654 12.1398 9.01017 12.1839 8.90399C12.2279 8.79781 12.2504 8.68393 12.25 8.56898V2.625C12.25 2.39294 12.1578 2.17038 11.9937 2.00628C11.8296 1.84219 11.6071 1.75 11.375 1.75ZM8.75 11.194V8.75H11.194L8.75 11.194Z" fill={color}/>
  </svg>
);
export const ExMarkIcon: React.FC<IconProps> = ({ className = '', size = 14, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 14 14"
    fill="none"
    className={className}
  >
    <path d="M8.09375 10.9375C8.09375 11.1538 8.0296 11.3653 7.90942 11.5452C7.78924 11.725 7.61842 11.8652 7.41856 11.948C7.2187 12.0308 6.99879 12.0524 6.78662 12.0102C6.57445 11.968 6.37957 11.8639 6.2266 11.7109C6.07364 11.5579 5.96947 11.363 5.92727 11.1509C5.88506 10.9387 5.90672 10.7188 5.98951 10.5189C6.07229 10.3191 6.21248 10.1483 6.39235 10.0281C6.57221 9.9079 6.78368 9.84375 7 9.84375C7.29008 9.84375 7.56828 9.95898 7.7734 10.1641C7.97852 10.3692 8.09375 10.6474 8.09375 10.9375ZM7 8.75C7.17405 8.75 7.34097 8.68086 7.46404 8.55779C7.58711 8.43472 7.65625 8.2678 7.65625 8.09375V2.625C7.65625 2.45095 7.58711 2.28403 7.46404 2.16096C7.34097 2.03789 7.17405 1.96875 7 1.96875C6.82595 1.96875 6.65903 2.03789 6.53596 2.16096C6.41289 2.28403 6.34375 2.45095 6.34375 2.625V8.09375C6.34375 8.2678 6.41289 8.43472 6.53596 8.55779C6.65903 8.68086 6.82595 8.75 7 8.75Z" fill={color}/>
  </svg>
);

export const SpinnerAIcon: React.FC<IconProps> = ({ className = '', size = 18, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <path d="M9 1.6875V3.5625M9 13.5V16.5M4.3125 9H1.6875M15.9375 9H14.8125M13.8428 13.8428L13.3125 13.3125M13.9982 4.06184L12.9375 5.1225M3.69118 14.3088L5.8125 12.1875M3.84651 3.90651L5.4375 5.4975" stroke={color} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);
