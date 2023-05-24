export interface IMessage {
    agent: boolean
    message?: string
    response?: string

    createdAt?: Date
    updatedAt?: Date
}