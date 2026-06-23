/*
 * COPYRIGHT (c) 2026 All rights reserved by HANWHA General Insurance.
 */
import 'react';

// 리액트 type 커스텀
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    // ASTx2
    e2e_type?: number;
  }
}
