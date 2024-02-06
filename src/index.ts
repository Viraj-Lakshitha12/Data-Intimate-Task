import express from 'express';
import * as dotenv from 'dotenv';
import UserRoute from "./routes/userRoute";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// user
app.use('/api/user', UserRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
