import React, { useContext, useState, useEffect } from "react";
import { Context } from "./Context";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import styled from "styled-components";
import { Dropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import plantDb from './PlantDb'
import { autoGenGarden, initialWarningsGrid } from './Constants'
import SWAlgorithm from "./SWAlgorithm";
import Popover from './Popover';
import { OverlayTrigger } from "react-bootstrap";
// imgs
import chevronRight from '../assets/chevron_right.svg';
import chevronLeft from '../assets/chevron_left.svg';
import undoIcon from '../assets/undo.svg';
import infoIcon from '../assets/info_square.svg';
import trashIcon from '../assets/trash.svg';
import toolsIcon from '../assets/tools.svg';

const INSPECTION = 0;
const ADDITION = 1;
const INSIGHT = 2;
const MOVE = 3;
const REMOVE = 4;

const PLANT_GROUPS = {
    "Plants in Garden": [],
    "My Plants": [],
    // "Saved Plants": [],
    "Save the Bees": [2],
    "Flowers": [0, 2, 3, 4, 5, 6],
    // "Trees": [],
    // "Food": [],
    "Shrubs": [1],
    "Ground Covers": [0],
    // "Fungi": []
};

// TODO: finish this and display colours on names
const OVERALL_WARNING = {
    ideal: [1, 2],
    warning: [0]
};

function TwoDGrid() {
    const { grid, setGrid, history, setHistory, setSelectedPlantIndex, tutorialStep, nextTutorialStep, myPlants } = useContext(Context);
    const navigate = useNavigate();
    const [interactionMode, setInteractionMode] = useState(INSPECTION);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [firstPlantChoiceIndex, setfirstPlantChoiceIndex] = useState(0);
    const [plantGroup, setPlantGroup] = useState(Object.keys(PLANT_GROUPS)[0]);
    const [movingPlant, setMovingPlant] = useState(null);
    const [warningsGrid, setWarningsGrid] = useState(initialWarningsGrid);
    const [showPopover, setShowPopover] = useState(false);
    const [insightCoords, setInsightCoords] = useState(null);
    const [isAutogen, setIsAutogen] = useState(false);
    const [plantsInGarden, setPlantsInGarden] = useState(0);

    useEffect(() => {
        if (tutorialStep > 0) setShowPopover(true)
    }, [tutorialStep]);

    useEffect(() => {
        console.log(); //! THIS NEEDS TO BE HERE, we need a side effect otherwise this will sometimes not run and be wrongly optimized out ¯\_(ツ)_/¯
        if (!isAutogen) {
            const newWarningsGrid = SWAlgorithm(grid, selectedPlant);
            setWarningsGrid(newWarningsGrid);
        }
    }, [grid, selectedPlant]);

    useEffect(() => {
        const amount = getPlantsInGarden().length;
        setPlantsInGarden(amount);
    }, [grid]);

    useEffect(() => {
        const amount = getPlantsInGarden().length;
        setPlantsInGarden(amount);
    }, []);

    // This is if you need to debug the selected plant
    // useEffect(() => {
    //     if (selectedPlant !== null) {
    //         console.log(plantDb[selectedPlant].commonNames[0]);
    //     }
    // }, [selectedPlant]);

    // Functions //

    const getPlantsInGarden = () => {
        return grid.flat().filter((v, i, a) => a.indexOf(v) === i && v !== null);
    };

    const hardCodeWarningsGrid = () => {
        const newgrid = [];
        for (let i = 0; i < grid.length; i++) {
            newgrid[i] = [];
            for (let j = 0; j < grid[i].length; j++) {
                newgrid[i].push({
                    suggestions: ['This spot would be ideal for this plant as there are no adjacent plants with significantly differing growth requirements.'],
                    all: ['This spot would be ideal for this plant as there are no adjacent plants with significantly differing growth requirements.']
                });
            }
        }
        setWarningsGrid(newgrid);
    };

    const modifyGrid = (i, j, newValue) => {
        const newGrid = [...grid];
        setHistory([...history, { i, j, value: newGrid[i][j] }]);
        newGrid[i][j] = newValue;
        setGrid(newGrid);
    };

    const modifyMultipleGrid = (squares) => {
        const newGrid = [...grid];
        const historyArray = [];
        squares.forEach(({ i, j, newValue }) => {
            historyArray.push({ i, j, value: newGrid[i][j] });
            newGrid[i][j] = newValue;
        });
        setHistory([...history, historyArray]);
        setGrid(newGrid);
    };

    const clickedGrid = (i, j) => {
        if (interactionMode === ADDITION && selectedPlant !== null) {
            if (!(warningsGrid[i][j] && warningsGrid[i][j].conflicts && warningsGrid[i][j].conflicts.length > 0)) {
                modifyGrid(i, j, selectedPlant)
            }
        } else if (interactionMode === REMOVE) {
            modifyGrid(i, j, null)
        } else if (interactionMode === INSPECTION) {
            if (grid[i][j] !== null) {
                setSelectedPlantIndex(grid[i][j]);
                navigate('/dictionary');
            }
        } else if (interactionMode === INSIGHT) {
            if ('all' in warningsGrid[i][j]) {
                if (insightCoords && insightCoords.i === i && insightCoords.j === j) {
                    setInsightCoords(null);
                } else {
                    setInsightCoords({ i, j });
                }
            }
        } else if (interactionMode === MOVE) {
            if (!movingPlant) {
                if (grid[i][j] !== null) {
                    setMovingPlant({ i, j });
                    setSelectedPlant(grid[i][j]);
                }
            } else if (i === movingPlant.i && j === movingPlant.j) {
                setMovingPlant(null);
            } else {
                const newGrid = [...grid];
                modifyMultipleGrid([
                    { i, j, newValue: newGrid[movingPlant.i][movingPlant.j] },
                    { i: movingPlant.i, j: movingPlant.j, newValue: null }
                ]);
                setMovingPlant(null);
            }
        }
    };

    const toggleAdditionMode = (plantIndex) => {
        if (insightCoords) setInsightCoords(null);
        if (selectedPlant === plantIndex) {
            setInteractionMode(INSPECTION);
            setSelectedPlant(null);
        }
        else {
            setInteractionMode(ADDITION);
            setSelectedPlant(plantIndex);
        }
    };

    const toggleAlternateMode = (mode) => {
        if (insightCoords) setInsightCoords(null);
        if (interactionMode === mode) setInteractionMode(INSPECTION);
        else {
            if (mode !== INSIGHT && selectedPlant !== null) setSelectedPlant(null);
            setInteractionMode(mode);
        }
    };

    const updateFirstPlantIndex = (shiftValue) => {
        let newIndex = firstPlantChoiceIndex + shiftValue;
        if (newIndex < 0) newIndex = 0;
        setfirstPlantChoiceIndex(newIndex);
    };

    const undo = () => {
        if (history.length > 0) {
            const newHistory = [...history];
            const lastState = newHistory.pop();
            const newGrid = [...grid];
            if (Array.isArray(lastState)) {
                lastState.forEach(({ i, j, value }) => {
                    newGrid[i][j] = value;
                });
            } else {
                newGrid[lastState.i][lastState.j] = lastState.value;
            }
            setGrid(newGrid);
            setHistory(newHistory);
        }
    };

    const rightClickNavigate = (e, i) => {
        e.preventDefault();
        setSelectedPlantIndex(i);
        navigate('/dictionary');
    };

    // JSX Pieces //

    const displayGrid = grid.map((row, i) =>
        <GridRow key={'row' + i} className={'row'}>
            {row.map((id, j) =>
                <OverlayTrigger
                    placement="top"
                    overlay={(p) => Popover(p, warningsGrid[i][j].all[0])}
                    show={insightCoords && insightCoords.i === i && insightCoords.j === j && warningsGrid[i][j].all.length > 0}
                >
                    <GridSquare onClick={() => clickedGrid(i, j)} key={'col' + j} className={'col'}
                        disabled={warningsGrid[i][j] && warningsGrid[i][j].conflicts && warningsGrid[i][j].conflicts.length > 0}
                        style={{
                            borderColor: (() => {
                                if (warningsGrid[i][j]) {
                                    if (warningsGrid[i][j].conflicts && warningsGrid[i][j].conflicts.length > 0) {
                                        return '#D83535';
                                    }
                                    else if (warningsGrid[i][j].warning && warningsGrid[i][j].warning.length > 0) {
                                        return '#977B16';
                                    }
                                    else if (warningsGrid[i][j].suggestions && warningsGrid[i][j].suggestions.length > 0) {
                                        return '#007BFF';
                                    }
                                }
                                return '#000000';
                            })(),
                            borderWidth: '4px'
                        }}
                    >
                        {id !== null &&
                            <img src={plantDb[id].imageUrl} alt=""
                                style={{ opacity: movingPlant?.i === i && movingPlant?.j === j ? '0.5' : '1' }}
                            />
                        }
                    </GridSquare>
                </OverlayTrigger>
            )}
        </GridRow >
    );

    const getPlantSelectionsOptions = () => {
        const arrOfPlants = plantGroup === 'Plants in Garden' ? getPlantsInGarden() : plantGroup === 'My Plants' ? myPlants :PLANT_GROUPS[plantGroup];
        return (arrOfPlants.slice(firstPlantChoiceIndex, firstPlantChoiceIndex + 3).map((plantId, i) =>
            <PlantOption style={{
                border: selectedPlant === plantId ? "2px dashed #28A745" : ""
            }}
                onClick={() => {
                    if (tutorialStep === 10) nextTutorialStep();
                    toggleAdditionMode(plantId)
                }}
                onContextMenu={(e) => rightClickNavigate(e, plantId)}
                className={'col-4'}
            >
                <PlantImage src={plantDb[plantId].imageUrl} />
                <div>
                    {plantDb[plantId].commonNames[0]}
                </div>
                {'warning' in plantDb[plantId].mainPreference ?
                    <div style={{ color: '#977B16' }}>
                        Warning: {plantDb[plantId].mainPreference['warning']}
                    </div>
                    :
                    <div style={{ color: '#007BFF' }}>
                        Ideal: {plantDb[plantId].mainPreference['suggestion']}
                    </div>
                }
            </PlantOption>))
    };

    return (
        <Container>
            <TopButtons>
                <OverlayTrigger
                    placement="bottom"
                    overlay={(p) => Popover(p, 'To begin adding plants, ensure that flowers are selected in the drop down menu.')}
                    show={showPopover && tutorialStep === 9}
                >
                    <Dropdown onClick={() => { setShowPopover(false) }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {plantGroup}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {Object.keys(PLANT_GROUPS).map((groupName, i) =>
                                <Dropdown.Item key={i} onClick={() => {
                                    if (tutorialStep === 9) nextTutorialStep(); setShowPopover(true);
                                    setPlantGroup(groupName);
                                    setSelectedPlant(null);
                                    setfirstPlantChoiceIndex(0);
                                }}>{groupName}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </OverlayTrigger>
                <input type={'text'} placeholder={'Search All Plants'} />
            </TopButtons>
            <PlantSelector>
                <SelectorNavigationButton
                    onClick={() => updateFirstPlantIndex(-3)}
                    disabled={firstPlantChoiceIndex === 0}
                    style={{ borderRadius: '4px 0 0 4px' }}>
                    <img src={chevronLeft} alt='prev' />
                </SelectorNavigationButton>
                <OverlayTrigger
                    placement="bottom"
                    overlay={(p) => Popover(p, 'To select a flower to add, click on it in the navigation bar.')}
                    show={showPopover && tutorialStep === 10}
                >
                    <PlantsSelectionsContainer>
                        {getPlantSelectionsOptions()}
                    </PlantsSelectionsContainer>
                </OverlayTrigger>
                <SelectorNavigationButton
                    onClick={() => updateFirstPlantIndex(3)}
                    disabled={
                        plantGroup === 'Plants in Garden' ?
                            firstPlantChoiceIndex + 3 >= plantsInGarden :
                        plantGroup === 'My Plants' ?
                            firstPlantChoiceIndex + 3 >= myPlants.length :
                        firstPlantChoiceIndex + 3 >= PLANT_GROUPS[plantGroup].length
                    }
                    style={{ borderRadius: '0 4px 4px 0' }}>
                    <img src={chevronRight} alt='next' />
                </SelectorNavigationButton>
            </PlantSelector>
            <OverlayTrigger
                placement="bottom"
                overlay={(p) => Popover(p, 'You can toggle information mode, move/remove plants from the grid, or undo previous change.')}
                show={showPopover && tutorialStep === 12}
            >
                <BottomButtonsContainer>
                    <BottomButton onClick={() => toggleAlternateMode(INSIGHT)}
                        style={{ backgroundColor: interactionMode === INSIGHT && '#28A745' }}>
                        <img src={infoIcon} alt='info' />
                    </BottomButton>
                    <BottomButton onClick={() => toggleAlternateMode(MOVE)}
                        style={{ backgroundColor: interactionMode === MOVE && '#28A745' }}>
                        <img src={toolsIcon} alt='move' />
                    </BottomButton>
                    <BottomButton onClick={() => toggleAlternateMode(REMOVE)}
                        style={{ backgroundColor: interactionMode === REMOVE && '#28A745' }}>
                        <img src={trashIcon} alt='delete' />
                    </BottomButton>
                    <BottomButton onClick={undo}>
                        <img src={undoIcon} alt='undo' />
                    </BottomButton>
                </BottomButtonsContainer>
            </OverlayTrigger>
            <OverlayTrigger
                placement="top"
                overlay={(p) => Popover(p, 'Now by clicking into the grid, you can place the flower into the garden.')}
                show={showPopover && tutorialStep === 11}
            >
                <GridContainer onClick={() => { if (tutorialStep === 11) nextTutorialStep() }}>
                    <TransformWrapper>
                        <TransformComponent>
                            {displayGrid}
                        </TransformComponent>
                    </TransformWrapper>
                </GridContainer>
            </OverlayTrigger>
            <div>
                Each square is 1 sqft. -- North is up.
            </div>
            <Legend>
                <LegendItem>
                    <LegendIcon style={{ backgroundColor: '#007BFF' }} />
                    Ideal
                </LegendItem>
                <LegendItem>
                    <LegendIcon style={{ backgroundColor: '#977B16' }} />
                    Warning
                </LegendItem>
                <LegendItem>
                    <LegendIcon style={{ backgroundColor: '#D83535' }} />
                    Conflict
                </LegendItem>
            </Legend>
            <OverlayTrigger
                placement="top"
                overlay={(p) => Popover(p, 'Now please autogenerate a garden based on your preferences, goals, and location. ')}
                show={showPopover && tutorialStep === 12}
            >
                <Button variant={'success'} onClick={() => {
                    if (tutorialStep === 12) nextTutorialStep();
                    setGrid(autoGenGarden.map(arr => arr.slice()));
                    setIsAutogen(true);
                    hardCodeWarningsGrid();
                }}>
                    Autogenerate a garden for me!
                </Button>
            </OverlayTrigger>
        </Container >
    )
}

const TopButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

const Legend = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 15px 0 30px;
`;

const LegendItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LegendIcon = styled.div`
    border-radius: 3px;
    height: 25px;
    width: 25px;
    margin-right: 5px;
`;

const BottomButtonsContainer = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const BottomButton = styled.button`
    background-color: #fff;
    padding: 5px;
    border-radius: 2px;
    border: none;
    
    :disabled {
        opacity: 0.4;
    }
`;

const PlantsSelectionsContainer = styled.div`
    display: flex;
    flex: 3;
    justify-content: flex-start;
    align-items: center;
    min-height: 100px;
`;

const GridSquare = styled.div`
    border: 1px solid black;
    height: 40px;
    width: 40px;
    padding: 0;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    };
`;

const GridRow = styled.div`
    margin: auto;
`;

const GridContainer = styled.div`
    margin: auto;
    border: 3px solid black;
    text-align: center;
`;

const PlantSelector = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-grow;
    margin: 10px auto 5px;
    border: 1px solid black;
    border-radius: 5px;
    min-height: 220px;
`;

const PlantOption = styled.div`
    text-align: center;
    border: 2px solid black;
    height: 100%;
    
    img {
        height: 90px;
        object-fit: cover;
    }
`;

const SelectorNavigationButton = styled.button`
    text-align: center;
    background-color: #28A745;
    border: none;

    :disabled {
        background-color: #868686
    }
`;

const PlantImage = styled.img`
    width: 100%;
    object-fit: cover;
`;

const Container = styled.div`
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
    text-align: center;
    overflow-y: scroll;
    height: 100%;
    padding-bottom: 24px;
`;

export default TwoDGrid;
