/** @type {import("jest").Config} */
const config = {
  displayName: "unit",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)"],
  moduleNameMapper: {
    "@demo/(.*)": "<rootDir>/src/$1",
  },
};

module.exports = config;
