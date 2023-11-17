import * as Config from "@demo/config";
import { Profile } from "@demo/config";
import * as Cosmos from "@demo/db/cosmos";
import * as Dynamo from "@demo/db/dynamo";
import { Container, OperationInput } from "@azure/cosmos";
import { BatchWriteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

export interface Collection {
  fetchAll: () => Promise<Array<User>>;
  batchWrite: (users: Array<User>) => Promise<void>;
}

export type User = {
  name: string;
  plan: string;
};

class CosmosCollection implements Collection {
  private readonly container: Container;

  constructor() {
    const config = Config.get();
    const client = Cosmos.get();
    const db = client.database(config.azure.databaseName!);

    this.container = db.container(config.azure.containerName!);
  }

  fetchAll = async (): Promise<Array<User>> => {
    const spec = {
      query: "select * from c",
    };

    const { resources: items } = await this.container.items.query(spec).fetchAll();
    return items.map((item) => ({ name: item["pk"], plan: item["plan"] }));
  };

  batchWrite = async (users: Array<User>): Promise<void> => {
    const operations: Array<OperationInput> = users.map((user) => ({
      operationType: "Create",
      resourceBody: { pk: user.name, plan: user.plan },
    }));
    await this.container.items.bulk(operations);
  };
}

class DynamoCollection implements Collection {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly config: Config.Config;

  constructor() {
    this.config = Config.get();
    this.docClient = DynamoDBDocumentClient.from(Dynamo.get());
  }

  fetchAll = async (): Promise<Array<User>> => {
    const cmd = new ScanCommand({
      TableName: this.config.aws.tableName,
    });

    const resp = await this.docClient.send(cmd);
    if (resp.Items === undefined) {
      return [];
    }

    return resp.Items.map((item) => ({ name: item["pk"], plan: item["plan"] }));
  };

  batchWrite = async (users: Array<User>): Promise<void> => {
    const cmd = new BatchWriteCommand({
      RequestItems: {
        [this.config.aws.tableName!]: users.map((u) => ({
          PutRequest: {
            Item: {
              pk: u.name,
              plan: u.plan,
            },
          },
        })),
      },
    });

    await this.docClient.send(cmd);
  };
}

let collection: Collection | undefined;

const create = (config: Config.Config): Collection => {
  if (config.profile === Profile.AWS_TEST) {
    return new DynamoCollection();
  }

  if (config.profile === Profile.AZURE_TEST) {
    return new CosmosCollection();
  }

  throw new Error(`unknown profile: ${config.profile}`);
};

export const get = (): Collection => {
  if (collection === undefined) {
    collection = create(Config.get());
  }

  return collection;
};
