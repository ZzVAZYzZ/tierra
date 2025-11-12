"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

export const useRedirect = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const pathname = usePathname();
  useEffect(() => {
    if (user) {
      if (pathname === "/dashboard" && user.role === "user") {
        router.push("/");
      } else if (pathname === "/" && user.role === "admin") {
        router.push("/dashboard");
      }
    } else {
      if (pathname === "/dashboard") {
        router.push("/");
      }
    }
  }, [user, router, pathname]);
};
