import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/FireSdk";
import { collection, getDocs } from "firebase/firestore";
import { Icon } from "@iconify/react";

export default function MyPurchaseDetail() {
  const { purchaseid } = useParams();
  const [loader, setLoader] = useState(true);
  const [product, setProduct] = useState([]);
  useLayoutEffect(() => {
    const fetchPost = async () => {
      await getDocs(collection(db, "products")).then((querySnapshot) => {

        const newData = querySnapshot.docs
          .filter((doc) => doc.id === purchaseid)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

        const updatedProduct = [...product];
        newData[0].productid.map((item) => {
          console.log(item);
          const url = `https://fakestoreapi.com/products/${item}`;
          console.log(url);

          fetch(url)
            .then((res) => res.json())
            .then((json) => {
              updatedProduct.push(json);
              setProduct(updatedProduct);
            });

          console.log(updatedProduct);
        });

        setTimeout(() => {
          setLoader(false);
        }, 2000);
      });
    };
    fetchPost();
  }, []);

  return (
    <>
      {loader ? (
        <div className="h-[20vh] w-full container grid place-content-center">
          <Icon icon="lucide:loader" width={20} className="ml-3 animate-spin" />
        </div>
      ) : (
        <div className="w-full px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg ">
            {product.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <img
                    src={item.image}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-20"
                  />
                  <div className="p-5">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.title}
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
        </div>
      )}
    </>
  );
}
