async function RemoveCreatedAndUpdatedAt(object) {
  delete object.createdAt;
  delete object.updatedAt;
  delete object.__v;

  return object;
}

module.exports = {
  RemoveCreatedAndUpdatedAt,
};
