interface IProps {
  page: number | string;
  total_page: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, total_page, onPageChange }: IProps) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= total_page) {
      onPageChange(newPage);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm mt-3 md:mt-0">
        <li>
          <button
            onClick={() => handlePageChange(Number(page) - 1)}
            disabled={page === 1}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 rounded-s-lg ${
              page === 1
                ? "text-gray-300 bg-gray-100 cursor-not-allowed dark:text-gray-500 dark:bg-gray-700 dark:cursor-not-allowed"
                : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            }`}
          >
            Previous
          </button>
        </li>
        {[...Array(total_page)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={pageNumber}>
              <button
                onClick={() => handlePageChange(pageNumber)}
                className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                  page === pageNumber
                    ? "text-gray-600 border-gray-300 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 dark:text-gray-200 dark:border-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 dark:hover:text-white"
                    : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={() => handlePageChange(Number(page) + 1)}
            disabled={page === total_page}
            className={`flex items-center justify-center px-3 h-8 leading-tight border rounded-e-lg ${
              page === total_page
                ? "text-gray-300 bg-gray-100 cursor-not-allowed dark:text-gray-500 dark:bg-gray-700 dark:cursor-not-allowed"
                : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
