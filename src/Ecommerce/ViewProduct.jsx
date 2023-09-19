import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseCart, productDetail } from "../Reducers/CartSlices";
import ToastSuccess from "../Toast/ToastSuccess";
import ToastAlert from "../Toast/ToastAlert";

export default function ViewProduct() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [cartAlert, setCartAlert] = useState(false);
  const [cartNotAlert, setNotAlert] = useState(false);
  const product = useSelector((state) => state.cartSlices.product);
  const dispatch = useDispatch();
  useEffect(() => {
    const list = () => {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => setProducts(json));
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    };
    list();
  }, []);
  const handleCart = (id, image, name, price) => {
    const productExists = product.some((item) => item.id === id);
    if (productExists) {
      setNotAlert(true);
    } else {
      setCartAlert(true);
      dispatch(increaseCart());
      dispatch(
        productDetail({ id: id, image: image, name: name, price: price })
      );
    }

    setTimeout(() => {
      setCartAlert(false);
      setNotAlert(false);
    }, 1000);
  };

  return loader ? (
    <div className="h-[20vh] w-full container grid place-content-center">
      <Icon icon="lucide:loader" width={20} className="ml-3 animate-spin" />
    </div>
  ) : (
    <>
      {cartAlert ? <ToastSuccess success={"Card Added SuccessFully"} /> : null}
      {cartNotAlert ? (
        <ToastAlert error={"Do Not Repeat Same Proucts"} />
      ) : null}
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 ">
              <div>
                <h3 className="text-sm text-gray-700">
                  <div>{product.title}</div>
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900">
                $ {product.price}
              </p>
            </div>
            <div className="mt-4 space-y-2 w-full">
              <button
                className="mb-2 w-full cursor-pointer justify-center flex rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                style={{ backgroundColor: "#1da1f2" }}
                onClick={() =>
                  handleCart(
                    product.id,
                    product.image,
                    product.title,
                    product.price
                  )
                }
              >
                <Icon icon="ion:cart" height={20} className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
