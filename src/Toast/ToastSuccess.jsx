import { Icon } from "@iconify/react";
import React from "react";

export default function ToastSuccess({ success }) {
  return (
    <div
      id="toast-default"
      className="z-[10000] fixed right-10 top-5 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <Icon icon="icon-park-solid:success" className="w-4 h-4" fill="none"/>
      </div>
      <div className="ml-3 text-sm font-normal">{success}</div>
    </div>
  );
}
