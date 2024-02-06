import userModel from '../models/userModel';
import CustomResponse from '../util/customResponse';
import express from "express";
import bcrypt from "bcrypt";


// registerUser
export const registerUser = async (req: express.Request, res: any) => {
    try {
        const userData = req.body;
        // Hash the password
        userData.password = await bcrypt.hash(userData.password, 10); // Update the password in the user data
        const result = await userModel.create(userData);

        // res.status(201).json({ message: 'User created successfully', data: result });
        res.status(201).send(new CustomResponse(201, 'User created successfully', result));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error creating user'});
    }
};

//login user
export const loginUser = async (req: express.Request, res: any) => {
}

//get all users
export const getAllUsers = async (req: express.Request, res: any) => {
    try {
        let newVar = await userModel.getAllUsers();
        res.status(200).send(new CustomResponse(200, "all users", newVar));
    } catch (error) {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    }
}
