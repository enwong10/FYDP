import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import plant from '../assets/plant.jpeg';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import 'react-html5-camera-photo/build/css/index.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Context, plantDictionary } from "./Context";
import Modal from 'react-bootstrap/Modal';

function PlantDictionary() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const { tutorialStep, setTutorialStep, selectedPlantIndex } = useContext(Context);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (tutorialStep !== 0) setShow(true)
    }, [tutorialStep])

    const renderGrow = (props) => (
        <Popover id="grow-pop" {...props}
            style={{
                backgroundColor: '#28A745',
                borderColor: "black",
                color: 'white',
                ...props.style,
            }}>
            To see its growing information, select this tab.
        </Popover>
    );
    const renderPersonal = (props) => (
        <Popover id="personal-pop" {...props}
            style={{
                backgroundColor: '#28A745',
                borderColor: "black",
                color: 'white',
                ...props.style,
            }}>
            Or to see how this flower best suits you, open this tab.
        </Popover>
    );


    return (
        <MainContainer>
            <PageSelectorContainer>
                <div role='button'
                    onClick={() => setPage(1)}
                    style={{ background: page === 1 ? '#198754' : 'white', color: page === 1 ? 'white' : 'black'}}>
                        GENERAL
                        </div>
                <OverlayTrigger
                    placement="bottom"
                    overlay={renderGrow}
                    show={tutorialStep === 4}
                >
                    <div role='button'
                        style={{ background: page === 2 ? '#198754' : 'white', color: page === 2 ? 'white' : 'black'}}
                        onClick={() => {
                            if (tutorialStep === 4) setTutorialStep(5);
                            setPage(2);
                        }}
                    >
                        GROWING
                    </div>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    overlay={renderPersonal}
                    show={tutorialStep === 5}
                >
                    <div
                        role="button"
                        style={{ background: page === 3 ? '#198754' : 'white', color: page === 3 ? 'white' : 'black'}}
                        onClick={() => {
                            if (tutorialStep === 5) setTutorialStep(6);
                            setPage(3);
                        }}
                    >
                        PERSONAL
                    </div>
                </OverlayTrigger>
                <Modal show={tutorialStep === 6} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Walkthrough?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-left">
                            Would you like to continue the walkthrough? To continue click okay and navigate back to the home page.
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className='btn btn-success'
                            onClick={() => {
                                setTutorialStep(7);
                                setShowModal(false);
                            }}
                        >
                            Continue
                        </Button>
                        <Button className='btn btn-danger' onClick={() => { setTutorialStep(0); setShowModal(false) }}>Exit</Button>
                    </Modal.Footer>
                </Modal>
            </PageSelectorContainer>
            {page === 1 &&
                <PageContentContainer>
                    <ImageContainer>
                        <img src={plant} alt='plant' />
                    </ImageContainer>
                    <InformationContainer>
                        <div>
                            <div>
                                <span>Vernacular Name: </span>
                                <span>{plantDictionary[selectedPlantIndex].vernacularName}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Scientific Name: </span>
                                <span>{plantDictionary[selectedPlantIndex].scientificName}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Occurrance Status: </span>
                                <span>{plantDictionary[selectedPlantIndex].occurranceStatus}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Locality: </span>
                                <span>{plantDictionary[selectedPlantIndex].locality}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Establishment Means: </span>
                                <span>{plantDictionary[selectedPlantIndex].establishmentMeans}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Lifespan: </span>
                                <span>{plantDictionary[selectedPlantIndex].lifespan}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Grows in Sun/Shade: </span>
                                <span>{plantDictionary[selectedPlantIndex].growthSunShade}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Height: </span>
                                <span>{plantDictionary[selectedPlantIndex].height}</span>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='mb-2'>Description</div>
                            <div>
                                <ul>
                                    {plantDictionary[selectedPlantIndex].description.map((a) => (
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
                                <span>Amount of Water: </span>
                                <span>{plantDictionary[selectedPlantIndex].waterAmount}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Preferred Soil Type: </span>
                                <span>{plantDictionary[selectedPlantIndex].soilType}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Spacing: </span>
                                <span>{plantDictionary[selectedPlantIndex].spacing}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Seed Depth: </span>
                                <span>{plantDictionary[selectedPlantIndex].seedDepth}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Planting Time: </span>
                                <span>{plantDictionary[selectedPlantIndex].plantingTime}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Stalking: </span>
                                <span>{plantDictionary[selectedPlantIndex].stalking}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Amount of Sunlight: </span>
                                <span>{plantDictionary[selectedPlantIndex].sunlightAmount}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Mulch: </span>
                                <span>{plantDictionary[selectedPlantIndex].mulch}</span>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='mb-2'>Additional Information</div>
                            <div className="d-flex flex-column">
                                {plantDictionary[selectedPlantIndex].additionalInformation.map((a) => (
                                    <span key={a}>{a}</span>
                                ))}
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
                                    <span>Location</span>
                                    <span>Time</span>
                                    <span>Bees</span>
                                    <span>Cost</span>
                                </div>
                                <div className='d-flex flex-column'>
                                    <span>{plantDictionary[selectedPlantIndex].prosLocation}</span>
                                    <span>{plantDictionary[selectedPlantIndex].prosTime}</span>
                                    <span>{plantDictionary[selectedPlantIndex].prosBees}</span>
                                    <span>{plantDictionary[selectedPlantIndex].prosCost}</span>
                                </div>
                            </div>
                        </div>
                    </ProsConsContentContainer>
                    <ProsConsContentContainer style={{ backgroundColor: '#977B16' }}>
                        <div>
                            <h2>Cons</h2>
                            <div className='d-flex flex-row'>
                                <div className='d-flex flex-column'>
                                    <span>Animals</span>
                                    <span>Children</span>
                                </div>
                                <div className='d-flex flex-column'>
                                    <span>{plantDictionary[selectedPlantIndex].consAnimals}</span>
                                    <span>{plantDictionary[selectedPlantIndex].consChildren}</span>
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 18px;
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

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
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
