import React, { useContext, useState } from "react";
import { Context } from "./Context";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import styled from "styled-components";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import plantDb from './PlantDb'
import {autoGenGarden} from './Constants'
import SWAlgorithm from "./SWAlgorithm";
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

const PLANT_GROUPS = [
    "Plants in Garden",
    "Saved Plants",
    "Save the Bees",
    "Flowers",
    "Trees",
    "Food",
    "Shrubs",
    "Ground Covers",
    "Fungi"
];

function TwoDGrid() {
    const { grid, setGrid, history, setHistory, setSelectedPlantIndex } = useContext(Context);
    const navigate = useNavigate();
    const [interactionMode, setInteractionMode] = useState(INSPECTION);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [firstPlantChoiceIndex, setfirstPlantChoiceIndex] = useState(0);
    const [plantGroup, setPlantGroup] = useState(PLANT_GROUPS[0]);
    const [movingPlant, setMovingPlant] = useState(null);
    const [warningsGrid, setWarningsGrid] = useState(SWAlgorithm(grid));

    // Functions //

    const modifyGrid = (i, j, newValue) => {
        const newGrid = [...grid];
        setHistory([...history, { i, j, value: newGrid[i][j] }]);
        newGrid[i][j] = newValue;
        setGrid(newGrid);
    };

    const modifyMultipleGrid = (squares) => {
        const newGrid = [...grid];
        const historyArray = [];
        squares.forEach(({i, j, newValue}) => {
            historyArray.push({ i, j, value: newGrid[i][j] });
            newGrid[i][j] = newValue;
        });
        setHistory([...history, historyArray]);
        setGrid(newGrid);
    };

    const clickedGrid = (i, j) => {
        if (interactionMode === ADDITION) {
            modifyGrid(i, j, selectedPlant)
        }
        else if (interactionMode === REMOVE) {
            modifyGrid(i, j, null)
        }
        else if (interactionMode === INSPECTION) {
            if (grid[i][j] !== null) {
                setSelectedPlantIndex(grid[i][j]);
                navigate('/dictionary');
            }
        }
        else if (interactionMode === INSIGHT) {
            // TODO: Enable tooltips
        }
        else if (interactionMode === MOVE) {
            if (!movingPlant) {
                if (grid[i][j] !== null) setMovingPlant({i, j});
            }
            else if (i === movingPlant.i && j === movingPlant.j) {
                setMovingPlant(null);
            }
            else {
                const newGrid = [...grid];
                modifyMultipleGrid([
                    {i, j, newValue: newGrid[movingPlant.i][movingPlant.j]},
                    {i: movingPlant.i, j: movingPlant.j, newValue: null}
                ]);
                setMovingPlant(null);
            }
        }
    };

    const toggleAdditionMode = (plantIndex) => {
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
                console.log(lastState);
                lastState.forEach(({i, j, value}) => {
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
                <GridSquare onClick={() => clickedGrid(i, j)} key={'col' + j} className={'col'}
                    style={{
                        backgroundColor:
                            warningsGrid[i][j] && (
                            'warning' in warningsGrid[i][j] && warningsGrid[i][j].warning ? '#977B16' :
                            'suggestions' in warningsGrid[i][j] && warningsGrid[i][j].suggestions ? '#007BFF' :
                            '')
                    }}
                >
                    {id !== null &&
                        <img src={plantDb[id].imageUrl} alt=""
                             style={{opacity: movingPlant?.i === i && movingPlant?.j === j ? '0.5' : '1'}}
                        />
                    }
                </GridSquare>
            )}
        </GridRow>
    );

    return (
        <Container>
            <TopButtons>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {plantGroup}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {PLANT_GROUPS.map((groupName, i) =>
                            <Dropdown.Item onClick={() => setPlantGroup(groupName)}>{groupName}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </TopButtons>
            <PlantSelector>
                <SelectorNavigationButton
                    onClick={() => updateFirstPlantIndex(-3)}
                    disabled={firstPlantChoiceIndex === 0}
                    style={{borderRadius: '4px 0 0 4px'}}>
                    <img src={chevronLeft} />
                </SelectorNavigationButton>
                <PlantsSelectionsContainer>
                    {plantDb.slice(firstPlantChoiceIndex, firstPlantChoiceIndex + 3).map((x, i) =>
                        <PlantOption style={{ border: selectedPlant === firstPlantChoiceIndex + i ? "2px dashed #28A745" : "" }}
                            onClick={() => toggleAdditionMode(firstPlantChoiceIndex + i)}
                            onContextMenu={(e) => rightClickNavigate(e, x.id)}
                                     className={'col-4'}
                        >
                            <PlantImage src={x.imageUrl} />
                            <div>{x.commonNames[0]}</div>
                        </PlantOption>
                    )}
                </PlantsSelectionsContainer>
                <SelectorNavigationButton
                    onClick={() => updateFirstPlantIndex(3)}
                    disabled={firstPlantChoiceIndex + 3 > plantDb.length}
                    style={{borderRadius: '0 4px 4px 0'}}>
                    <img src={chevronRight} />
                </SelectorNavigationButton>
            </PlantSelector>
            <BottomButtonsContainer>
                <BottomButton onClick={() => toggleAlternateMode(INSIGHT)} disabled={selectedPlant === null}
                              style={{ backgroundColor: interactionMode === INSIGHT && '#28A745' }}>
                    <img src={infoIcon} />
                </BottomButton>
                <BottomButton onClick={() => toggleAlternateMode(MOVE)}
                              style={{ backgroundColor: interactionMode === MOVE && '#28A745' }}>
                    <img src={toolsIcon} />
                </BottomButton>
                <BottomButton onClick={() => toggleAlternateMode(REMOVE)}
                              style={{ backgroundColor: interactionMode === REMOVE && '#28A745' }}>
                    <img src={trashIcon} />
                </BottomButton>
                <BottomButton onClick={undo}>
                    <img src={undoIcon} />
                </BottomButton>
            </BottomButtonsContainer>
            <GridContainer>
                <TransformWrapper>
                    <TransformComponent>
                        {displayGrid}
                    </TransformComponent>
                </TransformWrapper>
            </GridContainer>
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
            <Button variant={'success'} onClick={() => setGrid(autoGenGarden.map(arr => arr.slice()))}>
                Autogenerate a garden for me!
            </Button>
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
`;

const PlantOption = styled.div`
    text-align: center;
    border: 2px solid black;
    
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
`;

export default TwoDGrid;
