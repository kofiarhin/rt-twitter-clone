
import { firestore } from "../../firebase/firebase.utils"

const setCurrentUser = user =>  {

    return {
        type: "SET_CURRENT_USER",
        payload: user
    }
}

const handleFollow  = user => {

    return {
        type: 'HANDLE_FOLLOW',
        payload: user
    }
}

const getUsers = users => {
    
    return {
        type: "GET_USERS",
        payload: users 
    }
}

const getUsersAsync  = async => {

    return dispatch => {

        return firestore.collection("users").get().then( snapshot => {

            let users = [];
                    snapshot.docs.forEach( snapshot => {

                                users.push({
                                    id: snapshot.id,
                                    ...snapshot.data()
                                })
                    });

                    return dispatch(getUsers(users))
        })
    }
}

export {
    setCurrentUser,
    handleFollow,
    getUsersAsync
}