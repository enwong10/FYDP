import React, { useContext, useState } from "react";
import styled from "styled-components";
import upIcon from '../assets/up.svg';
import downIcon from '../assets/down.svg';
import { useNavigate } from "react-router-dom";
import { Context, plantDictionary } from "./Context";

function MyPlants() {
    const navigate = useNavigate();
    const [isAccordionCollapsed, setIsAccordionCollapsed] = useState(false);
    const { grid, setSelectedPlant } = useContext(Context)
    const plantsCategory = ['Trees', 'Flowers', 'Food', 'Ground Covers', 'Shrubs', 'Fungus', 'Bee Support'];

    const listOfPlants = grid.flat().filter((v, i, a) => a.indexOf(v) === i);
    console.log(listOfPlants)
    console.log(plantDictionary)

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
                <div className='w-100 mb-3'>
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
                        <div className='d-flex flex-row flex-wrap justify-content-start'>
                            {listOfPlants.map((a) => (
                                <>
                                {a !== null && <PlantPreviewContainer role='button' onClick={() => {setSelectedPlant(a); navigate('/dictionary')}}>
                                    <img src={plantDictionary[a].imageUrl} alt='plant'/>
                                    <div>{plantDictionary[a].name}</div>
                                </PlantPreviewContainer>}
                                </>
                            ))}
                        </div>}
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

const PlantPreviewContainer = styled.div`
    position: relative;
    width: 30%;
    height: 0px;
    padding-top: 30%;
    border: 2px solid black;
    margin-bottom: 5%;
    margin-right: 3%;
    overflow: hidden;

    img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
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
