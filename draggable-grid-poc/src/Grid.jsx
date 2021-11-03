import React from 'react';
import {Droppable} from './Droppable';

const style = {
  display: 'grid',
  'gridTemplateColumns': 'repeat(10, 50px)',
  'gridTemplateRows': 'repeat(10, 50px)'
}

export function GridContainer(props) {
  const containers = new Array(100).fill(0).map((_, i) => i+1)
  return (
    <div style={style}>
      {containers.map(i => (
        <Droppable key={i} id={i}>
          {props.draggables.map(d => (
            d.parent === i ? <props.draggableMarkup key={d.id} id={d.id} name={d.name}/> : null
          )).find(d => d !== null) ?? i}
        </Droppable>
      ))}
    </div>
  );
}