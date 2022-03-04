import React, { useContext} from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import camera from '../assets/camera.svg'
function PlantIdentification () {

    const navigate = useNavigate();
    
    return (
    // we need to attach actual naviagtation paths and add the back button image
        <MainContainer>
            <h1>
                Identificaiton
            </h1>
            <h2>
                Upload an image of a plant you would like to identify
            </h2>
            <Header style={{ color: 'white' }}>
                <div role='button' onClick={() => navigate('/settings')}>
                        + Upload Picture
                </div>
            </Header>
            <Camera>
            <div role='button' onClick={() => navigate('/id-camera')}>
                        <img src={camera} alt='3d-grid' />
                    </div>
            </Camera>
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
const Header = styled.div`
    position: absolute;
    background-color: #28A745;
    top: 209px;
    right: 100px;
    padding: 12px;
    border-radius: 10px;
`
const Back = styled.div`
    position: absolute;
    background-color: #FFFFFF;
    top: 0px;
    right: 300px;
    padding: 12px;
    color: white;
`
export default PlantIdentification
