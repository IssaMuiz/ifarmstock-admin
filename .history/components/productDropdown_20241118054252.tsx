import React from "react";
import { useState, useEffect, useRef } from "react";

const ProductDropdown = ({ product }: string) => {
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div>
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
    </div>
  );
};

export default ProductDropdown;
