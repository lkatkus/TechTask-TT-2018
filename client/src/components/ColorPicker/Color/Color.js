import React from 'react';

import classes from './Color.css'

const color = (props) => {
    
    let classesArr = [classes.Color];

    switch(props.type){
        case('red'): classesArr.push(classes.red); break;
        case('green'): classesArr.push(classes.green); break;
        case('blue'): classesArr.push(classes.blue); break;
    }

    return(
        <div
            id={props.type}
            className={classesArr.join(' ')}
            onMouseDown={props.mouseDown}
        />
    );
};

export default color;