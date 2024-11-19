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
    <div className="flex tablet:gap-4 mobile:gap-2 mx-auto mt-5">
      <div>
        {prevPage && (
          <Link href={`${basePath}?page=${prevPage}`}>
            <button>Prev</button>
          </Link>
        )}

        {pages.map((page) => (
          <Link key={page} href={`${basePath}?page=${page}`}>
            <button>{page}</button>
          </Link>
        ))}

        {nextPage && (
          <Link href={`${basePath}?page=${nextPage}`}>
            <button>Next</button>
          </Link>
        )}
      </div>
    </div>
  );
}
