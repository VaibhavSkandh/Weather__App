// Environment variable validation utility
interface EnvironmentConfig {
  REACT_APP_FIREBASE_API_KEY: string;
  REACT_APP_FIREBASE_AUTH_DOMAIN: string;
  REACT_APP_FIREBASE_PROJECT_ID: string;
  REACT_APP_FIREBASE_STORAGE_BUCKET: string;
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: string;
  REACT_APP_FIREBASE_APP_ID: string;
  REACT_APP_WEATHER_API_KEY: string;
}

const requiredEnvVars: (keyof EnvironmentConfig)[] = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN', 
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID',
  'REACT_APP_WEATHER_API_KEY'
];

export const validateEnvironment = (): EnvironmentConfig => {
  const missing: string[] = [];
  const config: Partial<EnvironmentConfig> = {};

  requiredEnvVars.forEach((envVar) => {
    const value = process.env[envVar];
    if (!value || value.trim() === '') {
      missing.push(envVar);
    } else {
      config[envVar] = value;
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please ensure all required environment variables are set in your .env file.\n' +
      'Copy .env.example to .env and fill in your actual values.'
    );
  }

  return config as EnvironmentConfig;
};

// Validate environment on module load in development
if (process.env.NODE_ENV === 'development') {
  try {
    validateEnvironment();
  } catch (error) {
    console.error('Environment validation failed:', error);
  }
}

export const env = validateEnvironment();