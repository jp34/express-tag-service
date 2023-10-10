#!/bin/bash

# Start tags database
sudo docker run -d \
    --name sn-db-tags \
    --network sn \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=root \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    -e MONGO_INITDB_DATABASE=sn-service-tags \
    mongo:6.0
