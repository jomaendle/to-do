import * as mongodb from 'mongodb';
import { ToDoItem } from './models/to-do';

export const collections: {
  toDoItems?: mongodb.Collection<ToDoItem>;
} = {};

async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db('to_do');
  await applySchemaValidation(db);

  collections.toDoItems = db.collection<ToDoItem>('toDoItems');
}

async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'isDone'],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: 'string',
          description: "'name' must be a string and is required",
        },
        isDone: {
          bsonType: 'bool',
          description: "'isDone' must be a boolean and is required",
        },
        rank: {
          bsonType: 'int',
          description: "'rank' must be an int and is required",
        },
      },
    },
  };

  await db
    .command({
      collMod: 'toDoItems',
      validator: jsonSchema,
    })
    .catch(async (err: mongodb.MongoServerError) => {
      if (err.codeName === 'NamespaceNotFound') {
        await db.createCollection('toDoItems', {
          validator: jsonSchema,
        });
      }
    });
}

module.exports = connectToDatabase;
