import { API_URL, USER_ROUTE_BASE } from "../constants"


export const getUser = async (userId: string, token: string): Promise<{ user: any } | undefined> => {
    const res = await fetch(`${API_URL}${USER_ROUTE_BASE}/${userId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `bearer ${token}` },
        });

    const { success, user }: { success: boolean; user?: any; } = await res.json();

    if (success && user) {
        return { user };
    } else {
        // Error toast handler
        return;
    }
}