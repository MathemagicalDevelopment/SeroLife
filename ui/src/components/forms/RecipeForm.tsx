import { useState } from 'react'
import Spinner from '../Spinner';
import IngredientTable from '../IngredientTable';
import { Recipe } from '../../types';
import { createRecipe } from '../../services/recipes.service';
import { useToken } from '../../contexts/user.context';
type FormProps = Recipe & {
    ingredientName: string;
    ingredientQty: number;
    ingredientUnit: 'g' | 'ml' | 'item' | ''
}
type Props = {
    handleClose: () => void;
}

const RecipeForm = ({ handleClose }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormProps>({ name: '', method: '', ingredients: [], ingredientName: '', ingredientQty: 1, ingredientUnit: '' });
    const token = useToken();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        const { name, method, ingredients } = formData;
        const recipe = { name, method, ingredients };
        const created = await createRecipe(token, recipe);
        if (created && created.success) {
            handleClose();
        } else {
            setLoading(false);
        }

    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }
    const clearIngredient = () => {
        setFormData(prevState => ({ ...prevState, ingredientName: '', ingredientQty: 1, ingredientUnit: '' }))
    }
    const addIngredient = () => {
        const newFormData = formData;
        newFormData.ingredients.push({ name: formData.ingredientName, qty: formData.ingredientQty, unit: formData.ingredientUnit });
        setFormData(newFormData);
        clearIngredient();
    }

    return (<>
        <form onSubmit={handleSubmit}>
            <div className="row center">
                <label>
                    Name:
                    <input type='text' name='name' minLength={2} required onChange={handleChange} />
                </label>
            </div>
            <div className="row center">
                <label>
                    Method:
                    <textarea name="method" onChange={handleTextAreaChange} required minLength={10} />
                </label>
            </div>
            <IngredientTable data={formData.ingredients} />
            <fieldset>
                <legend>Ingredient Input</legend>
                <label>
                    Ingredient Name:
                    <input type='text' name='ingredientName' minLength={2} onChange={handleChange} value={formData.ingredientName} />
                </label>
                <label>
                    Quantity:
                    <input type='number' name='ingredientQty' min={1} onChange={handleChange} value={formData.ingredientQty} />
                </label>
                <label>
                    Unit:
                    <select name="ingredientUnit" onChange={handleSelectChange} value={formData.ingredientUnit}>
                        <option value="">--Please choose a unit--</option>
                        <option value="g">Grams</option>
                        <option value="ml">Milliliters</option>
                        <option value="items">Items</option>
                    </select>
                </label>
                <button type='button' onClick={addIngredient}>Add Ingredient</button>
            </fieldset>
            <div className="row center">
                {loading ? <Spinner /> : <></>}
            </div>
            <button type='submit'>Create Recipe</button>
        </form>
        <div className="row center">
        </div>
    </>
    )
}

export default RecipeForm;