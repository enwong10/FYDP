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

const buildInitialGrid = (width, height) => {
    const grid = [];
    for (let i = 0; i < width; i++) {
        grid[i] = [];
        for (let j = 0; j < height; j++) {
            grid[i].push(null);
        }
    }
    return grid;
};

export const defaultGrid = buildInitialGrid(10, 10);

const Context = React.createContext({
    grid: '',
    setGrid: () => {},
    history: '',
    setHistory: () => {},
    background: '',
    setBackground: () => {},
    settings: {},
    setSettings: () => {},
    tutorialStep: 0,
    nextTutorialStep: () => {},
    disableTutorial: () => {}
});

const ContextProvider = ({ children }) => {
    const [grid, setGrid] = useState(defaultGrid);
    const [history, setHistory] = useState([]);
    const [background, setBackground] = useState('');
    const [settings, setSettings] = useState(defaultSettings);
    const [tutorialStep, setTutorialStep] = useState(-1);
    return <Context.Provider value={{ grid, setGrid, history, setHistory, background, setBackground, settings, setSettings, tutorialStep, nextTutorialStep: () => setTutorialStep(tutorialStep + 1), setTutorialStep }}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
