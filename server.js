const express = require('express');
const app = express();

const indexRouter = require('./routers/index')
// Middleware to parse JSON requests
app.use(express.json());

// Use the index router for Elasticsearch routes
app.use('/elasticsearch', indexRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
