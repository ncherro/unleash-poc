const express = require('express')
const { isEnabled, getAllFeatureToggles } = require('./flags.js')

const app = express()

// fakeContext looks for ?userid=... the querystring
// if set then returns an object containing an unleashContext with userId set
// else returns null
const fakeContext = (req) => {
  const userId = req.query.userid
  if (req.query.userid) {
    // see https://github.com/Unleash/unleash/blob/master/docs/unleash-context.md for more options
    return {
      userId: userId,
      sessionId: `foobar-${userId}`,
    }
  }
  return null
}


// endpoints
app.get('/api', function (req, res) {
  const context = fakeContext(req)

  const flagName = req.query.flagname || '[no flag passed]'
  const flag = getAllFeatureToggles(context)[flagName]

  const forUser = context ? ` for '${context.userId}'` : ''
  const respText = flag && flag.isEnabled ? 'Yes' : 'No'

  res.send(`'${flagName}' enabled${forUser}? ${respText}`)
})

// returns full list of context-specific flags
app.get('/api/toggles', function (req, res) {
  const context = fakeContext(req)
  res.send(getAllFeatureToggles(context))
})

// start it up!
app.listen(process.env.PORT)
