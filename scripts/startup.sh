#!/bin/bash

set -e

if [[ -z "${STRIPE_CLIENT_ACCESS_KEY_PRIVATE}" ]]; then
  echo "STRIPE_CLIENT_ACCESS_KEY_PRIVATE Environment variable is not found"
else
  contents="$(cat config.json | jq '.stripeKey = "'$STRIPE_CLIENT_ACCESS_KEY_PRIVATE'"' config.json)" && \
  echo "${contents}" > config.json
fi

if [[ -z "${ORDERS_ONLINE_API_HOST}" ]]; then
  echo "ORDERS_ONLINE_API_HOST Environment variable is not found"
else
  contents="$(cat config.json | jq '.dataEndpoint = "'$HTTP_SCHEME'://'$ORDERS_ONLINE_API_HOST'"' config.json)" && \
  echo "${contents}" > config.json
fi

if [[ -z "${KRUDER_API_HOST}" ]]; then
  echo "KRUDER_API_HOST Environment variable is not found"
else
  contents="$(cat config.json | jq '.authEndpoint = "'$HTTP_SCHEME'://'$KRUDER_API_HOST'"' config.json)" && \
  echo "${contents}" > config.json
fi

cat config.json


exec "$@"