import React, { useState, useContext, useEffect } from "react";
//import { Appearance } from "react-native"; 

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({children}) {
  
  //const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(systemTheme);

  /*
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ theme }) => {
      setTheme(theme); 
    });

    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }
    */

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

