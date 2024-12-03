import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { IDbRepository } from './db.repository.interface';

@Injectable()
export class MongoDbRepository implements IDbRepository<MongoClient> {
  constructor() {}

  async connectToDatabase():Promise<MongoClient> {
    const client = new MongoClient("mongodb://localhost:27017", {});

    try {
      await client.connect();
      console.log('Connected to MongoDB');
      return client;
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
    }
  }
}
