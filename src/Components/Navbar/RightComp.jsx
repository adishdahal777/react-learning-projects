import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import {  signOut } from "firebase/auth";
import {auth} from '../../Firebase/FireSdk';


export default function RightComp() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const handleToggleDropdown = () => {
    setToggleDropdown(!toggleDropdown);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
      });
  };
  return (
    <div className="flex items-center ml-3">
      <div>
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-expanded="false"
          data-dropdown-toggle="dropdown-user"
          onClick={handleToggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="https://icones.pro/wp-content/uploads/2021/03/avatar-de-personne-icone-homme.png"
            alt="user photo"
          />
        </button>
      </div>
      <div className={`${!toggleDropdown && "hidden"} `}>
        <div
          className={`z-50 absolute right-5  my-9 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
        id="dropdown-user`}
        >
          <div className="px-4 py-3" role="none">
            <p className="text-sm text-gray-900 dark:text-white" role="none">
              Adish Dahal
            </p>
            <p
              className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
              role="none"
            >
              me.adishdahal@gmail.com
            </p>
          </div>
          <ul className="py-1" role="none">
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
