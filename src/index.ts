// Import necessary modules
import express from 'express';
import create from "./controllers/userController";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Add middleware to parse JSON in the request body
app.use(express.json());

// Your routes go here
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

app.post('/save', create);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
