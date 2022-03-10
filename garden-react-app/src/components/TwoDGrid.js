import React, { useContext, useEffect, useState } from "react";
import {Context} from "./Context";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import styled from "styled-components";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import plant from '../assets/plant.jpeg';
import chevronRight from '../assets/chevron_right.svg';
import chevronLeft from '../assets/chevron_left.svg';
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
    const navigate = useNavigate();
    const [interactionMode, setInteractionMode] = useState(INSPECTION);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [firstPlantChoiceIndex, setfirstPlantChoiceIndex] = useState(0);
    const [plantGroup, setPlantGroup] = useState(PLANT_GROUPS[0]);
    const [history, setHistory] = useState(grid);

    // Functions //

    const updateGrid = (i, j) => {
        if (interactionMode === ADDITION) {
            const newGrid = [...grid];
            newGrid[i][j] = selectedPlant;
            setGrid(newGrid);
        }
        else if (interactionMode === REMOVE) {
            const newGrid = [...grid];
            newGrid[i][j] = null;
            setGrid(newGrid);
        }
        else if (interactionMode === INSPECTION) {
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
            // TODO: open dictionary
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

    // JSX Pieces //

    const displayGrid = grid.map((row, i) =>
        <GridRow key={'row' + i} className={'row'}>
            {row.map((gridContent, j) =>
                <GridSquare onClick={() => updateGrid(i, j)} key={'col' + j} className={'col'}>
                    {gridContent}
                </GridSquare>
            )}
        </GridRow>
    );

    return(
        <Container>
            <div>
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
            </div>
            <PlantSelector className={'row'}>
                <SelectorNavigationButton className={'col'} style={{borderRadius: '5px 0 0 5px'}}
                  onClick={() => updateFirstPlantIndex(-3)}
                  style={{backgroundColor: firstPlantChoiceIndex === 0 ? "#868686" : "#28A745"}}>
                    <img src={chevronLeft} />
                </SelectorNavigationButton>
                {[...Array(3)].map((x,i) =>
                    <PlantOption style={{border: selectedPlant === firstPlantChoiceIndex + i ? "2px dashed #28A745": ""}}
                                 onClick={() => toggleAdditionMode(firstPlantChoiceIndex + i)} className={'col-3'}>
                        <PlantImage src={plant} />
                        <div>Plant {firstPlantChoiceIndex + i}</div>
                        <hr />
                    </PlantOption>
                )}
                <SelectorNavigationButton className={'col'} style={{borderRadius: '0 5px 5px 0'}}
                  onClick={() => updateFirstPlantIndex(3)}>
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
        </Container>
    )
}

const TopButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GridSquare = styled.div`
    border: 1px solid black;
    height: 40px;
    width: 40px;
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
    margin: 20px auto;
    border: 1px solid black;
    border-radius: 5px;
`;

const PlantOption = styled.div`
    text-align: center;
    border: 1px solid black;
`;

const SelectorNavigationButton = styled.div`
    width: 10px;
    text-align: center;
    background-color: #28A745;
    display: flex;
    justify-content: center;
    align-items: center;
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
