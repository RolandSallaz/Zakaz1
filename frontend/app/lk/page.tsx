"use client";
import React from "react";
import { Lk } from "../components/Lk/Lk";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";

export default function page() {
  return (
    <ProtectedRoute>
      <Lk />
    </ProtectedRoute>
  );
}
