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
export const AddIcon: React.FC<IconProps> = ({ className = '', size = 16, color = '#61554F' }) => (
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
export const ArrowSide: React.FC<IconProps> = ({ className = '', size = 10, strokeWidth = '1.6', color = 'white' }) => (
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

export const ArrowNext: React.FC<IconProps> = ({ className = '', size = 24, strokeWidth = '2.1', color = 'white' }) => (
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

export const ArrowIcon: React.FC<IconProps> = ({ className = '', size = 16, color = 'var(--color-icon-primary)' }) => (
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
export const CalendarIcon: React.FC<IconProps> = ({ className = '', size = 16, color = '#61554F' }) => (
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

export const CloseDialog: React.FC<IconProps> = ({ className = '', size = 14, color = '#2C2724' }) => (
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
export const CheckIcon: React.FC<IconProps> = ({ className = '', size = 16, color = 'var(--color-icon-inverse)' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 ${(16 - size) / 2} 16 16`}
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
export const DefenseIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 24 24`}
    fill="none"
    className={className}
  >
    <path
      d="M1.5 13.7554V3.40256C1.5 2.29052 2.46923 1.39498 3.67538 1.39498H5.06462C6.28154 1.39498 7.48769 1.14895 8.59692 0.686417C10.7615 -0.228806 13.2385 -0.228806 15.4031 0.686417C16.5123 1.14895 17.7185 1.39498 18.9354 1.39498H20.3246C21.52 1.39498 22.5 2.29052 22.5 3.40256V13.7554C22.5 20.0832 15.4031 24 12 24C8.59692 24 1.5 20.0832 1.5 13.7554Z"
      fill="#47A985"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6489 6H10.3511V9.85113H6.5V13.1489H10.3511V17H13.6489V13.1489H17.5V9.85113H13.6489V6Z"
      fill="white"
    />
  </svg>
);

export const DownArrow: React.FC<IconProps> = ({ className = '', size = 24 }) => (
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
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// F
export const Favorite: React.FC<IconProps> = ({ className = '', size = 20, color = '#ECECEC' }) => (
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

export const ForwardArrow: React.FC<IconProps> = ({ className = '', size = 24 }) => (
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
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// H
export const HomeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg width={toRem(size)} height={toRem(size)} viewBox={`0 0 24 24`} fill="none" className={className}>
    <path
      d="M3 12L5 10M5 10L12 3L19 10M5 10V20A1 1 0 0 0 6 21H9M19 10L21 12M19 10V20A1 1 0 0 1 18 21H15M9 21V16A1 1 0 0 1 10 15H14A1 1 0 0 1 15 16V21M9 21H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// M
export const MenuIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 24 24`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M5 7H19" stroke="#FF5C2E" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 12H19" stroke="#FF5C2E" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 17H19" stroke="#FF5C2E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const MoneyIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox={`0 0 24 24`}
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip0_907_65749)">
      <path
        d="M9.96579 9.45654L6.10983 1.06397C5.76807 0.328918 6.26585 -0.543457 7.02367 -0.543457H15.9763C16.7341 -0.543457 17.2319 0.328918 16.8902 1.06397L13.0342 9.45654H9.97322H9.96579Z"
        fill="#67A0FF"
      />
      <path
        d="M23 14.7258C23 19.6551 18.8182 23.4565 14.6364 23.4565H8.36364C4.18182 23.4565 0 19.6551 0 14.7258C0 8.34766 5.14744 4.45654 11.4962 4.45654C17.845 4.45654 22.9924 8.34766 22.9924 14.7258H23Z"
        fill="#67A0FF"
      />
      <path
        d="M11.5751 10.4565C11.7854 10.4565 11.9956 10.5209 12.1758 10.6656C12.326 10.7862 12.4612 10.9711 12.5288 11.2284L13.5576 15.1922L14.5638 11.1078C14.6239 10.8505 14.7591 10.6817 14.9318 10.5771C15.1045 10.4726 15.3298 10.4405 15.5626 10.4887C15.8029 10.5369 15.9756 10.6736 16.0732 10.8505C16.1708 11.0274 16.2084 11.2525 16.1483 11.5098L15.6227 13.5199H16.7115C16.9293 13.5199 17.1245 13.6163 17.2672 13.7691C17.4099 13.9219 17.5 14.1309 17.5 14.3641C17.5 14.5972 17.4099 14.8063 17.2672 14.9591C17.1245 15.1118 16.9293 15.2083 16.7115 15.2083H15.1796L14.5413 17.6445C14.4737 17.9098 14.3461 18.0947 14.2034 18.2234C14.0307 18.3761 13.8129 18.4485 13.6026 18.4565C13.3698 18.4565 13.1521 18.3922 12.9718 18.2475C12.8141 18.1189 12.6865 17.9339 12.6114 17.6686L11.5601 13.4877L10.4712 17.6445C10.4036 17.9178 10.2685 18.1028 10.1183 18.2314C9.93054 18.3842 9.70526 18.4485 9.49499 18.4485C9.28473 18.4485 9.05945 18.3842 8.87922 18.2395C8.72904 18.1189 8.59387 17.9339 8.51877 17.6686L7.88048 15.2003H6.28849C6.07071 15.2003 5.87547 15.1038 5.73279 14.951C5.59011 14.7983 5.5 14.5892 5.5 14.356C5.5 14.1229 5.59011 13.9138 5.73279 13.7611C5.87547 13.6083 6.07071 13.5118 6.28849 13.5118H7.44493L6.94931 11.5983C6.87422 11.3329 6.91176 11.0998 7.00188 10.9148C7.0995 10.7219 7.27972 10.5771 7.52002 10.5048C7.76783 10.4405 8.00063 10.4405 8.18836 10.5289C8.36859 10.6093 8.51877 10.7701 8.59387 11.0515L9.57009 15.1922L10.5989 11.2686C10.6665 10.9952 10.8016 10.8023 10.9518 10.6736C11.132 10.5209 11.3573 10.4565 11.5826 10.4565H11.5751Z"
        fill="white"
      />
      <path
        d="M6 4.18382C6 3.78382 6.32738 3.45654 6.72751 3.45654H16.2725C16.6726 3.45654 17 3.78382 17 4.18382V4.72927C17 5.12927 16.6726 5.45654 16.2725 5.45654H6.72751C6.32738 5.45654 6 5.12927 6 4.72927V4.18382Z"
        fill="#3E6EBF"
      />
    </g>
    <defs>
      <clipPath id="clip0_907_65749">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

// P

// R
export const ResetIcon: React.FC<IconProps> = ({ className = '', size = 16, color = '#61554F' }) => (
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
export const SelectArrowIcon: React.FC<IconProps> = ({ className = '', color = '#61554F', size = 16 }) => (
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
  <svg width={toRem(size)} height={toRem(size)} viewBox={`0 0 24 24`} fill="none" className={className}>
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
export const CloseIcon = ({ className = '', size = 16, color = 'var(--color-secondary-90)' }: IconProps) => (
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

export const ArrowLightIcon: React.FC<IconProps> = ({ className = '', size = 15, color = '#FF5C2E' }) => (
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
export const ListIcon: React.FC<IconProps> = ({ className = '', size = 15, color = '#FF5C2E' }) => (
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

export const ZoomOutIcon: React.FC<IconProps> = ({ className = '', size = 20, color = '#FF5C2E' }) => (
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
export const ZoomInIcon: React.FC<IconProps> = ({ className = '', size = 20, color = '#FF5C2E' }) => (
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

export const CheckboxIcon: React.FC<IconProps> = ({ className = '', size = 14, color = 'var(--color-gray-30)' }) => (
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
export const PaperIcon: React.FC<IconProps> = ({ className = '', size = 14, color = 'var(--color-gray-0)' }) => (
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

export const SizeIcon: React.FC<IconProps> = ({ className = '', size = 16, color = 'var(--color-gray-50)' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={toRem(size)}
    height={toRem(size)}
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M1.79187 8.4013C1.54923 8.1888 1.54916 7.81101 1.79187 7.59856L5.7821 4.10703C6.12695 3.80545 6.66687 4.05056 6.66687 4.50872L6.66687 7.26718L9.33353 7.26718V4.50872C9.33354 4.05064 9.87279 3.8057 10.2176 4.10703L14.2079 7.59856C14.4507 7.81105 14.4507 8.18881 14.2079 8.4013L10.2176 11.8928C9.8728 12.1943 9.33353 11.9493 9.33353 11.4911V8.73333H6.66687V11.4911C6.66687 11.9494 6.12695 12.1946 5.7821 11.8928L1.79187 8.4013Z"
      fill={color}
    />
  </svg>
);
export const PlusIcon: React.FC<IconProps> = ({ className = '', size = 14, color = 'var(--color-gray-30)' }) => (
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
