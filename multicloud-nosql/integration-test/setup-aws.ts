beforeAll(async () => {
  process.env = {
    DEMO_PROFILE: "aws-test",
    DEMO_AWS_TEST_ENDPOINT: "http://127.0.0.1:8000",
    DEMO_AWS_TEST_REGION: "us-east-1",
    DEMO_AWS_TEST_ACCESS_KEY_ID: "xxx",
    DEMO_AWS_TEST_SECRET_ACCESS_KEY: "xxx",
    DEMO_AWS_TABLE_NAME: "project0-stg-demo",
  };
});
