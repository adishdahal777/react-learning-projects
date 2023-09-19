import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Fire base imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/FireSdk";
//End Firebase Imports
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Dashboard";
import Notes from "../Notes";
import AddNotes from "../Notes/AddNotes";
import ViewNotes from "../Notes/ViewNotes";
import Login from "../Auth/Login";
import Ecommerce from "../Ecommerce";
import MyPurchase from "../Ecommerce/MyPurchase";
import ViewProduct from "../Ecommerce/ViewProduct";
import Cart from "../Ecommerce/Cart";
import MyPurchaseDetail from "../Ecommerce/MyPurchaseDetail";

export default function Navigator() {
  const [checkAuth, setCheckAuth] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid", uid);
        setCheckAuth(true);
      } else {
        console.log("user is logged out");
        setCheckAuth(false);
      }
    });
  }, []);
  return (
    <>
      <Router>
        {checkAuth ? (
          <Routes>
            <Route exact path="/" element={<Sidebar />}>
              <Route exact path="/" element={<Dashboard />}></Route>
              <Route exact path="/notes" element={<Notes />}>
                <Route exact path="/notes/add" element={<AddNotes />}></Route>
                <Route exact path="/notes/view" element={<ViewNotes />}></Route>
              </Route>
              <Route exact path="/ecommerce" element={<Ecommerce />}>
                <Route
                  exact
                  path="/ecommerce/check"
                  element={<MyPurchase />}
                ></Route>
                 <Route
                  exact
                  path="/ecommerce/check/:purchaseid"
                  element={<MyPurchaseDetail />}
                ></Route>
                <Route
                  exact
                  path="/ecommerce/view"
                  element={<ViewProduct />}
                ></Route>
                <Route
                  exact
                  path="/ecommerce/view/cart"
                  element={<Cart />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
          </Routes>
        )}
      </Router>
    </>
  );
}
