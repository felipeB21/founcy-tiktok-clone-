import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div>
          <h4 className="text-xl font-medium mb-5">Sign in</h4>
        </div>
        <div>
          <form className="flex flex-col gap-5">
            <input className="input-form" type="text" placeholder="Email" />
            <input
              className="input-form"
              type="password"
              placeholder="Password"
            />
            <button className="btn-form">Log in</button>
          </form>
        </div>
        <div className="mt-5">
          <p>
            Is this your first time using{" "}
            <span className="font-bold text-purple-600">Founcy</span>?
          </p>
          <p className="text-neutral-600">
            click{" "}
            <Link className="text-blue-800 hover:underline" href={"/register"}>
              here
            </Link>{" "}
            to register.
          </p>
        </div>
      </div>
    </div>
  );
}
