import { useEffect, useState } from "react";
import logo from "../../../logo.webp";
import axios from "axios";

export const Appbar = () => {
  

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
        <img src={logo} alt="" className="h-16 w-40 object-cover" />
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center mr-4">Hello</div>
        <div className="rounded-lg h-auto w-auto bg-slate-200 flex justify-center mt-1 mr-2 px-3">
          <div className="flex flex-col justify-center h-full text-xl">
            <button></button>
          </div>
        </div>
      </div>
    </div>
  );
};
