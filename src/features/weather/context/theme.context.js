const { createContext, useState, useEffect } = require('react');

const ThemeContext = createContext();
const THEME_KEY = 'theme';

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  const saveThemeToLocalStorage = (theme) => {
    //browser API
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  };

  useEffect(() => {
    // maintain the user's theme preference even after they close and reopen the browser
    const savedTheme = JSON.parse(localStorage.getItem(THEME_KEY));
    if (savedTheme !== null) {
      setDark(savedTheme);
      return;
    }
    // If no saved theme, check system preferences
    const isSystemThemeDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setDark(isSystemThemeDark === true);
  }, []);
  return (
    //context API
    <ThemeContext.Provider
      value={{ dark, setDark, saveThemeToLocalStorage }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider };
export default ThemeContext;
