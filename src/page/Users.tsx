import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAddUser, useAddUserToReturn, useDeleteUser, useUserData } from '../query/useUserData'
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
 
    const handleAddUserClick = () => {
        const user = { name, email }
        
        AddMutate(user)

        //useAddUserToReturn(user)
    }

    const { mutate: DeleteMutate } = useDeleteUser()

    const handleDeleteUserClick = (userId: number) => {
        console.log(`handleDeleteUserClick ${userId}`)

        DeleteMutate(userId)
    }
    
    const { isLoading, isError, error, data } = useUserData(onSuccess, onError)

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
                <button onClick={handleAddUserClick}>add User</button>
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