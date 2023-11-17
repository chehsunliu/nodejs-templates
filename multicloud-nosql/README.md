# Multicloud NoSQL

Test for AWS DynamoDB:

```sh
$ docker-compose up -d
$ npm run test:aws
```

and for Azure CosmosDB:

```sh
$ docker-compose -f ./docker-compose.azure.yml up -d
$ npm run test:azure
```
