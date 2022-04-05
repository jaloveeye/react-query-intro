export const queryKeys = {
    users: ['users'] as const,
    user: (id: number) => ['user', id] as const,
    email: (id: string) => ['email', id] as const,
    userTest: () => ['user', 'test'] as const,
}