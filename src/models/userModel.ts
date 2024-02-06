// userModel.js
import connection from '../config/database';

const userModel = {
    create: (data: any, callback: any) => {
        connection.query(
            'INSERT INTO userRegistration (name, email, password,age) VALUES (?,?, ?, ?)',
            [data.name, data.email, data.password,data.age],
            (err, result, fields) => {
                if (err) {
                    console.log("error is "+err);
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },

    // Add other methods as needed (e.g., getByEmail, getById, update, delete, etc.)
};

export default userModel;
