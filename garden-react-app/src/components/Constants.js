
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

const buildInitialGrid = (width, height) => {
    const grid = [];
    for (let i = 0; i < width; i++) {
        grid[i] = [];
        for (let j = 0; j < height; j++) {
            grid[i].push(null);
        }
    }
    return grid;
};

export const defaultGrid = buildInitialGrid(10, 10);