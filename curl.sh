#!/bin/bash
curl -s 'http://localhost:4000/' \
  -H 'content-type: application/json' \
  --data-raw '{"query":"{ errorSoon nestedObjectSoon  { justAString } }"}' | jq .
