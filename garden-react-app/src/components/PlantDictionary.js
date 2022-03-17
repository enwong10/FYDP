import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import 'react-html5-camera-photo/build/css/index.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Context } from "./Context";
import plantDb from './PlantDb';
import Popover from "./Popover";

import plusSquare from '../assets/plus_square.svg';
import trashIcon from '../assets/trash.svg';

function PlantDictionary() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const { tutorialStep, selectedPlantIndex, nextTutorialStep, myPlants, setMyPlants } = useContext(Context);
    const [showPopover, setShowPopover] = useState(false);

    useEffect(() => {
        if (tutorialStep > 0) setShowPopover(true)
    }, [tutorialStep])

    return (
        <MainContainer>
            <PageSelectorContainer>
                <div role='button'
                    onClick={() => setPage(1)}
                    style={{ background: page === 1 ? '#198754' : 'white', color: page === 1 ? 'white' : 'black' }}>
                    GENERAL
                </div>
                <OverlayTrigger
                    placement="bottom"
                    overlay={(p) => Popover(p, 'To see its growing information, select this tab')}
                    show={showPopover && tutorialStep === 5}
                >
                    <div role='button'
                        style={{ background: page === 2 ? '#198754' : 'white', color: page === 2 ? 'white' : 'black' }}
                        onClick={() => {
                            if (tutorialStep === 5) nextTutorialStep();
                            setPage(2);
                        }}
                    >
                        GROWING
                    </div>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={(p) => Popover(p, 'Or to see how this flower best suits you, open this tab')}
                    show={showPopover && tutorialStep === 6}
                >
                    <div
                        role="button"
                        style={{ background: page === 3 ? '#198754' : 'white', color: page === 3 ? 'white' : 'black' }}
                        onClick={() => {
                            if (tutorialStep === 6) nextTutorialStep();
                            setPage(3);
                        }}
                    >
                        PERSONAL
                    </div>
                </OverlayTrigger>

            </PageSelectorContainer>
            {page === 1 &&
                <PageContentContainer>
                    <ImageContainer>
                        <img src={plantDb[selectedPlantIndex].imageUrl} alt='plant' />
                        {myPlants.includes(selectedPlantIndex) ?
                            <div style={{backgroundColor: '#CA3E3E'}} onClick={
                                ()=>{
                                    const newMyPlants = [...myPlants].filter((value) => {
                                        return value !== selectedPlantIndex;
                                    });
                                    setMyPlants(newMyPlants);
                                }}
                            ><img src={trashIcon} alt='delete' /></div>
                             :
                            <div style={{backgroundColor: '#007BFF'}} onClick={
                                ()=>{
                                    const newMyPlants = [...myPlants];
                                    newMyPlants.push(selectedPlantIndex);
                                    setMyPlants(newMyPlants);
                                }}
                            ><img src={plusSquare} alt='add' /></div>
                        }
                    </ImageContainer>
                    <InformationContainer>
                        <div>
                            <div>
                                <span style={{ marginRight: '10px' }}>Common Names: </span>
                                <span>{plantDb[selectedPlantIndex].commonNames.join(', ')}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Scientific Name: </span>
                                <span>{plantDb[selectedPlantIndex].scientificName}</span>
                            </div>
                        </div>
                        {/* <div>
                            <div>
                                <span>Occurrance Status: </span>
                                <span>{plantDb[selectedPlantIndex].occurranceStatus}</span>
                            </div>
                        </div> */}
                        <div>
                            <div>
                                <span>Locality: </span>
                                <span>{plantDb[selectedPlantIndex].localities.join(', ')}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Establishment Means: </span>
                                <span>{plantDb[selectedPlantIndex].establishmentMeans}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Lifespan: </span>
                                <span>{plantDb[selectedPlantIndex].lifespan}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Height: </span>
                                <span>{plantDb[selectedPlantIndex].height}</span>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='mb-2'>Description</div>
                            <div>
                                <ul>
                                    {plantDb[selectedPlantIndex].description.map((a) => (
                                        <li key={a}>{a}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </InformationContainer>
                </PageContentContainer>
            }
            {page === 2 &&
                <PageContentContainer>
                    <InformationContainer>
                        <div>
                            <div>
                                <span>Light Requirements: </span>
                                <span>{plantDb[selectedPlantIndex].lightRequirements.join(', ')}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Amount of Water: </span>
                                <span>{plantDb[selectedPlantIndex].waterAmount}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Soil Moisture: </span>
                                <span>{plantDb[selectedPlantIndex].soilMoisture.join(', ')}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Spacing: </span>
                                <span>{plantDb[selectedPlantIndex].spacing}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Seed Depth: </span>
                                <span>{plantDb[selectedPlantIndex].seedDepth}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Planting Time: </span>
                                <span>{plantDb[selectedPlantIndex].plantingTime}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Blooms: </span>
                                <span>{plantDb[selectedPlantIndex].blooms.join(', ')}</span>
                            </div>
                        </div>

                        <div>
                            <div>
                                <span>Spacing: </span>
                                <span>{plantDb[selectedPlantIndex].spacing}</span>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='mb-2'>Condition Comments</div>
                            <div className="d-flex flex-column">
                                <span>
                                    {plantDb[selectedPlantIndex].conditionComments}
                                </span>
                            </div>
                        </div>
                    </InformationContainer>
                </PageContentContainer>
            }
            {page === 3 &&
                <PageContentContainer>
                    <ProsConsContentContainer>
                        <div>
                            <h2>Pros</h2>
                            <div className='d-flex flex-row'>
                                <div className='d-flex flex-column'>
                                    {plantDb[selectedPlantIndex].pros.map(e =>
                                        <span>{e.name}</span>
                                    )}
                                </div>
                                <div className='d-flex flex-column'>
                                    {plantDb[selectedPlantIndex].pros.map(e =>
                                        <span>{e.state}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ProsConsContentContainer>
                    <ProsConsContentContainer style={{ backgroundColor: '#977B16' }}>
                        <div>
                            <h2>Cons</h2>
                            <div className='d-flex flex-row'>
                                <div className='d-flex flex-column'>
                                    {plantDb[selectedPlantIndex].cons.map(e =>
                                        <span>{e.name}</span>
                                    )}
                                </div>
                                <div className='d-flex flex-column'>
                                    {plantDb[selectedPlantIndex].cons.map(e =>
                                        <span>{e.state}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ProsConsContentContainer>
                    <ProsConsInstructionContainer>
                        <span>The listed attributes are all aspects of gardenering that you have selected as important to you within Settings. </span>
                        <span>The score represents the plant’s alignment to your preferences, with best to worst in the following order: Excellent, Good, Poor, Awful </span>
                        <span>Your preferences can be editted at any time from the Settings page.</span>
                        <button className="btn btn-success mt-2" onClick={() => navigate('/settings')}>Edit Preferences in Settings</button>
                    </ProsConsInstructionContainer>
                </PageContentContainer>
            }
        </MainContainer>
    )
}

export default PlantDictionary


const MainContainer = styled.div`
    position: relative;
    max-width: 400px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    // padding: 18px;
`

const PageSelectorContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: .25rem;
    overflow: hidden;
    margin: 8px 0;

    > div {
        flex: 1;
        min-height: 38px;
        height: 100%;
        border: 1px solid black;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    > div:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: none;
    }
    > div:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-left: none;
    }
`

const PageContentContainer = styled.div`
    overflow: auto;
    flex: 1;
`

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 75%;

    >img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    div {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0;
        right: 0;
        width: 60px;
        height: 60px;
        
        img {
            height: 75%;
            width: 75%;
        }
    }
`

const InformationContainer = styled.div`
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 4px 8px;
    }

    > div:nth-child(odd) {
        background: #9D9D9D;
        padding: 8px;

        > div {
            background-color: #343A40;
            color: white;
        }
    }

    > div:nth-child(even), div:last-child {
        background: #6C757D;
        padding: 8px;

        > div {
            background-color: #E3E3E3;
            color: black;
        }
    }

    > div:last-child {
        display: flex;
        flex-direction: column;

        ul {
            margin-bottom: 0;
        }
    }
`

const ProsConsContentContainer = styled.div`
    background-color: #007BFF;
    padding: 8px;
    margin-bottom: 8px;

    > div {
        background-color: #E3E3E3;
        padding: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div {
            flex: 1;
            padding: 0 18px;
            width: 100%;

            > div:first-child {
                span {
                    text-align: right;
                }
            }
        }
    }
`

const ProsConsInstructionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 18px;

    span {
        text-align: center;
        margin-bottom: 18px;
    }
`
