function checkResponse<T>(res: Response): Promise<T> {
    return res.ok ? res.json() : Promise.reject(res.status);
}

export function createUser () {
    return fetch()
}