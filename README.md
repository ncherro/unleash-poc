# Unleash POC

This project is a POC around using unleash in a docker environment

## Prereqs

1. Docker and docker-compose - https://docs.docker.com/docker-for-mac/install/

## Setup

1. run `dc up -d unleash-db` to build / spin up the unleash postgres database - wait a few seconds for it to spin up
1. run `dc up unleash` to spin up the unleash service (migrations are auto-run)
1. run `dc up server` to spin up our express app

## Usage

### Editing flags

visit http://localhost:4242 to toggle flags
