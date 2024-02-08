import express, {Router} from "express";
import {
    deleteUser,
    getAllUsers,
    getUserById,
    loginUser,
    registerUser,
    saveUser,
    updateUser
} from "../controllers/userController";
import {verifyToken} from "../auth/verifyToken";


const route: Router = express.Router();

//registerd user
route.post('/register', registerUser);

//save user
route.post('/saveUser', verifyToken, saveUser);
//login user
route.post('/login', loginUser);

//get all users
route.get('/getAll', verifyToken, getAllUsers);

//get user by id
route.get('/get/:id', verifyToken, getUserById);

//update user details
route.put('/update/:id', verifyToken, updateUser);

//delete user
route.delete('/delete/:id', verifyToken, deleteUser);

export default route;
