import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import add from '../assets/add.svg';
import camera from '../assets/camera.svg';
import info from '../assets/info.svg';
import gridPlaceholder from '../assets/3d_grid.png';
import garden from '../assets/3d_garden.PNG';
import backgroundPlaceholder from '../assets/background-placeholder.png';
import settings from '../assets/settings.svg';
import dictionary from '../assets/dictionary.svg';
import download from '../assets/download.svg';
import { Context } from "./Context";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Popover from 'react-bootstrap/Popover';
import 'react-html5-camera-photo/build/css/index.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function MainGarden() {
    const navigate = useNavigate();
    const { grid, background, tutorialStep, setTutorialStep, nextTutorialStep } = useContext(Context);
    const [showModal, setShowModal] = useState(false); 

    useEffect(() => {
        if (tutorialStep === -1) setShowModal(true);
    }, [tutorialStep])

    const renderSettingsPop = (props) => (
        <Popover id="settings-pop" {...props}
            style={{
                backgroundColor: '#28A745',
                borderColor: "black",
                color: 'white',
                ...props.style,
            }}>
            Change User Settings
        </Popover>
    );
    const renderDictionaryPop = (props) => (
        <Popover id="dictionary-pop" {...props}
            style={{
                backgroundColor: '#28A745',
                color: 'white',
                borderColor: "black",
                ...props.style,
            }}>
            Your Plants Page
        </Popover>
    );
    const renderIDPop = (props) => (
        <Popover id="id-pop" {...props} show={tutorialStep === 0}
            style={{
                backgroundColor: '#28A745',
                color: 'white',
                borderColor: "black",
                ...props.style,
            }}>
            Plant Identification Page
        </Popover>
    );
    const renderAddPop = (props) => (
        <Popover id="add-pop" {...props}
            style={{
                backgroundColor: '#28A745',
                color: 'white',
                borderColor: "black",
                ...props.style,
            }}>
            Add New Plants To Your Garden
        </Popover>
    );
    const render3DPop = (props) => (
        <Popover id="3d-pop" {...props}
            style={{
                backgroundColor: '#28A745',
                borderColor: "black",
                color: 'white',
                ...props.style,
            }}>
            Use our 3D View!
        </Popover>
    );
    const renderDownloadPop = (props) => (
        <Popover id="down-pop" {...props}
            style={{
                backgroundColor: '#28A745',
                borderColor: "black",
                color: 'white',
                ...props.style,
            }}>
            Download a JPEG of your Gareden!
        </Popover>
    );

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
                    <Button className='btn btn-danger' onClick={() => { setTutorialStep(0); setShowModal(false)}}>No</Button>
                </Modal.Footer>
            </Modal>
            <Settings>
                <OverlayTrigger
                    placement="bottom"
                    overlay={renderSettingsPop}
                    // show={tutorialStep === 6}
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
                    overlay={renderDictionaryPop}
                    // show={tutorialStep === 5}
                    >
                    <Button
                        style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                        onClick={() => navigate('/dictionary')}
                    >
                        <img src={dictionary} alt='dictionary' />
                    </Button>
                </OverlayTrigger>
            </Dictionary>
            {background &&
                <Download>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={renderDownloadPop}
                        // show={tutorialStep === 4}
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
                    {!grid ? <img src={gridPlaceholder} alt='placeholder' /> : <img src={garden} alt='grid' />}
                </> : <img src={background} alt='background' />}
            </MainGardenContainer>
            <Footer>
                <div>
                    <OverlayTrigger
                        placement="top"
                        overlay={renderAddPop}
                        show={tutorialStep === 7}
                        >
                        <div role='button'
                            style={{ backgroundColor: 'transparent', borderColor: "transparent", height: '50px', paddingTop: '5px' }}
                            onClick={() => navigate('/2d-grid')}>
                            <img src={add} alt='2d-grid' />
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={render3DPop}
                         show={tutorialStep === 11}
                        >
                        <div role='button'
                            style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                            onClick={() => navigate('/3d-grid')}>
                            <img src={camera} alt='3d-grid' />
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        show={tutorialStep === 1}
                        overlay={renderIDPop}
                    >
                        <div role='button'
                            style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                            onClick={() => {
                                if (tutorialStep === 1)setTutorialStep(2);
                                 navigate('/identification') }}>
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
