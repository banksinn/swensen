export type DatabaseConfig = {
  username: string;
  password: string;
  host: string;
  port: string;
  database: string;
};

export type AuthConfig = {
  secret: string;
};

export type AllConfig = {
  database: DatabaseConfig;
  auth: AuthConfig;
};
