import * as actions from '../actionTypes';

export const setColor = (pickedColor) => {
    return{
        type: actions.SET_COLOR,
        pickedColor
    }
};

export const dragStart = () => {
    return{
        type: actions.DRAG_START
    }
};

export const dragEnd = () => {
    return{
        type: actions.DRAG_END
    }
};