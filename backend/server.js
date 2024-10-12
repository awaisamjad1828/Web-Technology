const express = require('express');
const connectDB = require("./database/db")
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const cors = require('cors');
require('dotenv').config();
const app = express();



const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
// connect DB
connectDB();

// Routes
app.use('/api', signupRoutes);

app.use('/api', loginRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});