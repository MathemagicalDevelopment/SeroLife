import { TOKEN } from "../constants";

export const getLocalToken = (): string | null => localStorage.getItem(TOKEN);

export const storeLocalToken = (token: string): void => localStorage.setItem(TOKEN, token);

export const clearLocalStorage = (): void => localStorage.clear();