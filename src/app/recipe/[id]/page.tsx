"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMealById } from "../../../services/mealService";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import Link from "next/link";

const RecipePage = () => {
  const router = useRouter();
  const { id } = useParams();
  console.log(id);
  const { data, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: () => fetchMealById(id as string),
  });

  const handleGoBack = () => {
    router.back();
  };

  const meal = data?.meals?.[0];

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (!meal) return <div className="text-center text-xl">Recipe not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="block text-3xl font-bold mb-6 text-white-800">
        Selected Recipes
      </Link>
      <button
        onClick={handleGoBack}
        className="bg-gray-500 text-white mb-6 px-4 py-2 mb-6 rounded-lg hover:bg-gray-600 cursor-pointer"
      >
        Назад
      </button>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">{meal.strMeal}</h1>
        <div className="flex justify-center mb-6">
          <Image src={meal.strMealThumb} alt={meal.strMeal} width={300} height={300} className="rounded-lg" />
        </div>
        <div className="text-center text-gray-600 mb-4">
          <p className="font-medium">
            Category: <span className="font-normal">{meal.strCategory}</span>
          </p>
          <p className="font-medium">
            Area: <span className="font-normal">{meal.strArea}</span>
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Instructions:</h3>
          <p className="text-gray-700 mt-2">{meal.strInstructions}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">Ingredients:</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
              const ingredient = meal[`strIngredient${i}`];
              const measure = meal[`strMeasure${i}`];
              return ingredient ? (
                <li key={i} className="ml-4">
                  <span className="font-medium">{measure}</span> {ingredient}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
