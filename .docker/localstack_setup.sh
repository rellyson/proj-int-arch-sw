#!/bin/sh

export AWS_ACCESS_KEY_ID=foobar
export AWS_SECRET_ACCESS_KEY=foobar
export AWS_REGION=us-east-1

aws dynamodb --endpoint-url=http://localhost:4566 --region=us-east-1 create-table \
    --table-name Vault \
    --attribute-definitions \
        AttributeName=Id,AttributeType=S \
        AttributeName=CreationDate,AttributeType=N \
    --key-schema \
        AttributeName=Id,KeyType=HASH \
        AttributeName=CreationDate,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=5

aws dynamodb --endpoint-url=http://localhost:4566 --region=us-east-1 create-table \
    --table-name VaultItem \
    --attribute-definitions \
        AttributeName=Id,AttributeType=S \
    --key-schema \
        AttributeName=Id,KeyType=HASH \
    --provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=5
