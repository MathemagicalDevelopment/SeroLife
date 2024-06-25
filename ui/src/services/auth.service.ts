import { API_URL, AUTH_ROUTE_BASE } from "../constants"


export const attemptLogin = async (name: string, password: string): Promise<{ token: string } | undefined> => {
    const res = await fetch(`${API_URL}${AUTH_ROUTE_BASE}/login`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password })
        });

    const { success, token }: { success: boolean; token?: string; } = await res.json();

    if (success && token) {
        return { token };
    } else {
        // Error toast handler
        return;
    }
}

export const signUp = async (name: string, password: string, passwordMatch: string): Promise<{ success: boolean } | undefined> => {
    console.log(API_URL, AUTH_ROUTE_BASE)
    const res = await fetch(`${API_URL}${AUTH_ROUTE_BASE}/`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password, passwordMatch })
        });

    const { success }: { success: boolean; token?: string; } = await res.json();

    if (success) {
        return { success };
    } else {
        // Error toast handler
        return;
    }
}