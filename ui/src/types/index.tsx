export type Ingredient = {
    name: string;
    qty: number;
    unit: string;
}
export type Recipe = {
    _id?: string;
    name: string;
    method: string;
    ingredients: Ingredient[]
}