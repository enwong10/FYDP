import React, { useState } from 'react';

export const defaultSettings = {
    gardenName: '',
    workFrequency: '',
    goals: {
        'Decorate my yard': false,
        'Add privacy': false,
        'Compost': false,
        'Enjoy nature': false,
        'Grow food': false,
        'Watch animals': false,
        'Help the bees': false,
    },
    animals: '',
    budget: undefined,
};

export const defaultGrid = Array.from(Array(10), () => {
    return new Array(10).fill(null)
});

const Context = React.createContext({ grid: '', setGrid: () => {}, background: '', setBackground: () => {}, settings: {}, setSettings: () => {} });

const ContextProvider = ({ children }) => {
    const [grid, setGrid] = useState(defaultGrid);
    const [background, setBackground] = useState('');
    const [settings, setSettings] = useState(defaultSettings);
    return <Context.Provider value={{ grid, setGrid, background, setBackground, settings, setSettings }}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
