"use client";

import { useSelectedMeals } from "../../contexts/SelectedMealsContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SelectedRecipes() {
  const { selectedMeals } = useSelectedMeals();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const combinedIngredients = selectedMeals.reduce((acc, meal) => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && measure) {
        acc[ingredient] = (acc[ingredient] || "") + (acc[ingredient] ? ", " : "") + measure;
      }
    }
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Link href='/' className="block text-3xl font-bold mb-6 text-white-800">Selected Recipes</Link>
      <button
        onClick={handleGoBack}
        className="bg-gray-500 text-white mb-6 px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer"
      >
        Назад
      </button>
      {selectedMeals.length === 0 ? (
        <p className="text-gray-500 text-lg">No recipes selected yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {selectedMeals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{meal.strMeal}</h2>
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <p className="text-gray-600">
                  <strong>Category:</strong> {meal.strCategory}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Area:</strong> {meal.strArea}
                </p>
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-700">Instructions</h3>
                  <p className="text-gray-600 text-sm">{meal.strInstructions}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Ingredients</h3>
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                      const ingredient = meal[`strIngredient${i}`];
                      const measure = meal[`strMeasure${i}`];
                      return ingredient && measure ? (
                        <li key={i}>
                          {measure} {ingredient}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-2 pt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Combined Ingredients</h2>
            {Object.keys(combinedIngredients).length > 0 ? (
              <ul className="space-y-2">
                {Object.entries(combinedIngredients).map(([ingredient, measure]) => (
                  <li key={ingredient} className="text-gray-700">
                    <strong>{ingredient}:</strong> {measure}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No ingredients to combine yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
