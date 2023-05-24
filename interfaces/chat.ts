export interface IMessage {
    senderId?: string
    agent: boolean
    message?: string
    response?: string

    createdAt?: Date
    updatedAt?: Date
}