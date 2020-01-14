const express = require('express')
const app = express()

// initialize unleash client
const { initialize } = require('unleash-client');
const unleashClient = initialize({
  url: 'http://unleash:4242/api/',
  appName: 'my-app-name',
  instanceId: 'my-unique-instance-id',
});

// optional events
unleashClient.on('error', console.error);
unleashClient.on('warn', console.warn);
unleashClient.on('ready', console.log);

// use unleash
// more options: https://github.com/unleash/unleash-client-node#3-use-unleash
const { isEnabled } = require('unleash-client');

app.get('/', function (req, res) {
  const toggle = isEnabled('app.ToggleX');
  const respText = toggle ? 'Yes' : 'No'
  res.send('Hello World? ' + respText)
})


app.listen(3000)
