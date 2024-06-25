import { API_URL, RECIPE_ROUTE_BASE } from "../constants";
import { Recipe } from "../types";

export const getRecipes = async (token: string, userId: string): Promise<{ success: boolean; recipes: Recipe[] } | undefined> => {
    const res = await fetch(`${API_URL}${RECIPE_ROUTE_BASE}/user/${userId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `bearer ${token}` },
        });

    const { success, recipes }: { success: boolean; recipes?: Recipe[]; } = await res.json();

    if (success && recipes) {
        return { success, recipes };
    } else {
        // Error toast handler
        return;
    }
}

export const createRecipe = async (token: string, recipe: Recipe): Promise<{ success: boolean; } | undefined> => {
    const res = await fetch(`${API_URL}${RECIPE_ROUTE_BASE}/`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `bearer ${token}` },
            body: JSON.stringify({ recipe })
        });

    const { success }: { success: boolean; } = await res.json();

    if (success) {
        return { success };
    } else {
        // Error toast handler
        return;
    }
}