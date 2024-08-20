export function formatDate(inputDate: string) {
  return inputDate.slice(0, 11).split('-').join('.');
}
