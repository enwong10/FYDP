import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import camera from '../assets/camera.svg'
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/ToolTip';
import Popover from 'react-bootstrap/Popover';
import React, {  useRef, useState } from "react";
import 'react-html5-camera-photo/build/css/index.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
function PlantIdentification () {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const renderTooltip = (props) => (
        <Popover id="overlay-example" {...props} 
                 style={{
                    backgroundColor: 'green',
                    color: 'white',
                    borderBlockColor: 'green',
                    borderRightColor: 'green',
                    borderTopColor: 'green',
                    borderBottomColor: 'green',
                    borderLeftColor: 'green',
                    caretColor: 'green',
                    stopColor: 'green',
                    floodColor: 'green',
                    forcedColorAdjust: 'green',
                    scrollbarColor: 'green',
                    ...props.style,
                  }}>
                  Upload Image From Camera Role
        </Popover>
      );
    return (
    // we need to attach actual naviagtation paths and add the back button image
        <MainContainer>
            <h1>
                Identificaiton
            </h1>
            <h2>
                Upload an image of a plant you would like to identify
            </h2>
            <MidSection>
            <div>
            <OverlayTrigger 
                target = {target.current}
                placement="top"
                delay={{ show: 250, hide: 400 }}
               // container = {target}
                overlay={renderTooltip}
                
             >
                 <Button ref={target} 
                style={{backgroundColor: "#28A745"}}
                onMouseEnter={() => setShow(!show)}
                onMouseLeave={() => setShow(!show)}
                onClick={() => navigate('/id-camera')}
                >
                 <text style={{color: '#FFFFFF'}}>
                 + Upload Image
                </text>
            </Button>
            </OverlayTrigger>
            </div>
                <div>
            <OverlayTrigger 
                target = {target.current}
                placement="top"
                delay={{ show: 250, hide: 400 }}
               // container = {target}
                overlay={renderTooltip}
                
             >
                 <Button ref={target} 
                style={{backgroundColor: "#28A745"}}
                onMouseEnter={() => setShow(!show)}
                onMouseLeave={() => setShow(!show)}
                onClick={() => navigate('/garden')}
                >
                 <text style={{color: '#FFFFFF'}}>
                 + Upload Image
                </text>
            </Button>
            </OverlayTrigger>
            </div>
            </MidSection>
            <Back>
            <div role='button' onClick={() => navigate('/garden')}> 
                        BackButton 
                </div>
            </Back>
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
    border: solid 1px gray;
    h1 {
        margin: 48px 0;
        font-size: 48px;
        color: black;
    }
    h2 {
        top: 130px;
        font-size: 12px;
    }
    
`

const Camera = styled.div`
    position: absolute;
    top: 200px;
    right: 250px;
    margin: 12px;
`
const MidSection = styled.div`
height: 10%;
width: 100%;
padding: 12px;
display: flex;
flex-direction: row;
padding: 8px; 
align-items: center;
align: center;
}
`
const Back = styled.div`
    position: absolute;
    background-color: #FFFFFF;
    top: 0px;
    right: 300px;
    padding: 12px;
    color: white;
`
const UploadImage = styled.div`
    position: absolute;
    top: 51%;
    left: 40%;
    margin: 12px;
`
export default PlantIdentification
