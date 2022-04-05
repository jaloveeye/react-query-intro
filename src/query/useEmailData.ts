import { useQuery } from "react-query"
import { fetchEmail } from "../api/email"
import { EmailProps } from '../types'
import { queryKeys } from "./queryKeys"

export const useEmailDataByEmailId = (email: string) => {

    return useQuery<EmailProps, Error>(
        queryKeys.email(email),
        () => fetchEmail(email), 
        {
            enabled: !!email
        }
    )
}