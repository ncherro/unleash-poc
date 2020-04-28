'use strict';

const unleash = require('unleash-server');
const customAdminAuth = require('./google-auth-hook');

unleash
  .start({
    databaseUrl: process.env.DATABASE_URL,
    adminAuthentication: 'custom',
    preRouterHook: customAdminAuth,
  })
  .then(unleash => {
    console.log(
      `Unleash started on http://localhost:${unleash.app.get('port')}`,
    );
  });
