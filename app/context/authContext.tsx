"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types";
import { useRouter } from "next/navigation";
import api from "../config/api";
import toast from "react-hot-toast";

interface AuthContext {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("auth_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });
      console.log(data.user, "dataa");
      setUser(() => data.user);
      setToken(() => data.token);
      console.log(user, token, "yos");
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      toast.success("login successful");
      router.replace("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  console.log(user?.email, "us");
  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(() => data.user);
      setToken(() => data.token);
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      toast.success("Registration successful");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      if (user) router.replace("/");
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...userData };
      setUser(updated);
      localStorage.setItem("auth_user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, token, register, updateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
