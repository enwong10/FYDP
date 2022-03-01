import React, { useContext } from "react";
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

function MainGarden() {
    const navigate = useNavigate();
    const { grid, background } = useContext(Context);

    const onDownloadClick = () => {
        const a = document.createElement("a");
        a.href = background;
        a.download = `greenthumb-garden-${(new Date()).toISOString()}.jpg`;
        a.click();
    }

    return (
        <MainContainer>
            <Settings role='button' onClick={() => navigate('/settings')}>
                <img src={settings} alt='settings' />
            </Settings>
            <Dictionary role='button' onClick={() => navigate('/dictionary')}>
                <img src={dictionary} alt='dictionary' />
            </Dictionary>
            {background && <Download role='button' onClick={onDownloadClick}>
                    <img src={download} alt='download' />
                </Download>}
            <MainGardenContainer>
                {!background ? <>
                    <img src={backgroundPlaceholder} alt='placeholder' />
                    {!grid ? <img src={gridPlaceholder} alt='placeholder' /> : <img src={garden} alt='grid' />}
                </> : <img src={background} alt='background' />}
            </MainGardenContainer>
            <Footer>
                <div>
                    <div role='button' onClick={() => navigate('/2d-grid')}>
                        <img src={add} alt='2d-grid' />
                    </div>
                    <div role='button' onClick={() => navigate('/3d-grid')}>
                        <img src={camera} alt='3d-grid' />
                    </div>
                    <div role='button' onClick={() => navigate('/identification')}>
                        <img src={info} alt='plant-identification' />
                    </div>
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
    right: 0;
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
