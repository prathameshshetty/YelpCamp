const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

const axios = require("axios");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const city1 = cities[random1000].city;
    const state1 = cities[random1000].state;

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${city1}&format=json`
    );
    const data = response.data;

    const lat = data[0].lat;
    const lon = data[0].lon;

    const camp = new Campground({
      author: "67a0c414358f55220cb5acbd",
      location: `${city1}, ${state1}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dczjrwgwq/image/upload/v1738671102/YelpCamp/zrzzqhr06nkbrz0tpwsc.jpg",
          filename: "YelpCamp/zrzzqhr06nkbrz0tpwsc",
        },
        {
          url: "https://res.cloudinary.com/dczjrwgwq/image/upload/v1738671103/YelpCamp/mqnngdhlifokmdosmrns.jpg",
          filename: "YelpCamp/mqnngdhlifokmdosmrns",
        },
        {
          url: "https://res.cloudinary.com/dczjrwgwq/image/upload/v1738671103/YelpCamp/dk4oupk8ieheat5gifee.jpg",
          filename: "YelpCamp/dk4oupk8ieheat5gifee",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [lon, lat],
      },
    });
    await camp.save();
    console.log(i);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
