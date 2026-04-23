/**
 * MIME Type Constants
 *
 * Based on MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/GUIDES/MIME_types/Common_types
 *
 * This file defines commonly used MIME types as constants for type safety and reusability.
 */

/**
 * Application MIME Types
 */
export const APPLICATION_TYPES = {
  // Documents
  PDF: 'application/pdf',
  MSWORD: 'application/msword',
  WORD_XML: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  EXCEL: 'application/vnd.ms-excel',
  EXCEL_XML: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  POWERPOINT: 'application/vnd.ms-powerpoint',
  POWERPOINT_XML: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

  // Data formats
  JSON: 'application/json',
  JSON_UTF8: 'application/json; charset=utf-8',
  XML: 'application/xml',
  XML_UTF8: 'application/xml; charset=utf-8',
  YAML: 'application/x-yaml',

  // Scripts
  JAVASCRIPT: 'application/javascript',
  TYPESCRIPT: 'application/typescript',
  ECMA_SCRIPT: 'application/ecmascript',

  // Archives
  ZIP: 'application/zip',
  GZIP: 'application/gzip',
  TAR: 'application/x-tar',
  RAR: 'application/vnd.rar',
  SEVEN_Z: 'application/x-7z-compressed',

  // Encoded
  BASE64: 'application/base64',

  // Binary
  OCTET_STREAM: 'application/octet-stream',

  // Forms
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
  FORM_DATA: 'multipart/form-data',

  // Other
  WOFF: 'application/font-woff',
  WOFF2: 'application/font-woff2',
  WWW_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  OGGL: 'application/ogg',
  PKCS12: 'application/x-pkcs12',
  PKCS7: 'application/x-pkcs7-mime',
  RTF: 'application/rtf',
  SQL: 'application/x-sql',
  XHTML: 'application/xhtml+xml',
} as const;

/**
 * Audio MIME Types
 */
export const AUDIO_TYPES = {
  AAC: 'audio/aac',
  MIDI: 'audio/midi',
  MIDI_X: 'audio/x-midi',
  MP3: 'audio/mpeg',
  OPUS: 'audio/opus',
  OGG: 'audio/ogg',
  WAV: 'audio/wav',
  WEBM: 'audio/webm',
  WEBM_OPUS: 'audio/webm;codecs=opus',
} as const;

/**
 * Font MIME Types
 */
export const FONT_TYPES = {
  COLLECTION: 'font/collection',
  OTF: 'font/otf',
  SFNT: 'font/sfnt',
  TTF: 'font/ttf',
  WOFF: 'font/woff',
  WOFF2: 'font/woff2',
} as const;

/**
 * Image MIME Types
 */
export const IMAGE_TYPES = {
  BMP: 'image/bmp',
  GIF: 'image/gif',
  ICO: 'image/vnd.microsoft.icon',
  JPEG: 'image/jpeg',
  JPG: 'image/jpg',
  PNG: 'image/png',
  SVG: 'image/svg+xml',
  SVG_XML: 'image/svg+xml',
  TIFF: 'image/tiff',
  WEBP: 'image/webp',
} as const;

/**
 * Model MIME Types
 */
export const MODEL_TYPES = {
  GLTF_BINARY: 'model/gltf-binary',
  GLTF_JSON: 'model/gltf+json',
  OBJ: 'model/obj',
} as const;

/**
 * Multipart MIME Types
 */
export const MULTIPART_TYPES = {
  ALTERNATIVE: 'multipart/alternative',
  MIXED: 'multipart/mixed',
  RELATED: 'multipart/related',
  FORM_DATA: 'multipart/form-data',
} as const;

/**
 * Text MIME Types
 */
export const TEXT_TYPES = {
  CALENDAR: 'text/calendar',
  CSS: 'text/css',
  CSV: 'text/csv',
  HTML: 'text/html',
  JAVASCRIPT: 'text/javascript',
  PLAIN: 'text/plain',
  PLAIN_UTF8: 'text/plain; charset=utf-8',
  XML: 'text/xml',
  XML_UTF8: 'text/xml; charset=utf-8',
} as const;

/**
 * Video MIME Types
 */
export const VIDEO_TYPES = {
  MP4: 'video/mp4',
  MPEG: 'video/mpeg',
  OGG: 'video/ogg',
  QUICKTIME: 'video/quicktime',
  WEBM: 'video/webm',
  WEBM_VP8: 'video/webm;codecs=vp8',
  WEBM_VP9: 'video/webm;codecs=vp9',
  THREE_GPP: 'video/3gpp',
  THREE_GPP2: 'video/3gpp2',
} as const;

/**
 * All MIME Types combined
 */
export const MIME_TYPES = {
  ...APPLICATION_TYPES,
  ...AUDIO_TYPES,
  ...FONT_TYPES,
  ...IMAGE_TYPES,
  ...MODEL_TYPES,
  ...MULTIPART_TYPES,
  ...TEXT_TYPES,
  ...VIDEO_TYPES,
} as const;

/**
 * MIME Type Union Type
 */
export type MimeType = (typeof MIME_TYPES)[keyof typeof MIME_TYPES];

/**
 * Commonly accepted file types for file uploads
 * Includes: images, documents, archives, text files
 */
export const COMMON_ACCEPTED_FILE_TYPES = [
  // Images
  IMAGE_TYPES.JPEG,
  IMAGE_TYPES.JPG,
  IMAGE_TYPES.PNG,
  IMAGE_TYPES.GIF,
  IMAGE_TYPES.SVG,
  IMAGE_TYPES.WEBP,

  // Documents
  APPLICATION_TYPES.PDF,
  APPLICATION_TYPES.MSWORD,
  APPLICATION_TYPES.WORD_XML,
  APPLICATION_TYPES.EXCEL,
  APPLICATION_TYPES.EXCEL_XML,
  APPLICATION_TYPES.POWERPOINT,
  APPLICATION_TYPES.POWERPOINT_XML,

  // Archives
  APPLICATION_TYPES.ZIP,
  APPLICATION_TYPES.GZIP,
  APPLICATION_TYPES.RAR,
  APPLICATION_TYPES.SEVEN_Z,

  // Text
  TEXT_TYPES.PLAIN,
  TEXT_TYPES.CSV,

  // Data
  APPLICATION_TYPES.JSON,
  APPLICATION_TYPES.XML,
] as const;

/**
 * Image file types only
 */
export const IMAGE_FILE_TYPES = [
  IMAGE_TYPES.JPEG,
  IMAGE_TYPES.JPG,
  IMAGE_TYPES.PNG,
  IMAGE_TYPES.GIF,
  IMAGE_TYPES.SVG,
  IMAGE_TYPES.WEBP,
  IMAGE_TYPES.BMP,
  IMAGE_TYPES.TIFF,
  IMAGE_TYPES.ICO,
] as const;

/**
 * Document file types only
 */
export const DOCUMENT_FILE_TYPES = [
  APPLICATION_TYPES.PDF,
  APPLICATION_TYPES.MSWORD,
  APPLICATION_TYPES.WORD_XML,
  APPLICATION_TYPES.EXCEL,
  APPLICATION_TYPES.EXCEL_XML,
  APPLICATION_TYPES.POWERPOINT,
  APPLICATION_TYPES.POWERPOINT_XML,
  APPLICATION_TYPES.RTF,
] as const;

/**
 * Archive file types only
 */
export const ARCHIVE_FILE_TYPES = [
  APPLICATION_TYPES.ZIP,
  APPLICATION_TYPES.GZIP,
  APPLICATION_TYPES.TAR,
  APPLICATION_TYPES.RAR,
  APPLICATION_TYPES.SEVEN_Z,
] as const;

/**
 * Audio file types only
 */
export const AUDIO_FILE_TYPES = [
  AUDIO_TYPES.MP3,
  AUDIO_TYPES.OGG,
  AUDIO_TYPES.WAV,
  AUDIO_TYPES.WEBM,
  AUDIO_TYPES.AAC,
  AUDIO_TYPES.OPUS,
] as const;

/**
 * Video file types only
 */
export const VIDEO_FILE_TYPES = [
  VIDEO_TYPES.MP4,
  VIDEO_TYPES.MPEG,
  VIDEO_TYPES.OGG,
  VIDEO_TYPES.WEBM,
  VIDEO_TYPES.QUICKTIME,
] as const;

/**
 * File extension to MIME type mapping
 */
export const EXTENSION_TO_MIME_TYPE: Record<string, string> = {
  // Images
  '.jpg': IMAGE_TYPES.JPEG,
  '.jpeg': IMAGE_TYPES.JPEG,
  '.png': IMAGE_TYPES.PNG,
  '.gif': IMAGE_TYPES.GIF,
  '.svg': IMAGE_TYPES.SVG,
  '.webp': IMAGE_TYPES.WEBP,
  '.bmp': IMAGE_TYPES.BMP,
  '.ico': IMAGE_TYPES.ICO,

  // Documents
  '.pdf': APPLICATION_TYPES.PDF,
  '.doc': APPLICATION_TYPES.MSWORD,
  '.docx': APPLICATION_TYPES.WORD_XML,
  '.xls': APPLICATION_TYPES.EXCEL,
  '.xlsx': APPLICATION_TYPES.EXCEL_XML,
  '.ppt': APPLICATION_TYPES.POWERPOINT,
  '.pptx': APPLICATION_TYPES.POWERPOINT_XML,
  '.rtf': APPLICATION_TYPES.RTF,

  // Archives
  '.zip': APPLICATION_TYPES.ZIP,
  '.gz': APPLICATION_TYPES.GZIP,
  '.tar': APPLICATION_TYPES.TAR,
  '.rar': APPLICATION_TYPES.RAR,
  '.7z': APPLICATION_TYPES.SEVEN_Z,

  // Text & Data
  '.txt': TEXT_TYPES.PLAIN,
  '.csv': TEXT_TYPES.CSV,
  '.html': TEXT_TYPES.HTML,
  '.css': TEXT_TYPES.CSS,
  '.json': APPLICATION_TYPES.JSON,
  '.xml': APPLICATION_TYPES.XML,

  // Audio
  '.mp3': AUDIO_TYPES.MP3,
  '.ogg': AUDIO_TYPES.OGG,
  '.wav': AUDIO_TYPES.WAV,
  '.aac': AUDIO_TYPES.AAC,
  '.opus': AUDIO_TYPES.OPUS,

  // Video
  '.mp4': VIDEO_TYPES.MP4,
  '.mpeg': VIDEO_TYPES.MPEG,
  '.webm': VIDEO_TYPES.WEBM,
  '.mov': VIDEO_TYPES.QUICKTIME,

  // Fonts
  '.woff': FONT_TYPES.WOFF,
  '.woff2': FONT_TYPES.WOFF2,
  '.ttf': FONT_TYPES.TTF,
  '.otf': FONT_TYPES.OTF,
};

/**
 * Get MIME type by file extension
 * @param extension - File extension with dot (e.g., '.jpg', '.pdf')
 * @returns MIME type or undefined if not found
 */
export function getMimeTypeByExtension(extension: string): string | undefined {
  return EXTENSION_TO_MIME_TYPE[extension.toLowerCase()];
}

/**
 * Check if a MIME type is an image
 * @param mimeType - MIME type to check
 * @returns true if the MIME type is an image
 */
export function isImageMimeType(mimeType: string): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.values(IMAGE_TYPES).includes(mimeType as any);
}

/**
 * Check if a MIME type is a document
 * @param mimeType - MIME type to check
 * @returns true if the MIME type is a document
 */
export function isDocumentMimeType(mimeType: string): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return DOCUMENT_FILE_TYPES.includes(mimeType as any);
}

/**
 * Check if a MIME type is an archive
 * @param mimeType - MIME type to check
 * @returns true if the MIME type is an archive
 */
export function isArchiveMimeType(mimeType: string): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ARCHIVE_FILE_TYPES.includes(mimeType as any);
}

/**
 * Check if a MIME type is audio
 * @param mimeType - MIME type to check
 * @returns true if the MIME type is audio
 */
export function isAudioMimeType(mimeType: string): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.values(AUDIO_TYPES).includes(mimeType as any);
}

/**
 * Check if a MIME type is video
 * @param mimeType - MIME type to check
 * @returns true if the MIME type is video
 */
export function isVideoMimeType(mimeType: string): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Object.values(VIDEO_TYPES).includes(mimeType as any);
}
