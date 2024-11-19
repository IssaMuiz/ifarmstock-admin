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
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const pages = [];

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }

  return (
    <div>
      <div className="flex justify-center gap-1 mx-auto mt-5 pb-5">
        {prevPage && (
          <Link href={`${basePath}?page=${prevPage}`}>
            <button
              className={`border p-1 
             ${
               currentPage === 1
                 ? " border-gray-300 cursor-not-allowed opacity-50 text-gray-300 "
                 : "hover:border-green-600 "
             }`}
            >
              Prev
            </button>
          </Link>
        )}

        {pages.map((page) => (
          <Link
            className={`${
              page === currentPage
                ? "active bg-green-600 text cursor-pointer"
                : ""
            } border border-gray-300 px-2 py-1 hover:border-green-600`}
            key={page}
            href={`${basePath}?page=${page}`}
          >
            <button>{page}</button>
          </Link>
        ))}

        {nextPage && (
          <Link
            className={`border p-1 ${
              currentPage === totalPages
                ? " border-gray-300 cursor-not-allowed text-gray-300 "
                : "hover:border-green-600 cursor-pointer"
            }`}
            href={`${basePath}?page=${nextPage}`}
          >
            <button>Next</button>
          </Link>
        )}
      </div>
    </div>
  );
}
