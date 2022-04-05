import { useUserData } from '../query/useUserData'

const UserEmails = () => {

    const { isLoading, isError, error, data } = useUserData(
        () => {}, 
        () => {}
    )

    if (isLoading) return <div>Loading</div>

    if (isError) return <div>{error?.message}</div>

    return (
        <div>
            {
                data?.map(user => {
                    return (
                        <div key={user.id}>
                            {user.email}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserEmails