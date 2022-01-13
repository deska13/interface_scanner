const clientState = {
    client: {}
}

export const clientReducer = (state = clientState, action) => {
    switch (action.type) {
    case 'SET_CLIENT':
        return {...state, client: action}
    case 'GET_CLIENT':
        return {state}
    default:
        return state
    }
}