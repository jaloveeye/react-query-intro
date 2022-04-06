import axios from "axios";
import { UserProps, AddUserProps } from '../types'

export const fetchUsers = async () => {
    const response = await axios.get<UserProps[]>('http://localhost:4000/users')
    return response.data
}

export const fetchUser = async (userId: number) => {

    const response = await axios.get<UserProps>(`http://localhost:4000/users/${userId}`)

    return response.data
}

export const addUser = async (user: AddUserProps) => {
    const response = await axios.post('http://localhost:4000/users', user)

    return response.data
}

export const addUserError = async (user: AddUserProps) => {
    const response = await axios.post('http://localhost:4000/usersERROR', user)

    return response.data
}

export const deleteUser = async (userId: number) => {
    const response = await axios.delete(`http://localhost:4000/users/${userId}`)

    return response.data
}