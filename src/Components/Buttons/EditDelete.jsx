import { Icon } from "@iconify/react";
import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Firebase/FireSdk";
import { useNavigate } from "react-router-dom";

export default function EditDelete({ id }) {

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    navigate("/notes/add");
  };

  return (
    <div className="flex space-x-0 justify-center">
      <button
        onClick={() => handleDelete(id)}
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        <Icon icon="ic:round-delete" height={20} />
        <span className="sr-only">Icon description</span>
      </button>
      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        <Icon icon="tabler:edit" height={20} />
        <span className="sr-only">Icon description</span>
      </button>
    </div>
  );
}
