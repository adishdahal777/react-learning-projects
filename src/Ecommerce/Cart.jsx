import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCart, removeProduct } from "../Reducers/CartSlices";
import { toogleConfirmationModal } from "../Reducers/DisplayManagerSlices";

function Cart() {
  let total = 0;
  const product = useSelector((state) => state.cartSlices.product);
  const cart = useSelector((state) => state.cartSlices.cart);
  const dispatch = useDispatch();

  console.log(product);

  const handleDeleteCartItem = (id) => {
    dispatch(decreaseCart());
    dispatch(removeProduct({ id: id }));
  };
  return (
    <>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {product.map((item, index) => {
            total = total + item.price;
            return (
              <div
                key={index}
                className="relative justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <button
                  className="absolute right-5 top-5 p-2 bg-red-500 rounded-md"
                  onClick={() => handleDeleteCartItem(item.id)}
                >
                  <Icon icon="lucide:delete" color="white" />
                </button>
                <img
                  src={item.image}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-20"
                />
                <div className="p-5">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.name}
                    </h2>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">Rs. {item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 md:sticky md:top-16">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Quantity</p>
            <p className="text-gray-700">{cart}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">Rs {total} Nrs</p>
            </div>
          </div>

          <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={() => dispatch(toogleConfirmationModal(true))}
          >
            Check out
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
