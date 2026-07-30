"use client";
import {
  BikeIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
  UserIcon,
  XIcon,
  MenuIcon,
  PackageIcon,
  MapPinIcon,
  ArrowUpRightIcon,
  ShieldIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { Button, SearchField } from "@heroui/react";
import { useAuthContext } from "../context/authContext";
export default function Navbar() {
  const { user, logout } = useAuthContext();
  // const user = null;
  const { cartCount, setIsCartOpen } = {
    cartCount: 3,
    setIsCartOpen: (_data: any) => {},
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigation = useRouter();
  // const navigate=useNavi
  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigation.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };
  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigation.replace("/");
  };
  return (
    <nav
      className="bg-white sticky top-0 z-50 border-b border-app-border
  "
    >
      <div className="max-w-7xl mx-auto px-4 xm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
        <Link
          className="flex items-center gap-2 text-[22px] font-medium shrink-0"
          href="/"
        >
          <BikeIcon size={24} />
          Instacart
        </Link>
        <div className="w-full flex items-center justify-end gap-4 lg:gap-10">
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <Link href="/">Home</Link>
            <Link href="/products">Product</Link>
            <Link href="/deals" className="text-app-orange">
              Deals
            </Link>
          </div>
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-sm text-xs sm:text-sm"
          >
            <SearchField name="search" className=" w-full ">
              <SearchField.Group className="ring ring-app-orange/15 p-0 bg-orange-50 focus:ring-app-orange/30">
                <SearchField.SearchIcon className="right-0" />
                <SearchField.Input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className=" bg-transparent pl-8 p-2 border-none "
                  placeholder="Search..."
                />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            {/* <div className="w-full bg-red-500">
              <input />
            </div> */}

            {/* <Button type="submit" className="w-full">
                Submit
              </Button> */}
          </form>
          <div className="flex items-center gap-3">
            <Button
              isIconOnly
              className="bg-transparent relative px-2 rounded-xl"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCartIcon className="size-5 text-zinc-900" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 size-4 bg-app-orange text-white text-[10px] rounded-full flex-center">
                  {cartCount}
                </span>
              )}
            </Button>
            <div className="relative">
              {user ? (
                <Button
                  className="flex items-center gap-2 p-2 bg-transparent"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="size-7 rounded-full bg-green-950 text-white flex-center">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <ChevronDownIcon className="size-3 text-zinc-500" />
                </Button>
              ) : (
                <div className="flex-center gap-2">
                  <Link
                    href="/login"
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-950-light transition-colors"
                  >
                    <UserIcon size={16} />
                    Sign In
                  </Link>
                  {userMenuOpen ? (
                    <XIcon
                      className="md:hidden"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    ></XIcon>
                  ) : (
                    <MenuIcon
                      className="md:hidden"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    />
                  )}
                </div>
              )}
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                    {user && (
                      <div className="px-4 py-2 border-b border-app-border">
                        <p className="text-sm font-medium text-zinc-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-zinc-500">{user?.email}</p>
                      </div>
                    )}
                    <div onClick={() => setUserMenuOpen(false)}>
                      {!user && (
                        <Link className="dropdown-link" href="/login">
                          <UserIcon size={16} />
                          Sign In
                        </Link>
                      )}
                      {user && (
                        <Link className="dropdown-link" href="/orders">
                          <PackageIcon size={16} />
                          My Orders
                        </Link>
                      )}
                      {user && (
                        <Link className="dropdown-link" href="/address">
                          <MapPinIcon size={16} />
                          Addresses
                        </Link>
                      )}
                      <Link
                        href="/products"
                        className="dropdown-link md:hidden"
                      >
                        <ArrowUpRightIcon size={16} />
                        Products
                      </Link>
                      <Link href="/deals" className="dropdown-link md:hidden">
                        <ArrowUpRightIcon size={16} />
                        Deals
                      </Link>
                      {user?.isAdmin && (
                        <Link href="/admin/products" className="dropdown-link">
                          <ShieldIcon className="text-app-orange-dark" />
                          <span className="text-app-orange-dark">
                            Admin panel
                          </span>
                        </Link>
                      )}
                      {user && (
                        <div className="border-t border-app-border pt-1">
                          <Button
                            onClick={handleLogout}
                            className="flex justify-start items-center gap-3 px-4 bg-transparent py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors"
                          >
                            <LogOutIcon /> Logout
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
