/* eslint-disable import/no-extraneous-dependencies */

'use strict';

/**
 * Google OAuth 2.0
 *
 * You should read Using OAuth 2.0 to Access Google APIs:
 * https://developers.google.com/identity/protocols/OAuth2
 *
 * This example assumes that all users authenticating via google should have
 * access. You would probably limit access to users you trust.
 *
 * The implementation assumes the following environment variables:
 *
 *  We are also checking to confirm that each client authenticates with a
 *  shared secret. See this for details:
 *  https://github.com/Unleash/unleash/blob/master/docs/securing-unleash.md#securing-the-client-api
 *
 *  - GOOGLE_CLIENT_ID
 *  - GOOGLE_CLIENT_SECRET
 *  - GOOGLE_CALLBACK_URL
 *  - SHARED_SECRET
 *
 */

const passport = require('@passport-next/passport');
const GoogleOAuth2Strategy = require('@passport-next/passport-google-oauth2')
  .Strategy;

const  { User, AuthenticationRequired } = require('unleash-server');

const sharedSecret = process.env.SHARED_SECRET;

const whitelistedEmailDomains = null;
if (process.env.WHITELISTED_EMAIL_DOMAINS) {
  whitelistedEmailDomains = process.env.WHITELISTED_EMAIL_DOMAINS.split(',')
}

passport.use(
  new GoogleOAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    (accessToken, refreshToken, profile, done) => {
      // email address is a whitelisted domain
      if (whitelistedEmailDomains === null || whitelistedEmailDomains.includes(profile._json.hd)) {
        done(
          null,
          new User({
            name: profile.displayName,
            email: profile.emails[0].value,
          }),
        );
      } else {
        done(new Error("Invalid email domain"));
      }
    },
  ),
);

function authHook(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
  app.get(
    '/api/admin/login',
    passport.authenticate('google', { scope: ['email'] }),
  );

  app.get(
    '/api/auth/callback',
    passport.authenticate('google', {
      failureRedirect: '/api/admin/error-login',
    }),
    (req, res) => {
      // Successful authentication, redirect to your app.
      res.redirect('/');
    },
  );

  app.use('/api/admin/', (req, res, next) => {
    if (req.user) {
      return next();
    }

    // Instruct unleash-frontend to pop-up auth dialog
    return res
      .status('401')
      .json(
        new AuthenticationRequired({
          path: '/api/admin/login',
          type: 'custom',
          message: `You have to identify yourself in order to use Unleash.
                        Click the button and follow the instructions.`,
        }),
      )
      .end();
  });

	app.use('/api/client', (req, res, next) => {
		if (req.header('authorization') !== sharedSecret) {
			res.sendStatus(401);
		} else {
			next();
		}
	});
}

module.exports = authHook;
