import React, { useContext, useRef, useState } from "react";
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
import Tooltip from 'react-bootstrap/ToolTip';
import Popover from 'react-bootstrap/Popover';
import 'react-html5-camera-photo/build/css/index.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function MainGarden() {
    const navigate = useNavigate();
    const { grid, background } = useContext(Context);
    const [show, setShow] = useState(false);
    const target = useRef(null);
    
    const renderSettingsPop = (props) => (
        <Popover id="settings-pop" {...props} 
                 style={{
                    backgroundColor: 'green',
                    color: 'white',
                    ...props.style,
                  }}>
                  Change User Settings
        </Popover>
      );
      const renderDictionaryPop = (props) => (
        <Popover id="dictionary-pop" {...props} 
                 style={{
                    backgroundColor: 'green',
                    color: 'white',
                    ...props.style,
                  }}>
                  Your Plants Page
        </Popover>
      );
      const renderIDPop = (props) => (
        <Popover id="id-pop" {...props} 
                 style={{
                    backgroundColor: 'green',
                    color: 'white',
                    ...props.style,
                  }}>
                  Plant Identification Page
        </Popover>
      );
      const renderAddPop = (props) => (
        <Popover id="add-pop" {...props} 
                 style={{
                    backgroundColor: 'green',
                    color: 'white',
                    ...props.style,
                  }}>
                  Add New Plants To Your Garden
        </Popover>
      );
      const render3DPop = (props) => (
        <Popover id="3d-pop" {...props} 
                 style={{
                    backgroundColor: 'green',
                    color: 'white',
                    ...props.style,
                  }}>
                  Use our 3D View!
        </Popover>
      );
      const renderDownloadPop = (props) => (
        <Popover id="down-pop" {...props} 
                 style={{
                    backgroundColor: 'green',
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
            
            <Settings>
                <OverlayTrigger 
                target = {target.current}
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderSettingsPop}>
                 <Button ref={target} 
                style={{backgroundColor: 'transparent', borderColor: "transparent"}}
                onMouseEnter={() => setShow(!show)}
                onMouseLeave={() => setShow(!show)}
                onClick={() => navigate('/settings')}
                >
                 <img src={settings} alt='settings' />
            </Button>
            </OverlayTrigger>
            </Settings>
            <Dictionary> 
            <OverlayTrigger 
                target = {target.current}
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderDictionaryPop}>
                 <Button ref={target} 
                style={{backgroundColor: 'transparent', borderColor: "transparent"}}
                onMouseEnter={() => setShow(!show)}
                onMouseLeave={() => setShow(!show)}
                onClick={() => navigate('/dictionary')}
                >
                 <img src={dictionary} alt='dictionary' />
            </Button>
            </OverlayTrigger>
            </Dictionary>
            {background &&       
            <Download> 
                
                <OverlayTrigger 
                target = {target.current}
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderDownloadPop}>
                 <Button ref={target} 
                style={{backgroundColor: 'transparent', borderColor: "transparent"}}
                onMouseEnter={() => setShow(!show)}
                onMouseLeave={() => setShow(!show)}
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
                target = {target.current}
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderAddPop}>
                    <div role='button' ref={target} 
                        style={{backgroundColor: 'transparent', borderColor: "transparent"}}
                        onMouseEnter={() => setShow(!show)}
                        onMouseLeave={() => setShow(!show)}
                        onClick={() => navigate('/2d-grid')}>
                        <img src={add} alt='2d-grid' />
                    </div>
                </OverlayTrigger>
                <OverlayTrigger 
                target = {target.current}
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={render3DPop}>
                    <div role='button' ref={target} 
                        style={{backgroundColor: 'transparent', borderColor: "transparent"}}
                        onMouseEnter={() => setShow(!show)}
                        onMouseLeave={() => setShow(!show)}
                        onClick={() => navigate('/3d-grid')}>
                        <img src={camera} alt='3d-grid' />
                    </div>
                </OverlayTrigger>
                <OverlayTrigger 
                target = {target.current}
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderIDPop}>
                    <div role='button' ref={target} 
                        style={{backgroundColor: 'transparent', borderColor: "transparent"}}
                        onMouseEnter={() => setShow(!show)}
                        onMouseLeave={() => setShow(!show)}
                        onClick={() => navigate('/identification')}>
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
