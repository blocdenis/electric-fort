'use client';

import { URL } from '@/constants';

export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${URL}/jwt/docs`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.status === 200) {
      console.log('Cookies after auth:', document.cookie);
      return true;
    }
    console.log('Cookies after failed auth:', document.cookie);
    return false;
  } catch (error) {
    throw error;
  }
};
