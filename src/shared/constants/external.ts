/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
export const EXTERNAL_TYPE = {
  IFR_SDI: 'ifr_sdi',
  CORE: 'CORE',
  REACT: 'REACT',
  PORTAL: 'PORTAL',
} as const;

// NCRM type
export type OpenWindowType = typeof EXTERNAL_TYPE.PORTAL | typeof EXTERNAL_TYPE.REACT | typeof EXTERNAL_TYPE.CORE;
export type OpenPopupType = typeof EXTERNAL_TYPE.PORTAL | typeof EXTERNAL_TYPE.REACT | typeof EXTERNAL_TYPE.CORE;
export type ChangeTitleType = typeof EXTERNAL_TYPE.CORE | typeof EXTERNAL_TYPE.REACT;
export type MouseEventType = typeof EXTERNAL_TYPE.REACT;
export type ResizePopupType = typeof EXTERNAL_TYPE.REACT;
export type ParentMsgType = typeof EXTERNAL_TYPE.REACT;
export type CloseWindowType = typeof EXTERNAL_TYPE.REACT;
export type PopupOriginType = typeof EXTERNAL_TYPE.REACT;
export type NewWindowType = typeof EXTERNAL_TYPE.REACT;

// HSP(스마트포탈), SFA(영업포탈), LTP(신가입설계)
export const CHNL_TYPE = {
  HSP: 'HSP',
  SFA: 'SFA',
  LTP: 'LTP',
} as const;

export type OriginType = typeof CHNL_TYPE.HSP | typeof CHNL_TYPE.SFA | typeof CHNL_TYPE.LTP;

// 송수신 FLAG(T:송신, R:수신)
export const TR_FLAG = {
  T: 'T',
  F: 'F',
} as const;
