import { Icon } from "@iconify/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleConfirmationModal } from "../Reducers/DisplayManagerSlices";
import { db, auth } from "../Firebase/FireSdk";
import { addDoc, collection } from "firebase/firestore";
import { nullCart, nullProduct } from "../Reducers/CartSlices";
import { useNavigate } from "react-router-dom";

function CheckOutModal() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.cartSlices.product);
  const navigate = useNavigate();
  const handleCheckOut = async () => {
    const docRef = await addDoc(collection(db, "products"), {
      productid: product.map((item) => item.id),
      userid: auth.currentUser.uid,
    });

    dispatch(toogleConfirmationModal(false));
    dispatch(nullProduct());
    dispatch(nullCart());

    navigate("/ecommerce");
    console.log(docRef);
  };
  return (
    <div
      className="z-[500] min-w-screen h-screen animated fadeIn faster bg-gray-300 bg-opacity-40 fixed left-0 top-0 flex justify-center items-center inset-0  outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
      id="modal-id"
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
        <div>
          <div className="text-center p-5 flex-auto justify-center">
            <Icon
              icon="streamline:shopping-cart-3-shopping-cart-checkout"
              className="w-16 h-16 flex items-center text-green-500 mx-auto"
            />
            <h2 className="text-xl font-bold py-4">Are you sure?</h2>
            <p className="text-sm text-gray-500 px-8">
              Do you really want to checkout? Lets Start the process
            </p>
          </div>
          <div className="p-3 mt-2 text-center space-x-4 md:block">
            <button
              onClick={() => dispatch(toogleConfirmationModal(false))}
              className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleCheckOut}
              className="mb-2 md:mb-0 bg-green-500 border border-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutModal;
