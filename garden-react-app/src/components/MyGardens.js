import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import garden from '../assets/backyard.jpg';
import grandma from '../assets/grandma_garden.jpg';
import del from '../assets/delete.svg';

function MyGardens() {
    // const navigate = useNavigate();
    // const onButtonClick = () => {
    //     navigate('/3d-grid');
    // }

    const navigate = useNavigate();


    const GardenPreview = ({ background = null, title }) => (
        <GardenPreviewContainer>
            <div>
                {background ? <img src={background} alt='garden' /> : <DefaultImage>{title}</DefaultImage>}
                <div className="m-3">
                    <h3>{title}</h3>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-success" onClick={() => navigate('/garden')}>
                            Go to garden
                        </button>
                        <img src={del} alt='delete' />
                    </div>
                </div>
            </div>
        </GardenPreviewContainer>
    )

    return (
        <GardensContainer>
            <h1>
                My Gardens
            </h1>
            <button
                className="btn btn-success mb-4"
                onClick={() => navigate('/initial-setup')}
            >
                + Design a new garden
            </button>
            <div>
                <GardenPreview background={garden} title="Backyard" />
                <GardenPreview background={grandma} title="Grandma's House" />
            </div>
            {/* <Button onClick={onButtonClick}>
                View 3D Preview
            </Button> */}
        </GardensContainer>
    )
}


const GardensContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: auto;
    padding: 0px 12px;

    h1 {
        margin: 48px 0;
        font-size: 48px;
    }

    button {
        width: 80%;
        max-width: 400px;
    }

    > div {
        width: 100%;
        
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const GardenPreviewContainer = styled.div`
    width: 100%;
    padding-top: 80%;
    position: relative;
    margin: 18px 0;
    border: solid 1px gray;
    overflow: hidden;

    @media (min-width: 768px) {
        width: 100%;
        height: 400px;
        padding-top: 0%;
    }

    > div {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
           
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        
        > img {
            flex: 1;
            object-fit: cover;
        }
    }
`

const DefaultImage = styled.div`
    width: 100%;
    height: 100%;
    background: gray;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
`

export default MyGardens;
