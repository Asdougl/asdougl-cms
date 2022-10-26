import random from 'lodash/random'

export const randomFromArray = <T>(arr: T[]): T => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return arr[random(0, arr.length - 1)]!
}

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const MONTH = DAY * 28
const YEAR = DAY * 365

const roundTowardZero = (n: number) => {
  return n > 0 ? Math.floor(n) : Math.ceil(n)
}

export const timeSince = (date: Date) => {
  const parser = new Intl.RelativeTimeFormat('en')

  const diff = date.getTime() - Date.now()
  const absDiff = Math.abs(diff)

  let unit: Intl.RelativeTimeFormatUnit, value: number
  if (absDiff >= YEAR) {
    unit = 'years'
    value = roundTowardZero(diff / YEAR)
  } else if (absDiff >= MONTH) {
    unit = 'months'
    value = roundTowardZero(diff / MONTH)
  } else if (absDiff >= WEEK) {
    unit = 'weeks'
    value = roundTowardZero(diff / WEEK)
  } else if (absDiff >= DAY) {
    unit = 'days'
    value = roundTowardZero(diff / DAY)
  } else if (absDiff >= HOUR) {
    unit = 'hours'
    value = roundTowardZero(diff / HOUR)
  } else if (absDiff >= MINUTE) {
    unit = 'minutes'
    value = roundTowardZero(diff / MINUTE)
  } else {
    return 'Just now'
  }

  return parser.format(value, unit)
}
