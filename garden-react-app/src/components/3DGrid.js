import React, { useState, createRef, useContext } from "react";
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import garden from '../assets/3d_garden.PNG';
import 'react-html5-camera-photo/build/css/index.css';
import html2canvas from 'html2canvas'
import { Context } from "./Context";
import {TopNavBar} from "./TopNavBar";

function ARGrid() {
    const ref = createRef(null);
    const [screenshot, setScreenshot] = useState(null);
    const navigate = useNavigate();
    const { setBackground, tutorialStep, nextTutorialStep } = useContext(Context)
    const takeScreenShot = (node) => {
        html2canvas(node)
          .then((canvas) => {
            const croppedCanvas = document.createElement('canvas')
            const croppedCanvasContext = croppedCanvas.getContext('2d')
            // init data
            const cropPositionTop = 0
            const cropPositionLeft = 0
            // weird bug causing canvas width / height to be greater than it actually is
            const cropWidth = canvas.width - 3
            const cropHeight = canvas.height - 3

            croppedCanvas.width = cropWidth
            croppedCanvas.height = cropHeight

            croppedCanvasContext.drawImage(
              canvas,
              cropPositionLeft,
              cropPositionTop,
            )

            const base64Image = croppedCanvas.toDataURL()

            setScreenshot(base64Image)
            return base64Image
          })
      }

    // mobile height trick (https://css-tricks.com/the-trick-to-viewport-units-on-mobile/)
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const handleTakePhoto = () => {
        document.getElementById('container-circles').style.display = "none";
        takeScreenShot(ref.current)
    }

    const onSaveScreenshot = () => {
        if (!screenshot) return;
        if (tutorialStep === 14) nextTutorialStep();
        setBackground(screenshot);
        navigate('/garden');
    }

    return (
        <Container>
            {!screenshot ?
            <CameraContainer ref={ref}>
                <Camera onTakePhoto={handleTakePhoto} idealFacingMode={FACING_MODES.ENVIRONMENT} isImageMirror={false} isMaxResolution/>
                <GardenOverlay src={garden} alt='garden'/>
                </CameraContainer>
                :
            <>
            <Screenshot src={screenshot} alt='screenshot'/>
            <ActionsContainer>
                <button className='btn btn-danger' onClick={() => navigate('/garden')}>Exit Without Saving</button>
                <button className='btn btn-primary' onClick={() => setScreenshot(null)}>Take Again</button>
                <button className='btn btn-success' onClick={onSaveScreenshot}>Save and Exit</button>
            </ActionsContainer>
            </>
            }
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    justify-content: center;
    align-items: center;
    text-align: center;
    background: white;
`

const CameraContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 133%;
    background: white;
    overflow: hidden;
    
    .react-html5-camera-photo {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        img, video {
            width: 200vw;
        }
    }
`

const Screenshot = styled.img`
    width: 100vw;
    object-fit: contain;
`

const ActionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    button {
        margin: 10px;
    }
`

const GardenOverlay = styled.img`
    position: absolute;
    width: 100%;
    height: 70%;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 0;
`

export default ARGrid;
