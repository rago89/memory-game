const checkParamAndBodyIds = (paramId?: string, bodyId?: string): boolean => {
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
};

export default checkParamAndBodyIds;
