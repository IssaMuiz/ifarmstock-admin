/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { SetStateAction } from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const productPerPage = 10;

  const toggleDropdown = (id: string) => {
    setShowDropdown((prev) => (prev === id ? null : id));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setShowDropdown(null);
    }
  };

  useEffect(() => {
    if (showDropdown !== null) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      await axios
        .get<{
          totalPages: SetStateAction<number>;
          products: Product[];
        }>(`/api/products?page=${page}&limit=${productPerPage}`)
        .then((response) => {
          setProducts(response.data.products);
          console.log(response.data.products);
          setTotalPages(response.data.totalPages);
        });
    } catch (error: any) {
      setError("Error fetching products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleEdit = async (id: string) => {
    router.push(`/products/edit/${id}`);
  };
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      try {
        if (!id) throw new Error("Invalid product ID");
        console.log("Deleting product with ID:", id);
        const res = await axios.delete(`/api/products?id=${id}`);

        if (res.status === 200) {
          setProducts((prev) => prev.filter((product) => product._id !== id));
          router.push("/products");
          fetchProducts(currentPage);
        } else {
          throw new Error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product", error);
      } finally {
        setLoading(false);
      }
    }
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
          href="/product"
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
                {products.map((product, index) => {
                  const startIndex = (currentPage - 1) * productPerPage;
                  const displayIndex = startIndex + index + 1;
                  return (
                    <tr key={product._id} className="border-b border-gray-300">
                      <td className="px-3 py-2">{displayIndex}</td>

                      <td className="px-3 py-2">{product.title}</td>
                      <td className="px-3 py-2">{product.description}</td>
                      <td className="px-3 py-2">{product.category}</td>
                      <td className="px-3 py-2">
                        <PriceDisplay price={product.price} />
                      </td>
                      <td className="px-3 py-2 relative">
                        <svg
                          onClick={() => toggleDropdown(product._id)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 cursor-pointer hover:bg-gray-100 rounded-sm active:border active:border-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                        </svg>

                        {showDropdown === product._id && (
                          <div
                            ref={dropdownRef}
                            className="bg-white shadow-xl top-18 -right-2 mr-5 absolute w-32 md:w-[12rem] text-xl transition-all ease-in-out duration-300 font-semibold rounded-sm z-20"
                          >
                            <ul className="flex flex-col gap-3">
                              <li className="hover:bg-gray-300 hncursor-pointer px-4 py-2 mt-2 transition-all ease-in-out duration font-semibold-300 text-sm text-green-600">
                                Add
                              </li>

                              <li
                                onClick={() => handleEdit(product._id)}
                                className="hover:bg-gray-300 cursor-pointer px-4 py-2 mb-1 transition-all ease-in-out duration-300 border-gray-300 text-sm font-semibold text-blue-600"
                              >
                                Edit
                              </li>
                              <hr />
                              <li
                                onClick={() => handleDelete(product._id)}
                                className="hover:bg-gray-300 cursor-pointer px-4 py-2 mb-2 transition-all ease-in-out duration-300 border-gray-300 text-sm font-semibold text-red-600"
                              >
                                Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center gap-1 mx-auto mt-5 pb-5">
              <button
                disabled={currentPage === 1}
                onClick={handlePrevPage}
                className={`border p-1  ${
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
                  onClick={() => handlePageClick(page)}
                  className={`${
                    page === currentPage
                      ? "active bg-green-600 text cursor-pointer"
                      : ""
                  } border border-gray-300 px-2 py-1 hover:border-green-600`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                className={`border p-1 ${
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
