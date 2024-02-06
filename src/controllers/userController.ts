import userModel from '../models/userModel';
import CustomResponse from '../util/customResponse';
import express from "express";
import bcrypt from "bcrypt";
import process from "process";
import jwt, {Secret} from "jsonwebtoken";

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

// loginUser
export const loginUser = async (req: express.Request, res: any) => {
    try {
        const {email, password} = req.body;
        const userByEmail: any = await userModel.getUserByEmail({email});
        const expiresIn = 36000;

        if (userByEmail) {
            const isMatchUser: boolean = await bcrypt.compare(password, userByEmail[0].password);
            if (isMatchUser) {
                jwt.sign(
                    {userByEmail},
                    process.env.SECRET_KEY as Secret,
                    {expiresIn}, // Set the expiration time
                    (error: any, token: any) => {
                        if (error) {
                            res.status(500).send(new CustomResponse(500, "something went wrong"));
                        } else {
                            let req_body: any = {
                                user: userByEmail,
                                accessToken: token
                            }
                            res.status(200).send(new CustomResponse(200, "Token generated", req_body));
                        }
                    }
                );

                // res.status(200).send(new CustomResponse(200, 'Login successful', userByEmail));
            } else {
                res.status(401).send(new CustomResponse(401, 'Incorrect password'));
            }
        } else {
            res.status(404).send(new CustomResponse(404, `Cannot find user with email: ${email}`));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(new CustomResponse(500, 'Something went wrong', error));
    }
};


//get all users
export const getAllUsers = async (req: express.Request, res: any) => {
    try {
        let newVar = await userModel.getAllUsers();
        res.status(200).send(new CustomResponse(200, "all users", newVar));
    } catch (error) {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    }
}
