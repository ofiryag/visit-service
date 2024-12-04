export interface IDbRepository<T> {
    connectToDbClient: () => Promise<T>;
}
export declare const IDbRepository: unique symbol;
