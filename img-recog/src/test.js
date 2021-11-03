'use strict';

const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams

const image_1 = 'C:/Users/maxrink/Downloads/flower.jpg';
// const image_2 = '/data/media/image_2.jpeg';

export async function test_fnc(img) {
    let form = new FormData();

    form.append('organs', 'flower');
    form.append('images', img);

    // form.append('organs', 'leaf');
    // form.append('images', fs.createReadStream(image_2));

    try {
        const { status, data } = await axios.post(
            'https://my-api.plantnet.org/v2/identify/all?api-key=2b10189SmpQJ3XHmESgf2Hz9k',
            form, {
                headers: form.getHeaders()
            }
        );

        console.log('status', status); // should be: 200
        console.log('data', require('util').inspect(data, false, null, true)); // should be: read "Step 6" below
    } catch (error) {
        console.error('error', error);
    }
};