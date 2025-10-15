import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import RecipeItem from "../../components/recipe-item";

export default function Home() {
  const { isLoading, recipeList } = useContext(GlobalContext);
  if (isLoading) {
    return <div>Loading... please wait.</div>;
  }
  return (
    <div className="container py-8 mx-auto flex flex-wrap justify-center items-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem item={item} key={item.id} />)
      ) : (
        <p className="text-2xl font-extrabold text-center">
          nothing to show please search something else
        </p>
      )}
    </div>
  );
}
