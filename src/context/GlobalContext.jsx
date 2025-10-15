import { createContext, use, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalProvider({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipeList, setRecipeList] = useState("");
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();
  async function submitHandler(event) {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );

      const data = await res.json();

      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setIsLoading(false);
        setSearchParam("");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setSearchParam("");
    }
  }

  function addToFavoriteHandler() {
    const newFavorites = [...favorites];
    const idx = newFavorites.findIndex(
      (item) => item.recipe.id === recipeDetailsData.recipe.id
    );
    if (idx >= 0) {
      newFavorites.splice(idx);
    } else {
      newFavorites.push(recipeDetailsData);
    }
    setFavorites([...newFavorites]);
  }
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        isLoading,
        recipeList,
        submitHandler,
        setRecipeDetailsData,
        recipeDetailsData,
        setFavorites,
        favorites,
        addToFavoriteHandler,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
