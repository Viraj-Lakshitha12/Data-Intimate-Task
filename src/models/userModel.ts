import connection from '../config/database';

const userModel = {
    create: (data: any) => {
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO userRegistration (name, email, password,age) VALUES (?, ?, ?,?)',
                [data.name, data.email, data.password,data.age],
                (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    // Add other methods as needed
};

export default userModel;
