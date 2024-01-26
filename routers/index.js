const express = require('express');
const router = express.Router();
const elasticsearchController = require('../controllers/elasticsearchController'); 
const elasticsearchUtils = require('../utils/elasticsearchUtils'); 

// Endpoint to initialize Elasticsearch with sample data
router.post('/initialize', async (req, res) => {
    try {
        // Create index for sample data
        await elasticsearchController.createIndex('sample_index');
        
        // Get sample data
        const sampleData = elasticsearchUtils.getSampleData();
        
        // Index sample data into Elasticsearch
        await elasticsearchController.indexData('sample_index', sampleData);
        
        // Send success response
        res.status(200).json({ message: 'Index created and sample data indexed successfully' });
    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to index patent data into Elasticsearch
router.post('/index-patents', async (req, res) => {
    try {
        // Create index for patents
        await elasticsearchController.createIndex('patent_index');
        
        // Get patent data
        const patentData = await elasticsearchUtils.getPatentData();
        
        // Index patent data into Elasticsearch
        await elasticsearchController.indexData('patent_index', patentData);
        
        // Send success response
        res.status(200).json({ message: 'Patent data indexed successfully' });
    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to delete an Elasticsearch index
router.delete('/delete-index/:indexName', async (req, res) => {
    try {
        const { indexName } = req.params;
        
        // Delete the specified index
        await elasticsearchController.deleteIndex(indexName);
        
        // Send success response
        res.status(200).json({ message: `Index '${indexName}' deleted successfully` });
    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
