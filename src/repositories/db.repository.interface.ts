export interface IDbRepository<T> {
    connectToDbClient : () => Promise<T>;
}

export const IDbRepository = Symbol('IDbRepository');