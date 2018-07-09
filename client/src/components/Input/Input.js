// Dependency imports
import React from 'react';

// Asset imports
import classes from './Input.css';

// Component
const input = (props) => {
    switch(props.type){
        case('text'):
            return(
                <input type="text" name={props.name} placeholder={props.label} onChange={props.onChange} required={props.required}/>
            );
        case('email'):
            return(
                <input type="email" name="email" placeholder="E-mail address" onChange={props.onChange} required={props.required}/>
            );
        case('submit'):
            return(
                <input type="submit" value="Submit"/>
            );
        default:
            return null;
    }
}

export default input;