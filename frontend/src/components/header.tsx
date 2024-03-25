import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 w-full shadow z-50">
      <div className="max-w-5xl mx-auto p-3 flex items-center justify-between">
        <div className="flex flex-grow basis-0">
          <Link className="title" href={"/"}>
            Founcy
          </Link>
        </div>
        <div>
          <input
            className="bg-neutral-100 px-4 py-2 outline-0 w-[300px] border rounded-full"
            type="search"
            placeholder="Search"
          />
        </div>
        <div className="flex flex-row-reverse flex-grow basis-0 items-center gap-5">
          <Link
            className="px-6 py-1.5 bg-purple-400 rounded text-white font-medium hover:bg-purple-500"
            href={"/login"}
          >
            Log in
          </Link>
          <Link
            className="px-6 py-1.5 border rounded font-medium hover:bg-neutral-100"
            href={"/upload"}
          >
            Upload
          </Link>
        </div>
      </div>
    </header>
  );
}
