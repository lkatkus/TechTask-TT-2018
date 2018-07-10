import * as actions from '../actionTypes';

export const messageReceived = (message) => {
    return{
        type: actions.MESSAGE_RECEIVED,
        message
    }
};

export const messageRequestSent = () => {
    return{
        type: actions.MESSAGE_REQUEST_SENT
    }
};

export const messageRequestFailed = () => {
    return{
        type: actions.MESSAGE_REQUEST_FAILED
    }
};

export const setContainerSize = (position) => {
    return{
        type: actions.SET_CONTAINER,
        position
    }
};


