import { fetchCategories } from '@/services/mealService';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

interface CategoriesSelectProps {
  setCategory: (category: string) => void;
}

const CategoriesSelect = ({ setCategory }: CategoriesSelectProps) => {

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });
  return (
    <select
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-1/4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          {data?.categories.map((category) => (
            <option key={category.strCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
  )
}

export default CategoriesSelect