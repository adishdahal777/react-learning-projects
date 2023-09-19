import { Icon } from "@iconify/react";
import React from "react";

export default function ToastAlert({ error }) {
  return (
    <div
      id="toast-default"
      className="z-[1000] fixed right-10 top-5 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <Icon icon="mingcute:alert-fill" className="w-4 h-4" fill="none"/>
        <span className="sr-only">Fire icon</span>
      </div>
      <div className="ml-3 text-sm font-normal">{error}</div>
    </div>
  );
}
