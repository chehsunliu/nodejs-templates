/** @type {import('jest').Config} */
const config = {
  displayName: "azure",
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/integration-test/setup-azure.ts"],
  testEnvironment: "node",
  testMatch: ["**/integration-test/**/*.test.ts"],
  moduleNameMapper: {
    "@demo/(.*)": "<rootDir>/src/$1",
  },
};

module.exports = config;
