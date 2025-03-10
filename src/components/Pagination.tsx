import React, { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ totalPages, page, setPage }: PaginationProps) => {
  const pages = [];
  if (totalPages <= 10) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded ${
            page === i ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
  } else {
    for (let i = 1; i <= 7; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 rounded ${
            page === i ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    pages.push(
      <span key="dots" className="px-2 text-gray-500">
        ...
      </span>
    );
    pages.push(
      <button
        key={totalPages}
        onClick={() => setPage(totalPages)}
        className={`px-3 py-1 rounded ${
          page === totalPages ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {totalPages}
      </button>
    );
  }
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => setPage((p: number) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        ←
      </button>
      {pages}
      <button
        onClick={() => setPage((p: number) => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
