const axios = require('axios');

function getSampleData() {
    const sampleData = [
        { name: 'Document 1', content: 'Sample content for document 1' },
        { name: 'Document 2', content: 'Sample content for document 2' },
        { name: 'Document 3', content: 'Sample content for document 3' },
    ];

    return sampleData;
}

const getPatentData = async () => {
    const url = 'https://api.patentsview.org/patents/query?q=%7b%22_gte%22:%7b%22patent_date%22:%222007-01-04%22%7d%7d&f=%5b%22patent_number%22,%22patent_date%22,%22patent_title%22%5d';

    try {
        // GET request to the specified URL
        const response = await axios.get(url);

        // Extract the relevant patent data from the response
        const patentData = response.data.patents;

        return patentData;
    } catch (error) {
        console.error('Error fetching patent data:', error.message);
        throw error; 
    }
};

module.exports = {
    getSampleData,
    getPatentData,
};
