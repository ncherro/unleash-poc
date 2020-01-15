# Unleash POC

This project is a POC around using unleash in a local docker environment. After
going through these steps, you will have:

- Unleash (including its postgres database), running at http://localhost:4242
- an Express API running at http://localhost:3001
- a React app running at http://localhost:3000 (proxying to the API)

Read more about unleash here - https://unleash.github.io/  
Read more about the node client here - https://github.com/Unleash/unleash-client-node

## Prereqs

1. https://docs.docker.com/docker-for-mac/install/

## Running locally

### Spin up Unleash

1. run `docker-compose up -d unleash-db` to spin up the unleash postgres
   database - wait a few seconds to make sure it's ready
1. run `docker-compose up unleash` to spin up the unleash service (migrations
   are auto-run)

Visit http://localhost:4242 to set up your flags

\* Note - there will be a 5 second delay before changes to flags are reflected
on the API. This is [by
design](https://www.unleash-hosted.com/articles/our-unique-architecture). The
polling interval can be configured with an ENV var (see `docker-compose.yml`
and `server/flags.js` for more info).

### Spin up our Express server

1. run `docker-compose up server`

- Visit http://localhost:3001/api?userid=abc123&flagname=app.ToggleX to check
  whether `app.ToggleX` is enabled for User `abc123`
- Visit http://localhost:3001/api/toggles?userid=abc123 displays a list of
  toggles User `abc123` - our mobile / web clients could hit an endpoint like
  this to pull a full list of toggles for 'current user' at some interval

\* Note - any code updates require a server restart

### Spin up our React client

1. `cd client`
1. `npm install`
1. `npm start`

Visit http://localhost:3000 to see enabled flags

Enter a UserID into the input and click 'Reload' to check toggles for different
users
