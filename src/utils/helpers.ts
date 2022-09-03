import random from 'lodash/random'

export const randomFromArray = <T>(arr: T[]): T => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return arr[random(0, arr.length - 1)]!
}
