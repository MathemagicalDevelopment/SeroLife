import { Request } from "express";
import { Types } from "mongoose";
type ObjectId = Types.ObjectId;
export type ErrorResponse = {
    success: false;
    message: String;
}

export type SuccessResponse = {
    success: true;
    message?: string;
}

export type Unit = 'ml' | 'g' | 'items';

export type IngredientObject = {
    name: string;
    qty: number;
    unit: Unit;
}
export interface UserObject {
    _id?: ObjectId;
    name: string;
    created: Date;
    recipes?: ObjectId[];
    favourites?: ObjectId[];
    password?: string;
}

export interface UserUpdateObject {
    recipes?: ObjectId[];
    favourites?: ObjectId[];
}

export interface RecipeObject {
    _id: ObjectId;
    name: string;
    chef_id: ObjectId;
    created: Date;
    ingredients: [IngredientObject];
    method: string;
}

export type UserQuery = {
    _id?: ObjectId;
    name?: string;
}
type Params = { params?: { id?: ObjectId; ingredient_name?: string; } }

export type CustomRequest = Request & Params
export type AuthorisedRequest = CustomRequest & { userId?: ObjectId; token?: string; }
