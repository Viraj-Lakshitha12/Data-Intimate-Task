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
        userData.password = await bcrypt.hash(userData.password, 10);
        const result = await userModel.create(userData);

        // res.status(201).json({ message: 'User created successfully', data: result });
        res.status(201).send(new CustomResponse(201, 'User created successfully', result));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error creating user'});
    }
};

//save user
export const saveUser = async (req: express.Request, res: any) => {
    try {
        const userData = req.body;
        userData.password = await bcrypt.hash(userData.password, 10);
        const result = await userModel.create(userData);

        // res.status(201).json({ message: 'User created successfully', data: result });
        res.status(201).send(new CustomResponse(201, 'User created successfully', result));
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error creating user'});
    }
}

// loginUser (check auth)
export const loginUser = async (req: express.Request, res: any) => {
    try {
        const {email, password} = req.body;
        const userByEmail: any = await userModel.getUserByEmail({email});
        const expiresIn = '1h';

        if (userByEmail.length > 0) {
            const isMatchUser: boolean = await bcrypt.compare(password, userByEmail[0].password);

            if (isMatchUser) {
                jwt.sign(
                    {user: userByEmail[0]},
                    process.env.SECRET_KEY as Secret,
                    {expiresIn},
                    (error: any, token: any) => {
                        if (error) {
                            console.error('JWT Sign Error:', error);
                            res.status(500).send(new CustomResponse(500, 'Something went wrong'));
                        } else {
                            const responseData = {
                                user: userByEmail[0],
                                accessToken: token
                            };
                            res.status(200).send(new CustomResponse(200, 'Token generated', responseData));
                        }
                    }
                );
            } else {
                res.status(401).send(new CustomResponse(401, 'Incorrect password'));
            }
        } else {
            res.status(404).send(new CustomResponse(404, `Cannot find user with email: ${email}`));
        }
    } catch (error) {
        console.error('Login Error:', error);
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

// get user by id
export const getUserById = (req: any, res: any) => {
    const userId = req.params.id;
    userModel.getUserById({id: userId})
        .then((result: any) => {
            if (result.length > 0) {
                res.status(200).json({message: 'User found', data: result[0]});
            } else {
                res.status(404).json({message: 'User not found'});
            }
        })
        .catch((error: any) => {
            console.error('Error:', error);
            res.status(500).json({error: 'Error fetching user by ID'});
        });
};

// user update
export const updateUser = async (req: express.Request, res: any) => {
    try {
        const {id} = req.params;
        const userData = req.body;
        const userById: any = await userModel.getUserById({id});

        if (userById.length > 0) {
            const updateUser = await userModel.updateUser({...userData, id});
            res.status(200).send(new CustomResponse(200, 'Successfully updated user', updateUser));
        } else {
            res.status(404).send(new CustomResponse(404, `Cannot find user with ID: ${id}`));
        }
    } catch (error) {
        res.status(500).send(new CustomResponse(500, 'Something went wrong', error));
    }
};

//delete user
export const deleteUser = async (req: express.Request, res: any) => {
    try {
        const {id} = req.params;
        const userById: any = await userModel.getUserById({id});

        if (userById.length > 0) {
            const deleteUser = await userModel.deleteUser({id});
            res.status(200).send(new CustomResponse(200, 'Successfully deleted user', deleteUser));
        } else {
            res.status(404).send(new CustomResponse(404, `Cannot find user with ID: ${id}`));
        }
    } catch (error) {
        res.status(500).send(new CustomResponse(500, 'Something went wrong', error));
    }
};
