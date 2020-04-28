const {
  initialize,
  isEnabled,
  getFeatureToggleDefinitions,
} = require('unleash-client')

// initialize unleash client
const unleashClient = initialize({
  url: process.env.UNLEASH_API_BASE, // required
  appName: process.env.APP_NAME, // required
  instanceId: process.env.INSTANCE_ID,
  refreshInterval: process.env.UNLEASH_REFRESH_INTERVAL,
  customHeaders: {
    authorization: process.env.UNLEASH_SHARED_SECRET, // required
  },
})

// optional events
unleashClient.on('error', console.error)
unleashClient.on('warn', console.warn)
unleashClient.on('ready', console.log)

// metrics hooks
unleashClient.on('registered', clientData => console.log('registered', clientData))
unleashClient.on('sent', payload => console.log('metrics bucket/payload sent', payload))
unleashClient.on('count', (name, enabled) => console.log(`isEnabled(${name}) returned ${enabled}`))

const getFeatureToggle = (context) => {
  return (obj, feature) => {
    obj[feature] = isEnabled(feature, context)
    return obj
  }
}

// getAllFeatureToggles accepts an unleashContext and returns _all_ feature
// toggles along with a boolean indicating whether enabled in this context
//
// {
//   'toggles': {
//     'foo': false,
//     'bar': true,
//     ...
//   }
// }
const getAllFeatureToggles = (context) => {
  const allDefinitions = getFeatureToggleDefinitions()
  const allFeatureToggles = allDefinitions.map(def => def.name)
  return {
    toggles: allFeatureToggles.reduce(getFeatureToggle(context), {})
  }
}

module.exports = {
  isEnabled,
  getAllFeatureToggles,
  getFeatureToggleDefinitions,
}
