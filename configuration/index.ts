import 'https://deno.land/x/denv/mod.ts';

export const environment = Deno.env.toObject();

// Available application environemnts
export const ENVS = {
  development: 'development',
  heroku: 'heroku',
  production: 'production',
  staging: 'staging',
};

// Application ENV
export const { ENV = ENVS.development } = environment;

// Application port
export const PORT = Number(environment.PORT) || 7111;
