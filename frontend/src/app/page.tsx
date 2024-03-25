"use client";
import { ApolloProvider } from "@apollo/client";
import { client } from "../utils/apolloClient";
import { createContext } from "react";
export default function Home() {
  const context = createContext({});
  return (
    <ApolloProvider client={client}>
      <main className="mt-20 p-3 max-w-5xl mx-auto">
        <h1>TikTok</h1>
      </main>
    </ApolloProvider>
  );
}
