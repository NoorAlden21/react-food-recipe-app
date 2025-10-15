import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import RecipeItem from "../../components/recipe-item";

export default function Favorites() {
  const { favorites, setFavorites } = useContext(GlobalContext);
  return (
    <div className="container flex flex-wrap gap-5">
      {favorites.length < 1 ? (
        <p className="text-2xl font-extrabold text-center mx-auto mt-8">
          there is no favorite recipes yet.
        </p>
      ) : (
        ""
      )}
      {favorites.map((favorite) => {
        return <RecipeItem key={favorite.recipe.id} item={favorite.recipe} />;
      })}
    </div>
  );
}
