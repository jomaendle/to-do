import * as express from 'express';
import * as mongodb from 'mongodb';
import { AnyBulkWriteOperation, Db, MongoClient } from 'mongodb';
import { ToDoItem } from './models/to-do';
import * as dotenv from 'dotenv';
import path from 'path';

export const toDoRouter = express.Router();
toDoRouter.use(express.json());

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const mongoClient: MongoClient = new MongoClient(process.env.ATLAS_URI);
const clientPromise: Promise<MongoClient> = mongoClient.connect();

toDoRouter.get('/', async (req, res) => {
  try {
    const database: Db = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection(process.env.MONGODB_COLLECTION);
    const toDoItems = await collection.find({}).toArray();
    res.status(200).send(toDoItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

toDoRouter.get('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const database: Db = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection(process.env.MONGODB_COLLECTION);
    const toDoItem = await collection.findOne(query);

    if (!toDoItem) {
      res.status(404).send(`To-Do item not found: ID: ${id}`);
    } else {
      res.status(200).send(toDoItem);
    }
  } catch (err) {
    res.status(404).send(`Failed to find To-Do item: ${req?.params.id}`);
  }
});

toDoRouter.post('/', async (req, res) => {
  try {
    const toDo: ToDoItem = req.body;
    const database: Db = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    toDo.rank = await collection.countDocuments();
    const result = await collection.insertOne(toDo);

    if (result.acknowledged) {
      res.status(201).send(`Created new To-Do item: ${result}`);
    } else {
      res.status(500).send('Failed to create To-Do item');
    }
  } catch (e) {
    console.error(e);
    res.status(400).send(e.message);
  }
});

toDoRouter.put('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const toDoItem = req.body;
    const query = { _id: new mongodb.ObjectId(id) };

    const database: Db = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const result = await collection.updateOne(query, {
      $set: toDoItem,
    });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated To-Do item: ${id}`);
    } else if (!result.matchedCount) {
      res.status(404).send(`Failed to update To-Do item: ${id}`);
    } else {
      res.status(304).send('Failed to update To-Do item');
    }
  } catch (e) {
    console.error(e);
    res.status(400).send(e.message);
  }
});

toDoRouter.delete('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const database: Db = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const deletedItem: any = await collection.findOneAndDelete(query);
    const allItems = await collection.find({}).toArray();

    const bulkArray: AnyBulkWriteOperation[] = [];
    if (allItems?.length > 0) {
      allItems.forEach((d, i) => {
        const newRank =
          allItems[i].rank < deletedItem.value.rank ? allItems[i].rank : allItems[i].rank - 1;

        bulkArray.push({
          updateOne: {
            filter: { _id: allItems[i]._id },
            update: { $set: { rank: newRank } },
            upsert: true,
          },
        });
      });
      await collection.bulkWrite(bulkArray, { ordered: true });
    }

    if (deletedItem) {
      res.status(202).send(`Removed an To-Do item: ID ${id}`);
    } else if (!deletedItem) {
      res.status(400).send(`Failed to remove an To-Do item: ID ${id}`);
    } else if (!deletedItem.deletedCount) {
      res.status(404).send(`Failed to find an To-Do item: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
