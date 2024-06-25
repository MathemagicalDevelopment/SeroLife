import { Ingredient } from "../types"

type Props = {
    data: Ingredient[]
}
const IngredientTable = ({ data }: Props) => {
    return (<>
        <div className="row">
            <h4>Ingredients</h4>
        </div>
        <table style={{ marginBottom: '24px' }}>
            <tr>
                <th>Name</th>
                <th>QTY</th>
                <th>Unit</th>
            </tr>
            <tbody>
                {data && data.map(({ name, qty, unit }: Ingredient) =>
                    <tr key={`${name}-${qty}-${unit}-${Math.random() * 10}`}>
                        <td>{name}</td>
                        <td>{qty}</td>
                        <td>{unit}</td>
                    </tr>
                )}
            </tbody>

        </table>
    </>
    )
}

export default IngredientTable