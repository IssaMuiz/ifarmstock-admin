"use server";
import PriceDisplay from "@/components/priceDisplay";
import { connectDB } from "@/lib/config/mongodb";
import Products from "@/lib/models/product";
import Link from "next/link";
import ProductDropdown from "@/components/productDropdown";
import Pagination from "@/components/pagination";

type Props = {
  searchParams: {
    page?: string;
  };
};

const ProductsPage = async ({ searchParams }: Props) => {
  await connectDB();

  const itemsPerPage = 10;
  const currentPage = await parseInt(searchParams.page || "1", 10);

  const totalProducts = await Products.countDocuments();

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const products = await Products.find({})
    .skip((currentPage - 1) * itemsPerPage)
    .limit(itemsPerPage)
    .lean();
  return (
    <section className="mt-14 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold">Products</h1>
        <Link
          href="/products/add"
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
                  const startIndex = (currentPage - 1) * itemsPerPage;
                  const displayIndex = startIndex + index + 1;
                  return (
                    <tr key={product.id} className="border-b border-gray-300">
                      <td className="px-3 py-2">{displayIndex}</td>

                      <td className="px-3 py-2">{product.title}</td>
                      <td className="px-3 py-2">{product.description}</td>
                      <td className="px-3 py-2">{product.category}</td>
                      <td className="px-3 py-2">
                        <PriceDisplay price={product.price} />
                      </td>
                      <td className="px-3 py-2 relative">
                        <ProductDropdown product={product.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center gap-1 mx-auto mt-5 pb-5">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                basePath="/products"
              />
            </div>
          </div>
        ) : (
          <p>No products is available</p>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
