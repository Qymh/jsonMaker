exports.generateAddApi = obj => {
  const { apiName, createdAt, description } = obj
  return {
    apiName,
    createdAt,
    description
  }
}
