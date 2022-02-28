import React, { useState } from 'react';

const Context = React.createContext({ grid: '', setGrid: () => {}, background: '', setBackground: () => {} });

const ContextProvider = ({ children }) => {
    const [grid, setGrid] = useState('');
    const [background, setBackground] = useState('');
    return <Context.Provider value={{ grid, setGrid, background, setBackground }}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
