import React, {useEffect, useState} from 'react';
import {Droppable} from './Droppable';

let width = 10;
let height = 10;

const style = {
    display: 'grid',
    'gridTemplateColumns': `repeat(${width}, 10vw)`,
    'gridTemplateRows': `repeat(${height}, 5vh)`
};

export function GridContainer(props) {
    const containers = new Array(100).fill(0).map((_, i) => i+1);
    const [errorLocations, setErrorLocations] = useState();

    useEffect(() => {
        //setErrorLocations pass this into droppable
    }, [props.draggables]);
    return (
        <div style={style}>
            {containers.map(i => (
                <Droppable key={i} id={i} isError={false} isWarning={false}>
                    {props.draggables.map(d => (
                        d.parent === i ? <props.draggableMarkup key={d.id} id={d.id} name={d.name}/> : null
                    )).find(d => d !== null) ?? i}
                </Droppable>
            ))}
            {JSON.stringify(props.draggables)}
        </div>
    );
}
