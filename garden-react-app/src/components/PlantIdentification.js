import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import PrettyButton from './PrettyButton';
import Popover from 'react-bootstrap/Popover';
import React, { useContext, useEffect, useRef, useState } from "react";
import 'react-html5-camera-photo/build/css/index.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Context } from './Context';

const api_key = '2b10189SmpQJ3XHmESgf2Hz9k'

function PlantIdentification() {
    // const navigate = useNavigate();
    const { tutorialStep, _, setTutorialStep } = useContext(Context);
    const [show, setShow] = useState(false);

    const inputFlower = useRef(null);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [response, setResponse] = useState("");
    const [showAPI, setShowAPI] = useState(false);

    useEffect(() => {
        if (tutorialStep !== 0) setShow(true)
    }, [tutorialStep])

    const onUploadFlower = () => {
        if (tutorialStep === 2) setTutorialStep(3);

        if (inputFlower.current) {
            inputFlower.current.click();
        }
    };

    const onIdentify = async () => {
        setShowAPI(true);

        // POST request using fetch with async / await
        const body = `{ "organs": "flower", "images": "${selectedFlower}" }`
        // , "organs": "leaf", "images": "${selectedLeaves}"
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body
        };
        //https://my-api.plantnet.org/v2/identify/all?api-key=
        const response = await fetch(`https://my-api.plantnet.org/v2/identify/all?api-key=${api_key}`, requestOptions);
        const data = await response.json();
        // setResponse(data);
        setResponse("hello");

        console.log(response)
    };

    //: ChangeEvent<HTMLInputElement>
    const handleFlowerChange = (event) => {
        if (event && event.target) {
            let input = event.target;
            var fReader = new FileReader();
            if (input.files) {
                fReader.readAsDataURL(input.files[0]);
                fReader.onloadend = (event) => {
                    if (event && event.target) {
                        //  as string
                        setSelectedFlower(event.target.result);
                    }
                }
            }
        }
    }

    const renderTooltip = (props) => (
        <Popover id="overlay-example" {...props}
            style={{
                backgroundColor: '#28A745',
                color: 'white',
                ...props.style,
            }
            }>
            Upload Image From Camera Roll
        </Popover>
    );

    return (
        <MainContainer>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                {selectedFlower !== null && <img style={{ margin: "1em" }} src={selectedFlower ?? ""} className="App-logo" alt="logo" />}
                <input type='file' id='file' ref={inputFlower} onChange={handleFlowerChange} style={{ display: 'none' }} accept="image/*" />
                <OverlayTrigger
                    placement="bottom"
                    show={show && tutorialStep === 2}
                    overlay={renderTooltip}
                >
                    <PrettyButton
                        onClick={onUploadFlower}
                        content="Choose an Image" />
                </OverlayTrigger>
                <PrettyButton onClick={onIdentify} content="Identify" />

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "flex-start"
                }}>
                    {showAPI && response}
                </div>
            </div>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    max-width: 400px;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    height: 100vh;
    display: flex;
    margin: auto;
    overflow: hidden;
`

export default PlantIdentification
