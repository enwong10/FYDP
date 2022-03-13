
function SWAlgorithm(grid) {
    const newgrid = [];
    for (let i = 0; i < grid.length; i++) {
        newgrid[i] = [];
        for (let j = 0; j < grid[0].length; j++) {
            const rand = Math.random();

            newgrid[i].push({
                warning: rand < .2 && 'This is a WARNING!',
                suggestions: rand < .4 && rand > .2 && 'I SUGGEST you do the following: BLEH',
                required_space: grid[i][j] !== null ? rand * 10 : null,
            })
        }
    }
    return newgrid;
}

export default SWAlgorithm
