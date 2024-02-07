import connection from '../config/database';
import bcrypt from "bcrypt";

const userModel = {
    // create user
    create: (data: any) => {
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO userRegistration (name, email, password, age) VALUES (?, ?, ?, ?)',
                [data.name, data.email, data.password, data.age],
                (err, result, fields) => {
                    if (err) {
                        console.error('Error in create method:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    // get all users
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM userRegistration',
                (err, result) => {
                    if (err) {
                        console.error('Error in getAllUsers method:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    // getUserByEmail
    getUserByEmail: (data: any) => {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM userRegistration WHERE email = ?',
                [data.email],
                (err, result, fields) => {
                    if (err) {
                        console.error('Error in getUserByEmail method:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    // getUserById
    getUserById: (data: any) => {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM userRegistration WHERE id = ?',
                [data.id],
                (err, result, fields) => {
                    if (err) {
                        console.error('Error in getUserById method:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    // update user
    updateUser: async (data: any) => {
        try {
            const { name, email, age, password, id } = data;

            // Hash the password if it exists in the update data
            let hashedPassword = password;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            return await new Promise((resolve, reject) => {
                connection.query(
                    'UPDATE userRegistration SET name=?, email=?, age=?, password=? WHERE id = ?',
                    [name, email, age, hashedPassword, id],
                    (err, result, fields) => {
                        if (err) {
                            console.error('Error in update user method:', err);
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
        } catch (error) {
            console.error('Error in update user method:', error);
            throw error;
        }
    },

    // Add other methods as needed
};

export default userModel;
