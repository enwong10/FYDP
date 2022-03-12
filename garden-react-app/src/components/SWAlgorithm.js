
function SWAlgorithm(grid) {

    return Array(10).map(i => Array(10).map(j => {
        const rand = Math.random();

        return {
            warning: rand < .2 && 'This is a WARNING!',
            suggestions: rand < .4 && rand > .2 && 'I SUGGEST you do the following: BLEH',
            required_space: grid[i][j] !== null ? rand * 10 : null,
        }
    }));
}

export default SWAlgorithm