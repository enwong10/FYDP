import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Modal, OverlayTrigger } from 'react-bootstrap';
import styled from "styled-components";
import { Context } from "./Context";
import { defaultGrid } from './Constants';
import Popover from './Popover';
// css
import 'react-html5-camera-photo/build/css/index.css';
// imgs
import add from '../assets/add.svg';
import camera from '../assets/camera.svg';
import info from '../assets/info.svg';
import gridPlaceholder from '../assets/3d_grid.png';
import garden from '../assets/3d_garden.PNG';
import backgroundPlaceholder from '../assets/background-placeholder.png';
import settings from '../assets/settings.svg';
import dictionary from '../assets/dictionary.svg';
import download from '../assets/download.svg';
import myGardensIcon from '../assets/person_lines_icon.svg';

function MainGarden() {
    const navigate = useNavigate();
    const { grid, background, tutorialStep, setTutorialStep, nextTutorialStep } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [showPopover, setShowPopover] = useState(false);

    useEffect(() => {
        if (tutorialStep === -1 || tutorialStep === 15) setShowModal(true);
        if (tutorialStep > 0) setShowPopover(true)
    }, [tutorialStep])


    const onDownloadClick = () => {
        const a = document.createElement("a");
        a.href = background;
        a.download = `greenthumb-garden-${(new Date()).toISOString()}.jpg`;
        a.click();
    }

    return (
        <MainContainer>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{tutorialStep === -1 ? 'Walkthrough?' : 'Walkthrough Complete'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-left">
                        {tutorialStep === -1 ? 'Would you like to participate in the app walkthrough?' : "Congrats! You've successfully completed the walkthrough tutorial"}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className='btn btn-success'
                        onClick={() => {
                            tutorialStep === -1 && setTutorialStep(1);
                            tutorialStep === 15 && nextTutorialStep();
                            setShowModal(false);
                        }}
                    >
                        {tutorialStep === -1 ? 'Yes' : 'Finish'}
                    </Button>
                    {tutorialStep === -1 && <Button className='btn btn-danger' onClick={() => { setTutorialStep(0); setShowModal(false) }}>No</Button>}
                </Modal.Footer>
            </Modal>
            <MyGardensButton>
                <Button
                    style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                    onClick={() => navigate('/my-gardens')}
                >
                    <img src={myGardensIcon} alt='my gardens' />
                </Button>
            </MyGardensButton>
            <Settings>
                <Button
                    style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                    onClick={() => navigate('/settings')}
                >
                    <img src={settings} alt='settings' />
                </Button>
            </Settings>
            <Dictionary>
                <Button
                    style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                    onClick={() => navigate('/my-plants')}
                >
                    <img src={dictionary} alt='dictionary' />
                </Button>
            </Dictionary>
            {background &&
                <Download>
                    <Button
                        style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                        onClick={() => onDownloadClick()}
                    >
                        <img src={download} alt='download' />
                    </Button>
                </Download>}

            <MainGardenContainer>
                {!background ? <>
                    <img src={backgroundPlaceholder} alt='placeholder' />
                    {grid === defaultGrid ? <img src={gridPlaceholder} alt='placeholder' /> : <img src={garden} alt='grid' />}
                </> : <img src={background} alt='background' />}
            </MainGardenContainer>
            <Footer>
                <div>
                    <OverlayTrigger
                        placement="top"
                        overlay={(p) => Popover(p, 'Now lets add some new plants to your garden!')}
                        show={showPopover && tutorialStep === 8}
                    >
                        <Button
                            style={{ backgroundColor: 'transparent', borderColor: "transparent", height: '50px', paddingTop: '5px', marginLeft: '-10px' }}
                            onClick={() => {
                                if (tutorialStep === 8) nextTutorialStep();
                                navigate('/2d-grid')
                            }}>
                            <img src={add} alt='2d-grid' />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={(p) => Popover(p, 'To visualize your garden you can use our 3D camera view!')}
                        show={showPopover && tutorialStep === 14}
                    >
                        <div role='button'
                            style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                            onClick={() => { if (tutorialStep === 14) nextTutorialStep(); navigate('/3d-grid') }}>
                            <img src={camera} alt='3d-grid' />
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        show={showPopover && tutorialStep === 1}
                        overlay={(p) => Popover(p, 'To begin, navigate to the plant identification section.')}
                    >
                        <div role='button'
                            style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                            onClick={() => {
                                if (tutorialStep === 1) nextTutorialStep();
                                navigate('/identification')
                            }}>
                            <img src={info} alt='plant-identification' />
                        </div>
                    </OverlayTrigger>
                </div>
            </Footer>
        </MainContainer>
    )
}

export default MainGarden;

const MainContainer = styled.div`
    position: relative;
    max-width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
    overflow: hidden;
`

const MainGardenContainer = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    img {
        width: 100%;
    }
`

const Settings = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px 0;
`

const Dictionary = styled.div`
    position: absolute;
    top: 45px;
    right: 0px;
    padding: 8px 0;
`

const MyGardensButton = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 8px 0;
`

const Download = styled.div`
    position: absolute;
    top: 90px;
    right: 0;
    padding: 8px 0;
`

const Footer = styled.div`
    background-color: #343A40;
    height: 10%;
    width: 100%;
    padding: 12px;

    > div {
        width: 100%;
        height: 100%;
        background: #28A745;
        border-radius: 5px;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 8px; 
        align-items: center;
    }
`
