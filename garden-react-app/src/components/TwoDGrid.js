import React, { useContext, useEffect, useState } from "react";
import { Context, plantDictionary } from "./Context";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import styled from "styled-components";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import plant from '../assets/plant.jpeg';
import chevronRight from '../assets/chevron_right.svg';
import chevronLeft from '../assets/chevron_left.svg';
import undoIcon from '../assets/undo.svg';
import {useNavigate} from "react-router-dom";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


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
    const { grid, setGrid } = useContext(Context);
    const { history, setHistory } = useContext(Context);
    const navigate = useNavigate();
    const [interactionMode, setInteractionMode] = useState(INSPECTION);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [firstPlantChoiceIndex, setfirstPlantChoiceIndex] = useState(0);
    const [plantGroup, setPlantGroup] = useState(PLANT_GROUPS[0]);

    // Functions //

    const modifyGrid = (i, j, newValue) => {
        const newGrid = [...grid];
        setHistory([...history, { i, j, value: newGrid[i][j] }]);
        newGrid[i][j] = newValue;
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
            if (grid[i][j] !== null)
                navigate('/dictionary');
        }
        else if (interactionMode === INSIGHT) {
            // TODO: Enable tooltips
        }
        else if (interactionMode === MOVE) {
            // TODO: Enable moving
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
        if (selectedPlant) setSelectedPlant(null);
        setInteractionMode(mode);
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
            newGrid[lastState.i][lastState.j] = lastState.value;
            setGrid(newGrid);
            setHistory(newHistory);
        }
    };

    // JSX Pieces //

    const displayGrid = grid.map((row, i) =>
        <GridRow key={'row' + i} className={'row'}>
            {row.map((gridContent, j) =>
                <GridSquare onClick={() => clickedGrid(i, j)} key={'col' + j} className={'col'}>
                    {gridContent}
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
                <div role="button" onClick={undo}>
                    <img src={undoIcon} />
                </div>
            </TopButtons>
            <PlantSelector>
                <SelectorNavigationButton
                    onClick={() => updateFirstPlantIndex(-3)}
                    disabled={firstPlantChoiceIndex === 0}>
                    <img src={chevronLeft} />
                </SelectorNavigationButton>
                <PlantsSelectionsContainer>
                    {plantDictionary.slice(firstPlantChoiceIndex, firstPlantChoiceIndex + 3).map((x, i) =>
                        <PlantOption style={{ border: selectedPlant === firstPlantChoiceIndex + i ? "2px dashed #28A745" : "" }}
                            onClick={() => toggleAdditionMode(firstPlantChoiceIndex + i)} className={'col-3'}>
                            <PlantImage src={x.imageUrl} />
                            <div>{x.commonNames[0]}</div>
                        </PlantOption>
                    )}
                </PlantsSelectionsContainer>
                <SelectorNavigationButton
                    onClick={() => updateFirstPlantIndex(3)}
                    disabled={firstPlantChoiceIndex + 3 > plantDictionary.length}>
                    <img src={chevronRight} />
                </SelectorNavigationButton>
            </PlantSelector>
            <GridContainer>
                <TransformWrapper>
                    <TransformComponent>
                        {displayGrid}
                    </TransformComponent>
                </TransformWrapper>
            </GridContainer>
            <ButtonGroup>
                <Button onClick={() => toggleAlternateMode(INSIGHT)}>
                    Insight
                </Button>
                <Button onClick={() => toggleAlternateMode(MOVE)}>
                    Move
                </Button>
                <Button onClick={() => toggleAlternateMode(REMOVE)}>
                    Remove
                </Button>
            </ButtonGroup>
        </Container >
    )
}

const TopButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

const PlantsSelectionsContainer = styled.div`
    display: flex;
    flex: 5;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const GridSquare = styled.div`
    border: 1px solid black;
    height: 40px;
    width: 40px;
    padding: 0;
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
    margin: 10px auto;
    border: 1px solid black;
    border-radius: 5px;
`;

const PlantOption = styled.div`
    text-align: center;
    width: 33.3333333333%;
    border: 1px solid black;
`;

const SelectorNavigationButton = styled.button`
    flex: 1;
    text-align: center;
    background-color: #28A745;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: #28A745;

    :disabled {
        background-color: #868686
    }
`;

const PlantImage = styled.img`
    width: 100%;
`;

const Container = styled.div`
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}
`;

export default TwoDGrid;
