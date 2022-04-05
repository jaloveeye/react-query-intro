import axios from "axios";
import { EmailProps } from '../types'

export const fetchEmail = async (email: string) => {

    const response = await axios.get<EmailProps>(`http://localhost:4000/emails/${email}`)

    return response.data
}