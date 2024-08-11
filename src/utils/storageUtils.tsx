// src/utils/storageUtils.ts

export const setSessionStorageItem = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorageItem = (key: string) => {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

export const removeSessionStorageItem = (key: string) => {
    sessionStorage.removeItem(key);
};
