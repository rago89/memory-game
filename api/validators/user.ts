import User from '../models/user';
import { hashCreator } from '../utils/hashCreator';

const userValidator = {
  checkEmails: (currentEmail: string, newEmail: string, user: User) => {
    if (currentEmail !== user.email) {
      throw Error('Current email incorrect!');
    }
    if (newEmail === user.email) {
      throw Error(`Current email and New email are the same!`);
    }
    return newEmail;
  },
  checkPasswords: (oldPassword: string, newPassword: string, user: User) => {
    const newPasswordHashed = hashCreator(newPassword);
    const currentPassword = hashCreator(oldPassword);

    if (user.password === newPasswordHashed) {
      throw Error('New password and current password are the same!');
    }
    if (user.password !== currentPassword) {
      throw Error('Current password incorrect!');
    }

    return newPasswordHashed;
  },
  checkParamAndBodyIds: (paramId?: string, bodyId?: string): boolean => {
    if (!paramId) {
      throw new Error(`There is not id in params`);
    }
    if (!bodyId) {
      throw new Error(`There is not id in body`);
    }
    if ([...paramId].length !== 24) {
      throw new Error(`Invalid param id`);
    }
    if ([...bodyId!].length !== 24) {
      throw new Error(`Invalid id in body id`);
    }
    if (bodyId !== paramId) {
      throw new Error('Cannot change user ID after creation!');
    }
    return true;
  },
};

export default userValidator;
