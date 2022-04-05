import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query"
import { addUser, deleteUser, fetchUser, fetchUsers } from "../api/users"
import { AddUserProps, UserProps } from '../types'
import { queryKeys } from "./queryKeys"

export const useUserData = (onSuccess: (res: UserProps[]) => void, onError: () => void) => {

    /**
     * export function useQuery<
            TQueryFnData = unknown,  -> return 값
            TError = unknown, -> Error type
            TData = TQueryFnData, -> 지정 시 data 형식은 TData를 따름
            TQueryKey extends QueryKey = QueryKey -> query key의 타입
        >
     */
    return useQuery<UserProps[], Error>(
        queryKeys.users,
        () => fetchUsers(),
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
}

export const useUserDataByUserId = (userId: number, onSuccess: (res: UserProps) => void, onError: () => void) => {

    const queryClient: QueryClient = useQueryClient() 

    return useQuery<UserProps, Error>(
        queryKeys.user(userId), 
        () => fetchUser(userId), 
        {
            initialData: () => {
                const user = queryClient.getQueryData<UserProps[]>(queryKeys.users)?.find(user => user.id === userId)

                if (user) return user
                else return undefined
            },
            onSuccess,
            onError
        }
    )
}

export const useAddUser = () => {
    const queryClient = useQueryClient()

    return useMutation(addUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.users)
        }
    })
}

/**
 * 
  export function useMutaion<
    TData = unknown,  -> mutation 의 실행 결과 타입
    TError = unknown, -> mutation 의 에러 결과 타입
    TVariables = void, -> mutate 인자 
    TContext = unknown -> onMutate callback의 return
    >
 */
export const useAddUserToReturn = (user: AddUserProps) => {
    const queryClient = useQueryClient()

    return useMutation<UserProps>(() => addUser(user), {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.users)
        }
    })
}


export const useDeleteUser = () => {
    const queryClient = useQueryClient()

    return useMutation(deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.users)
        }
    })
}

