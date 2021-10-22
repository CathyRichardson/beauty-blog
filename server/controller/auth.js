const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { username, email, password, isAdmin } = req.body;
    try {
        if (!username || !password || !email || isAdmin == null) {
            return res.status(409).send('Please provide username, email, password, and isAdmin ');
        }
        const db = req.app.get('db');
        const getUserResult = await db.auth.get_user(username);
        const existingUser = getUserResult[0];   //massive db queries return an array. 
        if (existingUser) {
            return res.status(409).send('Username taken');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        // const hash = bcrypt.hashSync(password); -- This line is equivalent to the two above, by default it provides a 10 character salt
        const registerUserResult = await db.auth.register_user(username, email, hash, isAdmin);
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

module.exports = {
    register,
    login,
    logout
}