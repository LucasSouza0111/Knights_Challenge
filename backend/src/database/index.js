const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lssouza0111:rkzo2XmlQJYK1E3z@knightschallenge.pzpbdnr.mongodb.net/?retryWrites=true&w=majority&appName=KnightsChallenge')
.then(() => {
    console.log('Connected!');
})
.catch(() => {
    console.log('Connected falha!');
});


mongoose.Promise = global.Promise;

module.exports = mongoose;