export function createError(status:number,message:string) {
    return {
        success: false,
        status: status,
        message:message
    }
}