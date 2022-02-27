import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });
    const style = {
        backgroundColor: !isOver ? '#9b7653' : props.isError ? 'red' : props.isWarning ? 'yellow' : 'green',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };


    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}
