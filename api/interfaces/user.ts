import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  registerDate: string;
  updateDate: string;
  gameLevel?: string;
  avatar?: { data: string; contentType: string };
}

export interface UserIncomingData {
  name: string;
  email: string;
  password: string;
}

export interface ReturnedUserAfterCreation {
  _id?: ObjectId;
  name: string;
  email: string;
  gameLevel?: string;
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
  avatar?: { data: string; contentType: string };
}
