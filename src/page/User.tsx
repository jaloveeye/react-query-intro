import { useParams } from "react-router-dom"
import { useUserData, useUserDataByUserId } from "../query/useUserData"
import { UserProps } from '../types'
import { useEmailDataByEmailId } from '../query/useEmailData'

const User = () => {

    const onSuccess = (user: UserProps) => {
        console.log(`success fetching ${user.name}`);
    }
    
    const onError = () => {
        console.log('error fetching');
    }

    const { userId } = useParams()

    const { isLoading: isLoadingUser, isError: isErrorUser, error: errorUser, data: dataUser } = useUserDataByUserId(parseInt(userId!!), onSuccess, onError)

    const userEmail = dataUser?.email!!

    const { data: dataEmail } = useEmailDataByEmailId(userEmail)
    
    if (isLoadingUser) return <h2>Loading</h2>

    if (isErrorUser) return <h2>{errorUser.message}</h2>
    
    return (
        <div>
            <h2>{dataUser?.name}({dataUser?.email})</h2>
            {
                dataEmail && (<div>spamCount : {dataEmail.spamCount}</div>)
            }
        </div>
    )
}

export default User