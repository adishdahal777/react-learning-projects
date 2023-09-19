import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../Firebase/FireSdk";
import ToastAlert from "../Toast/ToastAlert";

export default function AddNotes() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState(0);
  const [alert, setAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "notes"), {
        title: title,
        desc: desc,
        type: type,
        userid: auth.currentUser.uid,
        date: Date(),
      });

      setAlert(true);

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  if (alert) {
    setTimeout(() => {
      setDesc("");
      setTitle("");
      setType(0);
      setAlert(false);
    }, 2000);
  }

  return (
    <>
      {alert ? <ToastAlert error={"Data Added Successfully"} /> : null}
      <div className="max-w-[400px] w-full">
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <input
              type="text"
              id="title"
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Notes Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              autoFocus
            />
            <textarea
              type="text"
              id="title"
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Notes Description"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>

            <select
              name="type"
              id=""
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0">Select Notes Type</option>
              <option value="Featured">Featured</option>
              <option value="Important">Important</option>
              <option value="New">New</option>
            </select>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Note
              <Icon
                icon="fluent:arrow-right-12-regular"
                width={20}
                className="ml-3"
              />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
