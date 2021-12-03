import { Config } from 'src/types';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Fingo Test',
    description: 'Fingo Test API',
    version: '1.5',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: 'schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '2m',
    refreshExpiresIn: '7d',
    bycryptSaltOrRound: 10,
  },
};

export default (): Config => config;
