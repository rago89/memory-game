import User from 'api/models/user';

const checkEmails = (currentEmail: string, newEmail: string, user: User) => {
  if (currentEmail !== user.email) {
    throw Error('Current email incorrect!');
  }
  if (newEmail === user.email) {
    throw Error(`Current email and New email are the same!`);
  }
  return newEmail;
};

export default checkEmails;
