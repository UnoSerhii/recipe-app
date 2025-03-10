import axios from "axios";
import { MealsResponse } from "../types/meal";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchMealsBySearch = async (query: string): Promise<MealsResponse> => {
  const response = await axios.get(`${API_URL}/search.php?s=${query}`);
  return response.data;
};

export const fetchMealById = async (id: string): Promise<MealsResponse> => {
  const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
  return response.data;
};

export const fetchCategories = async (): Promise<{ categories: { strCategory: string }[] }> => {
  const response = await axios.get(`${API_URL}/categories.php`);
  return response.data;
};