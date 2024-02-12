import { IUser } from '../types';

export const removeTrailingSlash = (url: string): string => {
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

export const isArrayOfStrings = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.every((el) => typeof el === 'string');
};

export const isUserDataValid = (userData: Partial<IUser>): boolean => {
  return (
    typeof userData.username === 'string' &&
    typeof userData.age === 'number' &&
    isArrayOfStrings(userData.hobbies)
  );
};
