const axios = require('axios'); // Importing Axios for making HTTP requests

// Function to get sample data
const getSampleData = () => {
    const sampleData = [
        { 
            name: 'Product 1', 
            description: 'This is the first sample product.', 
            price: 29.99, 
            category: 'Electronics', 
            inStock: true 
        },
        { 
            name: 'Product 2', 
            description: 'Sample description for product 2.', 
            price: 49.99, 
            category: 'Clothing', 
            inStock: false 
        },
        { 
            name: 'Product 3', 
            description: 'Detailed description for product 3.', 
            price: 99.99, 
            category: 'Home & Kitchen', 
            inStock: true 
        },
    ];

    return sampleData;
};

// Function to get patent data asynchronously
async function getPatentData() {
    try {
        // API URL for fetching patent data
        const url = 'https://api.patentsview.org/patents/query?q={"_gte":{"patent_date":"2007-01-04"}}&f=["patent_number","patent_date","patent_title"]';
        const response = await axios.get(url);
        return response.data.patents;
    } catch (error) {
        // Handling any errors that occur during the API request
        throw new Error(`Error fetching patent data: ${error.message}`);
    }
}

module.exports = { getSampleData, getPatentData };
