import CryptoJS from 'crypto-js';
import { secret_key } from './Constants';

export const encryptData = (key, data) => {
  try {
    // Check if data is empty or null
    if (!data) {
      console.error('Empty or null data.');
      return null;
    }

    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secret_key
    ).toString();

    // Check if encryptedData is empty or null
    if (!encryptedData) {
      console.error('Encryption resulted in empty or null data.');
      return null;
    }

    sessionStorage.setItem(key, encryptedData);
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};
