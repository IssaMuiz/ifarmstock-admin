import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  const pageVisible = 3;

  const startPage = Math.max(currentPage - Math.floor(pageVisible / 2), 2);
  const endPage = Math.min(startPage + pageVisible - 1, totalPages - 1);

  const pages = Array.from(
    {
      length: endPage - startPage + 1,
    },
    (_, i) => startPage + i
  );

  return (
    <div>
      <div className="flex justify-center gap-2 mx-auto mt-5 pb-5">
        <Link href={`${basePath}?page=${currentPage - 1}`}>
          <button
            disabled={currentPage === 1}
            className={`border p-1  ${
              currentPage === 1
                ? " border-gray-300 text-gray-300 "
                : "hover:border-green-600 "
            }`}
          >
            Prev
          </button>
        </Link>
        <Link href={`${basePath}?page=1`}>
          <button
            className={`border p-1  ${
              currentPage === 1
                ? " active bg-green-600 text cursor-pointer "
                : ""
            } border border-gray-300 px-2 py-1 hover:border-green-600`}
          >
            1
          </button>
        </Link>
        {startPage > 2 && <span className="text-gray-500">...</span>}
        {pages.map((page) => (
          <Link key={page} href={`${basePath}?page=${page}`}>
            <button
              className={`${
                page === currentPage
                  ? "active bg-green-600 text cursor-pointer"
                  : ""
              } border border-gray-300 px-2 py-1 hover:border-green-600`}
            >
              {page}
            </button>
          </Link>
        ))}
        {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
        {totalPages > 1 && (
          <Link href={`${basePath}?page=${totalPages}`}>
            <button
              className={`border p-1 ${
                currentPage === totalPages
                  ? " active bg-green-600 text cursor-pointer "
                  : ""
              } border border-gray-300 px-2 py-1 hover:border-green-600`}
            >
              {totalPages}
            </button>
          </Link>
        )}
        <Link href={`${basePath}?page=${currentPage + 1}`}>
          <button
            disabled={currentPage === totalPages}
            className={`border p-1 ${
              currentPage === totalPages
                ? " border-gray-300 text-gray-300 "
                : "hover:border-green-600 cursor-pointer"
            }`}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
