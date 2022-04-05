import { UserProps } from "../../types"
import { GET_USERS_SUCCESS } from "./actionTypes"

const initialState: { users: UserProps[] } = {
    users: []
}

const user = (state = initialState, action: any) => {

    switch (action.type) {

        case GET_USERS_SUCCESS : {
        
            state = {
                ...state,
                users : action.payload
            }

            console.log(`users ${state.users}`)

            break
        }

        default :
            state = { ...state }
            break
    }

    return state
}

export default user