import { AuthProvider } from "../context/authContext";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
