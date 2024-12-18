

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const all = require('./Routes/auth'); 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', require('./Routes/auth'));
app.use('/api/schools', require('./Routes/school'));
app.use('/api/classrooms', require('./Routes/classroom'));
app.use('/api/students', require('./Routes/students'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Hello Chaitanya!!! You server running on port ${PORT}`));
    