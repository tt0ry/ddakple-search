/* eslint-disable no-useless-escape */
/**
 * 공통 정규식
 */

/**
 * 숫자 정규식
 */
export const REGEX_NUMBER = /[^0-9]/g;

/**
 * 공백체크 정규식
 */
export const REGEX_SPACE = /\s/g;

/**
 * 특수문자 제거 정규식([, ], -)
 */
export const REGEX_SPECIAL_CHARACTER = /\[|\]|\-/gi;

/**
 * 날짜 변환 정규식
 */
export const REGEX_DATE = /(\d{4})(\d{2})(\d{2})/;
export const DATE_REPLACE_FORMAT = "$1년 $2월 $3일";
