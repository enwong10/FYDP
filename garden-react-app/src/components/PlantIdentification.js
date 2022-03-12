import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Popover from './Popover';
import React, { useContext, useEffect, useRef, useState } from "react";
import 'react-html5-camera-photo/build/css/index.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Context } from './Context';
import Button from 'react-bootstrap/Button';
import Camera from '../assets/camera.svg'

import mockImage from '../assets/Flower 2.jpeg';

const api_key = '2b10189SmpQJ3XHmESgf2Hz9k'

const identifications = {
    'ep_coneflower.jpg': {
        'bestMatch': 'Echinacea purpurea (L.) Moench',
        'language': 'en',
        'preferedReferential': 'the-plant-list',
        'query': {
            'images': ['eb1032b3263aa3437a4ea18bd651fa0d'],
            'includeRelatedImages': false,
            'organs': ['flower'],
            'project': 'all'
        },
        'results': [{
            'gbif': { 'id': '3150935' },
            'score': 0.73551,
            'species': {
                'commonNames': ['Purple Coneflower',
                    'Echinacea',
                    'Eastern purple-coneflower'],
                'family': {
                    'scientificName': 'Compositae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Compositae'
                },
                'genus': {
                    'scientificName': 'Echinacea',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Echinacea'
                },
                'scientificName': 'Echinacea purpurea (L.) Moench',
                'scientificNameAuthorship': '(L.) Moench',
                'scientificNameWithoutAuthor': 'Echinacea purpurea'
            }
        },
        {
            'gbif': { 'id': '3150933' },
            'score': 0.19489,
            'species': {
                'commonNames': ['Purple coneflower',
                    'Black-sampson echinacea',
                    'Narrow-leaf echinacea'],
                'family': {
                    'scientificName': 'Compositae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Compositae'
                },
                'genus': {
                    'scientificName': 'Echinacea',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Echinacea'
                },
                'scientificName': 'Echinacea angustifolia DC.',
                'scientificNameAuthorship': 'DC.',
                'scientificNameWithoutAuthor': 'Echinacea angustifolia'}
        },
        {
            'gbif': { 'id': '3150929' },
            'score': 0.01996,
            'species': {
                'commonNames': ['Tennessee purple-coneflower',
                    'Tennessee purple coneflower'],
                'family': {
                    'scientificName': 'Compositae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Compositae'
                },
                'genus': {
                    'scientificName': 'Echinacea',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Echinacea'
                },
                'scientificName': 'Echinacea tennesseensis (Beadle) Small',
                'scientificNameAuthorship': '(Beadle) Small',
                'scientificNameWithoutAuthor': 'Echinacea tennesseensis'}
        },
        {
            'gbif': { 'id': '3150919' },
            'score': 0.01136,
            'species': {
                'commonNames': ['Pale echinacea',
                    'Pale purple-coneflower',
                    'Pale-flower echinacea'],
                'family': {
                    'scientificName': 'Compositae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Compositae'
                },
                'genus': {
                    'scientificName': 'Echinacea',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Echinacea'
                },
                'scientificName': 'Echinacea pallida (Nutt.) Nutt.',
                'scientificNameAuthorship': '(Nutt.) Nutt.',
                'scientificNameWithoutAuthor': 'Echinacea pallida'
            }
        },
        {
            'gbif': { 'id': '7344766' },
            'score': 0.00178,
            'species': {
                'commonNames': ['Black-eyed Susan',
                    'Orange coneflower',
                    'Perennial coneflower'],
                'family': {
                    'scientificName': 'Compositae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Compositae'
                },
                'genus': {
                    'scientificName': 'Rudbeckia',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Rudbeckia'
                },
                'scientificName': 'Rudbeckia fulgida Aiton',
                'scientificNameAuthorship': 'Aiton',
                'scientificNameWithoutAuthor': 'Rudbeckia fulgida'
            }
        },
        {
            'gbif': { 'id': '3092946' },
            'score': 0.00147,
            'species': {
                'commonNames': ['China Aster',
                    'Annual-aster',
                    'China-aster'],
                'family': {
                    'scientificName': 'Compositae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Compositae'
                },
                'genus': {
                    'scientificName': 'Callistephus',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Callistephus'
                },
                'scientificName': 'Callistephus chinensis (L.) Nees',
                'scientificNameAuthorship': '(L.) Nees',
                'scientificNameWithoutAuthor': 'Callistephus chinensis'}
        }],
        'version': '2022-02-14 (5.0)'
    },
    'fall_phlox.jpg': {
        'bestMatch': 'Phlox paniculata L.',
        'language': 'en',
        'preferedReferential': 'the-plant-list',
        'query': {
            'images': ['ff9b68e65cd1cede9aa5f91c88d1ac5a'],
            'includeRelatedImages': false,
            'organs': ['flower'],
            'project': 'all'
        },
        'remainingIdentificationRequests': 498,
        'results': [{
            'gbif': { 'id': '2927744' },
            'score': 0.49685,
            'species': {
                'commonNames': ['Garden phlox',
                    'Perennial phlox',
                    'Perennial-pink'],
                'family': {
                    'scientificName': 'Polemoniaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Polemoniaceae'
                },
                'genus': {
                    'scientificName': 'Phlox',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Phlox'
                },
                'scientificName': 'Phlox paniculata L.',
                'scientificNameAuthorship': 'L.',
                'scientificNameWithoutAuthor': 'Phlox paniculata'
            }
        },
        {
            'gbif': { 'id': '2927723' },
            'score': 0.17288,
            'species': {
                'commonNames': ["Drummond's phlox",
                    'Annual phlox',
                    'Pride-of-Texas'],
                'family': {
                    'scientificName': 'Polemoniaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Polemoniaceae'
                },
                'genus': {
                    'scientificName': 'Phlox',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Phlox'
                },
                'scientificName': 'Phlox drummondii Hook.',
                'scientificNameAuthorship': 'Hook.',
                'scientificNameWithoutAuthor': 'Phlox drummondii'
            }
        },
        {
            'gbif': { 'id': '2927783' },
            'score': 0.12563,
            'species': {
                'commonNames': ['Meadow phlox',
                    'Spotted phlox',
                    'Wild sweet-William'],
                'family': {
                    'scientificName': 'Polemoniaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Polemoniaceae'
                },
                'genus': {
                    'scientificName': 'Phlox',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Phlox'
                },
                'scientificName': 'Phlox maculata L.',
                'scientificNameAuthorship': 'L.',
                'scientificNameWithoutAuthor': 'Phlox maculata'
            }
        },
        {
            'gbif': { 'id': '2927788' },
            'score': 0.03575,
            'species': {
                'commonNames': ['Largeleaf phlox'],
                'family': {
                    'scientificName': 'Polemoniaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Polemoniaceae'
                },
                'genus': {
                    'scientificName': 'Phlox',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Phlox'
                },
                'scientificName': 'Phlox amplifolia Britton',
                'scientificNameAuthorship': 'Britton',
                'scientificNameWithoutAuthor': 'Phlox amplifolia'
            }
        },
        {
            'gbif': { 'id': '2927734' },
            'score': 0.03135,
            'species': {
                'commonNames': ['Prairie phlox', 'Downy phlox'],
                'family': {
                    'scientificName': 'Polemoniaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Polemoniaceae'
                },
                'genus': {
                    'scientificName': 'Phlox',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Phlox'
                },
                'scientificName': 'Phlox pilosa L.',
                'scientificNameAuthorship': 'L.',
                'scientificNameWithoutAuthor': 'Phlox pilosa'
            }
        },
        {
            'gbif': { 'id': '2927742' },
            'score': 0.02622,
            'species': {
                'commonNames': ['Smooth phlox'],
                'family': {
                    'scientificName': 'Polemoniaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Polemoniaceae'
                },
                'genus': {
                    'scientificName': 'Phlox',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Phlox'
                },
                'scientificName': 'Phlox glaberrima L.',
                'scientificNameAuthorship': 'L.',
                'scientificNameWithoutAuthor': 'Phlox glaberrima'
            }
        },
        {
            'gbif': { 'id': '2927756' },
            'score': 0.01324,
            'species': {
                'commonNames': ['Thick-leaf phlox',
                    'Thickleaf phlox'],
                'family': {
                    'scientificName': 'Polemoniaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Polemoniaceae'
                },
                'genus': {
                    'scientificName': 'Phlox',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Phlox'
                },
                'scientificName': 'Phlox carolina L.',
                'scientificNameAuthorship': 'L.',
                'scientificNameWithoutAuthor': 'Phlox carolina'
            }
        },
        {
            'gbif': { 'id': '2927730' },
            'score': 0.01193,
            'species': {
                'commonNames': ['Forest phlox',
                    'Wild blue phlox',
                    'Blue phlox'],
                'family': {
                    'scientificName': 'Polemoniaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Polemoniaceae'
                },
                'genus': {
                    'scientificName': 'Phlox',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Phlox'
                },
                'scientificName': 'Phlox divaricata L.',
                'scientificNameAuthorship': 'L.',
                'scientificNameWithoutAuthor': 'Phlox divaricata'
            }
        },
        {
            'gbif': { 'id': '3042291' },
            'score': 0.00901,
            'species': {
                'commonNames': ['Dames rocket',
                    'Damask-violet',
                    "Dame's rocket"],
                'family': {
                    'scientificName': 'Brassicaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Brassicaceae'
                },
                'genus': {
                    'scientificName': 'Hesperis',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Hesperis'
                },
                'scientificName': 'Hesperis matronalis L.',
                'scientificNameAuthorship': 'L.',
                'scientificNameWithoutAuthor': 'Hesperis matronalis'}
        },
        {
            'gbif': { 'id': '7290475' },
            'score': 0.00477,
            'species': {
                'commonNames': ['Japanese primrose'],
                'family': {
                    'scientificName': 'Primulaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Primulaceae'
                },
                'genus': {
                    'scientificName': 'Primula',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Primula'
                },
                'scientificName': 'Primula sieboldii E.Morren',
                'scientificNameAuthorship': 'E.Morren',
                'scientificNameWithoutAuthor': 'Primula sieboldii'
            }
        },
        {
            'gbif': { 'id': '3085360' },
            'score': 0.00352,
            'species': {
                'commonNames': ['Soapwort',
                    'Bouncing-bet',
                    'Common soapwort'],
                'family': {
                    'scientificName': 'Caryophyllaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Caryophyllaceae'
                },
                'genus': {
                    'scientificName': 'Saponaria',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Saponaria'
                },
                'scientificName': 'Saponaria officinalis L.',
                'scientificNameAuthorship': 'L.',
                'scientificNameWithoutAuthor': 'Saponaria officinalis'}
        },
        {
            'gbif': { 'id': '2927727' },
            'score': 0.00318,
            'species': {
                'commonNames': ['Moss phlox',
                    'Moss-pink',
                    'Mountain phlox'],
                'family': {
                    'scientificName': 'Polemoniaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Polemoniaceae'
                },
                'genus': {
                    'scientificName': 'Phlox',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Phlox'
                },
                'scientificName': 'Phlox subulata L.',
                'scientificNameAuthorship': 'L.',
                'scientificNameWithoutAuthor': 'Phlox subulata'
            }
        },
        {
            'gbif': { 'id': '3082283' },
            'score': 0.00308,
            'species': {
                'commonNames': ['Plumbago',
                    'Cape leadwort',
                    'Leaderwort'],
                'family': {
                    'scientificName': 'Plumbaginaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Plumbaginaceae'
                },
                'genus': {
                    'scientificName': 'Plumbago',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Plumbago'
                },
                'scientificName': 'Plumbago auriculata Lam.',
                'scientificNameAuthorship': 'Lam.',
                'scientificNameWithoutAuthor': 'Plumbago auriculata'}
        },
        {
            'gbif': { 'id': '2925496' },
            'score': 0.00228,
            'species': {
                'commonNames': ['Slender vervain',
                    'Wild verbena',
                    'Veined verbena'],
                'family': {
                    'scientificName': 'Verbenaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Verbenaceae'
                },
                'genus': {
                    'scientificName': 'Verbena',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Verbena'
                },
                'scientificName': 'Verbena rigida Spreng.',
                'scientificNameAuthorship': 'Spreng.',
                'scientificNameWithoutAuthor': 'Verbena rigida'
            }
        },
        {
            'gbif': { 'id': '2927760' },
            'score': 0.00171,
            'species': {
                'commonNames': ['Bush phlox', 'Showy phlox'],
                'family': {
                    'scientificName': 'Polemoniaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Polemoniaceae'
                },
                'genus': {
                    'scientificName': 'Phlox',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Phlox'
                },
                'scientificName': 'Phlox speciosa Pursh',
                'scientificNameAuthorship': 'Pursh',
                'scientificNameWithoutAuthor': 'Phlox speciosa'
            }
        },
        {
            'gbif': { 'id': '5341153' },
            'score': 0.00162,
            'species': {
                'commonNames': ['Latin American mock vervain',
                    'South american mock vervain'],
                'family': {
                    'scientificName': 'Verbenaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Verbenaceae'
                },
                'genus': {
                    'scientificName': 'Glandularia',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Glandularia'
                },
                'scientificName': 'Glandularia tenera (Spreng.) Cabrera',
                'scientificNameAuthorship': '(Spreng.) Cabrera',
                'scientificNameWithoutAuthor': 'Glandularia tenera'
            }
        },
        {
            'gbif': { 'id': '2927711' },
            'score': 0.00117,
            'species': {
                'commonNames': ['Hairy phlox'],
                'family': {
                    'scientificName': 'Polemoniaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Polemoniaceae'
                },
                'genus': {
                    'scientificName': 'Phlox',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Phlox'
                },
                'scientificName': 'Phlox amoena Sims',
                'scientificNameAuthorship': 'Sims',
                'scientificNameWithoutAuthor': 'Phlox amoena'
            }
        },
        {
            'gbif': { 'id': '2925514' },
            'score': 0.00102,
            'species': {
                'commonNames': ['Argentine vervain',
                    'South American vervain',
                    'Wild verbena'],
                'family': {
                    'scientificName': 'Verbenaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Verbenaceae'
                },
                'genus': {
                    'scientificName': 'Verbena',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Verbena'
                },
                'scientificName': 'Verbena bonariensis L.',
                'scientificNameAuthorship': 'L.',
                'scientificNameWithoutAuthor': 'Verbena bonariensis'}
        }],
        'version': '2022-02-14 (5.0)'
    },
    'primrose.jpg': {
        'bestMatch': 'Primula acaulis (L.) L.',
        'language': 'en',
        'preferedReferential': 'afn',
        'query': {
            'images': ['23a2cfba6e74eb75ea40015d898dfa91'],
            'includeRelatedImages': false,
            'organs': ['flower'],
            'project': 'all'
        },
        'remainingIdentificationRequests': 497,
        'results': [{
            'gbif': { 'id': '9500949' },
            'score': 0.48865,
            'species': {
                'commonNames': ['Primrose'],
                'family': {
                    'scientificName': 'Primulaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Primulaceae'
                },
                'genus': {
                    'scientificName': 'Primula L.',
                    'scientificNameAuthorship': 'L.',
                    'scientificNameWithoutAuthor': 'Primula'
                },
                'scientificName': 'Primula acaulis (L.) L.',
                'scientificNameAuthorship': '(L.) L.',
                'scientificNameWithoutAuthor': 'Primula acaulis'
            }
        },
        {
            'gbif': { 'id': '8377689' },
            'score': 0.00423,
            'species': {
                'commonNames': ['Cowslip',
                    'Cowslip Primrose',
                    'Mayflower'],
                'family': {
                    'scientificName': 'Primulaceae',
                    'scientificNameAuthorship': '',
                    'scientificNameWithoutAuthor': 'Primulaceae'
                },
                'genus': {
                    'scientificName': 'Primula L.',
                    'scientificNameAuthorship': 'L.',
                    'scientificNameWithoutAuthor': 'Primula'
                },
                'scientificName': 'Primula veris L.',
                'scientificNameAuthorship': 'L.',
                'scientificNameWithoutAuthor': 'Primula veris'
            }
        }],
        'version': '2022-02-14 (5.0)'
    },
}

function PlantIdentification() {
    const { tutorialStep, setTutorialStep, setSelectedPlantIndex } = useContext(Context);
    const [showPopover, setShowPopover] = useState(false);
    const navigate = useNavigate();

    const inputFlower = useRef(null);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [response, setResponse] = useState("");
    const [showAPI, setShowAPI] = useState(false);

    useEffect(() => {
        if (tutorialStep !== 0) setShowPopover(true)
    }, [])

    const onUploadFlower = () => {
        if (tutorialStep === 2) setTutorialStep(3);

        if (inputFlower.current) {
            inputFlower.current.click();
        }
    };

    const onIdentify = async () => {
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

        const sample_response = identifications[selectedFile]['results'];

        const styled_response = (
            sample_response.map(e => (
                <ResultContainer role='button' onClick={() => {
                    setSelectedPlantIndex(1)
                    navigate('/dictionary')
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

        console.log(response)
    };

    //: ChangeEvent<HTMLInputElement>
    const handleFlowerChange = (event) => {
        if (event && event.target) {
            let input = event.target;
            var fReader = new FileReader();
            if (input.files) {
                console.log(input.files[0])
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
                        overlay={(p) => Popover(p, 'Upload Image From Camera Roll')}>
                        <PrettyButton
                            onClick={onUploadFlower}>
                            <img src={Camera} style={{ margin: '0px 10px 3px 0px', height: '1.5rem' }} alt='camera' />
                            Upload Image
                        </PrettyButton>
                    </OverlayTrigger>
                    {selectedFlower !== null && !showAPI && <PrettyButton upload onClick={onIdentify}>
                        Identify
                    </PrettyButton>}
                </ButtonContainer>
                {/* <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: '100%',
                alignContent: "flex-start"
            }}> */}
                {showAPI && <span style={{ width: '100%' }}>Results:</span>}
                {showAPI &&
                    response}
                {/* </div> */}
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
