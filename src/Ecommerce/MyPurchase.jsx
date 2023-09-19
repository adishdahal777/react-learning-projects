import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase/FireSdk";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function MyPurchase() {
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(true);
  const fetchPost = async () => {
    await getDocs(collection(db, "products")).then((querySnapshot) => {
      const newData = querySnapshot.docs
        .filter((doc) => doc.data().userid === auth.currentUser.uid)
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

      setList(newData);
      console.log(newData);
      setLoader(false);
    });
  };
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {loader ? (
        <div className="h-[20vh] w-full container grid place-content-center">
          <Icon icon="lucide:loader" width={20} className="ml-3 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {list.map((item, index) => (
            <div
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              key={item.id}
            >
              <a href="#">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  My Purchase {index + 1}
                </h5>
              </a>
              <Link
                to={`/ecommerce/check/${item.id}`}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View Detail
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
