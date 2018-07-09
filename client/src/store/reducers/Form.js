import * as actionTypes from '../actionTypes';

const initialState = {
    message: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.MESSAGE_RECEIVED):
            return{
                message: action.message,
                loading: false
            }
        case(actionTypes.MESSAGE_REQUEST_SENT):
            return{
                message: null,
                loading: true
            }
        case(actionTypes.MESSAGE_REQUEST_FAILED):
            return{
                message: 'Unable to connect to server',
                loading: false
            }
    }
    return state;
}

export default reducer;