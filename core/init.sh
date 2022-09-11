#!/bin/sh

if [ "$NODE_ENV" != "production" ]; then
    yarn run prebuild && yarn run start:dev
else
    yarn run prebuild && yarn run build \
    && yarn start:prod
fi
