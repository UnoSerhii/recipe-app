"use client";

import { createContext, use, useState, ReactNode, useEffect } from "react";
import { Meal } from "../types/meal";

interface SelectedMealsContextType {
  selectedMeals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (id: string) => void;
}

const SelectedMealsContext = createContext<SelectedMealsContextType | undefined>(undefined);

export function SelectedMealsProvider({ children }: { children: ReactNode }) {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const storedMeals = localStorage.getItem("meals");
    if (storedMeals) {
      setSelectedMeals(JSON.parse(storedMeals));
    }
  }, []);

  const addMeal = (meal: Meal) => {
    setSelectedMeals((prev) => {
      const isMealSelected = prev.some((m) => m.idMeal === meal.idMeal);
      if (isMealSelected) {
        return prev;
      }
      const updatedMeals = [...prev, meal];
      localStorage.setItem("meals", JSON.stringify(updatedMeals));
      return updatedMeals;
    });
  };

  const removeMeal = (id: string) => {
    setSelectedMeals((prev) => {
      const updatedMeals = prev.filter((m) => m.idMeal !== id);
      localStorage.setItem("meals", JSON.stringify(updatedMeals));

      return updatedMeals;
    });
  };

  return (
    <SelectedMealsContext.Provider value={{ selectedMeals, addMeal, removeMeal }}>
      {children}
    </SelectedMealsContext.Provider>
  );
}

export function useSelectedMeals() {
  const context = use(SelectedMealsContext);
  if (!context) {
    throw new Error("useSelectedMeals must be used within a SelectedMealsProvider");
  }
  return context;
}
