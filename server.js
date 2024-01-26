const express = require('express');
const dotenv = require('dotenv'); 
const indexRouter = require('./routers/index');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/elasticsearch', indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
