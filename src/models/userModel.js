const pool = require('../services/db');

var userModel = {

    getUsers: (callback) => {
        const SQLSTATMENT = `SELECT * FROM user;`;
        pool.query(SQLSTATMENT, callback);
    },

    getUserById: (data, callback) => {
        const SQLSTATMENT = `SELECT * FROM user WHERE userid = ?;`;
        const VALUES = [data.userid];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    insertNewUser: (data, callback) => {
        const SQLSTATMENT = `
            INSERT INTO user (username, email, role, password)
            VALUES (?,?,?,?);
            `;
        const VALUES = [data.username, data.email, data.role, data.password];
    
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    updateUserById : (data, callback) => {
        const SQLSTATMENT = `
            UPDATE user
            SET username=?, email=?
            WHERE userid=?;
            `;
        const VALUES = [data.username, data.email, data.userid];
    
        pool.query(SQLSTATMENT, VALUES, callback);
    },    

    deleteUserById : (data, callback) => {
        const SQLSTATMENT = `
            DELETE FROM user
            WHERE userid = ?
            `;
        const VALUES = [data.userid];
    
        pool.query(SQLSTATMENT, VALUES, callback);        
    },
 
    loginUser: (data, callback) => {
        const SQLSTATMENT = `select * from user where email=? and password=?`;
        const VALUES = [data.email, data.password];

        pool.query(SQLSTATMENT, VALUES, callback);
    },

    checkUsernameOrEmailExist: (data, callback) => {
        const SQLSTATMENT = `SELECT * FROM user where email=? or username=?`;
        const VALUES = [data.email, data.username];

	    pool.query(SQLSTATMENT, VALUES, callback);
    },

    checkUsernameExist: (data, callback) => {
        const SQLSTATMENT = `SELECT * FROM user where username=?`;
        const VALUES = [data.username];

        pool.query(SQLSTATMENT, VALUES, callback);
    }
}

module.exports = userModel;