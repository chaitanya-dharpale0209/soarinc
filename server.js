const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./soar/Config/db'); // Change from import to require
const { all } = require('./soar/Routes/auth'); // Change from import to require

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', require('./soar/Routes/auth'));
app.use('/api/schools', require('./soar/Routes/school'));
app.use('/api/classrooms', require('./soar/Routes/classroom'));
app.use('/api/students', require('./soar/Routes/students'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Hello Chaitanya!!! Your server is running on port ${PORT}`));
