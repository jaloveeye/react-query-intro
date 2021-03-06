import axios from "axios"
import { useQuery } from "react-query"
import { queryKeys } from "../query/queryKeys"
import { UserProps } from "../types"

/**
 * React Query 사용
 */
const FetchByQueryPage = () => {

    const { isLoading, data } = useQuery(queryKeys.userTest(), () => {
        return axios.get<UserProps[] >(`http://localhost:4000/users`)
    })

    if (isLoading) return <div>Loading</div>

    return (
        <div>
            {
                data?.data.map( user => {
                    return <div key={user.id}>{user.name}:{user.email}</div>
                })
            }
        </div>
    )
}

export default FetchByQueryPage