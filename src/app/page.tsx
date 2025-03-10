"use client";

import { Meal } from "../types/meal";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import CategoriesSelect from "@/components/CategoriesSelect";
import ProductCard from "@/components/ProductCard";
import { useMeals } from "@/hooks/useMeals";

export default function AllRecipes() {
  const {
    search,
    setSearch,
    setCategory,
    selectedMeals,
    paginatedMeals,
    totalPages,
    page,
    setPage,
    isLoading,
    handleSelectMeal,
  } = useMeals();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white-800 mb-6">Recipe Explorer</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Search setSearch={setSearch} search={search} />
        <CategoriesSelect setCategory={setCategory} />
        <Link
          href="/selected"
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
        >
          Selected Recipes ({selectedMeals.length})
        </Link>
      </div>

      {isLoading ? (
        <p className="text-gray-500 text-lg text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedMeals.map((meal: Meal) => (
            <ProductCard
              meal={meal}
              selectedMeals={selectedMeals}
              handleSelectMeal={handleSelectMeal}
              key={meal.idMeal}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && <Pagination totalPages={totalPages} page={page} setPage={setPage} />}
    </div>
  );
}
