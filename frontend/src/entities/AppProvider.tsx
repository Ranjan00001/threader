import React, { createContext, useContext, useState, ReactNode } from "react";

interface UISettings {
    theme: "light" | "dark";
    isExpanded: boolean;
    fontSize: number;
}

interface AppContextProps extends UISettings {
    toggleTheme: () => void;
    toggleExpanded: () => void;
    setFontSize: (size: number) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const [fontSize, setFontSizeState] = useState<number>(14);

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
    const toggleExpanded = () => setIsExpanded((prev) => !prev);
    const setFontSize = (size: number) => setFontSizeState(size);

    const value: AppContextProps = {
        theme,
        isExpanded,
        fontSize,
        toggleTheme,
        toggleExpanded,
        setFontSize,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppSettings = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppSettings must be used within AppProvider");
    return ctx;
};
