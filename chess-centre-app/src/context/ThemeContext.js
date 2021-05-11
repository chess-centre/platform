import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useMemo,
} from "react";

/**
 * Saves the old theme for future use
 * @param {string} theme - Name of curent theme
 * @return {string} previousTheme
 */
function usePrevious(theme) {
  const ref = useRef();
  useEffect(() => {
    ref.current = theme;
  });
  return ref.current;
}

/**
 * Gets user preferences from local storage
 * @param {string} key - localStorage key
 * @return {array} getter and setter for user preferred theme
 */
function useStorageTheme(key) {
  const [theme, setTheme] = useState('light');

  // update stored theme
  useEffect(() => {
    console.log("WTF!");
    localStorage.setItem(key, theme);
  }, [theme, key]);

  return [theme, setTheme];
}

// create context
export const ThemeContext = React.createContext();

// create context provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useStorageTheme("theme");

  // update root element class on theme change
  const oldTheme = usePrevious(theme);
  useLayoutEffect(() => {
    console.log("TESTING!");
    document.documentElement.classList.remove(`theme-${oldTheme}`);
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme, oldTheme]);

  function toggleTheme() {
    if (theme === "light") setTheme("light");
    else setTheme("light");
  }

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
