/** @type {import('jest').Config} */
const config = {
  displayName: "aws",
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/integration-test/setup-aws.ts"],
  testEnvironment: "node",
  testMatch: ["**/integration-test/**/*.test.ts"],
  moduleNameMapper: {
    "@demo/(.*)": "<rootDir>/src/$1",
  },
};

module.exports = config;
