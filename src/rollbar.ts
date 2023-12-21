import Rollbar from 'rollbar';

const {
  ROLLBAR_ACCESS_TOKEN,
  NODE_ENV,
  VERBOSE,
} = process.env;

if (!ROLLBAR_ACCESS_TOKEN && NODE_ENV === 'production') {
  throw new Error('Missing ROLLBAR_ACCESS_TOKEN environment variable');
}

const rollbar = new Rollbar({
  accessToken: ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: NODE_ENV === 'production',
});

export const reportError = (...args: any) => {
  rollbar.error(...args);
  if (VERBOSE === 'true') {
    console.error('⚠', ...args);
  }
};

rollbar.info('Application started');

export default rollbar;
