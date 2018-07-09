import * as actions from '../actionTypes';

export const setColor = (pickedColor) => {
    return{
        type: actions.SET_COLOR,
        pickedColor
    }
};