const { Client } = require('@elastic/elasticsearch');
require('dotenv').config()
const client = new Client({
    node: process.env.ELASTICSEARCH_NODE,
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD,
    },
});

async function createIndex(indexName) {
    try {
        await client.indices.create({ index: indexName });
        console.log(`Index '${indexName}' created successfully`);
    } catch (error) {
        console.error(`Failed to create index '${indexName}': ${error.message}`);
        throw error;
    }
}

async function deleteIndex(indexName) {
    try {
        await client.indices.delete({ index: indexName });
        console.log(`Index '${indexName}' deleted successfully`);
    } catch (error) {
        console.error(`Failed to delete index '${indexName}': ${error.message}`);
        throw error;
    }
}

async function indexData(indexName, data) {
    try {
        const batchSize = 1000; // Adjust batch size as needed
        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);
            const body = batch.flatMap(doc => [{ index: { _index: indexName } }, doc]);
            await client.bulk({ refresh: true, body });
        }
        console.log(`Data indexed into '${indexName}' successfully`);
    } catch (error) {
        console.error(`Failed to index data into '${indexName}': ${error.message}`);
        throw error;
    }
}

module.exports = { createIndex, indexData, deleteIndex };
