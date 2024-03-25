"use client";
import React from "react";
import ProtectedRoutes from "@/components/protected-routes";

export default function page() {
  return (
    <>
      <ProtectedRoutes>
        <div>Upload</div>
      </ProtectedRoutes>
    </>
  );
}
