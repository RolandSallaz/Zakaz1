import React from "react";
import Admin from "../components/Admin/Admin";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute adminRequire>
      <Admin>{children}</Admin>
    </ProtectedRoute>
  );
}
