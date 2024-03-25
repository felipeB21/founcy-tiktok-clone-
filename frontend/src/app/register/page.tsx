"use client";
import RegisterPage from "@/components/register-page";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/utils/apolloClient";

export default function page() {
  return (
    <ApolloProvider client={client}>
      <RegisterPage />
    </ApolloProvider>
  );
}
