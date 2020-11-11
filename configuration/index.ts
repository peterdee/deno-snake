import { Environment } from './types.ts';

const environment: Environment = Deno.env.toObject();

// Available application environemnts
export const ENVS = {
  development: 'development',
  heroku: 'heroku',
  production: 'production',
  staging: 'staging',
};

class Configuration {
  private static instance: Configuration;

  public ENV: string;
  public PORT: number | string;
  public DATABASE_CONNECTION_STRING: string;
  public DATABASE_NAME: string;

  private constructor() {
    this.ENV = environment.ENV || ENVS.development;
    this.PORT = environment.PORT || 7111;
    this.DATABASE_CONNECTION_STRING = environment.DATABASE_CONNECTION_STRING;
    this.DATABASE_NAME = environment.DATABASE_NAME;
  }

  public static config(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }

    return Configuration.instance;
  }
}

// Response statuses
export const RESPONSE_STATUSES = {
  badRequest: 400,
  internalServerError: 500,
  noContent: 201,
  notAuthorized: 401,
  notFound: 404,
  ok: 200,
};

// Response messages
export const RESPONSE_MESSAGES = {
  internalServerError: 'INTERNAL_SERVER_ERROR',
  invalidData: 'INVALID_DATA',
  missingData: 'MISSING_DATA',
  noAdditionalInformation: 'NO_ADDITIONAL_INFORMATION',
  ok: 'OK',
};

export default Configuration;
