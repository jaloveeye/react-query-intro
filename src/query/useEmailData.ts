import { useQuery } from "react-query"
import { fetchEmail } from "../api/email"
import { EmailProps } from '../types'

export const useEmailDataByEmailId = (email: string) => {

    return useQuery<EmailProps, Error>(
        ['email', email], 
        () => fetchEmail(email), 
        {
            enabled: !!email
        }
    )

}