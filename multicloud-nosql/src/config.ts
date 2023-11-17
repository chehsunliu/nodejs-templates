export enum Profile {
  AWS_TEST = "aws-test",
  AZURE_TEST = "azure-test",
}

export type Config = {
  profile?: string;
  aws: {
    test: {
      endpoint?: string;
      region?: string;
      accessKeyId?: string;
      secretAccessKey?: string;
    };
    tableName?: string;
  };
  azure: {
    test: {
      endpoint?: string;
      key?: string;
    };
    databaseName?: string;
    containerName?: string;
  };
};

let config: Config | undefined;

const create = (): Config => {
  return {
    profile: process.env["DEMO_PROFILE"],
    aws: {
      test: {
        endpoint: process.env["DEMO_AWS_TEST_ENDPOINT"],
        region: process.env["DEMO_AWS_TEST_REGION"],
        accessKeyId: process.env["DEMO_AWS_TEST_ACCESS_KEY_ID"],
        secretAccessKey: process.env["DEMO_AWS_TEST_SECRET_ACCESS_KEY"],
      },
      tableName: process.env["DEMO_AWS_TABLE_NAME"],
    },
    azure: {
      test: {
        endpoint: process.env["DEMO_AZURE_TEST_ENDPOINT"],
        key: process.env["DEMO_AZURE_TEST_KEY"],
      },
      databaseName: process.env["DEMO_AZURE_DATABASE_NAME"],
      containerName: process.env["DEMO_AZURE_CONTAINER_NAME"],
    },
  };
};

export const get = (): Config => {
  if (config === undefined) {
    config = create();
  }

  return config;
};
