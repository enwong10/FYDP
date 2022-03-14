import React, { useContext, useState } from "react";
import styled from "styled-components";
import upIcon from '../assets/up.svg';
import downIcon from '../assets/down.svg';
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import plantDb from './PlantDb'

function MyPlants() {
    const navigate = useNavigate();
    const [isAccordionCollapsed, setIsAccordionCollapsed] = useState(false);
    const { grid, setSelectedPlantIndex } = useContext(Context)
    const plantsCategory = ['Trees', 'Flowers', 'Food', 'Ground Covers', 'Shrubs', 'Fungus', 'Bee Support'];

    const listOfPlants = grid.flat().filter((v, i, a) => a.indexOf(v) === i);

    return (
        <MainContainer>
            <input type='text' className="w-100 mt-4" placeholder="Find New Plants" readOnly />
            <LegendContainer>
                <div>
                    <LegendColor style={{ backgroundColor: '#007BFF' }} />
                    Ideal
                </div>
                <div>
                    <LegendColor style={{ backgroundColor: '#977B16' }} />
                    Warning
                </div>
                <div>
                    <LegendColor style={{ backgroundColor: '#D83535' }} />
                    Conflict
                </div>
            </LegendContainer>
            <div style={{ overflow: 'auto', width: '100%' }}>
            {plantsCategory.map((cat) => (
                <div key={cat} className='w-100 mb-3'>
                    {cat !== 'Flowers' ?
                        <>
                            <h3>{cat} (0)</h3>
                        </> :
                        <>
                        <div role='button' className='d-flex flex-row align-items-center' onClick={() => setIsAccordionCollapsed(!isAccordionCollapsed)} >
                            <h3>{cat} ({listOfPlants.length - 1})</h3>
                            <img className="mx-2" src={isAccordionCollapsed ? downIcon : upIcon} alt='expand/collapse'/>
                        </div>
                        {!isAccordionCollapsed && listOfPlants.length > 0 &&
                        <PlantPreviewFlexBox>
                            {listOfPlants.map((a) => (
                                a !== null &&
                                <div key={a}>
                                    <PlantPreviewContainer role='button' onClick={() => {setSelectedPlantIndex(a); navigate('/dictionary')}}>
                                        <img src={plantDb[a].imageUrl} alt='plant'/>
                                        <div>{plantDb[a].commonNames[0]}</div>
                                    </PlantPreviewContainer>
                                </div>
                            ))}
                        </PlantPreviewFlexBox>}
                        </>
                        }
                </div>
            ))}
        </div>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 400px;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px;
`

const LegendContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 24px 0;

    > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
    }
`

const LegendColor = styled.div`
    height: 16px;
    width: 16px;
    border-radius: 4px;
    margin-right: 4px;
`

const PlantPreviewFlexBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
`;

const PlantPreviewContainer = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    border: 2px solid black;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    div {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;

        background-color: #007BFF;
        opacity: 0.9;
        color: white;
        text-align: center;
    }
`

export default MyPlants;
