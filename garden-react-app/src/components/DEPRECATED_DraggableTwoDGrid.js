import React, { useState } from 'react';
import {DndContext} from '@dnd-kit/core';
import {Button} from 'react-bootstrap'

import {Draggable} from './grid/Draggable';
import { GridContainer } from './grid/Grid'

function TwoDGrid() {
    const DraggableMarkup = (props) => (
        <Draggable id={props.id}>{props.name}</Draggable>
    );
    const [draggables, setDraggables] = useState(() =>
        new Array(5).fill(0).map((_, i) => ({
            id: `draggable${i}`,
            name: `Hi${i}`,
            parent: null
        }))
    );

    return (
        <div>
            <DndContext onDragEnd={handleDragEnd}>
                { draggables.map(d => (
                    d.parent === null ? <DraggableMarkup id={d.id} key={d.id} name={d.name}/> : null
                ))}
                <GridContainer draggables={draggables} draggableMarkup={DraggableMarkup}/>
            </DndContext>
            <Button> Generate Garden </Button>
        </div>
    );

    function handleDragEnd(event) {
        const {over, active} = event;
        const activeI = draggables.findIndex(d => d.id === active.id)
        const activeEl = draggables[activeI]
        setDraggables(draggables.slice(0, activeI).concat([
                {...activeEl, parent: over?.id ?? null}],
            draggables.slice(activeI + 1)
        ))
    }
}

export default TwoDGrid;
