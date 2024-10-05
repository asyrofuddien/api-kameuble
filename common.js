async function RemoveCreatedAndUpdatedAt(object) {
  if (object?.createdAt) delete object.createdAt;
  if (object?.updatedAt) delete object.updatedAt;
  if (object?.__v) delete object.__v;

  return object;
}

module.exports = {
  RemoveCreatedAndUpdatedAt,
};
