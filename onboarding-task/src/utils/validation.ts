const isNotEmpty = (str: string): boolean =>
  !!str.trim();

const isNotFalsy = (str: string): boolean =>
  !!str;

export const isValidItemText = (str: string): boolean =>
  isNotFalsy(str) && isNotEmpty(str);

