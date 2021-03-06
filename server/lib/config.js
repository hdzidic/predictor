import path from 'path';
import dotenv from 'dotenv';

// Load local Env configuration (ENV variables). To be used to configure Dev, Staging, Production
dotenv.config({ path: '.env' });

const serverRootPath = process.env.ROOTPATH || path.normalize(path.join(__dirname, '/..'));

// Configure default runtime environment.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  // Server port
  port: process.env.PORT || 8099,
  host: process.env.HOST || 'http://localhost',

  // Database configuration
  databasePort: process.env.DATABASE_PORT || 3306,
  databaseHost: process.env.DATABASE_HOST || 'localhost',
  databaseMigrationsTable: 'knex_migrations',
  databaseMigrationsAutorun: process.env.DATABASE_MIGRATIONS_AUTORUN || true,
  databaseUser: process.env.DATABASE_USER || '',
  databasePassword: process.env.DATABASE_PASSWORD || '',
  databaseName: process.env.DATABASE_NAME || 'predictor_local',

  fixturesAPIUrl: process.env.FIXTURES_API_URL,
  fixturesAPIKey: process.env.FIXTURES_API_KEY,

  static: process.env.CLIENT_STATIC || `${serverRootPath}/client/build/`,
  root: serverRootPath,
  environment: process.env.NODE_ENV,
  sessionSecretKey: process.env.SECRET_KEY,
  security: {
    owasp: {
      allowPassphrases: true,
      maxLength: 128,
      minLength: 6,
      minPhraseLength: 20,
      minOptionalTestsToPass: 3,
    },
  },
};

export default config;
