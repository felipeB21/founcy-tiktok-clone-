"use client";
import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="fixed top-0 w-full shadow bg-white z-50">
      <div className="max-w-5xl mx-auto p-3 flex items-center justify-between">
        <div className="flex flex-grow basis-0">
          <Link className="title" href={"/"}>
            Founcy
          </Link>
        </div>
        <form className="relative">
          <input
            className="bg-neutral-100 px-4 py-2 outline-0 w-[300px] border rounded-full"
            type="text"
            placeholder="Search"
          />
          <button className="absolute bg-neutral-200 z-20 right-0 top-[1px] rounded-r-full px-4 py-2.5 text-xl">
            <CiSearch />
          </button>
        </form>
        <div className="flex flex-row-reverse flex-grow basis-0 items-center gap-5">
          <Link
            className="px-6 py-1.5 bg-purple-400 rounded text-white font-medium hover:bg-purple-500"
            href={"/login"}
          >
            Log in
          </Link>
          <Link
            className="flex items-center gap-2 px-4 py-1.5 border rounded font-medium hover:bg-neutral-100"
            href={"/upload"}
          >
            <FaPlus />
            Upload
          </Link>
        </div>
      </div>
    </header>
  );
}
