const axios = require( 'axios');
const User = require('../models/User');
const parseStringAsArray = require('../utils/parseStringAsArray');
module.exports = {
    async index(request, response) {
        const users = await User.find();
        return response.json(users);
    },
    async store (request, response) {
        const { github_user, religion, latitude, longitude } = request.body;
        console.log(religion + 'religion');
        let user = await User.findOne({ github_user});
        console.log(user);
        if(!user){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_user}`);
            const { name = login, avatar_url, bio } = apiResponse.data;
            const religionArray = parseStringAsArray(religion);
            const location = {
                 type: 'Point',
                 coordinates: [longitude, latitude]
            };
            console.log(religionArray);
            user = await User.create({
                github_user,
                name,
                avatar_url,
                bio,
                religion: religionArray,
                location,
            })
        } 
        return response.json(user);
     },
     async update(request, response){

    },
    async destroy(){

    },
};