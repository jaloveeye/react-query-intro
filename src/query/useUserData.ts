import { useCallback } from "react"
import { QueryClient, useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryOptions } from "react-query"
import { sleep } from "react-query/types/core/utils"
import { addUser, deleteUser, fetchUser, fetchUsers, addUserError } from "../api/users"
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

export const useUserDataWithOptions = (options?: UseQueryOptions<UserProps[], Error>) => {

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
        options
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
        onMutate: async (newUser: AddUserProps) => {
            // start mutation
            console.log(`onMutate ${Object.values(newUser)}`)
        },
    })
}

export function useAddUserError()
: UseMutationResult<
    UserProps,
    Error,
    AddUserProps,
    {
        previousUsers: UserProps[] | undefined
    }
> 
{
    const queryClient = useQueryClient()

    return useMutation(addUserError, {
        onSuccess: () => {
            console.log(`onSuccess`)
        },
        onError: (error, variables: AddUserProps, context?: { previousUsers: UserProps[] | undefined }) => {
            console.log(`onError`)
            
            if (context?.previousUsers) {
                queryClient.setQueriesData<UserProps[]>(queryKeys.users, context.previousUsers)
            }            
        },
        onSettled: (data, error, variables, context) => {
            // success, error 에 상관없이 끝나면 호출
            console.log(`onSettled`)
            queryClient.invalidateQueries(queryKeys.users)
        },
        onMutate: async (newUser: AddUserProps) => {
            // start mutation
            console.log(`onMutate ${Object.values(newUser)}`)

            // 쿼리 취소
            await queryClient.cancelQueries(queryKeys.users)

            // 이전 쿼리 상태 가져오기
            const previousUsers = queryClient.getQueryData<UserProps[]>(queryKeys.users)

            const newUserTemp: UserProps = {
                id : -1,
                name: newUser.name,
                email: newUser.email
            }

            if (previousUsers) {
                queryClient.setQueriesData<UserProps[]>(queryKeys.users, (old) => [
                    ...(old as UserProps[]),
                    newUserTemp
                ])

                console.log(`previousUsers Length: ${previousUsers.length}`)
            }

            return { previousUsers }
        },
    })
}

export const useAddUserWithCallback = () => {
    return useMutation(addUser)
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

