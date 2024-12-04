import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { IDbRepository } from './db.repository.interface';

@Injectable()
export class MongoDbRepository implements IDbRepository<MongoClient> {
  private client: MongoClient;

  constructor() {}

    /**
    * Checks if the client is connected.
    * @returns true if the client is connected, otherwise return false.
    */
    private async isConnected(): Promise<boolean> {
    try {
      await this.client.db().command({ ping: 1 });
      return true; 
    } catch (error) {
      return false;
    }
  }

    /**
    * Connect to db client if it's not connected
    * @returns MongoClient A mongo db client.
    */
    async connectToDbClient(): Promise<MongoClient> {
    if (this.client && await this.isConnected()) {
      return this.client;
    }
    this.client = new MongoClient("mongodb://localhost:27017");

    console.log("trying to connect mongodb");
    await this.client.connect();

    console.log("successfully connected to mongodb");
    return this.client;
  }
}
