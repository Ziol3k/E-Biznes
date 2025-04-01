#!/bin/bash

docker run -d -p 9000:9000 --name playapp_container ziol3k/playapp:latest
sleep 5
ngrok http 9000
