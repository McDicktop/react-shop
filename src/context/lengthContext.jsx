import { useState, createContext } from "react";
import PropTypes from "prop-types";

const LengthContext = createContext();

const LengthProvider = ({ children }) => {
    const [length, setLength] = useState(null);

    const changeLength = (newLength) => {
        setLength(newLength);
    };

    return (
        <LengthContext.Provider value={[{ length, changeLength }]}>
            {children}
        </LengthContext.Provider>
    );
};

LengthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { LengthContext, LengthProvider };