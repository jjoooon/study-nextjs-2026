/**
 * MSW 2.x와 Jest 호환성을 위한 Polyfills
 *
 * 이 파일은 MSW가 필요로하는 Fetch API polyfills를 제공합니다.
 * setupFiles로 로드되어 MSW import 전에 실행됩니다.
 */

import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, TransformStream, WritableStream } from 'web-streams-polyfill';

// TextEncoder/TextDecoder polyfill
// @ts-ignore - Type compatibility issue between Node and browser types
global.TextEncoder = TextEncoder;
// @ts-ignore - Type compatibility issue between Node and browser types
global.TextDecoder = TextDecoder as any;

// Streams API polyfill
if (!global.ReadableStream) {
  // @ts-ignore
  global.ReadableStream = ReadableStream;
}
if (!global.TransformStream) {
  // @ts-ignore
  global.TransformStream = TransformStream;
}
if (!global.WritableStream) {
  // @ts-ignore
  global.WritableStream = WritableStream;
}

// Import whatwg-fetch for Fetch API polyfills
require('whatwg-fetch');
