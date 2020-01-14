const {
  initialize,
  isEnabled,
  getFeatureToggleDefinitions,
} = require('unleash-client');

// initialize unleash client
const unleashClient = initialize({
  url: process.env.UNLEASH_API_BASE, // required
  appName: process.env.APP_NAME, // required
  instanceId: process.env.INSTANCE_ID,
  refreshInterval: process.env.UNLEASH_REFRESH_INTERVAL,
});

// optional events
unleashClient.on('error', console.error);
unleashClient.on('warn', console.warn);
unleashClient.on('ready', console.log);

// metrics hooks
unleashClient.on('registered', clientData => console.log('registered', clientData));
unleashClient.on('sent', payload => console.log('metrics bucket/payload sent', payload));
unleashClient.on('count', (name, enabled) => console.log(`isEnabled(${name}) returned ${enabled}`));

module.exports = {
  isEnabled,
  getFeatureToggleDefinitions,
}
