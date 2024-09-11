import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');

    // useEffect(() => {
    //     const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    //     setTheme(darkMediaQuery.matches ? 'dark' : 'light');

    //     darkMediaQuery.addEventListener('change', (e) => {
    //         setTheme(e.matches ? 'dark' : 'light');
    //     })
    // }, [])

    const toggleTheme = () => {
        const themeName = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', themeName);
        setTheme(themeName);
    }

    return (
        <ThemeContext.Provider value={[{theme, toggleTheme}]}>
            {children}
        </ThemeContext.Provider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export {ThemeContext, ThemeProvider}