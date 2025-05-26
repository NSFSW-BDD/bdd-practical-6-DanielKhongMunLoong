const model = require("../models/userModel");

var userController = {
    getAllUser: (req, res, next) =>
    {
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readAllUser:", error);
                res.status(500).json(error);
            }  
            else res.status(200).json(results);
        }

        model.getUsers(callback);
    },

    getUserById: (req, res, next) =>
    {
        const data = {
            userid: req.params.userid
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error readUserById:", error);
                res.status(500).json(error);
            } else {
                if(results.length == 0) 
                {
                    res.status(404).json({
                        message: "User not found"
                    });
                }
                else res.status(200).json(results[0]);
            }
        }

        model.getUserById(data, callback);
    },

    createNewUser : (req, res, next) =>
    {
        const data = {
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            password: req.body.password
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error createNewUser:", error);
                res.status(500).json(error);
            } else {
                res.status(201).json(results);
            }
        }

        model.insertNewUser(data, callback);
    },

    updateUserById: (req, res, next) =>
    {

        const data = {
            userid: req.params.userid,
            username: req.body.username,
            email:req.body.email
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error updateUserById:", error);
                res.status(500).json(error);
            } else {
                if(results.affectedRows == 0) 
                {
                    res.status(404).json({
                        message: "User not found"
                    });
                }
                else res.status(204).send(); // 204 No Content
            }
        }

        model.updateUserById(data, callback);
    },

    deleteUserById:(req, res, next) =>
    {
        const data = {
            userid: req.params.userid
        }

        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error deleteUserById:", error);
                res.status(500).json(error);
            } else {
                if(results.affectedRows == 0) 
                {
                    res.status(404).json({
                        message: "User not found"
                    });
                }
                else res.status(204).send(); // 204 No Content            
            }
        }

        model.deleteUserById(data, callback);
    },

    // BDD unit 6 practical lab 6.9
    loginUser: (req, res, next) => 
    {
        const data = {
            email: req.body.email,
            password: req.body.password
        };

        const callback = (error, results, fields) => {
            if (error) 
            {
                console.error("Error Login:", error);
                res.status(500).json(error);
            }
            else 
            {
                //no match   
                if (results.length == 0) 
                {
                    res.status(404).json({
                        message: "email/password wrong",
                    });
                }
                else 
                {  
                    //match email and password
                    res.locals.userid = results[0].userid; //saves userid from database in res.locals for use in jwt payload
                    res.locals.role = results[0].role;     //saves role from database in res.locals for use in jwt payload
                    res.locals.message = 'Token successfully generated and sent back';
                    next(); //call next middleware to issue token
                }
            }
        };

        model.loginUser(data, callback);
    },

    checkUsernameOrEmailExist: (req, res, next) => 
    {
        const data = {
            email: req.body.email,
            username: req.body.username
        };

        const callback = (error, results, fields) => {
            if (error) 
            {
                console.error("Error Login:", error);
                res.status(500).json(error);
            }
            else 
            {
                
                if (results.length == 0) 
                {
                    // Does not exist in database, both are unique
                    next(); //call next middleware to hash password				
                }
                else 
                {  
                    // match existing email or username, either is not unique
                    res.status(404).json( {message: "email or username already exist in database."} );
                }
            }
        };

        model.checkUsernameOrEmailExist(data, callback);
    },

    register : (req, res, next) =>
    {
        // check if request body contains necessary fields
        const username_exist = (typeof req.body.username !== "undefined");
        const email_exist = (typeof req.body.email !== "undefined");
        const role_exist = (typeof req.body.role !== "undefined");
        const pw_exist = (typeof req.body.password !== "undefined");
        const body_info_exist = username_exist && email_exist && role_exist && pw_exist;
        
        if(body_info_exist)
        {
            const data = {
                username: req.body.username,
                email: req.body.email,
                role: req.body.role,
                password: res.locals.hash
            };
            
            res.locals.role = req.body.role;
            res.locals.message = 'User ' + data.username;

            const callback = (error, results, fields) => {
                if (error) 
                {
                    console.error("Error register for new user:", error);
                    res.status(500).json(error);
                    res.locals.role = '';
                    res.locals.message = '';
                } 
                else 
                {
                    console.log('Inserted row ID:', results.insertId);
                    res.locals.userid = results.insertId;
                    res.locals.message = res.locals.message + ' created successfully';
                    next(); //call next middleware to issue token
                }
            }

            model.insertNewUser(data, callback);
        }
        else
        {
            res.status(500).json({ message: "Username or email or role or password are not provided."});	
        }
    },

    loginUserBcrypt : (req, res, next) =>
    {
        // check if request body contains necessary fields
        const username_exist = (typeof req.body.username !== "undefined");
        const pw_exist = (typeof req.body.password !== "undefined");
        const body_info_exist = username_exist && pw_exist;
        
        if(body_info_exist)
        {
            const data = { username: req.body.username };
            
            const callback = (error, results, fields) => {
                if (error) 
                {
                    console.error("Error login user:", error);
                    res.status(500).json(error);
                }
                else
                {
                    if (results.length == 0)
                    {
                        // query result is empty, username not found in database
                        res.status(404).json({ message: "login username is not found." });
                    }
                    else
                    {
                        // query result is not empty, username found in database, save result to locals
                        res.locals.userid = results[0].userid;
                        res.locals.username = results[0].username;
                        res.locals.email = results[0].email;
                        res.locals.role = results[0].role;     
                        res.locals.hash = results[0].password;
                        next(); //call next middleware to compare password
                    }
                }
            }
                    
            model.checkUsernameExist(data, callback);
        }
        else
        {
            res.status(500).json({ message: "Username or password is not provided."});
        }
    }
}

module.exports = userController;