import { BaseError, MissingDetails } from "../constants";
import { AuthorisedRequest, CustomRequest,  RecipeQuery, } from "../types";
import { checkToken } from "../helpers/checkToken";
import { Response, Router } from "express";
import { Recipe } from "../models/recipe.model";

const RecipeRouter = Router();

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
RecipeRouter.get('/user/:id', async (req: CustomRequest, res: Response) => {
    try {
        if (req && req?.params && req?.params.id) {
            const recipes = await findRecipes({ user_id: req.params.id });
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
RecipeRouter.get('/:id', async (req: CustomRequest, res: Response) => {
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
RecipeRouter.get('/search/:ingredient_name', async (req: CustomRequest, res: Response) => {
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
RecipeRouter.post('/', checkToken, async (req: AuthorisedRequest, res: Response) => {
    try {
        if (req && req?.body && req?.userId) {
            const {name,method,ingredients} = req.body.recipe;
            const recipe = await Recipe.create({name,method,ingredients,user_id:req.userId})
            if (recipe) {
                    return res.status(200).json({ success: true, message: 'Recipe stored' })
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

export default RecipeRouter;