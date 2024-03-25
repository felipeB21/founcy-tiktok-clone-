"use client";
import { RegisterUserMutation } from "@/gql/graphql";
import { REGISTER_USER } from "@/graphql/mutations/register";
import { useUserStore } from "@/stores/userStore";
import { useMutation } from "@apollo/client";
import { GraphQLErrorExtensions } from "graphql";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [registerUser, { loading, error, data }] =
    useMutation<RegisterUserMutation>(REGISTER_USER);
  const setUser = useUserStore((state) => state.setUser);
  const [errors, setErrors] = useState<GraphQLErrorExtensions>({});

  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    await registerUser({
      variables: {
        name: registerData.name,
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
      },
    }).catch((err) => {
      setErrors(err.graphQLErrors[0].extensions);
    });

    if (data?.register?.user) {
      setUser({
        id: data.register.user.id,
        name: data.register.user.name,
        username: data.register.user.username,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-8">
      <div>
        <div>
          <h4 className="text-xl font-medium mb-5">Register</h4>
        </div>
        <div>
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div>
              <input
                className="input-form"
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  setRegisterData({ ...registerData, name: e.target.value });
                }}
              />
              {errors?.name && <p className="error">{errors.name}</p>}
            </div>
            <div>
              <input
                className="input-form"
                type="text"
                placeholder="Username"
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
              />
              {errors?.username && <p className="error">{errors.username}</p>}
            </div>
            <div>
              <input
                className="input-form"
                type="text"
                placeholder="Email"
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
              {errors?.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
              <input
                className="input-form"
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
              {errors?.password && <p className="error">{errors.password}</p>}
            </div>
            <div>
              <input
                className="input-form"
                type="password"
                placeholder="Confirm password"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              {errors?.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>
            <button onClick={handleRegister} className="btn-form">
              Register
            </button>
          </form>
        </div>
        <div className="mt-5">
          <p>
            Already have an account on{" "}
            <span className="font-bold text-purple-600">Founcy</span>?
          </p>
          <p className="text-neutral-600">
            click{" "}
            <Link className="text-blue-800 hover:underline" href={"/login"}>
              here
            </Link>{" "}
            to login.
          </p>
        </div>
      </div>
    </div>
  );
}
