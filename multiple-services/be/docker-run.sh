#!/bin/bash

sudo docker run \
  --rm \
  -e DATA=mydata \
  -p 8000:8080 \
  stefanoschrs/docker-workshop-multiple-services-be
