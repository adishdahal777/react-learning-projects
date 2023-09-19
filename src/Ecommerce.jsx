import { Icon } from "@iconify/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

export default function Ecommerce() {

    const count = useSelector((state)=> state.cartSlices.cart);

  return (
    <>
      <div className="w-full flex justify-between">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Link
            to={"/ecommerce/check"}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          >
            <Icon icon="basil:add-outline" className="mr-2" height={20} />
            My Purchase
          </Link>
          <Link
            to={"/ecommerce/view"}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          >
            <Icon icon="solar:eye-broken" className="mr-2" height={20} />
            View Product
          </Link>
        </div>
        <Link
          to={"/ecommerce/view/cart"}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
        >
          <Icon icon="ion:cart" height={20} className="mr-2"/>
          {count}
        </Link>
      </div>
      <div className="py-5">
        <Outlet />
      </div>
    </>
  );
}
