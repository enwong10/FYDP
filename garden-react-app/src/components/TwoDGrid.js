import React, {useContext, useState} from 'react';
import {Context} from "./Context";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import styled from "styled-components";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap"
import plant from '../assets/plant.jpeg'

const INSPECTION = 0;
const ADDITION = 1;
const INSIGHT = 2;
const MOVE = 3;
const REMOVE = 4;

function TwoDGrid() {
    const { grid, setGrid } = useContext(Context);
    const [interactionMode, setInteractionMode] = useState(INSPECTION);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [firstPlantChoiceIndex, setfirstPlantChoiceIndex] = useState(0);

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
            // TODO: open dictionary
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

    const displayGrid = grid.map((row, i) =>
        <GridRow key={'row' + i} className={'row'}>
            {row.map((gridContent, j) =>
                <GridSquare onClick={() => updateGrid(i, j)} key={'col' + j} className={'col'}>
                    {gridContent}
                </GridSquare>
            )}
        </GridRow>
    );

    const plantSelector = (
        <PlantSelector className={'row'}>
            <SelectorNavigationButton className={'col'} style={{borderRadius: '5px 0 0 5px'}}
                                      onClick={() => updateFirstPlantIndex(-3)}>
                P
            </SelectorNavigationButton>
            {[...Array(3)].map((x,i) =>
                <PlantOption style={{border: selectedPlant === firstPlantChoiceIndex + i ? "2px dashed #28A745": ""}}
                             onClick={() => toggleAdditionMode(firstPlantChoiceIndex + i)} className={'col-3'}>
                    <PlantImage src={plant} />
                    <div>Plant {firstPlantChoiceIndex + i}</div>
                </PlantOption>
            )}
            <SelectorNavigationButton className={'col'} style={{borderRadius: '0 5px 5px 0'}}
                                      onClick={() => updateFirstPlantIndex(3)}>
                N
            </SelectorNavigationButton>
        </PlantSelector>
    );

    const gridButtons = (
        <ButtonGroup>
            <Button onClick={() => toggleAlternateMode(INSIGHT)}>
                Insight
            </Button>
            <Button onClick={() => toggleAlternateMode(MOVE)}>
                MOVE
            </Button>
            <Button onClick={() => toggleAlternateMode(REMOVE)}>
                Remove
            </Button>
        </ButtonGroup>
    );

    return(
        <Container className={'container'}>
            <Dropdown></Dropdown>
            {plantSelector}
            <GridContainer>
                <TransformWrapper>
                    <TransformComponent>
                        {displayGrid}
                    </TransformComponent>
                </TransformWrapper>
            </GridContainer>
            {gridButtons}
        </Container>
    )
}

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

const Container = styled.div`
    margin:auto;
    max-width: 400px;
`;

const PlantSelector = styled.div`
    margin:auto;
    margin-top: 50px;
    margin-bottom:20px;
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
`;

const PlantImage = styled.img`
    width: 100%;
`;

export default TwoDGrid;
