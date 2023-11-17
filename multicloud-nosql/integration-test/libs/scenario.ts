import * as Config from "@demo/config";
import * as Cosmos from "@demo/db/cosmos";
import * as Dynamo from "@demo/db/dynamo";
import { get as getCollection } from "@demo/db";
import { CosmosClient } from "@azure/cosmos";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { CreateTableCommand, DeleteTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import * as fs from "fs";

export interface Scenario {
  reset: (filepath: string) => Promise<void>;
}

class CosmosScenario implements Scenario {
  private readonly config: Config.Config;
  private readonly client: CosmosClient;

  constructor() {
    this.config = Config.get();
    this.client = Cosmos.get();
  }

  reset = async (filepath: string) => {
    try {
      await this.client.database(this.config.azure.databaseName!).delete();
    } catch (e) {
      // Ignore
    }

    const { database: db } = await this.client.databases.create({ id: this.config.azure.databaseName });
    await db.containers.create({ id: this.config.azure.containerName });

    const data = JSON.parse(fs.readFileSync(filepath).toString());
    await getCollection().batchWrite(data);
  };
}

class DynamoScenario implements Scenario {
  private readonly config: Config.Config;
  private readonly ddbClient: DynamoDBClient;
  private readonly docClient: DynamoDBDocumentClient;

  constructor() {
    this.config = Config.get();
    this.ddbClient = Dynamo.get();
    this.docClient = DynamoDBDocumentClient.from(this.ddbClient);
  }

  reset = async (filepath: string) => {
    try {
      await this.ddbClient.send(new DeleteTableCommand({ TableName: this.config.aws.tableName }));
    } catch (e) {
      // Ignore
    }

    await this.ddbClient.send(
      new CreateTableCommand({
        TableName: this.config.aws.tableName,
        KeySchema: [{ AttributeName: "pk", KeyType: "HASH" }],
        AttributeDefinitions: [{ AttributeName: "pk", AttributeType: "S" }],
        ProvisionedThroughput: { ReadCapacityUnits: 2, WriteCapacityUnits: 2 },
      }),
    );

    const data = JSON.parse(fs.readFileSync(filepath).toString());
    await getCollection().batchWrite(data);
  };
}

export const get = () => {
  const config = Config.get();

  if (config.profile === Config.Profile.AWS_TEST) {
    return new DynamoScenario();
  }

  if (config.profile === Config.Profile.AZURE_TEST) {
    return new CosmosScenario();
  }

  throw new Error(`unknown profile: ${config.profile}`);
};
