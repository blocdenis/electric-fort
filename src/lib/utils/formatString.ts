//from uppereCase to lowerCase with first upperCase letter
export const formatedString = (string: string) => {
  const formatedString =
    string.charAt(0).toLocaleUpperCase() + string.slice(1).toLocaleLowerCase();
  return formatedString;
};
