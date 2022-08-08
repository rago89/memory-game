import { ObjectId } from 'mongodb';

type Image = { data: string; contentType: string };

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  registerDate: string;
  updateDate: string;
  gameLevel?: string;
  avatar?: Image;
}

export interface UserIncomingData {
  name: string;
  email: string;
  password: string;
}

export interface CreatedUser {
  _id?: ObjectId;
  name: string;
  email: string;
  gameLevel?: string;
}

export interface UpdatedUser {
  _id?: ObjectId;
  name: string;
  email: string;
  gameLevel?: string;
  avatar?: Image;
  updateDate?: Date;
}

export interface UserDataToUpdate {
  _id?: string;
  name?: string;
  email?: string;
  currentEmail?: string;
  newEmail?: string;
  password: string;
  newPassword: string;
  oldPassword: string;
  gameLevel?: string;
  avatar?: Image;
}
