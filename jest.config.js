export default {
  testEnvironment: "jsdom",
  transform: {
        "^.+\\.tsx?$": "ts-jest"
  },
  globals: {
      "TextEncoder": "TextEncoder",
      "TextDecoder": "TextDecoder"
  },
  moduleNameMapper: {
      "^.+\\.svg$": "jest-svg-transformer",
      "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ],
  moduleFileExtensions: [
      "js",
      "ts",
      "tsx"
  ]
};