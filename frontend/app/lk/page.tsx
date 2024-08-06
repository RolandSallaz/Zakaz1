"use client";
import React, { Suspense } from "react";
import { Lk } from "../components/Lk/Lk";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";

export default function page() {
  return (
    <Suspense>
      <ProtectedRoute>
        <Lk />
      </ProtectedRoute>
    </Suspense>
  );
}
