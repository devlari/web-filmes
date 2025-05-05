'use client'

import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="light">Claro</option>
      <option value="dark">Escuro</option>
    </select>
  );
};
