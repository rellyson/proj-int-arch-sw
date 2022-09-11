#!/bin/sh

aws dynamodb --endpoint-url=http://localhost:4566 --region=us-east-1 create-table \
    --table-name vaults \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
        AttributeName=userId,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
        AttributeName=userId,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=5

aws dynamodb --endpoint-url=http://localhost:4566 --region=us-east-1 create-table \
    --table-name vaultObjects \
    --attribute-definitions \
        AttributeName=id,AttributeType=S \
        AttributeName=vaultId,AttributeType=S \
    --key-schema \
        AttributeName=id,KeyType=HASH \
        AttributeName=vaultId,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=5
