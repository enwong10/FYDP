import React, { useState } from 'react';
import { defaultGrid, defaultLightingGrids, defaultSettings } from './Constants';

const Context = React.createContext({
    grid: '',
    setGrid: () => {},
    lightingGrid: '',
    setLightingGrid: () => {},
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
    const [lightingGrid, setLightingGrid] = useState(defaultLightingGrids[0]);
    const [myPlants, setMyPlants] = useState([]);
    const [history, setHistory] = useState([]);
    const [background, setBackground] = useState('');
    const [settings, setSettings] = useState(defaultSettings);
    const [tutorialStep, setTutorialStep] = useState(-1);
    const [selectedPlantIndex, setSelectedPlantIndex] = useState(0);

    return <Context.Provider value={{
        grid, setGrid,
        lightingGrid, setLightingGrid,
        myPlants, setMyPlants,
        history, setHistory,
        background, setBackground,
        settings, setSettings,
        tutorialStep, nextTutorialStep: () => setTutorialStep(tutorialStep + 1), setTutorialStep,
        selectedPlantIndex, setSelectedPlantIndex
    }}>
        {children}
    </Context.Provider>;
};

export { Context, ContextProvider };
