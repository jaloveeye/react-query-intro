import { useEffect } from "react"
import { getUsers } from "../store/actions"
import { useSelector, useDispatch } from "react-redux"
import { UserProps } from "../types"

const ReduxPage = () => {

    const dispatch = useDispatch()

    const User = useSelector((state: any) => state.User)
    
    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <div>
        {
            User.users && (
                User.users?.map((user : UserProps) => {
                    return <div key={user.id}>{user.name}:{user.email}</div>
                })
            )
        }
        </div>
    )
}

export default ReduxPage