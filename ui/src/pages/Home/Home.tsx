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
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('name');
  const [userRecipes, setUserRecipes] = useState<Recipe[] | undefined>();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[] | undefined>();
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
    if (!userRecipes) {
      handleStartUp();
    }
  }, [])

  const showCreateRecipe = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsVisible(true);
  }

  const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event, event.target, event.target.value);
    setSearchValue(event.target.value)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = event.target;
    setSearchType(value);
  }

  useEffect(() => {
    if (searchValue && userRecipes && searchValue.length > 0) {
      if (searchType === 'name') {
        setFilteredRecipes(userRecipes.filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase())));
      } else if (searchType === 'ingredient') {
        setFilteredRecipes(userRecipes.filter(({ ingredients }) => {
          let hasMatch: boolean = false;
          ingredients.forEach(({ name }) => {
            if (name.toLowerCase().includes(searchValue.toLowerCase())) {
              hasMatch = true;
            }
          })
          return hasMatch;
        }))
      }
    } else {
      setFilteredRecipes(userRecipes);
    }
  }, [searchValue, searchType, userRecipes])


  return (
    <div>
      <Modal isVisible={isVisible} handleClose={() => setIsVisible(false)}><RecipeForm handleClose={() => { setIsVisible(false); handleStartUp() }} /></Modal>
      <div className="row center">
        <h1>Recipe App</h1>
      </div>
      <div className="row center">
        <form>
          <label>
            Recipe search:
            <input type="search" value={searchValue} onChange={updateSearch} placeholder="Recipe name search" />
          </label>
          <label>
            Search by:
            <select onChange={handleSelectChange} value={searchType}>
              <option value="name">Name</option>
              <option value="ingredient">Ingredient</option>
            </select>          </label>
        </form>
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
        {!loading && filteredRecipes && filteredRecipes.length > 0 ?
          filteredRecipes.map((r: Recipe) => <RecipeCard key={r._id} {...r} />)
          :
          <div className="row center"><span>No recipes to show</span></div>}
      </div>
    </div>
  );
};
