import { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const themes = {
    dark: {
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        cardBackground: '#2d2d2d',
        cardText: '#e0e0e0',
        headerColor: '#bb86fc',
        borderColor: '#444444',
        shadowColor: 'rgba(255, 255, 255, 0.1)'
    },
    light: {
        backgroundColor: '#f8f8fc',
        color: '#333333',
        cardBackground: '#ffffff',
        cardText: '#333333',
        headerColor: '#6c3483',
        borderColor: '#eeeeee',
        shadowColor: 'rgba(0, 0, 0, 0.1)'
    }
}

const initialState = {
    dark: false,
    theme: themes.light,
    toggle: () => { }
}

const ThemeContext = createContext(initialState);

function ThemeProvider({ children }) {
    // Use custom hook instead of ueState and useEffect
    const [dark, setDark] = useLocalStorage('dark', false);

    const toggle = () => {
        setDark(isDark => !isDark);
    }

    const theme = dark ? themes.dark : themes.light;

    return (
        <ThemeContext.Provider value={{ dark, theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider }
