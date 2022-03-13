import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Popover from './Popover';
import React, { useContext, useEffect, useRef, useState } from "react";
import 'react-html5-camera-photo/build/css/index.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Context } from './Context';
import Button from 'react-bootstrap/Button';
import Camera from '../assets/camera.svg'
import { plantImageIdentifications } from './Constants';

import mockImage from '../assets/Flower 2.jpeg';

const api_key = '2b10189SmpQJ3XHmESgf2Hz9k'

function PlantIdentification() {
    const { tutorialStep, setTutorialStep, nextTutorialStep, setSelectedPlantIndex } = useContext(Context);
    const [showPopover, setShowPopover] = useState(false);
    const navigate = useNavigate();

    const inputFlower = useRef(null);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [response, setResponse] = useState("");
    const [showAPI, setShowAPI] = useState(false);

    useEffect(() => {
        if (tutorialStep > 0) setShowPopover(true)
    }, [tutorialStep])

    const onUploadFlower = () => {
        if (tutorialStep === 2 ) nextTutorialStep();

        if (inputFlower.current) {
            inputFlower.current.click();
        }
    };

    const onIdentify = async () => {
        if (tutorialStep === 3) nextTutorialStep();
        setShowAPI(true);

        // // POST request using fetch with async / await
        // const body = `{ "organs": "flower", "images": "${selectedFlower}" }`
        // // , "organs": "leaf", "images": "${selectedLeaves}"
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     body
        // };
        // //https://my-api.plantnet.org/v2/identify/all?api-key=
        // const response = await fetch(`https://my-api.plantnet.org/v2/identify/all?api-key=${api_key}`, requestOptions);
        // const data = await response.json();
        // setResponse(data);

        const sample_response = plantImageIdentifications[selectedFile]['results'];

        const styled_response = (
            sample_response.slice(0, 3).map((e,i) => (
                <ResultContainer key = {i} role='button' onClick={() => {
                    if (tutorialStep > 0) setTutorialStep(5);
                    setSelectedPlantIndex(1);
                    navigate('/dictionary');
                }}>
                    <UploadedImage src={mockImage} />
                    <span>
                        {e['species']['commonNames'][0]}
                    </span>
                    <span>
                        {e['score'].toFixed(4) * 100}%
                    </span>
                </ResultContainer>))
        );
        setResponse(styled_response);
  };

    //: ChangeEvent<HTMLInputElement>
    const handleFlowerChange = (event) => {
        if (event && event.target) {
            let input = event.target;
            var fReader = new FileReader();
            if (input.files) {
                setSelectedFile(input.files[0].name)
                fReader.readAsDataURL(input.files[0]);
                fReader.onloadend = (event) => {
                    if (event && event.target) {
                        //  as string
                        setSelectedFlower(event.target.result);
                        setShowAPI(false);
                    }
                }
            }
        }
    }

    return (
        <div style={{ overflow: 'auto' }}>
            <MainContainer>
                {selectedFlower !== null &&
                    <span style={{ width: '100%', margin: '12px 0px' }}>
                        Uploaded Image:
                    </span>
                }
                {selectedFlower !== null ? <UploadedImage src={selectedFlower ?? ""} /> : <TextContainer>Upload an image of a plant
                    you would like to identify</TextContainer>}
                <input type='file' id='file' ref={inputFlower} onChange={handleFlowerChange} style={{ display: 'none' }} accept="image/*" />
                <ButtonContainer>
                    <OverlayTrigger
                        placement="bottom"
                        show={showPopover && tutorialStep === 2}
                        overlay={(p) => Popover(p, 'To identify a plant, upload the image here! ')}>
                        <PrettyButton
                            onClick={onUploadFlower}>
                            <img src={Camera} style={{ margin: '0px 10px 3px 0px', height: '1.5rem' }} alt='camera' />
                            Upload Image
                        </PrettyButton>
                    </OverlayTrigger>

                    <OverlayTrigger

                        placement="top"
                        show={showPopover && tutorialStep === 3 && selectedFlower !== null && !showAPI}
                        overlay={(p) => Popover(p, 'Identify this plant')}>
                        <PrettyButton
                            onClick={onIdentify} style={{ display: selectedFlower !== null && !showAPI ? 'block' : 'none' }}
                        >
                            Identify
                        </PrettyButton>

                    </OverlayTrigger>


                </ButtonContainer>
                <span style={{ width: '100%', display: showAPI ? 'block' : 'none' }}>Results:</span>
                <OverlayTrigger
                    placement="top"
                    overlay={(p) => Popover(p, 'To see general information on this plant you can click it')}
                    show={showPopover && tutorialStep === 4}
                >
                    <div>
                        {showAPI &&
                            response}
                    </div>
                </OverlayTrigger>
            </MainContainer>
        </div>
    )
}

const UploadedImage = styled.img`
    width: 100%
`

const TextContainer = styled.span`
    margin: 20%;
    text-align: center;
`

const ButtonContainer = styled.div`
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    justify-content: center; //space-between;
    align-items: center;
    width: 100%;
`

const MainContainer = styled.div`
    max-width: 400px;
    // height: 100%;
    margin: 0px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    // overflow: scroll;
`

const PrettyButton = styled(Button)`
    box-shadow: none !important;
    color:  ${props => props.upload ? '#FFFF' : '#28A745'} !important;
    background-color: ${props => props.upload ? '#28A745' : '#FFFFFF'} !important;
    border: ${props => props.upload ? 'none' : '1px solid #28A745'} !important;
    border-color: transparent;

    margin: 1%;
    width: 48%;
    height: 2.5rem;
`

const ResultContainer = styled.div`
    background-color: black;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: space-between;
    color: white;
    margin: 10px 0px;
    padding: 10px;

    img {
        margin-bottom: 8px;
    }
`

export default PlantIdentification
