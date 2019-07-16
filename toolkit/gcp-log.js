require('dotenv').config()
const {Storage} = require('@google-cloud/storage');
const fs = require('fs')
const path = require('path')
const { PATHS, EXT } = require('./constants')

const storage = new Storage();

const bucketName = process.env.GCP_BUCKET_NAME

// This doesn't work without a config.json and we never ended up using this.
const uploadPromises = fs
  .readdirSync(PATHS.pngComp)
  .map(filename => {

    const name = path.basename(filename, EXT.png);
    console.log(filename)
    return storage.bucket(bucketName).upload(filename, {

      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      destination: `/sigil/1.3.0/${name}${EXT.png}`,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    }
  );
})



// const testPromise = uploadPromises[0]
//
// Promise.resolve(testPromise)
//
// // Promise.all()
