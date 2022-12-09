import express from 'express';
import fetch from 'node-fetch';

// create a new Express.js app
const app = express();

// define a custom endpoint for "/mars-rover-photo"
app.get('/mars-rover-photo', async (req, res) => {
  try {
    // retrieve the image data from the NASA Mars Rover API
    const apiRes = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=vbBdCkMZKqwb4qJwGH4og1wD1L5EJKlW5gF4m9m4');
    const {latest_photos: latestPhotos} = await apiRes.json()
    const photo = await fetch(latestPhotos[0].img_src)
    // create a new response with the appropriate content type (image/jpeg in this case)
    res.writeHead(200, { 'Content-Type': 'image/jpeg', 'Access-Control-Allow-Origin': '*' });

    // pipe the image data from the API response to the server response
    photo.body.pipe(res);
  } catch (err) {
    // handle any errors that occurred while making the request
    console.error(err);
    res.end('An error occurred while trying to retrieve the image from the NASA Mars Rover API.');
  }
});

// start the server on port 3000
app.listen(3000);
