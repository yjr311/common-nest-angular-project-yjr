export interface ApiResponse<T = any> {
    code: number;
    msg: string;
    data: T;
}

/**
 * 
 * @param data T = {
                  hospitals: Hospital[]
                }
 * @param msg 
 * @returns 
 */
export const success = <T>(data: T, msg = 'success'): ApiResponse<T> => ({
    code: 200,
    msg,
    data,
});

export const fail = (msg = 'error', code = 400): ApiResponse<null> => ({
    code,
    msg,
    data: null,
});
