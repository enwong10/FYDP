import React, { useState } from 'react';
import mockImage from '../assets/Flower 2.jpeg';
import growth_db from './GrowInfoDb';

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

export const plantDictionary = growth_db;

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
    disableTutorial: () => {},
    selectedPlantIndex: 0,
    setSelectedPlantIndex: () => {},
});

const ContextProvider = ({ children }) => {
    const [grid, setGrid] = useState(defaultGrid);
    const [history, setHistory] = useState([]);
    const [background, setBackground] = useState('');
    const [settings, setSettings] = useState(defaultSettings);
    const [tutorialStep, setTutorialStep] = useState(-1);
    const [selectedPlantIndex, setSelectedPlantIndex] = useState(0);

    return <Context.Provider value={{ grid, setGrid, history, setHistory, background, setBackground, settings, setSettings, tutorialStep, nextTutorialStep: () => setTutorialStep(tutorialStep + 1), setTutorialStep, selectedPlantIndex, setSelectedPlantIndex }}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
