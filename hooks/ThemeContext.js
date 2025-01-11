import React, { useState, useContext, useEffect } from "react";
import { Appearance } from "react-native"; 

export const ThemeContext = React.createContext();

export function useThemeContext() {
  const themeState = useContext(ThemeContext);

  if (themeState === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }

  return themeState;
}

export function ThemeProvider({children}) {
  
  const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(systemTheme | 'dark');

  useEffect(() => {
  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(colorScheme); 
  });

  return () => subscription.remove();
}, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }

  const themeState = {
    theme: theme, 
    toggleTheme: toggleTheme
  }

  console.log(themeState);

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  )
}

