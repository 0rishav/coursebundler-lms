"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mounted, SetMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => SetMounted(true), []);
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "light" ? (
        <BiMoon
          className="cursor-pointer"
          fill="black"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun 
          size={25}
          className="cursor-pointer text-white"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};
