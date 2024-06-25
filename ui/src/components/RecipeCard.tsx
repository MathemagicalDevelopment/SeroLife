import { Recipe as Props } from "../types"
import IngredientTable from "./IngredientTable"

const RecipeCard = ({ name, method, ingredients }: Props) => {
    return (
        <div className="card">
            <div className="row center"><h3>Recipe: {name}</h3></div>
            <div className="row">
                <p>Method:<br /><br />{method}</p>
            </div>
            <IngredientTable data={ingredients} />
        </div>)
}

export default RecipeCard