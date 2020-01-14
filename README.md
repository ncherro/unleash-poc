# Unleash POC

This project is a POC around using unleash in a docker environment

## Prereqs

1. Docker and docker-compose - https://docs.docker.com/docker-for-mac/install/

## Spin it up locally

1. run `dc up -d unleash-db` to build / spin up the unleash postgres database - wait a few seconds for it to spin up
1. run `dc up unleash` to spin up the unleash service (migrations are auto-run)

Visit http://localhost:4242 to set up your flags

1. run `dc up server` to spin up our express app at http://localhost:3000

- http://localhost:3000 hits our 'Hello World' endpoint, which checks the `app.ToggleX` flag
- http://localhost:3000?userid=abc123 checks `app.ToggleX` passing in a context where userId = `abc123`
- http://localhost:3000/flags displays a list of all flags

## Local development

### Server

The express js application lives in the `server` directory. See
`server/index.js` for more info. Note that any file changes will require a
restart.

### Client

Coming soon...
