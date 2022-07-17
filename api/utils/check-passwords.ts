import User from 'api/models/user';
import { hashCreator } from './hashCreator';

const checkPasswords = (
  oldPassword: string,
  newPassword: string,
  user: User
) => {
  const newPasswordHashed = hashCreator(newPassword);
  const currentPassword = hashCreator(oldPassword);

  if (user.password === newPasswordHashed) {
    throw Error('New password and current password are the same!');
  }
  if (user.password !== currentPassword) {
    throw Error('Current password incorrect!');
  }

  return newPasswordHashed;
};

export default checkPasswords;
