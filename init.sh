#!/bin/bash

npm install && bower install
touch .env

echo 'export stravaClientID=""' >> .env
echo 'export stravaSecret=""' >> .env
echo 'export stravaCallbackURL=""' >> .env
echo 'export stravaAccessToken=""' >> .env
echo 'export sessionSecret=""' >> .env
echo '' >> .env
echo 'export firebaseApiKey=""' >> .env
echo 'export firebaseAuthDomain=""' >> .env
echo 'export firebaseDbURL=""' >> .env
echo 'export firebaseBucket=""' >> .env
