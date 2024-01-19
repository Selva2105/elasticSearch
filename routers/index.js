const express = require('express');
const router = express.Router();
const elasticsearchController = require('../controllers/elasticsearchController');
const elasticsearchUtils = require('../utils/elasticsearchUtils');

// Endpoint to create an index and index sample data
router.post('/initialize', async (req, res) => {
    try {
        // Create the Elasticsearch index
        await elasticsearchController.createIndex('sample_index');

        // Index sample data
        const sampleData = elasticsearchUtils.getSampleData();
        await elasticsearchController.indexData('sample_index', sampleData);

        res.status(200).json({ message: 'Index created and sample data indexed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to index patent data
router.post('/index-patents', async (req, res) => {
    try {

        // Create the Elasticsearch index
        await elasticsearchController.createIndex('patent_index');

        // Index patent data
        const patentData = elasticsearchUtils.getPatentData();
        await elasticsearchController.indexData('patent_index', patentData);

        res.status(200).json({ message: 'Patent data indexed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
