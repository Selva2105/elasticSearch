const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

// Creating a new Elasticsearch Client instance with environment variables for node URL and authentication
const client = new Client({
    node: process.env.ELASTICSEARCH_NODE,
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD,
    },
});

// Function to create an index in Elasticsearch
async function createIndex(indexName) {
    try {
        // Attempting to create the specified index
        await client.indices.create({ index: indexName });
        console.log(`Index '${indexName}' created successfully`);
    } catch (error) {
        // Logging and re-throwing any errors that occur during index creation
        console.error(`Failed to create index '${indexName}': ${error.message}`);
        throw new Error(`Failed to create index '${indexName}': ${error.message}`);
    }
}

// Function to delete an index from Elasticsearch
async function deleteIndex(indexName) {
    try {
        // Attempting to delete the specified index
        await client.indices.delete({ index: indexName });
        console.log(`Index '${indexName}' deleted successfully`);
    } catch (error) {
        // Logging and re-throwing any errors that occur during index deletion
        console.error(`Failed to delete index '${indexName}': ${error.message}`);
        throw new Error(`Failed to delete index '${indexName}': ${error.message}`);
    }
}

// Function to bulk index data into Elasticsearch
async function indexData(indexName, data) {
    try {
        const batchSize = 1000;

        // Looping through data in batches and indexing them
        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);
            const body = batch.flatMap(doc => [{ index: { _index: indexName } }, doc]);
            await client.bulk({ refresh: true, body });
        }
        console.log(`Data indexed into '${indexName}' successfully`);
    } catch (error) {
        // Logging and re-throwing any errors that occur during data indexing
        console.error(`Failed to index data into '${indexName}': ${error.message}`);
        throw new Error(`Failed to index data into '${indexName}': ${error.message}`);
    }
}

module.exports = { createIndex, indexData, deleteIndex };
