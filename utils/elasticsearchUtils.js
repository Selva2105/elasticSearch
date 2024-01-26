const getSampleData = () => {
    const sampleData = [
        { name: 'Document 1', content: 'Sample content for document 1' },
        { name: 'Document 2', content: 'Sample content for document 2' },
        { name: 'Document 3', content: 'Sample content for document 3' },
    ];

    return sampleData;
};

async function getPatentData() {
    try {
        const url = 'https://api.patentsview.org/patents/query?q={"_gte":{"patent_date":"2007-01-04"}}&f=["patent_number","patent_date","patent_title"]';
        const response = await axios.get(url);
        return response.data.patents;
    } catch (error) {
        throw new Error(`Error fetching patent data: ${error.message}`);
    }
}

module.exports = { getSampleData, getPatentData };
