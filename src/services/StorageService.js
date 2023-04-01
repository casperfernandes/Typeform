const localStorage = window?.localStorage || null;

export const getFromLocalStorage = key => {
    const value = localStorage?.getItem(key);
    return value ? JSON.parse(value) : null
};

export const setToLocalStorage = (key, value) => localStorage?.setItem?.(key, JSON.stringify(value)) || null;

export const removeFromLocalStorage = key => localStorage?.removeItem?.(key) || null;

export const clearLocalStorage = () => localStorage?.clear() || null;