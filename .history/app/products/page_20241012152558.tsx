import React from "react";

const Products = () => {
  return (
    <section className="mt-24 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold">Products</h1>
        <button
          type="button"
          className="p-3 font-semibold text-lg bg-green-500 hover:bg-green-600 rounded-sm text-white"
        >
          New product
        </button>
      </div>
      <hr />
      <div className="bg-white rounded-sm md:overflow-x-auto mt-8">
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
        <div>
          <table className="table-auto w-full text-sm font-semibold text-gray-600 text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className=" px-2 py-1">N0.</th>
                <th className=" px-2 py-1">Status</th>
                <th className=" px-2 py-1">Customer</th>
                <th className=" px-2 py-1">Date</th>
                <th className=" px-2 py-1">Total</th>
              </tr>
            </thead>
            <tbody className="">
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-300 ">
                  <td className=" px-3 py-2">{order.id}</td>
                  <td className="px-3 py-2">
                    <div
                      className={` p-1 w-max rounded-sm ${
                        order.status === "completed" &&
                        "bg-green-300 text-green-600"
                      } ${
                        order.status === "pending" &&
                        "bg-blue-300 text-blue-600"
                      } ${
                        order.status === "canceled" && "bg-red-300 text-red-600"
                      } ${
                        order.status === "hold" &&
                        "bg-yellow-300 text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </div>
                  </td>
                  <td className="px-3 py-2 ">{order.customerName}</td>
                  <td className=" px-3 py-2 mr-4 whitespace-nowrap">
                    {order.date}
                  </td>
                  <td className="px-3 py-2 ">price</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Products;
