/* eslint-disable react/jsx-key */
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useParams } from "react-router-dom";

export default function Detailes() {
  const { recipeDetailsData, setRecipeDetailsData } = useContext(GlobalContext);
  const { favorites, setFavorites, addToFavoriteHandler } =
    useContext(GlobalContext);

  const { id } = useParams();
  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();

      if (data?.data) {
        console.log(data);
        setRecipeDetailsData(data.data);
      }
    }

    getRecipeDetails();
  }, []);
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.recipe?.publisher}
        </span>
        <h3 className="text-2xl font-bold truncate text-black">
          {recipeDetailsData?.recipe?.title}
        </h3>
        <div>
          <button
            className="p-3 px-6 bg-black text-white text-sm font-medium uppercase tracking-wider cursor-pointer"
            onClick={addToFavoriteHandler}
          >
            {favorites.length > 0 &&
            favorites.findIndex(
              (item) => item.recipe.id === recipeDetailsData?.recipe?.id
            ) !== -1
              ? "Remove from favorites"
              : "add to favorite"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingerdients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData?.recipe?.ingredients.map((ingredient) => {
              return (
                <li>
                  <span className="text-2xl font-semibold text-black">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                  <span className="text-2xl font-semibold text-black">
                    {ingredient.description}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
