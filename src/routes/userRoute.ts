import express, {Router} from "express";
import {getAllUsers, loginUser, registerUser} from "../controllers/userController";


const route: Router = express.Router();

//registerd user
route.post('/register', registerUser);

//login user
route.post('/login',loginUser);

//get all users
route.get('/getAll',getAllUsers);

export default route;
