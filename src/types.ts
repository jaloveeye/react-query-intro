export interface UserProps {
    id: number,
    name: string,
    email: string,
}

export interface EmailProps {
    id: string,
    spamCount: number,
}

export interface AddUserProps {
    name: string,
    email: string,
}