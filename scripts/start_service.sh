#!/bin/bash

sudo docker run -d \
    --name sn-service-tags \
    --network sn \
    -p 8000:8000 \
    --env-file .env \
    socialnet/sn-service-tags
