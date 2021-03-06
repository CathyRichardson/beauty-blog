const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !password || !email) {
            return res.status(409).send('Please provide username, email, and password');
        }
        const db = req.app.get('db');
        const getUserResult = await db.auth.get_user(username);
        const existingUser = getUserResult[0];   //massive db queries return an array. 
        if (existingUser) {
            return res.status(409).send('Username taken');
        }
        // const hash = bcrypt.hashSync(password); // This line is equivalent to the next two lines, by default it provides a 10 character salt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        // Always register a new user with is_admin = false, only a previously registered admin can update the is_admin state of a new user
        const registerUserResult = await db.auth.register_user(username, email, hash, false);
        const registeredUser = registerUserResult[0];
        req.session.user = {
            isAdmin: registeredUser.is_admin,
            id: registeredUser.id,
            username: registeredUser.name,
            email: registeredUser.email
        }
        res.status(201).send(req.session.user);

    } catch (e) {
        console.log(e);
        res.status(500).send("registration error");
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get('db');
    try {
        const result = await db.auth.get_user(username);
        const foundUser = result[0];
        if (!foundUser) {
            return res.status(401).send('Invalid Login');
        }
        const isAuthenticated = bcrypt.compareSync(password, foundUser.password)  //This method compares the password entered by the user at login to the hashed and salted version stored in the database.
        if (!isAuthenticated) {
            return res.status(401).send('Invalid Login');
        }
        req.session.user = {
            isAdmin: foundUser.is_admin,
            id: foundUser.id,
            username: foundUser.name,
            email: foundUser.email
        }
        res.status(200).send(req.session.user);
    } catch (e) {
        console.log(e);
        res.status(500).send("login error");
    }
}

const logout = async (req, res) => {
    req.session.destroy(); // This destroys the data stored on the user's session object, effectively logging the user out.
    res.sendStatus(200);
}

const getUser = (req, res) => {
    const user = req.session.user;
    if (user) {
        res.status(200).send(user);
    } else {
        res.sendStatus(404);
    }
}

const setUserAdmin = async (req, res) => {
    const { username } = req.params;
    const { admin } = req.query;
    const db = req.app.get('db');
    try {
        // check if the user exists
        const getUserResult = await db.auth.get_user(username);
        const existingUser = getUserResult[0];
        if (!existingUser) {
            return res.sendStatus(404);
        }
        // if we have an admin query parameter and it's true, set to isAdmin to true
        let isAdmin = (admin && admin.toLowerCase() === "true") ? true : false;
        await db.auth.set_user_admin(existingUser.id, req.session.user.id, isAdmin);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

const usersOnly = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send('Please log in');
    }
    next();
}

const adminsOnly = (req, res, next) => {
    if (!req.session.user.isAdmin) {
        return res.status(403).send('You are not an admin');
    }
    next();
}

module.exports = {
    register,
    login,
    logout,
    getUser,
    setUserAdmin,
    usersOnly,
    adminsOnly
}