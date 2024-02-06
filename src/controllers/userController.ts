// userController.js
import userModel from '../models/userModel';

const create = (req:any, res:any) => {
    const userData = req.body; // Assuming you're sending data in the request bodyc
    console.log(userData);
    userModel.create(userData, (err:any, result:any) => {
        if (err) {
            return res.status(500).json({ error: 'Error creating user' });
        }
        res.status(201).json({ message: 'User created successfully', data: result });
    });
};

export default create;
