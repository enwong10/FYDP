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

function MainGarden() {
    const navigate = useNavigate();
    const { grid, background, tutorialStep, setTutorialStep } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [showPopover, setShowPopover] = useState(false);

    useEffect(() => {
        if (tutorialStep === -1) setShowModal(true);
    }, [tutorialStep])

    useEffect(() => {
        if (tutorialStep !== 0) setShowPopover(true)
    }, [])

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
                    <Modal.Title>Walkthrough?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-left">
                        Would you like to participate in the app walkthrough?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className='btn btn-success'
                        onClick={() => {
                            setTutorialStep(1);
                            setShowModal(false);
                        }}
                    >
                        Yes
                    </Button>
                    <Button className='btn btn-danger' onClick={() => { setTutorialStep(0); setShowModal(false) }}>No</Button>
                </Modal.Footer>
            </Modal>
            <Settings>
                <OverlayTrigger
                    placement="bottom"
                    overlay={(p) => Popover(p, 'Change User Settings')}
                // show={showPopover && tutorialStep === 6}
                >
                    <Button
                        style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                        onClick={() => navigate('/settings')}
                    >
                        <img src={settings} alt='settings' />
                    </Button>
                </OverlayTrigger>
            </Settings>
            <Dictionary>
                <OverlayTrigger
                    placement="bottom"
                    overlay={(p) => Popover(p, 'Your Plants Page')}
                // show={showPopover && tutorialStep === 5}
                >
                    <Button
                        style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                        onClick={() => navigate('/my-plants')}
                    >
                        <img src={dictionary} alt='dictionary' />
                    </Button>
                </OverlayTrigger>
            </Dictionary>
            {background &&
                <Download>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={(p) => Popover(p, 'Download a JPEG of your Garden!')}
                    // show={showPopover && tutorialStep === 4}
                    >
                        <Button
                            style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                            onClick={() => onDownloadClick()}
                        >
                            <img src={download} alt='download' />
                        </Button>
                    </OverlayTrigger>
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
                        overlay={(p) => Popover(p, 'Add New Plants To Your Garden')}
                        show={showPopover && tutorialStep === 7}
                    >
                        <Button
                            style={{ backgroundColor: 'transparent', borderColor: "transparent", height: '50px', paddingTop: '5px', marginLeft: '-10px' }}
                            onClick={() => {
                                if (tutorialStep === 7) setTutorialStep(8);
                                navigate('/2d-grid')
                            }}>
                            <img src={add} alt='2d-grid' />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={(p) => Popover(p, 'Use our 3D View!')}
                        show={showPopover && tutorialStep === 11}
                    >
                        <div role='button'
                            style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                            onClick={() => navigate('/3d-grid')}>
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
                                if (tutorialStep === 1) setTutorialStep(2);
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
    height: 100vh;
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
    margin: 12px;
`

const Dictionary = styled.div`
    position: absolute;
    top: 36px;
    right: 0px;
    margin: 12px;
`

const Download = styled.div`
    position: absolute;
    top: 72px;
    right: 0;
    margin: 12px;
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

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 8px; 
        align-items: center;
    }
`
