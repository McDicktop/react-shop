import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import LightIcon from "../../assets/theme_light";
import DarkIcon from "../../assets/theme_dark";

const ToggleBtn = () => {
    const [{ theme, toggleTheme }] = useContext(ThemeContext);

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="btn btn--icon"
            aria-label="toggle theme"
        >
            {theme === "dark" ? (
                <DarkIcon />
            ) : (
                <LightIcon />
            )}
        </button>
    );
};


export default ToggleBtn;