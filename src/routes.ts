import * as express from 'express';
import * as mongodb from 'mongodb';
import { collections } from './database';

export const toDoRouter = express.Router();
toDoRouter.use(express.json());

toDoRouter.get('/', async (req, res) => {
  try {
    const toDoItems = await collections.toDoItems.find({}).toArray();
    res.status(200).send(toDoItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

toDoRouter.get('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const toDoItem = await collections.toDoItems.findOne(query);

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
    const toDo = req.body;
    const result = await collections.toDoItems.insertOne(toDo);

    if (result.acknowledged) {
      res.status(201).send(`Created new To-Do item: ${result.insertedId}`);
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
    const result = await collections.toDoItems.updateOne(query, {
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
    const result = await collections.toDoItems.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an To-Do item: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an To-Do item: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an To-Do item: ID ${id}`);
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
