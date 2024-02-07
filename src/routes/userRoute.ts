import express, {Router} from "express";
import {getAllUsers, getUserById, loginUser, registerUser, updateUser} from "../controllers/userController";
import {verifyToken} from "../auth/verifyToken";


const route: Router = express.Router();

//registerd user
route.post('/register', registerUser);

//login user
route.post('/login', loginUser);

//get all users
route.get('/getAll', verifyToken, getAllUsers);

//get user by id
route.get('/get/:id', verifyToken, getUserById);

route.put('/update/:id', updateUser);
export default route;
