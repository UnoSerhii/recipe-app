import React from "react";

interface SearchProps {
  setSearch: (search: string) => void;
  search: string;
}

const Search = ({ setSearch, search }: SearchProps) => {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search recipes..."
      className="w-full sm:w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Search;
