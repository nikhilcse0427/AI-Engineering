"use client";
import { userAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export function Providers({ children }) {
  const { fetchProfile, token } = userAuthStore();
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token, fetchProfile]);

  return <>{children}</>;
}
