beforeAll(async () => {
  process.env = {
    DEMO_PROFILE: "azure-test",
    DEMO_AZURE_TEST_ENDPOINT: "https://127.0.0.1:8081",
    DEMO_AZURE_TEST_KEY: "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==",
    DEMO_AZURE_DATABASE_NAME: "project0-stg-db",
    DEMO_AZURE_CONTAINER_NAME: "project0-stg-demo",
  };
});
