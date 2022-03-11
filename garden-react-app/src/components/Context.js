import React, { useState } from 'react';
import mockImage from '../assets/Flower 2.jpeg';

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

const MOCK_PLANT = {
    imageUrl: mockImage,
    vernacularName: 'White Trillium',
    scientificName: 'Trillium grandiflorum',
    occurranceStatus: 'Present',
    locality: 'Southern Ontario, Canada',
    establishmentMeans: 'Natural, Non-invasive',
    lifespan: 'Perennial',
    growthSunShade: 'Shade',
    height: '20-50 cm',
    description: ['White Trillium is the provincial flower of Ontario', 'It has large white three-petalled flower above a whorl of 3 leaves.'],
    waterAmount: '10 oz per week',
    soilType: 'Brunisolic, Acidic',
    spacing: '6 to 12 inches',
    seedDepth: '2 to 4 inches',
    plantingTime: 'Early Spring/Late Summer',
    stalking: 'No',
    sunlightAmount: 'Moderate',
    mulch: '3 to 5 cm in fall',
    additionalInformation: ["Trimming: After flowering, let the seeds form. There's no need to cut back the plant in the forest. It will naturally yellow and disappear by midsummer. In the shade garden, if you want a tidier look, wait until the leaves start dying back before cutting the foliage to the ground.", "Fertilizing: Usually the decaying leaves from deciduous trees provide the perfect growing medium for trillium. To enhance the growth in areas where leaves blow away or in a shade garden, each fall add a 1- to 2-inch thick layer of compost or leaf mulch to the planting area."],
    prosLocation: 'Good',
    prosTime: 'Excellent',
    prosBees: 'Good',
    prosCost: 'Excellent',
    consAnimals: 'Awful',
    consChildren: 'Poor',
}

export const plantDictionary = [MOCK_PLANT, MOCK_PLANT, MOCK_PLANT, MOCK_PLANT, MOCK_PLANT]

const Context = React.createContext({ grid: '', setGrid: () => {}, background: '', setBackground: () => {}, settings: {}, setSettings: () => {}, tutorialStep: 0, nextTutorialStep: () => {}, disableTutorial: () => {}, selectedPlantIndex: 0, setSelectedPlantIndex: () => {} });

const ContextProvider = ({ children }) => {
    const [grid, setGrid] = useState(defaultGrid);
    const [history, setHistory] = useState([]);
    const [background, setBackground] = useState('');
    const [settings, setSettings] = useState(defaultSettings);
    const [tutorialStep, setTutorialStep] = useState(-1);
    const [selectedPlantIndex, setSelectedPlantIndex] = useState(0);

    return <Context.Provider value={{ grid, setGrid, background, setBackground, settings, setSettings, tutorialStep, nextTutorialStep: () => setTutorialStep(tutorialStep + 1), setTutorialStep, selectedPlantIndex, setSelectedPlantIndex }}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
