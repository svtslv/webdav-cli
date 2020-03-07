export function getRandomString(length: number) {
  return [...Array(Math.ceil(length / 8))].map(() => Math.random().toString(36).slice(-8)).join('').slice(-length);
}