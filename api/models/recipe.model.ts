import mongoose from 'mongoose';

const { Schema } = mongoose;

const ingredientSchema = new Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    unit: { type: String, required: true }
})

const recipeSchema = new Schema({
    user_id: { type: Schema.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now },
    ingredients: [ingredientSchema],
    method: { type: String, required: true }
})

export const Recipe = mongoose.model('Recipe', recipeSchema,'recipes')