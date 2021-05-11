const db = require('../db/db');

class BusinessController {
    async getBusinesses(req, res) {
        const queryParams = req.query;
        const lat = parseFloat(queryParams.lat);
        const lng = parseFloat(queryParams.lng);
        if (lat && lng) {
            const latNorth = lat + 0.01;
            const latSouth = lat - 0.01;
            const lngEast = lng + 0.01;
            const lngWest = lng - 0.01;
            try {
                const businesses = await db('businesses')
                    .leftJoin('subscriptions', 'subscriptions.bus_id', 'businesses.id')
                    .where('latitude', '<=', latNorth)
                    .where('latitude', '>=', latSouth)
                    .where('longitude', '<=', lngEast)
                    .where('longitude', '>=', lngWest)
                    .select('businesses.*', 'subscriptions.status');
    
                res.send(businesses)
            } catch (err) {
                res.status(400).end();
            }

        } else {
            try {
                const businesses = await db('businesses')
                    .leftJoin('subscriptions', 'subscriptions.bus_id', 'businesses.id')
                    .select('businesses.*', 'subscriptions.status');
    
                res.send(businesses);
            } catch (err) {
                res.status(400).end();
            }
        }
    }

    async postBusiness(req, res) {
        try {
            const name = req.body.name;
            const postalCode = req.body.postalCode;
            const prefecture = req.body.prefecture;
            const address1 = req.body.address1;
            const address2 = req.body.address2;
            const lat = parseFloat(req.body.lat);
            const lng = parseFloat(req.body.lng);
            const ownerId = req.body.ownerId;
            const business = {
                name: name,
                postal_code: postalCode,
                prefecture: prefecture,
                address1: address1,
                address2: address2,
                capacity_status: "closed",
                latitude: lat,
                longitude: lng,
                owner_id: ownerId,
            };
            const createdBusiness = await db('businesses').insert(business).returning(['id'])
            res.send(createdBusiness);
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }

    }

    async putBusiness(req, res) {
        try {
            console.log(req.params)
            console.log(req.body);
            const { id } = req.params;
            const setStatus = req.body;
            console.log(id);
            await db('businesses').where({id: id}).update(setStatus);
            res.status(200).end();
        } catch (err) {
            console.log(err);
            res.status(400).end();
        }
    }
}

module.exports = new BusinessController()