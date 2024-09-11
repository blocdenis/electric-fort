//from uppereCase to lowerCase with first upperCase letter
export const formatedString = (string: string) => {
  const formatedString =
    string.trim().charAt(0).toLocaleUpperCase() +
    string.trim().slice(1).toLocaleLowerCase();
  return formatedString;
};
