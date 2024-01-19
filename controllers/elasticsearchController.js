const { Client } = require('@elastic/elasticsearch');
require('dotenv').config()
const client = new Client({
    node: 'http://localhost:9200',
    auth: {
      username: process.env.ELASTIC_USERNAME,
      password: process.env.ELASTIC_PASSWORD,
    },
  });
// Function to create an Elasticsearch index
async function createIndex(indexName) {
  await client.indices.create({
    index: indexName,
  });
}

// Function to index data into Elasticsearch
async function indexData(indexName, data) {
  const body = data.flatMap(doc => [
    { index: { _index: indexName } },
    doc,
  ]);

  await client.bulk({ refresh: true, body });
}

module.exports = {
  createIndex,
  indexData,
};
