"use client";
import {
  Bell,
  Calendar,
  LogOut,
  Settings,
  Stethoscope,
  User,
  Search,
  Menu
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { userAuthStore } from "@/store/authStore";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ showDashboardNav = false }) => {
  const { user, isAuthenticated, logout } = userAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const getDashboardNavigation = () => {
    if (!user || !showDashboardNav) return [];

    if (user?.type === "patient") {
      return [
        {
          label: "Appointments",
          icon: Calendar,
          href: "/patient/dashboard",
          active: pathname?.includes("/patient/dashboard") || false,
        },
      ];
    } else if (user?.type === "doctor") {
      return [
        {
          label: "Dashboard",
          icon: Calendar,
          href: "/doctor/dashboard",
          active: pathname?.includes("/doctor/dashboard") || false,
        },
        {
          label: "Appointments",
          icon: Calendar,
          href: "/doctor/appointments",
          active: pathname?.includes("/doctor/appointments") || false,
        },
      ];
    }
    return [];
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? "py-3 mx-4 mt-3 bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-3xl"
          : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left side -> logo + navigation */}
        <div className="flex items-center space-x-12">
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(59,130,246,0.4)] relative"
            >
              <div className="absolute inset-0 bg-white/20 rounded-2xl group-hover:animate-pulse"></div>
              <Stethoscope className="w-6 h-6 text-white relative z-10" />
            </motion.div>

            <div className="text-3xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
              Medi<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Care+</span>
            </div>
          </Link>

          {/* Dashboard navigation */}
          {isAuthenticated && showDashboardNav && (
            <nav className="hidden md:flex items-center space-x-8">
              {getDashboardNavigation().map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center space-x-2 text-sm font-bold transition-all p-2 rounded-xl hover:bg-blue-50/50 ${item.active
                      ? "text-blue-700"
                      : "text-gray-600 hover:text-blue-600"
                    }`}
                >
                  <item.icon className={`w-4 h-4 ${item.active ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  {item.active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-[-14px] left-1 right-1 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full shadow-[0_-2px_10px_rgba(59,130,246,0.5)]"
                    />
                  )}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-5">
              <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-white/80 w-12 h-12 transition-all shadow-sm border border-gray-100/50">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex justify-start items-center space-x-3 pl-2 pr-4 py-2 h-auto rounded-full hover:bg-white/80 transition-all border border-transparent hover:border-gray-200/50 hover:shadow-sm"
                  >
                    <Avatar className="w-10 h-10 border-2 border-white shadow-sm ring-2 ring-gray-100">
                      <AvatarImage src={user?.profileImage} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:flex flex-col items-start justify-center text-left">
                      <p className="text-sm font-extrabold text-gray-900 leading-tight">
                        {user?.name}
                      </p>
                      <p className="text-[10px] text-blue-600 uppercase font-black tracking-wider">
                        {user?.type}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 p-3 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-white/60 bg-white/90 backdrop-blur-xl mt-2">
                  <DropdownMenuLabel className="p-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-2xl mb-3 border border-white">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-14 h-14 ring-4 ring-white shadow-sm">
                        <AvatarImage src={user?.profileImage} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xl font-bold">
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-gray-900 text-lg truncate">{user?.name}</p>
                        <p className="text-xs font-semibold text-gray-500 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem asChild className="rounded-xl h-12 cursor-pointer font-bold hover:bg-blue-50 focus:bg-blue-50 mb-1 transition-colors">
                    <Link href={`/${user?.type}/profile`}>
                      <User className="w-5 h-5 mr-3 text-blue-500" />
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl h-12 cursor-pointer font-bold hover:bg-blue-50 focus:bg-blue-50 mb-1 transition-colors">
                    <Link href={`/${user?.type}/settings`}>
                      <Settings className="w-5 h-5 mr-3 text-blue-500" />
                      Account Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 bg-gray-100" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-xl h-12 font-bold text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login/patient">
                <Button
                  variant="ghost"
                  className="hidden sm:inline-flex text-gray-700 font-bold hover:text-blue-700 hover:bg-blue-50/50 rounded-full px-6 py-5 h-auto"
                >
                  Sign In
                </Button>
              </Link>

              <Link href="/signup/patient">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-700 hover:to-indigo-700 rounded-full px-8 py-5 h-auto shadow-[0_8px_20px_-5px_rgba(59,130,246,0.3)] border border-blue-400/20">
                    Book Consultation
                  </Button>
                </motion.div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
