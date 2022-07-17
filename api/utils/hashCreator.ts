const cr = require('crypto');

/**
 *
 * - @param {input = ""} 'The string to be hashed'.
 * - @returns 'unique string with the password encoded'.
 *
 */

export const hashCreator = (input: string = '') => {
  return cr.createHash('sha1').update(input).digest('hex');
};
