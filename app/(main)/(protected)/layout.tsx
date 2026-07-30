"use client";
import Loading from "@/app/components/Loading";
import { useAuthContext } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  if (loading) return <Loading />;
  if (!user) return router.replace("/login");
  return <>{children}</>;
}
