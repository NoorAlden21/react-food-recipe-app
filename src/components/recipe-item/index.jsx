import { Link } from "react-router-dom";

export default function RecipeItem({ item }) {
  return (
    <div className="flex flex-col w-80 overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white">
      <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
        <img src={item?.image_url} alt="recipe item" className="block w-full" />
      </div>
      <div>
        <span className="text-sm text-cyan-700 font-medium">
          {item?.publisher}
        </span>
        <h3 className="text-2xl font-bold truncate text-black">
          {item?.title}
        </h3>
        <Link
          to={`/recipe-item/${item.id}`}
          className="inline-block mt-5 bg-black text-sm text-white font-medium uppercase tracking-wider p-3 px-8 rounded-lg shadow-md"
        >
          Recipe Detailes
        </Link>
      </div>
    </div>
  );
}
