import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import camera from '../assets/camera.svg'
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import React, { useContext, useEffect, useState } from "react";
import 'react-html5-camera-photo/build/css/index.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Context } from './Context';
import flower from '../assets/Flower 2.jpeg';
import {TopNavBar} from "./TopNavBar";

function PlantIdentification() {
    const navigate = useNavigate();
    const { tutorialStep, nextTutorialStep, setTutorialStep } = useContext(Context);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (tutorialStep !== 0) setShow(true)
    }, [tutorialStep])

    const renderTooltip = (props) => (
        <Popover id="overlay-example" {...props}
            style={{
                backgroundColor: '#28A745',
                color: 'white',
                ...props.style,
            }}>
            Upload Image From Camera Role
        </Popover>
    );

    return (
        <MainContainer>
            <MidSection>
                <div>
                    <Button
                        style={{ backgroundColor: 'transparent', borderColor: "transparent" }}
                        onClick={() => navigate('/id-camera')}
                    >
                        <img src={camera} alt='3d-grid' />
                    </Button>
                </div>
                <div>
                    <OverlayTrigger
                        placement="bottom"
                        show={show && tutorialStep === 2}
                        overlay={renderTooltip}
                    >
                        <Button
                            style={{ backgroundColor: "#28A745", borderColor: "transparent" }}
                            onClick={() => {
                                if (tutorialStep === 2) setTutorialStep(3);
                                // do something
                            }}
                        >
                            <span style={{ color: '#FFFFFF' }}>
                                + Upload Image
                            </span>
                        </Button>
                    </OverlayTrigger>
                </div>

            </MidSection>
            <ImageContainer1 style={{ backgroundColor: "black", borderColor: "transparent" }}>
                <div>
                    <OverlayTrigger
                        placement="bottom"
                        show={show && tutorialStep === 3}
                        overlay={renderTooltip}
                    >
                        <Button
                            style={{ backgroundColor: "black", borderColor: "transparent" }}
                            onClick={() => {
                                if (tutorialStep === 3) setTutorialStep(4);
                                //navigate('/settings');
                            }}
                        >
                            <span>
                                <img src={flower} width="80%" height="30%" alt='plant' />
                            </span>
                        </Button>
                    </OverlayTrigger>
                </div>
                <div style={{ backgroundColor: "black", color: "white" }}>
                    Flower Name
                </div>
            </ImageContainer1>

            <div style={{ backgroundColor: "white", borderColor: "transparent", height: "5%" }}>

            </div>
            <ImageContainer2 style={{ backgroundColor: "black", borderColor: "transparent" }}>
                <div>
                    <OverlayTrigger
                        placement="bottom"
                        //show={show && tutorialStep === 4}
                        overlay={renderTooltip}
                    >
                        <Button
                            style={{ backgroundColor: "black", borderColor: "transparent" }}
                            onClick={() => {
                                // nextTutorialStep();
                                // do something
                            }}
                        >
                            <span>
                                <img src={flower} width="80%" height="30%" alt='plant' />
                            </span>
                        </Button>
                    </OverlayTrigger>
                </div>
                <div style={{ backgroundColor: "black", color: "white" }}>
                    Flower Name
                </div>
            </ImageContainer2>
        </MainContainer>
    )
}


const MainContainer = styled.div`
    max-width: 400px;
    align-items: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: auto;
    overflow: hidden;
`

const ImageContainer1 = styled.div`
background-color: black;
height: 29%;
width: 80%;
padding: 12px;
justify-content: space-between;
`
const ImageContainer2 = styled.div`
background-color: white;
height: 30%;
width: 80%;
padding: 12px;
justify-content: space-between;
`

const MidSection = styled.div`
    height: 10%;
    width: 100%;
    padding: 12px;
    display: flex;
    flex-direction: row;
    padding: 8px; 
    align-items: center;
    justify-content: center;
    top: 50%;
    right: 50%;
`

export default PlantIdentification
