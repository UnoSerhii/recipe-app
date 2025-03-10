import { Meal } from "@/types/meal";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  meal: Meal,
  selectedMeals: Meal[];
  handleSelectMeal: (meal: Meal) => void;
}

const ProductCard = ({meal, selectedMeals, handleSelectMeal}: ProductCardProps) => {
  return (
    <div
      className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
    >
      <Link href={`/recipe/${meal.idMeal}`}>
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={200}
          height={200}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{meal.strMeal}</h2>
        <p className="text-gray-600">
          <strong>Category:</strong> {meal.strCategory}
        </p>
        <p className="text-gray-600">
          <strong>Area:</strong> {meal.strArea}
        </p>
      </Link>
      <button
        onClick={() => handleSelectMeal(meal)}
        className={`mt-4 w-full py-2 rounded-lg ${
          selectedMeals.some((m) => m.idMeal === meal.idMeal)
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"
        } transition-colors`}
      >
        {selectedMeals.some((m) => m.idMeal === meal.idMeal) ? "Remove" : "Add"}
      </button>
    </div>
  );
};

export default ProductCard;
