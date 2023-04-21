export interface AppResponse<T> {

    statusCode: number,
    message: string,
    meta?: Meta,
    data?: T,

}

interface Meta {
    totalItems: number,
    totalPages: number,
}
