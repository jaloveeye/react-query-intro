import { useCallback, useState } from 'react'
import { useQueries, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { fetchUser } from '../api/users'
import { queryKeys } from '../query/queryKeys'
import { useAddUser, useAddUserToReturn, useDeleteUser, useUserData, useUserDataByUserId, useUserDataWithOptions, useAddUserWithCallback, useAddUserError } from '../query/useUserData'
import { UserProps } from '../types'
import UserEmails from './UserEmails'

const Users = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const onSuccess = (res: UserProps[]) => {
        console.log(`success fetching ${res}`);
    }
    
    const onError = () => {
        console.log('error fetching');
    }

    const { mutate: AddMutate } = useAddUser()
    const { mutate: AddMutateWithCallback } = useAddUserWithCallback()
    const { mutate: AddMutateError } = useAddUserError()
 
    const handleAddUserClick = () => {
        const user = { name, email }
        
        AddMutate(user)

        //useAddUserToReturn(user)
    }

    const handleAddUserErrorClick = () => {
        const user = { name, email }
        
        AddMutateError(user)
    }

    const queryClient = useQueryClient()

    const handleAddUserClickWithCallbalck = useCallback(() => {

        const user = { name, email }

        AddMutateWithCallback(
            user,
            {
                onSuccess: () => {
                    console.log(`onSuccess`)
                    queryClient.invalidateQueries(queryKeys.users)
                },
                onError: (error, variables, context: any) => {
                    console.log(`onError`)
                    context.restore()
                },
                onSettled: (data, error, variables, context) => {
                    // success, error 에 상관없이 끝나면 호출
                    console.log(`onSettled`)
                },
            }
        )

    }, [AddMutateWithCallback, name, email])
    
    const { mutate: DeleteMutate } = useDeleteUser()

    const handleDeleteUserClick = (userId: number) => {
        console.log(`handleDeleteUserClick ${userId}`)

        DeleteMutate(userId)
    }
    
    // const { isLoading, isError, error, data } = useUserData(onSuccess, onError)

    const { isLoading, isError, error, data } = useUserDataWithOptions(
        {
            enabled: true,
            retry: 2,
            refetchOnMount: false,
            staleTime: 2000,
            cacheTime: 4000,
            onSuccess,
            onError
        }
    )

    /**
     * useQueries
     */
    //  const userQueries = useQueries(
    //         data?.map( user => {
    //             return {
    //                 queryKey: queryKeys.user(user.id)
    //                 queryFn: () => fetchUser(user.id)
    //             }
    //         })
    //     )

    if (isLoading) return <div>Loading</div>

    if (isError) return <div>{error?.message}</div>

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleAddUserClickWithCallbalck}>add User With Callback</button>
                <button onClick={handleAddUserClick}>add User</button>
                <button onClick={handleAddUserErrorClick}>add User Error</button>
            </div>
            {
                data?.map(user => {
                    return (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`}>{user.name} : {user.email}</Link>
                            <button onClick={() => handleDeleteUserClick(user.id)}>delete</button>
                        </div>
                    )
                })
            }
            <UserEmails />
        </div>
    )
}

export default Users