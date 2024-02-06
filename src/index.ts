// Import necessary modules
import express from 'express';
import * as dotenv from 'dotenv';
import UserRoute from "./routes/userRoute";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Add middleware to parse JSON in the request body
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});

// user
app.use('/api/user', UserRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
