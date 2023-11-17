import * as Config from "@demo/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

let client: DynamoDBClient | undefined;

const create = (config: Config.Config): DynamoDBClient => {
  if (config.profile === Config.Profile.AWS_TEST) {
    return new DynamoDBClient({
      endpoint: config.aws.test.endpoint!,
      region: config.aws.test.region!,
      credentials: {
        accessKeyId: config.aws.test.accessKeyId!,
        secretAccessKey: config.aws.test.accessKeyId!,
      },
    });
  }

  throw new Error(`invalid profile: ${config.profile}`);
};

export const get = (): DynamoDBClient => {
  if (client === undefined) {
    client = create(Config.get());
  }

  return client;
};
