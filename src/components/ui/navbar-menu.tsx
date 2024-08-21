"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  item: string;
  href: string;
  className?: string; 
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, href, className }) => {
  return (
    <Link href={href} className={cn("cursor-pointer text-black hover:opacity-90 dark:text-white px-4", className)}>
      {item}
    </Link>
  );
};

interface MenuProps {
  children: React.ReactNode;
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({ children, className }) => {
  return (
    <nav
      className={cn("relative rounded-full border border-black dark:bg-transparent dark:border-white/[0.2] bg-transparent shadow-input flex justify-center space-x-4 px-8 py-6", className)}
    >
      {children}
    </nav>
  );
};
