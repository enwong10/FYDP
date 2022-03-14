import plantDb from './PlantDb';

function SWAlgorithm(grid, selectedPlantId) {
    const newgrid = [];
    for (let i = 0; i < grid.length; i++) {
        newgrid[i] = [];
        for (let j = 0; j < grid[i].length; j++) {
            var plant = null;
            if (selectedPlantId === null) {
                if (grid[i][j] === null) {
                    newgrid[i].push({
                        warning: null,
                        suggestions: null,
                        required_space: null,
                    });
                    continue;
                }

                plant = plantDb[grid[i][j]];
            } else {
                plant = plantDb[selectedPlantId];
            }

            const toCheck = [
                [i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1], [i - 1, j - 1], [i - 1, j+1], [i + 1, j - 1], [i + 1, j + 1]
            ].filter(e => e[0] < grid.length && e[0] >= 0 && e[1] < grid[0].length && e[1] >= 0);

            var warning = [];
            var suggestions = [];
            const conflicts = [];
            const requiredSpace = parseInt(plant.spacing.split(' ')[0])/12;

            for (const xy of toCheck) {
                if (grid[xy[0]][xy[1]] === null) {
                    continue;
                }

                if (parseInt(plantDb[grid[xy[0]][xy[1]]].spacing.split(' ')[0])/12 + requiredSpace > 1) {
                    conflicts.push('The spacing requirements of an adjacent plant differ interfere with this placement.');
                }

                if (plantDb[grid[xy[0]][xy[1]]].lightRequirements.filter(v => plant.lightRequirements.includes(v)).length === 0) {
                    warning.push('The lighting requirements of an adjacent plant differ significantly/do not overlap.')
                }

                if (plantDb[grid[xy[0]][xy[1]]].waterAmount.filter(v => plant.waterAmount.includes(v)).length === 0) {
                    warning.push('The watering requirements of an adjacent plant differ significantly/do not overlap.')
                }

                if (plantDb[grid[xy[0]][xy[1]]].soilMoisture.filter(v => plant.soilMoisture.includes(v)).length === 0) {
                    warning.push('The soil moisture requirements of an adjacent plant differ significantly/do not overlap.')
                }

                // TODO PH
                // if (plantDb[grid[xy[0]][xy[1]]].soilMoisture.filter(v => plant.soilMoisture).length === 0) {
                //     warning.push('The soil moisture requirements of an adjacent plant differ significantly/do not overlap.')
                // }
            }

            if (!plant.localities.includes('ON')) {
                warning.push('This plant does not typically grow in your locality.')
            }

            if (selectedPlantId !== null && warning.length === 0) {
                suggestions.push('This spot would be ideal for this plant as there are no adjacent plants with significantly differing growth requirements.')
            }

            newgrid[i].push({
                warning,
                suggestions,
                conflicts,
                all: [...conflicts, ...warning, ...suggestions]
            });
        }
    }

    return newgrid;
}

export default SWAlgorithm
