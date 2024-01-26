const express = require('express');
const router = express.Router();
const elasticsearchController = require('../controllers/elasticsearchController');
const elasticsearchUtils = require('../utils/elasticsearchUtils');

router.post('/initialize', async (req, res) => {
    try {
        await elasticsearchController.createIndex('sample_index');
        const sampleData = elasticsearchUtils.getSampleData();
        await elasticsearchController.indexData('sample_index', sampleData);
        res.status(200).json({ message: 'Index created and sample data indexed successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/index-patents', async (req, res) => {
    try {
        await elasticsearchController.createIndex('patent_index');
        const patentData = await elasticsearchUtils.getPatentData();
        await elasticsearchController.indexData('patent_index', patentData);
        res.status(200).json({ message: 'Patent data indexed successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/delete-index/:indexName', async (req, res) => {
    try {
        const { indexName } = req.params;
        await elasticsearchController.deleteIndex(indexName);
        res.status(200).json({ message: `Index '${indexName}' deleted successfully` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
