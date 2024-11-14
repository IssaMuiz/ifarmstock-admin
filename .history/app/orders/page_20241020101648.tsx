import PriceDisplay from "@/components/priceDisplay";
import React from "react";

interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: "pending" | "completed" | "hold" | "canceled";
}
const RecentOrders = () => {
  const orders: Order[] = [
    {
      id: "1",
      customerName: "John Doe",
      date: "02-12-2024",
      total: 23000000,
      status: "canceled",
    },
    {
      id: "2",
      customerName: "Issa Muiz",
      date: "22-11-2024",
      total: 243000000,
      status: "completed",
    },
    {
      id: "3",
      customerName: "Ishola Yussuf",
      date: "05-10-2024",
      total: 8300000,
      status: "hold",
    },
    {
      id: "4",
      customerName: "Samuel Doe",
      date: "27-09-2024",
      total: 876000000,
      status: "completed",
    },
    {
      id: "5",
      customerName: "Sulaiman jamiu",
      date: "09-08-2024",
      total: 542200000,
      status: "pending",
    },
    {
      id: "6",
      customerName: "Kamala Harris",
      date: "17-07-2024",
      total: 45200000,
      status: "canceled",
    },
    {
      id: "7",
      customerName: "Folashade Jumai",
      date: "24-06-2024",
      total: 76800000,
      status: "pending",
    },
    {
      id: "8",
      customerName: "Halimat Shadia",
      date: "25-05-2024",
      total: 24500000,
      status: "hold",
    },
    {
      id: "9",
      customerName: "Jamiu Barakat",
      date: "13-04-2024",
      total: 356400000,
      status: "completed",
    },
    {
      id: "10",
      customerName: "Alif Farizi",
      date: "29-02-2024",
      total: 23000000,
      status: "completed",
    },
  ];

  return (
    <section>
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
                      order.status === "pending" && "bg-blue-300 text-blue-600"
                    } ${
                      order.status === "canceled" && "bg-red-300 text-red-600"
                    } ${
                      order.status === "hold" && "bg-yellow-300 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </div>
                </td>
                <td className="px-3 py-2 ">{order.customerName}</td>
                <td className=" px-3 py-2 mr-4 whitespace-nowrap">
                  {order.date}
                </td>
                <td className="px-3 py-2 ">
                  <PriceDisplay price={order.total} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentOrders;
