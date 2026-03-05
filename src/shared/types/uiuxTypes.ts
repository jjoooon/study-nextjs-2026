/**
 * UI/UX Form Item Size Types
 *
 * @description
 * 폼 아이템의 크기 옵션을 정의하는 타입
 * 'lg' (large)와 'sm' (small) 두 가지 크기 옵션을 제공
 * @usage
 * - 'lg': 기본 크기, 28px
 * - 'sm': 컴팩트한 크기, 24px
 */
export type FormItemSize = 'lg' | 'sm';

/**
 * UI/UX Form Item Width Types
 *
 * @description
 * 폼 아이템의 너비 옵션을 정의하는 타입
 * 다양한 너비 옵션을 제공하여 레이아웃에 유연하게 대응 가능
 * @usage
 * - 'full': 부모 컨테이너의 전체 너비 차지
 * - 'max': 콘텐츠에 맞게 최대 너비 설정
 * - '2xs' ~ '2xl': 미리 정의된 고정 너비 옵션 제공 (40px, 80px, 120px, 160px, 200px, 240px, 280px)
 */
export type FormItemWidth =
  | 'full'
  | 'auto'
  | 'max'
  | 'min'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | `${number}` // 예: "32" -> 32rem
  | `${number}rem` // 예: "32rem"
  | `${number}px`; // 예: "90px"



export type UIUXvariant =
  | 'contained'
  | 'soft'
  | 'outlined'
  | 'ghost'
  | 'none'; 

export type UIUXcolor =
  | 'primary'
  | 'secondary'

  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'link'

  | 'gray'
  | 'gray-light'
  | 'gray-cool'

  | 'blue'
  | 'red'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'black'

  | 'none'; 

export type UIUXsize =
  | 'full'
  | 'auto'
  | 'max'
  | 'min'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | `${number}` // 예: "32" -> 32rem
  | `${number}rem` // 예: "32rem"
  | `${number}px` // 예: "90px"
  | `${number}%`; // 예: "90%"

export type UIUXposition =
  | 't'
  | 'm'
  | 'b'

  | 's'
  | 'c'
  | 'e'

  | 'ss'
  | 'sc'
  | 'se'
  | 'cs'
  | 'cc'
  | 'ce'
  | 'es'
  | 'ec'
  | 'ee'

  | 'ts'
  | 'tc'
  | 'te'
  | 'ms'
  | 'mc'
  | 'me'
  | 'bs'
  | 'bc'
  | 'be'

  | 'st'
  | 'sm'
  | 'se'
  | 'ct'
  | 'cm'
  | 'cb'
  | 'et'
  | 'em'
  | 'eb'

  | 'bws' //justify-between items-start
  | 'bwc' //justify-between items-center
  | 'bwe' //justify-between items-end
  | 'ars' //justify-around items-start
  | 'arc' //justify-around items-center
  | 'are' //justify-around items-end
  | 'evs' //justify-evenly items-start
  | 'evc' //justify-evenly items-center
  | 'eve'; //justify-evenly items-end


