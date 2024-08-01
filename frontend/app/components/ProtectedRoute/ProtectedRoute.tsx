"use client";
import { useAppDispatch } from "@/app/lib/hooks/redux";
import { checkAuth } from "@/app/lib/services/api";
import { login } from "@/app/lib/services/slices/appSlice";
import { ROLES } from "@/app/lib/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IProtectedRoute {
  adminRequire?: boolean;
  children: React.ReactNode;
}

export function ProtectedRoute({ children, adminRequire }: IProtectedRoute) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    checkAuth()
      .then((userData) => {
        if (adminRequire && userData.role !== ROLES.ADMIN) {
          return router.push("/auth");
        } else {
          setIsLoading(false);
          dispatch(login(userData));
          if (userData.role === ROLES.ADMIN) {
            localStorage.setItem("admin", "true");
          }
        }
      })
      .catch(() => {
        router.push("/auth");
      });
  }, []);

  return <>{isLoading ? <></> : children}</>;
}
