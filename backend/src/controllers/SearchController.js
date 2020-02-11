const User = require('../models/User');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, religion } = request.query;
        const religionArray = parseStringAsArray(religion);
        const users = await User.find({
            religion: {
                $in: religionArray,
            },
        });
        return response.json({ users });
    }
};