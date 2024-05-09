#!/bin/bash

# launch server
echo "Launching server"
cd ../server/
npm i
npm start &

# create docker image & container
echo "creating docker image and container, please note this take a few minutes..."

# launch docker container
#echo "loading docker container"
#cd ../react/
#docker load --input client.tar

# run dock compose to generate and launch conainer
"launching docker container"
cd ../
pwd
docker-compose build
docker-compose up

