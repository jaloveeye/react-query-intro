import { useEffect, useState } from 'react'
import axios from 'axios'
import { UserProps } from '../types'

/**
 * 이전 방식
 */
const FetchPage = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<UserProps[]>([])

    useEffect(() => {
        axios.get(`http://localhost:4000/users`).then(res => {
            setData(res.data)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) return <div>Loading</div>

    return (
        <div>
            {
                data?.map( user => {
                    return <div key={user.id}>{user.name}:{user.email}</div>
                })
            }
        </div>
    )
}

export default FetchPage