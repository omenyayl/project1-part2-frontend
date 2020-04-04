export function getReadableDate(date: Date): string {
  if (date === null) {
    return '';
  }
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
}
