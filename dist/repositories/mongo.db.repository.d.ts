import { MongoClient } from 'mongodb';
import { IDbRepository } from './db.repository.interface';
export declare class MongoDbRepository implements IDbRepository<MongoClient> {
    constructor();
    connectToDatabase(): Promise<MongoClient>;
}
