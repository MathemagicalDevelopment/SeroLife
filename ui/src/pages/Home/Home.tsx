import { useEffect, useState } from "react";
import "./home.css";
import { Recipe } from "../../types";
import { useToken, useUser } from "../../contexts/user.context";
import { getRecipes } from "../../services/recipes.service";
import Spinner from "../../components/Spinner";
import RecipeCard from "../../components/RecipeCard";
import Modal from "../../components/Modal";
import RecipeForm from "../../components/forms/RecipeForm";


export const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userRecipes, setUserRecipes] = useState<Recipe[] | undefined>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const token = useToken();
  const user = useUser();

  const handleStartUp = async () => {
    setLoading(true);
    const response = await getRecipes(token, user._id);
    if (response?.success && response.recipes) {
      setUserRecipes(response.recipes);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleStartUp();
  }, [])

  const showCreateRecipe = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsVisible(true);
  }

  return (
    <div>
      <Modal isVisible={isVisible} handleClose={() => setIsVisible(false)}><RecipeForm handleClose={() => { setIsVisible(false); handleStartUp() }} /></Modal>
      <div className="row center">
        <h1>Recipe App</h1>
      </div>
      <div className="row center">
        <button onClick={showCreateRecipe}>Create Recipe</button>
      </div>
      <div className="list-container">
        {
          loading ?
            <div className="row center">
              <Spinner />
            </div> : <></>
        }
        {!loading && userRecipes && userRecipes.length > 0 ?
          userRecipes.map((r: Recipe) => <RecipeCard key={r._id} {...r} />)
          :
          <div className="row center"><span>No recipes to show</span></div>}
      </div>
    </div>
  );
};
