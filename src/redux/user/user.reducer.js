import { follow } from "./user.uilts"


const INITIAL_STATE = {
    currentUser: {},
    users: []
}


const userReducer = (state=INITIAL_STATE, action) =>  {

    switch(action.type) {
        
        case "GET_USERS":
            return {
                ...state,
                users: action.payload
            }

        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload
            }
        case "HANDLE_FOLLOW":

        return {
            ...state,
            currentUser: follow(state.currentUser, action.payload)
        }
        default:
            return state;
    }
}

export default userReducer;