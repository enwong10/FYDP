import primrose_img from '../assets/plant_images/primrose.jpg'
import primrose_result2 from '../assets/plant_images/identifications/primrose_result2.jpg'

import fall_phlox_img from '../assets/plant_images/fall_phlox.jpg'
import phlox_result2 from '../assets/plant_images/identifications/phlox_result2.gif'
import phlox_result3 from '../assets/plant_images/identifications/phlox_result3.jpg'

import eastern_purple_coneflower_img from '../assets/plant_images/eastern_purple_coneflower.jpg'
import coneflower_result2 from '../assets/plant_images/identifications/coneflower_result2.jpg'
import coneflower_result3 from '../assets/plant_images/identifications/coneflower_result3.jpg'

export const autoGenGarden = [
    [null, null, null, 3, 3, 3, 3, 3, null, null],
    [null, null, null, 3, 3, 3, 3, 3, null, null],
    [2, 2, null, 3, 3, 3, 3, 4, 4, 4],
    [2, 2, 2, 5, 5, 5, 5, 4, 4, 4],
    [2, 2, 2, 5, 5, 5, 5, 4, 4, 4],
    [1, 1, 1, 5, 5, 5, 4, 4, 4, 4],
    [1, 1, 1, 1, 5, 5, 6, 6, null, null],
    [1, 1, 1, 1, 6, 6, 6, 6, null, null],
    [0, 0, 0, 0, 6, 6, 6, null, null, null],
    [0, 0, 0, 0, 6, 6, 6, null, null, null],
];

export const defaultSettings = {
    gardenName: '',
    workFrequency: '',
    goals: {
        'Decorate my yard': false,
        'Add privacy': false,
        'Compost': false,
        'Enjoy nature': false,
        'Grow food': false,
        'Watch animals': false,
        'Help the bees': false,
    },
    animals: '',
    budget: undefined,
};

export const buildInitialGrid = (width, height) => {
    const grid = [];
    for (let i = 0; i < width; i++) {
        grid[i] = [];
        for (let j = 0; j < height; j++) {
            grid[i].push(null);
        }
    }
    return grid;
};

export const plantImageIdentifications = {
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
        'results': [
            {
                'gbif': { 'id': '3150935' },
                'score': 0.73551,
                'image': eastern_purple_coneflower_img,
                'id': 5,
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
                'image': coneflower_result2,
                'id': 5,
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
                    'scientificNameWithoutAuthor': 'Echinacea angustifolia'
                }
            },
            {
                'gbif': { 'id': '3150929' },
                'score': 0.01996,
                'image': coneflower_result3,
                'id': 5,
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
                    'scientificNameWithoutAuthor': 'Echinacea tennesseensis'
                }
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
                    'scientificNameWithoutAuthor': 'Callistephus chinensis'
                }
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
        'results': [
            {
                'gbif': { 'id': '2927744' },
                'score': 0.49685,
                'image': fall_phlox_img,
                'id': 4,
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
                'image': phlox_result2,
                'id': 4,
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
                'image': phlox_result3,
                'id': 4,
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
                    'scientificNameWithoutAuthor': 'Hesperis matronalis'
                }
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
                    'scientificNameWithoutAuthor': 'Saponaria officinalis'
                }
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
                    'scientificNameWithoutAuthor': 'Plumbago auriculata'
                }
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
                    'scientificNameWithoutAuthor': 'Verbena bonariensis'
                }
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
        'results': [
            {
                'gbif': { 'id': '9500949' },
                'score': 0.48865,
                'image': primrose_img,
                'id': 3,
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
                'image': primrose_result2,
                'id': 3,
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
};

export const defaultGrid = buildInitialGrid(10, 10);

export const initialWarningsGrid =
[
    [{},{},{},{},{},{},{},{},{},],
    [{},{},{},{},{},{},{},{},{},],
    [{},{},{},{},{},{},{},{},{},],
    [{},{},{},{},{},{},{},{},{},],
    [{},{},{},{},{},{},{},{},{},],
    [{},{},{},{},{},{},{},{},{},],
    [{},{},{},{},{},{},{},{},{},],
    [{},{},{},{},{},{},{},{},{},],
    [{},{},{},{},{},{},{},{},{},],
    [{},{},{},{},{},{},{},{},{},],
];

export const defaultLightingGrids = [
    [
        [
          0.06435645642609425,
          0.11074861622271451,
          0.11074861622271451,
          0.11074861622271451,
          0.11074861622271451,
          0.11074861622271451,
          0.11074861622271451,
          0.11074861622271451,
          0.11074861622271451,
          0.08028120094385212
        ],
        [
          0.06736436496477928,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.0853704759567838
        ],
        [
          0.06736436496477928,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.0853704759567838
        ],
        [
          0.06736436496477928,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.0853704759567838
        ],
        [
          0.06736436496477928,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.0853704759567838
        ],
        [
          0.06736436496477928,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.0853704759567838
        ],
        [
          0.06736436496477928,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.0853704759567838
        ],
        [
          0.06736436496477928,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.0853704759567838
        ],
        [
          0.06736436496477928,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.11884579977433124,
          0.0853704759567838
        ],
        [
          0.05489236310036704,
          0.09004296542224419,
          0.09004296542224419,
          0.09004296542224419,
          0.09004296542224419,
          0.09004296542224419,
          0.09004296542224419,
          0.09004296542224419,
          0.09004296542224419,
          0.069039643469109
        ]
    ],
    [
        [
          0.21889003602172477,
          0.24074093007343464,
          0.24074093007343464,
          0.24074093007343464,
          0.24074093007343464,
          0.24074093007343464,
          0.24074093007343464,
          0.24074093007343464,
          0.24074093007343464,
          0.21830772499761728
        ],
        [
          0.2636292254839872,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.31422123516701705
        ],
        [
          0.2636292254839872,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.31422123516701705
        ],
        [
          0.2636292254839872,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.31422123516701705
        ],
        [
          0.2636292254839872,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.31422123516701705
        ],
        [
          0.2636292254839872,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.31422123516701705
        ],
        [
          0.2636292254839872,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.31422123516701705
        ],
        [
          0.2636292254839872,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.31422123516701705
        ],
        [
          0.2636292254839872,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.3761332551081884,
          0.31422123516701705
        ],
        [
          0.21936683893999326,
          0.3111880149443734,
          0.3111880149443734,
          0.3111880149443734,
          0.3111880149443734,
          0.3111880149443734,
          0.3111880149443734,
          0.3111880149443734,
          0.3111880149443734,
          0.24927599500320205
        ]
    ],
    [
        [
          0.18729977002342055,
          0.18729977002342055,
          0.18729977002342055,
          0.18729977002342055,
          0.18729977002342055,
          0.18729977002342055,
          0.18729977002342055,
          0.18729977002342055,
          0.18729977002342055,
          0.12382681740671506
        ],
        [
          0.21096791799491232,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.24586855056612197
        ],
        [
          0.21096791799491232,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.24586855056612197
        ],
        [
          0.21096791799491232,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.24586855056612197
        ],
        [
          0.21096791799491232,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.24586855056612197
        ],
        [
          0.21096791799491232,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.24586855056612197
        ],
        [
          0.21096791799491232,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.24586855056612197
        ],
        [
          0.21096791799491232,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.24586855056612197
        ],
        [
          0.21096791799491232,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.3093415031828275,
          0.24586855056612197
        ],
        [
          0.16298660937337608,
          0.2613601945612912,
          0.2613601945612912,
          0.2613601945612912,
          0.2613601945612912,
          0.2613601945612912,
          0.2613601945612912,
          0.2613601945612912,
          0.2613601945612912,
          0.19788724194458576
        ]
    ],
    [
        [
          0.046461725788281026,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.034232564277639266
        ],
        [
          0.046461725788281026,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.034232564277639266
        ],
        [
          0.046461725788281026,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.034232564277639266
        ],
        [
          0.046461725788281026,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.034232564277639266
        ],
        [
          0.046461725788281026,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.034232564277639266
        ],
        [
          0.046461725788281026,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.034232564277639266
        ],
        [
          0.046461725788281026,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.034232564277639266
        ],
        [
          0.046461725788281026,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.034232564277639266
        ],
        [
          0.046461725788281026,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.056947950544012624,
          0.034232564277639266
        ],
        [
          0.02595405976910015,
          0.036440284524831744,
          0.036440284524831744,
          0.036440284524831744,
          0.036440284524831744,
          0.036440284524831744,
          0.036440284524831744,
          0.036440284524831744,
          0.036440284524831744,
          0.030714409254184005
        ]
    ]
]
