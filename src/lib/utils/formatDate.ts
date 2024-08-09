export function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const dd = date.getDate();
  let ddToString = dd.toString();
  if (dd < 10) {
    ddToString = '0' + dd;
  }

  const mm = date.getMonth() + 1;
  let mmToString = mm.toString();

  if (mm < 10) {
    mmToString = '0' + mmToString;
  }

  let yyyy = date.getFullYear();

  return ddToString + '.' + mmToString + '.' + yyyy;
}
