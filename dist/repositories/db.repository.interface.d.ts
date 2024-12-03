export interface IDbRepository<T> {
    connectToDatabase: () => Promise<T>;
}
export declare const IDbRepository: unique symbol;
