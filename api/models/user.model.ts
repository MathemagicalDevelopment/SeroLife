import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now },
    user_recipes: [{ type: Schema.ObjectId, ref: 'Recipe' }],
    favourites: [{ type: Schema.ObjectId, ref: 'Recipe' }],
});

export const User = mongoose.model('User', userSchema,'users');