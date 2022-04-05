import { GET_USERS, GET_USERS_SUCCESS } from './actionTypes'

export const getUsers = () => {
    return {
        type: GET_USERS
    }
}

export const getUsersSuccess = (users: object) => {
    return {
        type: GET_USERS_SUCCESS,
        payload: users
    }
}