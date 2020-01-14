const express = require('express')
const { isEnabled, getFeatureToggleDefinitions } = require('./flags.js')

const app = express()


// endpoints
//
// returns 'Yes' / 'No' based on flag
app.get('/', function (req, res) {
  // if ?userId=... is set in the url, then pass a context to isEnabled
  let context = null
  if (req.query.userid) {
    context = {
      userId: req.query.userid,
      sessionId: 'some-session-id',
      remoteAddress: '127.0.0.1',
    }
  }
  console.log('context', context)
  const respText = isEnabled('app.ToggleX', context) ? 'Yes' : 'No'
  res.send(`app.ToggleX enabled? ${respText}`)
})

// returns full list of flags (to be fetched by Web / Mobile clients(?))
app.get('/flags', function (req, res) {
  res.send(getFeatureToggleDefinitions())
})

// start it up
app.listen(3000)
