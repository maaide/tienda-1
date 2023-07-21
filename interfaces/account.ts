export interface IAccount {
    firstName: string
    lastName: string
    email: string
    phone?: string
    address?: IAddress
}

export interface IAddress {
    address: string
    details?: string
    region: string
    city: string
}