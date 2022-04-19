export interface IComment {
    id?: number,
    user?: {
        login: string,
    },
    created_at?: string,
    body?: string
}