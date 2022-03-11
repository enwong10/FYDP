import React, { useContext, useState } from "react";
import { Context, plantDictionary } from "./Context";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import styled from "styled-components";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import chevronRight from '../assets/chevron_right.svg';
import chevronLeft from '../assets/chevron_left.svg';
import undoIcon from '../assets/undo.svg';
import infoIcon from '../assets/info_square.svg';
import trashIcon from '../assets/trash.svg';
import toolsIcon from '../assets/tools.svg';
import { useNavigate } from "react-router-dom";
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
        if (mode !== INSIGHT && selectedPlant !== null) setSelectedPlant(null);
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
            {row.map((id, j) =>
                <GridSquare onClick={() => clickedGrid(i, j)} key={'col' + j} className={'col'}>
                    {id !== null &&
                        <img src={plantDictionary[id].imageUrl} alt="" />
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
                <div role="button" onClick={undo} style={{marginRight: '30px'}}>
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
            <BottomButtonsContainer>
                <BottomButton onClick={() => toggleAlternateMode(INSIGHT)}
                              style={{backgroundColor: interactionMode === INSIGHT && '#28A745'}}>
                    <img src={infoIcon} />
                </BottomButton>
                <BottomButton onClick={() => toggleAlternateMode(MOVE)}
                              style={{backgroundColor: interactionMode === MOVE && '#28A745'}}>
                    <img src={toolsIcon} />
                </BottomButton>
                <BottomButton onClick={() => toggleAlternateMode(REMOVE)}
                              style={{backgroundColor: interactionMode === REMOVE && '#28A745'}}>
                    <img src={trashIcon} />
                </BottomButton>
            </BottomButtonsContainer>
            <Legend>
                <LegendItem>
                    <LegendIcon style={{backgroundColor: '#007BFF'}}/>
                    Ideal
                </LegendItem>
                <LegendItem>
                    <LegendIcon style={{backgroundColor: '#977B16'}}/>
                    Warning
                </LegendItem>
                <LegendItem>
                    <LegendIcon style={{backgroundColor: '#D83535'}}/>
                    Conflict
                </LegendItem>
            </Legend>
            <Button variant={'success'}>
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
    margin-bottom: 30px;
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
    margin: 10px 0 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const BottomButton = styled.button`
    background-color: #fff;
    padding: 5px;
    border-radius: 2px;
    border: none;
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
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    };
`

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
    border: 2px solid black;
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
`;

export default TwoDGrid;
