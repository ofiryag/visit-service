export interface IDbRepository<T> {
    connectToDatabase : () => Promise<T>;
}

export const IDbRepository = Symbol('IDbRepository');