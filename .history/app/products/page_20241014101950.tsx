/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await axios
          .get<{ products: Product[] }>("/api/products")
          .then((response) => {
            setProducts(response.data.products);
          });
      } catch (error: any) {
        setError("Error fetching products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

      <div className="bg-white rounded-md shadow-md overflow-x-auto mt-8">
        <hr />
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
        <hr />
        {error && <p className="text-red-500 mb-5">{error}</p>}
        {products && products.length > 0 ? (
          <div>
            <table className="table-auto w-full text-sm font-semibold text-gray-600 text-left">
              <thead>
                <tr className="border-b border-gray-300">
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
          </div>
        ) : (
          <p>No products is available</p>
        )}
      </div>
    </section>
  );
};

export default Products;
