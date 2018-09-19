const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3();

const bucketName = 'cdc-pacts';

// const myKey = 'myBucketKey';

const bucketExists = name => s3.headBucket({ Bucket: name }).promise()
  .then(() => { console.log('bucket exists'); return true; })
  .catch(() => { console.log('bucket does not exist'); return false; });

const createBucket = (name) => {
  s3.createBucket({ Bucket: name }).promise()
    .then(() => {
      console.log('Bucket created');
    })
    .catch((error) => {
      console.log('error creating bucket');
      console.error(error, error.stack);
    });
};

const readPact = () => {
  const rawData = fs.readFileSync('../../pacts/wallet-decidimapi.json');
  const stringData = JSON.parse(rawData);
  console.log(stringData);
  return stringData;
};

const addPactToBucket = (pactPath, name, keyName) => {
  const objectParams = { Bucket: name, Key: keyName, Body: readPact() };
  s3.putObject(objectParams).promise()
    .then(() => { console.log('object added to bucket'); })
    .catch(() => { console.log('failed to add object to bucket'); });
};

if (!bucketExists(bucketName)) {
  createBucket(bucketName);
}

addPactToBucket();

