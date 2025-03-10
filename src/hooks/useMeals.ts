import { useSelectedMeals } from "@/contexts/SelectedMealsContext";
import { fetchMealsBySearch } from "@/services/mealService";
import { Meal } from "@/types/meal";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
const ITEMS_PER_PAGE = 9;

export const useMeals = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const { selectedMeals, addMeal, removeMeal } = useSelectedMeals();


  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ["meals", debouncedSearch],
    queryFn: () => fetchMealsBySearch(debouncedSearch),
  });

  const meals = data?.meals || [];
  const filteredMeals = category ? meals.filter((meal: Meal) => meal.strCategory === category) : meals;

  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);
  const paginatedMeals = filteredMeals.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSelectMeal = (meal: Meal) => {
    if (selectedMeals.some((m) => m.idMeal === meal.idMeal)) {
      removeMeal(meal.idMeal);
    } else {
      addMeal(meal);
    }
  };

  return {
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
  };
};
