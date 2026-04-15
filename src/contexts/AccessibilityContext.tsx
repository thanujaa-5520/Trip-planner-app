import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type FontSize = "normal" | "large" | "x-large";

interface AccessibilityContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return ctx;
};

const fontSizeMap: Record<FontSize, string> = {
  normal: "16px",
  large: "18px",
  "x-large": "20px",
};

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem("theme") as Theme) || "light"
  );
  const [highContrast, setHighContrast] = useState(() =>
    localStorage.getItem("highContrast") === "true"
  );
  const [fontSize, setFontSize] = useState<FontSize>(() =>
    (localStorage.getItem("fontSize") as FontSize) || "normal"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("highContrast", String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.style.fontSize = fontSizeMap[fontSize];
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  return (
    <AccessibilityContext.Provider
      value={{ theme, setTheme, highContrast, setHighContrast, fontSize, setFontSize }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
