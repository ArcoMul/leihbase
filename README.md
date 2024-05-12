# Leihbase

Web application to manage Leihladen, also known as Borrow Stores.

## Features

- 🏪 A webshop front-end showing borrowable products
- 🏙️ Manage multiple borrow locations
- 🏷️ Product category filtering
- 🧑‍🤝‍🧑 User sign-up/login
- 🎫 Product reservations

## Screenshots

<img src="./screenshots/screenshot-index-page.png" width="49%" /><img src="./screenshots/screenshot-product-page.png" width="49%" />

## Tech

- Back-end and API using [PocketBase](https://pocketbase.io/)
- Front-end with server-side rendering using [NuxtJS](https://nuxt.com/)

## Setup

Requirements: [Docker](https://www.docker.com/)

- `$ docker compose build`
- `$ docker compose up`

## Deployment

The repository contains [fly.toml](https://fly.io/docs/reference/configuration/)
files to deploy the service as [fly.io](https://fly.io) applications, but can be
deployed to any server where Docker containers can run.

## E-mail

When starting the service with docker-compose, a
[mailhog](https://hub.docker.com/r/mailhog/mailhog) container starts as well. In
Pocketbase (http://localhost:8080/\_/ > Settings > Mail settings) the following
SMTP values can be configured:

- SMTP server host: mailhog
- Port: 1025
- Username: _\<empty>_
- Password: _\<empty>_

Any sent e-mail can then be viewed in the mailhog web interface at
http://localhost:8025.
