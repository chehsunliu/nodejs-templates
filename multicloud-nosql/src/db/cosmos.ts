import * as Config from "@demo/config";
import { CosmosClient } from "@azure/cosmos";
import https from "https";

let client: CosmosClient | undefined;

const create = (config: Config.Config): CosmosClient => {
  if (config.profile === Config.Profile.AZURE_TEST) {
    return new CosmosClient({
      endpoint: config.azure.test.endpoint!,
      key: config.azure.test.key!,
      agent: new https.Agent({ rejectUnauthorized: false }),
    });
  }

  throw new Error(`invalid profile: ${config.profile}`);
};

export const get = (): CosmosClient => {
  if (client === undefined) {
    client = create(Config.get());
  }

  return client;
};
