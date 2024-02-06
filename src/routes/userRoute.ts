import express, {Router} from "express";
import registerUser from "../controllers/userController";


const route: Router = express.Router();

//registerd user
route.post('/register', registerUser);

export default route;
