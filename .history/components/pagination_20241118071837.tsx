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
      <div className="flex justify-center gap-2 mx-auto mt-5 pb-5">
        <Link href={`${basePath}?page=${prevPage}`}>
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

        <Link href={`${basePath}?page=${nextPage}`}>
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
