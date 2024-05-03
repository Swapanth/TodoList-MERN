const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Todoroutes = require('./routes/TodoRoutes');
// Load environment variables from .env file
dotenv.config();

// Retrieve PORT from environment variables or set a default value
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

// Using the routes
app.use('/todos', Todoroutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
