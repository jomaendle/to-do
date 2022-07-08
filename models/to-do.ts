import * as mongodb from 'mongodb';

export interface ToDoItem {
  name: string;
  isDone: boolean;
  rank: number;
  _id?: mongodb.ObjectId;
}
