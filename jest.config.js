export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"], // sem /extend-expect
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};



/*
Antes nao ignorava o css e scss:
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};


O jsdom simula o ambiente do navegador para o React.
O @testing-library/jest-dom adiciona funções úteis como toBeInTheDocument().
*/