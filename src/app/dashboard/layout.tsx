"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { logout, getUserData, type User } from "@/app/lib/auth";
import { useEffect, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";

const NAV_ITEMS: Array<{ href: string; label: string; icon: string }> = [
  { href: "/dashboard", label: "Overview", icon: "mdi:view-dashboard-outline" },
  {
    href: "/dashboard/events",
    label: "Events",
    icon: "mdi:calendar-blank-outline",
  },
  {
    href: "/dashboard/courses",
    label: "Courses",
    icon: "mdi:book-open-variant",
  },
  {
    href: "/dashboard/membership",
    label: "Membership",
    icon: "mdi:card-account-details-outline",
  },
  {
    href: "/dashboard/achievements",
    label: "Achievements",
    icon: "mdi:trophy-outline",
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getUserData());
  }, []);

  const userName = useMemo(() => {
    if (!user) return "";
    return `${user.first_name} ${user.last_name}`.trim();
  }, [user]);

  const userInitials = useMemo(() => {
    if (!user) return "";
    const first = user.first_name?.[0] ?? "";
    const last = user.last_name?.[0] ?? "";
    return `${first}${last}`.toUpperCase();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col border-r bg-white z-50 animate-in slide-in-from-left duration-300">
          <div className="px-6 py-6 border-b">
            <Link href="/dashboard" className="block">
              <span className="text-xl font-bold">Member Dashboard</span>
            </Link>
          </div>
          <nav className="flex-1 p-3 space-y-3">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className="block">
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start rounded-full transition-all duration-300 ease-in-out gap-2 ${
                      isActive ? "font-semibold" : ""
                    }`}>
                    <Icon icon={item.icon} className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t mt-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 text-left">
                  <Avatar>
                    <AvatarImage src={user?.photo_url} alt={userName} />
                    <AvatarFallback>{userInitials || "MM"}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {userName || "Member"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>

        {/* Mobile slide-over sidebar (covers screen) */}
        {isMobileNavOpen && (
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileNavOpen(false)}
          />
        )}
        <aside
          className={`md:hidden fixed inset-y-0 left-0 z-40 w-screen bg-white border-r transform transition-transform duration-200 ease-in-out ${
            isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!isMobileNavOpen}>
          <div className="px-6 py-6 border-b flex items-center justify-between">
            <Link
              href="/dashboard"
              className="block"
              onClick={() => setIsMobileNavOpen(false)}>
              <span className="text-xl font-bold">Member Dashboard</span>
            </Link>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMobileNavOpen(false)}>
              ✕
            </Button>
          </div>
          <nav className="flex-1 p-3 space-y-4">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block"
                  onClick={() => setIsMobileNavOpen(false)}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start rounded-full gap-2 ${
                      isActive ? "font-semibold" : ""
                    }`}>
                    <Icon icon={item.icon} className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
          {/* Footer spacer */}
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-64">
          {/* Top bar for mobile */}
          <div className="md:hidden sticky top-0 z-20 bg-white border-b">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMobileNavOpen(true)}
                  aria-label="Open menu">
                  {/* Simple hamburger icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Button>
                <span className="font-semibold">Member Dashboard</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.photo_url} alt={userName} />
                      <AvatarFallback className="text-xs">
                        {userInitials || "MM"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="p-6 md:p-8 max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
