export type SecurityConfig = {
    expiresIn: string;
    refreshExpiresIn: string;
    bycryptSaltOrRound: string | number;
}

export type Config = {
    nest: NestConfig;
    cors: CorsConfig;
    swagger: SwaggerConfig;
    graphql: GraphqlConfig;
    security: SecurityConfig; 
}


export type NestConfig = {
    port: number;
  }
  
  export type CorsConfig = {
    enabled: boolean;
  }
  
  export type SwaggerConfig = {
    enabled: boolean;
    title: string;
    description: string;
    version: string;
    path: string;
  }
  
  export type GraphqlConfig = {
    playgroundEnabled: boolean;
    debug: boolean;
    schemaDestination: string;
    sortSchema: boolean;
  }
