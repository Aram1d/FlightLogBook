declare module NodeJS {
  interface IProcessEnv {
    SERVER_PORT: string;
    MONGO_URL: string;
    MONGO_DB: string;
    TOKEN_SECRET: string;
  }
  interface ProcessEnv extends IProcessEnv {}
}
