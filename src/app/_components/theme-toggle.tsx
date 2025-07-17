"use client"
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
  
    return (
      <Button
        variant="ghost"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-black dark:text-white"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span className="sr-only">Toggle Theme</span>
      </Button>
    );
  };
  