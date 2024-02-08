import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
import UserRoute from "./routes/userRoute";
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(express.json());

// user
app.use('/api/user', UserRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
