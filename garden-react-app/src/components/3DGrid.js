import React, { useState, createRef, useEffect } from "react";
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import { useScreenshot, createFileName } from 'use-react-screenshot'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import garden from '../assets/3d_garden.PNG';
import 'react-html5-camera-photo/build/css/index.css';

function ARGrid() {
    const ref = createRef(null);
    const [image, takeScreenshot] = useScreenshot();
    const [screenshot, setScreenshot] = useState(null);
    const navigate = useNavigate();

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
            <>
                <Camera onTakePhoto={handleTakePhoto} idealFacingMode={FACING_MODES.ENVIRONMENT} isFullscreen /> 
                <GardenOverlay src={garden} alt='garden'/>
                </>
                : 
            <>
            <Screenshot src={screenshot} alt='screenshot'/>
            <ActionsContainer>
                <Button onClick={() => setScreenshot(null)}>Take Again</Button>
                <Button class='btn btn-success' onClick={onDownloadScreenshot}>Save and Exit</Button>
                <Button class='btn btn-danger' onClick={() => navigate('/my-gardens')}>Exit Without Saving</Button>
            </ActionsContainer>
            </>
            }
            {/* <Camera onTakePhoto={handleTakePhoto} idealFacingMode={FACING_MODES.ENVIRONMENT} isFullscreen /> */}
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
`

const Screenshot = styled.img`
    width: 100%;
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
    width: 50%;
    height: 50%;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 10%;
`

export default ARGrid;
