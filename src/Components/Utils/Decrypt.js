import CryptoJS from 'crypto-js';
import { secret_key } from './Constants';

export const decryptData = (key) => {
  try {
    const localData = sessionStorage.getItem(key);

    // Check if localData is empty or null
    if (!localData) {
      // console.error('Empty or null data.');
      return null;
    }

    const decryptedBytes = CryptoJS.AES.decrypt(localData, secret_key);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

    // Check if decryptedData is empty or null
    if (!decryptedData) {
      console.error('Decrypted data is empty or null.');
      return null;
    }

    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
};
