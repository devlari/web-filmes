import Image from "next/image";
import { Button } from "primereact/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme("light");
  }, [setTheme]);

  if (!mounted) return null;

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} outlined disabled>
      <Image
        src={
          theme === "dark"
            ? "/header/icons/Sunlight_fill.svg"
            : "/header/icons/Moon_fill.svg"
        }
        alt={theme === "dark" ? "Modo claro" : "Modo escuro"} 
        width={24}
        height={24}
        className="invert filter"
      />
    </Button>
  );
}
