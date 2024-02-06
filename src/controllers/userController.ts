import userModel from '../models/userModel';
import CustomResponse from '../util/customResponse';
import express from "express";

// registerUser
export const registerUser = async (req: express.Request, res: any) => {
    try {
        const userData = req.body;
        const result = await userModel.create(userData);
        // res.status(201).json({ message: 'User created successfully', data: result });
        res.status(201).send(new CustomResponse(201, 'User created successfully', result));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
};

