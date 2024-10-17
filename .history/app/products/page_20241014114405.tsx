/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { SetStateAction } from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import PriceDisplay from "@/components/priceDisplay";

interface Product {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async (page: number) => {
      try {
        await axios
          .get<{
            totalPages: SetStateAction<number>;
            products: Product[];
          }>(`/api/products?page=${page}&limit=10`)
          .then((response) => {
            setProducts(response.data.products);

            setTotalPages(response.data.totalPages);
          });
      } catch (error: any) {
        setError("Error fetching products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const visiblePage = 3;

  const startPage = Math.max(currentPage - Math.floor(visiblePage / 2), 1);
  const endPage = Math.min(startPage + visiblePage - 1, totalPages);

  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section className="mt-14 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold">Products</h1>
        <Link
          href="/new-product"
          type="button"
          className="p-2 font-semibold text-base bg-green-500 hover:bg-green-600 rounded-md text-white"
        >
          Add new product
        </Link>
      </div>
      <hr />
      <div className="bg-white rounded-md shadow-md overflow-x-auto mt-8">
        <div className="relative pt-5 mx-10 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 absolute left-3 top-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            className="p-3 pl-10 w-full border border-gray-300 rounded-sm"
            type="text"
            placeholder="Start typing to search for products"
          />
        </div>
        {error && <p className="text-red-500 mb-5">{error}</p>}
        {products && products.length > 0 ? (
          <div>
            <table className="table-auto w-full text-sm font-semibold text-gray-600 text-left">
              <thead>
                <tr className="border-b border-t border-gray-300">
                  <th className=" px-2 py-1">N0.</th>
                  <th className=" px-2 py-1">Product</th>
                  <th className=" px-2 py-1">Descriptions</th>
                  <th className=" px-2 py-1">Category</th>
                  <th className=" px-2 py-1">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id} className="border-b border-gray-300">
                    <td className="px-3 py-2">{index}</td>

                    <td className="px-3 py-2">{product.title}</td>
                    <td className="px-3 py-2">{product.description}</td>
                    <td className="px-3 py-2">{product.category}</td>
                    <td className="px-3 py-2">
                      <PriceDisplay price={product.price} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex tablet:gap-4 mobile:gap-2 mx-auto mt-5">
              <button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                className={`border tablet:p-3 mobile:p-1 tablet:text-base mobile:text-sm  ${
                  currentPage === 1
                    ? " border-gray-300 text-gray-300 "
                    : "hover:border-green-600 "
                }`}
              >
                Prev
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(1)}
                  className={`${
                    page === currentPage
                      ? "active bg-green-600 text cursor-pointer"
                      : ""
                  } border border-gray-300 tablet:px-4 mobile:px-2 tablet:py-1 hover:border-green-600`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                className={`border tablet:p-3 mobile:p-1 tablet:text-base mobile:text-sm ${
                  currentPage === totalPages
                    ? " border-gray-300 text-gray-300 "
                    : "hover:border-green-600 cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p>No products is available</p>
        )}
      </div>
    </section>
  );
};

export default Products;
