import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import camera from '../assets/camera.svg'
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import React, { useContext, useEffect, useState } from "react";
import 'react-html5-camera-photo/build/css/index.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Context } from './Context';
import back from '../assets/back.svg';
import flower from '../assets/Flower 2.jpeg';

function PlantIdentification() {
    const navigate = useNavigate();
    const { tutorialStep, nextTutorialStep } = useContext(Context);
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
        // we need to attach actual naviagtation paths and add the back button image
        <MainContainer>
            <Back>
                <div role='button' onClick={() => navigate('/garden')}>
                    <img src={back} alt='back'/>
                </div>
            </Back>
            <h1>
                Identification
            </h1>
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
                            style={{ backgroundColor: "#28A745" }}
                            onClick={() => {
                                nextTutorialStep();
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
            <ImageContainer1>
            <div>
                    <OverlayTrigger
                        placement="bottom"
                        show={show && tutorialStep === 3}
                        overlay={renderTooltip}
                    >
                        <Button
                            style={{ backgroundColor: "black" }}
                            onClick={() => {
                                nextTutorialStep();
                                // do something
                            }}
                        >
                            <span>
                            <img src={flower} width = "80%" height = "30%" />
                            </span>
                        </Button>
                    </OverlayTrigger>
                </div>
        </ImageContainer1>
        <ImageContainer2>
        <div>
                    <OverlayTrigger
                        placement="bottom"
                        //show={show && tutorialStep === 3}
                        overlay={renderTooltip}
                    >
                        <Button
                            style={{ backgroundColor: "black" }}
                            onClick={() => {
                               // nextTutorialStep();
                                // do something
                            }}
                        >
                            <span>
                            <img src={flower} width = "80%" height = "30%" />
                            </span>
                        </Button>
                    </OverlayTrigger>
                </div>
        </ImageContainer2>
        </MainContainer>
         

    )
}


const MainContainer = styled.div`
    position: relative;
    max-width: 400px;
    align-items: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: auto;
    overflow: hidden;
    h1 {
        margin: 48px 0;
        font-size: 48px;
        color: black;
    }
`
const ImageContainer1 = styled.div`
background-color: white;
height: 30%;
width: 80%;
padding: 12px;
`
const ImageContainer2 = styled.div`
background-color: white;
height: 30%;
width: 80%;
padding: 12px;
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

const Back = styled.div`
    position: absolute;
    background-color: #FFFFFF;
    top: 4px;
    left: 8px;
    padding: 12px;
    color: white;
`

export default PlantIdentification
