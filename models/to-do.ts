import * as mongodb from 'mongodb';

export interface ToDoItem {
  name: string;
  isDone: boolean;
  _id?: mongodb.ObjectId;
}
