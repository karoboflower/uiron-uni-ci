/*
 * @Author: kingford
 * @Date: 2022-08-22 12:00:28
 * @LastEditTime: 2025-02-22 16:02:42
 */
import dayjs from 'dayjs';

export const FORMAT_TO_DAY = 'YYYY-MM-DD';
export const FORMAT_TO_MINUTE = 'YYYY-MM-DD HH:mm';
export const FORMAT_TO_SECOND = 'YYYY-MM-DD HH:mm:ss';
export const FORMAT_TO_DAY_DOT = 'YYYY.MM.DD';
// 时间戳转换时间
export function unix(timestamp, fmt = FORMAT_TO_SECOND) {
  return dayjs.unix(Number(timestamp)).format(fmt);
}

// 格式化
export function format(date?: dayjs.ConfigType, fmt = FORMAT_TO_SECOND) {
  if (!date) {
    return date;
  }
  return dayjs(date).format(fmt);
}

/**
 * @description 计算两个时间相差多少
 * @export
 * @param {dayjs.ConfigType} start
 * @param {dayjs.ConfigType} end
 * @param {dayjs.UnitType} [unit]
 * @return {*}
 */
export function diff(start: dayjs.ConfigType, end: dayjs.ConfigType, unit: dayjs.UnitType = 'minute') {
  return dayjs(end).diff(dayjs(start), unit);
}

/**
 * @description 转换类型
 * @export
 * @param {dayjs.ConfigType} [date]
 * @return {*}
 */
export function toISOString(date?: dayjs.ConfigType) {
  return dayjs(date).toISOString();
}

/**
 * @description 获取任意一天的起始和结束时间，0点和23:59:59这两个时间
 * @export
 * @param {dayjs.ConfigType} [start]
 * @param {dayjs.ConfigType} [end]
 * @return {*}
 */
export function withinDay(start?: dayjs.ConfigType, end?: dayjs.ConfigType) {
  const s = dayjs(start).startOf('day').format();
  const e = dayjs(end).endOf('day').format();
  return [s, e];
}

/**
 * @description 相差一天
 * @export
 * @param {dayjs.ConfigType} [end]
 * @param {dayjs.ManipulateType} [unit]
 * @return {*}
 */
export function diffOne(end?: dayjs.ConfigType, unit: dayjs.ManipulateType = 'days') {
  const y = dayjs(end).subtract(1, unit).format();
  const e = dayjs(end).format();
  return [y, e];
}
/**
 * @description 获取今天的日期
 * @export
 * @param {string} [fmt]
 * @return {string}
 */
export function getToday(fmt: string = FORMAT_TO_DAY): string {
  return dayjs().format(fmt);
}
/**
 * @description 获取第几年的第几天
 * @export
 * @param {string} [fmt]
 * @return {string}
 */
export function getNextYearToday(num: number, dayNum: number, fmt: string = FORMAT_TO_DAY): string {
  return dayjs().add(num, 'year').subtract(dayNum, 'day').format(fmt);
}
