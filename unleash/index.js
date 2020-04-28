'use strict';

const unleash = require('unleash-server');
const authHook = require('./custom-auth-hook');

unleash
  .start({
    databaseUrl: process.env.DATABASE_URL,
    adminAuthentication: 'custom',
    preRouterHook: authHook,
  })
  .then(unleash => {
    console.log(
      `Unleash started on http://localhost:${unleash.app.get('port')}`,
    );
  });
