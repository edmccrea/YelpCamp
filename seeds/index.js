const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '605dec1e69287cf249fc46a5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo maxime mollitia libero velit magnam facere! Aperiam nisi neque quae minima enim nesciunt vel ipsum, corrupti voluptate exercitationem ad omnis rem!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/edmccrea/image/upload/v1617610758/YelpCamp/sxi4qdjazozj7dwegmso.jpg',
                  filename: 'YelpCamp/sxi4qdjazozj7dwegmso'
                },
                {
                  url: 'https://res.cloudinary.com/edmccrea/image/upload/v1617610758/YelpCamp/jurqez9enkkfkvrbb6h4.jpg',
                  filename: 'YelpCamp/jurqez9enkkfkvrbb6h4'
                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})