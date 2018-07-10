import * as actionTypes from '../actionTypes';

const initialState = {
    message: null,
    loading: false,
    pickedColor: null,
    dragging: false,
    dropContainerPosition: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.MESSAGE_RECEIVED):
            return{
                ...state,
                message: action.message,
                loading: false
            }
        case(actionTypes.MESSAGE_REQUEST_SENT):
            return{
                ...state,
                message: false,
                loading: true
            }
        case(actionTypes.MESSAGE_REQUEST_FAILED):
            return{
                ...state,
                message: 'Unable to connect to server',
                loading: false
            }
        case(actionTypes.SET_COLOR):
            return{
                ...state,
                pickedColor: action.pickedColor
            }
        case(actionTypes.SET_CONTAINER):
            return{
                ...state,
                dropContainer: action.position
            }
        case(actionTypes.DRAG_START):
            return{
                ...state,
                dragging: true
            }
        case(actionTypes.DRAG_END):
            return{
                ...state,
                dragging: false
            }            
    }
    return state;
}

export default reducer;