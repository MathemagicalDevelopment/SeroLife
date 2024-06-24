import { BaseError, MissingDetails } from "../constants";
import { AuthorisedRequest, CustomRequest,  RecipeQuery, } from "../types";
import { checkToken } from "../helpers/checkToken";
import express, { Response } from "express";
import { Recipe } from "../models/recipe.model";

const router = express.Router();

// Base Functions 
async function findRecipes(matchQuery:RecipeQuery) {
    const recipes = await Recipe.find(matchQuery)
    return recipes;
}

async function searchRecipesByIngredient(ingredient_name: string) {
    const recipes = await Recipe.find({ 'ingredients.name': { $elemMatch: { $regex: ingredient_name, $options: 'i' } } })
    return recipes;
}

// GET recipes by user_id
router.get('/user/:id', async (req: CustomRequest, res: Response) => {
    try {
        if (req && req?.params && req?.params.id) {
            const recipes = findRecipes({ user_id: req.params.id });
            if (recipes) {
                return res.status(200).json({ success: true, recipes })
            } else {
                return res.status(500).json({ success: false, message: 'Unable to find recipes by this user' })
            }
        } else {
            return res.status(422).json({ success: false, message: MissingDetails });
        }
    } catch (error) {
        return res.status(500).json(BaseError)
    }
})
// GET recipe by id
router.get('/:id', async (req: CustomRequest, res: Response) => {
    try {
        if (req && req?.params && req?.params.id) {
            const recipes = findRecipes({ _id: req.params.id });
            if (recipes) {
                return res.status(200).json({ success: true, recipes })
            } else {
                return res.status(500).json({ success: false, message: 'Unable to find recipe' })
            }
        } else {
            return res.status(422).json({ success: false, message: MissingDetails });
        }
    } catch (error) {
        return res.status(500).json(BaseError)
    }
})

// Search recipes by ingredient name
router.get('/search/:ingredient_name', async (req: CustomRequest, res: Response) => {
    try {
        if (req && req?.params && req?.params.ingredient_name) {
            const recipes = searchRecipesByIngredient(req.params.ingredient_name);
            if (recipes) {
                return res.status(200).json({ success: true, recipes })
            } else {
                return res.status(500).json({ success: false, message: `Unable to find recipes including ${req.params.ingredient_name}` })
            }
        } else {
            return res.status(422).json({ success: false, message: MissingDetails });
        }
    } catch (error) {
        return res.status(500).json(BaseError)
    }
})

// Create recipe
router.post('/', checkToken, async (req: AuthorisedRequest, res: Response) => {
    try {
        if (req && req?.body && req?.userId) {
            const recipe = new Recipe({ ...req.body, user_id: req.userId });
            if (recipe) {
                const saved = await recipe.save();
                if (saved) {
                    return res.status(200).json({ success: true, message: 'Recipe stored' })
                } else {
                    return res.status(500).json({ success: false, message: 'Unable to save recipe' })
                }
            } else {
                return res.status(422).json({ success: false, message: MissingDetails });
            }
        } else {
            return res.status(422).json({ success: false, message: MissingDetails });
        }
    } catch (error) {
        return res.status(500).json(BaseError)
    }
})

module.exports = router;