import React, { useState, createRef, useEffect } from "react";
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import { useScreenshot, createFileName } from 'use-react-screenshot'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import garden from '../assets/3d_garden.PNG';
import 'react-html5-camera-photo/build/css/index.css';

function ARGrid() {
    const ref = createRef(null);
    const [image, takeScreenshot] = useScreenshot();
    const [screenshot, setScreenshot] = useState(null);
    const navigate = useNavigate();

    // mobile height trick (https://css-tricks.com/the-trick-to-viewport-units-on-mobile/)
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    useEffect(() => {
        if (image) setScreenshot(image)
    }, [image])

    const handleTakePhoto = () => {
        document.getElementById('container-circles').style.display = "none";
        takeScreenshot(ref.current)
    }

    const onDownloadScreenshot = () => {
        if (!screenshot) return;
        const a = document.createElement("a");
        a.href = screenshot;
        a.download = createFileName('jpg', `greenthumb-garden-${(new Date()).toISOString()}`);
        a.click();
        navigate('/my-gardens');
    }

    return (
        <Container ref={ref}>
            {!screenshot ? 
            <div className="position-relative">
                <Camera onTakePhoto={handleTakePhoto} idealFacingMode={FACING_MODES.ENVIRONMENT} isImageMirror={false}/> 
                <GardenOverlay src={garden} alt='garden'/>
                </div>
                : 
            <>
            <Screenshot src={screenshot} alt='screenshot'/>
            <ActionsContainer>
                <button class='btn btn-primary' onClick={() => setScreenshot(null)}>Take Again</button>
                <button class='btn btn-success' onClick={onDownloadScreenshot}>Save and Exit</button>
                <button class='btn btn-danger' onClick={() => navigate('/my-gardens')}>Exit Without Saving</button>
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
    width: 100vw;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    justify-content: center;
    align-items: center;
    text-align: center;
    background: black;
`

const Screenshot = styled.img`
    height: 90%;
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
