import React from "react";
import PriceDisplay from "./priceDisplay";

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
    <div className="bg-white rounded-sm shadow-md  overflow-x-auto">
      <h1 className="text-xl font-semibold mb-4 p-4">Recent orders</h1>
      <table className="table-auto w-full text-left">
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
              <td className="p-1 ">{order.id}</td>
              <td className="">
                <div
                  className={` p-8 mr-5 rounded-sm ${
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
              <td className="p-1 ">{order.customerName}</td>
              <td className=" p-1 mr-4">{order.date}</td>
              <td className="p-1 ">
                <PriceDisplay price={order.total} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
