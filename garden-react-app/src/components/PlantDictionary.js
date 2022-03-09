import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import plant from '../assets/plant.jpeg';

const MOCK_PLANT = {
    vernacularName: 'White Trillium',
    scientificName: 'Trillium grandiflorum',
    occurranceStatus: 'Present',
    locality: 'Southern Ontario, Canada',
    establishmentMeans: 'Natural, Non-invasive',
    lifespan: 'Perennial',
    growthSunShade: 'Shade',
    height: '20-50 cm',
    description: ['White Trillium is the provincial flower of Ontario', 'It has large white three-petalled flower above a whorl of 3 leaves.'],
    waterAmount: '10 oz per week',
    soilType: 'Brunisolic, Acidic',
    spacing: '6 to 12 inches',
    seedDepth: '2 to 4 inches',
    plantingTime: 'Early Spring/Late Summer',
    stalking: 'No',
    sunlightAmount: 'Moderate',
    mulch: '3 to 5 cm in fall',
    additionalInformation: ["Trimming: After flowering, let the seeds form. There's no need to cut back the plant in the forest. It will naturally yellow and disappear by midsummer. In the shade garden, if you want a tidier look, wait until the leaves start dying back before cutting the foliage to the ground.", "Fertilizing: Usually the decaying leaves from deciduous trees provide the perfect growing medium for trillium. To enhance the growth in areas where leaves blow away or in a shade garden, each fall add a 1- to 2-inch thick layer of compost or leaf mulch to the planting area."],
    prosLocation: 'Good',
    prosTime: 'Excellent',
    prosBees: 'Good',
    prosCost: 'Excellent',
    consAnimals: 'Awful',
    consChildren: 'Poor',
}

function PlantDictionary() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    return (
        <MainContainer>
            <PageSelectorContainer>
                <button className="btn" onClick={() => setPage(1)} style={{ background: page === 1 ? '#198754' : 'white', color: page === 1 ? 'white' : 'black' }}>GENERAL</button>
                <button className="btn" onClick={() => setPage(2)} style={{ background: page === 2 ? '#198754' : 'white', color: page === 2 ? 'white' : 'black', borderLeft: '1px solid black', borderRight: '1px solid black' }}>GROWING</button>
                <button className="btn" onClick={() => setPage(3)} style={{ background: page === 3 ? '#198754' : 'white', color: page === 3 ? 'white' : 'black' }}>PERSONAL</button>
            </PageSelectorContainer>
            {page === 1 &&
                <PageContentContainer>
                    <ImageContainer>
                        <img src={plant} alt='plant' />
                    </ImageContainer>
                    <InformationContainer>
                        <div>
                            <div>
                                <span>Vernacular Name: </span>
                                <span>{MOCK_PLANT.vernacularName}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Scientific Name: </span>
                                <span>{MOCK_PLANT.scientificName}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Occurrance Status: </span>
                                <span>{MOCK_PLANT.occurranceStatus}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Locality: </span>
                                <span>{MOCK_PLANT.locality}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Establishment Means: </span>
                                <span>{MOCK_PLANT.establishmentMeans}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Lifespan: </span>
                                <span>{MOCK_PLANT.lifespan}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Grows in Sun/Shade: </span>
                                <span>{MOCK_PLANT.growthSunShade}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Height: </span>
                                <span>{MOCK_PLANT.height}</span>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='mb-2'>Description</div>
                            <div>
                                <ul>
                                    {MOCK_PLANT.description.map((a) => (
                                        <li key={a}>{a}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </InformationContainer>
                </PageContentContainer>
            }
            {page === 2 &&
                <PageContentContainer>
                    <InformationContainer>
                        <div>
                            <div>
                                <span>Amount of Water: </span>
                                <span>{MOCK_PLANT.waterAmount}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Preferred Soil Type: </span>
                                <span>{MOCK_PLANT.soilType}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Spacing: </span>
                                <span>{MOCK_PLANT.spacing}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Seed Depth: </span>
                                <span>{MOCK_PLANT.seedDepth}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Planting Time: </span>
                                <span>{MOCK_PLANT.plantingTime}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Stalking: </span>
                                <span>{MOCK_PLANT.stalking}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Amount of Sunlight: </span>
                                <span>{MOCK_PLANT.sunlightAmount}</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>Mulch: </span>
                                <span>{MOCK_PLANT.mulch}</span>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='mb-2'>Additional Information</div>
                            <div className="d-flex flex-column">
                                {MOCK_PLANT.additionalInformation.map((a) => (
                                    <span key={a}>{a}</span>
                                ))}
                            </div>
                        </div>
                    </InformationContainer>
                </PageContentContainer>
            }
            {page === 3 &&
                <PageContentContainer>
                    <ProsConsContentContainer>
                        <div>
                            <h2>Pros</h2>
                            <div className='d-flex flex-row'>
                                <div className='d-flex flex-column'>
                                    <span>Location</span>
                                    <span>Time</span>
                                    <span>Bees</span>
                                    <span>Cost</span>
                                </div>
                                <div className='d-flex flex-column'>
                                    <span>{MOCK_PLANT.prosLocation}</span>
                                    <span>{MOCK_PLANT.prosTime}</span>
                                    <span>{MOCK_PLANT.prosBees}</span>
                                    <span>{MOCK_PLANT.prosCost}</span>
                                </div>
                            </div>
                        </div>
                    </ProsConsContentContainer>
                    <ProsConsContentContainer style={{ backgroundColor: '#977B16' }}>
                        <div>
                            <h2>Cons</h2>
                            <div className='d-flex flex-row'>
                                <div className='d-flex flex-column'>
                                    <span>Animals</span>
                                    <span>Children</span>
                                </div>
                                <div className='d-flex flex-column'>
                                    <span>{MOCK_PLANT.consAnimals}</span>
                                    <span>{MOCK_PLANT.consChildren}</span>
                                </div>
                            </div>
                        </div>
                    </ProsConsContentContainer>
                    <ProsConsInstructionContainer>
                        <span>The listed attributes are all aspects of gardenering that you have selected as important to you within Settings. </span>
                        <span>The score represents the plant’s alignment to your preferences, with best to worst in the following order: Excellent, Good, Poor, Awful </span>
                        <span>Your preferences can be editted at any time from the Settings page.</span>
                        <button className="btn btn-success mt-2" onClick={() => navigate('/settings')}>Edit Preferences in Settings</button>
                    </ProsConsInstructionContainer>
                </PageContentContainer>
            }
        </MainContainer>
    )
}

export default PlantDictionary


const MainContainer = styled.div`
    position: relative;
    max-width: 400px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 18px;
`

const PageSelectorContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: .25rem;
    overflow: hidden;
    margin: 8px 0;

    button {
        box-shadow: none !important;
        flex: 1;
        border-radius: 0;
        min-height: 38px;
    }
`

const PageContentContainer = styled.div`
    overflow: auto;
    flex: 1;
`

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 75%;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const InformationContainer = styled.div`
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 4px 8px;
    }

    > div:nth-child(odd) {
        background: #9D9D9D;
        padding: 8px;

        > div {
            background-color: #343A40;
            color: white;
        }
    }

    > div:nth-child(even), div:last-child {
        background: #6C757D;
        padding: 8px;

        > div {
            background-color: #E3E3E3;
            color: black;
        }
    }

    > div:last-child {
        display: flex;
        flex-direction: column;

        ul {
            margin-bottom: 0;
        }
    }
`

const ProsConsContentContainer = styled.div`
    background-color: #007BFF;
    padding: 8px;
    margin-bottom: 8px;

    > div {
        background-color: #E3E3E3;
        padding: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div {
            flex: 1;
            padding: 0 18px;
            width: 100%;

            > div:first-child {
                span {
                    text-align: right;
                }
            }
        }
    }
`

const ProsConsInstructionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 18px;

    span {
        text-align: center;
        margin-bottom: 18px;
    }
`
